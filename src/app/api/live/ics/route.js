import { ObjectId } from 'mongodb'
import { getLiveLessonsCollection, serializeLiveLesson } from '@/lib/liveLessons'
import { buildIcs } from '@/lib/liveEvents'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Calendar file for one public live build (Apple Calendar, Outlook). */
export async function GET(request) {
	const id = new URL(request.url).searchParams.get('event') || ''
	if (!/^[a-f0-9]{24}$/i.test(id)) return new Response('Not found', { status: 404 })

	const col = await getLiveLessonsCollection()
	const row = await col.findOne({ _id: new ObjectId(id), isPublic: true })
	if (!row) return new Response('Not found', { status: 404 })

	const event = serializeLiveLesson(row)
	const ics = buildIcs(event, { details: `Free SmartCode live build. Join: ${event.joinUrl}` })
	return new Response(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="smartcode-live-build.ics"',
		},
	})
}
