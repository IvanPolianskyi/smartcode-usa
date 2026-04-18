"use client"

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Analytics } from "@vercel/analytics/next"

// Lightweight skeletons to keep layout stable while chunks load
const SectionSkeleton = ({ height = '60vh' }) => (
  <div style={{ minHeight: height, width: '100%' }} />
)
const HeroSkeleton = () => <SectionSkeleton height='75vh' />

// Enable SSR (default) and provide client-side loading fallbacks.
// Removing ssr:false prevents the server from sending an empty <main>,
// which previously let the footer appear first.
const HeroSection = dynamic(() => import('@/components/HeroSection/HeroSection'), {
  loading: () => <HeroSkeleton />,
})
const Visit = dynamic(() => import('@/components/Visit/Visit'), {
  loading: () => <SectionSkeleton height='1200px' />,
})
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
  // Прибрали поведінку з hash, щоб уникнути гонок відкриття модалки

  useEffect(() => {
    // Fire-and-forget visit log (client-side session guard)
    try {
      if (typeof window !== 'undefined') {
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
      }
    } catch {}
  }, [])

  return (
    <div className='home-page-wrapper'>
      
      <div className='overflow-x-hidden'>
        <Analytics />
        <Visit />
        <CoursesSection />
        <Testimonials />
        <ProjectsShowcase />
        <TrialSignupBlock />
        <SocialMedia />
        <FAQ />
        
      </div>
    </div>
  )
}
