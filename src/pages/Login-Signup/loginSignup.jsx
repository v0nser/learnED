import React, { useState, useContext, useRef } from 'react';
import { FaTwitter, FaGoogle, FaLinkedin, FaFacebook, FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import axios from 'axios';
import { Context } from "../../context/Context";
import { BASE_URL } from '../../utils/config'
import { Link } from "react-router-dom";
import './loginSignup.css';
import loginSignupImg from '../../assets/login-signup.png'

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const googleLogin = () => {
    // Replace the URL with the actual Google authentication URL
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const { dispatch, isFetching } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className={`sign-in-form ${isSignUp ? 'hidden' : ''}`} onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <FaUser />
              <input type="text" placeholder="Username" ref={userRef} />
            </div>
            <div className="input-field">
              <FaLock />
              <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <button className="btn solid">Login</button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" onClick={googleLogin}>
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </form>
          <form action="#" className={`sign-up-form ${isSignUp ? '' : 'hidden'}`} onSubmit={handleSignup}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <FaUser />
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <FaEnvelope />
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <FaLock />
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn">Sign up</button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon">
                <FaLinkedin />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className="btn transparent" onClick={toggleMode}>Sign up</button>
          </div>
          <img src={loginSignupImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btn transparent" onClick={toggleMode}>Sign in</button>
          </div>
          <img src={loginSignupImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
