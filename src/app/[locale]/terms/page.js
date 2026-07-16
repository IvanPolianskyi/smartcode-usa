import { redirect } from '@/i18n/navigation'

/** Legacy /terms → публічна оферта */
export default async function TermsPage() {
	redirect('/oferta')
}
