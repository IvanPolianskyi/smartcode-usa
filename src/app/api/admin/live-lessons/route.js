import { NextResponse } from 'next/server'
import {
	getLiveLessonsCollection,
	parseLiveLessonBody,
	partitionLiveLessons,
	serializeLiveLesson,
} from '@/lib/liveLessons'
import { requireAdmin } from '@/lib/requireAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** List all live lessons for admin (upcoming + past). */
export async function GET() {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	try {
		const col = await getLiveLessonsCollection()
		const rows = await col.find({}).sort({ startsAt: -1 }).limit(200).toArray()
		const lessons = rows.map(serializeLiveLesson)
		const { upcoming, past } = partitionLiveLessons(lessons)
		return NextResponse.json({ upcoming, past, lessons })
	} catch (error) {
		console.error('[admin] live-lessons list error:', error)
		return NextResponse.json({ error: 'Could not load live lessons' }, { status: 500 })
	}
}

/** Create a live lesson. */
export async function POST(request) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	try {
		const body = await request.json().catch(() => ({}))
		const parsed = parseLiveLessonBody(body)
		if (parsed.error) {
			return NextResponse.json({ error: parsed.error }, { status: 400 })
		}

		const now = new Date()
		const doc = {
			...parsed.data,
			createdAt: now,
			updatedAt: now,
		}

		const col = await getLiveLessonsCollection()
		const result = await col.insertOne(doc)
		const saved = await col.findOne({ _id: result.insertedId })
		return NextResponse.json({ lesson: serializeLiveLesson(saved) }, { status: 201 })
	} catch (error) {
		console.error('[admin] live-lessons create error:', error)
		return NextResponse.json({ error: 'Could not create live lesson' }, { status: 500 })
	}
}
