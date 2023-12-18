import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate, useParams } from 'react-router-dom';  // Updated import

// Import axios for API requests
import axios from 'axios';

// Import CSS
import './Success.css';

// Component definition
const ConfettiSuccess = ({ location }) => {
  // State to store course details
  const [courseDetails, setCourseDetails] = useState(null);

  // Hooks for navigation and fetching URL parameters
  const navigate = useNavigate();
  const { id } = useParams();  // Use useParams hook to get 'id' from URL

  // Fetch course details when component mounts
  useEffect(() => {
    if (id) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/courses/${id}`);
          setCourseDetails(response.data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      fetchCourseDetails();
    }
  }, [id]);

  // Redirect to the learning room after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(location?.state?.redirectPath || '/');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigate, location, id]);

  // Render the component
  return (
    <div className="success_wrapper">
      <h1>Enrollment Successful! </h1>
      <p>🎉</p>
      <Confetti />
    </div>
  );
};

// Export the component
export default ConfettiSuccess;
