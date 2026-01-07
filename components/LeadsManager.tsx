
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
      const context = `Parent: ${lead.parentName}, Student: ${lead.studentName}, Grade: ${lead.grade}, Package: ${lead.package}`;
      const email = await generateMarketingCopy(MarketingCopyType.ONBOARDING_EMAIL, context);
      setDraftedEmail(email);
      updateStatus(lead.id, 'Info Requested');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingEmail(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-8">
      {/* Leads Table */}
      <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Active Student Leads</h2>
          <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
            {leads.length} Leads Total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Student/Parent</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-slate-700/30 cursor-pointer transition ${selectedLead?.id === lead.id ? 'bg-cyan-500/5' : ''}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{lead.studentName}</div>
                    <div className="text-xs text-gray-500">{lead.parentName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                      ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        lead.status === 'Info Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        lead.status === 'Call Scheduled' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        lead.status === 'Enrolled' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{lead.package}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-widest transition">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Pane */}
      <div className="w-full lg:w-96 flex-shrink-0">
        {selectedLead ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700 pb-2">Lead Information</h3>
            
            <div className="space-y-4 mb-8">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Student</p>
                    <p className="text-white font-medium">{selectedLead.studentName} ({selectedLead.grade})</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Parent Details</p>
                    <p className="text-white font-medium">{selectedLead.parentName}</p>
                    <p className="text-xs text-cyan-400">{selectedLead.email}</p>
                    <p className="text-xs text-gray-400">{selectedLead.phone}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Current Status</p>
                    <select 
                        value={selectedLead.status} 
                        onChange={(e) => updateStatus(selectedLead.id, e.target.value as LeadStatus)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-white mt-1"
                    >
                        <option value="New">New</option>
                        <option value="Info Requested">Info Requested</option>
                        <option value="Call Scheduled">Call Scheduled</option>
                        <option value="Follow-up Needed">Follow-up Needed</option>
                        <option value="Enrolled">Enrolled</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Onboarding Actions</p>
                <button 
                  onClick={() => handleGenerateOnboardingEmail(selectedLead)}
                  disabled={isGeneratingEmail}
                  className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-3 rounded-lg transition disabled:bg-slate-700"
                >
                    {isGeneratingEmail ? 'Drafting AI Email...' : 'Send Onboarding Link'}
                </button>
                <button 
                  onClick={() => updateStatus(selectedLead.id, 'Call Scheduled')}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-gray-200 text-xs font-bold py-3 rounded-lg transition"
                >
                    Schedule Intro Call
                </button>
            </div>

            {draftedEmail && (
              <div className="mt-6 animate-fade-in">
                <h4 className="text-[10px] text-yellow-500 uppercase font-bold tracking-widest mb-2">Generated Onboarding Draft</h4>
                <div className="bg-slate-900 p-4 rounded text-[11px] text-gray-300 leading-relaxed max-h-48 overflow-y-auto border border-yellow-500/20">
                    {draftedEmail}
                </div>
                <button 
                  onClick={() => {
                      navigator.clipboard.writeText(draftedEmail);
                      alert('Email draft copied for your assistant to send.');
                  }}
                  className="w-full mt-2 text-cyan-400 text-[10px] uppercase font-bold tracking-widest hover:text-white"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/50 rounded-xl border border-dashed border-slate-700 p-12 text-center text-gray-500">
            <p className="text-sm">Select a lead to manage their onboarding workflow.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsManager;
