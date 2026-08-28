import { BILLING_TIERS } from './billingCatalog.js'
import { LEGAL } from './legalConfig.js'

/**
 * Schema.org payloads for the marketing pages.
 *
 * Google shows course and FAQ rich results for pages that declare them; a
 * course site that omits them competes for the same clicks with a plain blue
 * link.
 */

export function organizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'EducationalOrganization',
		name: LEGAL.brandName,
		url: LEGAL.siteUrl,
		email: LEGAL.supportEmail,
		telephone: LEGAL.supportPhone,
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'UA',
			streetAddress: LEGAL.businessAddress,
		},
		sameAs: ['https://www.instagram.com/smartcode_academy_official/'],
	}
}

export function faqSchema(items = []) {
	if (!items.length) return null
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: { '@type': 'Answer', text: item.a },
		})),
	}
}

/** One program, priced. `offers` is what earns the price in a search result. */
export function courseSchema({ name, description, courseId }) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Course',
		name,
		description,
		url: `${LEGAL.siteUrl}/plans/${courseId}`,
		provider: {
			'@type': 'EducationalOrganization',
			name: LEGAL.brandName,
			url: LEGAL.siteUrl,
		},
		hasCourseInstance: {
			'@type': 'CourseInstance',
			courseMode: 'online',
			courseWorkload: 'PT2H',
		},
		offers: [
			{
				'@type': 'Offer',
				category: 'subscription',
				price: String(Number(BILLING_TIERS.standard.monthlyPrice.replace(/[^0-9.]/g, ''))),
				priceCurrency: 'USD',
				availability: 'https://schema.org/InStock',
				url: `${LEGAL.siteUrl}/plans/${courseId}`,
			},
		],
	}
}
