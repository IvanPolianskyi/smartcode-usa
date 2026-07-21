'use client'

import { useEffect, useRef, useState } from 'react'
import { Phone, X } from 'lucide-react'
import styles from './ContactFab.module.css'

const PHONE_DISPLAY = '+380 96 957 67 23'
const PHONE_HREF = 'tel:+380969576723'
const TELEGRAM_HREF = 'https://t.me/SmartCode_Academy'

function TelegramIcon({ size = 22 }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden='true'
		>
			<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.788.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
		</svg>
	)
}

export default function ContactFab() {
	const [open, setOpen] = useState(false)
	const rootRef = useRef(null)

	useEffect(() => {
		if (!open) return undefined

		const onPointerDown = (event) => {
			if (rootRef.current && !rootRef.current.contains(event.target)) {
				setOpen(false)
			}
		}

		const onKeyDown = (event) => {
			if (event.key === 'Escape') setOpen(false)
		}

		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open])

	return (
		<div
			ref={rootRef}
			className={`${styles.root} ${open ? styles.open : ''}`}
		>
			{open && (
				<div className={styles.panel} role='menu' aria-label="Зв'язатися з нами">
					<a
						href={PHONE_HREF}
						className={`${styles.action} ${styles.phone}`}
						aria-label={`Подзвонити ${PHONE_DISPLAY}`}
						title={PHONE_DISPLAY}
						role='menuitem'
					>
						<Phone size={22} strokeWidth={2.2} />
					</a>

					<a
						href={TELEGRAM_HREF}
						className={`${styles.action} ${styles.telegram}`}
						aria-label='Написати в Telegram @SmartCode_Academy'
						title='Telegram @SmartCode_Academy'
						target='_blank'
						rel='noopener noreferrer'
						role='menuitem'
					>
						<TelegramIcon />
					</a>

					<button
						type='button'
						className={`${styles.action} ${styles.close}`}
						aria-label='Закрити'
						onClick={() => setOpen(false)}
					>
						<X size={20} strokeWidth={2.4} />
					</button>
				</div>
			)}

			{!open && (
				<button
					type='button'
					className={styles.trigger}
					aria-label="Зв'язатися з нами"
					aria-expanded={false}
					onClick={() => setOpen(true)}
				>
					<Phone size={26} strokeWidth={2} />
				</button>
			)}
		</div>
	)
}
