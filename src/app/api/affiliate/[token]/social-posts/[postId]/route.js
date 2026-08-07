import { NextResponse } from 'next/server'
import { CrmCabinetError, deleteAffiliateSocialPost } from '@/lib/crmAffiliateClient'

export async function DELETE(request, { params }) {
  const { token, postId } = await params

  try {
    const data = await deleteAffiliateSocialPost(
      String(token || ''),
      String(postId || '')
    )
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof CrmCabinetError) {
      return NextResponse.json({ error: error.detail }, { status: error.status })
    }
    console.error('affiliate social-post delete proxy:', error)
    return NextResponse.json({ error: 'Не вдалося видалити допис' }, { status: 502 })
  }
}
