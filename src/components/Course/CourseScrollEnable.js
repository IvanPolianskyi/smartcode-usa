'use client'

import { useEffect } from 'react'

/** Enables the branded page scrollbar on /courses routes (html scroll). */
export default function CourseScrollEnable() {
	useEffect(() => {
		const root = document.documentElement
		const body = document.body
		root.classList.add('lms-course-scroll')
		body.classList.add('lms-course-scroll')
		return () => {
			root.classList.remove('lms-course-scroll')
			body.classList.remove('lms-course-scroll')
		}
	}, [])

	return null
}
