'use client'

import { Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import baseStyles from './DataProcessingConsentNote.module.css'

export default function DataProcessingConsentNote({
	className,
	iconClassName,
	textClassName,
	linkClassName,
	showIcon = true,
}) {
	const t = useTranslations('common')
	const noteClass = className ? `${baseStyles.note} ${className}` : baseStyles.note
	const iconClass = iconClassName
		? `${baseStyles.icon} ${iconClassName}`
		: baseStyles.icon
	const textClass = textClassName
		? `${baseStyles.text} ${textClassName}`
		: baseStyles.text
	const policyLinkClass = linkClassName
		? `${baseStyles.policyLink} ${linkClassName}`
		: baseStyles.policyLink

	return (
		<p className={noteClass} role="note">
			{showIcon ? <Lock className={iconClass} size={16} aria-hidden /> : null}
			<span className={textClass}>
				{t.rich('dataProcessingConsent', {
					privacy: (chunks) => (
						<Link href="/privacy" className={policyLinkClass}>
							{chunks}
						</Link>
					),
				})}
			</span>
		</p>
	)
}
