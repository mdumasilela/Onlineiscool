
import { GoogleGenAI } from "@google/genai";
import { MarketingCopyType } from '../types';

const businessContext = `
You are a world-class marketing strategist for "ONLINE S'COOL", a premium math tutoring service for Grade 10-12 in South Africa.
LANGUAGE: Use British/South African English (e.g., "specialising" not "specializing", "centre" not "center").
OFFICIAL EMAIL: admissions@onlineiscool.co.za (Use this for all CTAs involving email).
KEY SELLING POINTS:
1. FACULTY: Tutors are UCT Actuarial Science & Accounting graduates (Elite tier).
2. SYLLABUS: Deep expertise in both DBE (National) and IEB (Private) curricula.
3. PHYSICAL COMPONENT: Monthly 4-hour high-impact workshops in Rosebank/Sandton, JHB.
4. URGENT OFFER: 50% OFF Back to School Special (R500/pm instead of R1000).
5. DEADLINE: Must sign up before 31 January 2026 for the 2026 intake.
6. SLOGAN: "Knowledge is the key".
`;

const getPromptForType = (type: MarketingCopyType, leadContext?: string): string => {
    switch(type) {
        case MarketingCopyType.FACEBOOK_POST:
            return `${businessContext}\nWrite a high-converting Facebook post for PARENTS. Focus on the peace of mind of having UCT experts handle their child's math for the 2026 school year. Use bullet points for the 50% saving and the Jan 31st deadline. Include a Call to Action to "Take our Free Diagnostic Test" or email us at admissions@onlineiscool.co.za.`;
        case MarketingCopyType.TIKTOK_SCRIPT:
            return `${businessContext}\nWrite a 30-second TikTok script for STUDENTS. Hook: "Is Math actually hard, or is your teacher just mid?" Show how a UCT Actuary explains things differently. Mention the R500 special for 2026 intake ends Jan 31 and they can DM or email admissions@onlineiscool.co.za.`;
        case MarketingCopyType.EMAIL_TO_PARENTS:
            return `${businessContext}\nWrite a professional email subject and body. Subject: [Urgent] 50% Discount for 2026 Intake Math - Ends Jan 31. Focus on academic ROI and the quality of the Rosebank workshops. Ensure the sender signature implies it's from admissions@onlineiscool.co.za.`;
        case MarketingCopyType.SHORT_AD_COPY:
            return `${businessContext}\nGenerate 5 variations of Google/Meta ad headlines (max 40 chars) and descriptions (max 90 chars) focusing on the Jan 31st cutoff for 2026. Some should mention emailing admissions@onlineiscool.co.za.`;
        case MarketingCopyType.ONBOARDING_EMAIL:
            return `${businessContext}\nContext: ${leadContext}. 
            Write a COMPREHENSIVE onboarding email from admissions@onlineiscool.co.za. 
            The goal is to move them from a lead to an enrolled student.
            1. Use a warm, professional tone. 
            2. Congratulate them on reserving the 50% discount. 
            3. Explicitly ask them to complete the "Student Success Profile" (a form link: [LINK]).
            4. Mention that the form requires: School name, confirmation of IEB/DBE syllabus, specific math struggle areas (e.g. Geometry/Calculus), and tech setup (Tablet/Laptop).
            5. Stress the urgency of the Jan 31st deadline.`;
        default:
            return `${businessContext}\nGenerate general marketing copy. Use admissions@onlineiscool.co.za as the contact point.`;
    }
}

export const generateMarketingCopy = async (copyType: MarketingCopyType, leadContext?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("System configuration error: API Key is missing.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = getPromptForType(copyType, leadContext);
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        temperature: 0.7,
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI engine.");
    }

    return response.text;
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw new Error(error.message || "Failed to generate copy.");
  }
};
