'use client'
import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations, useLocale } from 'next-intl'

/**
 * Shared phone input field with country selector.
 * Requires phoneInput from usePhoneInput() hook + CSS class names via `classes` prop.
 */
export default function PhoneField({
	phoneInput,
	classes,
	id = 'phone',
	labelText,
	showLabel = true,
}) {
	const t = useTranslations('phoneField')
	const locale = useLocale()
	const displayLabel = labelText ?? t('label')
	const countryName = (c) => (locale === 'en' ? c.nameEn : c.nameUk)

	const {
		country,
		displayValue,
		intlMode,
		intlInputValue,
		showCountryPrefix,
		phoneError,
		showDropdown,
		dropdownRef,
		countryQuery,
		setCountryQuery,
		filteredCountries,
		openDropdown,
		setShowDropdown,
		handlePhoneChange,
		handlePhoneKeyDown,
		selectCountry,
	} = phoneInput

	const [dropdownPos, setDropdownPos] = useState(null)

	const nationalDisplay = displayValue.replace(country.prefix, '').trim()
	const inputValue = intlMode ? intlInputValue : nationalDisplay

	useLayoutEffect(() => {
		if (!showDropdown || !dropdownRef.current) {
			setDropdownPos(null)
			return undefined
		}

		const updatePosition = () => {
			const rect = dropdownRef.current.getBoundingClientRect()
			setDropdownPos({
				top: rect.bottom + 4,
				left: rect.left,
				width: Math.min(320, window.innerWidth - 16),
			})
		}

		updatePosition()
		window.addEventListener('resize', updatePosition)
		window.addEventListener('scroll', updatePosition, true)
		return () => {
			window.removeEventListener('resize', updatePosition)
			window.removeEventListener('scroll', updatePosition, true)
		}
	}, [showDropdown, dropdownRef])

	const dropdownContent = showDropdown && dropdownPos && (
		<div
			className={`${classes.dropdown} ${classes.dropdownPortal || ''}`}
			role="listbox"
			aria-label={t('selectCountry')}
			data-phone-country-dropdown
			style={{
				position: 'fixed',
				top: dropdownPos.top,
				left: dropdownPos.left,
				width: dropdownPos.width,
				zIndex: 10250,
			}}
		>
			<div className={classes.dropdownSearchWrap}>
				<input
					type="search"
					className={classes.dropdownSearch}
					placeholder={t('searchPlaceholder')}
					value={countryQuery}
					onChange={(e) => setCountryQuery(e.target.value)}
					autoComplete="off"
					aria-label={t('searchCountry')}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && filteredCountries.length === 1) {
							e.preventDefault()
							selectCountry(filteredCountries[0])
						}
					}}
				/>
			</div>
			<div className={classes.dropdownList}>
				{filteredCountries.length === 0 ? (
					<p className={classes.dropdownEmpty}>{t('countryNotFound')}</p>
				) : (
					filteredCountries.map((c) => (
						<button
							type="button"
							key={c.code}
							role="option"
							aria-selected={country.code === c.code}
							className={`${classes.dropdownItem} ${country.code === c.code ? (classes.dropdownItemActive || '') : ''}`}
							onClick={() => selectCountry(c)}
						>
							<img
								src={c.flag}
								alt=""
								className={classes.dropdownItemFlag}
								width={20}
								height={14}
							/>
							<span className={classes.dropdownItemName}>{countryName(c)}</span>
							<span className={classes.dropdownItemCode}>{c.code}</span>
							<span className={classes.dropdownItemDial}>{c.prefix}</span>
						</button>
					))
				)}
			</div>
		</div>
	)

	return (
		<div
			className={`${classes.field || ''} ${phoneError ? (classes.fieldError || '') : ''}`}
			data-phone-field
			data-dropdown-open={showDropdown ? 'true' : undefined}
		>
			{showLabel && (
				<label
					className={classes.label}
					htmlFor={id}
					style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}
				>
					{displayLabel}
				</label>
			)}
			<div className={classes.phoneContainer} ref={dropdownRef}>
				<button
					type="button"
					className={classes.countryBtn}
					onClick={() => (showDropdown ? setShowDropdown(false) : openDropdown())}
					aria-label={t('countryAria', { name: countryName(country) })}
					aria-expanded={showDropdown}
				>
					<img
						src={country.flag}
						alt=""
						className={classes.flagEmoji}
						width={24}
						height={16}
					/>
					<svg
						width="10"
						height="6"
						viewBox="0 0 10 6"
						fill="none"
						className={classes.dropdownArrow}
						style={{
							transform: showDropdown ? 'rotate(180deg)' : 'none',
							transition: 'transform 0.2s',
						}}
						aria-hidden
					>
						<path
							d="M1 1L5 5L9 1"
							stroke="#6B7280"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				<div className={classes.divider} />
				<div className={classes.phoneInputWrap}>
					{showCountryPrefix && (
						<span className={classes.phonePrefix} aria-hidden>
							{country.prefix}
						</span>
					)}
					<input
						id={id}
						type="tel"
						name={id}
						value={inputValue}
						onChange={(e) => handlePhoneChange(e.target.value)}
						onKeyDown={handlePhoneKeyDown}
						onPaste={(e) => {
							const text = e.clipboardData?.getData('text') || ''
							if (text.includes('+') || text.replace(/\D/g, '').length > 9) {
								e.preventDefault()
								handlePhoneChange(text)
							}
						}}
						className={classes.phoneInput}
						inputMode="tel"
						autoComplete={intlMode ? 'tel' : 'tel-national'}
						placeholder={intlMode ? t('intlPlaceholder') : t('phonePlaceholder')}
						aria-invalid={phoneError ? 'true' : undefined}
						aria-describedby={phoneError ? `${id}-error` : undefined}
					/>
				</div>
			</div>
			{typeof document !== 'undefined' && dropdownContent
				? createPortal(dropdownContent, document.body)
				: null}
			{phoneError && (
				<span id={`${id}-error`} className={classes.error} role="alert">
					{phoneError}
				</span>
			)}
		</div>
	)
}
