import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} ONLINE S'COOL. All Rights Reserved.</p>
        <p className="mt-2 text-sm">Knowledge is the key.</p>
      </div>
    </footer>
  );
};

export default Footer;
