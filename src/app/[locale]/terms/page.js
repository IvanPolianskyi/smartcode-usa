import { notFound } from 'next/navigation'
import { redirect } from '@/i18n/navigation'

/** EN Terms of Service → full public offer */
export default async function TermsPage({ params }) {
	const { locale } = await params
	if (locale !== 'en') notFound()
	redirect('/oferta')
}
