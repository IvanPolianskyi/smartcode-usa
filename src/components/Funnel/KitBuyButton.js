'use client'

import { useState } from 'react'
import { loadPaddle, onPaddleEvent } from '@/lib/paddleClient'
import { track } from '@/lib/analytics'
import { kitIds, kitTrack, readSource } from '@/lib/kitTrack'
import { readPromoCode } from '@/lib/startCheckout'
import { useAuthSession } from '@/components/AuthSessionProvider'
import { OpenInBrowserOverlay, useInAppBrowser, wantsToPayHere } from '@/components/Funnel/OpenInBrowser'

const KIT_PRICE_IDS = {
	'roblox-ai-games': process.env.NEXT_PUBLIC_PADDLE_PRICE_KIT_GAMES || '',
}

/** Paddle overlay events -> kit analytics. Subscribed once per page. */
const CHECKOUT_EVENTS = {
	'checkout.loaded': 'checkout_open',
	'checkout.customer.created': 'checkout_email',
	'checkout.payment.initiated': 'payment_attempt',
	'checkout.payment.failed': 'payment_failed',
	'checkout.error': 'checkout_error',
	'checkout.completed': 'checkout_completed',
	'checkout.closed': 'checkout_closed',
}
let checkoutTracking = null
let lastPosition = null
let completed = false

function trackCheckoutEvents() {
	if (checkoutTracking) return
	checkoutTracking = onPaddleEvent((event) => {
		const name = CHECKOUT_EVENTS[event?.name]
		if (!name) return
		if (name === 'checkout_completed') completed = true
		if (name === 'checkout_closed' && completed) return
		const data = event?.data || {}
		const method = data?.payment?.method_details?.type || data?.payment_method || null
		const reason = event?.error?.code || event?.error?.detail || event?.detail || data?.error?.code || null
		kitTrack(name, {
			position: lastPosition,
			...(method ? { method: String(method) } : {}),
			...(reason ? { reason: String(reason).slice(0, 80) } : {}),
			...(data?.currency_code ? { currency: data.currency_code } : {}),
		})
	})
}

/**
 * "Buy now" for a one-time kit: opens Paddle checkout straight away - no
 * account first. Paddle collects the email; the webhook creates the account
 * and emails the access link. Access is never granted from the success page.
 */
export default function KitBuyButton({ kitId, children, className = 'sc-btn sc-btn-primary sc-btn-lg', position = 'other' }) {
	const { user } = useAuthSession()
	const [busy, setBusy] = useState(false)
	const [error, setError] = useState('')
	const [askBrowser, setAskBrowser] = useState(false)
	const inApp = useInAppBrowser()
	const priceId = String(KIT_PRICE_IDS[kitId] || '').trim()

	/** Inside Instagram / TikTok, first ask to reopen the page in Safari / Chrome. */
	function onClick() {
		lastPosition = position
		kitTrack('cta_click', { position, in_app: Boolean(inApp) })
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
		const { kid, sid } = kitIds()
		track('begin_checkout', { kit: kitId, source })
		trackCheckoutEvents()
		completed = false
		try {
			const Paddle = await loadPaddle()
			const promo = readPromoCode()
			Paddle.Checkout.open({
				items: [{ priceId, quantity: 1 }],
				customer: user?.email ? { email: user.email } : undefined,
				discountCode: promo || undefined,
				customData: {
					kit: kitId,
					src: source,
					...(kid ? { kid } : {}),
					...(sid ? { ksid: sid } : {}),
					...(position ? { cta: position } : {}),
					...(user?._id || user?.id ? { userId: String(user._id || user.id) } : {}),
				},
				settings: {
					displayMode: 'overlay',
					variant: 'one-page',
					// An empty "Add discount code" box sends people off to hunt for
					// coupons. Show it only when they came with a promo link.
					showAddDiscounts: Boolean(promo),
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
