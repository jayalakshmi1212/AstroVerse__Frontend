
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const OTPInput = ({ field, form }) => {
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (element.value.length > 1) {
      element.value = element.value.slice(0, 1);
    }
    const joinedValue = [...(form.values.otp || '')];
    joinedValue[index] = element.value;
    form.setFieldValue(field.name, joinedValue.join(''));

    // Move to next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-between">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1D2951]"
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          value={(form.values.otp || '')[index] || ''}
        />
      ))}
    </div>
  );
};

export default function OTPVerificationTutor() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleVerifyOTP = async (values) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/verify-otp/', { email, otp: values.otp });

      if (response.status === 200) {
        navigate('/tutor-home');
      }
    } catch (error) {
      setError('Invalid OTP or OTP has expired.');
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().length(6, 'OTP must be exactly 6 digits').required('OTP is required'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-[#1D2951]">Verify OTP</h2>
        <p className="text-gray-600 mb-6">Enter the OTP sent to {email}</p>
        <Formik
          initialValues={{ otp: '' }}
          validationSchema={validationSchema}
          onSubmit={handleVerifyOTP}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Field name="otp" component={OTPInput} />
              {errors.otp && touched.otp && (
                <div className="text-red-500 text-sm">{errors.otp}</div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              <button 
                type="submit" 
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  loading || timeLeft === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#1D2951] hover:bg-[#2A3A6D] focus:outline-none focus:ring-2 focus:ring-[#1D2951] focus:ring-opacity-50'
                }`}
                disabled={loading || timeLeft === 0}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-500">
              Time remaining: {timeLeft}s
            </p>
          ) : (
            <p className="text-sm text-red-500">OTP expired. Please request a new one.</p>
          )}
        </div>
      </div>
    </div>
  );
}