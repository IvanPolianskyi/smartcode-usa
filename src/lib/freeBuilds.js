/**
 * Free game code from Instagram reels, handed out on /free?build=<slug>.
 *
 * Flow (variant A of the funnel): reel → comment keyword → the bot in Direct
 * sends smartcode.academy/free?build=<slug> → free account (email) → the
 * download button and the first lesson.
 *
 * To add a reel: put the .rbxl / .zip in public/builds/ (or any public link)
 * and add an entry. The slug is what goes in the ManyChat link.
 *
 * @type {Array<{ slug: string, title: string, description: string, downloadUrl: string }>}
 */
export const FREE_BUILDS = [
	// {
	// 	slug: 'tycoon',
	// 	title: 'AI vs student: tycoon',
	// 	description: 'The tycoon from the reel - place file with every script.',
	// 	downloadUrl: '/builds/tycoon.rbxl',
	// },
]

export function findFreeBuild(slug, builds = FREE_BUILDS) {
	const clean = String(slug || '').trim().toLowerCase()
	if (!clean) return null
	return builds.find((b) => b.slug === clean) || null
}
