'use client'; // Animations and future AuthButtons interaction might need client capabilities

import React from 'react';
import AuthButtons from '@/components/auth/AuthButtons';

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4 py-16 animate-fadeIn animate-slideUp"> {/* Assuming Navbar height is approx 80px */}
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-chalk mb-6">
          The Last Component Library You&apos;ll Ever Need
        </h1>
        <p className="text-lg md:text-xl text-chalk/80 mb-8">
          Beautifully designed, expertly crafted, and endlessly customizable components to build your next-gen applications with ease.
        </p>
        <AuthButtons />
      </div>
    </section>
  );
};

export default HeroSection;
