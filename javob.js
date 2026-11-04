/**
 * ============================================================================
 * Fayl nomi: javob.js
 * Tavsif: Gemini AI integratsiya moduli va IT ustoz bot uchun yordamchi funksiyalar
 * Muallif: Muhammadsafo (IT Mentorship Project)
 * ============================================================================
 */

const { GoogleGenAI } = require('@google/genai');

// Render Environment Variables'dan API kalitni xavfsiz o'qib olish
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("[DIQQAT] GEMINI_API_KEY environment variable topilmadi! Render sozlamalarini tekshiring.");
}

// Google GenAI obyektini ishga tushiramiz
const ai = new GoogleGenAI({ apiKey: apiKey });

/**
 * Sun'iy intellekt uchun maxsus rol va ko'rsatmalar (System Instructions)
 * Bu botning qanday tilda va qanday uslubda javob berishini boshqaradi.
 */
const IT_MENTOR_SYSTEM_INSTRUCTION = `
Siz tajribali, professional va o'ta e'tiborli IT ustozi va mentorisiz. 
Siz bilan muloqot qilayotganlar asosan dasturlashni o'rganayotgan yoshlar va o'quvchilar.
Sizning vazifalaringiz:
1. Savollarga har doim aniq, tushunarli va o'zbek tilida (zarur bo'lganda inglizcha/ruscha professional IT atamalarini to'g'ri qo'llagan holda) javob berish.
2. Kod yozish talab qilinganda, uni toza, xatosiz va Markdown code block formatida keltirish.
3. O'quvchiga faqat tayyor kodni berib qo'ymasdan, uning mantiqini va nima uchun bunday yozilganini qisqacha tushuntirib o'tish.
4. Har doim motivatsiya berib, ularning IT sohasidagi qiziqishini qo'llab-quvvatlash.
`;

/**
 * Foydalanuvchi xabarini Gemini AI modeliga yuborib, javob qaytaruvchi asosiy funksiya
 * @param {string} userText - Foydalanuvchining savoli yoki xabari
 * @returns {Promise<string>} - AI tomonidan qaytarilgan javob matni
 */
async function getAIResponse(userText) {
    try {
        console.log(`[AI Request] Yangi so'rov keldi. Matn uzunligi: ${userText.length} ta belgi.`);

        // Gemini 1.5 Flash modelidan foydalanamiz
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: userText,
            config: {
                systemInstruction: IT_MENTOR_SYSTEM_INSTRUCTION,
                temperature: 0.7, // Kreativlik va aniqlik balansi
                maxOutputTokens: 2048, // Uzunroq va to'liqroq javoblar uchun
            }
        });

        // Javob kelganini tekshirish
        if (response && response.text) {
            console.log("[AI Response] Javob muvaffaqiyatli shakllantirildi.");
            return response.text;
        } else {
            console.warn("[AI Warning] Model bo'sh javob qaytardi.");
            return "Kechirasiz, sun'iy intellekt bu safar bo'sh javob qaytardi. Iltimos, savolingizni qaytadan yuboring.";
        }

    } catch (error) {
        console.error("[AI Error] Gemini API bilan bog'lanishda xatolik yuz berdi:", error.message || error);
        
        // Xatolik turiga qarab foydalanuvchiga tushunarli xabar berish
        if (error.message && error.message.includes('API_KEY')) {
            return "Xatolik: API kaliti noto'g'ri yoki sozlanmagan.";
        } else if (error.message && error.message.includes('quota')) {
            return "Xatolik: API so'rovlar limiti tugagan. Iltimos, birozdan keyin urinib ko'ring.";
        }
        
        throw new Error("Sun'iy intellekt bilan aloqa o'rnatishda xatolik yuz berdi.");
    }
}

/**
 * Qo'shimcha funksiya: Kelgusida o'quvchilarning kodlarini tahlil qilish uchun
 * @param {string} codeText - O'quvchi yuborgan kod
 * @param {string} taskDescription - Vazifa sharti
 */
async function analyzeStudentCode(codeText, taskDescription) {
    const prompt = `Quyidagi kodni tahlil qilib ber:\n\nVazifa: ${taskDescription}\n\nKod:\n\`\`\`javascript\n${codeText}\n\`\`\`\n\nIltimos, kodda xatolar bo'lsa ko'rsat va qanday to'g'rilash kerakligini tushuntir.`;
    return await getAIResponse(prompt);
}

// Modullarni tashqi foydalanish uchun eksport qilish
module.exports = { 
    getAIResponse,
    analyzeStudentCode 
};
