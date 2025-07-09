import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-carbon text-chalk/70 border-t border-graphite/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-chalk mb-3">RaiduIX</h3>
            <p className="text-sm">
              The last component library you&apos;ll ever need.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-chalk/90 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" legacyBehavior><a className="hover:text-amber-500 transition-colors">Features</a></Link></li>
              <li><Link href="/#testimonials" legacyBehavior><a className="hover:text-amber-500 transition-colors">Testimonials</a></Link></li>
              <li><Link href="/pricing" legacyBehavior><a className="hover:text-amber-500 transition-colors">Pricing (Soon)</a></Link></li>
              <li><Link href="/docs" legacyBehavior><a className="hover:text-amber-500 transition-colors">Docs (Soon)</a></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-chalk/90 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" legacyBehavior><a className="hover:text-amber-500 transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/terms" legacyBehavior><a className="hover:text-amber-500 transition-colors">Terms of Service</a></Link></li>
            </ul>
          </div>
          {/* Add more sections like Social Media if needed */}
        </div>
        <div className="border-t border-graphite/50 pt-8 text-center text-sm">
          <p>&copy; {currentYear} RaiduIX. All rights reserved. Built with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
