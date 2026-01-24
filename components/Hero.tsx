
import React from 'react';

const Hero: React.FC = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToDiagnostic = () => {
        document.getElementById('diagnostic-test')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section id="home" className="py-24 md:py-32 text-center bg-slate-800/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="inline-flex flex-col gap-2 items-center mb-8 animate-fade-in">
            <div className="bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
                <span className="text-yellow-500 text-sm font-bold uppercase tracking-widest">50% OFF Back to School Offer - SIGN UP BY 31 JANUARY</span>
            </div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                Classes officially start Monday, 26 January 2026
            </div>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
          Unlock Your Math Potential. <br />
          <span className="text-cyan-400">Ace Your DBE & IEB Exams.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Expert math tutoring for <span className="text-white font-semibold">Grade 10, 11 & 12</span> students in South Africa. 
          Specialising in both <span className="text-cyan-400">DBE and IEB</span> curricula.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={scrollToContact}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105"
            >
            Enroll with 50% Off
            </button>
            <button 
                onClick={scrollToDiagnostic}
                className="bg-slate-700 hover:bg-slate-600 text-cyan-400 font-bold text-lg py-4 px-10 rounded-full transition duration-300 border border-cyan-500/30"
            >
            Take Free Diagnostic Test
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;