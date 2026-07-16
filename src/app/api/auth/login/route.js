import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { getCollection } from '@/lib/mongodb'
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth'
import { consumeLoginToken } from '@/lib/loginTokens'
import { toAuthUserResponse } from '@/lib/crmLmsSync'

/**
 * GET /api/auth/login?token=...&redirect=/dashboard
 * One-time magic login (CRM / Telegram). Mounted on existing /login route
 * so Vercel does not serve a stale cached 404 from /api/auth/magic.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token') || ''
  if (!token) {
    redirect('/login')
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

  const jwt = generateToken(userId)
  await setAuthCookie(jwt)
  redirect(safeRedirect)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email (email field can contain username or email)
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate token
    const userId = user._id.toString()
    const token = generateToken(userId)

    // Set cookie
    await setAuthCookie(token)

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

