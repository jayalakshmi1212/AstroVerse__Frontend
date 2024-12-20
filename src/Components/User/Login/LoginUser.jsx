// import React, { useState } from 'react';
// import LoginForm from '../../../Pages/User/Login/Login-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';  // Import axios for API requests

// function LoginPage() {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);  // Define state for error

//   // Define login API function
//   const loginApi = async (formData) => {
//     try {
//       // Replace this with your actual backend URL
//       const response = await axios.post('http://localhost:8000/login/', formData);
      
//       // Check if response contains access and refresh tokens
//       if (response.data.access && response.data.refresh) {
//         return response.data;  // Return the response containing tokens
//       } else {
//         throw new Error('Invalid credentials');  // Handle missing tokens or invalid response
//       }
//     } catch (err) {
//       throw err;  // Throw the error to be caught in handleLogin
//     }
//   };

//   const handleLogin = async (formData) => {
//     try {
//       console.log("Form data submitted:", formData);
//       const response = await loginApi(formData); // Call your login API here
//       console.log("API Response:", response); // Check the response

//       if (response && response.access && response.refresh) {
//         // Save tokens in localStorage (or other secure storage)
//         localStorage.setItem('access', response.access);
//         // localStorage.setItem('refresh', response.refresh);

//         // Redirect to home page or dashboard
//         navigate('/');  // You can change this to navigate to another route like '/dashboard'
//       } else {
//         console.error("Invalid credentials or response:", response);
//         setError('Invalid credentials, please try again.');
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Left side - Illustration */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12">
//         <div className="w-96 h-96 bg-blue-900 rounded-full flex items-center justify-center">
//           <img
//             src="/placeholder.svg?height=300&width=300"
//             alt="Astronomy illustration"
//             className="w-full h-full object-contain p-8"
//           />
//         </div>
//       </div>

//       {/* Right side - Login Form */}
//       <div className="w-full lg:w-1/2">
//         <LoginForm onSubmit={handleLogin} redirectUrl="/dashboard" setError={setError} /> {/* Pass setError to LoginForm */}
//         {error && <p className="text-red-500">{error}</p>} {/* Display error if exists */}
//       </div>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import LoginForm from '../../../Pages/User/Login/Login-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Features/Authentication/Authslice';
import LoginImage from '../../../assets/images/login.jpg';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const loginApi = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', formData);
      console.log('Login API Response:', response.data);

      if (response.data.access && response.data.refresh) {
        return response.data; // Return the full response data
      } else {
        throw new Error('Invalid credentials'); // API did not return the expected tokens
      }
    } catch (err) {
      console.error('Login API Error:', err.response?.data || err.message);
      throw err; // Rethrow the error for further handling
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await loginApi(formData);

      if (response) {
        // Save tokens to sessionStorage
        sessionStorage.setItem('accessToken', response.access);
        sessionStorage.setItem('refreshToken', response.refresh);

        // Dispatch setUser with user data, accessToken, and refreshToken
        dispatch(
          setUser({
            user: response.user,
            accessToken: response.access,
            refreshToken: response.refresh,
            role: response.user.role,
          })
        );

        // Navigate based on the user's role
        if (response.user.role === 'tutor') {
          navigate('/tutor/tutor-home');
        } else if (response.user.role === 'user') {
          navigate('/');
        } else {
          setError('Unknown user role. Please contact support.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12">
        <div className="w-[500px] h-[500px] rounded-full flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Login illustration"
            className="w-full h-full object-contain p-8 rounded-full"
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2">
        <LoginForm onSubmit={handleLogin} setError={setError} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
