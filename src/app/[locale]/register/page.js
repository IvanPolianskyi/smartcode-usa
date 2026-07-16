import { redirect } from 'next/navigation'

/** Публічна реєстрація вимкнена — акаунти видає CRM / Telegram. */
export default function RegisterPage() {
  redirect('/login?needAccount=1')
}
