const RESERVE_TTL_MS = 15 * 60 * 1000

export function reservationCutoffDate(now = Date.now()) {
  return new Date(now - RESERVE_TTL_MS)
}

/** Слот доступний для бронювання (не зайнятий і без активного чужого резерву). */
export function buildAvailableSlotQuery({ courseId, lessonFormat, day, time, reservedBy }) {
  const cutoff = reservationCutoffDate()
  const query = {
    isBooked: false,
    $or: [
      { reservedAt: { $exists: false } },
      { reservedAt: null },
      { reservedAt: { $lt: cutoff } },
    ],
  }

  if (courseId) query.courseId = courseId
  if (lessonFormat) query.lessonFormat = lessonFormat
  if (day) query.day = day
  if (time) query.time = time

  if (reservedBy) {
    query.$or.push({ reservedBy: String(reservedBy) })
  }

  return query
}

/**
 * Тимчасово резервує слот на 15 хв під час переходу на оплату.
 * @returns {Promise<object|null>} оновлений слот або null
 */
export async function reserveLessonSlot(slotsCollection, {
  courseId,
  lessonFormat,
  day,
  time,
  reservedBy,
}) {
  const query = buildAvailableSlotQuery({
    courseId,
    lessonFormat,
    day,
    time,
    reservedBy,
  })

  const result = await slotsCollection.findOneAndUpdate(
    query,
    {
      $set: {
        reservedAt: new Date(),
        reservedBy: String(reservedBy),
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  )

  return result || null
}

/** Фінальне бронювання після успішної оплати. */
export async function bookLessonSlot(slotsCollection, {
  courseId,
  lessonFormat,
  day,
  time,
  bookedBy,
}) {
  const dayRegex = new RegExp(`^${day}$`, 'i')
  const result = await slotsCollection.findOneAndUpdate(
    {
      courseId,
      lessonFormat,
      day: dayRegex,
      time,
      isBooked: false,
    },
    {
      $set: {
        isBooked: true,
        bookedBy,
        updatedAt: new Date(),
      },
      $unset: {
        reservedAt: '',
        reservedBy: '',
      },
    },
    { returnDocument: 'after' }
  )

  return result || null
}
