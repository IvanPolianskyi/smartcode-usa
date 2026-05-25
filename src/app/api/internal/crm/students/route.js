import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { listLmsStudentsForCrm } from '@/lib/crmLmsSync'

/** Список учнів LMS для привʼязки в CRM (пагінація + пошук). */
export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const linkedOnly = searchParams.get('linked_only') === 'true'
    const unlinkedOnly = searchParams.get('unlinked_only') === 'true'
    const userIds = searchParams.get('user_ids') || ''
    const skip = Math.max(0, Number(searchParams.get('skip') || 0))
    const limit = Math.min(Math.max(1, Number(searchParams.get('limit') || 40)), 100)

    const result = await listLmsStudentsForCrm({
      search,
      linkedOnly,
      unlinkedOnly,
      userIds,
      skip,
      limit,
    })
    return NextResponse.json(result)
  } catch (error) {
    console.error('CRM list LMS students:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
