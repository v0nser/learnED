import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import { Context } from "../../context/Context"


const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const usertoken = localStorage.getItem('token');
    console.log('usertoken:', usertoken);
  
    try {
      // Parse the JSON string
      const userObject = JSON.parse(usertoken);
  
      // Parse the nested JSON string
      const userPayload = JSON.parse(userObject.user);
  
      // Extract the username
      const username = userPayload?.username || null;
  
      console.log('username:', username);
    } catch (error) {
      console.error('Error parsing usertoken:', error);
    }
  }, []);
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo">
          Learn<span>ED.</span>
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="#about">About</a>
          </li>
          {/* <li className="nav-item">
            <a href="/services">Services</a>
          </li> */}
          <li className="nav-item">
            <a href="#contact">Contact</a>
          </li>
          <li className="nav-item">
            <a href="/allCourses">Courses</a>
          </li>
          <li className="nav-item">
            <a href="/liveclass">Live Class</a>
          </li>
          <li className="nav-item">
            <a href="/blog/home">Blog</a>
          </li>
        </ul>
        <div className="auth-buttons">
          {user ? (
            <>
              <p> Welcome, {user.username}</p>
              <button className="login-button" onClick={handleLogOut}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/loginSignup">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
