import { notFound } from 'next/navigation'
import { getCollection } from '@/lib/mongodb'
import { certificateTrackMeta } from '@/lib/courseCertificates'
import CertificateView from './CertificateView'

async function loadCertificate(id) {
  const col = await getCollection('courseCertificates')
  const doc = await col.findOne({ id })
  if (!doc) return null
  const meta = certificateTrackMeta(doc.track)
  return {
    id: doc.id,
    studentName: doc.studentName || 'Учень',
    track: doc.track,
    trackTitle: meta?.title || doc.track,
    directionLabel: doc.directionLabel || null,
    issuedAt: doc.issuedAt ? new Date(doc.issuedAt).toISOString() : null,
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  try {
    const cert = await loadCertificate(String(id || '').trim())
    if (!cert) {
      return { title: 'Сертифікат не знайдено | SmartCode' }
    }
    return {
      title: `Сертифікат — ${cert.studentName} | SmartCode Academy`,
      description: `${cert.studentName} завершив(ла) ${cert.trackTitle}`,
      robots: { index: false, follow: false },
    }
  } catch {
    return { title: 'Сертифікат | SmartCode Academy' }
  }
}

export default async function CertificatePage({ params }) {
  const { id } = await params
  let certificate = null
  try {
    certificate = await loadCertificate(String(id || '').trim())
  } catch (e) {
    console.error('Certificate page load error:', e)
  }
  if (!certificate) notFound()

  return <CertificateView certificate={certificate} />
}
