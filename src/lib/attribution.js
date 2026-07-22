const UTM_KEYS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_term',
	'utm_content',
]

const CLICK_ID_KEYS = ['fbclid', 'gclid', 'ttclid']
const ATTRIBUTION_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]
export const ATTRIBUTION_STORAGE_KEY = 'sc_attribution_v1'
/** Вікно last-touch: відкладені візити після кліку з реклами (як типовий click-window Meta). */
export const ATTRIBUTION_TTL_MS = 28 * 24 * 60 * 60 * 1000

const PAID_MEDIUMS = ['cpc', 'ppc', 'paid', 'paid_social', 'cpm', 'display', 'paidsocial']

/** Точний match — короткі коди, щоб `tt` не ловив `twitter`. */
const PAID_SOURCE_EXACT = new Set([
	'fb',
	'ig',
	'tt',
	'meta',
	'facebook',
	'instagram',
	'fbads',
	'metaads',
	'google',
	'googleads',
	'adwords',
	'tiktok',
	'bytedance',
])

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

function stripMetaFields(raw) {
	const out = {}
	if (!raw || typeof raw !== 'object') return out
	for (const key of ATTRIBUTION_KEYS) {
		if (hasValue(raw[key])) out[key] = String(raw[key]).trim()
	}
	return out
}

function readStoredAttribution() {
	if (typeof window === 'undefined') return { values: {}, ts: null }
	try {
		const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
		if (!raw) return { values: {}, ts: null }
		const parsed = JSON.parse(raw) || {}
		const ts = typeof parsed._ts === 'number' ? parsed._ts : null
		if (ts != null && Date.now() - ts > ATTRIBUTION_TTL_MS) {
			window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
			return { values: {}, ts: null }
		}
		return { values: stripMetaFields(parsed), ts }
	} catch {
		return { values: {}, ts: null }
	}
}

