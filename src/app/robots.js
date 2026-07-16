export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
          '/dashboard/',
          '/admin/',
          '/payment/',
          '/login/',
          '/forgot-password/',
          '/register/',
          '/api/',
      ],
    },
    sitemap: 'https://smartcode-academy.com/sitemap.xml',
  }
}
