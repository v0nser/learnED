const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require('multer');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const authRoute = require("./routes/auth");
const courseRoutes = require('./routes/courses')
const allcoursesRoutes = require('./routes/allCourses')
const Course = require('./models/AllCourses')
const Razorpay = require('razorpay');
const blogCategory = require('./routes/blogRoutes/categories');
const blogPost = require('./routes/blogRoutes/posts')
const blogUsers = require('./routes/blogRoutes/users');
const CourseVideo = require('./routes/coursevideos');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const app = express();


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
    // origin: "https://learn-ed.vercel.app",
    origin: "http://localhost:5173",
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


app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/courses", courseRoutes);
app.use("/courses", allcoursesRoutes);
app.use("/blog/posts", blogPost);
app.use("/blog/categories", blogCategory);
// app.use("/blog/profile", blogUsers)
app.use("/course/video", CourseVideo)

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Razorpay checkout endpoint
app.post("/razorpay/checkout", async (req, res) => {
  try {
    const courseId = req.body.items[0].id.toString();
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const options = {
      amount: course.Price * 100, // Amount in paise
      currency: "INR",
      receipt: `rcpt_${courseId.slice(-6)}_${Date.now().toString().slice(-6)}`, 
      payment_capture: 1, // Auto capture
      notes: {
        courseId: courseId,
        courseTitle: course.title
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
      courseTitle: course.title,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel"
    });
  } catch (err) {
    console.error('Error in Razorpay checkout endpoint:', err);
    res.status(500).json({ error: err.message });
  }
});

// Razorpay payment verification endpoint
app.post("/razorpay/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Extract user _id from JWT token in headers (if using token-based authentication)
    const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userMongoId = decoded._id; // User _id

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Payment is verified
      const order = await razorpay.orders.fetch(razorpay_order_id);
      
      // Handle successful payment
      await handleRazorpaySuccess(order);
      
      res.json({ status: "success" });
    } else {
      res.status(400).json({ status: "failure", error: "Invalid signature" });
    }
  } catch (err) {
    console.error('Error in Razorpay verification:', err);
    res.status(500).json({ error: err.message });
  }
});

const handleRazorpaySuccess = async (order, userMongoId) => {
  try {
    const courseId = order.notes.courseId;
    
    await User.findByIdAndUpdate(userMongoId, {
      $addToSet: { enrolledCourses: courseId } // Prevents duplicate courses
    });
    
    console.log(`User ${userMongoId} enrolled in course ${courseId}`);  } catch (err) {
    console.error('Error handling Razorpay success:', err);
  }
};
app.listen("8000", () => {
  console.log("Server is running!");
});