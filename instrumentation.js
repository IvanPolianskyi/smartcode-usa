// Next.js instrumentation hook (runs on server startup)
// Telegram polling bot is loaded only on demand — never at module top level.

export async function register() {
	if (process.env.NEXT_RUNTIME === 'edge') return

	
	if (process.env.VERCEL) return

	// Opt-in for local dev / dedicated Node server (set in .env.local).
	if (process.env.ENABLE_TELEGRAM_POLLING !== 'true') return

	try {
		const mod = await import('./src/lib/telegramBot.js')
		const telegramBotService = mod.default ?? mod
		const status = telegramBotService.getStatus()
		if (!status.isRunning) {
			await telegramBotService.start()
		}
	} catch (error) {
		console.error('Failed to start Telegram bot in instrumentation:', error)
	}
}
