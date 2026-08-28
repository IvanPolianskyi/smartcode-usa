'use client'

import React from 'react'
import Pip from './Pip'
import styles from './PipCompanion.module.css'

/**
 * PipCompanion - renders Pip mascot with an interactive, animated speech bubble.
 *
 * @param {object} props
 * @param {'idle'|'happy'|'cheer'|'think'|'sad'|'sleep'|'wave'} [props.mood='idle']
 * @param {number} [props.size=72]
 * @param {string|React.ReactNode} [props.speech]
 * @param {string} [props.title]
 * @param {'right'|'left'|'top'|'bottom'} [props.bubblePosition='right']
 * @param {React.ReactNode} [props.action]
 * @param {boolean} [props.compact=false]
 * @param {string} [props.className='']
 * @param {string} [props.pipClassName='']
 * @param {string} [props.label='Pip']
 */
export default function PipCompanion({
  mood = 'idle',
  size = 72,
  speech,
  title,
  bubblePosition = 'right',
  action,
  compact = false,
  className = '',
  pipClassName = '',
  label = 'Pip',
}) {
  const isCheer = mood === 'cheer'

  const posClass =
    bubblePosition === 'left'
      ? styles.companionLeft
      : bubblePosition === 'top'
        ? styles.companionTop
        : bubblePosition === 'bottom'
          ? styles.companionBottom
          : styles.companionRight

  const tailClass =
    bubblePosition === 'left'
      ? styles.tailLeft
      : bubblePosition === 'top'
        ? styles.tailTop
        : bubblePosition === 'bottom'
          ? styles.tailBottom
          : styles.tailRight

  return (
    <div
      className={`${styles.companion} ${posClass} ${compact ? styles.compact : ''} ${
        isCheer ? styles.cheerGlow : ''
      } ${className}`}
    >
      <div className={`${styles.pipWrapper} ${pipClassName}`}>
        <Pip mood={mood} size={size} label={label} />
      </div>

      {(speech || title || action) && (
        <div className={`${styles.bubble} ${tailClass}`} role="note">
          {title && <strong className={styles.title}>{title}</strong>}
          {speech && <div className={styles.content}>{speech}</div>}
          {action && <div className={styles.actionWrap}>{action}</div>}
        </div>
      )}
    </div>
  )
}
