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
          '/register/',
          '/api/'
      ],
    },
    sitemap: 'https://smartcode-academy.com/sitemap.xml',
  }
}
