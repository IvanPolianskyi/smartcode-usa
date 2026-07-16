'use client'

import { useTranslations } from 'next-intl'
import styles from '@/app/[locale]/oferta/OfertaPage.module.css'
import MerchantContactBlock from '@/components/Legal/MerchantContactBlock'
import { linkifyLegalReferences } from '@/components/Oferta/linkifyLegalReferences'

function sortNumericKeys(obj) {
	return Object.keys(obj).sort((a, b) => Number(a) - Number(b))
}

function renderLegalText(text) {
	return linkifyLegalReferences(text, styles.policyLink)
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
			return <li key={key}>{renderLegalText(item)}</li>
		}
		const { title, text, sublist } = item
		return (
			<li key={key}>
				<strong>{title}</strong>
				{text ? <> - {renderLegalText(text)}</> : null}
				{sublist ? (
					<ul className={styles.sublist}>
						{sortNumericKeys(sublist).map((sk) => (
							<li key={sk}>{renderLegalText(sublist[sk])}</li>
						))}
					</ul>
				) : null}
			</li>
		)
	})
}

const SECTION3_PAYMENT_ITEMS_ORDER = ['monobank', 'bank', 'other', 'appleGoogle']
const SECTION2_LIST_ORDER = ['onlineLessons', 'courses', 'materials']
const SECTION3_SUBSECTION_ORDER = ['order', 'terms', 'payment', 'prepayment', 'delivery', 'absences']
const SECTION4_SUBSECTION_ORDER = ['conditions', 'procedure', 'noRefund', 'cancellation']
const SECTION4_CONDITIONS_ITEMS_ORDER = ['beforeStart', '14days', 'technical']
const SECTION6_SUBSECTION_ORDER = ['provider', 'customer']

function renderSection3(subsections, subsectionOrder) {
	return subsectionOrder.map((subKey) => {
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
						<p>{renderLegalText(sub.intro)}</p>
						<ul className={styles.list}>
							{renderListItems(sub.items, SECTION3_PAYMENT_ITEMS_ORDER)}
						</ul>
						<p>{renderLegalText(sub.note)}</p>
					</>
				) : null}
				{subKey === 'prepayment' ? <p>{renderLegalText(sub.text)}</p> : null}
				{subKey === 'delivery' ? (
					<>
						<p>{renderLegalText(sub.text)}</p>
						{sub.items ? (
							<ul className={styles.list}>{renderListItems(sub.items)}</ul>
						) : null}
					</>
				) : null}
				{subKey === 'absences' ? <p>{renderLegalText(sub.text)}</p> : null}
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
						<p>{renderLegalText(sub.intro)}</p>
						<ul className={styles.list}>
							{renderListItems(sub.items, SECTION4_CONDITIONS_ITEMS_ORDER)}
						</ul>
					</>
				) : null}
				{subKey === 'procedure' || subKey === 'noRefund' ? (
					<ul className={styles.list}>{renderListItems(sub.items)}</ul>
				) : null}
				{subKey === 'cancellation' ? <p>{renderLegalText(sub.text)}</p> : null}
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
	const section2ListOrder = SECTION2_LIST_ORDER
	const section3SubOrder = SECTION3_SUBSECTION_ORDER
	const section5 = t.raw('sections.5')
	const section6 = t.raw('sections.6')
	const section7 = t.raw('sections.7')
	const section8 = t.raw('sections.8')
	const section9 = t.raw('sections.9')
	const section10 = t.raw('sections.10')
	const section11 = t.raw('sections.11')
	const localeTag = 'uk-UA'

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<h1 className={styles.title}>{t('title')}</h1>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section1.title}</h2>
					<div className={styles.text}>
						{sortNumericKeys(section1.paragraphs).map((key) => (
							<p key={key}>{renderLegalText(section1.paragraphs[key])}</p>
						))}
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section2.title}</h2>
					<div className={styles.text}>
						<p>{renderLegalText(section2.intro)}</p>
						<ul className={styles.list}>
							{renderListItems(section2.list, section2ListOrder)}
						</ul>
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section3.title}</h2>
					<div className={styles.text}>{renderSection3(section3.subsections, section3SubOrder)}</div>
				</div>

				{section4 ? (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>{section4.title}</h2>
						<div className={styles.text}>
							{section4.paragraphs
								? sortNumericKeys(section4.paragraphs).map((key) => (
										<p key={key}>{renderLegalText(section4.paragraphs[key])}</p>
								  ))
								: null}
							{section4.subsections
								? renderSection4(section4.subsections)
								: null}
						</div>
					</div>
				) : null}

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
										<p key={key}>{renderLegalText(data.paragraphs[key])}</p>
								  ))
								: null}
							{type === 'text' ? <p>{renderLegalText(data.text)}</p> : null}
						</div>
					</div>
				))}

				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>{section5.title}</h2>
					<MerchantContactBlock />
					{section5.publishedDate ? (
						<p className={styles.date}>
							{section5.publishedDate}{' '}
							{new Date().toLocaleDateString(localeTag, {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					) : null}
				</div>
			</div>
		</div>
	)
}
