import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { requireAdmin } from '@/lib/requireAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Sign-ups for one free live build (`?event=<id>`), or the waitlist
 * (`?event=waitlist`) - people who signed up while nothing was scheduled.
 */
export async function GET(request) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const event = new URL(request.url).searchParams.get('event') || 'waitlist'
	if (event !== 'waitlist' && !/^[a-f0-9]{24}$/i.test(event)) {
		return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
	}

	try {
		const col = await getCollection('liveRegistrations')
		const rows = await col
			.find({ eventId: event === 'waitlist' ? null : event })
			.sort({ createdAt: 1 })
			.limit(5000)
			.toArray()
		return NextResponse.json({
			registrations: rows.map((r) => ({
				email: r.email,
				name: r.name || '',
				source: r.source || null,
				createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : null,
			})),
		})
	} catch (error) {
		console.error('[admin] live registrations error:', error)
		return NextResponse.json({ error: 'Could not load sign-ups' }, { status: 500 })
	}
}
