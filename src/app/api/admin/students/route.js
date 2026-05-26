import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getCurrentUser } from '@/lib/auth'
import { getCollection } from '@/lib/mongodb'
import {
  buildCrmHeaders,
  fetchCrmTeachers,
  resolveCrmToken,
  syncStudentToCrm,
} from '@/lib/crmStudentSchedulePull'
import { isStudentDashboardReady } from '@/lib/studentAccountReady'
import {
  buildCourseAccessForOnlineCourses,
  flattenCourseLessons,
  getRemovedOnlineCourseIds,
} from '@/lib/courseLessonAccess'
import { kyivSlotSignature, nextKyivWeekdaySlot } from '@/lib/kyivTime'

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
  crmTeacherId: '',
  crmTeacherName: '',
}

const CRM_BASE_URL = process.env.CRM_API_URL || process.env.SMARTCODE_CRM_API_URL || ''
const DEFAULT_LESSON_DURATION_MINUTES = 60
const WEEKDAY_INDEX = {
  'Нд': 0,
  'Пн': 1,
  'Вт': 2,
  'Ср': 3,
  'Чт': 4,
  'Пт': 5,
  'Сб': 6,
}

function parseTimeToParts(raw) {
  const text = String(raw || '').trim()
  const match = /^(\d{1,2}):(\d{2})$/.exec(text)
  if (!match) return null
  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null
  return { hours, minutes }
}

async function fetchExistingIndividualLessons(base, token, studentId, teacherId) {
  const params = new URLSearchParams({
    kind: 'individual',
    student_id: studentId,
    teacher_id: teacherId,
    limit: '500',
  })
  const response = await fetch(`${base}/lessons?${params}`, {
    headers: buildCrmHeaders(token),
    cache: 'no-store',
  })
  if (!response.ok) return []
  const data = await response.json()
  return Array.isArray(data) ? data : []
}

