import { NextResponse } from 'next/server'
import { requireTeacher, getTeacherCrmStaffId } from '@/lib/requireTeacher'
import {
  findStudentByCodeForTeacher,
  getStudentProgressDetail,
  mutateStudentProgress,
} from '@/lib/teacherService'

export async function GET(_request, { params }) {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const { code } = await params
    const staffId = getTeacherCrmStaffId(auth.user)
    const student = await findStudentByCodeForTeacher(code, staffId, {
      isAdmin: auth.isAdmin,
    })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const progress = await getStudentProgressDetail(student)
    return NextResponse.json({
      code: String(student.studentProfile?.crmShortId || code),
      courseIds: [
        ...new Set([
          ...(student.studentProfile?.activeOnlineCourses || []),
          ...(student.purchasedCourses || []),
        ]),
      ],
      progress,
      unlockedByCourse: Object.fromEntries(
        Object.entries(student.studentProfile?.courseAccess || {}).map(([courseId, access]) => [
          courseId,
          {
            fullAccess: Boolean(access?.fullAccess),
            unlockedLessons: access?.unlockedLessons || [],
          },
        ])
      ),
    })
  } catch (error) {
    console.error('GET /api/teacher/students/[code]/progress', error)
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 })
  }
}

export async function POST(request, { params }) {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const { code } = await params
    const body = await request.json()
    const action = String(body.action || '').trim()
    const courseId = String(body.courseId || '').trim()
    const lessonId = body.lessonId ? String(body.lessonId).trim() : null

    const staffId = getTeacherCrmStaffId(auth.user)
    const student = await findStudentByCodeForTeacher(code, staffId, {
      isAdmin: auth.isAdmin,
    })
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const result = await mutateStudentProgress(student, { action, courseId, lessonId })
    const progress = await getStudentProgressDetail(student)
    return NextResponse.json({ ...result, progress })
  } catch (error) {
    console.error('POST /api/teacher/students/[code]/progress', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update progress' },
      { status: 400 }
    )
  }
}
