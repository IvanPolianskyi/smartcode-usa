import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import KnowledgeTestClient from './KnowledgeTestClient'

export async function generateMetadata({ params }) {
	const { locale } = await params
	const { getLocalizedMetadata, buildAlternates } = await import('@/lib/i18nMetadata')
	const meta = await getLocalizedMetadata(locale, 'knowledgeTest')
	return {
		...meta,
		alternates: buildAlternates(locale, '/knowledge-test'),
	}
}

export default async function KnowledgeTestPage() {
	const t = await getTranslations('pages.knowledgeTest.selection')

	return (
		<Suspense
			fallback={
				<div style={{ padding: '2rem', textAlign: 'center' }}>{t('loading')}</div>
			}
		>
			<KnowledgeTestClient />
		</Suspense>
	)
}
