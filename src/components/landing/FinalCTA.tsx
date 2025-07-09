import React from 'react';
import AuthButtons from '@/components/auth/AuthButtons';

const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-carbon to-graphite text-chalk">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
          Ready to Elevate Your UI?
        </h2>
        <p className="text-lg md:text-xl text-chalk/80 mb-10 max-w-xl mx-auto">
          Join thousands of developers building exceptional applications with RaiduIX. Get started today and experience the difference.
        </p>
        <div className="max-w-md mx-auto">
          <AuthButtons />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
