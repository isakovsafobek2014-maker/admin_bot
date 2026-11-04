const { Telegraf } = require('telegraf');

// Siz bergan token
const bot = new Telegraf('8960291028:AAHEyJ0jxp2vt0c0lThkT7jMvtrClcSctV0');

bot.start((ctx) => {
    const userName = ctx.from.first_name || 'Foydalanuvchi';
    ctx.reply(`Assalomu alaykum, ${userName}! 🤖\nMen 'helper_uzb_bot' man. Sizga qanday yordam bera olaman?`);
});

bot.launch();
console.log('Bot Node.js da ishga tushdi...');
