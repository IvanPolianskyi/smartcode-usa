import LegalDoc from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'

export const metadata = {
	title: 'Privacy Policy',
	description: `Privacy Policy for ${LEGAL.brandName} - how we collect, use, and share personal data. Payments via Paddle.`,
	alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
	return (
		<LegalDoc
			title="Privacy Policy"
			updated={LEGAL.lastUpdated}
			active="/privacy"
			lede={`This Privacy Policy explains how ${LEGAL.legalName} (“we,” “us”), operating ${LEGAL.brandName} at ${LEGAL.siteDomain}, collects, uses, shares, and protects personal information. It applies to visitors, trial users, and subscribers.`}
		>
			<section>
				<h2>1. Who we are (controller)</h2>
				<p>
					<strong>Controller:</strong> {LEGAL.legalName}, {LEGAL.legalForm}
					<br />
					<strong>Address:</strong> {LEGAL.businessAddress}
					<br />
					<strong>Email:</strong>{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
					{LEGAL.supportPhone ? (
						<>
							<br />
							<strong>Phone:</strong>{' '}
							<a href={`tel:${LEGAL.supportPhone.replace(/\s/g, '')}`}>
								{LEGAL.supportPhone}
							</a>
						</>
					) : null}
				</p>
				<p>
					For payment transactions, <strong>Paddle</strong> acts as an
					independent Merchant of Record / data controller for billing data it
					collects at checkout. See Paddle’s Privacy Policy:{' '}
					<a
						href={LEGAL.paddlePrivacyUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{LEGAL.paddlePrivacyUrl}
					</a>
					.
				</p>
			</section>

			<section>
				<h2>2. Scope</h2>
				<p>
					This Policy covers the website, account area, learning platform, and
					related communications. It does not cover third-party sites we link to
					(including Discord community servers operated under Discord’s terms).
				</p>
			</section>

			<section>
				<h2>3. Information we collect</h2>
				<p>
					<strong>Account &amp; profile:</strong> name or display name, email
					address, password (hashed), locale/language preference, selected
					program(s), and account status.
				</p>
				<p>
					<strong>Learning data:</strong> course progress, lesson completion,
					quiz or exercise activity, and similar product-usage events needed to
					deliver the Service.
				</p>
				<p>
					<strong>Support:</strong> messages you send to us, and related
					metadata (timestamps, ticket context).
				</p>
				<p>
					<strong>Technical data:</strong> IP address, browser/device type,
					approximate location derived from IP, pages viewed, referrer, and
					diagnostic logs. We use this for security, debugging, and basic
					product analytics.
				</p>
				<p>
					<strong>Payment data:</strong> collected and processed by Paddle. We
					may receive limited billing metadata from Paddle (e.g. subscription
					status, plan, renewal dates, country for tax, last four digits or
					payment method type, transaction IDs). We do not store full card
					numbers.
				</p>
				<p>
					<strong>Community:</strong> if you join our Discord (or similar)
					community, Discord processes your Discord username and messages under
					Discord’s privacy policy; we may see membership status to grant access
					benefits.
				</p>
				<p>
					<strong>Marketing / lead forms (if used):</strong> if you submit a
					lead form (including Meta/Facebook or similar), we receive the contact
					details you provide for follow-up. Those platforms also process data
					under their policies.
				</p>
			</section>

			<section>
				<h2>4. How we use information (purposes &amp; legal bases)</h2>
				<p>We process personal data to:</p>
				<ul>
					<li>
						<strong>Provide the Service</strong> (account, access, progress) -
						contract performance (GDPR Art. 6(1)(b)).
					</li>
					<li>
						<strong>Process subscriptions via Paddle</strong> - contract /
						legitimate interests in fulfilling orders.
					</li>
					<li>
						<strong>Send transactional email</strong> (receipts via Paddle,
						security alerts, service notices) - contract / legitimate interests.
					</li>
					<li>
						<strong>Customer support</strong> - contract / legitimate interests.
					</li>
					<li>
						<strong>Security, fraud prevention, abuse detection</strong> -
						legitimate interests (Art. 6(1)(f)).
					</li>
					<li>
						<strong>Improve the product</strong> (aggregated or
						pseudonymized analytics) - legitimate interests.
					</li>
					<li>
						<strong>Marketing emails</strong> (if you opt in, or where soft
						opt-in is allowed) - consent or legitimate interests; you can
						unsubscribe anytime.
					</li>
					<li>
						<strong>Legal compliance</strong> (tax, accounting, responding to
						lawful requests) - legal obligation (Art. 6(1)(c)).
					</li>
				</ul>
			</section>

			<section>
				<h2>5. Cookies and similar technologies</h2>
				<p>
					We use essential cookies and local storage required for login,
					session security, locale preference, and checkout handoff. We do not
					currently use non-essential advertising cookies on the core learning
					site. If we add analytics or marketing cookies that require consent
					under applicable law, we will present a consent mechanism before
					setting them.
				</p>
				<p>
					You can control cookies through your browser settings. Blocking
					essential cookies may break login or checkout.
				</p>
			</section>

			<section>
				<h2>6. Sharing and processors</h2>
				<p>We share personal data only as needed:</p>
				<ul>
					<li>
						<strong>Paddle</strong> - payments, invoicing, tax, fraud screening,
						subscription management (Merchant of Record).
					</li>
					<li>
						<strong>Hosting &amp; infrastructure</strong> - cloud hosting
						providers that store application and database data under our
						instructions.
					</li>
					<li>
						<strong>Email delivery</strong> - transactional and (if applicable)
						marketing email providers.
					</li>
					<li>
						<strong>Discord</strong> - if you choose to join community channels.
					</li>
					<li>
						<strong>Professional advisors</strong> - accountants, lawyers, under
						confidentiality.
					</li>
					<li>
						<strong>Authorities</strong> - when required by law or to protect
						rights, safety, and security.
					</li>
					<li>
						<strong>Business transfers</strong> - in a merger, acquisition, or
						asset sale, subject to appropriate safeguards.
					</li>
				</ul>
				<p>
					We do <strong>not sell</strong> personal information for money. We do
					not “share” personal information for cross-context behavioral
					advertising as defined under the California CPRA, unless we disclose
					otherwise and offer required opt-outs.
				</p>
			</section>

			<section>
				<h2>7. International transfers</h2>
				<p>
					We are based in Ukraine and use service providers that may process
					data in the United States, European Economic Area, United Kingdom, or
					other countries. Where required, we rely on appropriate safeguards
					(such as Standard Contractual Clauses) or other lawful transfer
					mechanisms offered by our providers.
				</p>
			</section>

			<section>
				<h2>8. Retention</h2>
				<ul>
					<li>
						<strong>Account &amp; learning data:</strong> kept while your
						account is active. After you request deletion or the account is
						closed, we delete or anonymize within 30 days, except data we must
						retain longer (below).
					</li>
					<li>
						<strong>Billing &amp; tax records:</strong> typically retained up to
						7 years (or longer if required by law), often via Paddle’s systems.
					</li>
					<li>
						<strong>Support correspondence:</strong> up to 24 months after
						closure of the request, unless needed longer for disputes.
					</li>
					<li>
						<strong>Security logs:</strong> typically 90 days, longer if
						investigating an incident.
					</li>
				</ul>
			</section>

			<section>
				<h2>9. Security</h2>
				<p>
					We use industry-standard measures appropriate to the risk, including
					HTTPS, hashed passwords, access controls, and least-privilege
					practices. No method of transmission or storage is 100% secure. Notify
					us promptly of suspected unauthorized access at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>.
				</p>
			</section>

			<section>
				<h2>10. Your rights</h2>
				<p>
					Depending on your location (including GDPR/UK GDPR and CCPA/CPRA), you
					may have rights to:
				</p>
				<ul>
					<li>access a copy of your personal data;</li>
					<li>correct inaccurate data;</li>
					<li>delete data (subject to legal exceptions);</li>
					<li>restrict or object to certain processing;</li>
					<li>data portability;</li>
					<li>withdraw consent where processing is consent-based;</li>
					<li>
						opt out of sale/sharing (we do not sell; see Section 6) and certain
						profiling where applicable;
					</li>
					<li>lodge a complaint with a supervisory authority.</li>
				</ul>
				<p>
					To exercise rights, email{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>. We
					will verify your request and respond within the time required by law
					(generally 30 days under GDPR; 45 days under CCPA, extendable as
					permitted). Authorized agents may submit CCPA requests with proof of
					authority.
				</p>
				<p>
					<strong>California “Do Not Sell or Share My Personal Information”:</strong>{' '}
					we do not sell or share personal information as those terms are defined
					in the CPRA for cross-context behavioral advertising. If that changes,
					we will update this Policy and provide a clear opt-out link.
				</p>
				<p>
					<strong>Nevada / other US state laws:</strong> we do not sell covered
					information as defined under Nevada SB 220. Residents of other US
					states with privacy laws may contact us to exercise applicable rights.
				</p>
			</section>

			<section>
				<h2>11. Children</h2>
				<p>
					The Service is not directed to children under 13, and we do not
					knowingly collect personal information from children under 13 (COPPA).
					Users under 16 (or higher local digital-consent age) should use the
					Service only with appropriate parental/guardian involvement where
					required. If you believe we collected a child’s data, contact us for
					deletion.
				</p>
			</section>

			<section>
				<h2>12. Automated decision-making</h2>
				<p>
					We do not use automated decision-making that produces legal or
					similarly significant effects about you without human involvement.
					Fraud checks by Paddle may be automated as part of payment processing;
					see Paddle’s policies for details.
				</p>
			</section>

			<section>
				<h2>13. Changes</h2>
				<p>
					We may update this Privacy Policy. The “Last updated” date will
					change. Material changes will be communicated by email or a prominent
					notice where appropriate.
				</p>
			</section>

			<section>
				<h2>14. Contact / complaints</h2>
				<p>
					Privacy questions and requests:{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
					<br />
					{LEGAL.legalName}, {LEGAL.businessAddress}
				</p>
				<p>
					EEA/UK users may also complain to their local data protection
					authority. You may contact us first so we can try to resolve the
					issue.
				</p>
			</section>
		</LegalDoc>
	)
}
