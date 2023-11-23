import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home'
import LoginSignupForm from './pages/Login-Signup/loginSignup';
import { Context } from './context/Context';
import AllCourses from './pages/AllCourses/AllCourses';
import CourseDetail from './components/CourseDetail/CourseDetail'
import Success from './pages/Payment/Success'
import BlogHome from './pages/Blog/Home/Home'
import DataProvider from './pages/Blog/Context/DataProvider';
import Header from './components/BlogComponents/Header/Header';
import CreatePost from './components/BlogComponents/Create/CreatePost';
import Update from './components/BlogComponents/Create/Update';
import DetailView from './components/BlogComponents/Details/DetailView';


function App() {
  
  const { user } = useContext(Context);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path="/loginSignup" element={user ? <Home/> : <LoginSignupForm />} />
          <Route exact path="/allCourses" element={<AllCourses />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/blog/home" element={<BlogHome />} />
          <Route exact path="/blog/create" element={user ? <CreatePost/> : <BlogHome/> } />
          <Route path="/courses/:id" element={<CourseDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
