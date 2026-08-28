import LegalDoc, { LegalCallout } from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'

export const metadata = {
	title: 'Terms of Service',
	description: `Terms of Service for ${LEGAL.brandName} - subscription learning platform. Merchant of Record: Paddle.`,
	alternates: { canonical: '/terms' },
}

export default function TermsPage() {
	return (
		<LegalDoc
			title="Terms of Service"
			updated={LEGAL.lastUpdated}
			active="/terms"
			lede={`These Terms of Service (“Terms”) govern your access to and use of ${LEGAL.brandName} at ${LEGAL.siteDomain} (the “Service”). By creating an account, starting a free trial, or completing a purchase, you agree to these Terms, our Privacy Policy, and our Refund Policy.`}
		>
			<section>
				<h2>1. Merchant of Record</h2>
				<LegalCallout>
					<p>
						Our order process is conducted by our online reseller Paddle.com
						Market Limited (and its affiliates, “Paddle”). Paddle is the Merchant
						of Record for all our orders. Paddle provides all customer service
						inquiries and handles returns.
					</p>
				</LegalCallout>
				<p>
					Paddle’s Buyer Terms apply to the purchase transaction:{' '}
					<a
						href={LEGAL.paddleBuyerTermsUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{LEGAL.paddleBuyerTermsUrl}
					</a>
					. Paddle’s Privacy Policy:{' '}
					<a
						href={LEGAL.paddlePrivacyUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{LEGAL.paddlePrivacyUrl}
					</a>
					.
				</p>
				<p>
					{LEGAL.legalName}, {LEGAL.legalForm} (“we,” “us,” or “Vendor”),
					operates the Service and fulfills digital access after purchase.
					Business address: {LEGAL.businessAddress}. Support:{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
					{LEGAL.supportPhone ? (
						<>
							{' '}
							· <a href={`tel:${LEGAL.supportPhone.replace(/\s/g, '')}`}>{LEGAL.supportPhone}</a>
						</>
					) : null}
					.
				</p>
			</section>

			<section>
				<h2>2. Eligibility</h2>
				<p>
					You must be at least 16 years old (or the age of digital consent in
					your country, if higher) and able to form a binding contract. If you
					use the Service on behalf of an organization, you represent that you
					have authority to bind that organization. The Service is not directed
					to children under 13 (COPPA).
				</p>
			</section>

			<section>
				<h2>3. The Service</h2>
				<p>
					{LEGAL.brandName} provides online programming courses, learning
					materials, progress tracking, and related community features
					(including optional Discord access for enrolled members). We may
					update, improve, or discontinue features with reasonable notice when
					materially adverse to paying subscribers. Course content is licensed,
					not sold.
				</p>
			</section>

			<section>
				<h2>4. Accounts</h2>
				<p>
					You are responsible for your account credentials and for activity
					under your account. Provide accurate registration information and keep
					it current. Notify us promptly of unauthorized access at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>. We
					may suspend or terminate accounts that violate these Terms, abuse the
					platform, or create security or legal risk.
				</p>
			</section>

			<section>
				<h2>5. Free trial, pricing, and auto-renewal</h2>
				<p>
					<strong>Free trial.</strong> New subscriptions may include a free
					trial of {LEGAL.trialDays} days. You authorize Paddle to store your
					payment method and to charge the then-current subscription price when
					the trial ends, unless you cancel before the trial expires. You will
					not be charged during the trial if you cancel in time.
				</p>
				<p>
					<strong>Prices (USD).</strong> {LEGAL.monthlyPrice}/month or{' '}
					{LEGAL.annualPrice}/year per program. Applicable taxes (VAT, sales tax,
					etc.) are calculated and collected by Paddle as Merchant of Record and
					shown at checkout. Prices may change for future renewal periods; we
					will provide notice as required by law and/or via email before a
					price change takes effect for your next renewal.
				</p>
				<p>
					<strong>Automatic renewal (important).</strong> Unless you cancel,
					your subscription renews automatically at the end of each billing
					period (monthly or annual) for the same plan and term, and your
					payment method on file with Paddle will be charged the renewal price
					plus applicable taxes. By starting a trial or paid subscription, you
					expressly agree to these recurring charges until you cancel.
				</p>
				<p>
					<strong>How to cancel.</strong> You may cancel anytime from your
					account billing settings or by contacting{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a> or
					Paddle support. Cancellation stops future renewals; it does not
					automatically refund the current period except as described in our{' '}
					<a href="/refund">Refund Policy</a>. Access continues through the end
					of the paid period already purchased, unless a refund is issued.
				</p>
			</section>

			<section>
				<h2>6. Payment and billing</h2>
				<p>
					All payments are processed by Paddle. We do not store full card
					numbers. Failed payments may result in suspension of access until the
					invoice is paid or the subscription is canceled. Receipts and invoices
					are issued by Paddle.
				</p>
			</section>

			<section>
				<h2>7. Refunds and statutory withdrawal</h2>
				<p>
					Our voluntary seller guarantee is a {LEGAL.refundDays}-day money-back
					window on the first paid charge for a subscription, as detailed in the{' '}
					<a href="/refund">Refund Policy</a>. That policy also explains how EU/UK
					consumers’ statutory withdrawal rights interact with digital content
					and services. Chargebacks should be a last resort; contact us or
					Paddle first so we can resolve the issue quickly.
				</p>
			</section>

			<section>
				<h2>8. License and acceptable use</h2>
				<p>
					We grant you a limited, non-exclusive, non-transferable, revocable
					license to access the Service for your personal educational use while
					your subscription is active. You may not:
				</p>
				<ul>
					<li>share, resell, sublicense, or publicly redistribute course materials;</li>
					<li>scrape, bulk-download, or reverse engineer the Service except as allowed by law;</li>
					<li>circumvent access controls, trials, or payment systems;</li>
					<li>harass others, spam, or upload malware;</li>
					<li>use the Service for unlawful purposes or in violation of export/sanctions laws.</li>
				</ul>
				<p>
					Community spaces (e.g. Discord) remain subject to their own rules and
					to our moderation. Violation may result in removal from community
					features and/or termination of the account without refund where
					permitted by law and our Refund Policy.
				</p>
			</section>

			<section>
				<h2>9. Intellectual property</h2>
				<p>
					All course content, branding, software, and related materials are
					owned by us or our licensors. Feedback you submit may be used by us
					without obligation to you. You retain ownership of content you post in
					community channels; you grant us a license to host and display that
					content as needed to operate the Service.
				</p>
			</section>

			<section>
				<h2>10. Third-party services</h2>
				<p>
					The Service may link to or integrate third parties (including Paddle
					checkout, Discord, email delivery, and analytics). Their terms and
					privacy policies apply to those services. We are not responsible for
					third-party sites or services we do not control.
				</p>
			</section>

			<section>
				<h2>11. Disclaimers</h2>
				<p>
					THE SERVICE AND CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO
					THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES OF
					MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
					NON-INFRINGEMENT. We do not guarantee specific career outcomes, exam
					results, or uninterrupted availability. Educational content may
					contain errors; use professional judgment.
				</p>
				<p>
					Nothing in these Terms excludes or limits liability that cannot be
					excluded under applicable consumer protection law (including for
					death or personal injury caused by negligence, fraud, or statutory
					rights that cannot be waived).
				</p>
			</section>

			<section>
				<h2>12. Limitation of liability</h2>
				<p>
					TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY ARISING
					OUT OF OR RELATED TO THE SERVICE OR THESE TERMS WILL NOT EXCEED THE
					AMOUNTS YOU PAID TO PADDLE FOR THE SERVICE IN THE TWELVE (12) MONTHS
					BEFORE THE CLAIM. WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
					SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR LOST
					PROFITS, DATA, OR GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY.
				</p>
			</section>

			<section>
				<h2>13. Indemnity</h2>
				<p>
					You will defend and indemnify us against claims arising from your
					misuse of the Service, violation of these Terms, or infringement of
					third-party rights, except to the extent caused by our willful
					misconduct.
				</p>
			</section>

			<section>
				<h2>14. Complaints and escalation</h2>
				<p>
					For product, access, or billing issues, email{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>. We
					acknowledge complaints within {LEGAL.complaintAckDays} business days
					and aim to resolve them within {LEGAL.complaintResolveDays} business
					days. Billing disputes may also be raised with Paddle:{' '}
					<a
						href={LEGAL.paddleSupportUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{LEGAL.paddleSupportUrl}
					</a>{' '}
					or via{' '}
					<a
						href={LEGAL.paddleNetUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						paddle.net
					</a>
					.
				</p>
				<p>
					If we cannot resolve a dispute, you may seek help from an independent
					body without prejudice to your other rights:
				</p>
				<ul>
					<li>
						<strong>EU consumers:</strong> European online dispute redress
						information -{' '}
						<a
							href={LEGAL.euConsumerCentreUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							consumer-redress.ec.europa.eu
						</a>
					</li>
					<li>
						<strong>UK consumers:</strong>{' '}
						<a
							href={LEGAL.ukConsumerUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Citizens Advice
						</a>
					</li>
					<li>
						<strong>US consumers:</strong> your state attorney general’s
						consumer protection office, or{' '}
						<a
							href={LEGAL.usFtcComplaintUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							reportfraud.ftc.gov
						</a>
					</li>
					<li>
						<strong>Ukraine:</strong> State Service of Ukraine on Food Safety
						and Consumer Protection (consumer protection authority)
					</li>
				</ul>
			</section>

			<section>
				<h2>15. Governing law and disputes</h2>
				<p>
					These Terms are governed by the laws of Ukraine, without regard to
					conflict-of-law rules, except that mandatory consumer protection laws
					of your country of residence continue to apply and cannot be waived.
					Courts of competent jurisdiction in Ukraine have exclusive venue for
					disputes we bring, subject to your non-waivable rights to bring
					claims in your local courts where required by law.
				</p>
			</section>

			<section>
				<h2>16. Changes</h2>
				<p>
					We may update these Terms. The “Last updated” date will change. For
					material changes affecting paid subscribers, we will provide notice by
					email or in-product notice where reasonably practicable. Continued use
					after the effective date constitutes acceptance, except where local
					law requires affirmative consent.
				</p>
			</section>

			<section>
				<h2>17. General</h2>
				<p>
					<strong>Entire agreement.</strong> These Terms, the Privacy Policy,
					and the Refund Policy are the entire agreement between you and us
					regarding the Service (purchase terms with Paddle also apply to
					payment).
				</p>
				<p>
					<strong>Severability.</strong> If a provision is unenforceable, the
					remainder stays in effect.
				</p>
				<p>
					<strong>Assignment.</strong> You may not assign these Terms without
					our consent. We may assign them in connection with a merger, sale, or
					reorganization.
				</p>
				<p>
					<strong>Electronic communications.</strong> You consent to receive
					notices electronically (email and in-product). Notices are deemed
					received when sent to the email on your account.
				</p>
				<p>
					<strong>Force majeure.</strong> We are not liable for delays or
					failures caused by events beyond our reasonable control.
				</p>
				<p>
					<strong>No waiver.</strong> Failure to enforce a provision is not a
					waiver of future enforcement.
				</p>
			</section>

			<section>
				<h2>18. Contact</h2>
				<p>
					{LEGAL.legalName} ({LEGAL.legalForm})
					<br />
					{LEGAL.businessAddress}
					<br />
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
					{LEGAL.supportPhone ? (
						<>
							<br />
							<a href={`tel:${LEGAL.supportPhone.replace(/\s/g, '')}`}>
								{LEGAL.supportPhone}
							</a>
						</>
					) : null}
					<br />
					Website:{' '}
					<a href={LEGAL.siteUrl}>{LEGAL.siteDomain}</a>
				</p>
			</section>
		</LegalDoc>
	)
}
