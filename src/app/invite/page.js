import Referral from '@/components/Referral/Referral'

export const metadata = {
    title: 'Запроси друга — SmartCode Academy | Знижка 500 грн',
    description:
        'Запросіть друга у SmartCode Academy та отримайте знижку 500 грн на курс програмування. Ваш друг також отримає знижку. Акція без обмежень!',
    openGraph: {
        title: 'Запроси друга — SmartCode Academy | Знижка 500 грн',
        description:
            'Запросіть друга у SmartCode Academy та отримайте знижку 500 грн на курс програмування.',
        url: 'https://smartcode-academy.com/invite',
        siteName: 'SmartCode Academy',
    },
}

export default function InvitePage() {
    return <Referral />
}
