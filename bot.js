const { Telegraf } = require('telegraf');
const { GoogleGenAI } = require('@google/genai');

// 1. Telegram Bot Tokeni
const bot = new Telegraf('8960291028:AAHEyJ0jxp2vt0c0lThkT7jMvtrClcSctV0');

// 2. Gemini AI Sozlamalari (Siz bergan API Key qo'shildi)
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAyxWeNYzg8qMfKtVpes0As9f4i92RB54o' });

// /start buyrug'i
bot.start((ctx) => {
    const userName = ctx.from.first_name || 'Foydalanuvchi';
    ctx.reply(
        `Assalomu alaykum, ${userName}! 🤖🚀\n\n` +
        `Men **helper_uzb_bot** man. Endi men sun'iy intellekt (Gemini) bilan ishlayman!\n\n` +
        `Menga IT, dasturlash, backend, frontend, database yoki boshqa istalgan mavzuda savol berishingiz mumkin. Men tayyorman!`
    );
});

// Har qanday matnli xabarni sun'iy intellekt orqali qayta ishlash
bot.on('text', async (ctx) => {
    const userText = ctx.message.text;

    // Telegramda "typing..." (yozmoqda...) statusini ko'rsatish
    await ctx.sendChatAction('typing');

    try {
        // Gemini modeliga so'rov yuborish
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ 
                        text: `Siz tajribali IT ustozi va dasturchisiz. Foydalanuvchi sizga IT yoki dasturlash bo'yicha savol berdi.
                        Ushbu savolga o'zbek tilida, juda tushunarli, aniq va qulay (markdown formatida) javob bering:

                        Savol: ${userText}` 
                    }]
                }
            ]
        });

        const aiReply = response.text || "Kechirasiz, bu savolga javob bera olmadim.";
        
        // Javobni foydalanuvchiga yuborish
        await ctx.reply(aiReply, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error("AI Xatoligi:", error);
        await ctx.reply("Kechirasiz, javob tayyorlashda xatolik yuz berdi. Birozdan keyin qayta urinib ko'ring.");
    }
});

// Botni ishga tushirish
bot.launch();
console.log('AI bilan ishlaydigan Telegram bot muvaffaqiyatli ishga tushdi!');
