import React, { useState, useEffect, useContext } from 'react';
import { Link} from "react-router-dom";
import axios from 'axios';
import fc_img from '../../assets/6107606.webp';
import './FeaturedCourses.css';
import { Context } from '../../context/Context';

const FeaturedCourses = () => {
  const { user } = useContext(Context);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get('https://learned.onrender.com/courses/featured-courses');
        setFeaturedCourses(response.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching featured courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);
  

  return (
    <div className="featured-courses-container">
      {loading ? (
        <p>Loading featured courses...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h2 className="featured-courses-title">Featured Courses</h2>
          <div className="featured-courses-col">
            <ul className="featured-courses-list">
              {featuredCourses.map((course, index) => (
                <li key={course._id || index} className="featured-course-item">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="featured-course-col">
            <img src={fc_img} alt="Featured Course" />
            <Link to="/allCourses" className="allcoursesbtn">
              Browse All Courses ➔
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedCourses;

