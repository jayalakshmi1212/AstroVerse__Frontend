// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';


// function SignUpForm({ onSubmit = () => {} }) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//   });

//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);  // To handle loading state
//   const [serverError, setServerError] = useState('');  // To handle server errors
//   const navigate = useNavigate();  // For navigation after successful signup


//   const validateForm = () => {
//     const newErrors = {};
    
//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters long';
//     }

//     // Confirm Password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     // Phone number validation
//     const phoneRegex = /^\+?[\d\s-]{10,}$/;
//     if (!phoneRegex.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Please enter a valid phone number';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setIsLoading(true);  // Start loading
//       setServerError('');  // Reset any previous error
  
//       try {
//         const response = await fetch('http://127.0.0.1:8000/signup/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             username: formData.fullName,  // If you're storing fullName as the username
//             email: formData.email,
//             password: formData.password,
//             phone_number: formData.phoneNumber,  // If needed by your backend
//             role: 'user'
//           }),
//         });
//         console.log('response in singup form page', response)
  
//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error('Error:', errorData);
//           setServerError('There was an error during signup.'); // Optional, display error message in the UI
//         } else {
          
//           const result = await response.json();
//           console.log(result);
//           navigate('/otp-verification',{ state: { email: formData.email } });
//           // You can also handle success, e.g., redirect or show a success message
//         }
//       } catch (error) {
//         console.error('Request failed:', error);
//         setServerError('There was a network error. Please try again later.'); // Optional
//       } finally {
//         setIsLoading(false);  // Stop loading
//       }
//     }
//   };
  
//   const togglePasswordVisibility = (field) => {
//     setShowPassword(prev => ({
//       ...prev,
//       [field]: !prev[field]
//     }));
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Column - Form */}
//       <div className="w-full md:w-1/2 flex flex-col p-8">
//         <div className="mb-8">
//           <div className="flex items-center gap-2">
//             <div className="bg-black p-2 rounded">
//               <span className="text-white text-2xl font-bold">A</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">Astro Dashboard</h1>
//               <p className="text-sm text-gray-600">An Accessible Astro Theme</p>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
//           <div>
//             <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               type="text"
//               required
//               value={formData.fullName}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.fullName && (
//               <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <div className="mt-1 relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword.password ? 'text' : 'password'}
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => togglePasswordVisibility('password')}
//               >
//                 {showPassword.password ? (
//                   <EyeOff className="h-5 w-5 text-gray-400" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <div className="mt-1 relative">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showPassword.confirmPassword ? 'text' : 'password'}
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => togglePasswordVisibility('confirmPassword')}
//               >
//                 {showPassword.confirmPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400" />
//                 )}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               id="phoneNumber"
//               name="phoneNumber"
//               type="tel"
//               required
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {errors.phoneNumber && (
//               <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
//             )}
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//             >
//               Sign Up
//             </button>
//           </div>

//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>

//       {/* Right Column - Image */}
//       <div className="hidden md:block md:w-1/2 bg-black">
//         <div className="h-full flex items-center justify-center p-8">
//           <img
//             src="/placeholder.svg?height=400&width=400"
//             alt="Astronaut sitting on crescent moon"
//             className="max-w-full h-auto rounded-lg"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUpForm;


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import astronomyImage from '../../../assets/images/astronomy-kids-cartoon.avif'
import { Star} from 'lucide-react';

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  })

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      setServerError('')
  
      try {
        const response = await fetch('http://127.0.0.1:8000/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone_number: formData.phoneNumber,
            role: 'user'
          }),
        })
        console.log('response in signup form page', response)
  
        if (!response.ok) {
          const errorData = await response.json()
          console.error('Error:', errorData)
          setServerError('There was an error during signup.')
        } else {
          const result = await response.json()
          console.log(result)
          navigate('/otp-verification', { state: { email: formData.email } })
        }
      } catch (error) {
        console.error('Request failed:', error)
        setServerError('There was a network error. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            
            <div>
            <Link to="/" className="flex items-center space-x-2">
          <Star className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">AstroVerse</span>
        </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D2951] focus:border-[#1D2951]"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D2951] focus:border-[#1D2951]"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type={showPassword.password ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D2951] focus:border-[#1D2951]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword.password ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D2951] focus:border-[#1D2951]"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPassword.confirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1D2951] focus:border-[#1D2951]"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1D2951] hover:bg-[#2A3A6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D2951]"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          {serverError && (
            <p className="text-center text-sm text-red-600">{serverError}</p>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#1D2951] hover:text-[#2A3A6D]">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2 bg-[rgb(245,246,247)]">
        <div className="h-full flex items-center justify-center p-8">
          <img
            src={astronomyImage}
            alt="Astronaut sitting on crescent moon"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}