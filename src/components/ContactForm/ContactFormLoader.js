'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false })

/**
 * Відкладає завантаження ContactForm (libphonenumber-js, PhoneField) до idle або першого кліку.
 */
export default function ContactFormLoader() {
	const [shouldLoad, setShouldLoad] = useState(false)
	const pendingOpenRef = useRef(false)

	useEffect(() => {
		const onOpen = () => {
			pendingOpenRef.current = true
			setShouldLoad(true)
		}
		window.addEventListener('openContactModal', onOpen)

		let idleId = null
		let timeoutId = null
		const preload = () => setShouldLoad(true)
		if (typeof window.requestIdleCallback === 'function') {
			idleId = window.requestIdleCallback(preload, { timeout: 6000 })
		} else {
			timeoutId = window.setTimeout(preload, 5000)
		}

		return () => {
			window.removeEventListener('openContactModal', onOpen)
			if (idleId != null && typeof window.cancelIdleCallback === 'function') {
				window.cancelIdleCallback(idleId)
			}
			if (timeoutId != null) {
				window.clearTimeout(timeoutId)
			}
		}
	}, [])

	useEffect(() => {
		if (!shouldLoad || !pendingOpenRef.current) return undefined
		pendingOpenRef.current = false
		const timeoutId = window.setTimeout(() => {
			window.dispatchEvent(new Event('openContactModal'))
		}, 0)
		return () => window.clearTimeout(timeoutId)
	}, [shouldLoad])

	if (!shouldLoad) return null
	return <ContactForm />
}
