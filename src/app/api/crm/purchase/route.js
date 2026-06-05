import { NextResponse } from 'next/server'
import { sendCapiPurchase } from '@/lib/metaCapi'
import { sanitizeAttribution } from '@/lib/attribution'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'

function normalizeExternalId(value) {
	if (!value) return undefined
	return String(value).replace(/^@/, '').trim().toLowerCase() || undefined
}

export async function POST(request) {
	try {
		const authError = assertCrmInternalRequest(request)
		if (authError) return authError

		const body = await request.json().catch(() => ({}))
		const {
			eventId,
			leadId,
			phone,
			telegram,
			externalId,
			value,
			currency,
			sourceUrl,
			contentName,
			contentIds,
			fbc,
			fbp,
			clientIp,
			userAgent,
			attribution,
		} = body || {}

		if (!eventId || !leadId) {
			return NextResponse.json(
				{ ok: false, error: 'Required fields: eventId, leadId' },
				{ status: 400 }
			)
		}

		const normalizedExternalId = normalizeExternalId(externalId || telegram)
		const cleanAttribution = sanitizeAttribution(attribution)
		const purchaseValue = typeof value === 'number' ? value : Number(value || 0)

		await sendCapiPurchase({
			eventId,
			sourceUrl: sourceUrl || 'https://smartcode-academy.com/crm/purchase',
			phone: phone || undefined,
			externalId: normalizedExternalId,
			clientIp: clientIp || undefined,
			userAgent: userAgent || undefined,
			fbc: fbc || cleanAttribution.fbclid || undefined,
			fbp: fbp || undefined,
			value: Number.isFinite(purchaseValue) ? purchaseValue : 0,
			currency: currency || 'UAH',
			contentName: contentName || 'first_lesson_purchase',
			contentIds: Array.isArray(contentIds) && contentIds.length ? contentIds : [`lead_${leadId}`],
		})

		return NextResponse.json({ ok: true })
	} catch (error) {
		return NextResponse.json(
			{ ok: false, error: 'Unexpected server error', detail: String(error?.message || error) },
			{ status: 500 }
		)
	}
}
