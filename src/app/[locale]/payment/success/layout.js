import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('paymentSuccess', '/payment/success')

export default function PaymentSuccessLayout({ children }) {
	return children
}
