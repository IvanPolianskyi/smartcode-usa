import { NextResponse } from 'next/server'
import { requireTeacher, getTeacherCrmStaffId } from '@/lib/requireTeacher'
import { fetchTeacherSalaryBatchTotals } from '@/lib/crmTeacherStats'

export async function GET() {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const staffId = getTeacherCrmStaffId(auth.user)
    if (!auth.isAdmin && !staffId) {
      return NextResponse.json(
        { error: 'Teacher is not linked to CRM staff', totals: null },
        { status: 400 }
      )
    }

    if (!staffId) {
      return NextResponse.json({ totals: null })
    }

    const result = await fetchTeacherSalaryBatchTotals(staffId)
    return NextResponse.json({
      totals: result.totals,
      crmError: result.crmError || null,
    })
  } catch (error) {
    console.error('GET /api/teacher/salary-batch', error)
    return NextResponse.json({ error: 'Failed to load salary batch' }, { status: 500 })
  }
}
