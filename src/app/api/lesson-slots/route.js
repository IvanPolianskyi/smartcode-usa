import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const courseId = url.searchParams.get('courseId')
    const lessonFormat = url.searchParams.get('lessonFormat')

    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000)
    
    const query = { 
      isBooked: false,
      $or: [
        { reservedAt: { $exists: false } },
        { reservedAt: null },
        { reservedAt: { $lt: fifteenMinsAgo } }
      ]
    }
    
    if (courseId) query.courseId = courseId
    if (lessonFormat) query.lessonFormat = lessonFormat

    const slotsCollection = await getCollection('availableSlots')
    const slots = await slotsCollection.find(query).sort({ day: 1, time: 1 }).toArray()

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
