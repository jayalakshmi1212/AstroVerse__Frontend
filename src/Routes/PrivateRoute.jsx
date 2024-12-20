import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
  const { user, role: userRole } = useSelector((state) => state.auth);

  if (!user || userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};




const AdminPrivateRoute = ({ children }) => {
    const { role } = useSelector((state) => state.auth); // Get the role from Redux state
  
    // Check if the role is "admin"
    if (role !== "admin") {
      return <Navigate to="/admin" replace />; // Redirect to login if not admin
    }
  
    return children; // Render the protected component
  };
  
  export  {PrivateRoute,AdminPrivateRoute};