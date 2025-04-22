import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirects to login if no user is found in localStorage
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
