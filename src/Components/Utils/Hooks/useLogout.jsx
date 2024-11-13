// hooks/useLogout.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh');
      await axios.post('http://127.0.0.1:8000/logout/', { refresh: refreshToken });

      // Clear tokens from local storage
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');

      // Clear any user data from Redux or Context (if applicable)
      dispatch({ type: 'LOGOUT' }); // Adjust based on your Redux setup

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return logout;
};

export default useLogout;
