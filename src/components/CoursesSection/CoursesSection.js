'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ClipboardCheck, PlayCircle, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CoursesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const CoursesSection = () => {
  const sectionRef = useRef(null)
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
    if (!sectionRef.current || !lessonsRef.current) return

    const isMobile = window.innerWidth <= 768

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          `.${styles.heroContent}`,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          `.${styles.lessonExamples}`,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lessonsRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )
      } else {
        gsap.fromTo(
          `.${styles.heroContent}`,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          `.${styles.lessonExamples}`,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lessonsRef.current,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Індивідуальні онлайн-уроки</span>
          </div>
          <h2 className={styles.title}>
            Приклади уроків
            <span className={styles.titleAccent}> з викладачем у Zoom</span>
          </h2>
          <p className={styles.description}>
            Усі заняття - у форматі живого уроку: зворотний зв&apos;язок, власний темп і робота над проєктами. Нижче -
            короткі фрагменти, щоб побачити стиль пояснення.
          </p>
        </div>

        <div ref={lessonsRef} className={styles.lessonExamples}>
          <div className={styles.examplesHeader}>
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

          <div className={styles.knowledgeRow}>
            <Link href='/knowledge-test' className={styles.knowledgeButton}>
              <ClipboardCheck className={styles.knowledgeButtonIcon} size={20} aria-hidden />
              <span>Перевірте знання</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection
