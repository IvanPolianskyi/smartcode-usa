export const metadata = {
  title: 'Проєкти учнів SmartCode Academy',
  description:
    'Подивіться на реальні проєкти учнів SmartCode Academy: ігри, веб-сайти та застосунки, створені дітьми на Python, Unity, Roblox та веб-розробці.',
  keywords: [
    'проєкти учнів програмування',
    'портфоліо SmartCode Academy',
    'роботи студентів курси програмування',
    'ігри Unity учнів',
    'Roblox проєкти дітей',
  ].join(', '),
  alternates: {
    canonical: 'https://smartcode-academy.com/projects',
  },
}

export default function ProjectsLayout({ children }) {
  return children
}
