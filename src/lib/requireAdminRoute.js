import { NextResponse } from 'next/server'

/**
 * Block dangerous dev/setup routes on production unless explicitly enabled.
 */
export function blockUnlessDevOrAdminEnabled() {
  if (process.env.ALLOW_PUBLIC_SETUP_ROUTES === 'true') {
    return null
  }
  if (process.env.NODE_ENV !== 'production') {
    return null
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
