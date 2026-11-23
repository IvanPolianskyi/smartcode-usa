import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { userHasAnyKit } from '@/lib/kits'
import { emailKitAccessLink } from '@/lib/kitFulfilment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * "Send me my access link again". Always answers the same way, so the form
 * cannot be used to find out who bought a kit.
 */
export async function POST(request) {
	const body = await request.json().catch(() => ({}))
	const email = String(body?.email || '').trim().toLowerCase()
	if (!EMAIL_RE.test(email)) {
		return NextResponse.json({ error: 'Enter the email you used at checkout.' }, { status: 400 })
	}
	try {
		const users = await getCollection('users')
		const user = await users.findOne({ email }, { projection: { email: 1, name: 1, kits: 1, kitLinkSentAt: 1 } })
		const last = user?.kitLinkSentAt ? new Date(user.kitLinkSentAt).getTime() : 0
		if (user && userHasAnyKit(user) && Date.now() - last > 60_000) {
			await emailKitAccessLink(user, user.kits[0])
			await users.updateOne({ _id: user._id }, { $set: { kitLinkSentAt: new Date() } })
		}
	} catch (error) {
		console.error('[kit] resend failed:', error)
	}
	return NextResponse.json({ ok: true })
}
