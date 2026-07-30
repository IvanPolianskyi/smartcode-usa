import { NextResponse } from 'next/server'

/** Бот проєктів вимкнено — setup webhook заборонено. */
export async function POST() {
  return NextResponse.json(
    { success: false, disabled: true, error: 'Projects Telegram bot is disabled' },
    { status: 410 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, disabled: true, error: 'Projects Telegram bot is disabled' },
    { status: 410 }
  )
}

export async function GET() {
  return NextResponse.json(
    { success: false, disabled: true, error: 'Projects Telegram bot is disabled' },
    { status: 410 }
  )
}
