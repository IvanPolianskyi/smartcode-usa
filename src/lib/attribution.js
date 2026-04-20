const UTM_KEYS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_term',
	'utm_content',
]

const CLICK_ID_KEYS = ['fbclid', 'gclid', 'ttclid']
const STORAGE_KEY = 'sc_attribution_v1'

function hasValue(value) {
	return typeof value === 'string' && value.trim().length > 0
}

function pickAttributionFromParams(searchParams) {
	const payload = {}

	for (const key of UTM_KEYS) {
		const value = searchParams.get(key)
		if (hasValue(value)) payload[key] = value.trim()
	}

	for (const key of CLICK_ID_KEYS) {
		const value = searchParams.get(key)
		if (hasValue(value)) payload[key] = value.trim()
	}

	return payload
}

export function getClientAttribution() {
	if (typeof window === 'undefined') return {}

	const fromUrl = pickAttributionFromParams(new URLSearchParams(window.location.search))
	let stored = {}

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		if (raw) stored = JSON.parse(raw) || {}
	} catch {}

	const merged = { ...stored, ...fromUrl }

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
	for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
		const value = source[key]
		if (hasValue(value)) safe[key] = value.trim()
	}
	return safe
}
