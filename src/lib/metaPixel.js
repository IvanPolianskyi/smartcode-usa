/**
 * Meta (Facebook) Pixel — клієнтські хелпери.
 * ID: NEXT_PUBLIC_META_PIXEL_ID (у проді задати в env).
 *
 * Черга подій: Next.js підвантажує inline Pixel з `afterInteractive`, тож перші
 * `useEffect` можуть спрацювати раніше за `fbq` — без черги події губляться.
 */

import { getCoursePrice } from '@/lib/coursePrices'

export const META_PIXEL_ID =
	(typeof process !== 'undefined' && process.env.NEXT_PUBLIC_META_PIXEL_ID) ||
	'4274611226126341'

function fbqReady() {
	return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/** Завдання в чергу, поки глобальний `fbq` ще не підключений */
const pixelQueue = []

function flushPixelQueue() {
	if (!fbqReady()) return
	while (pixelQueue.length) {
		const job = pixelQueue.shift()
		try {
			if (job.type === 'track') {
				if (job.params != null && Object.keys(job.params).length > 0) {
					window.fbq('track', job.eventName, job.params)
				} else {
					window.fbq('track', job.eventName)
				}
			}
		} catch {
			// ігноруємо збої pixel у проді
		}
	}
}

let flushIntervalId = null

function schedulePixelFlush() {
	if (typeof window === 'undefined') return
	if (flushIntervalId != null) return
	let ticks = 0
	flushIntervalId = window.setInterval(() => {
		ticks++
		flushPixelQueue()
		if (fbqReady() && pixelQueue.length === 0) {
			window.clearInterval(flushIntervalId)
			flushIntervalId = null
		}
		if (ticks > 200) {
			window.clearInterval(flushIntervalId)
			flushIntervalId = null
		}
	}, 50)
}

if (typeof window !== 'undefined') {
	window.addEventListener('load', () => flushPixelQueue(), { once: true })
}

function sendOrQueueTrack(eventName, params) {
	if (fbqReady()) {
		if (params && Object.keys(params).length > 0) {
			window.fbq('track', eventName, params)
		} else {
			window.fbq('track', eventName)
		}
		return
	}
	pixelQueue.push({ type: 'track', eventName, params })
	schedulePixelFlush()
}

export function trackMetaPageView() {
	sendOrQueueTrack('PageView', undefined)
}

/** Параметри ViewContent для маркетингових лендінгів (без ціни — без value) */
const COURSE_LANDING_VIEW_CONTENT = {
	python: {
		content_ids: ['smartcode_landing_python'],
		content_name: 'Python — курс програмування для дітей',
		content_category: 'online_course',
	},
	roblox: {
		content_ids: ['smartcode_landing_roblox'],
		content_name: 'Roblox Studio — курс для дітей',
		content_category: 'online_course',
	},
	unity: {
		content_ids: ['smartcode_landing_unity'],
		content_name: 'Unity — розробка ігор для дітей',
		content_category: 'online_course',
	},
	webdev: {
		content_ids: ['smartcode_landing_webdev'],
		content_name: 'Веб-розробка — курс для дітей',
		content_category: 'online_course',
	},
}

/** Перегляд лендінгу напряму — ViewContent */
export function trackCourseLanding(courseKey) {
	const spec = COURSE_LANDING_VIEW_CONTENT[courseKey]
	if (!spec) return
	sendOrQueueTrack('ViewContent', {
		...spec,
		content_type: 'product',
	})
}

/** Модалка пробного заняття — ViewContent */
export function trackTrialLessonModalView() {
	sendOrQueueTrack('ViewContent', {
		content_ids: ['smartcode_trial_lesson_modal'],
		content_type: 'product',
		content_name: 'Запис на пробне заняття',
		content_category: 'trial_lesson',
	})
}

/**
 * Сторінка платного курсу в каталозі (/courses/...) — ViewContent з ціною для value-оптимізації.
 */
export function trackCatalogCourseViewContent(courseId) {
	const { name, price, currency } = getCoursePrice(courseId)
	sendOrQueueTrack('ViewContent', {
		content_ids: [courseId],
		content_type: 'product',
		content_name: name,
		content_category: 'paid_online_course',
		value: typeof price === 'number' ? price : 0,
		currency: currency || 'UAH',
	})
}

/** Мапінг тексту з форми пробного → стабільні content_ids для Lead */
const TRIAL_INTEREST_CONTENT_IDS = {
	'Roblox Studio': ['interest_roblox'],
	Python: ['interest_python'],
	'JavaScript та веб-розробка': ['interest_webdev'],
	'Розробка ігор на Unity': ['interest_unity'],
	'Не впевнений(а), потрібна консультація': ['interest_consultation'],
}

export function trialInterestToContentIds(interestLabel) {
	if (!interestLabel) return undefined
	return TRIAL_INTEREST_CONTENT_IDS[interestLabel] || ['interest_unknown']
}

/**
 * Заявка з контактом. Не передавати email/телефон (ПІІ).
 * @param {string} contentName — що обрав користувач (текст з форми)
 * @param {string[]|undefined} contentIds — стабільні id для каталогу в Ads
 */
export function trackTrialLead(contentName, contentIds) {
	const params = {
		content_name: contentName || 'trial_lesson',
		content_category: 'lead_generation',
	}
	if (Array.isArray(contentIds) && contentIds.length > 0) {
		params.content_ids = contentIds
	}
	sendOrQueueTrack('Lead', params)
}

/** Вибір напряму в діагностичному тесті — ViewContent */
export function trackKnowledgeTestDirection(directionId, directionName) {
	sendOrQueueTrack('ViewContent', {
		content_ids: [`smartcode_diagnostic_${directionId}`],
		content_type: 'product',
		content_name: `Діагностика знань: ${directionName}`,
		content_category: 'knowledge_test',
	})
}
