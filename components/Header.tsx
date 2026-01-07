import React, { useState } from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#features', text: 'Features' },
    { href: '#about', text: 'About' },
    { href: '#tutors', text: 'Tutors' },
    { href: '#pricing', text: 'Pricing' },
    { href: '#testimonials', text: 'Testimonials' },
    { href: '#faq', text: 'FAQ' },
    { href: '#contact', text: 'Contact' },
  ];
  
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="text-gray-300 hover:text-cyan-400 transition duration-300">
              {link.text}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-slate-900`}>
        <nav className="flex flex-col items-center space-y-4 py-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="text-gray-300 hover:text-cyan-400 transition duration-300">
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;