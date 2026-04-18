/**
 * Meta (Facebook) Pixel — клієнтські хелпери для стандартних подій.
 * ID пікселя: NEXT_PUBLIC_META_PIXEL_ID (у проді краще задати в змінних оточення).
 */

export const META_PIXEL_ID =
	(typeof process !== 'undefined' && process.env.NEXT_PUBLIC_META_PIXEL_ID) ||
	'4274611226126341'

function fbqReady() {
	return typeof window !== 'undefined' && typeof window.fbq === 'function'
}

/** Стандартна подія Meta Pixel (Lead, Purchase, …) */
export function trackMetaEvent(eventName, params) {
	if (!fbqReady()) return
	if (params && Object.keys(params).length > 0) {
		window.fbq('track', eventName, params)
	} else {
		window.fbq('track', eventName)
	}
}

/** Кастомна подія (аудиторії та воронки в Events Manager) */
export function trackMetaCustom(eventName, params) {
	if (!fbqReady()) return
	window.fbq('trackCustom', eventName, params || {})
}

export function trackMetaPageView() {
	trackMetaEvent('PageView')
}

const COURSE_LANDING_PIXEL_EVENTS = {
	python: 'ViewPythonCourseLanding',
	roblox: 'ViewRobloxCourseLanding',
	unity: 'ViewUnityCourseLanding',
	webdev: 'ViewWebDevCourseLanding',
}

/** Кастомна подія для лендінгу окремого курсу (аудиторії / custom conversion у Meta) */
export function trackCourseLanding(courseKey) {
	const eventName = COURSE_LANDING_PIXEL_EVENTS[courseKey]
	if (!eventName) return
	trackMetaCustom(eventName, { content_category: 'course_landing', course: courseKey })
}

/**
 * Заявка з контактом (без email/телефону в параметрах — вимоги Meta щодо ПІІ).
 */
export function trackTrialLead(contentName) {
	trackMetaEvent('Lead', {
		content_name: contentName || 'trial_lesson',
		content_category: 'trial_lesson',
	})
}

/** Вибір напряму в діагностичному тесті — сигнал зацікавленості */
export function trackKnowledgeTestDirection(directionId, directionName) {
	trackMetaEvent('ViewContent', {
		content_ids: [directionId],
		content_type: 'lead_magnet',
		content_name: `Діагностика: ${directionName}`,
		content_category: 'knowledge_test',
		value: 0,
		currency: 'UAH',
	})
}
