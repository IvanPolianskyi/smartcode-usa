import { NextResponse } from 'next/server'

export function middleware(request) {
  try {
    return NextResponse.next()
  } catch {
    // Ніколи не “валимо” сайт через middleware
    return NextResponse.next()
  }
}

// Якщо middleware більше нічого не робить, можна взагалі прибрати matcher, 
// але залишимо пустим або взагалі без нього, щоб він не спрацьовував дарма
export const config = {
  matcher: [],
}

