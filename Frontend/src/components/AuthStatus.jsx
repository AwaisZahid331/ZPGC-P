import React from 'react';
import { useAppSelector } from '../store/hooks';

const AuthStatus = () => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Checking authentication...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="text-sm text-green-600">
        ✅ Logged in as {user?.name || 'User'}
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-500">
      Not logged in
    </div>
  );
};

export default AuthStatus;
