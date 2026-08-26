/**
 * Shared merchant / support details for Terms, Privacy, and Refund pages.
 * Paddle reviewers check these values - never leave template placeholders.
 */

function siteHostFromEnv() {
	const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'
	try {
		return new URL(raw).host
	} catch {
		return 'smartcode.academy'
	}
}

/** Prefer the public product domain on legal pages (never show localhost). */
function displaySiteHost() {
	const host = siteHostFromEnv()
	if (
		!host ||
		host === 'localhost' ||
		host.startsWith('127.') ||
		host.includes('localhost:')
	) {
		return 'smartcode.academy'
	}
	return host
}

export const LEGAL = {
	brandName: 'SmartCode Academy',
	legalName: 'Ivan Polianskyi',
	legalForm: 'sole proprietor (FOP), Ukraine',
	businessAddress:
		process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ||
		'Zastavna, Chernivtsi Oblast, Ukraine',
	supportEmail:
		process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
		process.env.NEXT_PUBLIC_MERCHANT_EMAIL ||
		process.env.SUPPORT_EMAIL ||
		'smartcodeacademy@gmail.com',
	supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+380 96 957 67 23',
	siteDomain: displaySiteHost(),
	siteUrl: `https://${displaySiteHost()}`,
	lastUpdated: '26 August 2026',
	/** Per-program pricing shown on the marketing site and in Terms. */
	monthlyPrice: '$14',
	annualPrice: '$99',
	premiumMonthlyPrice: '$20',
	premiumAnnualPrice: '$149',
	trialDays: 3,
	/** Seller money-back window (Paddle requires ≥ 30 days). */
	refundDays: 30,
	paddleBuyerTermsUrl: 'https://www.paddle.com/legal/checkout-buyer-terms',
	paddlePrivacyUrl: 'https://www.paddle.com/legal/privacy',
	paddleSupportUrl: 'https://www.paddle.com/support',
	paddleNetUrl: 'https://paddle.net',
	/** Complaint escalation (Paddle best practice). */
	complaintAckDays: 2,
	complaintResolveDays: 14,
	euConsumerCentreUrl: 'https://consumer-redress.ec.europa.eu/index_en',
	ukConsumerUrl: 'https://www.citizensadvice.org.uk/',
	usFtcComplaintUrl: 'https://reportfraud.ftc.gov/',
}
