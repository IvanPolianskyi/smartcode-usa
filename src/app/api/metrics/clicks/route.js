import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function POST(request) {
  try {
    const { courseId, source } = await request.json()

    const collection = await getCollection('comingSoonClicks')
    
    // Update total count
    await collection.updateOne(
      { id: 'en_purchase_clicks' },
      { $inc: { count: 1 } },
      { upsert: true }
    )

    // Optional: Update per course/source if needed
    if (courseId) {
      await collection.updateOne(
        { id: `en_purchase_${courseId}` },
        { $inc: { count: 1 } },
        { upsert: true }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
