import React from 'react';
import './CourseCard.css'
const CourseCard = ({ course }) => {
  return (
    // <div className="courseCardWrapper">
    <div className="CourseCard">
      <h3>{course.title}</h3>
      <p>Instructor: {course.Instructor}</p>
      <p>Duration: {course.Duration}</p>
      <p>Category: {course.category}</p>
    </div>
    // </div>
  );
};

export default CourseCard;