async function ensureCrmRegularLessons(studentDoc, crmStudent) {
  if (!CRM_BASE_URL) return
  const profile = studentDoc?.studentProfile || {}
  const teacherId = String(profile.crmTeacherId || '').trim()
  const lessonFormat = String(profile.lessonFormat || '').trim()
  const schedule = Array.isArray(profile.regularSchedule) ? profile.regularSchedule : []
  if (!teacherId || lessonFormat !== 'individual' || schedule.length === 0) return

  const studentId = String(crmStudent?.id || profile.crmStudentId || '').trim()
  if (!studentId) return

  const base = CRM_BASE_URL.replace(/\/$/, '')
  const token = await resolveCrmToken()
  const existingLessons = await fetchExistingIndividualLessons(base, token, studentId, teacherId)
  const existingSignatures = new Set(
    existingLessons
      .map((item) => kyivSlotSignature(item?.start_at))
      .filter(Boolean)
  )

  for (const item of schedule) {
    const day = String(item?.day || '').trim()
    const timeParts = parseTimeToParts(item?.time)
    const weekday = WEEKDAY_INDEX[day]
    if (weekday == null || !timeParts) continue

    const slotStart = nextKyivWeekdaySlot(weekday, timeParts.hours, timeParts.minutes)
    const slotEnd = new Date(slotStart.getTime() + DEFAULT_LESSON_DURATION_MINUTES * 60 * 1000)
    const slotSignature = kyivSlotSignature(slotStart.toISOString())
    if (slotSignature && existingSignatures.has(slotSignature)) {
      continue
    }

    const createResponse = await fetch(`${base}/lessons`, {
      method: 'POST',
      headers: buildCrmHeaders(token),
      body: JSON.stringify({
        kind: 'individual',
        teacher_id: teacherId,
        student_id: studentId,
        start_at: slotStart.toISOString(),
        end_at: slotEnd.toISOString(),
        series_forever: true,
      }),
    })

    if (!createResponse.ok) {
      const message = await createResponse.text()
      throw new Error(message || `CRM lessons create failed (${createResponse.status})`)
    }
  }
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
          crmTeacherId: String(profile.crmTeacherId || ''),
          crmTeacherName: String(profile.crmTeacherName || ''),
          crmStudentId: String(profile.crmStudentId || ''),
          accountReady: profile.accountReady !== false,
        },
        analytics: {
          totalCompletedLessons: analytics.totalCompletedLessons,
          averageProgress,
          coursesInProgress: analytics.coursesInProgress,
          perCourse: analytics.perCourse,
        },
      }
    })

    let crmTeachers = []
    let crmTeachersError = null
    if (!CRM_BASE_URL) {
      crmTeachersError = 'CRM_API_URL не задано на сервері (Vercel env)'
    } else {
      try {
        crmTeachers = await fetchCrmTeachers()
      } catch (error) {
        console.error('CRM teachers load error:', error)
        crmTeachersError = error?.message || 'Не вдалося завантажити викладачів з CRM'
      }
    }

    return NextResponse.json(
      { students: formatted, courseNames: COURSE_NAMES, crmTeachers, crmTeachersError },
      { status: 200 }
    )
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
      courseFullAccess = {},
      crmTeacherId = '',
      crmTeacherName = '',
      accountReady: accountReadyBody,
    } = body

    if (!studentId) {
      return NextResponse.json({ error: 'studentId is required' }, { status: 400 })
    }

    const existing = await usersCollection.findOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      { projection: { password: 0 } }
    )
    if (!existing) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const sanitizedSchedule = (regularSchedule || [])
      .filter((item) => item?.day)
      .map((item) => ({
        day: item.day,
        time: item.time || '',
      }))

    const prev = { ...DEFAULT_STUDENT_PROFILE, ...(existing.studentProfile || {}) }
    const onlineIds = (onlineCourseIds || []).filter(Boolean)

    const mergedProfile = {
      ...prev,
      lessonFormat: lessonFormat === 'individual' ? 'individual' : 'group',
      regularSchedule: sanitizedSchedule,
      zoomLink: String(zoomLink || '').trim(),
      activeOnlineCourses: onlineIds,
      courseAccess: buildCourseAccessForOnlineCourses(
        prev.courseAccess || {},
        onlineIds,
        courseFullAccess || {}
      ),
      scheduleSyncStartAt: new Date(),
      crmTeacherId: String(crmTeacherId || '').trim(),
      crmTeacherName: String(crmTeacherName || '').trim(),
    }

    if (accountReadyBody !== undefined) {
      mergedProfile.accountReady = Boolean(accountReadyBody)
    }
    if (isStudentDashboardReady(mergedProfile)) {
      mergedProfile.accountReady = true
    }

    const removedOnline = getRemovedOnlineCourseIds(
      prev.activeOnlineCourses || [],
      onlineIds,
      existing.purchasedCourses || []
    )

    const progressCollection = await getCollection('userProgress')

    let nextEnrolled = [...(existing.enrolledCourses || [])]
    if (removedOnline.length > 0) {
      const removedSet = new Set(removedOnline)
      nextEnrolled = nextEnrolled.filter((id) => !removedSet.has(id))
    }
    if (onlineIds.length > 0) {
      const merged = new Set(nextEnrolled)
      onlineIds.forEach((id) => merged.add(id))
      nextEnrolled = [...merged]
    }

    const dbUpdate = {
      $set: {
        studentProfile: mergedProfile,
        enrolledCourses: nextEnrolled,
        updatedAt: new Date(),
      },
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      dbUpdate
    )

    if (removedOnline.length > 0) {
      await progressCollection.deleteMany({
        userId: new ObjectId(studentId),
        courseId: { $in: removedOnline },
      })
    }

    for (const courseId of onlineIds) {
      if (flattenCourseLessons(courseId).length === 0) continue
      const existingProgress = await progressCollection.findOne({
        userId: new ObjectId(studentId),
        courseId,
      })
      if (!existingProgress) {
        await progressCollection.insertOne({
          userId: new ObjectId(studentId),
          courseId,
          enrolledAt: new Date(),
          completedLessons: [],
          completedQuizzes: {},
          completedPracticeTasks: [],
          currentModule: 0,
          currentLesson: 0,
          overallProgress: 0,
          certificates: [],
        })
      }
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    let updatedStudent = await usersCollection.findOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      { projection: { password: 0 } }
    )
    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found after update' }, { status: 404 })
    }

    if (CRM_BASE_URL) {
      try {
        const crmStudent = await syncStudentToCrm(updatedStudent)
        if (crmStudent?.id) {
          await usersCollection.updateOne(
            { _id: new ObjectId(studentId) },
            {
              $set: {
                'studentProfile.crmStudentId': String(crmStudent.id),
                'studentProfile.crmShortId': String(crmStudent.short_id || ''),
                updatedAt: new Date(),
              },
            }
          )
        }
        updatedStudent = await usersCollection.findOne(
          { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
          { projection: { password: 0 } }
        )
        await ensureCrmRegularLessons(
          {
            ...updatedStudent,
            studentProfile: {
              ...(updatedStudent?.studentProfile || {}),
              crmStudentId: String(crmStudent?.id || updatedStudent?.studentProfile?.crmStudentId || ''),
            },
          },
          crmStudent
        )
      } catch (crmError) {
        return NextResponse.json(
          {
            error: 'Локальні налаштування збережено, але синхронізація в CRM не вдалась',
            detail: String(crmError?.message || crmError),
          },
          { status: 502 }
        )
      }
    }

    const finalStudent = await usersCollection.findOne(
      { _id: new ObjectId(studentId), role: { $ne: 'admin' } },
      { projection: { password: 0 } }
    )

    return NextResponse.json(
      {
        ok: true,
        studentProfile: finalStudent?.studentProfile || mergedProfile,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Admin students PATCH error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
