import { NextResponse } from 'next/server'

/**
 * EN live-lesson checkout removed — site is UK-only, courses not sold online.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Оплата уроків карткою на сайті недоступна. Поповнення — банківським переказом у кабінеті або через менеджера SmartCode.',
    },
    { status: 410 }
  )
}
