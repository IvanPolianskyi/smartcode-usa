'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'
import { getMerchantInfo } from '@/lib/merchantInfo'

function sortNumericKeys(obj) {
	return Object.keys(obj).sort((a, b) => Number(a) - Number(b))
}

function renderListItems(items, keyOrder) {
	if (!items || typeof items !== 'object') return null
	const keys = keyOrder
		? keyOrder.filter((key) => items[key] !== undefined)
		: sortNumericKeys(items)
	return keys.map((key) => {
		const item = items[key]
		if (item === undefined || item === null) return null
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
const SECTION3_PAYMENT_ITEMS_ORDER = ['wayforpay', 'appleGoogle', 'bank']
const SECTION4_SUBSECTION_ORDER = ['conditions', 'procedure', 'noRefund', 'cancellation']
const SECTION4_CONDITIONS_ITEMS_ORDER = ['beforeStart', '14days', 'technical']
const SECTION6_SUBSECTION_ORDER = ['provider', 'customer']

const SECTION5_FIELDS_ORDER = [
	'companyName',
	'companyNameEn',
	'taxId',
	'legalAddress',
	'actualAddress',
	'phone',
	'email',
	'website',
	'iban',
	'bank',
]

function getUnifiedContactValues() {
	const m = getMerchantInfo('uk')
	return {
		companyName: m.legalNameUk,
		companyNameEn: m.legalNameEn,
		taxId: m.taxId,
		legalAddress: m.legalAddress,
		actualAddress: m.actualAddress,
		phone: m.phoneDisplay || m.phone,
		email: m.email,
		website: `${m.website}/oferta`,
		iban: m.bank?.iban,
		bank: m.bank?.bankName,
	}
}

function LangBlock({ lang, children }) {
	return (
		<div className={styles.langBlock} data-lang={lang}>
			{children}
		</div>
	)
}

function renderSection3(subsections) {
	return SECTION3_SUBSECTION_ORDER.map((subKey) => {
		const sub = subsections[subKey]
		return (
			<div key={subKey}>
				<h3 className={styles.subsectionTitle}>{sub.title}</h3>
				{subKey === 'order' || subKey === 'terms' ? (
					<ul className={styles.list}>{renderListItems(sub.items)}</ul>
				) : null}
				{subKey === 'payment' ? (
					<>
						<p>{sub.intro}</p>
						<ul className={styles.list}>
							{renderListItems(sub.items, SECTION3_PAYMENT_ITEMS_ORDER)}
						</ul>
						<p>{sub.note}</p>
					</>
				) : null}
				{subKey === 'delivery' ? (
					<>
						<p>{sub.text}</p>
						{sub.items ? (
							<ul className={styles.list}>{renderListItems(sub.items)}</ul>
						) : null}
					</>
				) : null}
				{subKey === 'absences' ? <p>{sub.text}</p> : null}
			</div>
		)
	})
}

function renderSection4(subsections) {
	return SECTION4_SUBSECTION_ORDER.map((subKey) => {
		const sub = subsections[subKey]
		return (
			<div key={subKey}>
				<h3 className={styles.subsectionTitle}>{sub.title}</h3>
				{subKey === 'conditions' ? (
					<>
						<p>{sub.intro}</p>
						<ul className={styles.list}>
							{renderListItems(sub.items, SECTION4_CONDITIONS_ITEMS_ORDER)}
						</ul>
					</>
				) : null}
				{subKey === 'procedure' || subKey === 'noRefund' ? (
					<ul className={styles.list}>{renderListItems(sub.items)}</ul>
				) : null}
				{subKey === 'cancellation' ? <p>{sub.text}</p> : null}
			</div>
		)
	})
}

function renderSection5(section, contactValues, publishedDate) {
	return (
		<>
			<h2 className={styles.sectionTitle}>{section.title}</h2>
			<div className={styles.text}>
				{SECTION5_FIELDS_ORDER.map((fieldKey) => {
					const field = section.fields[fieldKey]
					const value = contactValues[fieldKey]
					if (!field || !value) return null
					return (
						<p key={fieldKey}>
							<strong>{field.label}</strong>
							<br />
							{fieldKey === 'phone' ? (
								<a
									href={`tel:${String(value).replace(/\s/g, '')}`}
									className={styles.contactLink}
								>
									{value}
								</a>
							) : null}
							{fieldKey === 'email' ? (
								<a href={`mailto:${value}`} className={styles.contactLink}>
									{value}
								</a>
							) : null}
							{fieldKey === 'website' ? (
								<a
									href={value}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.contactLink}
								>
									{value}
								</a>
							) : null}
							{fieldKey !== 'phone' &&
							fieldKey !== 'email' &&
							fieldKey !== 'website'
								? value
								: null}
						</p>
					)
				})}
			</div>
			<p className={styles.date}>
				{section.publishedDate} {publishedDate}
			</p>
		</>
	)
}

export default function OfertaContent() {
	const t = useTranslations('pages.oferta')
	const publishedDate = new Date().toLocaleDateString('uk-UA', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const contactValues = getUnifiedContactValues()

	const section1 = t.raw('sections.1')
	const section2 = t.raw('sections.2')
	const section3 = t.raw('sections.3')
	const section4 = t.raw('sections.4')
	const section5uk = t.raw('sections.5.uk')
	const section5en = t.raw('sections.5.en')
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
					<p className={styles.languageNote}>{t('languageNote')}</p>
					<a href='/api/oferta-pdf' className={styles.pdfLink}>
						<Download size={20} />
						{t('downloadPdf')}
					</a>
				</div>

				{/* Section 1 */}
				<div className={styles.section}>
					<LangBlock lang='uk'>
						<h2 className={styles.sectionTitle}>{section1.uk.title}</h2>
						<div className={styles.text}>
							{sortNumericKeys(section1.uk.paragraphs).map((key) => (
								<p key={key}>{section1.uk.paragraphs[key]}</p>
							))}
						</div>
					</LangBlock>
					<LangBlock lang='en'>
						<h2 className={styles.sectionTitle}>{section1.en.title}</h2>
						<div className={styles.text}>
							{sortNumericKeys(section1.en.paragraphs).map((key) => (
								<p key={key}>{section1.en.paragraphs[key]}</p>
							))}
						</div>
					</LangBlock>
				</div>

				{/* Section 2 */}
				<div className={styles.section}>
					{['uk', 'en'].map((lang) => {
						const s = section2[lang]
						return (
							<LangBlock key={lang} lang={lang}>
								<h2 className={styles.sectionTitle}>{s.title}</h2>
								<div className={styles.text}>
									<p>{s.intro}</p>
									<ul className={styles.list}>
										{renderListItems(s.list, SECTION2_LIST_ORDER)}
									</ul>
								</div>
							</LangBlock>
						)
					})}
				</div>

				{/* Section 3 */}
				<div className={styles.section}>
					{['uk', 'en'].map((lang) => (
						<LangBlock key={lang} lang={lang}>
							<h2 className={styles.sectionTitle}>{section3[lang].title}</h2>
							<div className={styles.text}>
								{renderSection3(section3[lang].subsections)}
							</div>
						</LangBlock>
					))}
				</div>

				{/* Section 4 */}
				<div className={styles.section}>
					{['uk', 'en'].map((lang) => (
						<LangBlock key={lang} lang={lang}>
							<h2 className={styles.sectionTitle}>{section4[lang].title}</h2>
							<div className={styles.text}>
								{renderSection4(section4[lang].subsections)}
							</div>
						</LangBlock>
					))}
				</div>

				{/* Section 5 — contact (shared values) */}
				<div className={styles.section}>
					<LangBlock lang='uk'>
						{renderSection5(section5uk, contactValues, publishedDate)}
					</LangBlock>
					<LangBlock lang='en'>
						{renderSection5(section5en, contactValues, publishedDate)}
					</LangBlock>
				</div>

				{/* Section 6 */}
				<div className={styles.section}>
					{['uk', 'en'].map((lang) => (
						<LangBlock key={lang} lang={lang}>
							<h2 className={styles.sectionTitle}>{section6[lang].title}</h2>
							<div className={styles.text}>
								{SECTION6_SUBSECTION_ORDER.map((subKey) => {
									const sub = section6[lang].subsections[subKey]
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
						</LangBlock>
					))}
				</div>

				{/* Sections 7–11 */}
				{[
					{ id: '7', data: section7, type: 'items' },
					{ id: '8', data: section8, type: 'paragraphs' },
					{ id: '9', data: section9, type: 'text' },
					{ id: '10', data: section10, type: 'paragraphs' },
					{ id: '11', data: section11, type: 'paragraphs' },
				].map(({ id, data, type }) => (
					<div className={styles.section} key={id}>
						{['uk', 'en'].map((lang) => {
							const s = data[lang]
							return (
								<LangBlock key={lang} lang={lang}>
									<h2 className={styles.sectionTitle}>{s.title}</h2>
									<div className={styles.text}>
										{type === 'items' ? (
											<ul className={styles.list}>
												{renderListItems(s.items)}
											</ul>
										) : null}
										{type === 'paragraphs' ? (
											sortNumericKeys(s.paragraphs).map((key) => (
												<p key={key}>{s.paragraphs[key]}</p>
											))
										) : null}
										{type === 'text' ? <p>{s.text}</p> : null}
									</div>
								</LangBlock>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}
