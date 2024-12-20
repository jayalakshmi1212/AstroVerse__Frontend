import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../Components/User/Home/Header";
import HomePage from "../../Pages/User/HomePage/HomePage";
import SignUpPage from "../../Components/User/Signup/Signup";
import OTPVerification from "../../Pages/User/Signup/OTPVerification";
import ForgotPassword from "../../Components/User/Login/ForgotPassword";
import ResetPassword from "../../Components/User/Login/ResetPassword";
import Footer from "../../Components/User/Home/Footer";
import UserCourseList from "../../Components/User/List/UserCourseList";
import UserProfile from "../../Components/User/Profile/UserProfile";
import CourseDetail from "../../Components/User/List/userCoursedetail";
import LessonList from "../../Components/User/List/Lesson";
import {PrivateRoute} from "../PrivateRoute";
function UserRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<UserCourseList />} />
        <Route path="/profile"  element={
          <PrivateRoute role="user">
            <UserProfile />
          </PrivateRoute>
        } />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:courseId/lessons" element={<LessonList />} />

        
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoute;
