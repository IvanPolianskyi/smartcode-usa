import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { KITS, userHasKit } from '@/lib/kits'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Literal paths so the build bundles each file with this function.
 * Kit files live outside /public, so only owners can download them.
 */
const FILES = {
	'roblox-ai-games': () => readFile(path.join(process.cwd(), 'content', 'kits', 'roblox-ai-game-kit.pdf')),
}

export async function GET(request) {
	const kitId = new URL(request.url).searchParams.get('kit') || ''
	const kit = KITS[kitId]
	if (!kit) return new Response('Not found', { status: 404 })

	const userId = await getCurrentUser()
	if (!userId) return Response.redirect(new URL('/kit/access', request.url), 302)

	const users = await getCollection('users')
	const user = await users.findOne({ _id: new ObjectId(String(userId)) }, { projection: { kits: 1, role: 1 } })
	if (!userHasKit(user, kit.id) && user?.role !== 'admin') {
		return new Response('This kit is not on your account.', { status: 403 })
	}

	try {
		const load = FILES[kit.id]
		if (!load) return new Response('Not found', { status: 404 })
		const file = await load()
		return new Response(file, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${kit.downloadName}"`,
				'Cache-Control': 'private, no-store',
			},
		})
	} catch (error) {
		console.error('[kit] file missing:', kit.file, error?.message)
		return new Response('The file is being updated - try again in a few minutes.', { status: 503 })
	}
}
