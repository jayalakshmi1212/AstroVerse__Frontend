
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../../Features/Authentication/Authslice';
const LogoutButton = ({ children, className }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className={className || 'logout-button'}>
      {children || 'Logout'}
    </button>
  );
};

export default LogoutButton;