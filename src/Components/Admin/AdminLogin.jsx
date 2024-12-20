// import React, { useState } from 'react';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://127.0.0.1:8000/adminlogin/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage(`Welcome, ${data.user.email}`);
//       localStorage.setItem('user', JSON.stringify(data.user)); // Store user details in localStorage
//     } else {
//       setMessage(data.error || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Eye, EyeOff } from 'lucide-react';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/adminlogin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.user.email}`);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        navigate('/admin/admindashboard'); // Navigate to AdminDashboard
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred during login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-4xl w-full flex bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-[#00A9A5] items-center justify-center p-8">
            <div className="w-full max-w-md">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Astronomy Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 px-6 py-8 md:px-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
              <p className="mt-2 text-sm text-gray-600">Welcome back!</p>
              {message && (
                <p className="mt-2 text-sm text-red-600">{message}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your Email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00A9A5] hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
