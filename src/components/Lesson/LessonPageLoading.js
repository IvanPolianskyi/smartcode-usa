'use client'

import { useTranslations } from 'next-intl'

export default function LessonPageLoading() {
	const t = useTranslations('metadata.lesson')

	return (
		<div
			style={{
				padding: '3rem 1.5rem',
				textAlign: 'center',
				maxWidth: 480,
				margin: '0 auto',
			}}
		>
			<p style={{ color: 'var(--muted-foreground, #64748b)' }}>{t('loading')}</p>
		</div>
	)
}
