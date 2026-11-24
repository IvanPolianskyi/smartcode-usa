import { NextResponse } from 'next/server'
import { getLiveLessonsCollection, serializeLiveLesson } from '@/lib/liveLessons'
import { pickNextPublicEvent, publicEventView } from '@/lib/liveEvents'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Next free public live build (no join link - that is emailed on sign-up). */
export async function GET() {
	try {
		const col = await getLiveLessonsCollection()
		const rows = await col
			.find({ isPublic: true, endsAt: { $gt: new Date() } })
			.sort({ startsAt: 1 })
			.limit(5)
			.toArray()
		const next = pickNextPublicEvent(rows.map(serializeLiveLesson))
		return NextResponse.json({ event: publicEventView(next) })
	} catch (error) {
		console.error('[live] next event error:', error)
		return NextResponse.json({ event: null })
	}
}
