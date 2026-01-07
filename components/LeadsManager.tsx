
import React, { useState } from 'react';
import { SAMPLE_LEADS } from '../constants';
import { Lead, LeadStatus, MarketingCopyType } from '../types';
import { generateMarketingCopy } from '../services/geminiService';

const LeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(SAMPLE_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [draftedEmail, setDraftedEmail] = useState('');

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleGenerateOnboardingEmail = async (lead: Lead) => {
    setIsGeneratingEmail(true);
    setDraftedEmail('');
    try {
      const context = `Student: ${lead.studentName}, Parent: ${lead.parentName}, Grade: ${lead.grade}, Package: ${lead.package}. The email must request school name, IEB/DBE syllabus confirmation, and specific math weaknesses.`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
    } catch (err: any) {
      alert(err.message || "Failed to generate draft.");
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const confirmSent = () => {
    if (selectedLead) {
        updateStatus(selectedLead.id, 'Info Requested');
        setDraftedEmail('');
        alert('Automation status updated. Onboarding link marked as sent.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-8 animate-fade-in">
      {/* Leads Table */}
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-xs text-gray-500 mt-1">Manage new website enquiries for 2026 Intake.</p>
          </div>
          <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/20 uppercase tracking-widest">
            {leads.length} Enquiries
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Student & Grade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-slate-800/40 cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-cyan-500/5' : ''}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-white">{lead.studentName}</div>
                    <div className="text-xs text-gray-500">{lead.grade} • {lead.parentName}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-widest
                      ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        lead.status === 'Info Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        lead.status === 'Enrolled' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-gray-400">{lead.package}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end">
                         <div className={`h-2 w-2 rounded-full ${selectedLead?.id === lead.id ? 'bg-cyan-500 animate-pulse' : 'bg-transparent'}`}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Pane */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
        {selectedLead ? (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl sticky top-6 space-y-8">
            <header className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">Lead Workspace</h3>
                <p className="text-xs text-cyan-400 font-medium">ID: {selectedLead.id.padStart(4, '0')}</p>
            </header>
            
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Student</p>
                        <p className="text-white text-sm font-bold">{selectedLead.studentName}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Grade</p>
                        <p className="text-white text-sm font-bold">{selectedLead.grade}</p>
                    </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Parent Contact</p>
                    <p className="text-white text-sm font-medium">{selectedLead.parentName}</p>
                    <p className="text-xs text-cyan-400 mt-1">{selectedLead.email}</p>
                    <p className="text-xs text-gray-500">{selectedLead.phone}</p>
                </div>

                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Automation Suite</p>
                    <div className="space-y-3">
                        <button 
                            onClick={() => handleGenerateOnboardingEmail(selectedLead)}
                            disabled={isGeneratingEmail}
                            className="w-full flex items-center justify-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-4 rounded-xl transition shadow-lg shadow-cyan-900/20 disabled:bg-slate-800 disabled:text-gray-600"
                        >
                            {isGeneratingEmail ? (
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            )}
                            Draft Comprehensive Onboarding
                        </button>
                    </div>
                </div>
            </div>

            {draftedEmail && (
              <div className="mt-8 pt-8 border-t border-slate-800 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] text-yellow-500 uppercase font-bold tracking-[0.2em]">Email Draft Preview</h4>
                    <button 
                        onClick={() => { navigator.clipboard.writeText(draftedEmail); alert('Draft copied!'); }}
                        className="text-[10px] text-cyan-400 font-bold hover:text-white transition"
                    >
                        Copy Draft
                    </button>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl text-[12px] text-gray-300 leading-relaxed max-h-60 overflow-y-auto border border-yellow-500/20 font-serif">
                    {draftedEmail}
                </div>
                <div className="mt-6 space-y-3">
                    <button 
                        onClick={confirmSent}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-green-400 border border-green-500/20 text-[10px] uppercase font-bold py-3 rounded-lg transition"
                    >
                        Confirm Email Sent & Mark "Info Requested"
                    </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 p-16 text-center text-gray-600">
             <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                <svg className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
             </div>
             <p className="text-sm font-medium">Select a lead from the pipeline to trigger automated onboarding actions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsManager;
