import { LegalDoc, LegalSection } from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'
import { Link } from '@/i18n/navigation'

export default function PrivacyPage() {
	return (
		<LegalDoc
			active="/privacy"
			title="Privacy Policy"
			summary="This page explains what personal data we collect, why we collect it, and what rights you have over it."
			lastUpdated={LEGAL.lastUpdated}
		>
			<LegalSection n={1} title="Who we are">
				<p>
					{LEGAL.brandName} ({LEGAL.siteDomain}) is operated by{' '}
					{LEGAL.legalName}, {LEGAL.legalForm} (&ldquo;we&rdquo;,
					&ldquo;us&rdquo;, &ldquo;our&rdquo;), registered address{' '}
					{LEGAL.businessAddress}. We are the data controller for the
					personal data described in this policy. Contact us at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					{LEGAL.supportPhone ? (
						<>
							{' '}
							or {LEGAL.supportPhone}
						</>
					) : null}
					.
				</p>
			</LegalSection>

			<LegalSection n={2} title="Data we collect">
				<ul>
					<li>
						<strong>Account data:</strong> your name, email address,
						and account password (stored in hashed form).
					</li>
					<li>
						<strong>Course data:</strong> your progress through
						lessons and quizzes, completed practice tasks, and course
						activity.
					</li>
					<li>
						<strong>Technical data:</strong> IP address, device and
						browser type, and log data generated when you use the
						service.
					</li>
					<li>
						<strong>Payment data:</strong> handled entirely by Paddle,
						our payment provider and Merchant of Record. We never see
						or store your full card number, card expiry date, or CVV.
						We only receive confirmation that a payment succeeded or
						failed, along with limited billing details such as the
						subscription plan and amount. See also{' '}
						<a
							href="https://www.paddle.com/legal/privacy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Paddle&apos;s Privacy Policy
						</a>
						.
					</li>
				</ul>
			</LegalSection>

			<LegalSection n={3} title="How we use your data">
				<p>We use this data to:</p>
				<ul>
					<li>create and manage your account</li>
					<li>
						give you access to courses and track your learning progress
					</li>
					<li>
						process subscription payments through Paddle and manage
						billing
					</li>
					<li>
						respond to support requests sent to{' '}
						<a href={`mailto:${LEGAL.supportEmail}`}>
							{LEGAL.supportEmail}
						</a>
					</li>
					<li>
						send service-related emails, such as billing notices,
						trial reminders, and changes to these policies
					</li>
					<li>keep the service secure and diagnose technical problems</li>
					<li>improve the courses and the platform</li>
				</ul>
			</LegalSection>

			<LegalSection n={4} title="Legal basis for processing (GDPR)">
				<p>
					Where the GDPR applies, we process your data on these legal
					bases:
				</p>
				<ul>
					<li>
						<strong>Contract performance:</strong> to create your
						account, provide course access, and process your
						subscription.
					</li>
					<li>
						<strong>Legitimate interest:</strong> to keep the service
						secure, prevent abuse, and improve our courses.
					</li>
					<li>
						<strong>Consent:</strong> where we ask for it separately,
						such as for optional marketing emails. You can withdraw
						consent at any time.
					</li>
					<li>
						<strong>Legal obligation:</strong> where we must keep
						records for tax, accounting, or regulatory reasons.
					</li>
				</ul>
			</LegalSection>

			<LegalSection n={5} title="Who we share data with">
				<p>
					We do not sell your personal data. We share data only with
					these third parties, and only as needed to run the service:
				</p>
				<ul>
					<li>
						<strong>Paddle.com Market Limited</strong>, our payment
						provider and Merchant of Record, to process subscription
						payments, handle tax, and process refunds.
					</li>
					<li>
						<strong>Our hosting provider</strong>, to store account
						data and run the platform.
					</li>
					<li>
						<strong>Our email delivery provider</strong>, to send
						account and billing emails.
					</li>
				</ul>
				<p>
					We do not use advertising or marketing &ldquo;partners&rdquo;,
					and we do not sell or rent your data to third parties for their
					own marketing.
				</p>
			</LegalSection>

			<LegalSection n={6} title="International data transfers">
				<p>
					Some of the providers listed above may process data outside
					your home country, including outside the European Economic
					Area. Where this happens, we rely on appropriate safeguards,
					such as standard contractual clauses or the provider&apos;s
					own compliance certifications, to protect your data.
				</p>
			</LegalSection>

			<LegalSection n={7} title="How long we keep data">
				<p>
					We keep account and course data for as long as your account is
					active. If you close your account, we delete or anonymize your
					personal data within a reasonable period, unless we are
					required to keep it longer for tax, accounting, or legal
					reasons. Technical log data is kept for a limited period and
					then deleted automatically.
				</p>
			</LegalSection>

			<LegalSection n={8} title="Your rights">
				<p>Depending on where you live, you may have the right to:</p>
				<ul>
					<li>access the personal data we hold about you</li>
					<li>correct inaccurate data (rectification)</li>
					<li>request deletion of your data</li>
					<li>receive a copy of your data in a portable format</li>
					<li>
						object to certain processing, including for direct
						marketing
					</li>
					<li>withdraw consent where processing is based on consent</li>
				</ul>
				<p>
					If you are in the EU/EEA (GDPR) or California (CCPA/CPRA),
					these rights apply to you directly. To exercise any of them,
					email{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					. We will respond within 30 days. For payment data held by
					Paddle, you may also contact Paddle at{' '}
					<a
						href={LEGAL.paddleSupportUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						paddle.net
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection n={9} title="Cookies">
				<p>
					We use session cookies to keep you signed in and to remember
					your account state. These cookies are required for the service
					to work and are not used for advertising.
				</p>
				<p>
					We do not currently use analytics cookies. We do not set
					advertising or cross-site tracking cookies of any kind.
				</p>
			</LegalSection>

			<LegalSection n={10} title="Children">
				<p>
					Our service is not directed at children under 13. Creating an
					account requires you to be 13 or older, and if you are under 18
					you need permission from a parent or guardian. If we learn that
					we have collected personal data from a child under 13, we will
					delete it. A parent or guardian who believes we hold data about
					their child can request its deletion at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection n={11} title="Security">
				<p>
					We use reasonable technical and organizational measures to
					protect your data, including hashed storage of passwords and
					restricted access to account data. Payment card data is
					handled only by Paddle (PCI DSS). No method of transmission or
					storage is completely secure, so we cannot guarantee absolute
					security.
				</p>
			</LegalSection>

			<LegalSection n={12} title="Changes to this policy">
				<p>
					We may update this Privacy Policy from time to time. If we make
					a material change, we will notify you by email at least 30 days
					before it takes effect. See also our{' '}
					<Link href="/terms">Terms of Service</Link> and{' '}
					<Link href="/refund">Refund Policy</Link>.
				</p>
			</LegalSection>

			<LegalSection n={13} title="Contact us">
				<p>
					Questions about this policy or your data? Email{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					{LEGAL.supportPhone ? (
						<>
							{' '}
							or call{' '}
							<a href={`tel:${LEGAL.supportPhone.replace(/\s+/g, '')}`}>
								{LEGAL.supportPhone}
							</a>
						</>
					) : null}
					. Controller: {LEGAL.legalName}, {LEGAL.legalForm},{' '}
					{LEGAL.businessAddress}.
				</p>
			</LegalSection>
		</LegalDoc>
	)
}
