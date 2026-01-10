
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Tutors from './components/Tutors';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import DiagnosticTest from './components/DiagnosticTest';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackOffice from './components/BackOffice';

const App: React.FC = () => {
  const [view, setView] = useState<'public' | 'back-office'>('public');

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Handle Back Office
      if (hash === '#back-office' || path === '/back-office') {
        setView('back-office');
        return;
      }

      setView('public');

      // Handle specific sublinks like /contact
      // We check for path or hash to be robust
      if (path === '/contact' || hash === '#contact') {
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (path === '/diagnostic' || hash === '#diagnostic-test') {
        setTimeout(() => {
          document.getElementById('diagnostic-test')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    
    // Initial check
    handleNavigation();

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  if (view === 'back-office') {
    return <BackOffice onExit={() => {
      window.history.pushState({}, '', '/');
      window.location.hash = '';
      setView('public');
    }} />;
  }

  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen selection:bg-cyan-500/30">
      <Header />
      <main>
        <Hero />
        <Features />
        <DiagnosticTest />
        <About />
        <Tutors />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
