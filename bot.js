const { Telegraf } = require('telegraf');
const { GoogleGenAI } = require('@google/genai');

// 1. Telegram Bot Tokeni
const bot = new Telegraf('8960291028:AAHEyJ0jxp2vt0c0lThkT7jMvtrClcSctV0');

// 2. Gemini AI Sozlamalari
const ai = new GoogleGenAI({ apiKey: 'AIzaSyAyxWeNYzg8qMfKtVpes0As9f4i92RB54o' });

// /start buyrug'i
bot.start((ctx) => {
    ctx.reply("Assalomu alaykum! Men IT bo'yicha yordamchi botman. Menga istalgan savolingizni bering (masalan: Backend nima?).");
});

// Matnli xabarlarni AI orqali qayta ishlash
bot.on('text', async (ctx) => {
    const userText = ctx.message.text;
    await ctx.sendChatAction('typing');

    try {
        // Model nomini xatolikda tavsiya qilinganidek 'gemini-3.8-flash' ga o'zgartiramiz
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: userText,
        });

        // Javobni olish
        const aiReply = response.text || "Kechirasiz, javob kelmadi.";
        await ctx.reply(aiReply, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error("AI Xatoligi tafsiloti:", error);
        await ctx.reply("Kechirasiz, sun'iy intellektga ulanishda xatolik yuz berdi. Iltimos, birozdan keyin yana urinib ko'ring.");
    }
});

bot.launch();
console.log('Bot ishga tushdi...');