function writeStoredAttribution(values, ts = Date.now()) {
	if (typeof window === 'undefined') return
	const clean = stripMetaFields(values)
	if (Object.keys(clean).length === 0) return
	try {
		window.localStorage.setItem(
			ATTRIBUTION_STORAGE_KEY,
			JSON.stringify({ ...clean, _ts: ts })
		)
	} catch {}
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

function isPaidMedium(medium) {
	const m = String(medium || '').toLowerCase().trim()
	if (!m) return false
	return PAID_MEDIUMS.some((item) => m === item || m.includes(item))
}

function isPaidSource(source) {
	const s = String(source || '').toLowerCase().trim()
	if (!s) return false
	if (PAID_SOURCE_EXACT.has(s)) return true
	// Довгі назви — лише як ціле слово/префікс, без коротких кодів типу tt/fb/ig.
	return (
		s.includes('facebook') ||
		s.includes('instagram') ||
		s.includes('tiktok') ||
		s.includes('googleads') ||
		s.includes('metaads') ||
		s.includes('fbads')
	)
}

export function getClientAttribution() {
	if (typeof window === 'undefined') return {}

	const fromUrl = pickAttributionFromParams(new URLSearchParams(window.location.search))
	const stored = readStoredAttribution()
	const merged = mergeAttribution(stored.values, fromUrl)

	if (Object.keys(fromUrl).length > 0) {
		// Новий вхід з мітками — оновлюємо last-touch і таймстемп.
		writeStoredAttribution(merged, Date.now())
	} else if (Object.keys(merged).length > 0 && stored.ts != null) {
		// Лише навігація сайтом — зберігаємо попередній last-touch у межах TTL.
		writeStoredAttribution(merged, stored.ts)
	}

	return merged
}

export function sanitizeAttribution(rawAttribution) {
	return stripMetaFields(rawAttribution)
}

/**
 * Повна атрибуція для сервера: клієнт + sourceUrl + cookies Meta.
 * Не використовує _fbp як ознаку реклами — він є у всіх відвідувачів з пікселем.
 *
 * @returns {object & { _from_live_url: boolean, _deferred_visit: boolean }}
 */
export function resolveServerAttribution({
	clientAttribution,
	sourceUrl,
	fbc,
	fbp,
} = {}) {
	const fromClient = sanitizeAttribution(clientAttribution)
	const fromUrl = parseAttributionFromUrl(sourceUrl)
	// sourceUrl виграє при конфлікті — це фактичний URL відправки.
	const merged = mergeAttribution(fromClient, fromUrl)

	const fbclidFromFbc = extractFbclidFromFbc(fbc)
	if (!merged.fbclid && fbclidFromFbc) {
		merged.fbclid = fbclidFromFbc
	}

	const liveHasAdsSignal = Boolean(
		fromUrl.fbclid ||
			fromUrl.gclid ||
			fromUrl.ttclid ||
			isPaidMedium(fromUrl.utm_medium) ||
			(isPaidSource(fromUrl.utm_source) && isPaidMedium(fromUrl.utm_medium))
	)
	const mergedHasAdsSignal = Boolean(
		merged.fbclid ||
			merged.gclid ||
			merged.ttclid ||
			hasValue(fbc) ||
			isPaidMedium(merged.utm_medium)
	)

	return {
		...merged,
		...(hasValue(fbc) ? { fbc: String(fbc).trim() } : {}),
		...(hasValue(fbp) ? { fbp: String(fbp).trim() } : {}),
		_from_live_url: liveHasAdsSignal,
		// Клік був раніше: UTM/fbclid у storage або живий _fbc, а в поточному URL уже немає міток.
		_deferred_visit: mergedHasAdsSignal && !liveHasAdsSignal,
	}
}

/**
 * Бінарна відповідь: Реклама / Органіка/невідомо + підстава (для реклами).
 * Meta-клік і відкладений візит після кліку = Реклама (треба для ретаргету/аналітики).
 * @returns {{ type: 'Реклама' | 'Органіка/невідомо', reason: string, signals: string[], confidence: 'high' | 'medium' | 'none', deferred: boolean }}
 */
export function detectTrafficType(attribution) {
	const medium = String(attribution?.utm_medium || '').toLowerCase()
	const source = String(attribution?.utm_source || '').toLowerCase()
	const signals = []
	let confidence = 'none'
	const deferred = Boolean(attribution?._deferred_visit)

	if (hasValue(attribution?.gclid)) {
		signals.push('gclid (Google Ads)')
		confidence = 'high'
	}
	if (hasValue(attribution?.ttclid)) {
		signals.push('ttclid (TikTok Ads)')
		confidence = 'high'
	}
	if (isPaidMedium(medium)) {
		signals.push(`utm_medium=${attribution.utm_medium}`)
		confidence = 'high'
	}

	const hasMetaClick =
		hasValue(attribution?.fbclid) || hasValue(attribution?.fbc)
	if (hasMetaClick) {
		signals.push(
			hasValue(attribution?.fbclid)
				? 'fbclid (клік з Meta)'
				: '_fbc cookie (клік з Meta раніше)'
		)
		// Для таргетологів Meta-клік = реклама (включно з відкладеним заходом).
		confidence = 'high'
	}

	if (isPaidSource(source) && !signals.some((s) => s.startsWith('utm_source='))) {
		const strongAdsSource = ['fbads', 'metaads', 'googleads', 'adwords', 'tiktok'].includes(
			source
		)
		if (strongAdsSource || isPaidMedium(medium) || hasMetaClick || confidence !== 'none') {
			signals.push(`utm_source=${attribution.utm_source}`)
			confidence = 'high'
		}
	}

	if (signals.length > 0) {
		if (deferred) {
			signals.push('відкладений візит після рекламного кліку')
		}
		return {
			type: 'Реклама',
			reason: signals.join(', '),
			signals,
			confidence,
			deferred,
		}
	}

	return {
		type: 'Органіка/невідомо',
		reason: '',
		signals: [],
		confidence: 'none',
		deferred: false,
	}
}

/**
 * Inline-скрипт у <head>: ловить UTM/fbclid ДО гідрації React,
 * щоб клієнтська навігація не встигла стерти query.
 */
export function getAttributionBootstrapScript() {
	return `(function(){try{var K=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid','gclid','ttclid'];var S='${ATTRIBUTION_STORAGE_KEY}';var p=new URLSearchParams(location.search);var u={};for(var i=0;i<K.length;i++){var v=p.get(K[i]);if(v&&String(v).trim())u[K[i]]=String(v).trim()}if(!Object.keys(u).length)return;var stored={};try{stored=JSON.parse(localStorage.getItem(S)||'{}')||{}}catch(e){}var merged={};for(var k in stored){if(Object.prototype.hasOwnProperty.call(stored,k)&&k!=='_ts')merged[k]=stored[k]}for(var k2 in u){if(Object.prototype.hasOwnProperty.call(u,k2))merged[k2]=u[k2]}merged._ts=Date.now();localStorage.setItem(S,JSON.stringify(merged))}catch(e){}})();`
}
