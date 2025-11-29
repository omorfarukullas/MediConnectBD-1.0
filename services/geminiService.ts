import { GoogleGenAI, Type } from "@google/genai";
import { SYMPTOM_PROMPT_PREFIX } from '../constants';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AISymptomResponse {
  specialist: string;
  urgency: string;
  advice: string;
}

// Single-shot analysis for Patient Portal
export const analyzeSymptoms = async (symptoms: string): Promise<AISymptomResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: SYMPTOM_PROMPT_PREFIX + symptoms,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialist: { type: Type.STRING },
            urgency: { type: Type.STRING },
            advice: { type: Type.STRING }
          },
          required: ["specialist", "urgency", "advice"]
        }
      }
    });

    let text = response.text;
    if (!text) return null;

    // Sanitize: Remove Markdown code blocks if present
    if (text.startsWith('```json')) {
        text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (text.startsWith('```')) {
        text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    return JSON.parse(text) as AISymptomResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

// Multi-turn Chat for Landing Page Bot
export const getChatResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are MediBot, an advanced AI health assistant for MediConnect BD. 
        Your goal is to analyze user symptoms and suggest the correct specialist doctor.
        
        Rules:
        1. Be empathetic, professional, and concise.
        2. Analyze symptoms to suggest a specific type of specialist (e.g., Cardiologist, Neurologist).
        3. CRITICAL: If symptoms suggest a life-threatening emergency (chest pain, stroke signs, severe breathing trouble), start your response with "EMERGENCY ALERT:" and urge them to go to a hospital immediately.
        4. Do not provide medical prescriptions or definitive diagnoses. Always say "Please consult a doctor."
        5. Keep responses under 50 words unless explaining a complex condition.
        `,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am having trouble connecting to the medical database. Please try again or use the Emergency button if urgent.";
  }
};