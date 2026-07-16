import { NextResponse } from 'next/server'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { upsertUserFromCrm } from '@/lib/crmLmsSync'

/**
 * Створити / оновити LMS-акаунт учня + новий пароль + magic login link.
 * Body: ті самі поля upsert + issueCredentials (default true).
 */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError
  try {
    const body = await request.json()
    const result = await upsertUserFromCrm({
      ...body,
      issueCredentials: body.issueCredentials !== false,
      createLoginLink: true,
      resetPassword: true,
    })
    if (!result.userId) {
      return NextResponse.json(result, { status: 400 })
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('CRM student credentials:', error)
    return NextResponse.json(
      { error: String(error.message || error) },
      { status: 400 }
    )
  }
}
