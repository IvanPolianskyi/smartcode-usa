// Next.js instrumentation hook (runs on server startup)
// Бот проєктів вимкнено — polling не запускаємо.

export async function register() {
	if (process.env.NEXT_RUNTIME === 'edge') return
	// Projects Telegram bot disabled (see /api/telegram/webhook).
	return
}
