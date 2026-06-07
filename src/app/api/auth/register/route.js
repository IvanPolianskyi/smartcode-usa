import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCollection } from '@/lib/mongodb'
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth'
import { notifyCrmStudentLinksRefresh } from '@/lib/notifyCrmStudentLinks'
import { toAuthUserResponse } from '@/lib/crmLmsSync'
import { claimGuestPayment } from '@/lib/claimGuestPayment'

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      name,
      phone,
      locale = 'uk',
      claimOrder,
      claimOrderToken,
      privacyAccepted,
    } = body
    const isEnLocale = locale === 'en'

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        {
          error: isEnLocale
            ? 'Please confirm that you have read the Privacy Policy'
            : 'Підтвердіть, що ви ознайомилися з Політикою конфіденційності',
        },
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

    // Create user
    const user = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      phone: phone || null,
      role: 'student',
      studentProfile: {
        lessonFormat: 'group',
        regularSchedule: [],
        zoomLink: '',
        activeOnlineCourses: [],
        courseAccess: {},
        accountReady: isEnLocale,
      },
      purchasedCourses: [], // Courses that user has paid for
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledCourses: [],
      referralId: referralId || null
    }

    const result = await usersCollection.insertOne(user)
    const userId = result.insertedId.toString()
    const userObjectId = result.insertedId

    notifyCrmStudentLinksRefresh({
      userId,
      email: user.email,
      name: user.name,
    }).catch(() => {})

    if (claimOrder) {
      const claimResult = await claimGuestPayment({
        orderId: claimOrder,
        userId: userObjectId,
        email: user.email,
        statusToken: claimOrderToken,
      })

      if (claimResult.ok) {
        const updatedUser = await usersCollection.findOne({ _id: userObjectId })
        if (updatedUser) {
          user.purchasedCourses = updatedUser.purchasedCourses
          user.studentProfile = updatedUser.studentProfile
        }
      }
    }

    // Generate token
    const token = generateToken(userId)

    // Set auth cookie
    await setAuthCookie(token)

    // If user registered via referral link, notify Telegram bot
    if (referralId) {
      try {
        const baseUrl =
          process.env.API_BASE_URL || new URL(request.url).origin

        const internalHeaders = { 'Content-Type': 'application/json' }
        if (process.env.INTERNAL_LEAD_SECRET) {
          internalHeaders['x-internal-lead'] = process.env.INTERNAL_LEAD_SECRET
        }

        await fetch(`${baseUrl}/api/telegram`, {
          method: 'POST',
          headers: internalHeaders,
          body: JSON.stringify({
            telegram: email,
            name,
            course: 'Реферальне посилання',
            message: `Новий користувач зареєструвався по реферальному посиланню ID: ${referralId}\nІм'я: ${name}\nEmail: ${email}`,
            contactMethod: 'telegram',
          }),
        })
      } catch (telegramError) {
        console.error('Failed to notify Telegram about referral:', telegramError)
      }
    }

    return NextResponse.json(
      {
        user: toAuthUserResponse({
          ...user,
          _id: userObjectId,
          id: userId,
        }),
        token,
      },
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

