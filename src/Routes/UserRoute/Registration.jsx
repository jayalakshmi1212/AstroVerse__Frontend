import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../../Components/User/Signup/Signup";
import OTPVerification from "../../Pages/User/Signup/OTPVerification";
import ForgotPassword from "../../Components/User/Login/ForgotPassword";
import ResetPassword from "../../Components/User/Login/ResetPassword";
import LoginPage from "../../Components/User/Login/LoginUser";

function RegistrationRoute() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      
      <Routes>
        <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
     
    </div>
  );
}

export default RegistrationRoute;
