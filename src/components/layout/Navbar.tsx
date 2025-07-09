'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Corrected path using alias
import Link from 'next/link'; // For the Login button

// Placeholder for UserMenu component
const UserMenu = () => {
  const { user } = useAuth();
  return (
    <div className="text-sm">
      Welcome, {user?.displayName || user?.email || 'User'}
      {/* Implement actual user menu dropdown here */}
    </div>
  );
};

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-graphite/70 backdrop-blur-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-chalk">
        <Link href="/">RaiduIX</Link>
      </div>
      <div>
        {user ? (
          <UserMenu />
        ) : (
          <Link href="/login" legacyBehavior>
            <a className="px-4 py-2 bg-electron text-chalk rounded hover:bg-electron/80 transition-colors">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
