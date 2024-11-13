import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/User/Home/Header';
import Footer from './Components/User/Home/Footer';
import HomePage from './Pages/User/HomePage/HomePage';
import LoginPage from './Components/User/Login/LoginUser';
import SignUpPage from './Components/User/Signup/Signup';
import OTPVerification from './Pages/User/Signup/OTPVerification';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signUp' element={<SignUpPage/>}/>
          <Route path='/otp-verification' element={<OTPVerification/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;