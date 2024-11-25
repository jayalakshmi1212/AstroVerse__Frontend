// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const TutorSignup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');
//   const [showOtpForm, setShowOtpForm] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/signup/tutor/', formData);
//       setMessage(response.data.message);
//       if (response.data.redirect_to) {
//         setShowOtpForm(true); // Show OTP form if signup is successful
//       }
//     } catch (error) {
//       setMessage('Error: ' + (error.response?.data?.detail || 'Unable to sign up.'));
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8000/tutor/verify-otp/', {
//         email: formData.email,
//         otp: otp,
//       });
//       setMessage(response.data.message);
//       if (response.data.access) {
//         // Store tokens and redirect to the tutor home page
//         localStorage.setItem('access_token', response.data.access);
//         localStorage.setItem('refresh_token', response.data.refresh);
//         navigate('/tutor-home');
//       }
//     } catch (error) {
//       setMessage('Error: ' + (error.response?.data?.detail || 'Invalid OTP.'));
//     }
//   };

//   return (
//     <div>
//       <h2>Tutor Signup</h2>
//       {message && <p>{message}</p>}

//       {!showOtpForm ? (
//         <form onSubmit={handleSignupSubmit}>
//           <div>
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Sign Up</button>
//         </form>
//       ) : (
//         <form onSubmit={handleOtpSubmit}>
//           <div>
//             <label>Enter OTP:</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={handleOtpChange}
//               required
//             />
//           </div>
//           <button type="submit">Verify OTP</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default TutorSignup;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TutorSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup/tutor/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phoneNumber
      });
      
      setMessage(response.data.message);
      if (response.data.redirect_to) {
        navigate('/tutor-otp', { state: { email: formData.email } });
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.detail || 'Unable to sign up.'));
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="text-gray-500">Create your tutor account</p>
          </div>
          <img 
            src="/placeholder.svg?height=100&width=100" 
            alt="Welcome illustration" 
            className="w-24 h-24 rounded-full"
          />
        </div>

        {message && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <img
              className="h-5 w-5 mr-2"
              src="/placeholder.svg?height=20&width=20"
              alt="Google logo"
            />
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <img
              className="h-5 w-5 mr-2"
              src="/placeholder.svg?height=20&width=20"
              alt="Facebook logo"
            />
            Continue with Facebook
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignupSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default TutorSignup;

