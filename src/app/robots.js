export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
          '/en',
          '/en/',
          '/dashboard/',
          '/admin/',
          '/payment/',
          '/login/',
          '/register/',
          '/api/',
      ],
    },
    sitemap: 'https://smartcode-academy.com/sitemap.xml',
  }
}
