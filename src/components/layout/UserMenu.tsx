'use client';

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../../raiduix/firebase'; // Corrected path

// Placeholder for user avatar or icon
const UserAvatar = ({ photoURL }: { photoURL?: string | null }) => {
  if (photoURL) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />;
  }
  // Simple placeholder icon (e.g., SVG or initials)
  return (
    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-semibold text-graphite">
      {/* Placeholder: Could use user's initials if available */}
      U
    </div>
  );
};


const UserMenu = () => {
  const { user, userProfile } = useAuth();

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await signOut(auth);
      // AuthContext's onAuthStateChanged will handle the rest:
      // - Setting user to null
      // - Clearing userProfile
      // - The redirect to '/' or login page will happen due to protected routes or Navbar changes
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
      // Optionally, display an error message to the user
    }
  };

  if (!user) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full bg-graphite text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-graphite">
          <span className="sr-only">Open user menu</span>
          <UserAvatar photoURL={user.photoURL || userProfile?.photoURL} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-carbon shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-graphite/50">
              <p className="text-sm text-chalk">Signed in as</p>
              <p className="truncate text-sm font-medium text-chalk/90">
                {user.displayName || user.email}
              </p>
            </div>
            <Menu.Item>
              {({ active }) => (
                <Link href="/components" legacyBehavior>
                  <a
                    className={`${
                      active ? 'bg-graphite text-amber-500' : 'text-chalk/80'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                  >
                    Components
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/docs" legacyBehavior>
                  <a
                    className={`${
                      active ? 'bg-graphite text-amber-500' : 'text-chalk/80'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                  >
                    Docs
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/account" legacyBehavior>
                  <a
                    className={`${
                      active ? 'bg-graphite text-amber-500' : 'text-chalk/80'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                  >
                    Account
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-graphite text-amber-500' : 'text-chalk/80'
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
