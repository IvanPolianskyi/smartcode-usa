'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from './Logo.module.css'

export default function Logo({ className = '', href = '/' }) {
  const pathname = usePathname()

  const handleClick = (e) => {
    // Якщо вже на головній сторінці, скролимо до верху
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Якщо на іншій сторінці, Next.js Link автоматично перейде на головну
    // і ми скролимо до верху після переходу
  }

  return (
    <Link 
      href={href} 
      className={`${styles.logo} ${className}`}
      onClick={handleClick}
      scroll={pathname !== '/'}
    >
      <div className={styles.logoIconWrapper}>
        <Image
          src="/logo.jpg"
          alt="SmartCode Academy Logo"
          className={styles.logoImage}
          width={56}
          height={56}
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


















