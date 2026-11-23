import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { hasActiveSubscription } from '@/lib/entitlements'
import { ObjectId } from 'mongodb'
import { userHasAnyKit } from '@/lib/kits'
import { getLessonContent } from '@/lib/lessonContentLoader'
import { ROBLOX_COURSE_ID } from '@/lib/courseIds'
import {
	AI_HELPER_MODEL,
	AI_HELPER_SYSTEM,
	buildMessages,
	buildUserTurn,
	dailyLimitFor,
	lessonContextBlock,
	lessonToText,
	parseHelperRequest,
	utcDayKey,
} from '@/lib/aiHelper'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 120

/** Club members and kit owners get the bigger daily allowance. */
async function hasPaidAccess(uid) {
	if (await hasActiveSubscription(uid).catch(() => false)) return true
	const users = await getCollection('users')
	const user = await users.findOne({ _id: new ObjectId(uid) }, { projection: { kits: 1 } }).catch(() => null)
	return userHasAnyKit(user)
}

let client = null
function anthropic() {
	if (!client) client = new Anthropic()
	return client
}

let indexReady = false
async function usageCollection() {
	const col = await getCollection('aiHelperUsage')
	if (!indexReady) {
		await col.createIndex({ userId: 1, day: 1 }, { unique: true }).catch(() => {})
		indexReady = true
	}
	return col
}

/** Take one question from today's allowance. Returns the new count, or null if used up. */
async function takeOne(userId, day, limit) {
	const col = await usageCollection()
	await col.updateOne(
		{ userId, day },
		{ $setOnInsert: { userId, day, count: 0, createdAt: new Date() } },
		{ upsert: true }
	)
	const row = await col.findOneAndUpdate(
		{ userId, day, count: { $lt: limit } },
		{ $inc: { count: 1 }, $set: { updatedAt: new Date() } },
		{ returnDocument: 'after' }
	)
	const doc = row?.value !== undefined ? row.value : row
	return doc ? doc.count : null
}

async function giveBack(userId, day) {
	const col = await usageCollection()
	await col.updateOne({ userId, day, count: { $gt: 0 } }, { $inc: { count: -1 } }).catch(() => {})
}

/** How many questions are left today - for the counter under the chat box. */
export async function GET() {
	const userId = await getCurrentUser()
	if (!userId) return NextResponse.json({ error: 'Log in to use the AI helper.' }, { status: 401 })
	const isMember = await hasPaidAccess(String(userId))
	const limit = dailyLimitFor({ isMember })
	const col = await usageCollection()
	const row = await col.findOne({ userId: String(userId), day: utcDayKey() })
	return NextResponse.json({ isMember, limit, used: row?.count || 0 })
}

export async function POST(request) {
	const userId = await getCurrentUser()
	if (!userId) {
		return NextResponse.json({ error: 'Log in to use the AI helper.' }, { status: 401 })
	}
	if (!process.env.ANTHROPIC_API_KEY) {
		console.error('[ai-helper] ANTHROPIC_API_KEY is not set')
		return NextResponse.json({ error: 'The AI helper is not switched on yet.' }, { status: 503 })
	}

	const body = await request.json().catch(() => ({}))
	const parsed = parseHelperRequest(body)
	if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })
	const { question, code, lessonId, history } = parsed.data

	const lesson = getLessonContent(ROBLOX_COURSE_ID, lessonId, 'en')
	if (!lesson) return NextResponse.json({ error: 'Unknown lesson.' }, { status: 404 })

	const uid = String(userId)
	const isMember = await hasPaidAccess(uid)
	const limit = dailyLimitFor({ isMember })
	const day = utcDayKey()
	const used = await takeOne(uid, day, limit)
	if (used === null) {
		return NextResponse.json(
			{
				error: isMember
					? `You have used all ${limit} questions for today. They reset at midnight UTC.`
					: `You have used your ${limit} free questions for today.`,
				limitReached: true,
				isMember,
				limit,
			},
			{ status: 429 }
		)
	}

	const userTurn = buildUserTurn({ code, question })
	const lessonBlock = lessonContextBlock({ lessonTitle: lesson.title, lessonText: lessonToText(lesson) })

	try {
		const response = await anthropic().beta.messages.create({
			model: AI_HELPER_MODEL,
			max_tokens: 4000,
			betas: ['server-side-fallback-2026-07-01'],
			fallbacks: 'default',
			output_config: { effort: 'low' },
			// Two cached blocks: the frozen instructions, then this lesson's text.
			system: [
				{ type: 'text', text: AI_HELPER_SYSTEM, cache_control: { type: 'ephemeral' } },
				{ type: 'text', text: lessonBlock, cache_control: { type: 'ephemeral' } },
			],
			messages: buildMessages({ history, userTurn }),
		})

		if (response.stop_reason === 'refusal') {
			await giveBack(uid, day)
			return NextResponse.json({
				answer: "I can't help with that one. Ask me about your Roblox game, your Luau code, or this lesson.",
				used: used - 1,
				limit,
				isMember,
			})
		}

		const answer = response.content
			.filter((block) => block.type === 'text')
			.map((block) => block.text)
			.join('\n')
			.trim()

		return NextResponse.json({
			answer: answer || 'I could not come up with an answer - try asking in a different way.',
			truncated: response.stop_reason === 'max_tokens',
			used,
			limit,
			isMember,
		})
	} catch (error) {
		await giveBack(uid, day)
		if (error instanceof Anthropic.RateLimitError) {
			return NextResponse.json({ error: 'The AI helper is busy right now. Try again in a minute.' }, { status: 503 })
		}
		if (error instanceof Anthropic.APIError) {
			console.error('[ai-helper] API error', error.status, error.message)
		} else {
			console.error('[ai-helper] error', error)
		}
		return NextResponse.json({ error: 'The AI helper could not answer. Try again.' }, { status: 502 })
	}
}
