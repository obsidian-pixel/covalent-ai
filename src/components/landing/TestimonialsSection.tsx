import React from 'react';

// A simple quote icon
const QuoteIcon = () => (
  <svg className="w-8 h-8 text-amber-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.99,4C5.34,4,4,5.34,4,7v4.5c0,1.65,1.35,3,3,3h1.5V9.41c0-1.08-.67-2.03-1.66-2.34L6.99,4z M15.99,4 c-1.66,0-3,1.34-3,3v4.5c0,1.65,1.35,3,3,3h1.5V9.41c0-1.08-0.67-2.03-1.66-2.34L15.99,4z"></path>
  </svg>
);


interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ quote, author, role }: TestimonialCardProps) => (
  <div className="break-inside-avoid-column p-6 mb-6 bg-carbon border border-graphite/70 rounded-lg shadow-lg flex flex-col">
    <QuoteIcon />
    <p className="text-chalk/80 italic mb-4 flex-grow">&quot;{quote}&quot;</p>
    <div>
      <p className="font-semibold text-chalk">{author}</p>
      <p className="text-sm text-chalk/60">{role}</p>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "RaiduIX transformed how we build UIs. The components are intuitive and the customization options are endless. Our productivity has skyrocketed!",
      author: "Alex Chen",
      role: "Lead Developer, TechSolutions Inc."
    },
    {
      quote: "Finally, a component library that gets developer experience right. The documentation is stellar, and the components just work.",
      author: "Samantha Bee",
      role: "Frontend Architect, InnovateX"
    },
    {
      quote: "The attention to detail in RaiduIX is astounding. From accessibility to performance, everything is top-notch. Highly recommended!",
      author: "Mike Rodriguez",
      role: "Engineering Manager, CodeCrafters"
    },
    {
      quote: "I was up and running with RaiduIX in minutes. It's saved us countless hours of development time.",
      author: "Jessica Lee",
      role: "CTO, StartupFast"
    },
    {
      quote: "The design is modern and clean, and the components are incredibly flexible. RaiduIX is a game-changer for our design system.",
      author: "David Kim",
      role: "Head of Design, CreativeWorks"
    },
    {
      quote: "Our users love the new interface we built with RaiduIX. The performance improvements are noticeable.",
      author: "Emily Carter",
      role: "Product Manager, AppBuilders Co."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-graphite text-chalk">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-lg md:text-xl text-chalk/80 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what developers are saying about RaiduIX.
          </p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
