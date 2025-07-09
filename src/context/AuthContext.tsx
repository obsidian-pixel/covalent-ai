'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { auth, firestore } from '../../raiduix/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore'; // Import modal store

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: DocumentData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<DocumentData | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { closeAuthModal, isAuthModalOpen } = useModalStore(); // Get modal actions

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            // This case should ideally be handled by createUserProfileDocument
            // If somehow a user exists in Auth but not Firestore, we might need to create it here too
            // or ensure createUserProfileDocument is robustly called everywhere.
            console.warn(`No Firestore document found for user ${currentUser.uid}. Profile might be incomplete.`);
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // If loading is complete and user is authenticated
    // And they are currently on the landing page (or any other non-auth-required page you define)
    // Then redirect to /components
    if (!loading && user && (pathname === '/' || pathname === '/login' || pathname === '/signup')) {
      if (isAuthModalOpen) {
        closeAuthModal();
      }
      router.push('/components');
    }
    // Optional: Redirect unauthenticated users from protected routes
    // This is a basic example. Robust protected routes often involve middleware or HOCs.
    // const protectedRoutes = ['/components', '/account', '/generate'];
    // if (!loading && !user && protectedRoutes.includes(pathname)) {
    //   if (isAuthModalOpen) {
    //     closeAuthModal();
    //   }
    //   router.push('/'); // Or router.push('/login');
    // }
  }, [user, loading, router, pathname, closeAuthModal, isAuthModalOpen]);

  return (
    <AuthContext.Provider value={{ user, loading, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
