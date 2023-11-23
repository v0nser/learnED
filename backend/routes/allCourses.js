const express = require('express');
const router = express.Router();
const AllCourse = require('../models/AllCourses'); 

router.get('/all-courses', async (req, res) => {
    // console.log('Received a request to /courses/all-courses')
  try {
    const courses = await AllCourse.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route for fetching a specific course by ID
router.get('/:id', async (req, res) => {
    // console.log('Received a request to /courses/:id');
    const courseId = req.params.id;
  
    try {
      const course = await AllCourse.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json(course);
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router