import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { comparePassword, generateToken, setAuthCookie } from '@/lib/auth'

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

    // Find user
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

    // Return user (without password)
    const userResponse = {
      id: userId,
      email: user.email,
      name: user.name,
      phone: user.phone,
      enrolledCourses: user.enrolledCourses || []
    }

    return NextResponse.json(
      { user: userResponse, token },
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

