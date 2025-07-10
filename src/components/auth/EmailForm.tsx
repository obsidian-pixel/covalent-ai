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
    } catch (err: unknown) {
      let friendlyMessage = 'An error occurred. Please try again.';
      if (err instanceof Error && 'code' in err) {
        const errorCode = (err as { code: string }).code;
        switch (errorCode) {
          case 'auth/invalid-email':
            friendlyMessage = 'Please enter a valid email address.';
            break;
          case 'auth/user-disabled':
            friendlyMessage = 'This user account has been disabled.';
            break;
          case 'auth/user-not-found':
            friendlyMessage = 'No user found with this email. Please sign up.';
            break;
          case 'auth/wrong-password':
            friendlyMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/email-already-in-use':
            friendlyMessage = 'This email is already in use. Please login or use a different email.';
            break;
          case 'auth/weak-password':
            friendlyMessage = 'Password should be at least 6 characters.';
            break;
          default:
            friendlyMessage = err.message; // Fallback to Firebase message
        }
      }
      setError(friendlyMessage);
      console.error(`${view} Firebase error:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-chalk/80 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-carbon border border-graphite/70 rounded-md text-chalk focus:ring-amber-500 focus:border-amber-500"
          placeholder="you@example.com"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-chalk/80 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6} // Firebase default minimum
          className="w-full px-3 py-2 bg-carbon border border-graphite/70 rounded-md text-chalk focus:ring-amber-500 focus:border-amber-500"
          placeholder="••••••••"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-900/30 p-2 rounded-md">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (view === 'signup' ? 'Signing Up...' : 'Logging In...') : (view === 'signup' ? 'Sign Up' : 'Login')}
      </button>
    </form>
  );
};

export default EmailForm;
