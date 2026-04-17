'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  PlayCircle,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CoursesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const CoursesSection = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const lessonsRef = useRef(null)

  const lessonExamples = [
    {
      id: 1,
      title: 'Приклад уроку: Python для дітей',
      description: 'Пояснюємо базові конструкції та одразу закріплюємо у міні-проєкті.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ZwW5QCe8Q7M?rel=0&modestbranding=1',
    },
    {
      id: 2,
      title: 'Приклад уроку: Веб-розробка',
      description: 'Покроково створюємо першу сторінку та працюємо з реальними задачами.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/a16fFHx2QDc?rel=0&modestbranding=1',
    },
    {
      id: 3,
      title: 'Приклад уроку: Roblox',
      description: 'Пояснюємо основи Roblox та створюємо простий проєкт.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/89-nuLW2aJ0?rel=0&modestbranding=1',
    },
  ]

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

          gsap.fromTo(
            `.${styles.lessonExamples}`,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: lessonsRef.current,
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

          gsap.fromTo(
            `.${styles.lessonExamples}`,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: lessonsRef.current,
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
          <span>Онлайн уроки з викладачем</span>
        </div>
        <h2 className={styles.title}>
          Індивідуальні уроки
          <span className={styles.titleAccent}> з реальними проєктами</span>
        </h2>
        <p className={styles.description}>
          Усі заняття проходять у форматі онлайн-уроків з викладачем в Zoom. 
          Дитина навчається в індивідуальному темпі, отримує зворотній зв&apos;язок та працює над власними проєктами.
        </p>
        </div>

        <div 
          ref={cardRef}
          className={styles.buttonWrapper}
        >
          <button onClick={() => window.dispatchEvent(new Event('openContactModal'))} className={styles.allCoursesButton}>
            <div className={styles.buttonContent}>
              <div className={styles.buttonIcon}>
                <Sparkles size={28} />
              </div>
              <div className={styles.buttonText}>
                <span className={styles.buttonTitle}>Записатись на урок</span>
                <span className={styles.buttonSubtitle}>Дізнайся більше про наші навчальні програми та індивідуальні уроки</span>
              </div>
              <ChevronRight size={24} className={styles.buttonArrow} />
            </div>
            <div className={styles.buttonGlow} />
          </button>
        </div>

        <div ref={lessonsRef} className={styles.lessonExamples}>
          <div className={styles.examplesHeader}>
            <div className={styles.examplesBadge}>
              <PlayCircle size={16} />
              <span>Приклади уроків</span>
            </div>
            <p className={styles.examplesText}>
              Подивіться, як виглядають наші заняття: практика, пояснення та робота над проєктами в реальному часі.
            </p>
          </div>

          <div className={styles.videoGrid}>
            {lessonExamples.map((lesson) => (
              <article key={lesson.id} className={styles.videoCard}>
                <div className={styles.videoWrapper}>
                  <iframe
                    src={lesson.embedUrl}
                    title={lesson.title}
                    loading='lazy'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                  />
                </div>
                <h3 className={styles.videoTitle}>{lesson.title}</h3>
                <p className={styles.videoDescription}>{lesson.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection





















