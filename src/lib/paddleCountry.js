/**
 * Resolve the visitor's country for Paddle PricePreview.
 *
 * Pass the result into client components. When the CDN header is missing
 * (local dev), return null so PricePreview auto-detects via IP.
 */

/** Sentinel used by callers that still want an explicit "auto" value. */
export const PADDLE_COUNTRY_AUTO = 'OTHERS'

/**
 * @param {Headers | { get: (name: string) => string | null }} headersList
 * @returns {string | null} ISO country code, or null to let Paddle auto-detect
 */
export function countryFromHeaders(headersList) {
	const raw =
		headersList.get('x-vercel-ip-country') ||
		headersList.get('cf-ipcountry') ||
		headersList.get('x-country-code') ||
		''

	const code = String(raw).trim().toUpperCase()
	if (!code || code === 'XX' || code === 'T1' || code === PADDLE_COUNTRY_AUTO) {
		return null
	}
	if (!/^[A-Z]{2}$/.test(code)) return null
	return code
}
