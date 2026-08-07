// Next.js instrumentation hook (runs on server startup)

export async function register() {
	if (process.env.NEXT_RUNTIME === 'edge') return

	// Projects Telegram bot disabled (see /api/telegram/webhook).

	// Бот заявок: кнопки статусу → /api/telegram/leads-webhook
	// На production після деплою/cold start ідемпотентно викликає setWebhook.
	try {
		const { ensureLeadsTelegramWebhook } = await import(
			'@/lib/ensureLeadsTelegramWebhook'
		)
		const result = await ensureLeadsTelegramWebhook()
		if (result?.skipped) {
			console.log('[leads-webhook] skip:', result.reason)
		} else if (result?.ok) {
			console.log('[leads-webhook] ready:', result.webhookUrl)
		} else {
			console.warn('[leads-webhook] setup issue:', result)
		}
	} catch (e) {
		console.warn('[leads-webhook] auto-setup error:', e)
	}

	try {
		const { ensureAffiliateClickIndexes } = await import('@/lib/affiliateClicks')
		await ensureAffiliateClickIndexes()
	} catch (e) {
		console.warn('[affiliate-clicks] index setup error:', e)
	}
}
