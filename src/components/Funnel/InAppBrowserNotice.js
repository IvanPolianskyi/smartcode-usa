'use client'

import { useEffect, useState } from 'react'
import { chromeIntentUrl, detectInAppBrowser } from '@/lib/inAppBrowser'
import { track } from '@/lib/analytics'
import styles from '@/app/[locale]/funnel.module.css'

/**
 * Shown above payment buttons when the page is open inside Instagram /
 * Facebook / TikTok. Card payments mostly fail there, so we ask people to
 * reopen the page in Safari or Chrome first.
 */
export default function InAppBrowserNotice() {
	const [info, setInfo] = useState(null)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const detected = detectInAppBrowser(navigator.userAgent)
		if (detected) {
			setInfo({ ...detected, href: window.location.href })
			track('in_app_browser_notice', { app: detected.app })
		}
	}, [])

	if (!info) return null

	const intent = info.android ? chromeIntentUrl(info.href) : null

	async function copy() {
		try {
			await navigator.clipboard.writeText(info.href)
			setCopied(true)
		} catch {
			window.prompt('Copy this link and open it in Safari or Chrome:', info.href)
		}
	}

	return (
		<div className={styles.notice} role="note">
			<p style={{ margin: 0 }}>
				<strong>You are in the {info.app} browser.</strong> Card payments often
				fail here. Open this page in {info.ios ? 'Safari' : 'Chrome'} to pay with
				Apple Pay, Google Pay or a saved card.
			</p>
			<p style={{ margin: 0 }}>
				{info.ios
					? 'Tap ••• (top right) → “Open in external browser”.'
					: 'Tap ⋮ (top right) → “Open in Chrome”, or use the button below.'}
			</p>
			<div className={styles.row}>
				{intent ? (
					<a href={intent} className={styles.noticeBtn}>
						Open in Chrome
					</a>
				) : null}
				<button type="button" className={styles.noticeBtn} onClick={copy}>
					{copied ? 'Link copied' : 'Copy link'}
				</button>
			</div>
		</div>
	)
}
