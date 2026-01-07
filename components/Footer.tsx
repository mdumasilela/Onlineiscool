
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <p className="text-gray-400 mb-1">Have questions? Contact our admissions team:</p>
          <a 
            href="mailto:admissions@onlineiscool.co.za" 
            className="text-cyan-400 font-bold hover:text-cyan-300 transition text-lg"
          >
            admissions@onlineiscool.co.za
          </a>
        </div>
        
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ONLINE S'COOL. All Rights Reserved.</p>
        <p className="mt-2 text-xs text-gray-600 uppercase tracking-widest">Knowledge is the key.</p>
        
        <div className="mt-10">
          <a 
            href="#back-office" 
            className="text-[10px] text-slate-700 hover:text-cyan-500 uppercase tracking-[0.3em] transition font-bold"
          >
            Internal Access
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
