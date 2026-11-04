const { GoogleGenAI } = require('@google/genai');

// Gemini API kalitini shu yerga to'g'ridan-to'g'ri yozamiz
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAyxWeNYzg8qMfKtVpes0As9f4i92RB54o' });

async function getAIResponse(userText) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: userText,
        });

        if (response && response.text) {
            return response.text;
        } else {
            return "Kechirasiz, sun'iy intellekt bo'sh javob qaytardi.";
        }
    } catch (error) {
        console.error("AI Xatoligi tafsiloti:", error);
        throw new Error("AI ulanishida xatolik yuz berdi");
    }
}

module.exports = { getAIResponse };
