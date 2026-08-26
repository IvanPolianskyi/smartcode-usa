'use client'

import { useEffect, useState } from 'react'
import { loadPaddle } from '@/lib/paddleClient'
import { PADDLE_COUNTRY_AUTO } from '@/lib/paddleCountry'

/**
 * Fetch localised totals for a set of Paddle price IDs via PricePreview.
 * Display only `formattedTotals` — never reformat on the client.
 *
 * @param {string[]} priceIds
 * @param {string | null} country ISO code, null/`OTHERS` = auto-detect
 * @returns {{ prices: Record<string, string>, loading: boolean, error: string | null }}
 */
export function usePaddlePrices(priceIds, country = null) {
	const [prices, setPrices] = useState({})
	const [loading, setLoading] = useState(Boolean(priceIds?.length))
	const [error, setError] = useState(null)

	const idsKey = (priceIds || []).filter(Boolean).sort().join(',')

	useEffect(() => {
		const ids = idsKey ? idsKey.split(',') : []
		if (!ids.length) {
			setPrices({})
			setLoading(false)
			setError(null)
			return
		}

		let cancelled = false
		setLoading(true)
		setError(null)

		loadPaddle()
			.then((paddle) => {
				const params = {
					items: ids.map((priceId) => ({ priceId, quantity: 1 })),
				}
				if (country && country !== PADDLE_COUNTRY_AUTO) {
					params.address = { countryCode: country }
				}
				return paddle.PricePreview(params)
			})
			.then((response) => {
				if (cancelled) return
				const next = {}
				const lineItems = response?.data?.details?.lineItems || []
				for (const item of lineItems) {
					const id = item?.price?.id
					const formatted = item?.formattedTotals?.total
					if (id && formatted) next[id] = formatted
				}
				setPrices(next)
				setLoading(false)
			})
			.catch((caught) => {
				if (cancelled) return
				setError(caught?.message || 'Could not load prices')
				setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [idsKey, country])

	return { prices, loading, error }
}
