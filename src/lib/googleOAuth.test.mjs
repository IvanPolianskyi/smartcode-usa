import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { sanitizeOAuthRedirect } from './googleOAuth.js'

describe('googleOAuth', () => {
	describe('sanitizeOAuthRedirect', () => {
		it('allows same-origin relative paths', () => {
			assert.equal(sanitizeOAuthRedirect('/dashboard'), '/dashboard')
			assert.equal(
				sanitizeOAuthRedirect('/start?course=roblox-studio&plan=monthly'),
				'/start?course=roblox-studio&plan=monthly'
			)
		})

		it('blocks protocol-relative and absolute URLs', () => {
			assert.equal(sanitizeOAuthRedirect('//evil.com'), '/dashboard')
			assert.equal(sanitizeOAuthRedirect('https://evil.com'), '/dashboard')
			assert.equal(sanitizeOAuthRedirect(''), '/dashboard')
		})
	})
})
