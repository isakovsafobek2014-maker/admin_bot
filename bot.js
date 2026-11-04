const { Telegraf } = require('telegraf');
const { getAIResponse } = require('./javob');
const http = require('http');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("Assalomu alaykum! Men sizning IT ustoz botingizman. IT bo'yicha istalgan savolingizni bering!");
});

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

// Render Free tier port talabini qondirish uchun HTTP server
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running successfully!\n');
}).listen(PORT, () => {
    console.log(`Server port ${PORT} da ishga tushdi.`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
