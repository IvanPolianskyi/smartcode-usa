import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { unlinkTeacherByCrmStaffId } from '@/lib/teacherService'

export async function POST(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const { crmStaffId } = await params
    let smartcodeUserId = ''
    try {
      const body = await request.json()
      smartcodeUserId = String(body?.smartcodeUserId || body?.smartcode_user_id || '').trim()
    } catch {
      smartcodeUserId = ''
    }
    const result = await unlinkTeacherByCrmStaffId(crmStaffId, { smartcodeUserId })
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('CRM unlink teacher:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
