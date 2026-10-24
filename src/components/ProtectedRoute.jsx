import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingState } from './LoadingState';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState message="Verifying security credentials..." />;
  }

  if (!user) {
    // Redirect to sign in while preserving original destination
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
