import { NextResponse } from 'next/server'
import {
  normalizeAffiliateSrc,
  recordAffiliateClick,
} from '@/lib/affiliateClicks'

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30

export async function GET(request, { params }) {
  // У Next.js 15 params є асинхронним (Promise), його потрібно await-ити
  const awaitedParams = await params
  const referralId = awaitedParams?.referralId
  const src = normalizeAffiliateSrc(new URL(request.url).searchParams.get('src'))

  const redirectUrl = new URL('/', request.url)

  // Якщо немає реферального ID - просто ведемо на головну
  if (!referralId) {
    return NextResponse.redirect(redirectUrl)
  }

  // На Vercel фонові промайси обриваються після відповіді — тому await.
  await recordAffiliateClick(referralId, request, src || null)

  const response = NextResponse.redirect(redirectUrl)

  // Встановлюємо cookie з referralId
  response.cookies.set('referralId', referralId, {
    maxAge: THIRTY_DAYS_SECONDS, // 30 днів - стандарт для рефералів
    path: '/',
    httpOnly: true, // Захист від XSS
    secure: process.env.NODE_ENV === 'production', // Тільки HTTPS на продакшені
    sameSite: 'lax', // Захист від CSRF
  })

  if (src) {
    response.cookies.set('affiliateSrc', src, {
      maxAge: THIRTY_DAYS_SECONDS,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }

  return response
}
