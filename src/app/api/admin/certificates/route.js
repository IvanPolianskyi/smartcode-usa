import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { createProgressEntry } from '@/lib/courseUtils'

// Get list of certificates for admin
export async function GET() {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const usersCollection = await getCollection('users')
    const adminUser = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      )
    }

    const progressCollection = await getCollection('userProgress')
    const progressDocs = await progressCollection
      .find({ certificates: { $exists: true, $ne: [] } })
      .sort({ 'certificates.issuedAt': -1 })
      .limit(100)
      .toArray()

    const courseNames = {
      'python-developer-zero-to-junior': 'Python Developer: From Zero to Confident Junior',
      'unity-game-development': 'Розробка ігор на Unity',
      'roblox-studio': 'Roblox Studio',
      'web-development': 'Веб-розробка',
    }

    // Collect user ids to hydrate names/emails
    const userIds = [...new Set(progressDocs.map(p => p.userId.toString()))]
    const userMap = {}
    if (userIds.length > 0) {
      const users = await usersCollection
        .find({ _id: { $in: userIds.map(id => new ObjectId(id)) } })
        .toArray()
      users.forEach(u => {
        userMap[u._id.toString()] = {
          name: u.name || 'Без імені',
          email: u.email,
        }
      })
    }

    const certificates = []
    for (const doc of progressDocs) {
      const userInfo = userMap[doc.userId.toString()] || {
        name: 'Без імені',
        email: 'N/A',
      }
      const courseId = doc.courseId

      for (const cert of doc.certificates || []) {
        certificates.push({
          id: cert.id || cert._id?.toString() || `${doc._id}-${cert.title}`,
          userId: doc.userId.toString(),
          userName: userInfo.name,
          userEmail: userInfo.email,
          courseId,
          courseName: courseNames[courseId] || courseId,
          title: cert.title || 'Сертифікат',
          description: cert.description || '',
          issuedAt: cert.issuedAt || doc.updatedAt || doc.enrolledAt,
        })
      }
    }

    // Sort newest first
    certificates.sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt))

    return NextResponse.json({ certificates }, { status: 200 })
  } catch (error) {
    console.error('Admin certificates GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create certificate for a student
export async function POST(request) {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const usersCollection = await getCollection('users')
    const adminUser = await usersCollection.findOne({ _id: new ObjectId(userId) })

    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { studentEmail, courseId, title, description } = body

    if (!studentEmail || !courseId) {
      return NextResponse.json(
        { error: 'studentEmail and courseId are required' },
        { status: 400 }
      )
    }

    const student = await usersCollection.findOne({
      email: studentEmail.toLowerCase(),
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student with this email not found' },
        { status: 404 }
      )
    }

    const progressCollection = await getCollection('userProgress')
    const userIdObj = new ObjectId(student._id)

    let progress = await progressCollection.findOne({
      userId: userIdObj,
      courseId,
    })

    if (!progress) {
      progress = await createProgressEntry(userIdObj, courseId)
    }

    const certificate = {
      id: new ObjectId().toString(),
      title: title || 'Сертифікат про завершення курсу',
      description: description || '',
      issuedAt: new Date(),
    }

    await progressCollection.updateOne(
      { userId: userIdObj, courseId },
      {
        $push: { certificates: certificate },
        $set: { updatedAt: new Date() },
      }
    )

    return NextResponse.json(
      {
        success: true,
        certificate: {
          ...certificate,
          userId: student._id.toString(),
          userName: student.name || 'Без імені',
          userEmail: student.email,
          courseId,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin certificates POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

