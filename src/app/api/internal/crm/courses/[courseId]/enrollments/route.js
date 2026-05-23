import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { listCourseEnrollments } from '@/lib/crmLmsSync'

export async function GET(request, { params }) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  const { courseId } = await params
  try {
    const enrollments = await listCourseEnrollments(courseId)
    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error('CRM enrollments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
