'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CoursesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const CoursesSection = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current && cardRef.current) {
      const isMobile = window.innerWidth <= 768
      
      const ctx = gsap.context(() => {
        // Оптимізовані анімації для мобільних
        if (isMobile) {
          gsap.fromTo(
            `.${styles.heroContent}`,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false,
              },
            }
          )

          gsap.fromTo(
            `.${styles.buttonWrapper}`,
            { scale: 0.98, opacity: 0, y: 20 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.1,
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                markers: false,
              },
            }
          )
        } else {
          gsap.fromTo(
            `.${styles.heroContent}`,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )

          gsap.fromTo(
            `.${styles.buttonWrapper}`,
            { scale: 0.95, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

      }, sectionRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles size={18} />
            <span>Онлайн курс на платформі</span>
          </div>
          <h2 className={styles.title}>
            Онлайн курси
            <span className={styles.titleAccent}> для поглибленого вивчення</span>
          </h2>
          <p className={styles.description}>
            Окрім онлайн уроків, ми пропонуємо повноцінні онлайн курси на платформі для поглибленого вивчення програмування. 
            Курси рекомендується поєднувати з онлайн уроками для максимальної ефективності навчання та швидкого прогресу.
          </p>
        </div>

        <div 
          ref={cardRef}
          className={styles.buttonWrapper}
        >
          <Link href="/courses" className={styles.allCoursesButton}>
            <div className={styles.buttonContent}>
              <div className={styles.buttonIcon}>
                <Sparkles size={28} />
              </div>
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>Переглянути всі курси</span>
                <span className={styles.buttonSubtitle}>Дізнайся більше про наші навчальні програми</span>
              </div>
              <ChevronRight size={24} className={styles.buttonArrow} />
            </div>
            <div className={styles.buttonGlow} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection





















