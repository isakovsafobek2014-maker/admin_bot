const { GoogleGenAI } = require('@google/genai');

// Gemini AI ni sozlash
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAyxWeNYzg8qMfKtVpes0As9f4i92RB54o' });

async function getAIResponse(promptText) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // yoki xatolik bermaydigan model
            contents: promptText,
        });

        return response.text || "Kechirasiz, javob topilmadi.";
    } catch (error) {
        console.error("AI Xatoligi tafsiloti:", error);
        throw error;
    }
}

module.exports = { getAIResponse };
