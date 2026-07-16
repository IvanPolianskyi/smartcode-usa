import { NextResponse } from 'next/server'

/**
 * Покупка повних курсів на сайті вимкнена.
 * Доступ до LMS відкриває CRM / менеджер разом з онлайн-уроками.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Покупка курсів на сайті вимкнена. Доступ до платформи відкриває менеджер SmartCode разом з онлайн-уроками.',
    },
    { status: 410 }
  )
}
