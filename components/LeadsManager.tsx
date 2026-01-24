
import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, MarketingCopyType } from '../types';
import { api } from '../services/api';
import { generateMarketingCopy } from '../services/geminiService';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [draftedEmail, setDraftedEmail] = useState('');
  const [showKeyWarning, setShowKeyWarning] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    const data = await api.getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    window.addEventListener('leads_updated', fetchLeads);
    return () => window.removeEventListener('leads_updated', fetchLeads);
  }, []);

  const handleUpdateStatus = async (id: string, status: LeadStatus) => {
    await api.updateLeadStatus(id, status);
    // State is updated via the event listener
  };

  const handleGenerateOnboardingEmail = async (lead: Lead) => {
    setIsGeneratingEmail(true);
    setShowKeyWarning(false);
    try {
      const context = `Student: ${lead.studentName}, Parent: ${lead.parentName}, Grade: ${lead.grade}, Package: ${lead.package}`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
    } catch (err: any) {
      if (err.message === "API_KEY_REQUIRED") setShowKeyWarning(true);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-sm text-gray-500 mt-1">Single source of truth from API service.</p>
          </div>
          {loading && <div className="animate-spin h-5 w-5 border-2 border-cyan-500 border-t-transparent rounded-full"></div>}
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
                  onClick={() => { setSelectedLead(lead); setDraftedEmail(''); }}
                >
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                      {lead.studentName}
                    </div>
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
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div className="w-full xl:w-96 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl animate-slide-in-right h-fit sticky top-8">
           <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Lead Details</h3>
            <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white text-xl">✕</button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status Control</p>
                <select 
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded p-2 text-xs mt-2"
                >
                    <option value="New">New</option>
                    <option value="Info Requested">Info Requested</option>
                    <option value="Call Scheduled">Call Scheduled</option>
                    <option value="Enrolled">Enrolled</option>
                </select>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Contact Details</p>
                <p className="text-white font-medium">{selectedLead.parentName}</p>
                <p className="text-xs text-cyan-400">{selectedLead.email}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedLead.phone}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">AI Onboarding Draft</p>
              {showKeyWarning ? (
                 <button onClick={() => (window as any).aistudio.openSelectKey()} className="w-full bg-red-600/20 border border-red-500/50 text-red-400 py-3 rounded-lg text-[10px] font-bold uppercase">Enable AI Drafting</button>
              ) : isGeneratingEmail ? (
                <div className="py-8 text-center"><div className="animate-spin h-6 w-6 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-2"></div><p className="text-[10px] text-gray-500 uppercase font-bold">Drafting...</p></div>
              ) : draftedEmail ? (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-gray-400 leading-relaxed font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {draftedEmail}
                  </div>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(draftedEmail);
                        handleUpdateStatus(selectedLead.id, 'Info Requested');
                    }}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg text-xs font-bold uppercase transition"
                  >
                    Copy & Mark Sent
                  </button>
                </div>
              ) : (
                <button onClick={() => handleGenerateOnboardingEmail(selectedLead)} className="w-full py-3 bg-slate-800 text-gray-400 rounded-lg text-xs hover:text-white transition uppercase font-bold tracking-widest border border-slate-700">Generate Draft</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
