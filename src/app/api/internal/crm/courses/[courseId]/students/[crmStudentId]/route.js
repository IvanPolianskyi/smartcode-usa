import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import {
  grantCourseAccessForCrmStudent,
  revokeCourseAccessForCrmStudent,
  upsertUserFromCrm,
} from '@/lib/crmLmsSync'

export async function PUT(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  const { courseId, crmStudentId } = await params
  try {
    let body = {}
    try {
      body = await request.json()
    } catch {
      body = {}
    }
    const enabled = body.enabled !== false
    const smartcodeUserId = String(
      body.smartcodeUserId || body.smartcode_user_id || ''
    ).trim()
    const email = String(body.email || '').trim()
    await upsertUserFromCrm({
      crmStudentId,
      smartcodeUserId: smartcodeUserId || undefined,
      email: email || undefined,
    }).catch(() => {})
    const result = await grantCourseAccessForCrmStudent(crmStudentId, courseId, {
      enabled,
      smartcodeUserId,
      email,
    })
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}

export async function DELETE(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  const { courseId, crmStudentId } = await params
  try {
    const result = await revokeCourseAccessForCrmStudent(crmStudentId, courseId)
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
