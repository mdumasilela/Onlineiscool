
import React, { useState } from 'react';
import MarketingGenerator from './MarketingGenerator';
import LeadsManager from './LeadsManager';
import Logo from './Logo';

interface BackOfficeProps {
  onExit: () => void;
}

const BackOffice: React.FC<BackOfficeProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'marketing' | 'leads'>('leads');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid access code.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">Back Office Portal</h2>
          <p className="text-gray-400 text-center mb-8 text-sm uppercase tracking-widest">Internal Use Only</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Access Code</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500 transition"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition"
            >
              Authorize
            </button>
          </form>
          
          <button 
            onClick={onExit}
            className="w-full mt-4 text-gray-500 hover:text-white text-sm transition"
          >
            Return to Public Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col">
        <div className="mb-10">
          <Logo />
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter mt-1">Management Portal</p>
        </div>
        
        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'leads' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-slate-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Student Leads
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'marketing' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-slate-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Marketing Tool
          </button>
        </nav>

        {/* Campaign Tips */}
        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hidden md:block">
            <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Campaign Tip</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
                Driving traffic? Use the "TikTok Script" generator for students and "Facebook Post" for parents. Target the 31 Jan deadline to create FOMO for the 2026 intake.
            </p>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-10 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">
                {activeTab === 'leads' ? 'Onboarding & Leads' : 'AI Marketing Hub'}
            </h1>
            <p className="text-gray-400">
                {activeTab === 'leads' ? 'Manage student applications and onboarding tasks.' : 'Create materials for the 31 Jan deadline campaign.'}
            </p>
          </div>
          <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active System</p>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  Lead Automations Live
              </div>
          </div>
        </header>
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl min-h-[600px]">
          {activeTab === 'marketing' ? <MarketingGenerator /> : <LeadsManager />}
        </div>
      </main>
    </div>
  );
};

export default BackOffice;
