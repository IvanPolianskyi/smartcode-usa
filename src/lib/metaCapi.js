/**
 * Meta Conversions API (CAPI) — серверний хелпер.
 *
 * Відправляє події напряму в Meta Graph API, минаючи браузер.
 * Використовує той самий event_id що і fbq() на клієнті — Facebook
 * автоматично дедуплікує пару (browser pixel + CAPI) в одну подію.
 *
 * Документація: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import crypto from 'crypto'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const CAPI_VERSION = 'v22.0'
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1016369117841084'
const CAPI_TOKEN = process.env.META_CAPI_TOKEN
const CAPI_TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE || ''

const CAPI_URL = PIXEL_ID
	? `https://graph.facebook.com/${CAPI_VERSION}/${PIXEL_ID}/events`
	: null

/**
 * SHA-256 хеш для PII-даних (телефон, email).
 * Meta вимагає нормалізацію перед хешуванням.
 */
function sha256(value) {
	if (!value) return undefined
	return crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex')
}

/**
 * Нормалізація телефону → E.164 без '+' для хешування.
 * '+380671234567' → '380671234567'
 */
function normalizePhone(phone) {
	if (!phone) return undefined
	return phone.replace(/\D/g, '')
}

function normalizeText(value) {
	if (!value) return undefined
	return String(value).trim().toLowerCase().replace(/\s+/g, ' ')
}

function splitNameParts(name) {
	const n = normalizeText(name)
	if (!n) return { firstName: undefined, lastName: undefined }
	const parts = n.split(' ').filter(Boolean)
	return {
		firstName: parts[0] || undefined,
		lastName: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
	}
}

function detectCountryByPhone(phone) {
	try {
		const parsed = parsePhoneNumberFromString(String(phone || ''))
		return parsed?.country ? String(parsed.country).toLowerCase() : undefined
	} catch {
		return undefined
	}
}

function normalizeFbc(fbc, fbclid) {
	if (fbc) return fbc
	if (!fbclid) return undefined
	// Meta format: fb.1.<creation_time_millis>.<fbclid>
	return `fb.1.${Date.now()}.${String(fbclid).trim()}`
}

/**
 * Витягнути IP клієнта з Next.js Request headers.
 * Vercel встановлює x-forwarded-for.
 */
export function getClientIp(request) {
	const forwarded = request.headers.get('x-forwarded-for')
	if (forwarded) return forwarded.split(',')[0].trim()
	return request.headers.get('x-real-ip') || undefined
}

/**
 * Витягнути User-Agent з Request headers.
 */
export function getClientUserAgent(request) {
	return request.headers.get('user-agent') || undefined
}

/**
 * Витягнути fbc та fbp cookies з Request.
 * fbc  — Facebook Click ID (з URL ?fbclid=...)
 * fbp  — Facebook Browser ID (встановлюється пікселем)
 */
export function getFbCookies(request) {
	const cookieHeader = request.headers.get('cookie') || ''
	const cookies = Object.fromEntries(
		cookieHeader.split(';').map((c) => {
			const [k, ...v] = c.trim().split('=')
			return [k, v.join('=')]
		})
	)
	return {
		fbc: cookies['_fbc'] || undefined,
		fbp: cookies['_fbp'] || undefined,
	}
}

/**
 * Основна функція відправки події в CAPI.
 *
 * @param {object} options
 * @param {string}  options.eventName     - Назва події: 'Lead', 'PageView', etc.
 * @param {string}  options.eventId       - UUID для дедуплікації (той самий що fbq eventID)
 * @param {string}  options.sourceUrl     - URL сторінки де відбулась подія
 * @param {string}  [options.phone]       - Телефон користувача (+380...) — буде хешований
 * @param {string}  [options.clientIp]    - IP клієнта
 * @param {string}  [options.userAgent]   - User-Agent клієнта
 * @param {string}  [options.fbc]         - _fbc cookie
 * @param {string}  [options.fbp]         - _fbp cookie
 * @param {object}  [options.customData]  - Додаткові параметри (content_name, content_ids, etc.)
 */
