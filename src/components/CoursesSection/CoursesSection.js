'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CoursesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const pythonCourse = {
  courseId: 'python-developer-zero-to-junior',
  title: 'Повний курс Пайтон',
  shortDescription: 'Повний курс програмування на Python від основ до рівня впевненого джуніора',
  fullDescription: 'Опануй найпопулярнішу мову програмування світу! Від основ синтаксису до створення реальних проектів - ти пройдеш повний шлях від новачка до впевненого джуніора.',
  logo: '/python-logo.png',
  color: '#3b82f6',
  gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  link: '/courses/python-developer-zero-to-junior',
  age: '13-17 років',
  duration: '41 тиждень',
  lessons: '96 уроків',
  hours: '100%',
  students: '500+',
  skills: [
    'Основи програмування на Python',
    'Об\'єктно-орієнтоване програмування',
    'Робота з базами даних',
    'Веб-розробка з Flask/Django',
    'REST API та мікросервіси',
    'Деплой проектів у хмару'
  ]
}

const CoursesSection = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current && cardRef.current) {
      const ctx = gsap.context(() => {
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
          `.${styles.courseCard}`,
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
          className={styles.courseCard}
        >
          <div className={styles.cardBackground} />
          
          <div className={styles.cardHeader}>
            <div className={styles.headerContent}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconGlow} />
                <Image 
                  src={pythonCourse.logo} 
                  alt="Python Logo" 
                  width={80}
                  height={80}
                  className={styles.pythonLogo}
                  priority
                />
              </div>
              <h3 className={styles.courseTitle}>{pythonCourse.title}</h3>
              <p className={styles.courseDescription}>{pythonCourse.fullDescription}</p>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Users size={20} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{pythonCourse.age}</div>
                <div className={styles.statLabel}>Вік</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Clock size={20} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{pythonCourse.duration}</div>
                <div className={styles.statLabel}>Тривалість</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <BookOpen size={20} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{pythonCourse.lessons}</div>
                <div className={styles.statLabel}>Уроків</div>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statIcon}>
                <Zap size={20} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{pythonCourse.hours}</div>
                <div className={styles.statLabel}>рівень знань пайтон</div>
              </div>
            </div>
          </div>

          <Link href={pythonCourse.link} className={styles.courseButton}>
            <span>Почати навчання</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection




















