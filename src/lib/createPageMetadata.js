import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'

export function createPageMetadata(pageKey, path) {
	return async function generateMetadata({ params }) {
		const { locale } = await params
		const meta = await getLocalizedMetadata(locale, pageKey)
		return {
			...meta,
			alternates: buildAlternates(locale, path),
		}
	}
}
