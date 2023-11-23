const express = require('express');
const Course = require('../models/Course'); 
const mongoose= require('mongoose');
const router = express.Router();

// Route for fetching featured courses
router.get('/featured-courses', async (req, res) => {
    // console.log('Received a request to /courses/featured-courses');
  try {
    const featuredCourses = await Course.find({ featured: true });
    res.json(featuredCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
