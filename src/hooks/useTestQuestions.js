'use client'

import { useMemo } from 'react'
import { TEST_QUESTIONS } from '@/lib/testQuestions'

export function useTestQuestions() {
	return useMemo(() => TEST_QUESTIONS, [])
}
