import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { getCollection } from '@/lib/mongodb'
import { comparePassword, issueAuthSession } from '@/lib/auth'
import { consumeLoginToken } from '@/lib/loginTokens'
import { toAuthUserResponse } from '@/lib/authUserResponse'
import { normalizeLoginIdentifier, isStudentShortCode } from '@/lib/authLogin'
import { syntheticStudentLogin } from '@/lib/studentLmsLogin'

/**
 * GET /api/auth/login?token=...&redirect=/dashboard
 * One-time magic login.
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
        { error: 'Enter your email and password.' },
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
            'Incorrect email or password. If you just paid, finish checkout after signing in, or start from Pricing.',
        },
        { status: 401 }
      )
    }

    if (!user.password) {
      if (user.googleId) {
        return NextResponse.json(
          {
            error:
              'This account uses Google sign-in. Click Continue with Google on the login page.',
          },
          { status: 401 }
        )
      }
      return NextResponse.json(
        {
          error:
            'This account needs a one-time sign-in link. Ask support to send a new one.',
        },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error:
            'Incorrect email or password. Forgot your password? Use Forgot password on the login page.',
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
