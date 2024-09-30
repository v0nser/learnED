import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home'
import LoginSignupForm from './pages/Login-Signup/loginSignup';
import { Context } from './context/Context';
import AllCourses from './pages/AllCourses/AllCourses';
import CourseDetail from './components/CourseDetail/CourseDetail'
import Success from './pages/Payment/Success'
import BlogHome from './pages/Blog/Home/Home'
import Settings from './pages/Blog/Settings/Settings';
import Write from './pages/Blog/Write/Write';
import Single from './pages/Blog/Single/Single';
import LearningRoom from './pages/LearningRoom/learningroom';
import LiveClass from './components/LiveRoom/JitsiMeeting'

function App() {
  
  const { user } = useContext(Context);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/loginSignup" element={user ? <Home/> : <LoginSignupForm />} />
          <Route path="/allCourses" element={<AllCourses />} />
          <Route path="/success" element={<Success />} />
          <Route path="/blog/home" element={user ? <BlogHome /> : <Home/>} />
          <Route path="/blog/write" element={user ? <Write/> : <LoginSignupForm/> } />
          <Route path="/blog/settings" element={user ? <Settings/> : <LoginSignupForm/> } />
          <Route path="/blog/posts/:id" element={user ? <Single/> : <BlogHome/>}></Route>
          <Route path="/courses/:id" element={<CourseDetail/>} />
          <Route path="/courses/:id/learningRoom" element={<LearningRoom/>} />  
          <Route path="/liveclass" element={user ? <LiveClass/> : <Home/>}/> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
