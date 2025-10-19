import React from 'react';
import { useLoading } from '../contexts/LoadingContext';
import Loader from './Loader';

const GlobalLoader = () => {
  const { isLoading, loadingMessage } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center">
        <Loader />
        <p className="text-gray-600 mt-4 text-lg">{loadingMessage}</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
