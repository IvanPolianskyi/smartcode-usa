import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { upsertUserFromCrm } from '@/lib/crmLmsSync'

export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const result = await upsertUserFromCrm(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error('CRM upsert student:', error)
    return NextResponse.json({ error: String(error.message || error) }, { status: 400 })
  }
}
