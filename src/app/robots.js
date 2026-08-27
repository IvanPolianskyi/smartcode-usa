export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
          '/admin/',
          '/admin',
          '/dashboard/',
          '/dashboard',
          '/login/',
          '/forgot-password/',
          '/register/',
          '/api/',
          // Redirect gates and post-checkout pages: no content to index, and
          // indexing them puts a dead end in front of a search visitor.
          '/start',
          '/welcome',
          '/reset-password',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'}/sitemap.xml`,
  }
}
