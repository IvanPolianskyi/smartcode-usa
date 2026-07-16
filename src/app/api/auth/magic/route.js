import { redirect } from 'next/navigation'
import { generateToken, setAuthCookie } from '@/lib/auth'
import { consumeLoginToken } from '@/lib/loginTokens'

/**
 * GET /api/auth/magic?token=...&redirect=/dashboard
 * One-time magic login from CRM / Telegram bot.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token') || ''
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const safeRedirect =
    redirectTo.startsWith('/') && !redirectTo.startsWith('//')
      ? redirectTo
      : '/dashboard'

  const userId = await consumeLoginToken(token)
  if (!userId) {
    redirect(`/login?error=magic_expired`)
  }

  const jwt = generateToken(userId)
  await setAuthCookie(jwt)
  redirect(safeRedirect)
}
