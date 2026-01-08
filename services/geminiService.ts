
import { GoogleGenAI } from "@google/genai";
import { MarketingCopyType } from '../types';

const businessContext = `
You are a world-class marketing strategist for "ONLINE S'COOL", a premium math tutoring service for Grade 10-12 in South Africa.
LANGUAGE: Use British/South African English (e.g., "specialising" not "specializing", "centre" not "center").
OFFICIAL EMAIL: admissions@onlineiscool.co.za.
KEY SELLING POINTS:
1. FACULTY: Tutors are UCT Actuarial Science & Accounting graduates (Elite tier).
2. SYLLABUS: Deep expertise in both DBE (National) and IEB (Private) curricula.
3. PHYSICAL COMPONENT: Monthly 4-hour high-impact workshops in Rosebank/Sandton, JHB.
4. URGENT OFFER: 50% OFF Back to School Special (R500/pm instead of R1000).
5. DEADLINE: Must sign up before 31 January 2026 for the 2026 intake.
6. SLOGAN: "Knowledge is the key".
`;

const getPromptForType = (type: MarketingCopyType, leadContext?: string): string => {
  switch (type) {
    case MarketingCopyType.ONBOARDING_EMAIL:
      return `${businessContext}
Context: ${leadContext}. 
Write a COMPREHENSIVE enrollment invitation email. 
This is sent immediately after a lead registers.
1. SUBJECT: Action Required: Finalise 2026 Math Enrollment for ${leadContext?.split(',')[0]}
2. BODY: Warmly welcome them.
3. REQUEST: Ask them to complete the "Student Success Profile" form.
4. FORM DETAILS: Explicitly mention we need: School Name, Curriculum (DBE/IEB), Recent Math Marks, and specific struggle areas (e.g., Geometry/Functions).
5. TECH: Ask them to confirm they have a tablet/laptop for Microsoft Teams sessions.
6. DEADLINE: Remind them to complete this by 31 January 2026 to lock in the 50% discount.`;
    default:
      return `${businessContext}
Generate high-converting marketing copy for ${type}. Context: ${leadContext || 'General brand awareness'}.`;
  }
}

export const generateMarketingCopy = async (copyType: MarketingCopyType, leadContext?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY_REQUIRED");
  }

  // Create fresh instance before each call to ensure latest API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = getPromptForType(copyType, leadContext);
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    // Access .text property directly as per guidelines
    const text = response.text;
    if (!text) throw new Error("AI returned empty content.");
    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API_KEY") || error.message?.includes("key") || error.status === 403 || error.status === 401) {
      throw new Error("API_KEY_REQUIRED");
    }
    throw error;
  }
};
