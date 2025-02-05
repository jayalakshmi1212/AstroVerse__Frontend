import React from "react";
import { Route, Routes } from "react-router-dom";
import OTPVerificationTutor from "../../Pages/tutor/SignupTutor/OtpVerificationTutor";
import TutorSignup from "../../Components/tutor/TutorSignUpPage";
import TutorHome from "../../Components/tutor/Home/TutorHome";
import AddCourseForm from "../../Components/tutor/CourseManagement/CourseManagement";
import CourseList from "../../Components/tutor/CourseManagement/CourseList";
import CourseDetails from "../../Components/tutor/CourseManagement/CourseDetails";
import Header from "../../Components/tutor/Home/Header";
import CourseManagement from "../../Components/tutor/MyCourse";
import TutorProfile from "../../Components/tutor/Profile/TutorProfile";
import TutorReviewsPage from "../../Components/tutor/CourseManagement/ReviewCourse";
import {PrivateRoute} from "../PrivateRoute";
function TutorRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Routes>
        <Route path="/signup" element={<TutorSignup />} />
        <Route path="/tutor-home" element={
          <PrivateRoute role="tutor">
            <TutorHome />
          </PrivateRoute>
        } />
        <Route path="/tutor-otp" element={<OTPVerificationTutor />} />
        <Route path="/course" element={
          <PrivateRoute role="tutor">
            <AddCourseForm />
          </PrivateRoute>
        } />
        <Route path="/courselist" element={<CourseList/>} />
        <Route path="/coursedetail/:id" element={<CourseDetails />} />
        <Route path="/mycourse" element={<CourseManagement/>} />
        <Route path="/tutorprofile" element={<TutorProfile/>}/>
        <Route path="/reviews" element={<TutorReviewsPage />} />

      </Routes>
    </div>
  );
}

export default TutorRoute;
