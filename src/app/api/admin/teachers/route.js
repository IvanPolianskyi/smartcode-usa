import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/requireAdmin'
import { fetchCrmTeachers } from '@/lib/crmStudentSchedulePull'
import {
  linkTeacherAccount,
  listLinkedTeachers,
  unlinkTeacherAccount,
} from '@/lib/teacherService'

export async function GET() {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  try {
    let crmTeachers = []
    let crmTeachersError = null
    try {
      crmTeachers = await fetchCrmTeachers()
    } catch (error) {
      crmTeachersError = error?.message || 'Failed to load CRM teachers'
    }

    const teachers = await listLinkedTeachers()
    return NextResponse.json({
      teachers,
      crmTeachers,
      crmTeachersError,
    })
  } catch (error) {
    console.error('GET /api/admin/teachers', error)
    return NextResponse.json({ error: 'Failed to load teachers' }, { status: 500 })
  }
}

export async function POST(request) {
  const auth = await requireAdmin()
  if (auth.error) return auth.error

  try {
    const body = await request.json()
    const action = String(body.action || 'link').trim()

    if (action === 'unlink') {
      await unlinkTeacherAccount(body.userId)
      return NextResponse.json({ ok: true })
    }

    const result = await linkTeacherAccount({
      email: body.email,
      crmStaffId: body.crmStaffId,
      crmStaffName: body.crmStaffName,
      name: body.name,
      password: body.password,
      adminId: auth.userId,
      createIfMissing: body.createIfMissing !== false,
    })

    return NextResponse.json({ teacher: result }, { status: result.created ? 201 : 200 })
  } catch (error) {
    console.error('POST /api/admin/teachers', error)
    return NextResponse.json(
      { error: error.message || 'Failed to link teacher' },
      { status: 400 }
    )
  }
}
