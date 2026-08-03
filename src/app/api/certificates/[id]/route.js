import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { certificateTrackMeta } from '@/lib/courseCertificates'

/** Публічні дані сертифіката (без email / телефону). */
export async function GET(_request, { params }) {
  try {
    const { id: rawId } = await params
    const id = String(rawId || '').trim()
    if (!id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const col = await getCollection('courseCertificates')
    const doc = await col.findOne({ id })
    if (!doc) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const meta = certificateTrackMeta(doc.track)
    return NextResponse.json({
      id: doc.id,
      studentName: doc.studentName || 'Учень',
      track: doc.track,
      trackLabel: meta?.label || doc.track,
      lessonsLabel: meta?.lessonsLabel || '',
      trackTitle: meta?.title || doc.track,
      directionLabel: doc.directionLabel || null,
      issuedAt: doc.issuedAt
        ? new Date(doc.issuedAt).toISOString()
        : null,
    })
  } catch (error) {
    console.error('Public certificate GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
