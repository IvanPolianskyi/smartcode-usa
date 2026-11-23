import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCollection } from '@/lib/mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getLiveLessonsCollection, serializeLiveLesson } from '@/lib/liveLessons'
import {
	DISCORD_INVITE_URL,
	googleCalendarUrl,
	parseRegistration,
	pickNextPublicEvent,
} from '@/lib/liveEvents'
import { sendLiveRegistrationEmail } from '@/lib/email'
import { normalizeSiteUrl } from '@/lib/legalConfig'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

let indexReady = false
async function registrations() {
	const col = await getCollection('liveRegistrations')
	if (!indexReady) {
		await col.createIndex({ eventId: 1, email: 1 }, { unique: true }).catch(() => {})
		await col.createIndex({ createdAt: -1 }).catch(() => {})
		indexReady = true
	}
	return col
}

/**
 * Sign up for the free live build. Saves the email, then emails the join link
 * and calendar links. Signing up twice for the same event is not an error -
 * the confirmation is simply sent again.
 */
export async function POST(request) {
	const body = await request.json().catch(() => ({}))
	const parsed = parseRegistration(body)
	if (parsed.error === 'spam') return NextResponse.json({ ok: true })
	if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })

	const { email, name, source } = parsed.data

	try {
		const lessons = await getLiveLessonsCollection()
		let event = null
		if (parsed.data.eventId) {
			const row = await lessons.findOne({ _id: new ObjectId(parsed.data.eventId), isPublic: true })
			const candidate = row ? serializeLiveLesson(row) : null
			if (candidate && new Date(candidate.endsAt) > new Date()) event = candidate
		}
		if (!event) {
			const rows = await lessons
				.find({ isPublic: true, endsAt: { $gt: new Date() } })
				.sort({ startsAt: 1 })
				.limit(5)
				.toArray()
			event = pickNextPublicEvent(rows.map(serializeLiveLesson))
		}

		const userId = await getCurrentUser().catch(() => null)
		const now = new Date()
		const col = await registrations()
		await col.updateOne(
			{ eventId: event ? event.id : null, email },
			{
				$setOnInsert: { createdAt: now, eventId: event ? event.id : null, email },
				$set: {
					name,
					updatedAt: now,
					...(source ? { source } : {}),
					...(userId ? { userId: String(userId) } : {}),
				},
			},
			{ upsert: true }
		)

		const details = `Free SmartCode live build. Join link: ${event?.joinUrl || ''}`
		const calendarUrl = event ? googleCalendarUrl(event, details) : ''
		const icsUrl = event ? `${SITE_URL}/api/live/ics?event=${event.id}` : ''

		const sent = await sendLiveRegistrationEmail({
			to: email,
			name,
			event,
			joinUrl: event?.joinUrl || '',
			calendarUrl,
			icsUrl,
			discordUrl: DISCORD_INVITE_URL,
		})
		if (!sent.ok) console.error('[live] confirmation email failed:', sent.error)

		return NextResponse.json({
			ok: true,
			waitlist: !event,
			event: event
				? {
						id: event.id,
						title: event.title,
						startsAt: event.startsAt,
						endsAt: event.endsAt,
						joinUrl: event.joinUrl,
						calendarUrl,
						icsUrl,
					}
				: null,
			discordUrl: DISCORD_INVITE_URL,
			emailSent: Boolean(sent.ok),
		})
	} catch (error) {
		console.error('[live] register error:', error)
		return NextResponse.json({ error: 'Could not save your sign-up. Try again in a minute.' }, { status: 500 })
	}
}
