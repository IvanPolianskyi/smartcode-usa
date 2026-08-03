import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { assertCrmInternalRequest } from '@/lib/crmInternalAuth'
import { getCollection } from '@/lib/mongodb'
import {
  isValidCertificateTrack,
  publicCertificatePath,
  certificateTrackMeta,
} from '@/lib/courseCertificates'

/**
 * Видати сертифікат завершення курсу з CRM.
 * Body: { crmStudentId, studentName, track: 'basic-36'|'advanced-92', directionLabel?, lmsUserId? }
 */
export async function POST(request) {
  const authError = assertCrmInternalRequest(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const crmStudentId = String(body.crmStudentId || '').trim()
    const studentName = String(body.studentName || '').trim()
    const track = String(body.track || '').trim()
    const directionLabel = String(body.directionLabel || '').trim() || null
    const lmsUserId = String(body.lmsUserId || '').trim() || null
    const issuedBy = String(body.issuedBy || '').trim() || null

    if (!crmStudentId || !studentName) {
      return NextResponse.json(
        { error: 'crmStudentId and studentName are required' },
        { status: 400 }
      )
    }
    if (!isValidCertificateTrack(track)) {
      return NextResponse.json(
        { error: 'track must be basic-36 or advanced-92' },
        { status: 400 }
      )
    }

    const id = new ObjectId().toString()
    const issuedAt = new Date()
    const meta = certificateTrackMeta(track)
    const doc = {
      id,
      track,
      studentName,
      directionLabel,
      crmStudentId,
      lmsUserId,
      issuedBy,
      issuedAt,
      createdAt: issuedAt,
    }

    const col = await getCollection('courseCertificates')
    await col.insertOne(doc)

    return NextResponse.json(
      {
        ok: true,
        id,
        track,
        trackTitle: meta.title,
        studentName,
        directionLabel,
        issuedAt: issuedAt.toISOString(),
        publicPath: publicCertificatePath(id),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('CRM certificate issue error:', error)
    return NextResponse.json(
      { error: String(error.message || error) },
      { status: 500 }
    )
  }
}
