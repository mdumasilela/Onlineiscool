
/**
 * Email Service for ONLINE S'COOL
 * This handles sending lead data to admissions@onlineiscool.co.za via Formspree.
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

export const sendLeadEmail = async (data: LeadData): Promise<{ success: boolean; message: string }> => {
  try {
    // Formspree expects specific keys for special handling
    const payload = {
      _subject: `WEBSITE LEAD: ${data.studentName} (${data.grade})`,
      _replyto: data.email, // Allows you to click 'Reply' in your email client
      parentName: data.parentName,
      studentName: data.studentName,
      studentGrade: data.grade,
      selectedPackage: data.package,
      contactPhone: data.phone,
      contactEmail: data.email,
      message: `New enrollment/enquiry for ${data.studentName}.
      Parent: ${data.parentName}
      Grade: ${data.grade}
      Package: ${data.package}
      Phone: ${data.phone}`
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
      return { success: true, message: "Lead successfully sent to admissions team." };
    } else {
      const errorData = await response.json();
      console.error("Formspree Error:", errorData);
      return { 
        success: false, 
        message: "Formspree rejected the request. Please check if the form is verified at Formspree.io." 
      };
    }
  } catch (error) {
    console.error("Network Error sending lead:", error);
    return { 
      success: false, 
      message: "Network error. Please email admissions@onlineiscool.co.za directly while we investigate." 
    };
  }
};
