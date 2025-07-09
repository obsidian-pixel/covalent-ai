// This is now a server component

import HeroSection from '@/components/landing/HeroSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import ValueGrid from '@/components/landing/ValueGrid';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/layout/Footer'; // Specific to landing page

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col"> {/* Ensures it doesn't exceed viewport height initially and allows for scrolling */}
      {/* Navbar is already globally in src/app/layout.tsx */}

      <main className="flex-grow">
        <HeroSection />

        <ShowcaseSection />

        <ValueGrid />

        <TestimonialsSection />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
