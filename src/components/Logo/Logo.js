'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

export default function Logo({ className = '', href = '/' }) {
  return (
    <Link href={href} className={`${styles.logo} ${className}`}>
      <div className={styles.logoIconWrapper}>
        <Image
          src="/logo.jpg"
          alt="SmartCode Academy Logo"
          className={styles.logoImage}
          width={48}
          height={48}
          priority
        />
      </div>
      <div className={styles.logoText}>
        <span className={styles.logoTitle}>SmartCode</span>
        <span className={styles.logoSubtitle}>Academy</span>
      </div>
    </Link>
  )
}



