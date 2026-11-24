import test from 'node:test'
import assert from 'node:assert/strict'
import {
	buildIcs,
	googleCalendarUrl,
	parseRegistration,
	pickNextPublicEvent,
	publicEventView,
} from './liveEvents.js'

const now = new Date('2026-11-06T12:00:00Z')

test('next public event skips private, finished and later events', () => {
	const events = [
		{ id: 'private', isPublic: false, startsAt: '2026-11-07T00:00:00Z', endsAt: '2026-11-07T01:00:00Z' },
		{ id: 'past', isPublic: true, startsAt: '2026-11-05T00:00:00Z', endsAt: '2026-11-05T01:00:00Z' },
		{ id: 'later', isPublic: true, startsAt: '2026-11-14T00:00:00Z', endsAt: '2026-11-14T01:00:00Z' },
		{ id: 'next', isPublic: true, startsAt: '2026-11-07T00:00:00Z', endsAt: '2026-11-07T01:00:00Z' },
	]
	assert.equal(pickNextPublicEvent(events, now).id, 'next')
})

test('an event that already started but has not ended is still the next one', () => {
	const events = [{ id: 'live', isPublic: true, startsAt: '2026-11-06T11:30:00Z', endsAt: '2026-11-06T12:30:00Z' }]
	assert.equal(pickNextPublicEvent(events, now).id, 'live')
})

test('no public event means a waitlist sign-up', () => {
	assert.equal(pickNextPublicEvent([], now), null)
})

test('registration needs a real email and normalises it', () => {
	assert.ok(parseRegistration({ email: 'nope' }).error)
	assert.ok(parseRegistration({}).error)
	const { data } = parseRegistration({ email: '  Mike@Example.COM ', name: '  Mike   T ', source: 'Discord' })
	assert.deepEqual(data, { email: 'mike@example.com', name: 'Mike T', source: 'discord', eventId: null })
})

test('registration drops junk source and event ids, and catches the honeypot', () => {
	const { data } = parseRegistration({ email: 'a@b.co', source: 'bad source!', eventId: 'x' })
	assert.equal(data.source, null)
	assert.equal(data.eventId, null)
	assert.equal(parseRegistration({ email: 'a@b.co', website: 'spam.com' }).error, 'spam')
})

test('calendar links carry the event time in UTC', () => {
	const event = { id: 'e1', title: 'Live build', startsAt: '2026-11-07T00:00:00.000Z', endsAt: '2026-11-07T01:00:00.000Z', joinUrl: 'https://discord.gg/x' }
	const url = googleCalendarUrl(event, 'details')
	assert.ok(url.includes('dates=20261107T000000Z%2F20261107T010000Z'))
	const ics = buildIcs(event, { now })
	assert.ok(ics.includes('DTSTART:20261107T000000Z'))
	assert.ok(ics.includes('TRIGGER:-PT1H'))
	assert.ok(ics.includes('\r\n'))
})

test('public view never leaks the join link', () => {
	const view = publicEventView({ id: 'e1', title: 't', startsAt: 's', endsAt: 'e', joinUrl: 'https://secret' })
	assert.equal(view.joinUrl, undefined)
})
