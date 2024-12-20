import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/User/Login/LoginUser";
import SignUpPage from "./Components/User/Signup/Signup";
import OTPVerification from "./Pages/User/Signup/OTPVerification";
import ForgotPassword from "./Components/User/Login/ForgotPassword";
import ResetPassword from "./Components/User/Login/ResetPassword";
import UserRoute from "./Routes/UserRoute/UserRoute";
import TutorSignup from "./Components/tutor/TutorSignUpPage";
import TutorHome from "./Components/tutor/Home/TutorHome";
import OTPVerificationTutor from "./Pages/tutor/SignupTutor/OtpVerificationTutor";
import AdminLogin from "./Pages/Admin/adminLogin";
import Login from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CategoryManagement from "./Pages/Admin/Category/CategoryManagement";
import UserList from "./Components/Admin/List/UserList"; 
import TutorList from "./Components/Admin/List/TutorList";
import AddCourseForm from "./Components/tutor/CourseManagement/CourseManagement";
import CourseList from "./Components/tutor/CourseManagement/CourseList";
import TutorRoute from "./Routes/TutorRoute/TutorRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import LandingPage from "./Components/landingpage";

function App() {
  return (
    <Router>
      {" "}
      {/* Only one Router in the App */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Routes>
          <Route path="/*" element={<UserRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route path="/tutor/*" element={<TutorRoute/>} />

          <Route path="/admin/*" element={<AdminRoute/>}/>
         
          <Route path="/" element={<LandingPage />} />
          

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
