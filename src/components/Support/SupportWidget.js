'use client'

import { useEffect, useRef, useState } from 'react'
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
		q: 'What age is this suitable for?',
		a: 'Any age works. Lessons start from zero - kids, teens, and adults can all learn at their own pace.',
	},
	{
		q: 'What computer do we need?',
		a: 'For Python & AI, any laptop/Chromebook with a web browser. For Roblox, a Windows PC or Mac capable of running the free Roblox Studio app.',
	},
	{
		q: 'How does the 3-day trial work?',
		a: 'You get immediate full access to all course lessons and the student Discord for 3 days. If you cancel before the trial ends, you are charged $0.',
	},
	{
		q: 'How do live lessons work (Premium)?',
		a: 'On the Premium plan ($20/mo), students get two live Zoom/Meet teacher sessions every week in small groups, with recordings available if you miss one.',
	},
]

export default function SupportWidget() {
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
