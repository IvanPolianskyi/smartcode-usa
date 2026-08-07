import { NextResponse } from 'next/server'
import { CrmCabinetError, reportAffiliateSocialPost } from '@/lib/crmAffiliateClient'

export async function POST(request, { params }) {
  const { token } = await params
  const body = await request.json().catch(() => ({}))

  const url = String(body?.url || '').trim()
  if (!url) {
    return NextResponse.json({ error: 'Вкажіть посилання на допис' }, { status: 400 })
  }
  const views = Number(body?.views)
  if (!Number.isFinite(views) || views < 0) {
    return NextResponse.json({ error: 'Вкажіть кількість переглядів' }, { status: 400 })
  }

  try {
    const data = await reportAffiliateSocialPost(String(token || ''), {
      url,
      platform: String(body?.platform || 'other').trim() || 'other',
      title: String(body?.title || '').trim() || null,
      views: Math.floor(views),
    })
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof CrmCabinetError) {
      return NextResponse.json({ error: error.detail }, { status: error.status })
    }
    console.error('affiliate social-post proxy:', error)
    return NextResponse.json({ error: 'Не вдалося зберегти допис' }, { status: 502 })
  }
}
