import { NextResponse } from 'next/server'
import { requireTeacher, getTeacherCrmStaffId } from '@/lib/requireTeacher'
import { fetchTeacherNextLesson } from '@/lib/crmTeacherStats'

export async function GET() {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const staffId = getTeacherCrmStaffId(auth.user)
    if (!auth.isAdmin && !staffId) {
      return NextResponse.json(
        { error: 'Teacher is not linked to CRM staff', nextLesson: null },
        { status: 400 }
      )
    }

    if (!staffId) {
      return NextResponse.json({ nextLesson: null })
    }

    const result = await fetchTeacherNextLesson(staffId)
    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/teacher/next-lesson', error)
    return NextResponse.json({ error: 'Failed to load next lesson' }, { status: 500 })
  }
}
