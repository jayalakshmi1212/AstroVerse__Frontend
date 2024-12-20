
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserProfile } from '../../../Features/Authentication/UserSlice'
import {clearUser} from '../../../Features/Authentication/Authslice'
const LogoutButton = ({ children, className }) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserProfile());
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