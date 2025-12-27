
import { GoogleGenAI } from "@google/genai";
import { MarketingCopyType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const businessContext = `
You are an expert marketing copywriter for an educational company called "ONLINE S'COOL".
Here is the business context:
- Company Name: ONLINE S'COOL
- Slogan: Knowledge is the key
- Business: Mathematics tutoring in South Africa for Grades 10, 11, and 12.
- SYLLABUS FOCUS: Specialized coverage for both GDE (Department of Education) and IEB (Independent Examinations Board) curricula.
- NEW BACK TO SCHOOL OFFER: 50% OFF all packages if signing up before 1 March 2026.
- Package Prices (Special): Online Classes at R500 (was R1000), Workshop Package at R650 (was R1300).
- WORKSHOP LOCATION: Physical workshops are held in Johannesburg Rosebank/Sandton area. Learners must be able to travel there.
- Mission: Strengthen foundational understanding and empower students across GDE and IEB.
- Tutors: Top achievers and UCT graduates.
- CORE STRENGTH: Unparalleled quality of tutoring, leveraging actuarial science graduates and top-tier university achievers to simplify complex topics.
`;

const getPromptForType = (type: MarketingCopyType, leadContext?: string): string => {
    switch(type) {
        case MarketingCopyType.FACEBOOK_POST:
            return `
            ${businessContext}
            ---
            Task: Write a high-conversion Facebook post targeting parents. 
            Highlight the 50% BACK TO SCHOOL OFFER and the 1 March 2026 deadline.
            Emphasize that we cover both GDE and IEB syllabuses.
            Highlight the elite quality of our UCT-graduate tutors.
            Mention the Grade 10-12 scope and the Rosebank/Sandton physical workshop option.
            Include hashtags: #MathTutoring #BackToSchool #Rosebank #Sandton #Matric2026 #GDE #IEB #Grade10 #Grade11.
            `;
        case MarketingCopyType.TIKTOK_SCRIPT:
            return `
            ${businessContext}
            ---
            Task: Create a 15-second TikTok script for students.
            Hook: Getting 50% off top-tier math help for the new school year (GDE or IEB).
            Mention: Grades 10-12 and the high-calibre UCT tutors.
            Visuals: High energy, screen recordings of online classes showing quality teaching.
            `;
        case MarketingCopyType.EMAIL_TO_PARENTS:
            return `
            ${businessContext}
            ---
            Task: Professional email to parents about the Back to School Offer.
            Subject: 50% Back to School Discount for Grade 10-12 Math Tutoring (GDE & IEB)
            Body: Explain the exceptional quality of our UCT tutors, the structure of ONLINE S'COOL, and our expertise in both GDE and IEB.
            Mention the massive saving available until March 2026. 
            Focus on academic excellence and results.
            Clearly state the workshop location requirement (Rosebank/Sandton).
            `;
        case MarketingCopyType.SHORT_AD_COPY:
            return `
            ${businessContext}
            ---
            Task: 3 punchy ads focusing on: 
            1. 50% Back to School Offer.
            2. Elite UCT Math Tutors (GDE & IEB).
            3. The Rosebank/Sandton Workshops.
            Keep them under 150 chars.
            `;
        case MarketingCopyType.ONBOARDING_EMAIL:
            return `
            ${businessContext}
            ---
            Task: Create a friendly, professional onboarding email for a NEW student lead.
            Context: The parent just submitted their name and email on the website.
            Goal: We need them to fill out a detailed enrollment form (Information Request) to proceed.
            Details to include: 
            1. Welcome to the ONLINE S'COOL family.
            2. A link placeholder [ONBOARDING_FORM_LINK] where they will provide student ID, previous results, and specific topics of struggle.
            3. Mention that once this form is received, our assistant will contact them to schedule their first session or a 10-min introductory call.
            Lead Specifics: ${leadContext || 'A potential new student.'}
            `;
        default:
            return `
            ${businessContext}
            ---
            Task: General promotional text focusing on the 50% off offer, syllabus coverage, and academic excellence.
            `;
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
    if (error instanceof Error) {
        return `An error occurred: ${error.message}`;
    }
    return "An unknown error occurred.";
  }
};
