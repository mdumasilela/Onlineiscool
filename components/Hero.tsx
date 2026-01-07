
import React from 'react';

const Hero: React.FC = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section id="home" className="py-24 md:py-32 text-center bg-slate-800/50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
          50% OFF BACK TO SCHOOL OFFER
        </div>
        <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
          Unlock Your Math Potential. <br />
          <span className="text-cyan-400">Ace Your DBE Exams.</span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Expert math tutoring for Grade 10-12 students in South Africa. 
          Specializing in the <span className="text-white font-semibold">DBE curriculum</span>.
        </p>
        <button 
            onClick={scrollToContact}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          Start Learning with 50% Off
        </button>
      </div>
    </section>
  );
};

export default Hero;
