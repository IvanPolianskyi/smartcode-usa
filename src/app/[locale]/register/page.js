import { redirect } from 'next/navigation'

/** Реєстрація вимкнена — редірект на логін. */
export default function RegisterPage() {
  redirect('/login')
}
