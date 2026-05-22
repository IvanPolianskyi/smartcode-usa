'use client'

import { useMemo } from 'react'
import { useLocale } from 'next-intl'
import { TEST_QUESTIONS as TEST_QUESTIONS_UK } from '@/lib/testQuestions'
import { TEST_QUESTIONS as TEST_QUESTIONS_EN } from '@/lib/testQuestions.en'

export function useTestQuestions() {
	const locale = useLocale()

	return useMemo(
		() => (locale === 'en' ? TEST_QUESTIONS_EN : TEST_QUESTIONS_UK),
		[locale]
	)
}
