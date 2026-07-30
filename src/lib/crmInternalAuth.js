import { createHash, timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'
import { getIntegrationApiKey } from '@/lib/integrationApiKey'

function secretsEqual(a, b) {
  const ha = createHash('sha256').update(String(a || '')).digest()
  const hb = createHash('sha256').update(String(b || '')).digest()
  return timingSafeEqual(ha, hb)
}

export function assertCrmInternalRequest(request) {
  const key = getIntegrationApiKey()
  if (!key) {
    return NextResponse.json(
      { error: 'CRM_LMS_SYNC_KEY / JWT_SECRET не налаштовано на сервері LMS' },
      { status: 503 }
    )
  }
  const provided = request.headers.get('x-api-key') || ''
  if (!secretsEqual(provided, key)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
