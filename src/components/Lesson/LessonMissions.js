'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Circle, Clock, Sparkles, Zap } from 'lucide-react'
import Pip from '@/components/Mascot/Pip'
import { XP } from '@/lib/lessonGamification'
import styles from './LessonMissions.module.css'

const storageKey = (courseId, lessonId) =>
  `smartcode:missions:${courseId}:${lessonId}`

/**
 * Per-lesson mission state, persisted in the browser.
 *
 * Missions are deliberately local-only: they are a "did I actually do this in
 * Studio" nudge, not an assessment. Server progress still comes from the
 * practice check and the quiz, so a cleared browser costs a student nothing
 * they cannot re-tick in seconds.
 */
export function useMissionState(courseId, lessonId, missionIds) {
  const [done, setDone] = useState(() => new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(false)
    let restored = new Set()
    try {
      const raw = window.localStorage.getItem(storageKey(courseId, lessonId))
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          const valid = new Set(missionIds)
          restored = new Set(parsed.filter((id) => valid.has(id)))
        }
      }
    } catch {
      // Private mode, disabled storage, corrupt value - all fine, start empty.
    }
    setDone(restored)
    setHydrated(true)
    // missionIds is derived from lesson content, so lessonId covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, lessonId])

  const toggle = useCallback(
    (id) => {
      setDone((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        try {
          window.localStorage.setItem(
            storageKey(courseId, lessonId),
            JSON.stringify([...next])
          )
        } catch {
          // Nothing to do - the UI still works for this session.
        }
        return next
      })
    },
    [courseId, lessonId]
  )

  const reset = useCallback(() => {
    setDone(new Set())
    try {
      window.localStorage.removeItem(storageKey(courseId, lessonId))
    } catch {
      // ignore
    }
  }, [courseId, lessonId])

  return { done, toggle, reset, hydrated }
}

/** One checkable mission, rendered inline at the end of a theory section. */
export function MissionCard({ mission, index, checked, onToggle, labels }) {
  return (
    <div
      className={`${styles.mission} ${checked ? styles.missionDone : ''}`}
      data-mission-id={mission.id}
    >
      <button
        type="button"
        className={styles.missionToggle}
        onClick={() => onToggle(mission.id)}
        aria-pressed={checked}
        aria-label={
          checked ? labels.markUndone : labels.markDone
        }
      >
        {checked ? <CheckCircle2 size={22} /> : <Circle size={22} />}
      </button>

      <div className={styles.missionBody}>
        <div className={styles.missionMeta}>
          <span className={styles.missionLabel}>
            {labels.missionN(index + 1)}
          </span>
          {mission.minutes ? (
            <span className={styles.missionChip}>
              <Clock size={12} />
              {labels.minutes(mission.minutes)}
            </span>
          ) : null}
          <span className={`${styles.missionChip} ${styles.missionChipXp}`}>
            <Zap size={12} />
            {XP.MISSION} XP
          </span>
        </div>
        <div
          className={styles.missionText}
          dangerouslySetInnerHTML={{ __html: mission.html }}
        />
      </div>
    </div>
  )
}

/** The lesson-level progress readout that sits above the theory sections. */
export function MissionProgress({
  total,
  doneCount,
  xp,
  maxXp,
  onReset,
  labels,
}) {
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0
  const allDone = total > 0 && doneCount >= total

  const segments = useMemo(
    () => Array.from({ length: total }, (_, i) => i < doneCount),
    [total, doneCount]
  )

  if (total === 0) return null

  return (
    <section
      className={`${styles.tracker} ${allDone ? styles.trackerComplete : ''}`}
      aria-label={labels.title}
    >
      <div className={styles.trackerHead}>
        <div>
          <h2 className={styles.trackerTitle}>
            <Sparkles size={18} />
            {labels.title}
          </h2>
          <p className={styles.trackerSub}>
            {allDone ? labels.allDone : labels.subtitle(doneCount, total)}
          </p>
        </div>
        <div className={styles.trackerXp}>
          <Zap size={16} />
          <span className={styles.trackerXpValue}>{xp}</span>
          <span className={styles.trackerXpMax}>/ {maxXp} XP</span>
        </div>
      </div>

      <div
        className={styles.segments}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {segments.map((filled, i) => (
          <span
            key={i}
            className={`${styles.segment} ${filled ? styles.segmentFilled : ''}`}
          />
        ))}
      </div>

      {allDone ? (
        <div className={styles.trackerCelebrate}>
          <Pip mood="cheer" size={44} label="Pip cheering" />
          <p className={styles.trackerBonus}>
            <CheckCircle2 size={14} />
            {labels.bonus(XP.ALL_MISSIONS_BONUS)}
          </p>
        </div>
      ) : null}

      {doneCount > 0 ? (
        <button type="button" className={styles.trackerReset} onClick={onReset}>
          {labels.reset}
        </button>
      ) : null}
    </section>
  )
}
