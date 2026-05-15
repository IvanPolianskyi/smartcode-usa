"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Analytics } from "@vercel/analytics/next"
import { usePathname } from 'next/navigation'
import {
	readAndClearPendingHomeSectionScroll,
	scheduleScrollToHomeSectionId,
	SCROLL_HOME_SECTION_EVENT,
} from '@/lib/homeSectionScroll'

// Lightweight skeletons to keep layout stable while chunks load
const SectionSkeleton = ({ height = '60vh' }) => (
  <div style={{ minHeight: height, width: '100%' }} />
)

// Below-fold sections — all lazy loaded to keep initial bundle small
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

export default function HomeClient() {
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
    const onScrollRequest = (e) => {
      const id = e.detail?.id
      if (id) scheduleScrollToHomeSectionId(id)
    }
    window.addEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
    return () => window.removeEventListener(SCROLL_HOME_SECTION_EVENT, onScrollRequest)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const hashId = window.location.hash.replace(/^#/, '')
      if (hashId) scheduleScrollToHomeSectionId(hashId)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    // Fire-and-forget visit log (deferred to idle to reduce startup TBT)
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
      <CoursesSection />
      <TrialSignupBlock />
      <Testimonials />
      <ProjectsShowcase />
      <SocialMedia />
      <LMSPromo />
      <FAQ />
    </>
  )
}

