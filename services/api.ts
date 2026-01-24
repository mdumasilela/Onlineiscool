
import { Lead, Student, LeadStatus } from '../types';

/**
 * PRODUCTION API CLIENT
 * This client now communicates with the Node.js/Express server.
 */

// Use relative URL or environment variable for the backend base path
const API_BASE = '/api'; 
const ADMIN_SECRET = 'admin167431'; 

const getHeaders = (isAdmin = false) => {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (isAdmin) {
    headers['x-admin-key'] = ADMIN_SECRET;
  }
  return headers;
};

export const api = {
  // GET all leads from Server
  async getLeads(): Promise<Lead[]> {
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        headers: getHeaders(true)
      });
      if (!response.ok) throw new Error('Failed to fetch leads');
      return await response.json();
    } catch (error) {
      console.error('Network Error:', error);
      // Fallback to local storage if server is down for testing
      return JSON.parse(localStorage.getItem('online_scool_leads_v2') || '[]');
    }
  },

  // POST new lead to Server
  async createLead(leadData: Omit<Lead, 'id' | 'status' | 'dateJoined'>): Promise<Lead> {
    try {
      const response = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify(leadData)
      });
      
      const newLead = await response.json();
      
      // Update local storage cache
      const local = JSON.parse(localStorage.getItem('online_scool_leads_v2') || '[]');
      localStorage.setItem('online_scool_leads_v2', JSON.stringify([newLead, ...local]));
      
      window.dispatchEvent(new Event('leads_updated'));
      return newLead;
    } catch (error) {
      // Offline support: If server is down, save to local only
      const mockLead: Lead = {
        ...leadData,
        id: `offline_${Date.now()}`,
        status: 'New',
        dateJoined: new Date().toISOString()
      };
      const local = JSON.parse(localStorage.getItem('online_scool_leads_v2') || '[]');
      localStorage.setItem('online_scool_leads_v2', JSON.stringify([mockLead, ...local]));
      window.dispatchEvent(new Event('leads_updated'));
      return mockLead;
    }
  },

  // PATCH lead status on Server
  async updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
    try {
      await fetch(`${API_BASE}/leads/${id}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error('Server Update Failed');
    }

    // Sync Local
    const leads = JSON.parse(localStorage.getItem('online_scool_leads_v2') || '[]');
    const updated = leads.map((l: any) => l.id === id ? { ...l, status } : l);
    localStorage.setItem('online_scool_leads_v2', JSON.stringify(updated));
    window.dispatchEvent(new Event('leads_updated'));
  },

  // GET students
  async getStudents(): Promise<Student[]> {
    // Usually a separate table/endpoint, for now sync with leads
    return JSON.parse(localStorage.getItem('online_scool_students_v2') || '[]');
  }
};
