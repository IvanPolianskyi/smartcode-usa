import { NextResponse } from 'next/server'
import { CrmCabinetError, saveAffiliateSocials } from '@/lib/crmAffiliateClient'

/** Проксі кабінету афіліата → CRM: ключ лишається на сервері. */
export async function PUT(request, { params }) {
  const { token } = await params
  const body = await request.json().catch(() => ({}))
  const socials = Array.isArray(body?.socials) ? body.socials : []

  try {
    return NextResponse.json(await saveAffiliateSocials(String(token || ''), socials))
  } catch (error) {
    if (error instanceof CrmCabinetError) {
      return NextResponse.json({ error: error.detail }, { status: error.status })
    }
    console.error('affiliate socials proxy:', error)
    return NextResponse.json({ error: 'Не вдалося зберегти соцмережі' }, { status: 502 })
  }
}
