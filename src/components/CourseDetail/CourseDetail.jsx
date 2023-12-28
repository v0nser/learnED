import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import EnrollmentPopup from '../EnrollmentPopup/EnrollmentPopup';
import { Context } from '../../context/Context';
import './CourseDetail.css';

const CourseDetail = () => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isEnrollmentPopupVisible, setIsEnrollmentPopupVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`https://learned.onrender.com/courses/${id}`);
          setCourseDetails(response.data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      fetchCourseDetails();
    }
  }, [id]);

  const handleEnroll = async () => {
    if (!isUserSignedIn()) {
      // If the user is not signed in, show the login popup
      setIsLoginPopupVisible(true);
    } else {
      console.log(`Enrolling in course with ID ${id}`);
      // Proceed with enrollment logic
  
      // Close the enrollment popup
      setIsEnrollmentPopupVisible(true);
  
      // Check if courseDetails is available
      if (courseDetails) {
        // Call your server to initiate the checkout
        try {
          const response = await axios.post('https://learned.onrender.com/checkout', {
            items: [
              {
                id: courseDetails._id, 
                quantity: 1, 
                price: courseDetails.Price, 
                name: courseDetails.title, 
              }
            ],
          });
          const { url } = response.data;
          window.location = url;
        } catch (error) {
          console.error('Error initiating checkout:', error);
        }
      }       
      else {
        console.error('Course details not available');
      }
    }
  };
  

  const isUserSignedIn = () => {
    return !!user;
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };


  const checkout = async () => {
    try{
      const res = await fetch("https://learned.onrender.com/checkout",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body:JSON.stringify({
          items: [
            {
              id: id,
              quantity: quantity,
              price: itemPrice,
              name: itemName
            }
          ]
        })
      });
      const data = await res.json();
      window.location= data.url;
    } catch(err){
      console.log(err);

    }
  }
  return (
    <>
      <Navbar />
      <div className="CourseDetail__Wrapper">
        {courseDetails ? (
          <>
            <h1>{courseDetails.title}</h1>
            <img src={courseDetails.ImageURL} alt={courseDetails.title} />
            <p>{courseDetails.description}</p>
            <p>Instructor: {courseDetails.Instructor}</p>
            <p>Duration: {courseDetails.Duration}</p>
            <p>Skill Level: {courseDetails.skillLevel}</p>
            <p>₹ {courseDetails.Price}</p>

            {/* Display modules if available */}
            {courseDetails.modules && (
              <div>
                <h2>Course Modules</h2>
                <ul>
                  {courseDetails.modules.map((module, index) => (
                    <li key={index}>{module.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Enroll button */}
            <button onClick={handleEnroll}>Enroll Now</button>

            {/* Back to all courses link */}
            <Link to="/allCourses">Back to All Courses</Link>

            {/* Login Popup */}
            {isLoginPopupVisible && <LoginPopup onLogin={closeLoginPopup} />}
            {isEnrollmentPopupVisible && (
              <EnrollmentPopup onClose={() => setIsEnrollmentPopupVisible(false)} />
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;