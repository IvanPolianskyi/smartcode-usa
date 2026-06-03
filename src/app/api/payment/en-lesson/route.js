import { NextResponse } from 'next/server'

/**
 * Live lessons are not sold on the English site (self-paced courses only).
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Live lessons are not available on the English site. Purchase a full course instead.',
    },
    { status: 410 }
  )
}
