
import React, { useState, useEffect } from 'react';
import MarketingGenerator from './MarketingGenerator';
import LeadsManager from './LeadsManager';
import StudentManager from './StudentManager';
import ScheduleManager from './ScheduleManager';
import Dashboard from './Dashboard';
import Logo from './Logo';

interface BackOfficeProps {
  onExit: () => void;
}

type TabType = 'dashboard' | 'pipeline' | 'roster' | 'schedule' | 'marketing';

const BackOffice: React.FC<BackOfficeProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [hasKey, setHasKey] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid access code.');
    }
  };

  const handleConnectAI = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success after opening dialog
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">Management Portal</h2>
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
              Authorize Access
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'pipeline': return <LeadsManager />;
      case 'roster': return <StudentManager />;
      case 'schedule': return <ScheduleManager />;
      case 'marketing': return <MarketingGenerator />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col">
        <div className="mb-10">
          <Logo />
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter mt-1 px-1">Internal Admin Tool</p>
        </div>
        
        <nav className="flex-grow space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'pipeline', label: 'Leads Pipeline', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'roster', label: 'Student Roster', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { id: 'schedule', label: 'Schedule & Links', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'marketing', label: 'AI Marketing', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
        </nav>

        {!hasKey && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
            <p className="text-[10px] text-red-400 font-bold uppercase mb-2">AI Service Inactive</p>
            <button 
              onClick={handleConnectAI}
              className="w-full bg-red-500 text-white text-[10px] font-bold py-2 rounded hover:bg-red-400 transition"
            >
              Connect Google AI
            </button>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[9px] text-gray-500 hover:underline mt-2 block text-center">API Billing Info</a>
          </div>
        )}

        <div className="mt-auto pt-6 border-t border-slate-800">
          <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default BackOffice;
