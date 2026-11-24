'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { chromeIntentUrl, detectInAppBrowser } from '@/lib/inAppBrowser'
import { track } from '@/lib/analytics'
import { kitTrack } from '@/lib/kitTrack'
import styles from './OpenInBrowser.module.css'

const SEEN_KEY = 'sc_iab_seen'
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
		const detected = detectInAppBrowser(navigator.userAgent)
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
 * Full-screen prompt that points at the in-app browser's ••• menu and asks
 * the visitor to reopen the page in Safari / Chrome, where Apple Pay, Google
 * Pay and saved cards work. `mode="pay"` is shown when they press Buy inside
 * the app and offers "Pay here anyway".
 */
export function OpenInBrowserOverlay({ info, mode = 'land', onClose, onPayHere }) {
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
			<div className={styles.dots} aria-hidden="true">
				{dots}
			</div>
			<svg className={styles.arrow} viewBox="0 0 120 92" aria-hidden="true">
				<path d="M14 84 C 40 80, 76 66, 92 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
				<path d="M78 34 L 94 22 L 100 42" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
			</svg>

			<h2 id="iab-title" className={styles.title}>
				{mode === 'pay' ? (
					<>
						Pay in your <span>browser</span>
					</>
				) : (
					<>
						Open in your <span>browser</span>
					</>
				)}
			</h2>
			<p className={styles.why}>
				Payments often fail inside {info.app}. In {info.ios ? 'Safari' : 'Chrome'} you can pay in one tap with{' '}
				{info.ios ? 'Apple Pay' : 'Google Pay'} or a saved card.
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

			{mode === 'pay' ? (
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
			) : (
				<button
					type="button"
					className={styles.skip}
					onClick={() => {
						track('iab_continue_here', { app: info.app })
						kitTrack('iab_continue', { app: info.app })
						onClose?.()
					}}
				>
					Keep reading here
				</button>
			)}
		</div>,
		// inside the kit page (it carries the font variables) when there is one
		document.querySelector('[data-kit-page]') || document.body,
	)
}

/** Shows the prompt once per visit when the page opens inside Instagram / TikTok. */
export default function OpenInBrowserGate() {
	const info = useInAppBrowser()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (info && !readFlag(SEEN_KEY)) {
			setFlag(SEEN_KEY)
			setOpen(true)
		}
	}, [info])

	if (!info || !open) return null
	return <OpenInBrowserOverlay info={info} onClose={() => setOpen(false)} />
}
