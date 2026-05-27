import React, { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react'
import styles from './FloatingNavArrows.module.css'
import { useTranslations } from 'next-intl'

const FloatingNavArrows = ({ 
  onNextAction, 
  onPrevAction, 
  isAtEnd,
  isAtStart
}) => {
  const [show, setShow] = useState(false)
  const t = useTranslations('lms.lesson')

const [isAtBottom, setIsAtBottom] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500)
    
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop
      const atBottom = Math.ceil(window.innerHeight + scrollPos) >= document.documentElement.scrollHeight - 50
      setIsAtBottom(atBottom)
      setIsAtTop(scrollPos <= 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNext = () => {
    const blocks = Array.from(document.querySelectorAll('.navigable-block'))
    const scrollPos = window.scrollY || document.documentElement.scrollTop
    const headerOffset = window.innerWidth > 1024 ? 120 : 80
    
    const nextBlock = blocks.find(block => {
      const rect = block.getBoundingClientRect()
      const top = rect.top + scrollPos
      return top > scrollPos + headerOffset + 50
    })

    const isAtBottom = Math.ceil(window.innerHeight + scrollPos) >= document.documentElement.scrollHeight - 50

    if (isAtBottom) {
      if (onNextAction) onNextAction()
    } else if (nextBlock) {
      const top = nextBlock.getBoundingClientRect().top + scrollPos - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    const blocks = Array.from(document.querySelectorAll('.navigable-block'))
    const scrollPos = window.scrollY || document.documentElement.scrollTop
    const headerOffset = window.innerWidth > 1024 ? 120 : 80

    const prevBlock = [...blocks].reverse().find(block => {
      const rect = block.getBoundingClientRect()
      const top = rect.top + scrollPos
      return top < scrollPos - 10
    })

    if (scrollPos <= 50) {
      if (onPrevAction) onPrevAction()
    } else if (prevBlock) {
      const top = prevBlock.getBoundingClientRect().top + scrollPos - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!show) return null

  return (
    <div className={styles.container}>
      <button 
        className={styles.navButton} 
        onClick={handlePrev}
        title={isAtTop ? t('prevTab') || "Попередня вкладка" : t('prevSection') || "Попередній розділ"}
      >
        {isAtTop ? <ArrowLeft className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
      </button>
      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={handleNext}
        title={isAtBottom ? t('nextTab') || "Наступна вкладка" : t('nextSection') || "Наступний розділ"}
      >
        {isAtBottom ? <ArrowRight className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </button>
    </div>
  )
}

export default FloatingNavArrows
