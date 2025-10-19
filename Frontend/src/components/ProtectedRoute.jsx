import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Loader from './Loader';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Show loader while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 mt-4 text-lg">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to home with return url
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and role matches (if required), render children
  return children;
};

export default ProtectedRoute;
