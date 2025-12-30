import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

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

    // Create user
    const user = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      phone: phone || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledCourses: []
    }

    const result = await usersCollection.insertOne(user)
    const userId = result.insertedId.toString()

    // Generate token
    const token = generateToken(userId)

    // Set cookie
    await setAuthCookie(token)

    // Return user (without password)
    const userResponse = {
      id: userId,
      email: user.email,
      name: user.name,
      phone: user.phone,
      enrolledCourses: user.enrolledCourses
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

