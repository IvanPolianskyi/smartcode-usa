import { NextResponse } from 'next/server'

export async function POST(request) {
  void request
  return NextResponse.json(
    { error: 'Monobank topup вимкнено. Використовуйте IBAN-квитанцію.' },
    { status: 410 }
  )
}
