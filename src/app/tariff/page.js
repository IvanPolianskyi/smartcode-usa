import PricingPage from '@/components/Pricing/PricingPage'

export const metadata = {
	title: 'Тарифи та ціни - SmartCode Academy',
	description: 'Онлайн уроки програмування для дітей. Індивідуальні заняття в Zoom. Доступ до навчальної платформи.',
	keywords: [
		'ціни на курси програмування',
		'онлайн уроки для дітей',
		'Zoom уроки програмування',
		'курси Python',
		'навчання програмуванню',
		'SmartCode Academy тарифи',
	].join(', '),
}

export default function TariffPage() {
	return <PricingPage />
}

