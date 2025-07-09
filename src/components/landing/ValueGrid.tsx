import React from 'react';

interface ValueItemProps {
  title: string;
  description: string;
  // Optional: Icon component or SVG string could be added here
}

const ValueItem = ({ title, description }: ValueItemProps) => (
  <div className="group p-6 border border-graphite/70 rounded-lg bg-carbon hover:bg-graphite/50 transition-colors duration-300 hover:animate-subtle-glow">
    {/* Optional: Icon would go here */}
    <h3 className="text-xl font-semibold text-chalk mb-2">{title}</h3>
    <p className="text-chalk/70 text-sm">{description}</p>
  </div>
);

const ValueGrid = () => {
  const values = [
    {
      title: "Unmatched DX",
      description: "Developer experience is at our core. Intuitive APIs, comprehensive docs, and seamless integration.",
    },
    {
      title: "Highly Performant",
      description: "Optimized for speed and efficiency. Components that won't slow down your application.",
    },
    {
      title: "Extensively Customizable",
      description: "Easily adapt components to your brand and style with Tailwind CSS and custom props.",
    },
    {
      title: "Accessibility First",
      description: "Built with accessibility in mind, ensuring your applications are usable by everyone.",
    },
    {
      title: "Modern Design",
      description: "Sleek, contemporary aesthetics that make your applications look and feel professional.",
    },
    {
      title: "Tree Shakeable",
      description: "Only import what you need, keeping your bundle sizes small and load times fast.",
    },
    {
      title: "TypeScript Native",
      description: "Full TypeScript support out-of-the-box for robust and type-safe development.",
    },
    {
      title: "Community Driven",
      description: "Actively maintained and supported by a growing community of developers.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-carbon text-chalk">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RaiduIX?
          </h2>
          <p className="text-lg md:text-xl text-chalk/80 max-w-2xl mx-auto">
            We've poured countless hours into crafting a component library that solves real-world problems with elegance and power.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <ValueItem key={index} title={value.title} description={value.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueGrid;
