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

const DEFAULT_STUDENT_PROFILE = {
  lessonFormat: 'group',
  regularSchedule: [],
  zoomLink: '',
  activeOnlineCourses: [],
  courseAccess: {},
  accountBalance: 0,
  lessonCredits: 0,
  scheduleSyncStartAt: null,
}

async function requireAdmin() {
  const userId = await getCurrentUser()
  if (!userId) return { error: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }) }

  const usersCollection = await getCollection('users')
  const admin = await usersCollection.findOne({ _id: new ObjectId(userId) })
  if (!admin || admin.role !== 'admin') {
    return { error: NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 }) }
  }
  return { usersCollection }
}

export async function GET() {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error

    const usersCollection = guard.usersCollection
    const progressCollection = await getCollection('userProgress')

    const students = await usersCollection
      .find({ role: { $ne: 'admin' } })
      .project({ password: 0 })
      .sort({ createdAt: -1 })
      .toArray()

    const studentIds = students.map((student) => student._id)
    const progressDocs = await progressCollection
      .find({ userId: { $in: studentIds } })
      .toArray()

    const progressByUserId = new Map()
    progressDocs.forEach((doc) => {
      const key = doc.userId.toString()
      const existing = progressByUserId.get(key) || {
        totalCompletedLessons: 0,
        averageProgress: 0,
        coursesInProgress: 0,
        perCourse: [],
      }
      existing.totalCompletedLessons += (doc.completedLessons || []).length
      existing.coursesInProgress += 1
      existing.averageProgress += doc.overallProgress || 0
      existing.perCourse.push({
        courseId: doc.courseId,
        courseName: COURSE_NAMES[doc.courseId] || doc.courseId,
        progress: doc.overallProgress || 0,
        completedLessons: (doc.completedLessons || []).length,
      })
      progressByUserId.set(key, existing)
    })

    const formatted = students.map((student) => {
      const profile = student.studentProfile || DEFAULT_STUDENT_PROFILE
      const analytics = progressByUserId.get(student._id.toString()) || {
        totalCompletedLessons: 0,
        averageProgress: 0,
        coursesInProgress: 0,
        perCourse: [],
      }
      const averageProgress = analytics.coursesInProgress
        ? Math.round(analytics.averageProgress / analytics.coursesInProgress)
        : 0

      return {
        id: student._id.toString(),
        name: student.name || 'Без імені',
        email: student.email,
        role: student.role || 'student',
        createdAt: student.createdAt,
        enrolledCourses: student.enrolledCourses || [],
        profile: {
          lessonFormat: profile.lessonFormat || 'group',
          regularSchedule: profile.regularSchedule || [],
          zoomLink: profile.zoomLink || '',
          activeOnlineCourses: profile.activeOnlineCourses || [],
          courseAccess: profile.courseAccess || {},
          accountBalance: Number(profile.accountBalance || 0),
          lessonCredits: Number(profile.lessonCredits || 0),
          scheduleSyncStartAt: profile.scheduleSyncStartAt || null,
        },
        analytics: {
          totalCompletedLessons: analytics.totalCompletedLessons,
          averageProgress,
          coursesInProgress: analytics.coursesInProgress,
          perCourse: analytics.perCourse,
        },
      }
    })

    return NextResponse.json({ students: formatted, courseNames: COURSE_NAMES }, { status: 200 })
  } catch (error) {
    console.error('Admin students GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const guard = await requireAdmin()
    if (guard.error) return guard.error
    const usersCollection = guard.usersCollection

    const body = await request.json()
    const {
      studentId,
      lessonFormat = 'group',
      regularSchedule = [],
      zoomLink = '',
      onlineCourseIds = [],
      pythonAccessEnabled = false,
      pythonUnlockedLessons = [],
    } = body

    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 })
    }

    const sanitizedSchedule = (regularSchedule || [])
      .filter((item) => item?.day)
      .map((item) => ({
        day: item.day,
        time: item.time || '',
      }))

    const updateDoc = {
      studentProfile: {
        lessonFormat: lessonFormat === 'individual' ? 'individual' : 'group',
        regularSchedule: sanitizedSchedule,
        zoomLink: String(zoomLink || '').trim(),
        activeOnlineCourses: (onlineCourseIds || []).filter(Boolean),
        courseAccess: {
          'python-developer-zero-to-junior': {
            enabled: Boolean(pythonAccessEnabled),
            unlockedLessons: (pythonUnlockedLessons || []).filter(Boolean),
          },
        },
        scheduleSyncStartAt: new Date(),
      },
      updatedAt: new Date(),
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('Admin students PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
