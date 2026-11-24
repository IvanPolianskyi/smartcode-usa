import test from 'node:test'
import assert from 'node:assert/strict'
import { chromeIntentUrl, detectInAppBrowser } from './inAppBrowser.js'

const IG_IOS =
	'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 350.0.0.0 (iPhone15,3; iOS 18_1; en_US)'
const IG_ANDROID =
	'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0 Mobile Safari/537.36 Instagram 350.0.0.0 Android'
const SAFARI =
	'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1'

test('detects the Instagram browser on iPhone and Android', () => {
	assert.deepEqual(detectInAppBrowser(IG_IOS), { app: 'Instagram', android: false, ios: true })
	assert.equal(detectInAppBrowser(IG_ANDROID).android, true)
})

test('real Safari and an empty user agent are not in-app', () => {
	assert.equal(detectInAppBrowser(SAFARI), null)
	assert.equal(detectInAppBrowser(''), null)
})

test('detects Facebook and TikTok browsers', () => {
	assert.equal(detectInAppBrowser('Mozilla/5.0 [FBAN/FBIOS;FBAV/450.0]').app, 'Facebook')
	assert.equal(detectInAppBrowser('Mozilla/5.0 musical_ly_35.0 BytedanceWebview').app, 'TikTok')
})

test('chrome intent keeps path and query', () => {
	assert.equal(
		chromeIntentUrl('https://smartcode.academy/club?promo=LIVE'),
		'intent://smartcode.academy/club?promo=LIVE#Intent;scheme=https;package=com.android.chrome;end'
	)
	assert.equal(chromeIntentUrl('not a url'), null)
})
