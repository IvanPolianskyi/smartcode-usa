import { NextResponse } from 'next/server'

/** Публічна реєстрація вимкнена — акаунти створює CRM / Telegram-бот. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Публічна реєстрація вимкнена. Акаунт створює менеджер SmartCode — увійдіть за логіном і паролем або за посиланням з Telegram / CRM.',
    },
    { status: 403 }
  )
}
