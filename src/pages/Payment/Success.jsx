import React, { useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import './Success.css'
const ConfettiSuccess = ({ location }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(location?.state?.redirectPath || '/');
    }, 5000); // Redirect after 5 seconds (adjust as needed)

    return () => clearTimeout(timeoutId);
  }, [navigate, location]);

  return (
    <div className="success_wrapper">
      <h1>Enrollment Successful! </h1>
      <p>🎉</p>
      <Confetti />
    </div>
  );
};

export default ConfettiSuccess;
