import { NextResponse } from 'next/server'
import { CrmCabinetError, createAffiliateGroup } from '@/lib/crmAffiliateClient'

export async function POST(request, { params }) {
  const { token } = await params
  const body = await request.json().catch(() => ({}))
  const title = String(body?.title || '').trim()
  if (!title) {
    return NextResponse.json({ error: 'Вкажіть назву групи' }, { status: 400 })
  }

  try {
    const data = await createAffiliateGroup(String(token || ''), {
      title,
      platform: String(body?.platform || 'telegram').trim() || 'telegram',
      url: String(body?.url || '').trim() || null,
      city: String(body?.city || '').trim() || null,
      niche: String(body?.niche || '').trim() || null,
      size_estimate: String(body?.size_estimate || '').trim() || null,
      status: String(body?.status || 'testing').trim() || 'testing',
      notes: String(body?.notes || '').trim() || null,
    })
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof CrmCabinetError) {
      return NextResponse.json({ error: error.detail }, { status: error.status })
    }
    console.error('affiliate group create proxy:', error)
    return NextResponse.json({ error: 'Не вдалося зберегти групу' }, { status: 502 })
  }
}
