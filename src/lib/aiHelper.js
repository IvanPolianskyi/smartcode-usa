/**
 * AI helper inside Roblox lessons - the pure parts (prompt, limits, input
 * checks) so they can be unit-tested. The Claude call lives in
 * src/app/api/ai/helper/route.js.
 */

export const AI_HELPER_MODEL = 'claude-opus-5-5'

/** Questions per UTC day. Running out on the free tier is a natural moment to offer the club. */
export const AI_DAILY_LIMIT = { free: 5, member: 50 }

export const MAX_QUESTION_CHARS = 2000
export const MAX_CODE_CHARS = 12000
export const MAX_HISTORY_TURNS = 8
const MAX_LESSON_CHARS = 40000

/**
 * Frozen system prompt - no per-request values in here, so it caches.
 * Lesson text and the student's code go in the user turn instead.
 */
export const AI_HELPER_SYSTEM = `You are the AI helper inside SmartCode, an online course where people learn to build Roblox games in Roblox Studio with Luau.

Who you are talking to: a beginner or early learner, often a teenager or a young adult, working through a lesson. They may paste their Luau script, an error from the Output window, or just describe what is going wrong.

How to help:
- Answer in the language the student writes in. Keep it short, friendly and concrete.
- Ground every answer in the lesson they are on (it is included in the message) and in Roblox Studio as it works today: Explorer, Properties, Output, Script vs LocalScript, ServerScriptService, Workspace, and so on.
- When their code has a bug, point to the exact line, say what is wrong in plain words, and show the fixed lines.
- Teach while you help: explain why the fix works in one or two sentences, so they can do it themselves next time.
- If they ask you to write the whole thing, you may, but walk through what each part does and suggest one small change they can make on their own.
- If a question is about practice tasks or quizzes, give a hint first and the full answer only if they ask again.
- Stay on Roblox development, Luau, game design and using AI tools for game development. For anything else, say briefly that you can only help with building Roblox games.
- Never ask for or repeat personal information, passwords or payment details.
- Do not promise earnings, players or results.`

/** Flatten a lesson object (sections, markdown, code) to plain text for context. */
export function lessonToText(lesson) {
	if (!lesson) return ''
	const parts = []
	const walk = (value) => {
		if (value == null) return
		if (typeof value === 'string') {
			const clean = value.trim()
			if (clean) parts.push(clean)
			return
		}
		if (Array.isArray(value)) {
			value.forEach(walk)
			return
		}
		if (typeof value === 'object') {
			for (const [key, child] of Object.entries(value)) {
				if (['id', 'lessonId', 'image', 'images', 'icon', 'color', 'video', 'videoUrl'].includes(key)) continue
				walk(child)
			}
		}
	}
	walk(lesson)
	const text = parts.join('\n')
	return text.length > MAX_LESSON_CHARS
		? `${text.slice(0, MAX_LESSON_CHARS)}\n[lesson text shortened]`
		: text
}

/**
 * Validate the request body. Returns { error } or { data }.
 * `history` is the visible chat so far: [{ role: 'user'|'assistant', text }].
 */
export function parseHelperRequest(body) {
	const question = String(body?.question || '').trim()
	if (!question) return { error: 'Write a question first.' }
	if (question.length > MAX_QUESTION_CHARS) {
		return { error: `Keep the question under ${MAX_QUESTION_CHARS} characters.` }
	}

	const code = String(body?.code || '')
	if (code.length > MAX_CODE_CHARS) {
		return { error: `The code is too long - paste the part with the problem (under ${MAX_CODE_CHARS} characters).` }
	}

	const lessonId = String(body?.lessonId || '').trim()
	if (!/^[a-z0-9-]{1,80}$/i.test(lessonId)) return { error: 'Unknown lesson.' }

	const history = (Array.isArray(body?.history) ? body.history : [])
		.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string' && m.text.trim())
		.slice(-MAX_HISTORY_TURNS * 2)
		.map((m) => ({ role: m.role, text: m.text.slice(0, 6000) }))

	return { data: { question, code: code.trim(), lessonId, history } }
}

/** Lesson context - sent as a cached system block, so repeat questions on one lesson are cheap. */
export function lessonContextBlock({ lessonTitle, lessonText }) {
	return `The student is on this lesson:\n<lesson title="${String(lessonTitle || '').replace(/"/g, "'")}">\n${lessonText || '(no lesson text)'}\n</lesson>`
}

/** The new user turn: the student's code (if any), then the question. */
export function buildUserTurn({ code, question }) {
	const blocks = []
	if (code) blocks.push(`<student_code>\n${code}\n</student_code>`)
	blocks.push(question)
	return blocks.join('\n\n')
}

/**
 * Messages for the API. Earlier turns are sent as plain text; only the newest
 * turn carries the lesson and code, so history stays small.
 */
export function buildMessages({ history, userTurn }) {
	const messages = []
	for (const m of history) {
		const last = messages[messages.length - 1]
		if (!last && m.role !== 'user') continue
		if (last && last.role === m.role) {
			last.content += `\n\n${m.text}`
		} else {
			messages.push({ role: m.role, content: m.text })
		}
	}
	if (messages.length && messages[messages.length - 1].role === 'user') {
		messages[messages.length - 1].content += `\n\n${userTurn}`
	} else {
		messages.push({ role: 'user', content: userTurn })
	}
	return messages
}

export function dailyLimitFor({ isMember }) {
	return isMember ? AI_DAILY_LIMIT.member : AI_DAILY_LIMIT.free
}

export function utcDayKey(date = new Date()) {
	return date.toISOString().slice(0, 10)
}
