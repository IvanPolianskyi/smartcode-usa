import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const slotsCollection = await getCollection('availableSlots')
    const slots = await slotsCollection.find({}).sort({ day: 1, time: 1 }).toArray()

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching admin slots:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { courseId, lessonFormat, day, time, zoomLink } = body

    if (!courseId || !lessonFormat || !day || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const slotsCollection = await getCollection('availableSlots')
    
    // Check if exactly same slot already exists and is not booked
    const existing = await slotsCollection.findOne({
      courseId,
      lessonFormat,
      day,
      time
    })
    
    if (existing) {
       return NextResponse.json({ error: 'Slot already exists' }, { status: 400 })
    }

    const newSlot = {
      courseId,
      lessonFormat,
      day,
      time,
      zoomLink: zoomLink || '',
      isBooked: false,
      bookedBy: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await slotsCollection.insertOne(newSlot)

    return NextResponse.json({ slot: { ...newSlot, _id: result.insertedId } })
  } catch (error) {
    console.error('Error creating slot:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const slotId = url.searchParams.get('id')

    if (!slotId) {
      return NextResponse.json({ error: 'Missing slot ID' }, { status: 400 })
    }

    const slotsCollection = await getCollection('availableSlots')
    const result = await slotsCollection.deleteOne({ _id: new ObjectId(slotId) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting slot:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
