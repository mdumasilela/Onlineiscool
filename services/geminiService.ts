
import { GoogleGenAI } from "@google/genai";
import { MarketingCopyType } from '../types';

const BUSINESS_CONTEXT = `
Company: ONLINE S'COOL
Slogan: Knowledge is the key
Focus: Math tutoring (Grade 10-12) specializing in the DBE (Department of Basic Education) syllabus.
Tutors: Actuarial Science graduates and top achievers.
Offer: 50% OFF Back to School (ends 1 March 2026).
`;

export const generateMarketingCopy = async (copyType: MarketingCopyType, leadContext?: string): Promise<string> => {
  // CRITICAL: Initialize inside the function call to ensure process.env.API_KEY is available
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    ${BUSINESS_CONTEXT}
    Task: Write a ${copyType} to promote our service.
    Specific Context: ${leadContext || 'General marketing.'}
    Requirement: Highlight the 50% discount and mastery of the DBE curriculum.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Marketing AI is briefly offline. Please try again.";
  }
};
