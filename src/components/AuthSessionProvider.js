'use client'

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { getCurrentUser } from '@/lib/authClient'

const AuthSessionContext = createContext({
	user: null,
	loading: true,
	/** @param {boolean} [withSpinner=true] - false після login/logout без миготіння UI */
	refresh: async () => {},
})

export function useAuthSession() {
	return useContext(AuthSessionContext)
}

/**
 * Один запит GET /api/auth/me на завантаження клієнта + оновлення після auth-подій.
 * Замість повторних викликів з Header (pathname, focus) і дублікатів на сторінках.
 */
export default function AuthSessionProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const refresh = useCallback(async (withSpinner = true) => {
		if (withSpinner) setLoading(true)
		try {
			const u = await getCurrentUser()
			setUser(u)
		} catch {
			setUser(null)
		} finally {
			if (withSpinner) setLoading(false)
		}
	}, [])

	useEffect(() => {
		refresh(true)
		const onAuth = () => {
			window.setTimeout(() => {
				refresh(false)
			}, 120)
		}
		window.addEventListener('auth:login', onAuth)
		window.addEventListener('auth:logout', onAuth)
		window.addEventListener('auth:register', onAuth)
		return () => {
			window.removeEventListener('auth:login', onAuth)
			window.removeEventListener('auth:logout', onAuth)
			window.removeEventListener('auth:register', onAuth)
		}
	}, [refresh])

	const value = useMemo(
		() => ({
			user,
			loading,
			refresh,
		}),
		[user, loading, refresh]
	)

	return (
		<AuthSessionContext.Provider value={value}>
			{children}
		</AuthSessionContext.Provider>
	)
}
