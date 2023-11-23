import React, { useState, useContext, useRef } from 'react';
import './LoginPopup.css'; 
import axios from 'axios';
import { Context } from "../../context/Context";

const LoginPopup = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userRef = useRef();
  const passwordRef = useRef();

  const { dispatch, isFetching } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // alert("Login success")
      const res = await axios.post("http://localhost:8000/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      onLogin();
    } catch (err) {
      alert("Invalid username or password!!")
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  // const handleLogin = () => {
  //   // Add your actual login logic here
  //   // For simplicity, I'm assuming a successful login for any non-empty username and password
  //   if (username.trim() !== '' && password.trim() !== '') {
  //     onLogin(); // Call the onLogin callback to update the login status in the parent component
  //   } else {
  //     alert('Invalid username or password. Please try again.');
  //   }
  // };

  return (
    <div className="LoginPopup__Overlay">
      <div className="LoginPopup__Content">
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} ref={userRef}/>
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} ref={passwordRef}/>
          </label>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
