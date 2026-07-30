import { NextResponse } from 'next/server'

/**
 * Бот проєктів ВИМКНЕНО.
 * Існуючі проєкти на сайті (GET /api/projects) лишаються.
 * Додавати нові — рідко, через адмінку/БД, не через Telegram.
 *
 * Старий код обробки команд (/addproject, /listleads, …) прибрано з активного шляху
 * заради безпеки (раніше віддавав телефони лідів без надійного захисту).
 */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      error: 'Projects Telegram bot is disabled',
    },
    { status: 410 }
  )
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      error: 'Projects Telegram bot is disabled',
    },
    { status: 410 }
  )
}
