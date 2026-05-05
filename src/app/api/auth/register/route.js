import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCollection } from '@/lib/mongodb'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role } = body

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const usersCollection = await getCollection('users')
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Read referral id from cookies (set by /link-{id} middleware)
    const cookieStore = await cookies()
    const referralIdCookie = cookieStore.get('referralId')
    const referralId = referralIdCookie?.value || null

    // Determine role (ensure it's one of allowed roles)
    const validRole = ['parent', 'student'].includes(role) ? role : 'student'

    // Create user
    const user = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      phone: phone || null,
      role: validRole, 
      purchasedCourses: [], // Courses that user has paid for
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledCourses: [],
      referralId: referralId || null
    }

    const result = await usersCollection.insertOne(user)
    const userId = result.insertedId.toString()

    // Generate token
    const token = generateToken(userId)

    // Set auth cookie
    await setAuthCookie(token)

    // If user registered via referral link, notify Telegram bot
    if (referralId) {
      try {
        const baseUrl =
          process.env.API_BASE_URL || new URL(request.url).origin

        await fetch(`${baseUrl}/api/telegram`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: phone || '',
            course: 'Реферальне посилання',
            message: `Новий користувач зареєструвався по реферальному посиланню ID: ${referralId}\nІм'я: ${name}\nEmail: ${email}`,
            contactMethod: 'phone',
          }),
        })
      } catch (telegramError) {
        console.error('Failed to notify Telegram about referral:', telegramError)
      }
    }

    // Return user (without password)
    const userResponse = {
      id: userId,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      purchasedCourses: user.purchasedCourses,
      enrolledCourses: user.enrolledCourses,
      referralId: user.referralId || null
    }

    return NextResponse.json(
      { user: userResponse, token },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

