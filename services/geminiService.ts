
import { GoogleGenAI } from "@google/genai";
import { MarketingCopyType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const businessContext = `
You are a world-class marketing strategist for "ONLINE S'COOL", a premium math tutoring service for Grade 10-12 in South Africa.
KEY SELLING POINTS:
1. FACULTY: Tutors are UCT Actuarial Science & Accounting graduates (Elite tier).
2. SYLLABUS: Deep expertise in both DBE (National) and IEB (Private) curricula.
3. PHYSICAL COMPONENT: Monthly 4-hour high-impact workshops in Rosebank/Sandton, JHB.
4. URGENT OFFER: 50% OFF Back to School Special (R500/pm instead of R1000).
5. DEADLINE: Must sign up before 28 February 2026.
6. SLOGAN: "Knowledge is the key".
`;

const getPromptForType = (type: MarketingCopyType, leadContext?: string): string => {
    switch(type) {
        case MarketingCopyType.FACEBOOK_POST:
            return `${businessContext}\nWrite a high-converting Facebook post for PARENTS. Focus on the peace of mind of having UCT experts handle their child's math. Use bullet points for the 50% saving and the Feb 28th deadline. Include a Call to Action to "Take our Free Diagnostic Test".`;
        case MarketingCopyType.TIKTOK_SCRIPT:
            return `${businessContext}\nWrite a 30-second TikTok script for STUDENTS. Hook: "Is Math actually hard, or is your teacher just mid?" Show how a UCT Actuary explains things differently. Mention the R500 special ends Feb 28.`;
        case MarketingCopyType.EMAIL_TO_PARENTS:
            return `${businessContext}\nWrite a professional email subject and body. Subject: [Urgent] 50% Discount for Grade 10-12 Math - Ends Feb 28. Focus on academic ROI and the quality of the Rosebank workshops.`;
        case MarketingCopyType.SHORT_AD_COPY:
            return `${businessContext}\nGenerate 5 variations of Google/Meta ad headlines (max 40 chars) and descriptions (max 90 chars) focusing on the Feb 28th cutoff.`;
        case MarketingCopyType.ONBOARDING_EMAIL:
            return `${businessContext}\nContext: ${leadContext}. Write a warm onboarding email. Tell them we've reserved their 50% discount spot, but they must complete the Info Form [LINK] to finalize enrollment before the Feb 28th deadline.`;
        default:
            return `${businessContext}\nGenerate general marketing copy.`;
    }
}

export const generateMarketingCopy = async (copyType: MarketingCopyType, leadContext?: string): Promise<string> => {
  try {
    const prompt = getPromptForType(copyType, leadContext);
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Marketing copy generation failed. Please try again.";
  }
};
