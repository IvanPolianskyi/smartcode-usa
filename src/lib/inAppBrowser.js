/**
 * In-app browsers (Instagram, Facebook, TikTok, …) where card payments fail.
 *
 * Site data 28.08-06.11.2026: of people who started checkout inside the
 * Instagram browser 6 of 106 finished it, against 26-32% in Safari / Chrome.
 * No Apple Pay, no saved cards, and the bank's 3-D Secure step bounces the
 * buyer into the bank app and never back.
 */

const IN_APP = [
	{ re: /Instagram/i, name: 'Instagram' },
	{ re: /FBAN|FBAV|FB_IAB|FBIOS/i, name: 'Facebook' },
	{ re: /musical_ly|BytedanceWebview|TikTok/i, name: 'TikTok' },
	{ re: /Snapchat/i, name: 'Snapchat' },
	{ re: /\bLine\//i, name: 'LINE' },
]

/** @returns {{ app: string, android: boolean, ios: boolean } | null} */
export function detectInAppBrowser(userAgent = '') {
	const ua = String(userAgent || '')
	const hit = IN_APP.find((entry) => entry.re.test(ua))
	if (!hit) return null
	return {
		app: hit.name,
		android: /Android/i.test(ua),
		ios: /iPhone|iPad|iPod/i.test(ua),
	}
}

/** Android intent link that reopens the same page in Chrome. */
export function chromeIntentUrl(href) {
	try {
		const url = new URL(href)
		return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=https;package=com.android.chrome;end`
	} catch {
		return null
	}
}
