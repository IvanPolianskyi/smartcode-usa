import { notFound } from 'next/navigation'
import LegalPageContent from '@/components/Legal/LegalPageContent'

export default async function PrivacyPage({ params }) {
	const { locale } = await params

	return (
		<LegalPageContent
			translationNamespace="pages.privacy"
			showMerchantBlock
			showRelatedLinks
		/>
	)
}
