import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { getCollection } from '@/lib/mongodb'
import { comparePassword, issueAuthSession } from '@/lib/auth'
import { consumeLoginToken } from '@/lib/loginTokens'
import { toAuthUserResponse } from '@/lib/crmLmsSync'
import { normalizeLoginIdentifier, isStudentShortCode } from '@/lib/authLogin'
import { syntheticStudentLogin } from '@/lib/studentLmsLogin'

/**
 * GET /api/auth/login?token=...&redirect=/dashboard
 * One-time magic login (CRM / Telegram).
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token') || ''
  if (!token) {
    redirect('/login?error=magic_missing')
  }
  const redirectTo = searchParams.get('redirect') || '/dashboard'
  const safeRedirect =
    redirectTo.startsWith('/') && !redirectTo.startsWith('//')
      ? redirectTo
      : '/dashboard'

  const userId = await consumeLoginToken(token)
  if (!userId) {
    redirect('/login?error=magic_expired')
  }

  await issueAuthSession(userId)
  redirect(safeRedirect)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          error:
            'Вкажіть логін і пароль. Логін — email або код учня з CRM / Telegram.',
        },
        { status: 400 }
      )
    }

    const loginId = normalizeLoginIdentifier(email)
    const usersCollection = await getCollection('users')
    let user = null

    if (isStudentShortCode(loginId)) {
      user = await usersCollection.findOne({
        'studentProfile.crmShortId': loginId,
        role: { $ne: 'admin' },
      })
      if (!user) {
        user = await usersCollection.findOne({
          email: syntheticStudentLogin(loginId),
        })
      }
    } else {
      user = await usersCollection.findOne({ email: loginId })
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            'Невірний логін або пароль. Якщо акаунт видавав менеджер — перевірте логін з листа / Telegram. Без акаунта напишіть у SmartCode.',
        },
        { status: 401 }
      )
    }

    if (!user.password) {
      return NextResponse.json(
        {
          error:
            'Для цього акаунта потрібне одноразове посилання з Telegram або CRM. Попросіть менеджера надіслати нове.',
        },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error:
            'Невірний логін або пароль. Забули пароль? Попросіть нове посилання в Telegram-боті або у менеджера.',
        },
        { status: 401 }
      )
    }

    const userId = user._id.toString()
    const token = await issueAuthSession(userId)

    return NextResponse.json(
      { user: toAuthUserResponse(user), token },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
