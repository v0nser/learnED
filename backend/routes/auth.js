const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const CLIENT_URL = "https://learn-ed.vercel.app/";

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    // console.error(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    // create jwt token with username in the payload
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // set token in the browser cookies and send the response to the client
    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      secure: process.env.NODE_ENV === 'production', // set to true in production (requires HTTPS)
    }).status(200).json({ token, role: user.role, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
});




router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: process.env.NODE_ENV === 'production', // Ensure secure attribute in production
    })
    .status(200)
    .send("User has been logged out.");
});

module.exports = router