const BASE =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'

const paths = [
	{ path: '', priority: 1.0, changeFrequency: 'weekly' },
	{ path: '/pricing', priority: 0.95, changeFrequency: 'weekly' },
	{ path: '/start', priority: 0.8, changeFrequency: 'monthly' },
	{ path: '/courses', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/courses/python-developer-zero-to-junior', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/courses/roblox-studio', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/courses/ai-at-work', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/refund', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
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
