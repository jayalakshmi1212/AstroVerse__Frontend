import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/User/Login/LoginUser";
import SignUpPage from "./Components/User/Signup/Signup";
import OTPVerification from "./Pages/User/Signup/OTPVerification";
import ForgotPassword from "./Components/User/Login/ForgotPassword";
import ResetPassword from "./Components/User/Login/ResetPassword";
import UserRoute from "./Routes/UserRoute/UserRoute";
import TutorRoute from "./Routes/TutorRoute/TutorRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";
import LandingPage from "./Components/landingpage";
import ChatComponent from "./Components/User/Chat/Chat";
import ChatListComponent from "./Components/User/Chat/ChatListComponent";

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
          
         
          {/* <Route path="/" element={<LandingPage />} /> */}
          
          <Route path="/chat/:senderId/:recipientId" element={<ChatComponent />} />
          <Route path="/chats" element={<ChatListComponent />} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
