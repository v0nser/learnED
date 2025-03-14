import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fcImg from '../../assets/6107606.webp';
import './FeaturedCourses.css';
import { Context } from '../../context/Context';
import { BASE_URL } from '../../utils/config';

const FeaturedCourses = () => {
  const { user } = useContext(Context);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/courses/featured-courses`);
        if (isMounted) {
          setFeaturedCourses(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load featured courses');
          setLoading(false);
        }
      }
    };

    fetchFeaturedCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="featured-courses-container"><p className="loading-text">Loading...</p></div>;
  }

  if (error) {
    return <div className="featured-courses-container"><p className="error-text">{error}</p></div>;
  }

  return (
    <section className="featured-courses-container">
      <h2 className="featured-courses-title">Featured Courses</h2>
      <div className="featured-courses-wrapper">
        <div className="featured-courses-list">
          {featuredCourses.map((course) => (
            <article key={course._id} className="featured-course-item">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
            </article>
          ))}
        </div>
        <div className="featured-course-image">
          <img src={fcImg} alt="Featured Courses Illustration" />
          <Link to="/allCourses" className="all-courses-btn">
            Browse All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;