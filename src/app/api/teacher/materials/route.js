import { NextResponse } from 'next/server'
import { requireTeacher } from '@/lib/requireTeacher'

/**
 * Teacher materials endpoint.
 * Roblox v2 curriculum pack was removed; LMS lesson content is the source of truth.
 */
export async function GET() {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  return NextResponse.json({ materials: [] })
}
