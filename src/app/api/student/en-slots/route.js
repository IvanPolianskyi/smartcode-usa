import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json({ slots: [] })
    }

    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    const email = user?.email

    const slotsCollection = await getCollection('availableSlots')
    
    // Find slots explicitly booked by this user or their email
    const slots = await slotsCollection.find({ 
      $or: [
        { bookedBy: new ObjectId(userId) },
        { bookedBy: userId.toString() },
        ...(email ? [{ bookedBy: email }] : [])
      ]
    }).toArray()

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('Error fetching student en-slots:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
