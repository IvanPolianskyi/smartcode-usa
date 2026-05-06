import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'

const COURSE_NAMES = {
  'python-developer-zero-to-junior': 'Пайтон',
  'unity-game-development': 'Розробка ігор на Unity',
  'roblox-studio': 'Roblox Studio',
  'web-development': 'Веб-розробка',
}

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }
  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return { usersCollection, adminId: admin._id }
}

export async function GET(request, { params }) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const { studentId } = await params
    if (!ObjectId.isValid(studentId)) {
      return NextResponse.json({ error: 'Invalid studentId' }, { status: 400 })
    }

    const usersCollection = guard.usersCollection
    const paymentsCollection = await getCollection('payments')
    const progressCollection = await getCollection('userProgress')
    const studentObjectId = new ObjectId(studentId)

    const student = await usersCollection.findOne({ _id: studentObjectId, role: { $ne: 'admin' } }, { projection: { password: 0 } })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const progressDocs = await progressCollection.find({ userId: studentObjectId }).toArray()
    const perCourse = progressDocs.map((doc) => ({
      courseId: doc.courseId,
      courseName: COURSE_NAMES[doc.courseId] || doc.courseId,
      progress: doc.overallProgress || 0,
      completedLessons: (doc.completedLessons || []).length,
    }))
    const totalCompletedLessons = perCourse.reduce((sum, c) => sum + c.completedLessons, 0)
    const averageProgress = perCourse.length
      ? Math.round(perCourse.reduce((sum, c) => sum + c.progress, 0) / perCourse.length)
      : 0

    const receipts = await paymentsCollection
      .find({ userId: studentObjectId, paymentMethod: 'receipt_upload' })
      .sort({ createdAt: -1 })
      .toArray()

    const responsePayload = {
      student: {
        id: student._id.toString(),
        name: student.name || 'Без імені',
        email: student.email,
        profile: student.studentProfile || {},
      },
      courseNames: COURSE_NAMES,
      analytics: {
        totalCompletedLessons,
        averageProgress,
        perCourse,
      },
      receipts: receipts.map((item) => ({
        id: item._id.toString(),
        amount: Number(item.amount || 0),
        status: item.status || 'pending',
        approvalStatus: item.approvalStatus || (item.status === 'completed' ? 'approved' : 'pending'),
        lessonFormat: item.lessonFormat || 'group',
        lessonPrice: Number(item.lessonPrice || 0),
        creditedLessons: Number(item.creditedLessons || 0),
        createdAt: item.createdAt,
        approvedAt: item.approvedAt || null,
        receipt: item.receipt || null,
      })),
    }

    return NextResponse.json(responsePayload, { status: 200 })
  } catch (error) {
    console.error('Admin student detail GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

