import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import { Context } from '../../context/Context';
import { BASE_URL } from "../../utils/config";
import Confetti from 'react-confetti'; // Add this import
import './CourseDetail.css';

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CourseDetail = () => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/courses/${id}`);
          setCourseDetails(response.data);
          // Check if user is already enrolled (you might need to modify this based on your backend)
          if (user) {
            const enrollmentCheck = await axios.get(`${BASE_URL}/users/enrollment/${id}`, {
              headers: { Authorization: `Bearer ${user.token}` }
            });
            setIsEnrolled(enrollmentCheck.data.isEnrolled);
          }
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

      fetchCourseDetails();
    }
  }, [id, user]);

  const isUserSignedIn = () => {
    return !!user;
  };

  const handleEnroll = () => {
    if (!isUserSignedIn()) {
      setIsLoginPopupVisible(true);
    } else {
      handleRazorpayCheckout();
    }
  };

  const handleRazorpayCheckout = async () => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please try again.');
        return;
      }

      if (!courseDetails) {
        console.error('Course details not available');
        return;
      }

      const response = await axios.post(`${BASE_URL}/razorpay/checkout`, {
        items: [{
          id: courseDetails._id,
          quantity: 1
        }]
      });

      const orderData = response.data;

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LearnED.",
        description: orderData.courseTitle,
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(`${BASE_URL}/razorpay/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, {
              headers: { Authorization: `Bearer ${user.token}` } // Send token for authentication
            });

            if (verifyResponse.data.status === 'success') {
              setIsEnrolled(true);
              setShowSuccessPopup(true);
              setTimeout(() => {
                setShowSuccessPopup(true);
              }, 3000);
            } 
            else {
              window.location.href = orderData.cancel_url;
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            window.location.href = orderData.cancel_url;
          }
        },
        prefill: {
          name: user?.username || "",
          email: user?.email || "",
          contact: user?.phone || ""
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating Razorpay checkout:', error);
    }
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };

  const handleGoToCourse = () => {
    navigate(`/course/${id}/learningRoom`); // Adjust this route as per your application
  };

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

            <button onClick={isEnrolled ? handleGoToCourse : handleEnroll}>
              {isEnrolled ? 'Go to Course' : 'Enroll Now'}
            </button>
            <Link to="/allCourses">Back to All Courses</Link>

            {isLoginPopupVisible && <LoginPopup onLogin={closeLoginPopup} />}
            
            {showSuccessPopup && (
              <>
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                />
                <div className="success-popup">
                  <h2>Congratulations!</h2>
                  <p>You are successfully enrolled in {courseDetails.title}</p>
                </div>
              </>
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