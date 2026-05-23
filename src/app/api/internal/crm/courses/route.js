import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { LMS_COURSE_CATALOG } from '@/lib/crmLmsSync'

export async function GET(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  return NextResponse.json({ courses: LMS_COURSE_CATALOG })
}
