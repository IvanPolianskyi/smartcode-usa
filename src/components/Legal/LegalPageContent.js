'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'
import MerchantContactBlock from './MerchantContactBlock'

function sortSectionKeys(obj) {
	const keys = Object.keys(obj)
	if (keys.every((k) => /^\d+$/.test(k))) {
		return keys.sort((a, b) => Number(a) - Number(b))
	}
	return keys
}

function renderParagraphs(paragraphs) {
	return sortSectionKeys(paragraphs).map((key) => (
		<p key={key}>{paragraphs[key]}</p>
	))
}

function renderListItems(items) {
	return sortSectionKeys(items).map((key) => {
		const item = items[key]
		if (typeof item === 'string') {
			return <li key={key}>{item}</li>
		}
		const { title, text } = item
		return (
			<li key={key}>
				{title ? <strong>{title}</strong> : null}
				{title && text ? ' — ' : null}
				{text || null}
			</li>
		)
	})
}

export default function LegalPageContent({
	translationNamespace,
	showMerchantBlock = false,
	showRelatedLinks = false,
}) {
	const t = useTranslations(translationNamespace)
	const locale = useLocale()
	const sections = t.raw('sections')
	const related = showRelatedLinks ? t.raw('relatedLinks') : null

	const localeTag = locale === 'en' ? 'en-US' : 'uk-UA'
	const lastUpdated = new Date().toLocaleDateString(localeTag, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{t('title')}</h1>
					<p className={styles.subtitle}>{t('subtitle')}</p>
					<p className={styles.date}>
						{t('lastUpdated')} {lastUpdated}
					</p>
				</div>

				{sortSectionKeys(sections).map((sectionKey) => {
					const section = sections[sectionKey]
					return (
						<div key={sectionKey} className={styles.section}>
							<h2 className={styles.sectionTitle}>{section.title}</h2>
							<div className={styles.text}>
								{section.intro ? <p>{section.intro}</p> : null}
								{section.paragraphs
									? renderParagraphs(section.paragraphs)
									: null}
								{section.items ? (
									<ul className={styles.list}>
										{renderListItems(section.items)}
									</ul>
								) : null}
								{section.text ? <p>{section.text}</p> : null}
								{section.note ? <p>{section.note}</p> : null}
							</div>
						</div>
					)
				})}

				{showMerchantBlock ? <MerchantContactBlock /> : null}

				{related ? (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>{t('relatedTitle')}</h2>
						<ul className={styles.list}>
							{Object.entries(related).map(([href, label]) => (
								<li key={href}>
									<Link href={href} className={styles.contactLink}>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	)
}
