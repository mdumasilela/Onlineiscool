import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Tutors from './components/Tutors';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 text-gray-200 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
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