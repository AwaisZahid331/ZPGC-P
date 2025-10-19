import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Loader from './Loader';

const AutoRedirect = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        // User is authenticated, redirect to dashboard
        navigate('/user/dashboard', { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, navigate]);

  // Show loader while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 mt-4 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, this component won't render (handled by parent)
  return null;
};

export default AutoRedirect;
