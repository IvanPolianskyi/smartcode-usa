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
    sitemap: 'https://smartcode-academy.com/sitemap.xml',
  }
}
