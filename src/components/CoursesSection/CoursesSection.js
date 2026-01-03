'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Code,
  Gamepad2,
  Monitor,
  Box,
  BookOpen,
  Clock,
  Users,
  Award,
  Star,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CoursesSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const courses = [
  {
    courseId: 'python-developer-zero-to-junior',
    title: 'Python Developer',
    shortDescription: 'Повний курс програмування на Python від основ до рівня впевненого джуніора',
    icon: <Code size={32} />,
    color: '#3b82f6',
    link: '/courses/python-developer-zero-to-junior',
    age: '13-17 років',
    duration: '24 тижні',
    lessons: '48 уроків',
    popular: true,
  },
  {
    courseId: 'web-development',
    title: 'Веб-розробка',
    shortDescription: 'HTML, CSS, JavaScript, React та Node.js - створюй сучасні веб-додатки',
    icon: <Monitor size={32} />,
    color: '#8b5cf6',
    link: '/courses/web-development',
    age: '12-18 років',
    duration: '22 тижні',
    lessons: '44 уроки',
    popular: false,
  },
  {
    courseId: 'unity-game-development',
    title: 'Розробка ігор на Unity',
    shortDescription: 'Створення захоплюючих ігор на Unity з використанням C#',
    icon: <Gamepad2 size={32} />,
    color: '#10b981',
    link: '/Unity',
    age: '8-17 років',
    duration: '20 тижнів',
    lessons: '40 уроків',
    popular: false,
  },
  {
    courseId: 'roblox-studio',
    title: 'Roblox Studio',
    shortDescription: 'Створення ігор у Roblox Studio та публікація для мільйонів гравців',
    icon: <Box size={32} />,
    color: '#10b981',
    link: '/Roblox',
    age: '8-16 років',
    duration: '16 тижнів',
    lessons: '32 уроки',
    popular: false,
  },
]

const CoursesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)

    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          `.${styles.courseCard}`,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
        <div className={styles.header}>
          <div className={styles.badge}>
            <BookOpen size={18} />
            <span>Наші курси</span>
          </div>
          <h2 className={styles.title}>
            Структуровані курси для глибшого навчання
          </h2>
          <p className={styles.description}>
            Окрім індивідуальних уроків, ми пропонуємо повноцінні курси з чіткою структурою, 
            модулями та проектами. Курси доповнюють наші уроки та дають можливість систематично 
            вивчити конкретну технологію від основ до просунутого рівня.
          </p>
        </div>

        <div className={styles.coursesGrid}>
          {courses.map((course, index) => (
            <div
              key={course.courseId}
              className={styles.courseCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {course.popular && (
                <div className={styles.popularBadge}>
                  <Star size={14} fill="#fbbf24" color="#fbbf24" />
                  <span>Популярний</span>
                </div>
              )}

              <div
                className={styles.courseIcon}
                style={{ backgroundColor: `${course.color}15`, color: course.color }}
              >
                {course.icon}
              </div>

              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDescription}>{course.shortDescription}</p>

              <div className={styles.courseMeta}>
                <div className={styles.metaItem}>
                  <Users size={16} />
                  <span>{course.age}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={16} />
                  <span>{course.lessons}</span>
                </div>
              </div>

              <Link href={course.link} className={styles.courseButton}>
                <span>Дізнатися більше</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/courses" className={styles.viewAllButton}>
            <span>Переглянути всі курси</span>
            <ArrowRight size={20} />
          </Link>
          <Link href="/tariff" className={styles.viewAllButton}>
            <span>Переглянути ціни</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CoursesSection












