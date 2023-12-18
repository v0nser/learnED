const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const path = require('path')
const authRoute = require("./routes/auth");
const courseRoutes = require('./routes/courses')
const allcoursesRoutes = require('./routes/allCourses')
const Course = require('./models/AllCourses')
const Stripe = require("stripe")
const blogCategory = require('./routes/blogRoutes/categories');
const blogPost = require('./routes/blogRoutes/posts')
const blogUsers = require('./routes/blogRoutes/users');
const CourseVideo = require('./routes/coursevideos');
const app = express();
const stripe = Stripe('sk_test_51ODHD6SJRxvTTpNScRrG5yZYIcrMaGQ0VaZwcTBK0ABWLXpP6IRVO3g9H2Y1BcIcYU9BiGnWHF75q7s1Qv3Grr5R00zYUXRIRn')

dotenv.config();
app.use(express.json());

app.use(
  cookieSession({ name: "session", keys: ["vonser"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use("/images", express.static(path.join(__dirname, "/images")));

const options = {};
mongoose.connect(process.env.MONGO_URL, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.use(
  cors({
    origin: "https://learn-ed.vercel.app/",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//upload utils
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


app.use("/auth", authRoute);
app.use("/courses", courseRoutes);
app.use("/courses", allcoursesRoutes);
app.use("/blog/posts", blogPost);
app.use("/blog/categories", blogCategory);
// app.use("/blog/profile", blogUsers)
app.use("/course/video", CourseVideo)

app.post("/checkout", async (req, res) => {
  try {
    // Convert the id to a string
    const courseId = req.body.items[0].id.toString();

    // Fetch course details from the database
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
            },
            unit_amount: course.Price * 100,
          },
          quantity: req.body.items[0].quantity,
        },
      ],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error in checkout endpoint:', err);
    res.status(500).json({ error: err.message });
  }
});


app.listen("8000", () => {
  console.log("Server is running!");
});