const { Telegraf } = require('telegraf');
const { getAIResponse } = require('./javob');

// Telegram Bot Tokeni
const BOT_TOKEN = '8960291028:AAFN6YgPOJJv9P6jcTaFUTirZ1gXl822Qu0';
const bot = new Telegraf(BOT_TOKEN);

// /start buyrug'i
bot.start((ctx) => {
    ctx.reply("Assalomu alaykum! Men sizning IT ustoz botingizman. IT bo'yicha istalgan savolingizni bering!");
});

// Xabarlarni qabul qilish
bot.on('text', async (ctx) => {
    const userText = ctx.message.text;
    await ctx.sendChatAction('typing');

    try {
        const aiReply = await getAIResponse(userText);
        
        if (aiReply.length > 4000) {
            const chunks = aiReply.match(/[\s\S]{1,4000}/g) || [aiReply];
            for (const chunk of chunks) {
                await ctx.reply(chunk, { parse_mode: 'Markdown' });
            }
        } else {
            await ctx.reply(aiReply, { parse_mode: 'Markdown' });
        }

    } catch (error) {
        console.error("Bot xatoligi:", error);
        await ctx.reply("Kechirasiz, sun'iy intellektga ulanishda xatolik yuz berdi. Iltimos, birozdan keyin yana urinib ko'ring.");
    }
});

bot.launch();
console.log('Bot muvaffaqiyatli ishga tushdi...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
