import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { unlinkUserFromCrm } from '@/lib/crmLmsSync'

export async function POST(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const { crmStudentId } = await params
    let smartcodeUserId = ''
    try {
      const body = await request.json()
      smartcodeUserId = String(body?.smartcodeUserId || body?.smartcode_user_id || '').trim()
    } catch {
      smartcodeUserId = ''
    }
    const result = await unlinkUserFromCrm({
      crmStudentId,
      smartcodeUserId,
    })
    return NextResponse.json({ ok: true, ...result })
  } catch (error) {
    console.error('CRM unlink student:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
