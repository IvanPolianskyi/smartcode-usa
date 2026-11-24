import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { parseRegistration } from '@/lib/liveEvents'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PRODUCTS = new Set(['shorts-kit'])

/** Waitlist for products that are not on sale yet (no payment taken). */
export async function POST(request) {
	const body = await request.json().catch(() => ({}))
	const product = String(body?.product || '')
	if (!PRODUCTS.has(product)) return NextResponse.json({ error: 'Unknown product.' }, { status: 400 })
	const parsed = parseRegistration(body)
	if (parsed.error === 'spam') return NextResponse.json({ ok: true })
	if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })

	try {
		const col = await getCollection('waitlist')
		await col.createIndex({ product: 1, email: 1 }, { unique: true }).catch(() => {})
		const now = new Date()
		await col.updateOne(
			{ product, email: parsed.data.email },
			{
				$setOnInsert: { product, email: parsed.data.email, createdAt: now },
				$set: { updatedAt: now, ...(parsed.data.source ? { source: parsed.data.source } : {}) },
			},
			{ upsert: true }
		)
		return NextResponse.json({ ok: true })
	} catch (error) {
		console.error('[waitlist] error:', error)
		return NextResponse.json({ error: 'Could not save. Try again.' }, { status: 500 })
	}
}
