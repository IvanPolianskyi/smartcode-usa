"use client"

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { Analytics } from "@vercel/analytics/next"
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import {
	readAndClearPendingHomeSectionScroll,
	scheduleScrollToHomeSectionId,
	SCROLL_HOME_SECTION_EVENT,
	HOME_SECTION_SCROLL_STORAGE_KEY,
} from '@/lib/homeSectionScroll'

const SectionSkeleton = ({ height = '60vh' }) => (
  <div style={{ minHeight: height, width: '100%' }} />
)

const Testimonials = dynamic(() => import('@/components/Testimonials/Testimonials'), {
  loading: () => <SectionSkeleton height='800px' />,
})
const FAQ = dynamic(() => import('@/components/FAQ/FAQ'), {
  loading: () => <SectionSkeleton height='800px' />,
})
const ProjectsShowcase = dynamic(() => import('@/components/ProjectsShowcase/ProjectsShowcase'), {
  loading: () => <SectionSkeleton height='1000px' />,
})
const CoursesSection = dynamic(() => import('@/components/CoursesSection/CoursesSection'), {
  loading: () => <SectionSkeleton height='1000px' />,
})
const TrialSignupBlock = dynamic(() => import('@/components/TrialSignupBlock/TrialSignupBlock'), {
  loading: () => <SectionSkeleton height='420px' />,
})
const SocialMedia = dynamic(() => import('@/components/SocialMedia/SocialMedia'), {
  loading: () => <SectionSkeleton height='600px' />,
})
const LMSPromo = dynamic(() => import('@/components/LMSPromo/LMSPromo'), {
  loading: () => <SectionSkeleton height='600px' />,
})

function LazySection({ children, height, sectionId, rootMargin = '300px 0px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sectionId || typeof window === 'undefined') return undefined

    const hashId = window.location.hash.replace(/^#/, '')
    if (hashId === sectionId) {
      setVisible(true)
    }

    try {
      const pending = sessionStorage.getItem(HOME_SECTION_SCROLL_STORAGE_KEY)
      if (pending === sectionId) {
        setVisible(true)
      }
    } catch {}

    const onScrollRequest = (e) => {
      if (e.detail?.id === sectionId) {
        setVisible(true)
      }
    }
    window.addEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
    return () => window.removeEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
  }, [sectionId])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {visible ? children : <SectionSkeleton height={height} />}
    </div>
  )
}

export default function HomeClient() {
  const locale = useLocale()
  const isEn = locale === 'en'
  const pathname = usePathname()

  useEffect(() => {
    const pending = readAndClearPendingHomeSectionScroll()
    const hashId =
      typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : ''
    const id = pending || hashId
    if (!id) return undefined
    return scheduleScrollToHomeSectionId(id)
  }, [pathname])

  useEffect(() => {
    let cancelScroll = null
    const onScrollRequest = (e) => {
      const id = e.detail?.id
      if (!id) return
      cancelScroll?.()
      cancelScroll = scheduleScrollToHomeSectionId(id)
    }
    window.addEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
    return () => {
      window.removeEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
      cancelScroll?.()
    }
  }, [])

  useEffect(() => {
    let cancelScroll = null
    const onHashChange = () => {
      const hashId = window.location.hash.replace(/^#/, '')
      if (!hashId) return
      cancelScroll?.()
      cancelScroll = scheduleScrollToHomeSectionId(hashId)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      cancelScroll?.()
    }
  }, [])

  useEffect(() => {
    let idleId = null
    let timeoutId = null
    const sendVisit = () => {
      try {
        if (sessionStorage.getItem('sc_visit_logged') !== '1') {
          fetch('/api/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              path: window.location.pathname,
              referrer: document.referrer,
              userAgent: navigator.userAgent,
              screen: { w: window.screen?.width, h: window.screen?.height },
              locale: navigator.language,
            }),
            keepalive: true,
          })
            .then(() => {
              try { sessionStorage.setItem('sc_visit_logged', '1') } catch {}
            })
            .catch(() => {})
        }
      } catch {}
    }

    try {
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(sendVisit, { timeout: 1500 })
      } else {
        timeoutId = window.setTimeout(sendVisit, 300)
      }
    } catch {}

    return () => {
      if (idleId != null && typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <>
      <Analytics />
      {!isEn && (
        <LazySection height="1000px" sectionId="courses">
          <CoursesSection />
        </LazySection>
      )}
      {!isEn && (
        <LazySection height="420px" sectionId="trial-signup">
          <TrialSignupBlock />
        </LazySection>
      )}
      <LazySection height="800px" sectionId="testimonials">
        <Testimonials />
      </LazySection>
      <LazySection height="1000px">
        <ProjectsShowcase />
      </LazySection>
      <LazySection height="600px">
        <SocialMedia />
      </LazySection>
      <LazySection height="600px">
        <LMSPromo />
      </LazySection>
      <LazySection height="800px">
        <FAQ />
      </LazySection>
    </>
  )
}
