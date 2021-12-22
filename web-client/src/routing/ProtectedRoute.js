import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext.js';

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return (
    isAuth ? children : <Navigate to="/login" />
  )
};
