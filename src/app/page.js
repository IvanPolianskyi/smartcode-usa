// page.js — Server Component
// Visit is imported DIRECTLY (not via dynamic) so Next.js SSR renders
// its HTML immediately — this is what fixes FCP 7.5s → ~1.5s.
// Client components imported from server components are STILL server-rendered
// into the initial HTML; "use client" only adds client-side hydration on top.
import Visit from '@/components/Visit/Visit'
import HomeClient from './HomeClient'

export default function Home() {
	return (
		<div className='home-page-wrapper'>
			<div className='overflow-x-hidden'>
				{/* Critical above-fold content — SSR'd into initial HTML */}
				<Visit />
				{/* Below-fold sections — lazy loaded after hydration */}
				<HomeClient />
			</div>
		</div>
	)
}
