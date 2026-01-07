
import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
    const handleHashChange = () => {
      if (window.location.hash === '#back-office') {
        setView('back-office');
      } else {
        setView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (view === 'back-office') {
    return <BackOffice onExit={() => {
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
      <Analytics />
    </div>
  );
};

export default App;