export async function sendCapiEvent({
	eventName,
	eventId,
	sourceUrl,
	phone,
	externalId,
	email,
	firstName,
	lastName,
	country,
	clientIp,
	userAgent,
	fbc,
	fbp,
	fbclid,
	customData = {},
}) {
	if (!CAPI_TOKEN || !CAPI_URL) {
		console.warn('[CAPI] META_CAPI_TOKEN або NEXT_PUBLIC_META_PIXEL_ID не встановлено — подія не відправлена')
		return false
	}

	const hashedPhone = sha256(normalizePhone(phone))
	const hashedExternalId = externalId ? sha256(externalId) : undefined
	const hashedEmail = email ? sha256(normalizeText(email)) : undefined
	const hashedFirstName = firstName ? sha256(normalizeText(firstName)) : undefined
	const hashedLastName = lastName ? sha256(normalizeText(lastName)) : undefined
	const normalizedCountry = country ? normalizeText(country) : detectCountryByPhone(phone)
	const hashedCountry = normalizedCountry ? sha256(normalizedCountry) : undefined
	const normalizedFbc = normalizeFbc(fbc, fbclid)

	const userData = {
		...(hashedPhone && { ph: [hashedPhone] }),
		...(hashedExternalId && { external_id: [hashedExternalId] }),
		...(hashedEmail && { em: [hashedEmail] }),
		...(hashedFirstName && { fn: [hashedFirstName] }),
		...(hashedLastName && { ln: [hashedLastName] }),
		...(hashedCountry && { country: [hashedCountry] }),
		...(clientIp && { client_ip_address: clientIp }),
		...(userAgent && { client_user_agent: userAgent }),
		...(normalizedFbc && { fbc: normalizedFbc }),
		...(fbp && { fbp }),
	}

	const eventPayload = {
		event_name: eventName,
		event_time: Math.floor(Date.now() / 1000),
		event_id: eventId,
		event_source_url: sourceUrl,
		action_source: 'website',
		user_data: userData,
		...(Object.keys(customData).length > 0 && { custom_data: customData }),
	}

	const body = {
		data: [eventPayload],
		...(CAPI_TEST_EVENT_CODE && { test_event_code: CAPI_TEST_EVENT_CODE }),
	}

	try {
		const res = await fetch(`${CAPI_URL}?access_token=${CAPI_TOKEN}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})

		if (!res.ok) {
			const text = await res.text().catch(() => '')
			console.error('[CAPI] Помилка відправки:', res.status, text)
			return false
		}
		return true
	} catch (err) {
		console.error('[CAPI] Network error:', err)
		return false
	}
}

/**
 * Зручний хелпер: відправити Lead після успішної форми запису.
 */
export async function sendCapiLead({
	eventId,
	sourceUrl,
	phone,
	externalId,
	email,
	name,
	clientIp,
	userAgent,
	fbc,
	fbp,
	fbclid,
	contentName,
	contentIds,
}) {
	const { firstName, lastName } = splitNameParts(name)
	return sendCapiEvent({
		eventName: 'Lead',
		eventId,
		sourceUrl,
		phone,
		externalId,
		email,
		firstName,
		lastName,
		clientIp,
		userAgent,
		fbc,
		fbp,
		fbclid,
		customData: {
			...(contentName && { content_name: contentName }),
			...(Array.isArray(contentIds) && contentIds.length > 0 && { content_ids: contentIds }),
			content_category: 'lead_generation',
		},
	})
}

/**
 * Зручний хелпер: відправити Purchase з CRM.
 */
export async function sendCapiPurchase({
	eventId,
	sourceUrl,
	phone,
	externalId,
	clientIp,
	userAgent,
	fbc,
	fbp,
	value,
	currency = 'UAH',
	contentName,
	contentIds,
}) {
	return sendCapiEvent({
		eventName: 'Purchase',
		eventId,
		sourceUrl,
		phone,
		externalId,
		clientIp,
		userAgent,
		fbc,
		fbp,
		customData: {
			value: typeof value === 'number' ? value : Number(value || 0),
			currency,
			...(contentName && { content_name: contentName }),
			...(Array.isArray(contentIds) && contentIds.length > 0 && { content_ids: contentIds }),
			content_type: 'product',
		},
	})
}
