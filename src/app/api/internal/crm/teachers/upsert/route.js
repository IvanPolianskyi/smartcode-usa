import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { linkTeacherAccount } from '@/lib/teacherService'

/** Привʼязати / створити LMS-акаунт викладача з CRM. */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const result = await linkTeacherAccount({
      email: body.email || body.smartcodeEmail,
      crmStaffId: body.crmStaffId || body.crm_staff_id,
      crmStaffName: body.crmStaffName || body.crm_staff_name || body.fullName || '',
      name: body.name || body.fullName || body.full_name || '',
      password: body.password || '',
      adminId: body.adminId || body.linkedBy || 'crm',
      createIfMissing: body.createIfMissing !== false && body.create_if_missing !== false,
    })
    return NextResponse.json({
      ok: true,
      smartcodeUserId: result.id,
      email: result.email,
      name: result.name,
      created: result.created,
      tempPassword: result.tempPassword,
      teacherProfile: result.teacherProfile,
    })
  } catch (error) {
    console.error('CRM upsert teacher:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
