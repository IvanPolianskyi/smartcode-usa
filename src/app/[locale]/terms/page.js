import { LegalDoc, LegalSection, LegalCallout } from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'
import { Link } from '@/i18n/navigation'

function SupportContacts() {
	return (
		<>
			<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>
			{LEGAL.supportPhone ? (
				<>
					{' '}
					or{' '}
					<a href={`tel:${LEGAL.supportPhone.replace(/\s+/g, '')}`}>
						{LEGAL.supportPhone}
					</a>
				</>
			) : null}
		</>
	)
}

export default function TermsPage() {
	return (
		<LegalDoc
			active="/terms"
			title="Terms of Service"
			summary="These Terms explain what you get when you subscribe to SmartCode Academy and what we expect from you in return."
			lastUpdated={LEGAL.lastUpdated}
		>
			<LegalSection n={1} title="Who we are">
				<p>
					{LEGAL.brandName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
					&ldquo;our&rdquo;) is an online platform offering programming
					courses at {LEGAL.siteDomain}. The service is operated by{' '}
					{LEGAL.legalName}, {LEGAL.legalForm}, registered address{' '}
					{LEGAL.businessAddress}. Buyer support:{' '}
					<SupportContacts />.
				</p>
			</LegalSection>

			<LegalSection n={2} title="The service">
				<p>
					SmartCode Academy provides subscription access to structured
					online courses that teach programming, including lessons,
					quizzes, practice tasks, and live lessons where included in
					your plan. Our catalogue includes separate programs such as
					Roblox Studio, Python, and AI at Work. You subscribe per
					program. New modules may be added while you remain a
					subscriber.
				</p>
				<p>
					Our courses are for learning and skill-building only. We are
					not an accredited school, college, or university. Completing a
					course does not grant a recognized diploma, degree, or
					professional certification, and we do not guarantee any
					employment or career outcome.
				</p>
			</LegalSection>

			<LegalSection n={3} title="Eligibility">
				<p>
					You must be at least 13 years old to create an account. If you
					are under 18, you need permission from a parent or legal
					guardian to use the service and to start a paid subscription.
					By subscribing, you confirm that you meet these requirements,
					or that a parent or guardian has agreed to these Terms on your
					behalf.
				</p>
			</LegalSection>

			<LegalSection n={4} title="Your account">
				<p>
					Keep your login details confidential. You are responsible for
					all activity on your account, including any use by someone you
					share your password with. If you think your account has been
					accessed without permission, tell us right away at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection n={5} title="Subscription, trial, and billing">
				<ul>
					<li>
						New subscribers get a {LEGAL.trialDays}-day free trial on
						each program they start.
					</li>
					<li>
						If you do not cancel before the trial ends, it converts
						automatically into a paid subscription and billing begins.
					</li>
					<li>
						Each program is billed separately. Standard is{' '}
						{LEGAL.monthlyPrice} per month or {LEGAL.annualPrice} per year
						(platform and Discord). Premium is{' '}
						{LEGAL.premiumMonthlyPrice} per month or{' '}
						{LEGAL.premiumAnnualPrice} per year and adds 2 live lessons a
						week. Charges run automatically at the start of each billing
						period until you cancel.
					</li>
					<li>
						You can cancel anytime from your account page or through
						Paddle&apos;s buyer tools. Cancelling stops future charges.
						You keep access until the end of the period you already paid
						for.
					</li>
					<li>
						Prices shown exclude applicable taxes. Paddle calculates and
						collects tax (including VAT where required) at checkout; the
						final amount including tax is confirmed before you pay.
					</li>
					<li>
						We may change prices for future billing periods. We will
						tell you in advance so you can decide whether to continue.
					</li>
				</ul>
			</LegalSection>

			<LegalSection n={6} title="Payment processing (Merchant of Record)">
				<LegalCallout>
					<p>
						Our order process is conducted by our online reseller
						Paddle.com. Paddle.com is the Merchant of Record for all
						our orders. Paddle provides all customer service inquiries
						and handles returns.
					</p>
				</LegalCallout>
				<p>
					Paddle.com Market Limited (&ldquo;Paddle&rdquo;) sells the
					subscription to you as our authorized reseller, appears on
					your bank or card statement, collects and remits applicable
					sales tax or VAT, issues receipts/invoices, and handles
					billing support and refunds. Your purchase is also subject to{' '}
					<a
						href={LEGAL.paddleBuyerTermsUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Paddle&apos;s Buyer Terms
					</a>
					. Product and learning support is provided by us at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection n={7} title="Refunds and cancellations">
				<p>
					Refunds are described in our{' '}
					<Link href="/refund">Refund Policy</Link>. In summary, you may
					request a full refund within {LEGAL.refundDays} days of your
					first paid charge for a program. After that window, charges for
					the current period are final except where required by law or
					Paddle&apos;s policies. Cancellation stops future renewals; it
					does not by itself create a refund for time already paid.
				</p>
			</LegalSection>

			<LegalSection n={8} title="Acceptable use">
				<p>
					Use the service for your own personal learning only. You agree
					not to:
				</p>
				<ul>
					<li>share your account or login credentials with anyone else</li>
					<li>
						copy, download, redistribute, resell, or publish course
						lessons, videos, code samples, or recordings outside the
						platform
					</li>
					<li>
						harass, abuse, or threaten other users, teachers, or staff
					</li>
					<li>
						attempt to bypass payment, access controls, or security
						measures
					</li>
					<li>use the service for any unlawful purpose</li>
				</ul>
				<p>
					If you break these rules, we may suspend or permanently close
					your account without a refund, in addition to any other rights
					we have.
				</p>
			</LegalSection>

			<LegalSection n={9} title="Intellectual property">
				<p>
					All lessons, videos, code samples, quizzes, exercises, and
					other course material are owned by us or our licensors.
					Subscribing gives you a personal, non-transferable license to
					access and use this material for your own learning while your
					subscription is active. It does not give you ownership of
					anything, and you may not redistribute, resell, publicly
					perform, or otherwise share course material with anyone outside
					your own account.
				</p>
			</LegalSection>

			<LegalSection n={10} title="Content availability">
				<p>
					We release new course modules over time on a regular schedule.
					We do not guarantee a fixed release date for any specific
					module, and the course catalogue, syllabus, and features may
					change, be updated, or be discontinued at our discretion. We
					make reasonable efforts to keep active courses available to
					current subscribers.
				</p>
			</LegalSection>

			<LegalSection n={11} title="Disclaimer of warranties">
				<p>
					The service is provided &ldquo;as is&rdquo; and &ldquo;as
					available&rdquo;. We do not guarantee that it will be
					uninterrupted, error-free, or fit for any particular purpose.
					We do not promise any specific learning outcome, skill level,
					or employment result from using the service. Nothing in these
					Terms limits rights that cannot be excluded under applicable
					consumer law.
				</p>
			</LegalSection>

			<LegalSection n={12} title="Limitation of liability">
				<p>
					To the fullest extent permitted by law, we are not liable for
					any indirect, incidental, or consequential damages arising from
					your use of the service. Our total liability for any claim
					relating to the service is limited to the amount you paid for
					the relevant subscription in the 12 months before the claim
					arose.
				</p>
			</LegalSection>

			<LegalSection n={13} title="Complaints">
				<p>
					If something goes wrong, email us at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					. We aim to acknowledge complaints within 2 business days and
					resolve them within 14 days. Billing and refund disputes for
					Paddle transactions can also be raised with Paddle at{' '}
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

			<LegalSection n={14} title="Termination">
				<p>
					You may stop using the service at any time by cancelling your
					subscription. We may suspend or terminate your account if you
					violate these Terms, including the acceptable use rules in
					Section 8. Termination for violating these Terms does not
					entitle you to a refund.
				</p>
			</LegalSection>

			<LegalSection n={15} title="Governing law">
				<p>
					These Terms are governed by the laws of Ukraine, without regard
					to conflict-of-law principles. Mandatory consumer protections
					in your country of residence still apply where they cannot be
					waived. Any dispute relating to these Terms or the service will
					be resolved under Ukrainian law, subject to those mandatory
					rights.
				</p>
			</LegalSection>

			<LegalSection n={16} title="Changes to these Terms">
				<p>
					We may update these Terms from time to time. If we make a
					material change, we will notify you by email at least 30 days
					before it takes effect. Continuing to use the service after a
					change takes effect means you accept the updated Terms. Related
					policies:{' '}
					<Link href="/privacy">Privacy Policy</Link> and{' '}
					<Link href="/refund">Refund Policy</Link>.
				</p>
			</LegalSection>

			<LegalSection n={17} title="Contact us">
				<p>
					Questions about these Terms? Email{' '}
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
					. Legal entity: {LEGAL.legalName}, {LEGAL.legalForm},{' '}
					{LEGAL.businessAddress}.
				</p>
			</LegalSection>
		</LegalDoc>
	)
}
