import { NextResponse } from 'next/server'

const ONE_DAY_SECONDS = 60 * 60 * 24

export async function GET(request, { params }) {
  const { referralId } = params

  // Якщо раптом немає id — просто ведемо на головну без cookie
  if (!referralId) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const redirectUrl = new URL('/', request.url)
  const response = NextResponse.redirect(redirectUrl)

  response.cookies.set('referralId', referralId, {
    maxAge: ONE_DAY_SECONDS, // 1 день
    path: '/',
  })

  return response
}

