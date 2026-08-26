import LegalDoc, { LegalCallout } from '@/components/Legal/LegalDoc'
import { LEGAL } from '@/lib/legalConfig'

export const metadata = {
	title: 'Refund Policy',
	description: `${LEGAL.refundDays}-day money-back guarantee for ${LEGAL.brandName}. Merchant of Record: Paddle.`,
	alternates: { canonical: '/refund' },
}

export default function RefundPage() {
	return (
		<LegalDoc
			title="Refund Policy"
			updated={LEGAL.lastUpdated}
			active="/refund"
			lede={`This Refund Policy explains how refunds work for ${LEGAL.brandName} subscriptions. Payments are processed by Paddle as Merchant of Record. Please read this together with our Terms of Service.`}
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
					Refunds and chargebacks for card payments are processed by Paddle.
					Paddle Buyer Terms:{' '}
					<a
						href={LEGAL.paddleBuyerTermsUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{LEGAL.paddleBuyerTermsUrl}
					</a>
					.
				</p>
			</section>

			<section>
				<h2>{`2. ${LEGAL.refundDays}-day money-back guarantee`}</h2>
				<p>
					We offer a voluntary seller guarantee: if you are not satisfied with{' '}
					{LEGAL.brandName}, you may request a full refund of your{' '}
					<strong>first paid subscription charge</strong> within{' '}
					<strong>{LEGAL.refundDays} days</strong> of that charge date (the
					“Guarantee Window”).
				</p>
				<p>This guarantee covers:</p>
				<ul>
					<li>
						the first charge after a free trial converts to a paid plan; and
					</li>
					<li>
						the first charge if you subscribe without a trial (where offered).
					</li>
				</ul>
				<p>
					This guarantee does <strong>not</strong> automatically apply to later
					renewal charges. Renewals are refundable only if required by
					applicable law, if we made a billing error, or if we agree otherwise
					in writing after you contact support.
				</p>
			</section>

			<section>
				<h2>3. Free trials</h2>
				<p>
					During a free trial of {LEGAL.trialDays} days, you are not charged. If
					you cancel before the trial ends, you will not be billed and no refund
					is needed. If the trial converts and you are charged, the Guarantee
					Window in Section 2 starts on the date of that first paid charge.
				</p>
			</section>

			<section>
				<h2>4. How to request a refund</h2>
				<p>To request a refund within the Guarantee Window:</p>
				<ol>
					<li>
						Email{' '}
						<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>{' '}
						with the subject line “Refund request,” and include:
						<ul>
							<li>the email address used for your account / Paddle receipt;</li>
							<li>approximate purchase or charge date;</li>
							<li>order or invoice ID from your Paddle receipt (if available);</li>
							<li>a brief reason (optional, helps us improve).</li>
						</ul>
					</li>
					<li>
						Alternatively, contact Paddle support:{' '}
						<a
							href={LEGAL.paddleSupportUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{LEGAL.paddleSupportUrl}
						</a>{' '}
						or manage the subscription via{' '}
						<a
							href={LEGAL.paddleNetUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							paddle.net
						</a>
						.
					</li>
				</ol>
				<p>
					We acknowledge refund requests within {LEGAL.complaintAckDays}{' '}
					business days and aim to complete approved refunds within{' '}
					{LEGAL.complaintResolveDays} business days. Approved refunds are
					returned to the original payment method by Paddle; bank posting times
					vary (often 5-10 business days after Paddle processes the refund).
				</p>
				<p>
					When a full refund is issued under this policy, we may revoke access
					to the paid Service for that subscription.
				</p>
			</section>

			<section>
				<h2>5. Non-refundable situations (Guarantee Window exceptions)</h2>
				<p>
					Unless required by law, we may decline a voluntary guarantee refund
					when:
				</p>
				<ul>
					<li>
						the request is made more than {LEGAL.refundDays} days after the
						first paid charge;
					</li>
					<li>
						the request concerns a renewal charge outside the Guarantee Window
						(see Section 2);
					</li>
					<li>
						we reasonably determine the account engaged in fraud, chargeback
						abuse, sharing credentials, or clear Terms violations aimed at
						obtaining free access;
					</li>
					<li>
						duplicate refund requests have already been paid for the same
						charge.
					</li>
				</ul>
				<p>
					Nothing in this section limits mandatory consumer rights that cannot
					be waived.
				</p>
			</section>

			<section>
				<h2>6. EU / UK consumers - right of withdrawal</h2>
				<p>
					If you are a consumer in the European Economic Area or the United
					Kingdom, you may have a statutory right to withdraw from a distance
					contract within 14 days without giving a reason.
				</p>
				<p>
					For digital content / online services, that right may be lost or
					limited once performance has begun with your prior express consent and
					acknowledgment that you lose the withdrawal right. By starting a trial
					or accessing paid digital course content, you request immediate
					performance. Where the law still requires a refund, we (via Paddle)
					will honor it.
				</p>
				<p>
					Our {LEGAL.refundDays}-day money-back guarantee in Section 2 is a
					seller benefit that is at least as favorable as a typical 14-day
					withdrawal window for the first paid charge, and in many cases longer.
					If statutory rights give you a stronger remedy, those rights prevail.
				</p>
			</section>

			<section>
				<h2>7. Billing errors and cancellations</h2>
				<p>
					If you believe you were charged in error (wrong plan, duplicate
					charge, or charge after a timely cancellation), contact us immediately
					at{' '}
					<a href={`mailto:${LEGAL.supportEmail}`}>{LEGAL.supportEmail}</a>. We
					will investigate with Paddle and correct valid errors.
				</p>
				<p>
					Canceling a subscription stops future renewals. Cancellation alone
					does not refund time already paid unless you also qualify under this
					Refund Policy or applicable law.
				</p>
			</section>

			<section>
				<h2>8. Chargebacks</h2>
				<p>
					Please contact us or Paddle before filing a chargeback. Many issues
					can be resolved with a refund or billing correction. Unwarranted
					chargebacks may lead to account suspension while we investigate.
				</p>
			</section>

			<section>
				<h2>9. Complaints</h2>
				<p>
					Unresolved refund or billing complaints may be escalated as described
					in Section 14 of our <a href="/terms">Terms of Service</a>{' '}
					(independent consumer bodies and Paddle support channels).
				</p>
			</section>

			<section>
				<h2>10. Changes</h2>
				<p>
					We may update this Refund Policy. The “Last updated” date will change.
					Changes do not reduce refund rights already accrued for a purchase
					made under a prior version, except as permitted by law.
				</p>
			</section>

			<section>
				<h2>11. Contact</h2>
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
