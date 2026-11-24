'use client'

import { useEffect } from 'react'
import { readPromoCode } from '@/lib/startCheckout'

/**
 * Remembers `?promo=CODE` from the landing URL for this browser session, so
 * a code sent after a live build survives the register → checkout round trip.
 */
export default function PromoCapture() {
	useEffect(() => {
		readPromoCode()
	}, [])
	return null
}
