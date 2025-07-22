
import { GoogleGenAI, Type } from "@google/genai";
import type { JobSummaryType, StudyPlanType } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const jobSummarySchema = {
    type: Type.OBJECT,
    properties: {
        jobTitle: { type: Type.STRING, description: "A suitable job title for the given skills." },
        jobDescription: { type: Type.STRING, description: "A brief, one-paragraph summary of the job role." },
        skillBreakdown: {
            type: Type.ARRAY,
            description: "A breakdown for each skill provided.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skillName: { type: Type.STRING, description: "The name of the skill." },
                    description: { type: Type.STRING, description: "How this skill is typically used in the specified job role." }
                },
                required: ["skillName", "description"]
            }
        }
    },
    required: ["jobTitle", "jobDescription", "skillBreakdown"]
};

const studyPlanSchema = {
    type: Type.OBJECT,
    properties: {
        skillPlans: {
            type: Type.ARRAY,
            description: "A detailed preparation plan for each selected skill.",
            items: {
                type: Type.OBJECT,
                properties: {
                    skillName: { type: Type.STRING, description: "The name of the skill." },
                    plan: { type: Type.STRING, description: "A detailed, step-by-step preparation guide for this skill, formatted with markdown for readability." }
                },
                required: ["skillName", "plan"]
            }
        },
        weeklyTodos: {
            type: Type.ARRAY,
            description: "A weekly to-do list based on the total preparation time.",
            items: {
                type: Type.OBJECT,
                properties: {
                    week: { type: Type.STRING, description: "The week number, e.g., 'Week 1'." },
                    tasks: {
                        type: Type.ARRAY,
                        description: "A list of actionable tasks for that week.",
                        items: { type: Type.STRING }
                    }
                },
                required: ["week", "tasks"]
            }
        }
    },
    required: ["skillPlans", "weeklyTodos"]
};


export const generateJobSummary = async (skills: string): Promise<JobSummaryType> => {
    const prompt = `You are a career coach. Based on the following skills: "${skills}", generate a suitable job title, a brief job description, and a breakdown of how each skill is used in that role. Ensure the skill names in the breakdown match the input skills.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: jobSummarySchema,
        },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("No response text from Gemini API");
    }
    return JSON.parse(jsonText) as JobSummaryType;
};

export const generateStudyPlan = async (skills: string[], experience: string, time: string): Promise<StudyPlanType> => {
    const prompt = `
        You are an expert technical tutor. Create a detailed study plan for a job candidate with the following profile:
        - Skills to practice: ${skills.join(', ')}
        - Current experience level: ${experience}
        - Total preparation time: ${time}

        Your response must include two parts:
        1. A detailed, step-by-step preparation plan for each individual skill. Use markdown for clear formatting (headings, lists, bold text).
        2. A weekly to-do list that breaks down the preparation into actionable tasks over the specified time frame.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: studyPlanSchema,
        },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("No response text from Gemini API");
    }
    return JSON.parse(jsonText) as StudyPlanType;
};
