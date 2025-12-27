
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} ONLINE S'COOL. All Rights Reserved.</p>
        <p className="mt-2 text-sm text-gray-500 italic">Knowledge is the key.</p>
        <div className="mt-6">
          <a 
            href="#back-office" 
            className="text-[10px] text-slate-600 hover:text-cyan-500 uppercase tracking-widest transition"
          >
            Internal Access
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
