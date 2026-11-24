'use client'

import { useState } from 'react'
import { loadPaddle } from '@/lib/paddleClient'
import { track } from '@/lib/analytics'
import { readPromoCode } from '@/lib/startCheckout'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { OpenInBrowserOverlay, useInAppBrowser, wantsToPayHere } from '@/components/Funnel/OpenInBrowser'

const KIT_PRICE_IDS = {
	'roblox-ai-games': process.env.NEXT_PUBLIC_PADDLE_PRICE_KIT_GAMES || '',
}

function readSource() {
	try {
		const params = new URLSearchParams(window.location.search)
		const raw = params.get('src') || params.get('utm_source') || ''
		const clean = /^[a-z0-9_-]{1,32}$/i.test(raw) ? raw.toLowerCase() : ''
		if (clean) window.sessionStorage.setItem('sc_src', clean)
		return clean || window.sessionStorage.getItem('sc_src') || 'direct'
	} catch {
		return 'direct'
	}
}

/**
 * "Buy now" for a one-time kit: opens Paddle checkout straight away - no
 * account first. Paddle collects the email; the webhook creates the account
 * and emails the access link. Access is never granted from the success page.
 */
export default function KitBuyButton({ kitId, children, className = 'sc-btn sc-btn-primary sc-btn-lg' }) {
	const { user } = useAuthSession()
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [askBrowser, setAskBrowser] = useState(false)
	const inApp = useInAppBrowser()
	const priceId = String(KIT_PRICE_IDS[kitId] || '').trim()

	/** Inside Instagram / TikTok, first ask to reopen the page in Safari / Chrome. */
	function onClick() {
		if (inApp && !wantsToPayHere()) {
			setAskBrowser(true)
			return
		}
		buy()
	}

	async function buy() {
		setError('')
		if (!priceId) {
			setError('Checkout is not switched on yet. Try again in a few minutes.')
			return
		}
		setBusy(true)
		const source = readSource()
		track('begin_checkout', { kit: kitId, source })
		try {
			const Paddle = await loadPaddle()
			Paddle.Checkout.open({
				items: [{ priceId, quantity: 1 }],
				customer: user?.email ? { email: user.email } : undefined,
				discountCode: readPromoCode() || undefined,
				customData: {
					kit: kitId,
					src: source,
					...(user?._id || user?.id ? { userId: String(user._id || user.id) } : {}),
				},
				settings: {
					displayMode: 'overlay',
					variant: 'one-page',
					successUrl: `${window.location.origin}/kit/thanks?kit=${encodeURIComponent(kitId)}`,
				},
			})
		} catch (err) {
			setError(err?.message || 'Could not open checkout. Try again.')
		} finally {
			setBusy(false)
		}
	}

	return (
		<div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
			<button type="button" className={className} onClick={onClick} disabled={busy}>
				{busy ? 'Opening checkout…' : children}
			</button>
			{error ? <p style={{ margin: 0, color: '#b42318', fontSize: 14 }}>{error}</p> : null}
			{askBrowser && inApp ? (
				<OpenInBrowserOverlay
					info={inApp}
					mode="pay"
					onPayHere={() => {
						setAskBrowser(false)
						buy()
					}}
				/>
			) : null}
		</div>
	)
}
