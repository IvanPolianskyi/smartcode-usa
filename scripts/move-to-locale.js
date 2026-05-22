const fs = require('fs')
const path = require('path')

const appDir = path.join(__dirname, '../src/app')
const localeDir = path.join(appDir, '[locale]')

const keepInApp = new Set([
	'api',
	'globals.css',
	'layout.js',
	'robots.js',
	'sitemap.js',
	'referral',
	'[locale]',
])

if (!fs.existsSync(localeDir)) {
	fs.mkdirSync(localeDir, { recursive: true })
}

for (const name of fs.readdirSync(appDir)) {
	if (keepInApp.has(name)) continue
	const src = path.join(appDir, name)
	const dest = path.join(localeDir, name)
	if (fs.existsSync(dest)) {
		console.warn('skip exists', name)
		continue
	}
	fs.renameSync(src, dest)
	console.log('moved', name)
}

console.log('done')
