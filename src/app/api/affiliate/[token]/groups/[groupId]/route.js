import { NextResponse } from 'next/server'
import {
  CrmCabinetError,
  deleteAffiliateGroup,
  updateAffiliateGroup,
} from '@/lib/crmAffiliateClient'

export async function PATCH(request, { params }) {
  const { token, groupId } = await params
  const body = await request.json().catch(() => ({}))
  const title = String(body?.title || '').trim()
  if (!title) {
    return NextResponse.json({ error: 'Вкажіть назву групи' }, { status: 400 })
  }

  try {
    const data = await updateAffiliateGroup(String(token || ''), String(groupId || ''), {
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
    console.error('affiliate group update proxy:', error)
    return NextResponse.json({ error: 'Не вдалося оновити групу' }, { status: 502 })
  }
}

export async function DELETE(_request, { params }) {
  const { token, groupId } = await params
  try {
    const data = await deleteAffiliateGroup(String(token || ''), String(groupId || ''))
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof CrmCabinetError) {
      return NextResponse.json({ error: error.detail }, { status: error.status })
    }
    console.error('affiliate group delete proxy:', error)
    return NextResponse.json({ error: 'Не вдалося видалити групу' }, { status: 502 })
  }
}
