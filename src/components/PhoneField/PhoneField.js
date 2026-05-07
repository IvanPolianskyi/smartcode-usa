'use client'
import React from 'react'
import { COUNTRIES } from '@/lib/usePhoneInput'

/**
 * Shared phone input field with country selector.
 * Requires phoneInput from usePhoneInput() hook + CSS class names via `classes` prop.
 *
 * classes = {
 *   field, label, phoneContainer, countryBtn, flagEmoji, dropdownArrow,
 *   divider, phoneInputWrap, phonePrefix, phoneInput, dropdown, dropdownItem,
 *   dropdownItemActive, dropdownItemFlag, dropdownItemCode, dropdownItemDial,
 *   error, fieldError
 * }
 */
export default function PhoneField({ phoneInput, classes, id = 'phone', labelText = 'НОМЕР ТЕЛЕФОНУ' }) {
	const {
		country, displayValue, phoneError, showDropdown, dropdownRef,
		setShowDropdown, handlePhoneChange, handlePhoneKeyDown, selectCountry,
	} = phoneInput

	return (
		<div className={`${classes.field} ${phoneError ? (classes.fieldError || '') : ''}`}>
			<label className={classes.label} htmlFor={id} style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
				{labelText}
			</label>
			<div className={classes.phoneContainer} ref={dropdownRef}>
				<button
					type="button"
					className={classes.countryBtn}
					onClick={() => setShowDropdown(!showDropdown)}
					aria-label="Обрати країну"
				>
					<img src={country.flag} alt={country.code} className={classes.flagEmoji} width={24} height={16} />
					<svg
						width="10" height="6" viewBox="0 0 10 6" fill="none"
						className={classes.dropdownArrow}
						style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
					>
						<path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>

				{showDropdown && (
					<div className={classes.dropdown}>
						{COUNTRIES.map(c => (
							<button
								type="button"
								key={c.code}
								className={`${classes.dropdownItem} ${country.code === c.code ? (classes.dropdownItemActive || '') : ''}`}
								onClick={() => selectCountry(c)}
							>
								<img src={c.flag} alt={c.code} className={classes.dropdownItemFlag} width={20} height={14} />
								<span className={classes.dropdownItemCode}>{c.code}</span>
								<span className={classes.dropdownItemDial}>{c.prefix}</span>
							</button>
						))}
					</div>
				)}

				<div className={classes.divider} />
				<div className={classes.phoneInputWrap}>
					<span className={classes.phonePrefix}>{country.prefix}</span>
					<input
						id={id}
						type="tel"
						value={displayValue.replace(country.prefix, '').trim()}
						onChange={(e) => handlePhoneChange(e.target.value)}
						onKeyDown={handlePhoneKeyDown}
						className={classes.phoneInput}
						inputMode="numeric"
						autoComplete="tel-national"
					/>
				</div>
			</div>
			{phoneError && <span className={classes.error}>{phoneError}</span>}
		</div>
	)
}
