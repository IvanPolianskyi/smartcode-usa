'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Download } from 'lucide-react'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'
import { getMerchantInfo, getOfertaContactFields } from '@/lib/merchantInfo'

function sortNumericKeys(obj) {
	return Object.keys(obj).sort((a, b) => Number(a) - Number(b))
}

function renderListItems(items, keyOrder) {
	const keys = keyOrder ?? sortNumericKeys(items)
	return keys.map((key) => {
		const item = items[key]
		if (typeof item === 'string') {
			return <li key={key}>{item}</li>
		}
		const { title, text, sublist } = item
		return (
			<li key={key}>
				<strong>{title}</strong>
				{text ? <> – {text}</> : null}
				{sublist ? (
					<ul className={styles.sublist}>
						{sortNumericKeys(sublist).map((sk) => (
							<li key={sk}>{sublist[sk]}</li>
						))}
					</ul>
				) : null}
			</li>
		)
	})
}

const SECTION2_LIST_ORDER = ['onlineLessons', 'courses', 'materials']
const SECTION3_SUBSECTION_ORDER = ['order', 'terms', 'payment', 'delivery', 'absences']
const SECTION3_PAYMENT_ITEMS_ORDER = ['wayforpay', 'appleGoogle']
const SECTION4_SUBSECTION_ORDER = ['conditions', 'procedure', 'noRefund', 'cancellation']
const SECTION4_CONDITIONS_ITEMS_ORDER = ['beforeStart', '14days', 'technical']
const SECTION6_SUBSECTION_ORDER = ['provider', 'customer']
function mergeOfertaContactSection(section5, merchantFields) {
	const fields = { ...section5.fields }
	for (const [key, override] of Object.entries(merchantFields)) {
		if (!fields[key] || !override) continue
		if (override.value) {
			fields[key] = { ...fields[key], value: override.value }
		}
	}
	return { ...section5, fields }
}

const SECTION5_FIELDS_ORDER = [
	'companyName',
	'taxId',
	'legalAddress',
	'actualAddress',
	'phone',
	'email',
	'website',
]

export default function OfertaContent() {
	const t = useTranslations('pages.oferta')
	const locale = useLocale()

	const localeTag = locale === 'en' ? 'en-US' : 'uk-UA'
	const publishedDate = new Date().toLocaleDateString(localeTag, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	const section1 = t.raw('sections.1')
	const section2 = t.raw('sections.2')
	const section3 = t.raw('sections.3')
	const section4 = t.raw('sections.4')
	const section5Raw = t.raw('sections.5')
	const section5 =
		locale === 'en' || locale === 'uk'
			? mergeOfertaContactSection(
					section5Raw,
					getOfertaContactFields(getMerchantInfo(locale))
				)
			: section5Raw
	const section6 = t.raw('sections.6')
	const section7 = t.raw('sections.7')
	const section8 = t.raw('sections.8')
	const section9 = t.raw('sections.9')
	const section10 = t.raw('sections.10')
	const section11 = t.raw('sections.11')

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{t('title')}</h1>
					<p className={styles.subtitle}>{t('subtitle')}</p>
					<a href='/api/oferta-pdf' className={styles.pdfLink}>
						<Download size={20} />
						{t('downloadPdf')}
					</a>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section1.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section1.paragraphs).map((key) => (
							<p key={key}>{section1.paragraphs[key]}</p>
						))}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section2.title}</h2>
					<div className={styles.text}>
						<p>{section2.intro}</p>
						<ul className={styles.list}>
							{renderListItems(section2.list, SECTION2_LIST_ORDER)}
						</ul>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section3.title}</h2>
					<div className={styles.text}>
						{SECTION3_SUBSECTION_ORDER.map((subKey) => {
							const sub = section3.subsections[subKey]
							return (
								<div key={subKey}>
									<h3 className={styles.subsectionTitle}>{sub.title}</h3>
									{subKey === 'order' || subKey === 'terms' ? (
										<ul className={styles.list}>
											{renderListItems(sub.items)}
										</ul>
									) : null}
									{subKey === 'payment' ? (
										<>
											<p>{sub.intro}</p>
											<ul className={styles.list}>
												{renderListItems(
													sub.items,
													SECTION3_PAYMENT_ITEMS_ORDER
												)}
											</ul>
											<p>{sub.note}</p>
										</>
									) : null}
									{subKey === 'delivery' ? (
										<>
											<p>{sub.text}</p>
											{sub.items ? (
												<ul className={styles.list}>
													{renderListItems(sub.items)}
												</ul>
											) : null}
										</>
									) : null}
									{subKey === 'absences' ? <p>{sub.text}</p> : null}
								</div>
							)
						})}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section4.title}</h2>
					<div className={styles.text}>
						{SECTION4_SUBSECTION_ORDER.map((subKey) => {
							const sub = section4.subsections[subKey]
							return (
								<div key={subKey}>
									<h3 className={styles.subsectionTitle}>{sub.title}</h3>
									{subKey === 'conditions' ? (
										<>
											<p>{sub.intro}</p>
											<ul className={styles.list}>
												{renderListItems(
													sub.items,
													SECTION4_CONDITIONS_ITEMS_ORDER
												)}
											</ul>
										</>
									) : null}
									{subKey === 'procedure' || subKey === 'noRefund' ? (
										<ul className={styles.list}>
											{renderListItems(sub.items)}
										</ul>
									) : null}
									{subKey === 'cancellation' ? <p>{sub.text}</p> : null}
								</div>
							)
						})}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section5.title}</h2>
					<div className={styles.text}>
						{SECTION5_FIELDS_ORDER.map((fieldKey) => {
							const field = section5.fields[fieldKey]
							const displayValue = field.value ?? field.placeholder
							return (
								<p key={fieldKey}>
									<strong>{field.label}</strong>
									<br />
									{fieldKey === 'phone' ? (
										<a
											href={`tel:${field.value.replace(/\s/g, '')}`}
											className={styles.contactLink}
										>
											{displayValue}
										</a>
									) : null}
									{fieldKey === 'email' ? (
										<a
											href={`mailto:${field.value}`}
											className={styles.contactLink}
										>
											{displayValue}
										</a>
									) : null}
									{fieldKey === 'website' ? (
										<a
											href={field.value}
											target='_blank'
											rel='noopener noreferrer'
											className={styles.contactLink}
										>
											{displayValue}
										</a>
									) : null}
									{fieldKey !== 'phone' &&
									fieldKey !== 'email' &&
									fieldKey !== 'website'
										? displayValue
										: null}
								</p>
							)
						})}
					</div>
					<p className={styles.date}>
						{section5.publishedDate} {publishedDate}
					</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section6.title}</h2>
					<div className={styles.text}>
						{SECTION6_SUBSECTION_ORDER.map((subKey) => {
							const sub = section6.subsections[subKey]
							return (
								<div key={subKey}>
									<h3 className={styles.subsectionTitle}>{sub.title}</h3>
									<ul className={styles.list}>
										{renderListItems(sub.items)}
									</ul>
								</div>
							)
						})}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section7.title}</h2>
					<div className={styles.text}>
						<ul className={styles.list}>
							{renderListItems(section7.items)}
						</ul>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section8.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section8.paragraphs).map((key) => (
							<p key={key}>{section8.paragraphs[key]}</p>
						))}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section9.title}</h2>
					<div className={styles.text}>
						<p>{section9.text}</p>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section10.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section10.paragraphs).map((key) => (
							<p key={key}>{section10.paragraphs[key]}</p>
						))}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section11.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section11.paragraphs).map((key) => (
							<p key={key}>{section11.paragraphs[key]}</p>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
