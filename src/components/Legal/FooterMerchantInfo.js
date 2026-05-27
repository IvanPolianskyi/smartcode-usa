'use client'

import { useTranslations, useLocale } from 'next-intl'
import { getMerchantInfo } from '@/lib/merchantInfo'
import styles from '@/components/Footer/footer.module.css'

export default function FooterMerchantInfo() {
	const t = useTranslations('pages.legal.merchant')
	const locale = useLocale()
	const merchant = getMerchantInfo(locale)

	return (
		<div className={styles.merchantBlock}>
			<h4 className={styles.merchantTitle}>{t('title')}</h4>
			<p className={styles.merchantLine}>
				<strong>{merchant.legalName}</strong>
				{merchant.taxId ? (
					<>
						<br />
						{t('taxId')} {merchant.taxId}
					</>
				) : null}
				{merchant.legalAddress ? (
					<>
						<br />
						{t('legalAddress')} {merchant.legalAddress}
					</>
				) : null}
				{merchant.actualAddress &&
				merchant.actualAddress !== merchant.legalAddress ? (
					<>
						<br />
						{t('actualAddress')} {merchant.actualAddress}
					</>
				) : null}
			</p>
			<p className={styles.merchantLine}>
				{merchant.phoneDisplay ? (
					<>
						<a href={`tel:${merchant.phone.replace(/\s/g, '')}`}>
							{merchant.phoneDisplay}
						</a>
						{' · '}
					</>
				) : null}
				<a href={`mailto:${merchant.email}`}>{merchant.email}</a>
			</p>
		</div>
	)
}
