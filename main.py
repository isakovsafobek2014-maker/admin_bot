import os
import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, filters
import server

# Logging sozlamalari
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Bot tokenini muhit o'zgaruvchisidan olish
TOKEN = os.getenv("BOT_TOKEN")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message or not update.message.text:
        return

    text = update.message.text.lower()

    # IT ga oid savollar bazasi
    if "python" in text:
        reply = "🐍 **Python** — backend, sun'iy intellekt va avtomatlashtirishda keng qo'llaniladigan dasturlash tili."
    elif "javascript" in text or "js" in text:
        reply = "⚡ **JavaScript** — veb-saytlar va Node.js platformasida dasturlar yaratish uchun ishlatiladi."
    elif "git" in text or "github" in text:
        reply = "🐙 **Git** — kod versiyalarini boshqarish tizimi, **GitHub** esa ularni saqlash platformasi."
    elif "docker" in text:
        reply = "🐳 **Docker** — ilovalarni konteynerlarda ishga tushirish vositasi."
    elif "linux" in text:
        reply = "🐧 **Linux** — serverlar va IT infratuzilmasida eng ko'p ishlatiladigan operatsion tizim."
    else:
        return  # IT ga taalluqli bo'lmagan xabarlarga javob bermaydi

    await update.message.reply_text(reply, parse_mode="Markdown")

if __name__ == '__main__':
    if not TOKEN:
        print("Xatolik: BOT_TOKEN topilmadi!")
        exit(1)

    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), handle_message))

    print("admin_bot ishga tushdi...")
    app.run_polling()