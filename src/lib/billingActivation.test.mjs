import assert from 'node:assert/strict'
import test from 'node:test'
import { entitlementCoversCheckout } from './billingActivation.js'

test('entitlementCoversCheckout: waits for the bought course', () => {
	assert.equal(
		entitlementCoversCheckout(
			{ hasSubscription: true, courseIds: ['python-developer-zero-to-junior'] },
			'roblox-studio'
		),
		false
	)
	assert.equal(
		entitlementCoversCheckout(
			{
				hasSubscription: true,
				courseIds: ['python-developer-zero-to-junior', 'roblox-studio'],
			},
			'roblox-studio'
		),
		true
	)
})

test('entitlementCoversCheckout: first purchase without course param', () => {
	assert.equal(entitlementCoversCheckout({ hasSubscription: false, courseIds: [] }), false)
	assert.equal(
		entitlementCoversCheckout({
			hasSubscription: true,
			courseIds: ['roblox-studio'],
		}),
		true
	)
})
