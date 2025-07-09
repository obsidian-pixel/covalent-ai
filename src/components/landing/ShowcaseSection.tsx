import React from 'react';
import BrowserFrame from '@/components/ui/BrowserFrame';

const ShowcaseSection = () => {
  const videoDataTable = '/videos/data-table.mp4'; // Placeholder
  const videoCharts = '/videos/charts.mp4'; // Placeholder

  return (
    <section className="py-16 md:py-24 bg-carbon text-chalk">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See RaiduIX in Action
          </h2>
          <p className="text-lg md:text-xl text-chalk/80 max-w-2xl mx-auto">
            Experience the power and elegance of our components. Smooth animations, intuitive interactions, and developer-friendly APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <BrowserFrame title="Data Table Showcase">
            <video
              src={videoDataTable}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </BrowserFrame>

          <BrowserFrame title="Interactive Charts Showcase">
            <video
              src={videoCharts}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
