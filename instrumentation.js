// Next.js instrumentation hook (runs on server startup)

export async function register() {
	if (process.env.NEXT_RUNTIME === 'edge') return

	// Billing indexes are what make webhook replays harmless, so create them
	// before the first webhook can arrive rather than lazily on it.
	try {
		const { ensureBillingIndexes } = await import('@/lib/entitlements')
		await ensureBillingIndexes()
	} catch (error) {
		console.warn('[billing] index setup skipped:', error?.message || error)
	}
}
