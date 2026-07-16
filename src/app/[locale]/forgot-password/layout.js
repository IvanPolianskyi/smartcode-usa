import { setRequestLocale } from 'next-intl/server'
import { getLocalizedMetadata, buildAlternates } from '@/lib/i18nMetadata'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const meta = await getLocalizedMetadata(locale, 'forgotPassword')
  return {
    ...meta,
    alternates: buildAlternates(locale, '/forgot-password'),
    robots: { index: false, follow: false },
  }
}

export default async function ForgotPasswordLayout({ children, params }) {
  const { locale } = await params
  setRequestLocale(locale)
  return children
}
