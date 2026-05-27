'use client'

import { useTranslations, useLocale } from 'next-intl'
import { getMerchantInfo } from '@/lib/merchantInfo'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'

export default function MerchantContactBlock() {
	const t = useTranslations('pages.legal.merchant')
	const merchant = getMerchantInfo(useLocale())

	const rows = [
		{ label: t('legalName'), value: merchant.legalName },
		merchant.taxId ? { label: t('taxId'), value: merchant.taxId } : null,
		merchant.legalAddress
			? { label: t('legalAddress'), value: merchant.legalAddress }
			: null,
		merchant.actualAddress && merchant.actualAddress !== merchant.legalAddress
			? { label: t('actualAddress'), value: merchant.actualAddress }
			: merchant.actualAddress && !merchant.legalAddress
				? { label: t('actualAddress'), value: merchant.actualAddress }
				: null,
		merchant.phoneDisplay
			? {
					label: t('phone'),
					value: merchant.phoneDisplay,
					href: `tel:${merchant.phone.replace(/\s/g, '')}`,
				}
			: null,
		{
			label: t('email'),
			value: merchant.email,
			href: `mailto:${merchant.email}`,
		},
		{
			label: t('website'),
			value: merchant.website.replace(/^https?:\/\//, ''),
			href: merchant.website,
		},
		merchant.bank?.iban
			? { label: t('iban'), value: merchant.bank.iban }
			: null,
		merchant.bank?.bankName
			? { label: t('bank'), value: merchant.bank.bankName }
			: null,
		merchant.bank?.mfo
			? {
					label: t('mfo'),
					value: `${merchant.bank.mfo}${merchant.bank.bankEdrpou ? ` · EDRPOU ${merchant.bank.bankEdrpou}` : ''}`,
				}
			: null,
	].filter(Boolean)

	return (
		<div className={styles.section}>
			<h2 className={styles.sectionTitle}>{t('title')}</h2>
			<div className={styles.text}>
				{rows.map((row) => (
					<p key={row.label}>
						<strong>{row.label}</strong>
						<br />
						{row.href ? (
							<a
								href={row.href}
								className={styles.contactLink}
								target={row.href.startsWith('http') ? '_blank' : undefined}
								rel={
									row.href.startsWith('http')
										? 'noopener noreferrer'
										: undefined
								}
							>
								{row.value}
							</a>
						) : (
							row.value
						)}
					</p>
				))}
			</div>
		</div>
	)
}
