const { Telegraf } = require('telegraf');
const { getAIResponse } = require('./javob');

// Telegram Bot Tokenini to'g'ridan-to'g'ri yozamiz (Render eskisini o'qib adashib qolmasligi uchun)
const BOT_TOKEN = '8960291028:AAFN6YgPOJJv9P6jcTaFUTirZ1gXl822Qu0';
const bot = new Telegraf(BOT_TOKEN);

// /start buyrug'i kelganda ishga tushadigan qism
bot.start((ctx) => {
    const firstName = ctx.from.first_name || 'Do\'st';
    ctx.reply(
        `Assalomu alaykum, ${firstName}! 🤖🚀\n\n` +
        `Men sizning shaxsiy **IT Ustoz** botingizman.\n` +
        `Mendan frontend, backend, database, ReactJS, Node.js va istalgan IT mavzulari bo'yicha batafsil ma'lumot so'rashingiz mumkin.\n\n` +
        `Hozircha savolingizni yozib yuboring! Qani, boshladik! 💻`
    );
});

// Foydalanuvchidan matn kelganda ishlaydigan asosiy qism
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

// Botni ishga tushirish
bot.launch();
console.log('Bot to\'liq quvvatda (Gemini 3.8 Flash bilan) ishga tushdi va xabarlarni kutmoqda...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
