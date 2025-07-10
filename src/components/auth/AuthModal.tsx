'use client';

import React, { useEffect, useState } from 'react';
import { useModalStore } from '@/stores/useModalStore';
import EmailForm from './EmailForm';
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../../../raiduix/firebase';
import { createUserProfileDocument } from '@/lib/firebaseHelpers'; // Import the helper

const AuthModal = () => {

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
