import { NextResponse } from 'next/server'
import { isBotUserAgent } from '@/lib/funnelSteps'
import { classifyUserAgent, KIT_EVENT_NAMES, recordKitEvent, SERVER_ONLY_EVENTS } from '@/lib/kitEvents'

export const runtime = 'nodejs'

const MAX_BATCH = 20

/**
 * Kit page events from the browser. Accepts one event or a small batch
 * (navigator.sendBeacon sends text/plain). Device, browser and country are
 * decided here from headers, never trusted from the page.
 */
export async function POST(request) {
	try {
		const ua = request.headers.get('user-agent') || ''
		if (isBotUserAgent(ua)) return NextResponse.json({ ok: true, skipped: 'bot' })

		const raw = await request.text()
		if (raw.length > 20_000) return NextResponse.json({ ok: false }, { status: 413 })
		let body
		try {
			body = JSON.parse(raw || '{}')
		} catch {
			return NextResponse.json({ ok: false }, { status: 400 })
		}

		const events = (Array.isArray(body?.events) ? body.events : [body]).slice(0, MAX_BATCH)
		const agent = classifyUserAgent(ua)
		const country = request.headers.get('x-vercel-ip-country') || null
		const host = (request.headers.get('host') || '').split(':')[0]
		const context = {
			// Local runs share the prod database; mark them so reports can skip them.
			test: host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app'),
			src: body?.src || null,
			utm: body?.utm || null,
			ref: body?.ref || null,
			variant: body?.variant || null,
			country,
			...agent,
		}

		let written = 0
		for (const e of events) {
			const name = String(e?.name || '')
			if (!KIT_EVENT_NAMES.has(name) || SERVER_ONLY_EVENTS.has(name)) continue
			const r = await recordKitEvent({ name, kid: body?.kid, sid: body?.sid, props: e?.props, context })
			if (r.ok) written += 1
		}
		return NextResponse.json({ ok: true, written })
	} catch {
		return NextResponse.json({ ok: false }, { status: 500 })
	}
}
