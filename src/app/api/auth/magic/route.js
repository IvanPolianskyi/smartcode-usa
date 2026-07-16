import { redirect } from 'next/navigation'

/**
 * Legacy path — CDN may still serve a cached 404 for /api/auth/magic.
 * Prefer /api/auth/login?token=... (same handler).
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.toString()
  redirect(q ? `/api/auth/login?${q}` : '/api/auth/login')
}
