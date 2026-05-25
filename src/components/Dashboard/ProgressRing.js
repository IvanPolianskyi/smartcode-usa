'use client'

import React from 'react'
import styles from '@/app/[locale]/dashboard/Dashboard.module.css'

export default function ProgressRing({ value = 0, size = 72, stroke = 7, label, muted = false }) {
  const clamped = Math.min(100, Math.max(0, Number(value) || 0))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className={`${styles.progressRing} ${muted ? styles.progressRingMuted : ''}`}
      style={{ width: size, height: size }}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={styles.progressRingTrack}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className={styles.progressRingFill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className={styles.progressRingValue}>{Math.round(clamped)}%</span>
    </div>
  )
}
