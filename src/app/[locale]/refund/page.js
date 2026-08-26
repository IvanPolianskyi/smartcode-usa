import { LegalDoc, LegalSection, LegalCallout } from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'
import { Link } from '@/i18n/navigation'

export default function RefundPage() {
	return (
		<LegalDoc
			active="/refund"
			title="Refund Policy"
			summary="When you can get your money back, how Paddle processes refunds, and how to cancel your subscription."
			lastUpdated={LEGAL.lastUpdated}
		>
			<LegalSection n={1} title="Merchant of Record">
				<LegalCallout>
					<p>
						Our order process is conducted by our online reseller
						Paddle.com. Paddle.com is the Merchant of Record for all
						our orders. Paddle provides all customer service inquiries
						and handles returns.
					</p>
				</LegalCallout>
				<p>
					Refunds and billing support for purchases made through Paddle
					are processed by Paddle. You can also contact us for product
					help at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					{LEGAL.supportPhone ? (
						<>
							{' '}
							or {LEGAL.supportPhone}
						</>
					) : null}
					. Full buyer terms:{' '}
					<a
						href={LEGAL.paddleBuyerTermsUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Paddle Buyer Terms
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection n={2} title={`${LEGAL.refundDays}-day money-back guarantee`}>
				<p>
					If you are not satisfied, you can request a full refund within{' '}
					{LEGAL.refundDays} days of your first paid charge for a
					program, no reason required. This applies to both monthly and
					annual plans. The window is measured from that first charge,
					not from every renewal.
				</p>
				<p>
					Statutory withdrawal or refund rights under the law of your
					country, and Paddle&apos;s own policies, may give you
					additional or overlapping rights. Where those rights are
					stronger, they prevail.
				</p>
			</LegalSection>

			<LegalSection n={3} title={`After the ${LEGAL.refundDays}-day window`}>
				<p>
					Once the {LEGAL.refundDays}-day window has passed, charges for
					that billing period are final, except where a refund is
					required by applicable law or granted under Paddle&apos;s
					policies. You can still cancel your subscription at any time to
					stop future charges. Your access continues until the end of the
					period you already paid for.
				</p>
			</LegalSection>

			<LegalSection n={4} title="How to request a refund">
				<p>You can request a refund in either of these ways:</p>
				<ul>
					<li>
						Contact Paddle via{' '}
						<a
							href={LEGAL.paddleSupportUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							paddle.net
						</a>
						, the &ldquo;View receipt&rdquo; / &ldquo;Manage
						subscription&rdquo; link in your purchase email, or the
						billing tools in your account.
					</li>
					<li>
						Email us at{' '}
						<a href={`mailto:${LEGAL.supportEmail}`}>
							{LEGAL.supportEmail}
						</a>{' '}
						from the email address on your account. We will coordinate
						with Paddle. Requests from a different email may take
						longer to verify.
					</li>
				</ul>
			</LegalSection>

			<LegalSection n={5} title="How refunds are processed">
				<p>
					Paddle processes all refunds to your original payment method.
					Once approved, funds typically appear within 5 to 10 business
					days, depending on your bank or card issuer. We do not take or
					store your card details.
				</p>
			</LegalSection>

			<LegalSection n={6} title="When a refund will not be given">
				<p>
					We do not give refunds where your access was terminated for
					violating our{' '}
					<Link href="/terms">Terms of Service</Link>, such as sharing
					your account, redistributing course material, or harassing
					other users or staff — except where applicable law requires
					otherwise.
				</p>
			</LegalSection>

			<LegalSection n={7} title="How to cancel your subscription">
				<ol>
					<li>
						Log in to your account at {LEGAL.siteDomain}.
					</li>
					<li>Open your account or subscription settings.</li>
					<li>
						Select &ldquo;Cancel subscription&rdquo; for the program
						you want to stop, and confirm.
					</li>
					<li>
						You keep access until the end of your current paid period.
						No further charges will be made for that program after
						that.
					</li>
				</ol>
				<p>
					You can also cancel through Paddle&apos;s buyer portal using
					the link in your confirmation email. If you have trouble
					cancelling, email{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>
						{LEGAL.supportEmail}
					</a>
					{LEGAL.supportPhone ? (
						<>
							{' '}
							or call {LEGAL.supportPhone}
						</>
					) : null}
					.
				</p>
			</LegalSection>

			<LegalSection n={8} title="Contact us">
				<p>
					Questions about refunds or billing? Email{' '}
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
					. For Paddle billing support:{' '}
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
		</LegalDoc>
	)
}
