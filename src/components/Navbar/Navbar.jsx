import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Context } from '../../context/Context';

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const usertoken = localStorage.getItem('token');
    console.log('usertoken:', usertoken);

    try {
      const userObject = JSON.parse(usertoken);
      const userPayload = JSON.parse(userObject.user);
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
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" onClick={toggleMenu}>
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="/allCourses" onClick={toggleMenu}>
              Courses
            </a>
          </li>
          <li className="nav-item">
            <a href="/liveclass" onClick={toggleMenu}>
              Live Class
            </a>
          </li>
          <li className="nav-item">
            <a href="/blog/home" onClick={toggleMenu}>
              Blog
            </a>
          </li>
          <div className="auth-buttons mobile">
            {user ? (
              <>
                <p>Welcome, {user.username}</p>
                <button className="login-button" onClick={handleLogOut}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/loginSignup" onClick={toggleMenu}>
                <button className="login-button">Login</button>
              </Link>
            )}
          </div>
        </ul>
        <div className="auth-buttons">
          {user ? (
            <>
              <p>Welcome, {user.username}</p>
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