'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { chromeIntentUrl, detectInAppBrowser } from '@/lib/inAppBrowser'
import { track } from '@/lib/analytics'
import { kitTrack } from '@/lib/kitTrack'
import styles from './OpenInBrowser.module.css'

export const PAY_HERE_KEY = 'sc_iab_pay_here'

function readFlag(key) {
	try {
		return window.sessionStorage.getItem(key) === '1'
	} catch {
		return false
	}
}

function setFlag(key) {
	try {
		window.sessionStorage.setItem(key, '1')
	} catch {
		/* private mode: the prompt just shows again next time */
	}
}

/** In-app browser info for this visitor, or null in Safari / Chrome. */
export function useInAppBrowser() {
	const [info, setInfo] = useState(null)
	useEffect(() => {
		let ua = navigator.userAgent
		// Local testing only: /kit?iab=instagram (or tiktok, facebook) pretends to be that app.
		if (process.env.NODE_ENV !== 'production') {
			const fake = new URLSearchParams(window.location.search).get('iab')
			if (fake) ua = `Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148 ${{ instagram: 'Instagram 350.0', tiktok: 'BytedanceWebview TikTok', facebook: 'FBAN/FBIOS' }[fake] || fake}`
		}
		const detected = detectInAppBrowser(ua)
		if (detected) setInfo({ ...detected, href: window.location.href })
	}, [])
	return info
}

/** True when this visitor already chose to pay inside the in-app browser. */
export function wantsToPayHere() {
	return readFlag(PAY_HERE_KEY)
}

function menuLabel(info) {
	if (info.app === 'TikTok') return 'Open in browser'
	return info.ios ? 'Open in external browser' : 'Open in Chrome'
}

/**
 * Full-screen prompt shown when someone presses Buy inside Instagram /
 * TikTok. It points at the in-app browser's ••• menu and asks them to reopen
 * the page in Safari / Chrome, where Apple Pay, Google Pay and saved cards
 * work. They can still pay here anyway, or close it and keep reading.
 */
export function OpenInBrowserOverlay({ info, onClose, onPayHere }) {
	const mode = 'pay'
	const [copied, setCopied] = useState(false)
	useEffect(() => {
		track('iab_overlay_shown', { app: info.app, mode })
		kitTrack('iab_shown', { app: info.app, mode })
	}, [info.app, mode])

	const intent = info.android ? chromeIntentUrl(info.href) : null
	const dots = info.android && info.app !== 'TikTok' ? '⋮' : '•••'

	async function copy() {
		try {
			await navigator.clipboard.writeText(info.href)
			setCopied(true)
			track('iab_copy_link', { app: info.app })
			kitTrack('iab_copy_link', { app: info.app, mode })
		} catch {
			window.prompt('Copy this link and open it in Safari or Chrome:', info.href)
		}
	}

	// Portal: the sticky nav has backdrop-filter, which would trap position: fixed.
	return createPortal(
		<div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="iab-title">
			{/* Points up at the app's own ••• button, which sits just above the page. */}
			<div className={styles.tap} aria-hidden="true">
				<svg className={styles.arrow} viewBox="0 0 40 64">
					<path d="M22 60 C 8 48, 8 24, 24 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
					<path d="M13 12 L 25 6 L 29 19" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				<span className={styles.tapPill}>Tap here</span>
			</div>

			<div className={styles.progress}>
				<div className={styles.progressHead}>
					<span className={styles.eyebrow}>Almost there</span>
					<span className={styles.count}>3/4</span>
				</div>
				<div className={styles.bar}>
					<span />
				</div>
				<p className={styles.next}>Kit picked ✓ · Open in browser · Pay · Download</p>
			</div>

			<h2 id="iab-title" className={styles.title}>
				Pay in your <span>browser</span>
			</h2>
			<p className={styles.why}>
				The kit may not open properly inside {info.app}. Open this page in {info.ios ? 'Safari' : 'Chrome'} so your games and guide download right after you pay.
			</p>

			<ol className={styles.steps}>
				<li>
					<span className={styles.num}>1</span>
					<span>
						Tap <span className={styles.key}>{dots}</span> in the top right corner
					</span>
				</li>
				<li>
					<span className={styles.num}>2</span>
					<span>
						Tap <span className={styles.key}>{menuLabel(info)}</span>
					</span>
				</li>
			</ol>

			{intent ? (
				<a href={intent} className={styles.primary} onClick={() => {
					track('iab_open_chrome', { app: info.app })
					kitTrack('iab_open_chrome', { app: info.app, mode })
				}}>
					Open in Chrome
				</a>
			) : null}
			<button type="button" className={styles.secondary} onClick={copy}>
				{copied ? 'Link copied - paste it in your browser' : 'Copy the link instead'}
			</button>

			<button
				type="button"
				className={styles.skip}
				onClick={() => {
					setFlag(PAY_HERE_KEY)
					track('iab_pay_here', { app: info.app })
					kitTrack('iab_pay_here', { app: info.app })
					onPayHere?.()
				}}
			>
				Pay here anyway
			</button>
			<button
				type="button"
				className={styles.skip}
				onClick={() => {
					track('iab_continue_here', { app: info.app })
					kitTrack('iab_continue', { app: info.app })
					onClose?.()
				}}
			>
				Back to the page
			</button>
		</div>,
		// inside the kit page (it carries the font variables) when there is one
		document.querySelector('[data-kit-page]') || document.body,
	)
}
