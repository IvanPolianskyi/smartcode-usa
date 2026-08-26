const BASE = 'https://smartcode-academy.com'

const paths = [
	{ path: '', priority: 1.0, changeFrequency: 'weekly' },
	{ path: '/courses', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/courses/python-developer-zero-to-junior', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/courses/roblox-studio', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/refund', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
]

export default function sitemap() {
	const lastModified = new Date()

	return paths.map(({ path, priority, changeFrequency }) => ({
		url: `${BASE}${path || ''}`,
		lastModified,
		changeFrequency,
		priority,
	}))
}
