'use client'

import React from 'react'
import styles from './Pip.module.css'

/**
 * Pip - the SmartCode Academy mascot.
 *
 * DESIGN NOTES (read before editing the geometry):
 *
 * Deliberately 2D vector, not 3D. Duolingo's Duo is flat vector art animated
 * with Rive, and that flatness is *why* it reads as character design rather
 * than as a render. A three.js character would cost a heavy dependency and
 * land in the generic "AI-generated 3D blob" register we are avoiding.
 *
 * The rules that keep it looking drawn rather than generated:
 *   1. Few shapes. Every shape must earn its place - no gradient meshes, no
 *      drop shadows, no ambient occlusion. Flat fills only.
 *   2. One darker tone for form (`shade`), one lighter for the belly. That is
 *      the entire shading model.
 *   3. Huge eyes, tiny mouth. Expression lives in the BROWS and the PUPIL
 *      OFFSET, not in the mouth. This is the single biggest lever on
 *      personality and the thing generated art usually gets wrong.
 *   4. Slight asymmetry. The two arms differ, the stud is a touch off-centre.
 *      Perfect symmetry is what makes a character look manufactured.
 *   5. No outlines anywhere. Shapes are separated by value, not by strokes.
 *
 * Pip is a brick-creature: a rounded cube with a single stud on its head, which
 * ties it to Roblox without borrowing any Roblox trade dress.
 */

const MOODS = {
  idle: { brow: 'neutral', mouth: 'smallSmile', pupils: [0, 0], anim: 'bob' },
  happy: { brow: 'raised', mouth: 'smile', pupils: [0, 0], anim: 'bob' },
  cheer: { brow: 'raised', mouth: 'open', pupils: [0, -1.5], anim: 'cheer' },
  think: { brow: 'think', mouth: 'flat', pupils: [3.5, -2], anim: 'sway' },
  sad: { brow: 'sad', mouth: 'frown', pupils: [0, 2], anim: 'sink' },
  sleep: { brow: 'neutral', mouth: 'flat', pupils: [0, 0], anim: 'sleep' },
  wave: { brow: 'raised', mouth: 'smile', pupils: [-2, 0], anim: 'wave' },
}

/* Brows carry the expression. Each is a stroked path, rounded caps. */
const BROWS = {
  neutral: { left: 'M64 74 Q75 70 86 74', right: 'M114 74 Q125 70 136 74' },
  raised: { left: 'M63 69 Q75 62 87 68', right: 'M113 68 Q125 62 137 69' },
  think: { left: 'M63 76 Q75 68 87 71', right: 'M113 66 Q125 61 137 70' },
  // Sad = INNER ends raised. The mirror of this (inner ends lowered) is anger,
  // and getting it backwards is the classic way a "sad" character reads as
  // furious instead. Inner end of the left brow is the x=87 end.
  sad: { left: 'M63 78 Q75 72 87 67', right: 'M113 67 Q125 72 137 78' },
}

const MOUTHS = {
  smallSmile: 'M90 128 Q100 136 110 128',
  smile: 'M85 126 Q100 140 115 126',
  flat: 'M90 130 L110 130',
  frown: 'M89 135 Q100 127 111 135',
}

/**
 * @param {object} props
 * @param {'idle'|'happy'|'cheer'|'think'|'sad'|'sleep'|'wave'} props.mood
 * @param {number} props.size    rendered px (the art is authored at 200x200)
 * @param {string} props.label   accessible label; pass '' for decorative use
 * @param {boolean} [props.still=false]  skip looping body motion (header logo etc.)
 */
export default function Pip({
  mood = 'idle',
  size = 96,
  label = '',
  className = '',
  still = false,
}) {
  const m = MOODS[mood] || MOODS.idle
  const brow = BROWS[m.brow]
  const [px, py] = m.pupils
  const decorative = !label

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`${styles.pip} ${still ? '' : styles[m.anim]} ${className}`}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
    >
      {/* Ground shadow - anchors him so he does not float */}
      <ellipse cx="100" cy="181" rx="46" ry="8" className={styles.groundShadow} />

      {/* Arms sit behind the body. Asymmetric on purpose: the left one hangs,
          the right one is the waving/cheering arm. */}
      <g className={styles.armLeft}>
        <rect x="26" y="108" width="24" height="46" rx="12" className={styles.shade} />
      </g>
      <g className={styles.armRight}>
        <rect x="150" y="104" width="24" height="46" rx="12" className={styles.body} />
      </g>

      {/* Stud on the head - a hair off-centre (99 not 100) */}
      <rect x="86" y="26" width="26" height="20" rx="9" className={styles.shade} />
      <ellipse cx="99" cy="27" rx="13" ry="7" className={styles.bodyLight} />

      {/* Head/body: one rounded cube */}
      <rect x="38" y="42" width="124" height="118" rx="40" className={styles.body} />
      {/* Form shading: the right third is one step darker. No gradients. */}
      <path
        d="M132 42 h-10 a40 40 0 0 1 40 40 v36 a40 40 0 0 1 -40 40 h10 a30 30 0 0 0 30 -30 V72 a30 30 0 0 0 -30 -30 z"
        className={styles.shade}
      />

      {/* Belly patch */}
      <ellipse cx="100" cy="127" rx="40" ry="30" className={styles.belly} />

      {/* Eyes */}
      <ellipse cx="75" cy="98" rx="19" ry="20" className={styles.eyeWhite} />
      <ellipse cx="125" cy="98" rx="19" ry="20" className={styles.eyeWhite} />

      <g className={styles.blinker}>
        <ellipse cx={75 + px} cy={99 + py} rx="9" ry="9.5" className={styles.pupil} />
        <ellipse cx={125 + px} cy={99 + py} rx="9" ry="9.5" className={styles.pupil} />
        {/* Catchlights - the thing that makes eyes look alive */}
        <circle cx={79 + px} cy={94 + py} r="3.4" className={styles.glint} />
        <circle cx={129 + px} cy={94 + py} r="3.4" className={styles.glint} />
      </g>

      {/* Brows */}
      <path d={brow.left} className={styles.brow} />
      <path d={brow.right} className={styles.brow} />

      {/* Mouth */}
      {m.mouth === 'open' ? (
        <ellipse cx="100" cy="131" rx="11" ry="9" className={styles.mouthOpen} />
      ) : (
        <path d={MOUTHS[m.mouth]} className={styles.mouth} />
      )}

      {/* Feet */}
      <ellipse cx="76" cy="166" rx="17" ry="10" className={styles.shade} />
      <ellipse cx="124" cy="166" rx="17" ry="10" className={styles.shade} />

      {mood === 'sleep' && (
        <g className={styles.zzz}>
          <text x="150" y="52" className={styles.z1}>z</text>
          <text x="163" y="36" className={styles.z2}>z</text>
        </g>
      )}
    </svg>
  )
}
