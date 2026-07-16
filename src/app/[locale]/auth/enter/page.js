import { redirect } from 'next/navigation'

/**
 * Locale-friendly entry: /uk/auth/enter?token=... → /api/auth/magic
 */
export default async function AuthEnterPage({ searchParams }) {
  const params = await searchParams
  const token = String(params?.token || '').trim()
  const redirectTo = String(params?.redirect || '/dashboard').trim()
  if (!token) {
    redirect('/login?error=magic_missing')
  }
  const q = new URLSearchParams({
    token,
    redirect: redirectTo.startsWith('/') ? redirectTo : '/dashboard',
  })
  redirect(`/api/auth/magic?${q.toString()}`)
}
