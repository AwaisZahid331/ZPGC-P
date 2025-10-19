import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { verifyEmail } from '../store/authSlice';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [verificationStatus, setVerificationStatus] = useState('verifying');

  useEffect(() => {
    const handleVerification = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        toast.error('Invalid verification link');
        return;
      }

      try {
        await dispatch(verifyEmail(token)).unwrap();
        setVerificationStatus('success');
        toast.success('✅ Email verified successfully! You can now login.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        setVerificationStatus('error');
        toast.error(error || 'Verification failed');
      }
    };

    handleVerification();
  }, [searchParams, navigate, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 mt-4 text-lg">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {verificationStatus === 'success' ? (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Email Verified Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Your email has been verified. You can now login to your account.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired. Please try registering again.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Go to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
