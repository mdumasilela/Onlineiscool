
import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_LEADS } from '../constants';
import { Lead, LeadStatus, MarketingCopyType } from '../types';
import { generateMarketingCopy } from '../services/geminiService';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [draftedEmail, setDraftedEmail] = useState('');
  const [showKeyWarning, setShowKeyWarning] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Automate drafting when a lead is selected
  useEffect(() => {
    if (selectedLead) {
      setDraftedEmail('');
      setShowKeyWarning(false);
      handleGenerateOnboardingEmail(selectedLead);
    } else {
      setDraftedEmail('');
    }
  }, [selectedLead?.id]);

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleGenerateOnboardingEmail = async (lead: Lead) => {
    const win = window as any;
    
    // Check key status first using internal studio methods
    if (win.aistudio) {
      try {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setShowKeyWarning(true);
          return;
        }
      } catch (e) {
        console.error("Key check failed", e);
      }
    }

    setIsGeneratingEmail(true);
    setShowKeyWarning(false);
    
    try {
      const context = `Student: ${lead.studentName}, Parent: ${lead.parentName}, Grade: ${lead.grade}, Package: ${lead.package}`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED") {
        setShowKeyWarning(true);
      } else {
        console.error("Automation error:", err);
      }
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const confirmSent = () => {
    if (selectedLead) {
        updateStatus(selectedLead.id, 'Info Requested');
        setDraftedEmail('');
        alert(`Automation flow triggered for ${selectedLead.studentName}. Profile request logged.`);
    }
  };

  const handleOpenKeySelector = async () => {
    const win = window as any;
    if (win.aistudio) {
        await win.aistudio.openSelectKey();
        setShowKeyWarning(false);
        // Retry immediately after key selection dialog opens (assuming success as per guidelines)
        if (selectedLead) {
          handleGenerateOnboardingEmail(selectedLead);
        }
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-sm text-gray-500 mt-1">Select a lead to automate the onboarding flow.</p>
          </div>
          <div className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
            {leads.length} Active
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-slate-800">
              <tr>
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Intake Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className={`group hover:bg-slate-800/40 cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-cyan-500/5 border-l-4 border-l-cyan-500' : 'border-l-4 border-l-transparent'}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition">{lead.studentName}</div>
                    <div className="text-xs text-gray-500">{lead.grade} • {lead.parentName}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest
                      ${lead.status === 'New' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        lead.status === 'Info Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-bold text-[10px] uppercase tracking-widest">
                      {selectedLead?.id === lead.id ? 'Viewing' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div className="w-full xl:w-96 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl h-fit sticky top-8">
          <h3 className="text-xl font-bold text-white mb-6">Automated Onboarding</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Lead Context</p>
                <p className="text-white font-medium">{selectedLead.parentName}</p>
                <p className="text-xs text-cyan-400">{selectedLead.email}</p>
                <p className="text-[10px] text-gray-500 mt-2 uppercase">{selectedLead.package} • {selectedLead.grade}</p>
            </div>

            {showKeyWarning ? (
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center">
                <svg className="w-10 h-10 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-red-400 font-bold mb-4">API Key Required</p>
                <p className="text-[10px] text-gray-400 mb-6 leading-relaxed">To automate email drafting, you must connect a valid Gemini API key.</p>
                <button 
                    onClick={handleOpenKeySelector}
                    className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-lg transition shadow-lg shadow-red-900/20"
                >
                    Connect API Key
                </button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[9px] text-gray-500 hover:underline mt-4 block">How to get a key?</a>
              </div>
            ) : isGeneratingEmail ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 bg-slate-800/30 rounded-xl border border-slate-700 border-dashed">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-[0.2em] animate-pulse">AI Drafting...</p>
                <p className="text-[10px] text-gray-500 text-center px-4">Creating a personalised success profile request for {selectedLead.studentName}.</p>
              </div>
            ) : draftedEmail ? (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center">
                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                      Draft Generated
                    </p>
                    <button 
                      onClick={() => handleGenerateOnboardingEmail(selectedLead!)} 
                      className="text-[10px] text-gray-500 hover:text-cyan-400 uppercase font-bold transition"
                    >
                      Regenerate
                    </button>
                </div>
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl max-h-80 overflow-y-auto custom-scrollbar shadow-inner">
                  <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed font-serif italic">{draftedEmail}</p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={confirmSent}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl text-sm font-bold transition shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    Confirm & Send
                  </button>
                  <p className="text-center text-[9px] text-gray-500 mt-3 italic uppercase tracking-tighter">
                    Lead will move to "Info Requested"
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 bg-slate-800/30 rounded-xl border border-slate-700 border-dashed">
                 <p className="text-[10px] text-gray-500 uppercase font-bold text-center px-4 leading-relaxed">Automation engine ready to assist with {selectedLead.studentName}'s intake.</p>
                 <button 
                   onClick={() => handleGenerateOnboardingEmail(selectedLead!)}
                   className="text-xs text-cyan-400 hover:underline font-bold"
                 >
                   Trigger Manual Draft
                 </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.4); }
      `}</style>
    </div>
  );
};

export default LeadsManager;
