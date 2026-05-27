import { notFound } from 'next/navigation'
import LegalPageContent from '@/components/Legal/LegalPageContent'

export default async function RefundPage({ params }) {
	const { locale } = await params

	return (
		<LegalPageContent
			translationNamespace="pages.refund"
			showMerchantBlock
			showRelatedLinks
		/>
	)
}
