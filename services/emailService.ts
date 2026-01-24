
import { api } from './api';

const FORMSPREE_ID: string = "xrebnlvq"; 

export interface LeadData {
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  package: string;
}

export const sendLeadEmail = async (data: LeadData): Promise<{ success: boolean; message: string }> => {
  // 1. Save to our "Server" via API Service
  await api.createLead(data);

  // 2. Send External Notification
  try {
    const payload = {
      _subject: `WEBSITE LEAD: ${data.studentName} (${data.grade})`,
      email: data.email, 
      message: `New enrollment for ${data.studentName} (${data.grade}) into ${data.package}. Contact: ${data.phone}`,
      ...data
    };

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });

    return { 
      success: response.ok, 
      message: response.ok ? "Success" : "Saved to server, but email failed." 
    };
  } catch (error) {
    return { success: true, message: "Saved to server. (Offline mode)" };
  }
};
