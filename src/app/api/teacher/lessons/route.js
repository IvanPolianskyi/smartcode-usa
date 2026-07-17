import { NextResponse } from 'next/server'
import { requireTeacher, getTeacherCrmStaffId } from '@/lib/requireTeacher'
import { fetchTeacherLessonHistory } from '@/lib/crmTeacherStats'

export async function GET(request) {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const staffId = getTeacherCrmStaffId(auth.user)
    if (!auth.isAdmin && !staffId) {
      return NextResponse.json(
        { error: 'Teacher is not linked to CRM staff', lessons: [], totals: null },
        { status: 400 }
      )
    }

    if (!staffId) {
      return NextResponse.json({ lessons: [], totals: null })
    }

    const { searchParams } = new URL(request.url)
    const limitRaw = Number(searchParams.get('limit'))
    const limit = Number.isFinite(limitRaw) ? limitRaw : 200

    const result = await fetchTeacherLessonHistory(staffId, { limit })
    return NextResponse.json({
      lessons: result.lessons,
      totals: result.totals,
      crmError: result.crmError || null,
    })
  } catch (error) {
    console.error('GET /api/teacher/lessons', error)
    return NextResponse.json({ error: 'Failed to load lesson history' }, { status: 500 })
  }
}
