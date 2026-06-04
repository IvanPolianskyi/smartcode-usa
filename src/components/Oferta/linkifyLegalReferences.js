import { Link } from '@/i18n/navigation'

const POLICY_PHRASE_SPLIT =
	/(Політиці повернення коштів|Політики повернення коштів|Політика повернення коштів|Refund Policy|Політики конфіденційності|Політика конфіденційності|Privacy Policy)/iu

function hrefForPhrase(phrase) {
	const lower = phrase.toLowerCase()
	if (lower.includes('refund') || lower.includes('повернення')) {
		return '/refund'
	}
	return '/privacy'
}

function isPolicyPhrase(part) {
	return POLICY_PHRASE_SPLIT.test(part)
}

export function linkifyLegalReferences(text, linkClassName) {
	if (!text || typeof text !== 'string') {
		return text
	}

	const parts = text.split(POLICY_PHRASE_SPLIT)
	if (parts.length === 1) {
		return text
	}

	return parts.map((part, index) => {
		if (!part) {
			return null
		}
		if (isPolicyPhrase(part)) {
			return (
				<Link key={index} href={hrefForPhrase(part)} className={linkClassName}>
					{part}
				</Link>
			)
		}
		return part
	})
}
