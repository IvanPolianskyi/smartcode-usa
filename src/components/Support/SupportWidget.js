'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
	ChevronDown,
	HelpCircle,
	Mail,
	MessageCircle,
	Phone,
	Send,
	X,
} from 'lucide-react'
import styles from './SupportWidget.module.css'

const TELEGRAM_URL =
	process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM || 'https://t.me/SmartCode_Academy'

const WHATSAPP_URL =
	process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ||
	'https://wa.me/380969576723?text=Hello,%20I%20have%20a%20question%20about%20SmartCode%20Academy'

const SUPPORT_EMAIL =
	process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'smartcodeacadem@gmail.com'

const SUPPORT_PHONE =
	process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+380 96 957 67 23'

const PRESALE_FAQS = [
	{
		q: 'Who is this for?',
		a: 'Anyone who wants to build Roblox games - beginners included. If you are under 18, ask a parent or guardian to pay; the account is yours.',
	},
	{
		q: 'What computer do I need?',
		a: 'A Windows PC or Mac that runs the free Roblox Studio app. Roblox Studio does not run on phones or Chromebooks.',
	},
	{
		q: 'What is the difference between the kit and the club?',
		a: 'The Roblox AI Game Kit is a one-time $27 download: setup guide, 68 prompts and the reel playbook. SmartCode Club is the full 92-lesson course with live builds, billed monthly or yearly.',
	},
	{
		q: 'Can I get a refund?',
		a: 'Yes - email us within 30 days of your first payment for a full refund.',
	},
]

/** Sales landings stay focused on one button - no support bubble there. */
const HIDDEN_ON = /^(\/[a-z]{2})?\/(kit|shorts)(\/|$)/

export default function SupportWidget() {
	const pathname = usePathname() || ''
	const [isOpen, setIsOpen] = useState(false)
	const cardRef = useRef(null)

	// Close on ESC key or clicking outside
	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') setIsOpen(false)
		}

		const handleClickOutside = (e) => {
			if (cardRef.current && !cardRef.current.contains(e.target)) {
				setIsOpen(false)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	if (HIDDEN_ON.test(pathname)) return null

	return (
		<aside className={styles.container} ref={cardRef} aria-label="Support & FAQ widget">
			{isOpen ? (
				<div className={styles.card} role="dialog" aria-modal="false">
					<header className={styles.cardHeader}>
						<div className={styles.headerInfo}>
							<div className={styles.avatar}>SC</div>
							<div className={styles.headerText}>
								<p className={styles.title}>SmartCode Support</p>
								<span className={styles.status}>
									<span className={styles.onlineDot} aria-hidden /> Online · Ready to help
								</span>
							</div>
						</div>
						<button
							type="button"
							className={styles.closeBtn}
							onClick={() => setIsOpen(false)}
							aria-label="Close support dialog"
						>
							<X size={18} />
						</button>
					</header>

					<div className={styles.cardBody}>
						<div>
							<p className={styles.sectionHeading}>Chat directly with us</p>
							<div className={styles.channelList}>
								<a
									href={WHATSAPP_URL}
									target="_blank"
									rel="noopener noreferrer"
									className={`${styles.channelBtn} ${styles.channelWhatsapp}`}
								>
									<MessageCircle size={17} />
									<span>WhatsApp</span>
								</a>

								<a
									href={TELEGRAM_URL}
									target="_blank"
									rel="noopener noreferrer"
									className={`${styles.channelBtn} ${styles.channelTelegram}`}
								>
									<Send size={16} />
									<span>Telegram</span>
								</a>

								<a
									href={`mailto:${SUPPORT_EMAIL}?subject=Question%20about%20SmartCode%20Academy`}
									className={`${styles.channelBtn} ${styles.channelEmail}`}
								>
									<Mail size={15} />
									<span>Email: {SUPPORT_EMAIL}</span>
								</a>
							</div>
						</div>

						<div className={styles.faqSection}>
							<p className={styles.sectionHeading}>Quick Answers (FAQ)</p>
							{PRESALE_FAQS.map((faq) => (
								<details key={faq.q} className={styles.faqItem}>
									<summary className={styles.faqSummary}>
										<span>{faq.q}</span>
										<ChevronDown size={14} />
									</summary>
									<p className={styles.faqAnswer}>{faq.a}</p>
								</details>
							))}
						</div>
					</div>

					<div className={styles.footerNote}>
						<span>Phone: {SUPPORT_PHONE} · 30-day money-back guarantee</span>
					</div>
				</div>
			) : null}

			<button
				type="button"
				className={styles.triggerBtn}
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-label="Open support and live questions"
			>
				<MessageCircle size={18} aria-hidden />
				<span className={styles.btnLabel}>Help &amp; FAQ</span>
			</button>
		</aside>
	)
}
