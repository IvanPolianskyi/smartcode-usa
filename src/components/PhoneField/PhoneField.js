'use client'

import React from 'react'
import { PhoneInput } from 'react-international-phone'
import { phoneInputEuropeCountries, phoneInputPreferredCountries } from '@/lib/phoneInputCountries'
import styles from './PhoneField.module.css'
import 'react-international-phone/style.css'

/**
 * Украіна за замовчуванням (+380), прапор, зміна країни, forceDialCode — без дубля коду в полі вводу.
 */
export default function PhoneField({
	value,
	onChange,
	onBlur,
	id,
	name,
	'aria-invalid': ariaInvalid,
	className,
}) {
	return (
		<div className={`${styles.wrap} ${className || ''}`} data-phone-field>
			<PhoneInput
				defaultCountry="ua"
				value={value}
				onChange={(phone) => onChange?.(phone)}
				countries={phoneInputEuropeCountries}
				preferredCountries={phoneInputPreferredCountries}
				forceDialCode
				inputProps={{
					id,
					name,
					'aria-invalid': ariaInvalid,
					autoComplete: 'tel',
					onBlur: (e) => onBlur?.(e),
				}}
				className={styles.inputContainer}
				inputClassName={styles.input}
				countrySelectorStyleProps={{
					dropdownStyleProps: {
						style: { zIndex: 20050, maxHeight: 280 },
					},
					buttonClassName: styles.countryButton,
				}}
			/>
		</div>
	)
}
