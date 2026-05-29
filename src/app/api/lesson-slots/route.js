import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { buildAvailableSlotQuery, reservationCutoffDate } from '@/lib/lessonSlotReserve'

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const courseId = url.searchParams.get('courseId')
    const lessonFormat = url.searchParams.get('lessonFormat')

    const query = buildAvailableSlotQuery({ courseId, lessonFormat })

    const slotsCollection = await getCollection('availableSlots')
    const slots = await slotsCollection.find(query).sort({ day: 1, time: 1 }).toArray()

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching available slots:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
