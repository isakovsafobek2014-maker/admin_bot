const { GoogleGenAI } = require('@google/genai');

// Gemini API kalitini xavfsiz sozlash
const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAyxWeNYzg8qMfKtVpes0As9f4i92RB54o';
const ai = new GoogleGenAI({ apiKey: apiKey });

/**
 * Foydalanuvchi bergan savolga Gemini 3.8 Flash modeli yordamida
 * professional IT ustozi sifatida mukammal va batafsil javob qaytarish funksiyasi.
 * @param {string} userText - Foydalanuvchining savoli
 * @returns {Promise<string>} - AI javobi
 */
async function getAIResponse(userText) {
    try {
        // Tizim roli va talablarini oldindan belgilab beramiz (System Prompt)
        const systemRole = `Siz tajribali IT ustozi va dasturchisiz. 
        Foydalanuvchi sizga Telegram bot orqali IT va dasturlash bo'yicha savol beradi. 
        Quyidagi talablarga qat'iy amal qiling:
        1. Javobni faqat o'zbek tilida, tushunarli, aniq va mukammal (kengroq, batafsil) bering.
        2. Markdown formatidan (qalin matn, kod bloklari, ro'yxatlar) unumli foydalaning.
        3. Yangi boshlanuvchilar ham tushunishi uchun hayotiy yoki sodda misollar keltiring.`;

        // To'liq promptni shakllantiramiz
        const fullPrompt = `${systemRole}\n\nFoydalanuvchi savoli: ${userText}`;

        console.log(`[AI Logger] So'rov yuborilmoqda... Model: gemini-3.8-flash`);

        // Gemini 3.8 Flash modeliga so'rov yuborish
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: fullPrompt,
        });

        // Javobni tekshirish va qaytarish
        if (response && response.text) {
            console.log(`[AI Logger] Muvaffaqiyatli javob olindi.`);
            return response.text;
        } else {
            return "Kechirasiz, sun'iy intellekt bo'sh javob qaytardi. Iltimos, boshqa savol berib ko'ring.";
        }

    } catch (error) {
        console.error("[AI Error] Xatolik tafsiloti:", error);
        throw new Error(`AI bilan bog'lanishda xatolik yuz berdi: ${error.message}`);
    }
}

module.exports = { getAIResponse };
