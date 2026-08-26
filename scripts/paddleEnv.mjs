/**
 * Minimal .env loader for the Paddle catalogue scripts.
 *
 * They run outside Next, so nothing has read .env.local for them. Values
 * already present in the real environment win, which is what makes
 * `PADDLE_ENV=production node scripts/paddle-doctor.mjs` behave.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function parseEnvFile(contents) {
	const out = {}
	for (const rawLine of contents.split(/\r?\n/)) {
		const line = rawLine.trim()
		if (!line || line.startsWith('#')) continue
		const eq = line.indexOf('=')
		if (eq === -1) continue
		const key = line.slice(0, eq).trim()
		let value = line.slice(eq + 1).trim()
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1)
		}
		if (key) out[key] = value
	}
	return out
}

/**
 * Load env files into process.env without overwriting anything already set.
 * @param {string[]} files - relative to the repo root, first match wins per key
 */
export function loadEnv(files = ['.env.local', '.env']) {
	const loaded = []
	for (const file of files) {
		const full = path.join(ROOT, file)
		if (!fs.existsSync(full)) continue
		loaded.push(file)
		const parsed = parseEnvFile(fs.readFileSync(full, 'utf8'))
		for (const [key, value] of Object.entries(parsed)) {
			if (process.env[key] === undefined) process.env[key] = value
		}
	}
	return loaded
}

export { ROOT }
