/** Типи сертифікатів завершення курсу (CRM → публічна сторінка). */

export const CERTIFICATE_TRACKS = {
  'basic-36': {
    id: 'basic-36',
    label: 'Базовий курс',
    lessonsLabel: '36 уроків',
    title: 'Базовий курс · 36 уроків',
  },
  'advanced-92': {
    id: 'advanced-92',
    label: 'Поглиблений курс',
    lessonsLabel: '92 уроки',
    title: 'Поглиблений курс · 92 уроки',
  },
}

export function isValidCertificateTrack(track) {
  return Boolean(track && CERTIFICATE_TRACKS[track])
}

export function certificateTrackMeta(track) {
  return CERTIFICATE_TRACKS[track] || null
}

export function publicCertificatePath(id) {
  return `/certificate/${id}`
}
