const UTM_KEYS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_term',
	'utm_content',
]

const CLICK_ID_KEYS = ['fbclid', 'gclid', 'ttclid']
const ATTRIBUTION_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]
const STORAGE_KEY = 'sc_attribution_v1'

const PAID_MEDIUMS = ['cpc', 'ppc', 'paid', 'paid_social', 'cpm', 'display', 'paidsocial']
const PAID_SOURCES = [
	'facebook',
	'instagram',
	'meta',
	'fb',
	'ig',
	'fbads',
	'metaads',
	'google',
	'googleads',
	'adwords',
	'tiktok',
	'tt',
	'bytedance',
]

function hasValue(value) {
	return typeof value === 'string' && value.trim().length > 0
}

function pickAttributionFromParams(searchParams) {
	const payload = {}

	for (const key of ATTRIBUTION_KEYS) {
		const value = searchParams.get(key)
		if (hasValue(value)) payload[key] = value.trim()
	}

	return payload
}

/**
 * Витягнути UTM / click-id з будь-якого URL (sourceUrl на сервері тощо).
 */
export function parseAttributionFromUrl(url) {
	if (!hasValue(url)) return {}
	try {
		const parsed = new URL(String(url).trim())
		return pickAttributionFromParams(parsed.searchParams)
	} catch {
		// Якщо прийшов лише query string або битий URL — спробуємо як search.
		try {
			const raw = String(url).trim()
			const query = raw.includes('?') ? raw.slice(raw.indexOf('?') + 1) : raw
			return pickAttributionFromParams(new URLSearchParams(query))
		} catch {
			return {}
		}
	}
}

/**
 * Meta _fbc формат: fb.1.<creation_time_millis>.<fbclid>
 */
export function extractFbclidFromFbc(fbc) {
	if (!hasValue(fbc)) return null
	const parts = String(fbc).trim().split('.')
	if (parts.length < 4) return null
	if (parts[0] !== 'fb') return null
	const fbclid = parts.slice(3).join('.')
	return hasValue(fbclid) ? fbclid : null
}

export function mergeAttribution(...sources) {
	const merged = {}
	for (const source of sources) {
		if (!source || typeof source !== 'object') continue
		for (const key of ATTRIBUTION_KEYS) {
			if (hasValue(source[key])) merged[key] = String(source[key]).trim()
		}
	}
	return merged
}

export function getClientAttribution() {
	if (typeof window === 'undefined') return {}

	const fromUrl = pickAttributionFromParams(new URLSearchParams(window.location.search))
	let stored = {}

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (raw) stored = JSON.parse(raw) || {}
	} catch {}

	const merged = mergeAttribution(stored, fromUrl)

	try {
		if (Object.keys(merged).length > 0) {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
		}
	} catch {}

	return merged
}

export function sanitizeAttribution(rawAttribution) {
	const safe = {}
	const source = rawAttribution && typeof rawAttribution === 'object' ? rawAttribution : {}
	for (const key of ATTRIBUTION_KEYS) {
		const value = source[key]
		if (hasValue(value)) safe[key] = value.trim()
	}
	return safe
}

/**
 * Повна атрибуція для сервера: клієнт + sourceUrl + cookies Meta.
 * Не використовує _fbp як ознаку реклами — він є у всіх відвідувачів з пікселем.
 */
export function resolveServerAttribution({
	clientAttribution,
	sourceUrl,
	fbc,
	fbp,
} = {}) {
	const fromClient = sanitizeAttribution(clientAttribution)
	const fromUrl = parseAttributionFromUrl(sourceUrl)
	const merged = mergeAttribution(fromUrl, fromClient)

	const fbclidFromFbc = extractFbclidFromFbc(fbc)
	if (!merged.fbclid && fbclidFromFbc) {
		merged.fbclid = fbclidFromFbc
	}

	return {
		...merged,
		...(hasValue(fbc) ? { fbc: String(fbc).trim() } : {}),
		...(hasValue(fbp) ? { fbp: String(fbp).trim() } : {}),
	}
}

/**
 * @returns {{ type: 'Реклама' | 'Органіка/невідомо', reason: string, signals: string[] }}
 */
export function detectTrafficType(attribution) {
	const medium = String(attribution?.utm_medium || '').toLowerCase()
	const source = String(attribution?.utm_source || '').toLowerCase()
	const signals = []

	if (hasValue(attribution?.fbclid)) signals.push('fbclid')
	if (hasValue(attribution?.fbc) && !signals.includes('fbclid')) signals.push('_fbc')
	if (hasValue(attribution?.gclid)) signals.push('gclid')
	if (hasValue(attribution?.ttclid)) signals.push('ttclid')

	const paidMedium = PAID_MEDIUMS.find((m) => medium.includes(m))
	if (paidMedium) signals.push(`utm_medium=${attribution.utm_medium}`)

	const paidSource = PAID_SOURCES.find((s) => source === s || source.includes(s))
	if (paidSource) signals.push(`utm_source=${attribution.utm_source}`)

	const hasUtmWithoutPaidHint =
		!signals.length &&
		(hasValue(attribution?.utm_source) ||
			hasValue(attribution?.utm_medium) ||
			hasValue(attribution?.utm_campaign))

	if (signals.length > 0) {
		return {
			type: 'Реклама',
			reason: signals.join(', '),
			signals,
		}
	}

	if (hasUtmWithoutPaidHint) {
		return {
			type: 'Органіка/невідомо',
			reason: `є UTM без paid-ознаки (${[
				attribution.utm_source && `source=${attribution.utm_source}`,
				attribution.utm_medium && `medium=${attribution.utm_medium}`,
				attribution.utm_campaign && `campaign=${attribution.utm_campaign}`,
			]
				.filter(Boolean)
				.join(', ')})`,
			signals: [],
		}
	}

	return {
		type: 'Органіка/невідомо',
		reason: 'немає UTM і click-id (Meta може окремо рахувати view-through)',
		signals: [],
	}
}
