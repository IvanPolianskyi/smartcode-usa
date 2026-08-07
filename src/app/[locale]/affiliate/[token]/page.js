import { notFound } from 'next/navigation'
import { fetchAffiliateCabinet } from '@/lib/crmAffiliateClient'
import AffiliateCabinet from './AffiliateCabinet'

async function loadCabinet(token) {
  if (!token || token.length < 16) return null
  try {
    return await fetchAffiliateCabinet(token)
  } catch (error) {
    if (error?.status === 404 || error?.status === 403) return null
    console.error('affiliate cabinet load error:', error?.detail || error)
    throw error
  }
}

export async function generateMetadata() {
  return {
    title: 'Кабінет партнера | SmartCode Academy',
    robots: { index: false, follow: false },
  }
}

export default async function AffiliateCabinetPage({ params }) {
  const { token } = await params
  const cleanToken = String(token || '').trim()

  let cabinet = null
  try {
    cabinet = await loadCabinet(cleanToken)
  } catch {
    cabinet = null
  }
  if (!cabinet) notFound()

  return <AffiliateCabinet token={cleanToken} initialCabinet={cabinet} />
}
