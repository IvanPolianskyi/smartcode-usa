/**
 * Gamification layer for lesson content.
 *
 * Lesson authors do not hand-write missions. Every lesson already ends most
 * theory sections with a time-boxed call to action ("Do now (3 min): ..."),
 * so we parse those out and turn them into interactive, checkable missions.
 * That means the whole 92-lesson curriculum is gamified without touching
 * lesson data - and any new lesson gets it for free as long as it keeps the
 * house style.
 */

/** Matches "Do now (3 min):", "Do now:", "Do this now:", "Try it now (Optional):" */
const MISSION_RE =
  /^\*\*(Do now|Do this now|Try it now|Try now)\s*(?:\(([^)]*)\))?\s*:?\*\*:?\s*/i

/**
 * Lesson copy writes missions as a continuation of the label ("Do now: open
 * Studio..."). Once the label is stripped for the mission card, the sentence
 * has to stand on its own, so give it a capital - but only when it starts with
 * a plain letter, never when it opens with markdown like **bold** or `code`.
 */
function sentenceCase(text) {
  if (!text) return text
  const first = text[0]
  if (first < 'a' || first > 'z') return text
  return first.toUpperCase() + text.slice(1)
}

/** Pulls "3" out of "3 min" / "2-3 min" (takes the upper bound). */
function parseMinutes(label) {
  if (!label) return null
  const nums = String(label).match(/\d+/g)
  if (!nums) return null
  return Number(nums[nums.length - 1])
}

/**
 * Split a theory section into its prose body and its trailing mission, if any.
 * The mission is nearly always the last paragraph of a section.
 *
 * @returns {{ body: string, mission: null | { minutes: number|null, text: string } }}
 */
export function splitSectionMission(content) {
  if (!content) return { body: '', mission: null }
  const text = String(content)
  const blocks = text.split(/\n{2,}/)

  for (let i = blocks.length - 1; i >= 0; i -= 1) {
    const block = blocks[i].trim()
    const match = block.match(MISSION_RE)
    if (!match) continue
    // Only treat it as a mission when it is the final block - a "Do now" in the
    // middle of a section is part of the explanation, not the section's task.
    if (i !== blocks.length - 1) break
    const body = blocks.slice(0, i).join('\n\n').trim()
    const missionText = block.replace(MISSION_RE, '').trim()
    if (!missionText) break
    return {
      body,
      mission: {
        minutes: parseMinutes(match[2]),
        text: sentenceCase(missionText),
      },
    }
  }

  return { body: text, mission: null }
}

/**
 * Every mission in a lesson, in reading order, with stable ids.
 * Ids are index-based so they stay valid across content edits that only touch
 * wording - a reworded mission keeps its checked state, a reordered one does not.
 */
export function extractMissions(lesson) {
  const sections = lesson?.theory?.sections
  if (!Array.isArray(sections)) return []
  const missions = []
  sections.forEach((section, index) => {
    const { mission } = splitSectionMission(section?.content)
    if (!mission) return
    missions.push({
      id: `m${index}`,
      sectionIndex: index,
      sectionTitle: section?.title || '',
      minutes: mission.minutes,
      text: mission.text,
    })
  })
  return missions
}

/** XP on offer in a single lesson. */
export const XP = {
  MISSION: 10,
  ALL_MISSIONS_BONUS: 25,
  PRACTICE: 50,
  QUIZ_PASS: 60,
  PERFECT_QUIZ_BONUS: 40,
}

/** The most XP a lesson can yield, used for the "x / y XP" readout. */
export function maxLessonXp(missionCount) {
  return (
    missionCount * XP.MISSION +
    (missionCount > 0 ? XP.ALL_MISSIONS_BONUS : 0) +
    XP.PRACTICE +
    XP.QUIZ_PASS +
    XP.PERFECT_QUIZ_BONUS
  )
}

/**
 * XP actually earned so far in this lesson.
 * @param {object} state
 * @param {number} state.missionsDone
 * @param {number} state.missionsTotal
 * @param {boolean} state.practiceDone
 * @param {number|null} state.quizScore  0-100, or null if not taken
 * @param {number} state.passingScore
 */
export function computeLessonXp({
  missionsDone = 0,
  missionsTotal = 0,
  practiceDone = false,
  quizScore = null,
  passingScore = 70,
}) {
  let xp = missionsDone * XP.MISSION
  if (missionsTotal > 0 && missionsDone >= missionsTotal) {
    xp += XP.ALL_MISSIONS_BONUS
  }
  if (practiceDone) xp += XP.PRACTICE
  if (quizScore !== null && quizScore >= passingScore) {
    xp += XP.QUIZ_PASS
    if (quizScore >= 100) xp += XP.PERFECT_QUIZ_BONUS
  }
  return xp
}

/**
 * Ranks are keyed off completed lessons rather than XP so that the title a
 * student sees matches how far through the course they actually are.
 */
const RANKS = [
  { at: 0, key: 'newBuilder', icon: '🧱' },
  { at: 4, key: 'apprentice', icon: '🔨' },
  { at: 12, key: 'scripter', icon: '📜' },
  { at: 24, key: 'systemsBuilder', icon: '⚙️' },
  { at: 40, key: 'gameDesigner', icon: '🎯' },
  { at: 60, key: 'engineer', icon: '🚀' },
  { at: 80, key: 'shipper', icon: '🏆' },
]

export function getRank(completedLessons = 0) {
  let rank = RANKS[0]
  let next = null
  for (let i = 0; i < RANKS.length; i += 1) {
    if (completedLessons >= RANKS[i].at) {
      rank = RANKS[i]
      next = RANKS[i + 1] || null
    }
  }
  return {
    ...rank,
    next,
    toNext: next ? Math.max(0, next.at - completedLessons) : 0,
  }
}

export { RANKS }
