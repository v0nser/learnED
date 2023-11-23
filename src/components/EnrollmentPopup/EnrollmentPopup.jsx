import React, { useState, useEffect } from 'react';
import './EnrollmentPopup.css';

const EnrollmentPopup = ({ onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const countdown = () => {
            if (progress > 0) {
                setProgress(progress - 10);
            }
        };

        const countdownInterval = setInterval(countdown, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(countdownInterval);
    }, [progress]);

    return (
        <div className="enrollment-popup">
            {progress > 0 ? (
                <>
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <div className="tick-container">
                        <svg
                            className="tick"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="green"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>

                        <p>Hold On! Setting you up.</p>
                    </div>
                </>
            ) : (
                <div className="success-message">Successfully Enrolled!</div>
            )}
            <button className="close-button" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default EnrollmentPopup;
