"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Analytics } from "@vercel/analytics/next"

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

export default function HomeClient() {
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
      <FAQ />
    </>
  )
}

