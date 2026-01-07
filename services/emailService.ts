
/**
 * Email Service for ONLINE S'COOL
 * This handles sending lead data to admissions@onlineiscool.co.za
 * via Formspree.
 */

// Fix: explicit 'string' type prevents TS comparison errors with other string literals
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
  try {
    // We send the data to a form provider which forwards it to admissions@onlineiscool.co.za
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New ONLINE S'COOL Lead: ${data.studentName} (${data.grade})`,
        ...data,
        official_contact: 'admissions@onlineiscool.co.za'
      })
    });

    if (response.ok) {
      return { success: true, message: "Lead successfully sent to admissions team." };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send email");
    }
  } catch (error) {
    console.error("Email Connection Error:", error);
    
    // Fallback logic for production vs development
    // Fix: comparison is now allowed as FORMSPREE_ID is typed as a broad string instead of a strict literal
    if (FORMSPREE_ID === "YOUR_FORM_ID_HERE") {
        console.warn("Email not connected. Please add your FORMSPREE_ID.");
        return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: "Demo mode activated." }), 1500));
    }
    
    return { success: false, message: "Could not connect to email server. Please try again or email admissions@onlineiscool.co.za directly." };
  }
};
