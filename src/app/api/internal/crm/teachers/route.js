import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { listLmsTeachersForCrm } from '@/lib/teacherService'

/** Список викладачів LMS для привʼязки в CRM. */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const { searchParams } = new URL(request.url)
    const result = await listLmsTeachersForCrm({
      search: searchParams.get('search') || '',
      linkedOnly: searchParams.get('linked_only') === 'true',
      unlinkedOnly: searchParams.get('unlinked_only') === 'true',
      staffIds: searchParams.get('staff_ids') || '',
      userIds: searchParams.get('user_ids') || '',
      skip: Math.max(0, Number(searchParams.get('skip') || 0)),
      limit: Math.min(Math.max(1, Number(searchParams.get('limit') || 40)), 100),
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error('CRM list LMS teachers:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
