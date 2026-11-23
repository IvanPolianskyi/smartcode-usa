import test from 'node:test'
import assert from 'node:assert/strict'
import { kitForPriceId, kitIdsFromTransaction, nameFromEmail, userHasKit } from './kits.js'

const IDS = { 'roblox-ai-games': 'pri_kit123' }

test('a known price id maps to its kit; unknown or empty does not', () => {
	assert.equal(kitForPriceId('pri_kit123', IDS).id, 'roblox-ai-games')
	assert.equal(kitForPriceId('pri_other', IDS), null)
	assert.equal(kitForPriceId(null, IDS), null)
	assert.equal(kitForPriceId('pri_x', { 'roblox-ai-games': null }), null)
})

test('kits come from the paid items, never from custom_data', () => {
	const tx = {
		custom_data: { kit: 'roblox-ai-games' },
		items: [{ price: { id: 'pri_sub' } }, { price: { id: 'pri_kit123' } }, { price_id: 'pri_kit123' }],
	}
	assert.deepEqual(kitIdsFromTransaction(tx, IDS), ['roblox-ai-games'])
	assert.deepEqual(kitIdsFromTransaction({ custom_data: { kit: 'roblox-ai-games' }, items: [] }, IDS), [])
	assert.deepEqual(kitIdsFromTransaction(null, IDS), [])
})

test('ownership check and friendly names', () => {
	assert.ok(userHasKit({ kits: ['roblox-ai-games'] }, 'roblox-ai-games'))
	assert.ok(!userHasKit({}, 'roblox-ai-games'))
	assert.equal(nameFromEmail('mike.t99@gmail.com'), 'Mike')
	assert.equal(nameFromEmail('123@x.com'), 'Builder')
})
