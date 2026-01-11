
import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_LEADS } from '../constants';
import { Lead, LeadStatus, MarketingCopyType } from '../types';
import { generateMarketingCopy } from '../services/geminiService';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [draftedEmail, setDraftedEmail] = useState('');
  const [showKeyWarning, setShowKeyWarning] = useState(false);

  const loadLeads = () => {
    const localLeads = JSON.parse(localStorage.getItem('online_scool_leads') || '[]');
    // Merge sample data with local data for demo purposes
    const merged = [...localLeads, ...SAMPLE_LEADS];
    setLeads(merged);
  };

  useEffect(() => {
    loadLeads();
    window.addEventListener('leads_updated', loadLeads);
    return () => window.removeEventListener('leads_updated', loadLeads);
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setDraftedEmail('');
      setShowKeyWarning(false);
      handleGenerateOnboardingEmail(selectedLead);
    }
  }, [selectedLead?.id]);

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    
    // Also update local storage if it's a local lead
    const localLeads = JSON.parse(localStorage.getItem('online_scool_leads') || '[]');
    const updatedLocal = localLeads.map((l: any) => l.id === id ? { ...l, status: newStatus } : l);
    localStorage.setItem('online_scool_leads', JSON.stringify(updatedLocal));

    if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleGenerateOnboardingEmail = async (lead: Lead) => {
    const win = window as any;
    if (win.aistudio) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setShowKeyWarning(true);
        return;
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
      }
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const confirmSent = () => {
    if (selectedLead) {
        updateStatus(selectedLead.id, 'Info Requested');
        setDraftedEmail('');
        alert(`Onboarding draft for ${selectedLead.studentName} has been logged in the system.`);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time leads from the website.</p>
          </div>
          <div className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
            {leads.length} Total
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
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                      {lead.studentName}
                      {lead.id.startsWith('lead_') && <span className="ml-2 text-[8px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded uppercase">Live</span>}
                    </div>
                    <div className="text-xs text-gray-500">{lead.grade} • {lead.parentName}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest
                      ${lead.status === 'New' ? 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse' : 
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
            
            {/* AI Generator Logic remains same... */}
            {showKeyWarning ? (
               <button onClick={() => (window as any).aistudio.openSelectKey()} className="w-full bg-red-600 text-white py-3 rounded-lg text-xs font-bold uppercase">Connect Gemini for Drafting</button>
            ) : isGeneratingEmail ? (
               <div className="text-center py-10 text-cyan-400 text-xs animate-pulse">Drafting Personalised Email...</div>
            ) : draftedEmail ? (
               <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl text-[11px] text-gray-400 italic max-h-60 overflow-y-auto">{draftedEmail}</div>
                  <button onClick={confirmSent} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Mark as Info Sent</button>
               </div>
            ) : <p className="text-center text-gray-600 text-xs">Ready to draft.</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
