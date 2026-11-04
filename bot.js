const { Telegraf } = require('telegraf');
const { getAIResponse } = require('./javob'); // Alohida yaratgan faylimizni ulaymiz

// Telegram Bot Tokeni
const bot = new Telegraf('8960291028:AAHEyJ0jxp2vt0c0lThkT7jMvtrClcSctV0');

// /start buyrug'i
bot.start((ctx) => {
    ctx.reply("Assalomu alaykum! Men IT bo'yicha yordamchi botman. Menga istalgan savolingizni bering (masalan: Backend nima?).");
});

// Matnli xabarlarni qabul qilish
bot.on('text', async (ctx) => {
    const userText = ctx.message.text;
    await ctx.sendChatAction('typing');

    try {
        // AI javobini alohida fayldan olib kelamiz
        const aiReply = await getAIResponse(userText);
        await ctx.reply(aiReply, { parse_mode: 'Markdown' });

    } catch (error) {
        await ctx.reply("Kechirasiz, sun'iy intellektga ulanishda xatolik yuz berdi. Iltimos, birozdan keyin yana urinib ko'ring.");
    }
});

bot.launch();
console.log('Bot modulstrukturada ishga tushdi...');
