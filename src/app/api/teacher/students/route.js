import { NextResponse } from 'next/server'
import { requireTeacher, getTeacherCrmStaffId } from '@/lib/requireTeacher'
import { listTeacherStudents } from '@/lib/teacherService'

export async function GET() {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const staffId = getTeacherCrmStaffId(auth.user)
    if (!auth.isAdmin && !staffId) {
      return NextResponse.json(
        { error: 'Teacher is not linked to CRM staff', students: [] },
        { status: 400 }
      )
    }

    const result = await listTeacherStudents(staffId, { isAdmin: auth.isAdmin })
    return NextResponse.json({
      students: result.students,
      teacherStats: result.teacherStats,
      crmError: result.crmError || null,
    })
  } catch (error) {
    console.error('GET /api/teacher/students', error)
    return NextResponse.json({ error: 'Failed to load students' }, { status: 500 })
  }
}
