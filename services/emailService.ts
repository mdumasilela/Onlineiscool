
/**
 * Email Service for ONLINE S'COOL
 * This handles sending lead data to admissions@onlineiscool.co.za via Formspree
 * AND persists the data locally for the Back-Office.
 */

const FORMSPREE_ID: string = "xrebnlvq"; 

export interface LeadData {
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  package: string;
}

/**
 * Saves a lead to local storage so the Back-Office can see it.
 * In a production app, this would be a POST to a real database.
 */
const saveLeadToLocalPipeline = (data: LeadData) => {
  const existingLeads = JSON.parse(localStorage.getItem('online_scool_leads') || '[]');
  const newLead = {
    ...data,
    id: `lead_${Date.now()}`,
    status: 'New',
    dateJoined: new Date().toISOString()
  };
  localStorage.setItem('online_scool_leads', JSON.stringify([newLead, ...existingLeads]));
  
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event('leads_updated'));
};

export const sendLeadEmail = async (data: LeadData): Promise<{ success: boolean; message: string }> => {
  try {
    // 1. Persist locally for the Back-Office
    saveLeadToLocalPipeline(data);

    // 2. Send to Formspree for Email Automation
    const payload = {
      _subject: `WEBSITE LEAD: ${data.studentName} (${data.grade})`,
      email: data.email, 
      _replyto: data.email, 
      message: `New enrollment for ${data.studentName} (${data.grade}) into ${data.package}. Contact: ${data.phone}`,
      parent_name: data.parentName,
      student_name: data.studentName,
      grade_level: data.grade,
      selected_package: data.package,
      contact_number: data.phone
    };

    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { success: true, message: "Lead successfully captured." };
    } else {
      return { success: false, message: "Email failed, but lead saved to internal pipeline." };
    }
  } catch (error) {
    console.error("Network Error:", error);
    return { success: false, message: "Network error. Lead saved locally only." };
  }
};
