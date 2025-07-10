'use client';

import React, { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/useModalStore';
import EmailForm from './EmailForm';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../../../raiduix/firebase';
import { createUserProfileDocument } from '@/lib/firebaseHelpers'; // Import the helper

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authModalType } = useModalStore();
  const [isVisible, setIsVisible] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Loading state for Google button
  const [googleError, setGoogleError] = useState<string | null>(null); // Error state for Google button
  // Local view state for the modal: 'login' or 'signup'
  // Initialize based on what might be passed to openAuthModal, default to 'signup'
  const [view, setView] = useState<'login' | 'signup'>(authModalType || 'signup');

  useEffect(() => {
    // Sync local view state if global authModalType changes (e.g. if we decide to open directly to login)
    if (authModalType) {
      setView(authModalType);
    }
  }, [authModalType]);

  // To handle the slide-in animation and mounting/unmounting
  useEffect(() => {
    if (isAuthModalOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow for outro animation
      const timer = setTimeout(() => setIsVisible(false), 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isAuthModalOpen]);

  if (!isVisible && !isAuthModalOpen) { // Ensure component is not in DOM when not needed
    return null;
  }

  // Define animation classes based on modal state
  const modalAnimationClass = isAuthModalOpen ? 'animate-slideDownEnter' : 'animate-slideUpLeave';

  // Define specific animation keyframes and classes for slideDownEnter and slideUpLeave
  // These would be in your global CSS or a specific animations.css file.
  // For now, I'll assume they exist or add them if needed.
  // Example (add to styles/animations.css if not present):
  /*
  @keyframes slideDownEnter {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUpLeave {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-50px); opacity: 0; }
  }
  .animate-slideDownEnter { animation: slideDownEnter 0.3s ease-out forwards; }
  .animate-slideUpLeave { animation: slideUpLeave 0.3s ease-out forwards; }
  */

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign in successful:', user);
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        await createUserProfileDocument(user); // Call helper for new Google users
      } else {
        // For existing Google users, still call it to update lastLoginAt
        await createUserProfileDocument(user);
      }
      // AuthContext will handle redirect, modal should close.
    } catch (error: unknown) {
      console.error('Google sign in error:', error);
      // Type guard for Firebase errors with a 'code' property
      const isFirebaseError = (e: unknown): e is { code: string; message: string } => {
        return typeof e === 'object' && e !== null && 'code' in e && 'message' in e;
      };

      if (isFirebaseError(error)) {
        if (error.code === 'auth/popup-closed-by-user') {
          setGoogleError('Sign-in popup closed. Please try again.');
        } else {
          setGoogleError(error.message || 'Failed to sign in with Google.');
        }
      } else if (error instanceof Error) {
        setGoogleError(error.message || 'Failed to sign in with Google.');
      } else {
        setGoogleError('An unknown error occurred during Google sign-in.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isAuthModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={closeAuthModal} // Close on overlay click
    >
      <div
        className={`bg-graphite p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ${modalAnimationClass}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-2xl font-semibold text-chalk mb-6 text-center">
          {view === 'login' ? 'Welcome Back!' : 'Create Your Account'}
        </h2>

        <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-graphite font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors disabled:opacity-50"
            >
              {/* Basic Google Icon for simplicity, can be replaced with SVG component */}
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              {googleLoading ? 'Signing In...' : (view === 'login' ? 'Sign In with Google' : 'Sign Up with Google')}
            </button>
            {googleError && <p className="text-sm text-red-500 text-center">{googleError}</p>}

            <div className="text-center text-chalk/50 my-2">OR</div>
            <EmailForm view={view} />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            className="text-sm text-amber-500 hover:text-amber-400"
          >
            {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>

        <button
            onClick={closeAuthModal}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Close modal"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
