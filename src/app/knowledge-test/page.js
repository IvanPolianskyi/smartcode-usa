import { Suspense } from 'react'
import KnowledgeTestClient from './KnowledgeTestClient'

export const metadata = {
  title: 'Тест знань - SmartCode Academy',
  description: 'Перевірте свої знання з Python, Roblox Studio, веб-розробки та Unity',
}

export default function KnowledgeTestPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Завантаження...</div>}>
      <KnowledgeTestClient />
    </Suspense>
  )
}






