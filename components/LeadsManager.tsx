
import React, { useState, useEffect } from 'react';
import { SAMPLE_LEADS } from '../constants';
import { Lead, LeadStatus, MarketingCopyType } from '../types';
import { generateMarketingCopy } from '../services/geminiService';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [draftedEmail, setDraftedEmail] = useState('');
  const [showKeyWarning, setShowKeyWarning] = useState(false);

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleGenerateOnboardingEmail = async (lead: Lead) => {
    setIsGeneratingEmail(true);
    setDraftedEmail('');
    setShowKeyWarning(false);
    
    try {
      const context = `Student: ${lead.studentName}, Parent: ${lead.parentName}, Grade: ${lead.grade}, Package: ${lead.package}`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED") {
        setShowKeyWarning(true);
      } else {
        alert("Automation Error: " + err.message);
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
    if (window.aistudio) {
        await window.aistudio.openSelectKey();
        setShowKeyWarning(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-sm text-gray-500 mt-1">Incoming enquiries for the 2026 academic year.</p>
          </div>
          <div className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
            {leads.length} Pending
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-slate-800">
              <tr>
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Intake Status</th>
                <th className="px-8 py-5 text-right">Profile</th>
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
                    <button className="text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest">
                      Detail
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
          <h3 className="text-xl font-bold text-white mb-6">Onboarding Tools</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Parent Context</p>
                <p className="text-white font-medium">{selectedLead.parentName}</p>
                <p className="text-xs text-cyan-400">{selectedLead.email}</p>
            </div>

            {showKeyWarning ? (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
                <p className="text-xs text-red-400 font-bold mb-3">Google AI Key Required to Draft Onboarding Emails</p>
                <button 
                    onClick={handleOpenKeySelector}
                    className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-lg transition"
                >
                    Connect API Key
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleGenerateOnboardingEmail(selectedLead)}
                disabled={isGeneratingEmail}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-cyan-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGeneratingEmail ? (
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : null}
                {isGeneratingEmail ? 'Drafting...' : 'Draft Success Profile Request'}
              </button>
            )}

            {draftedEmail && (
              <div className="space-y-4 animate-fade-in pt-6 border-t border-slate-800">
                <div className="flex justify-between items-center">
                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Automation Draft</p>
                    <button onClick={() => setDraftedEmail('')} className="text-[10px] text-gray-500 hover:text-white uppercase font-bold">Discard</button>
                </div>
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl max-h-80 overflow-y-auto">
                  <p className="text-xs text-gray-300 whitespace-pre-wrap leading-relaxed font-serif italic">{draftedEmail}</p>
                </div>
                <button 
                  onClick={confirmSent}
                  className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-green-900/20"
                >
                  Send & Mark "Info Requested"
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
