/**
 * Shared merchant / support details for Terms, Privacy, and Refund pages.
 * Paddle reviewers check these values, so they must resolve to real text — never
 * template placeholders like {{SUPPORT_EMAIL}}.
 */

function siteHostFromEnv() {
	const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'
	try {
		return new URL(raw).host
	} catch {
		return 'smartcode.academy'
	}
}

export const LEGAL = {
	brandName: 'SmartCode Academy',
	legalName: 'Ivan Polianskyi',
	legalForm: 'sole proprietor (FOP), Ukraine',
	businessAddress:
		process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Ukraine',
	supportEmail:
		process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
		process.env.NEXT_PUBLIC_MERCHANT_EMAIL ||
		process.env.SUPPORT_EMAIL ||
		'support@smartcode.academy',
	supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '',
	siteDomain: siteHostFromEnv(),
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy',
	lastUpdated: '26 August 2026',
	/** Per-program pricing shown on the marketing site and in Terms. */
	monthlyPrice: '$14',
	annualPrice: '$99',
	premiumMonthlyPrice: '$20',
	premiumAnnualPrice: '$149',
	trialDays: 3,
	/** Seller money-back window (Paddle recommends ≥ 30 days). */
	refundDays: 30,
	paddleBuyerTermsUrl: 'https://www.paddle.com/legal/checkout-buyer-terms',
	paddleSupportUrl: 'https://paddle.net',
}
