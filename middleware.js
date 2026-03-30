import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Обробляємо реферальні лінки виду /referral/ABC123
  if (pathname.startsWith('/referral/')) {
    const referralId = pathname.slice('/referral/'.length)

    const url = request.nextUrl.clone()
    url.pathname = '/'

    const response = NextResponse.redirect(url)

    if (referralId) {
      response.cookies.set('referralId', referralId, {
        maxAge: 60 * 60 * 24, // 1 день
        path: '/',
      })
    }

    return response
  }

  return NextResponse.next()
}

// Мінімізуємо вплив middleware — він спрацьовує тільки на /referral/*
export const config = {
  matcher: ['/referral/:path*'],
}

