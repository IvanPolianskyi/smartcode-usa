import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { getLessonContent } from '@/lib/lessonContentLoader'
import { ROBLOX_COURSE_ID } from '@/lib/courseIds'
import { normalizeSiteUrl } from '@/lib/legalConfig'
import { sendLessonLinkEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

/**
 * Email the signed-in student a link to this lesson, to open on a computer.
 * Most visitors arrive from Instagram on a phone, where Roblox Studio does
 * not run - without this they sign up and never come back.
 */
export async function POST(request) {
	const userId = await getCurrentUser()
	if (!userId) return NextResponse.json({ error: 'Log in first.' }, { status: 401 })

	const body = await request.json().catch(() => ({}))
	const lessonId = String(body?.lessonId || '').trim()
	if (!/^[a-z0-9-]{1,80}$/i.test(lessonId)) {
		return NextResponse.json({ error: 'Unknown lesson.' }, { status: 400 })
	}
	const lesson = getLessonContent(ROBLOX_COURSE_ID, lessonId, 'en')
	if (!lesson) return NextResponse.json({ error: 'Unknown lesson.' }, { status: 404 })

	const users = await getCollection('users')
	const user = await users.findOne(
		{ _id: new ObjectId(String(userId)) },
		{ projection: { email: 1, name: 1, lessonLinkSentAt: 1 } }
	)
	if (!user?.email) return NextResponse.json({ error: 'No email on your account.' }, { status: 400 })

	// One email a minute is plenty - stops a double-tap from sending two.
	const last = user.lessonLinkSentAt ? new Date(user.lessonLinkSentAt).getTime() : 0
	if (Date.now() - last < 60_000) return NextResponse.json({ ok: true, email: user.email })

	const sent = await sendLessonLinkEmail({
		to: user.email,
		name: String(user.name || '').split(' ')[0],
		lessonTitle: lesson.title,
		lessonUrl: `${SITE_URL}/courses/${ROBLOX_COURSE_ID}/lessons/${lessonId}`,
	})
	if (!sent.ok) {
		console.error('[lesson-link] email failed:', sent.error)
		return NextResponse.json({ error: 'Could not send the email. Try again.' }, { status: 502 })
	}
	await users.updateOne({ _id: user._id }, { $set: { lessonLinkSentAt: new Date() } })
	return NextResponse.json({ ok: true, email: user.email })
}
