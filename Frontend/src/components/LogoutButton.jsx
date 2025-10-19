import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/authSlice';

const LogoutButton = ({ className = "", children = "Logout", onClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
