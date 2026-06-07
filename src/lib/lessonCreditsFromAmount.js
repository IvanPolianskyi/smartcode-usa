/**
 * Кількість уроків для зарахування — лише з поля форми (без привʼязки до ціни).
 */
export function resolveCreditedLessons(requestedLessons) {
  const lessons = Math.floor(Number(requestedLessons) || 0)
  if (!Number.isFinite(lessons) || lessons < 1) {
    return { creditedLessons: 0, error: 'invalid_lessons' }
  }
  return { creditedLessons: lessons }
}
