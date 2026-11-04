import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

# Logging sozlamalari (xatolarni kuzatib borish uchun)
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# /start buyrug'i uchun funksiya
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_name = update.effective_user.first_name
    await update.message.reply_text(
        f"Assalomu alaykum, {user_name}! 🤖\n"
        "Men 'helper_uzb_bot' man. Sizga qanday yordam bera olaman?"
    )

def main():
    # Siz taqdim etgan bot tokeni
    TOKEN = "8960291028:AAHEyJ0jxp2vt0c0lThkT7jMvtrClcSctV0"
    
    # Yangi ApplicationBuilder arxitekturasi
    application = ApplicationBuilder().token(TOKEN).build()

    # /start buyrug'iga handler qo'shish
    application.add_handler(CommandHandler("start", start))

    # Botni ishga tushirish (Polling)
    print("Bot ishga tushdi...")
    application.run_polling()

if __name__ == '__main__':
    main()
