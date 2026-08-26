import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { getCollection } from '@/lib/mongodb'
import { getEntitlement } from '@/lib/entitlements'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PAGE_SIZE = 50

/** Student list for the admin panel — search by name/email, entitlement summary per row. */
export async function GET(request) {
	const auth = await requireAdmin()
	if (auth.error) return auth.error

	try {
		const { searchParams } = new URL(request.url)
		const q = String(searchParams.get('q') || '').trim()

		const users = await getCollection('users')
		const filter = q
			? {
					$or: [
						{ email: { $regex: q, $options: 'i' } },
						{ name: { $regex: q, $options: 'i' } },
					],
				}
			: {}

		const rows = await users
			.find(filter, { projection: { name: 1, email: 1, role: 1, createdAt: 1 } })
			.sort({ createdAt: -1 })
			.limit(PAGE_SIZE)
			.toArray()

		const students = await Promise.all(
			rows.map(async (row) => {
				const entitlement = await getEntitlement(row._id).catch(() => null)
				return {
					id: String(row._id),
					name: row.name || '',
					email: row.email || '',
					role: row.role || 'student',
					createdAt: row.createdAt || null,
					active: entitlement?.active || false,
					courseIds: entitlement?.courseIds || [],
					trialing: entitlement?.trialing || false,
				}
			})
		)

		return NextResponse.json({ students, truncated: rows.length === PAGE_SIZE })
	} catch (error) {
		console.error('[admin] students list error:', error)
		return NextResponse.json({ error: 'Could not load students' }, { status: 500 })
	}
}
