const { Telegraf } = require('telegraf');
const http = require('http');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

// Sening rasmiy ijtimoiy tarmoq havolalaring
const LINKS = {
    youtube: "https://www.youtube.com/@wedocoding_official",
    instagram: "https://www.instagram.com/wedocoding_official",
    telegram_channel: "https://t.me/WedoCoding_official"
};

// Start buyrug'i
bot.start((ctx) => {
    ctx.reply(
        "Assalomu alaykum! Men 'Birga Coding' kanalining rasmiy Admin botiman. 🚀\n\n" +
        "Menga quyidagi kalit so'zlarni yozishingiz mumkin:\n" +
        "• youtube - YouTube kanalimiz\n" +
        "• instagram - Instagram sahifamiz\n" +
        "• link - Barcha tarmoqlarimiz"
    );
});

// 1. YouTube haqida so'rashsa
bot.hears(/youtube|yutub|utub/i, (ctx) => {
    ctx.reply(`Bizning rasmiy YouTube kanalimiz: ${LINKS.youtube}`);
});

// 2. Instagram haqida so'rashsa
bot.hears(/instagram|insta/i, (ctx) => {
    ctx.reply(`Bizning rasmiy Instagram sahifamiz: ${LINKS.instagram}`);
});

// 3. Ijtimoiy tarmoqlar havolalari so'ralganda
bot.hears(/link|tarmoqlar|silka|silkalar/i, (ctx) => {
    ctx.reply(
        `Bizni boshqa platformalarda ham kuzatib boring:\n\n` +
        `▶️ YouTube: ${LINKS.youtube}\n` +
        `📸 Instagram: ${LINKS.instagram}\n` +
        `📢 Telegram Channel: ${LINKS.telegram_channel}`
    );
});

// Botni ishga tushirish
bot.launch();
console.log('Admin Bot muvaffaqiyatli ishga tushdi...');

// Render Free tier port talabini qondirish uchun HTTP server
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Admin Bot is active!\n');
}).listen(PORT, () => {
    console.log(`Server port ${PORT} da ishga tushdi.`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
