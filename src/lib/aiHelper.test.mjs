import test from 'node:test'
import assert from 'node:assert/strict'
import {
	AI_HELPER_SYSTEM,
	buildMessages,
	buildUserTurn,
	lessonContextBlock,
	dailyLimitFor,
	lessonToText,
	parseHelperRequest,
	utcDayKey,
} from './aiHelper.js'

test('system prompt has no per-request values, so it can be cached', () => {
	assert.ok(!/\d{4}-\d{2}-\d{2}/.test(AI_HELPER_SYSTEM))
	assert.ok(AI_HELPER_SYSTEM.includes('Roblox'))
})

test('request needs a question and a sane lesson id', () => {
	assert.ok(parseHelperRequest({ lessonId: 'lesson-roblox-1-1' }).error)
	assert.ok(parseHelperRequest({ question: 'hi', lessonId: '../etc' }).error)
	assert.ok(parseHelperRequest({ question: 'x'.repeat(3000), lessonId: 'a' }).error)
	const { data } = parseHelperRequest({ question: ' why? ', code: ' print(1) ', lessonId: 'lesson-roblox-1-1' })
	assert.deepEqual(data, { question: 'why?', code: 'print(1)', lessonId: 'lesson-roblox-1-1', history: [] })
})

test('history keeps only well-formed recent turns', () => {
	const history = Array.from({ length: 40 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', text: `m${i}` }))
	history.push({ role: 'system', text: 'nope' }, { role: 'user', text: '   ' })
	const { data } = parseHelperRequest({ question: 'q', lessonId: 'a', history })
	assert.equal(data.history.length, 16)
	assert.ok(data.history.every((m) => m.role !== 'system'))
})

test('messages alternate roles and end with the new user turn', () => {
	const messages = buildMessages({
		history: [
			{ role: 'assistant', text: 'orphan' },
			{ role: 'user', text: 'a' },
			{ role: 'user', text: 'b' },
			{ role: 'assistant', text: 'c' },
		],
		userTurn: 'NEW',
	})
	assert.deepEqual(messages.map((m) => m.role), ['user', 'assistant', 'user'])
	assert.equal(messages[0].content, 'a\n\nb')
	assert.equal(messages[2].content, 'NEW')
})

test('user turn carries code and question; lesson goes in its own block', () => {
	const turn = buildUserTurn({ code: 'print(1)', question: 'why?' })
	assert.ok(turn.includes('<student_code>'))
	assert.ok(turn.endsWith('why?'))
	assert.equal(buildUserTurn({ code: '', question: 'q' }), 'q')
	assert.ok(lessonContextBlock({ lessonTitle: 'House "1"', lessonText: 'Use Union' }).includes(`<lesson title="House '1'">`))
})

test('lesson text flattens nested sections and skips media fields', () => {
	const text = lessonToText({ title: 'T', image: '/x.png', sections: [{ title: 'S', content: 'Body' }] })
	assert.equal(text, 'T\nS\nBody')
})

test('members get a bigger daily limit; day key is UTC', () => {
	assert.ok(dailyLimitFor({ isMember: true }) > dailyLimitFor({ isMember: false }))
	assert.equal(utcDayKey(new Date('2026-11-06T23:30:00-05:00')), '2026-11-07')
})
