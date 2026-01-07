
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
      const context = `Student: ${lead.studentName}, Parent: ${lead.parentName}, Grade: ${lead.grade}, Package: ${lead.package}`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
    } catch (err: any) {
      alert("Error generating onboarding draft: " + err.message);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  const confirmSent = () => {
    if (selectedLead) {
        updateStatus(selectedLead.id, 'Info Requested');
        setDraftedEmail('');
        alert(`Successfully marked onboarding email for ${selectedLead.studentName} as sent.`);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 animate-fade-in">
      {/* Pipeline List */}
      <div className="flex-grow bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Enrollment Pipeline</h2>
            <p className="text-sm text-gray-500 mt-1">Simulated incoming leads from your public website enrollment form.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sort: Latest</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-slate-800">
              <tr>
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Curriculum</th>
                <th className="px-8 py-5">Automated Status</th>
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
                    <span className="text-[10px] font-bold text-gray-400 border border-slate-700 px-2 py-1 rounded">DBE/IEB Confirmed</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest
                      ${lead.status === 'New' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        lead.status === 'Info Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        lead.status === 'Enrolled' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-bold text-xs uppercase tracking-widest">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Lead Details / Onboarding Panel */}
      {selectedLead && (
        <div className="w-full xl:w-96 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Onboarding Tools</h3>
          
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Contact</p>
                <p className="text-white font-medium">{selectedLead.parentName}</p>
                <p className="text-xs text-gray-400">{selectedLead.email}</p>
            </div>

            <button
              onClick={() => handleGenerateOnboardingEmail(selectedLead)}
              disabled={isGeneratingEmail}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-cyan-900/20 disabled:opacity-50"
            >
              {isGeneratingEmail ? 'Generating...' : 'Draft Onboarding Email'}
            </button>

            {draftedEmail && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-h-60 overflow-y-auto">
                  <p className="text-xs text-gray-300 whitespace-pre-wrap">{draftedEmail}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setDraftedEmail('')}
                    className="flex-grow bg-slate-800 text-white py-2 rounded-lg text-xs"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={confirmSent}
                    className="flex-grow bg-green-600 text-white py-2 rounded-lg text-xs font-bold"
                  >
                    Confirm Sent
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManager;
