import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Define a base URL for axios requests
    axios.defaults.baseURL = 'http://localhost:8000';

    // Check if token is valid on component mount
    axios.get(`/api/reset-password/${uidb64}/${token}/`)
      .then(response => {
        setTokenValid(true);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Invalid or expired token.');
      });
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/reset-password/${uidb64}/${token}/`, { new_password: newPassword });
      setMessage(response.data.message || 'Password reset successful.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>

        {tokenValid ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">{message}</p>
        )}

        {message && !tokenValid && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">If you have any issues, please contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
