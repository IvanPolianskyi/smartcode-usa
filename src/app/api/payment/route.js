import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// Legacy endpoint - use /api/payment/create instead
// This endpoint is kept for backward compatibility but redirects to new endpoint
export async function POST(request) {
  return NextResponse.json(
    { error: 'This endpoint is deprecated. Use /api/payment/create instead.' },
    { status: 410 }
  )
}

// Check if user has purchased a course
export async function GET(request) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return NextResponse.json(
        { purchased: false },
        { status: 200 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ 
      _id: new ObjectId(userId) 
    })

    if (!user) {
      return NextResponse.json(
        { purchased: false },
        { status: 200 }
      )
    }

    // Admin has access to all courses
    const isPurchased = user.role === 'admin' || 
                       (user.purchasedCourses || []).includes(courseId)

    return NextResponse.json(
      { purchased: isPurchased },
      { status: 200 }
    )
  } catch (error) {
    console.error('Check payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

