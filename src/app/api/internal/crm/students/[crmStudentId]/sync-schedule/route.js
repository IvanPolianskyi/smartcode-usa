import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { syncScheduleFromCrmStudentId } from '@/lib/crmStudentSchedulePull'

/** CRM → LMS: оновити розклад, викладача, zoom і курси після змін у smartcode_manager. */
export async function POST(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const { crmStudentId } = await params
    const result = await syncScheduleFromCrmStudentId(crmStudentId)
    const status = result.ok ? 200 : 404
    return NextResponse.json(result, { status })
  } catch (error) {
    console.error('CRM sync-schedule:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
