'use client'

import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'
import MerchantContactBlock from '@/components/Legal/MerchantContactBlock'

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

function renderSection3(subsections) {
	return SECTION3_SUBSECTION_ORDER.map((subKey) => {
		const sub = subsections[subKey]
		if (!sub) return null
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
		if (!sub) return null
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

export default function OfertaContent() {
	const t = useTranslations('pages.oferta')
	const section1 = t.raw('sections.1')
	const section2 = t.raw('sections.2')
	const section3 = t.raw('sections.3')
	const section4 = t.raw('sections.4')
	const section5 = t.raw('sections.5')
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

				{/* Section 1 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section1.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section1.paragraphs).map((key) => (
							<p key={key}>{section1.paragraphs[key]}</p>
						))}
					</div>
				</div>

				{/* Section 2 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section2.title}</h2>
					<div className={styles.text}>
						<p>{section2.intro}</p>
						<ul className={styles.list}>
							{renderListItems(section2.list, SECTION2_LIST_ORDER)}
						</ul>
					</div>
				</div>

				{/* Section 3 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section3.title}</h2>
					<div className={styles.text}>{renderSection3(section3.subsections)}</div>
				</div>

				{/* Section 4 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section4.title}</h2>
					<div className={styles.text}>{renderSection4(section4.subsections)}</div>
				</div>

				{/* Section 5 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section5.title}</h2>
					<MerchantContactBlock />
					{section5.publishedDate ? (
						<p className={styles.date}>
							{section5.publishedDate} {new Date().toLocaleDateString()}
						</p>
					) : null}
				</div>

				{/* Section 6 */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section6.title}</h2>
					<div className={styles.text}>
						{SECTION6_SUBSECTION_ORDER.map((subKey) => {
							const sub = section6.subsections[subKey]
							if (!sub) return null
							return (
								<div key={subKey}>
									<h3 className={styles.subsectionTitle}>{sub.title}</h3>
									<ul className={styles.list}>{renderListItems(sub.items)}</ul>
								</div>
							)
						})}
					</div>
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
						<h2 className={styles.sectionTitle}>{data.title}</h2>
						<div className={styles.text}>
							{type === 'items' ? (
								<ul className={styles.list}>{renderListItems(data.items)}</ul>
							) : null}
							{type === 'paragraphs'
								? sortNumericKeys(data.paragraphs).map((key) => (
										<p key={key}>{data.paragraphs[key]}</p>
								  ))
								: null}
							{type === 'text' ? <p>{data.text}</p> : null}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
