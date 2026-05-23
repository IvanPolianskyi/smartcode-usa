import { NextResponse } from 'next/server'
import { getIntegrationApiKey } from '@/lib/integrationApiKey'

export function assertCrmInternalRequest(request) {
  const key = getIntegrationApiKey()
  if (!key) {
    return NextResponse.json(
      { error: 'JWT_SECRET не налаштовано на сервері LMS' },
      { status: 503 }
    )
  }
  const provided = request.headers.get('x-api-key') || ''
  if (provided !== key) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
