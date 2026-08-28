import { ImageResponse } from 'next/og'
import { BILLING_TIERS } from '@/lib/billingCatalog'
import { LEGAL } from '@/lib/legalConfig'

/**
 * Link preview card.
 *
 * Traffic arrives from Instagram, TikTok and Discord, where a link with no
 * image is a grey rectangle nobody taps. Generating the card here means it can
 * never drift from the price and trial length shown on the site.
 */

export const alt = 'SmartCode - build a game people actually play'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					background: 'linear-gradient(135deg, #0f172a 0%, #1e2a4a 55%, #3b2b52 100%)',
					padding: 72,
					color: '#ffffff',
					fontFamily: 'sans-serif',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, opacity: 0.85 }}>
					SmartCode Academy
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
					<div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05, display: 'flex', flexWrap: 'wrap' }}>
						Build a game people actually play
					</div>
					<div style={{ fontSize: 32, opacity: 0.82, display: 'flex' }}>
						Roblox · Python · AI for Real Life
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 28 }}>
					<div
						style={{
							display: 'flex',
							padding: '12px 24px',
							borderRadius: 999,
							background: '#fc6e51',
							fontWeight: 700,
						}}
					>
						{LEGAL.trialDays} days free
					</div>
					<div style={{ display: 'flex', opacity: 0.8 }}>
						then {BILLING_TIERS.standard.monthlyPrice}/month · cancel anytime
					</div>
				</div>
			</div>
		),
		size
	)
}
