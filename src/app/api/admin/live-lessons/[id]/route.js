import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import {
	getLiveLessonsCollection,
	parseLiveLessonBody,
	serializeLiveLesson,
} from '@/lib/liveLessons'
import { requireAdmin } from '@/lib/requireAdmin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function parseId(id) {
	if (!id || !ObjectId.isValid(id)) return null
	return new ObjectId(id)
}

/** Update a live lesson. */
export async function PATCH(request, { params }) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const { id: rawId } = await params
	const id = parseId(rawId)
	if (!id) {
		return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
	}

	try {
		const col = await getLiveLessonsCollection()
		const existing = await col.findOne({ _id: id })
		if (!existing) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}

		const body = await request.json().catch(() => ({}))
		const parsed = parseLiveLessonBody(body, { partial: true })
		if (parsed.error) {
			return NextResponse.json({ error: parsed.error }, { status: 400 })
		}

		const next = { ...existing, ...parsed.data }
		const startsAt = new Date(next.startsAt)
		const endsAt = new Date(next.endsAt)
		if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime()) || endsAt <= startsAt) {
			return NextResponse.json({ error: 'endsAt must be after startsAt' }, { status: 400 })
		}

		const update = {
			...parsed.data,
			updatedAt: new Date(),
		}

		await col.updateOne({ _id: id }, { $set: update })
		const saved = await col.findOne({ _id: id })
		return NextResponse.json({ lesson: serializeLiveLesson(saved) })
	} catch (error) {
		console.error('[admin] live-lessons update error:', error)
		return NextResponse.json({ error: 'Could not update live lesson' }, { status: 500 })
	}
}

/** Delete a live lesson. */
export async function DELETE(_request, { params }) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	const { id: rawId } = await params
	const id = parseId(rawId)
	if (!id) {
		return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
	}

	try {
		const col = await getLiveLessonsCollection()
		const result = await col.deleteOne({ _id: id })
		if (!result.deletedCount) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 })
		}
		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('[admin] live-lessons delete error:', error)
		return NextResponse.json({ error: 'Could not delete live lesson' }, { status: 500 })
	}
}
