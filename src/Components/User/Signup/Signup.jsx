
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from '../../../Pages/User/Signup/Signup-from';
import { signup } from "../../../Features/Authentication/Authslice";
import { verifyOtp } from "../../../Features/Authentication/Authslice";


function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSignUp = async (formData) => {
    const resultAction = await dispatch(signup(formData));
    if (signup.fulfilled.match(resultAction)) {
      setUserEmail(formData.email); // Save the user's email for OTP verification
      setIsOtpSent(true);
    }
  };

  const handleOtpVerification = async (otp) => {
    const resultAction = await dispatch(verifyOtp({ email: userEmail, otp }));
    if (verifyOtp.fulfilled.match(resultAction)) {
      navigate('/'); // Navigate to the home page after successful OTP verification
    }
  };

  return (
    <div>
      {isOtpSent ? (
        <OTPVerification onSubmit={handleOtpVerification} loading={loading} error={error} />
      ) : (
        <SignUpForm onSubmit={handleSignUp} />
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}

export default SignUpPage;
