export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
          '/dashboard/',
          '/login/',
          '/forgot-password/',
          '/register/',
          '/api/',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'}/sitemap.xml`,
  }
}
