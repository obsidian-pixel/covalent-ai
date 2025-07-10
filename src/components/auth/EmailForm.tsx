'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../raiduix/firebase'; // Corrected path
import { createUserProfileDocument } from '@/lib/firebaseHelpers'; // Import the helper

interface EmailFormProps {
  view: 'login' | 'signup';
  // We might need to pass down closeAuthModal or other handlers from AuthModal
}

const EmailForm = ({ view }: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (view === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        await createUserProfileDocument(userCredential.user); // Call the helper
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // For login, createUserProfileDocument also handles updating lastLoginAt if document exists
        await createUserProfileDocument(userCredential.user);
        console.log('User logged in:', userCredential.user);
      }
      // On successful login/signup, AuthContext will detect user change.
      // Modal should ideally close automatically upon successful auth state change handled by AuthContext.
      // For now, we can manually close it, but this might be refined later.
      // Or, rely on AuthContext to change state that AuthModal listens to for closing itself.
      // The current AuthModal closes when isAuthModalOpen becomes false.
      // The AuthContext should set user, then redirect. The modal should close after that.
      // For now, let's assume successful auth will trigger AuthContext changes,
      // and we might need a mechanism in AuthModal to close if `user` becomes non-null.
      // Or, more simply, the redirect in AuthContext will make the modal disappear.
      // Let's rely on the redirect for now. If user is set, AuthContext redirects, modal is gone.
      