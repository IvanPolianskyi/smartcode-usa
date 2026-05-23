const BASE = 'https://smartcode-academy.com'

const paths = [
	{ path: '', priority: 1.0, changeFrequency: 'weekly' },
	{ path: '/courses', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/python', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/webDev', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/Unity', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/Roblox', priority: 0.9, changeFrequency: 'monthly' },
	{ path: '/tariff', priority: 0.8, changeFrequency: 'monthly' },
	{ path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
	{ path: '/oferta', priority: 0.5, changeFrequency: 'yearly' },
	{ path: '/invite', priority: 0.7, changeFrequency: 'monthly' },
	{ path: '/login', priority: 0.4, changeFrequency: 'yearly' },
	{ path: '/register', priority: 0.4, changeFrequency: 'yearly' },
]

export default function sitemap() {
	const lastModified = new Date()
	const entries = []

	for (const { path, priority, changeFrequency } of paths) {
		entries.push({
			url: `${BASE}${path || ''}`,
			lastModified,
			changeFrequency,
			priority,
		})
		entries.push({
			url: `${BASE}/en${path}`,
			lastModified,
			changeFrequency,
			priority: priority * 0.95,
		})
	}

	return entries
}
