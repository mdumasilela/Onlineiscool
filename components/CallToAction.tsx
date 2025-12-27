
import React from 'react';

const CallToAction: React.FC = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section id="cta" className="py-20 md:py-28 text-center bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          Ready to Boost Your Math Grades?
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Join dozens of students who have transformed their understanding and exam results with our expert-led tutoring. Your success story starts here.
        </p>
        <button 
            onClick={scrollToContact}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 transform hover:scale-105"
        >
          Enroll Now and Secure Your Spot
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
