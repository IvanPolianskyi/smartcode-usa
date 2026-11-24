/**
 * Free public live builds ("webinars") and their sign-ups.
 *
 * An event is a regular `liveLessons` row with `isPublic: true` - the admin
 * already schedules Premium live lessons there, so the owner creates the free
 * weekly build in the same form. Sign-ups live in `liveRegistrations`, one row
 * per (event, email). A sign-up with `eventId: null` is a waitlist entry for
 * "the next one" when nothing is scheduled yet.
 *
 * Everything in this file is pure so it can be unit-tested; the Mongo and
 * email side lives in the API route.
 */

export const DISCORD_INVITE_URL =
	process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/rSGUxWyEPt'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const SOURCE_RE = /^[a-z0-9_-]{1,32}$/i

/**
 * Next public event that has not ended yet, earliest first.
 * @param {Array<{ isPublic?: boolean, startsAt?: string|Date, endsAt?: string|Date }>} events
 * @param {Date} [now]
 */
export function pickNextPublicEvent(events, now = new Date()) {
	const t = now.getTime()
	return (
		(events || [])
			.filter((e) => e && e.isPublic && e.startsAt && e.endsAt)
			.filter((e) => new Date(e.endsAt).getTime() > t)
			.sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))[0] || null
	)
}

/**
 * Validate a sign-up form. Returns { error } or { data }.
 * `website` is a honeypot field - real people never see or fill it.
 */
export function parseRegistration(body) {
	if (body?.website) return { error: 'spam' }

	const email = String(body?.email || '').trim().toLowerCase()
	if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
		return { error: 'Enter a valid email address.' }
	}

	const name = String(body?.name || '').trim().replace(/\s+/g, ' ').slice(0, 60)

	const rawSource = String(body?.source || '').trim()
	const source = SOURCE_RE.test(rawSource) ? rawSource.toLowerCase() : null

	const rawEvent = String(body?.eventId || '').trim()
	const eventId = /^[a-f0-9]{24}$/i.test(rawEvent) ? rawEvent : null

	return { data: { email, name, source, eventId } }
}

function icsDate(date) {
	return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

/** "Add to Google Calendar" link - it brings its own reminder. */
export function googleCalendarUrl(event, details = '') {
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title || 'SmartCode live build',
		dates: `${icsDate(event.startsAt)}/${icsDate(event.endsAt)}`,
		details,
		location: event.joinUrl || '',
	})
	return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function icsEscape(value) {
	return String(value || '')
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/[,;]/g, (m) => `\\${m}`)
}

/** Calendar file for Apple Calendar / Outlook, with a 1-hour reminder. */
export function buildIcs(event, { details = '', now = new Date() } = {}) {
	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//SmartCode//Live build//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${event.id || icsDate(event.startsAt)}@smartcode.academy`,
		`DTSTAMP:${icsDate(now)}`,
		`DTSTART:${icsDate(event.startsAt)}`,
		`DTEND:${icsDate(event.endsAt)}`,
		`SUMMARY:${icsEscape(event.title || 'SmartCode live build')}`,
		`DESCRIPTION:${icsEscape(details)}`,
		`LOCATION:${icsEscape(event.joinUrl || '')}`,
		'BEGIN:VALARM',
		'TRIGGER:-PT1H',
		'ACTION:DISPLAY',
		'DESCRIPTION:SmartCode live build starts in 1 hour',
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR',
		'',
	].join('\r\n')
}

/** Public view of an event - the join link is only sent after sign-up. */
export function publicEventView(event) {
	if (!event) return null
	return {
		id: event.id,
		title: event.title,
		description: event.description || '',
		startsAt: event.startsAt,
		endsAt: event.endsAt,
	}
}
