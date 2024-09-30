import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/CourseCard/CourseCard';
import CourseNavigator from '../../components/CourseNavigator/CourseNavigator';
import Footer from '../../components/Footer/Footer';
import { Context } from '../../context/Context';
import './AllCourses.css';
import axios from 'axios';
import {BASE_URL} from '../../utils/config'

const AllCourses = () => {
  const { user } = useContext(Context);
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading ] = useState(true);
  const [error, setError] = useState(null);
  const coursesPerPage = 8;

  useEffect(() => {
    // Fetch courses from the server when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/courses/all-courses`);
        console.log('Axios Response:', response);
        setAllCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        setError(error.message || 'An error occured while fetching courses.')
        // console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Function to handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.Instructor.toLowerCase().includes(term)
    );

    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the courses to display based on pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <>
      <Navbar />
      <div className='AllCourses__Wrapper'>
        
        <div className="AllCourses__Navigator">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="AllCourses__Greeting">
          {user && <p>Welcome, {user.username}!</p>}
        </div>

        <div className="AllCourses__Cards">
          {filteredCourses.length > 0 ? (
            currentCourses.map((course) => (
              <Link key={course._id} to={`/courses/${course._id}`}>
                <CourseCard key={course._id} course={course} />
              </Link>
            ))
          ) : (
            <p className='nocourse'>No courses found. Please try a different keyword.</p>
          )}
        </div>

        <CourseNavigator
          coursesPerPage={coursesPerPage}
          totalCourses={filteredCourses.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </>
  );
}

export default AllCourses;
