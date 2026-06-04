'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Code, Gamepad2, Box, Monitor, Phone, CheckCircle, Award, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import styles from './KnowledgeTestClient.module.css'
import DataProcessingConsentNote from '@/components/Legal/DataProcessingConsentNote'
import { useTestQuestions } from '@/hooks/useTestQuestions'
import { validateEuropeanPhone } from '@/lib/phoneEurope'
import { usePhoneInput } from '@/lib/usePhoneInput'
import PhoneField from '@/components/PhoneField/PhoneField'
import phoneStyles from '@/components/PhoneField/PhoneField.module.css'

const DIRECTION_META = [
	{ id: 'python', icon: Code, color: '#3b82f6', key: 'python' },
	{ id: 'roblox', icon: Box, color: '#10b981', key: 'roblox' },
	{ id: 'webdev', icon: Monitor, color: '#8b5cf6', key: 'webdev' },
	{ id: 'unity', icon: Gamepad2, color: '#f59e0b', key: 'unity' },
]

export default function KnowledgeTestClient() {
	const t = useTranslations('pages.knowledgeTest')
	const locale = useLocale()
	const testQuestions = useTestQuestions()
	const searchParams = useSearchParams()
	const [selectedDirection, setSelectedDirection] = useState(null)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState({})
	const [showPhoneForm, setShowPhoneForm] = useState(false)
	const [name, setName] = useState('')
	const phoneInput = usePhoneInput('UA')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [showResults, setShowResults] = useState(false)
	const [testResult, setTestResult] = useState(null)

	const directions = useMemo(
		() =>
			DIRECTION_META.map((d) => ({
				...d,
				name: t(`directions.${d.key}.name`),
				description: t(`directions.${d.key}.description`),
			})),
		[t]
	)

	useEffect(() => {
		const courseParam = searchParams.get('course')
		if (courseParam && !selectedDirection) {
			const direction = directions.find((d) => d.id === courseParam)
			if (direction) {
				setSelectedDirection(direction)
				setCurrentQuestion(0)
				setAnswers({})
				setShowPhoneForm(false)
				setShowResults(false)
				setTestResult(null)
			}
		}
	}, [searchParams, selectedDirection, directions])

	const questions = useMemo(
		() => (selectedDirection ? testQuestions[selectedDirection.id] || [] : []),
		[selectedDirection, testQuestions]
	)
	const totalQuestions = questions.length

	const handleDirectionSelect = (direction) => {
		setSelectedDirection(direction)
		setCurrentQuestion(0)
		setAnswers({})
		setShowPhoneForm(false)
		setShowResults(false)
		setTestResult(null)
	}

	const handleAnswerSelect = (questionId, answerIndex) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: answerIndex,
		}))
	}

	const handleNextQuestion = () => {
		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1)
		} else {
			setShowPhoneForm(true)
		}
	}

	const handlePreviousQuestion = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion((prev) => prev - 1)
		}
	}

	const calculateScore = useCallback(() => {
		let correct = 0
		questions.forEach((q) => {
			if (answers[q.id] === q.correct) {
				correct++
			}
		})
		return {
			correct,
			total: totalQuestions,
			percentage: Math.round((correct / totalQuestions) * 100),
		}
	}, [questions, answers, totalQuestions])

	const getResultMessage = (percentage) => {
		if (percentage >= 80) return t('results.messages.excellent')
		if (percentage >= 60) return t('results.messages.good')
		if (percentage >= 40) return t('results.messages.fair')
		return t('results.messages.encourage')
	}

	const handleSubmitPhone = async (e) => {
		e.preventDefault()
		setError('')

		if (!phoneInput.validateOnSubmit()) {
			return
		}

		const phoneR = validateEuropeanPhone(phoneInput.getFullNumber(), locale)
		if (!phoneR.ok) {
			setError(phoneR.message)
			return
		}

		if (!name.trim()) {
			setError(t('phoneForm.nameRequired'))
			return
		}

		setIsSubmitting(true)

		try {
			const score = calculateScore()
			const response = await fetch('/api/knowledge-test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: phoneR.e164,
					name: name.trim(),
					direction: selectedDirection.id,
					directionName: selectedDirection.name,
					score: score.correct,
					totalQuestions: score.total,
					percentage: score.percentage,
					answers: answers,
					timestamp: new Date().toISOString(),
					locale,
				}),
			})

			if (response.ok) {
				setTestResult(score)
				setShowPhoneForm(false)
				setShowResults(true)
			} else {
				const data = await response.json()
				throw new Error(data.error || 'Failed to submit test results')
			}
		} catch (err) {
			console.error('Error submitting test results:', err)
			setError(t('phoneForm.submitError'))
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleRestart = () => {
		setSelectedDirection(null)
		setCurrentQuestion(0)
		setAnswers({})
		setShowPhoneForm(false)
		setShowResults(false)
		setTestResult(null)
		phoneInput.reset()
		setName('')
		setError('')
	}

	if (showResults && testResult) {
		const Icon = selectedDirection.icon
		const resultColor =
			testResult.percentage >= 80
				? '#10b981'
				: testResult.percentage >= 60
					? '#3b82f6'
					: testResult.percentage >= 40
						? '#f59e0b'
						: '#ef4444'

		return (
			<div className={styles.container}>
				<div className={styles.resultsContainer}>
					<div className={styles.resultsHeader}>
						<div
							className={styles.resultsIcon}
							style={{
								backgroundColor: `${selectedDirection.color}20`,
								color: selectedDirection.color,
							}}
						>
							<Icon size={48} />
						</div>
						<h1 className={styles.resultsTitle}>{t('results.title')}</h1>
						<p className={styles.resultsSubtitle}>{selectedDirection.name}</p>
					</div>

					<div className={styles.scoreCard} style={{ borderColor: resultColor }}>
						<div className={styles.scoreCircle} style={{ borderColor: resultColor }}>
							<span className={styles.scorePercentage} style={{ color: resultColor }}>
								{testResult.percentage}%
							</span>
						</div>
						<div className={styles.scoreDetails}>
							<p className={styles.scoreText}>
								{t('results.score', {
									correct: testResult.correct,
									total: testResult.total,
								})}
							</p>
							<p className={styles.resultMessage} style={{ color: resultColor }}>
								{getResultMessage(testResult.percentage)}
							</p>
						</div>
					</div>

					<div className={styles.resultsActions}>
						<button onClick={handleRestart} className={styles.restartButton}>
							{t('results.restart')}
						</button>
					</div>
				</div>
			</div>
		)
	}

	if (showPhoneForm) {
		return (
			<div className={styles.container}>
				<div className={styles.phoneFormContainer}>
					<div className={styles.phoneFormHeader}>
						<div
							className={styles.phoneFormIcon}
							style={{
								backgroundColor: `${selectedDirection.color}20`,
								color: selectedDirection.color,
							}}
						>
							<Phone size={32} />
						</div>
						<h2 className={styles.phoneFormTitle}>{t('phoneForm.title')}</h2>
						<p className={styles.phoneFormSubtitle}>{t('phoneForm.subtitle')}</p>
					</div>

					<form onSubmit={handleSubmitPhone} className={styles.phoneForm}>
						<div className={styles.formGroup}>
							<label htmlFor="name" className={styles.label}>
								{t('phoneForm.nameLabel')}
							</label>
							<input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className={styles.input}
								placeholder={t('phoneForm.namePlaceholder')}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor="phone" className={styles.label}>
								{t('phoneForm.phoneLabel')}
							</label>
							<PhoneField
								phoneInput={phoneInput}
								classes={{
									field: styles.formGroup,
									fieldError: phoneStyles.fieldError,
									label: styles.label,
									phoneContainer: phoneStyles.phoneContainer,
									countryBtn: phoneStyles.countryBtn,
									flagEmoji: phoneStyles.flagEmoji,
									dropdownArrow: phoneStyles.dropdownArrow,
									divider: phoneStyles.divider,
									phoneInputWrap: phoneStyles.phoneInputWrap,
									phonePrefix: phoneStyles.phonePrefix,
									phoneInput: phoneStyles.phoneInput,
									dropdown: phoneStyles.dropdown,
									dropdownSearchWrap: phoneStyles.dropdownSearchWrap,
									dropdownSearch: phoneStyles.dropdownSearch,
									dropdownList: phoneStyles.dropdownList,
									dropdownEmpty: phoneStyles.dropdownEmpty,
									dropdownItem: phoneStyles.dropdownItem,
									dropdownItemActive: phoneStyles.dropdownItemActive,
									dropdownItemFlag: phoneStyles.dropdownItemFlag,
									dropdownItemName: phoneStyles.dropdownItemName,
									dropdownItemCode: phoneStyles.dropdownItemCode,
									dropdownItemDial: phoneStyles.dropdownItemDial,
									error: phoneStyles.error,
								}}
								id="phone"
								labelText={t('phoneForm.phoneLabel')}
								showLabel={false}
							/>
						</div>

						{error && (
							<div className={styles.errorMessage}>
								<AlertCircle className={styles.errorIcon} />
								{error}
							</div>
						)}

						<DataProcessingConsentNote
							className={styles.privacyNote}
							iconClassName={styles.privacyIcon}
						/>

						<button
							type="submit"
							disabled={isSubmitting}
							className={styles.submitButton}
							style={{
								background: `linear-gradient(135deg, ${selectedDirection.color}, ${selectedDirection.color}dd)`,
							}}
						>
							{isSubmitting ? (
								<>
									<Loader2 className={styles.buttonLoader} />
									{t('phoneForm.submitting')}
								</>
							) : (
								<>
									{t('phoneForm.submit')}
									<ArrowRight size={20} />
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		)
	}

	if (selectedDirection && !showPhoneForm && !showResults) {
		const currentQ = questions[currentQuestion]
		const selectedAnswer = answers[currentQ.id]
		const Icon = selectedDirection.icon

		return (
			<div className={styles.container}>
				<div className={styles.testContainer}>
					<div className={styles.testHeader}>
						<div className={styles.testHeaderTop}>
							<button onClick={() => setSelectedDirection(null)} className={styles.backButton}>
								{t('test.back')}
							</button>
							<div className={styles.testProgress}>
								<span className={styles.progressText}>
									{t('test.questionProgress', {
										current: currentQuestion + 1,
										total: totalQuestions,
									})}
								</span>
								<div className={styles.progressBar}>
									<div
										className={styles.progressFill}
										style={{
											width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
											backgroundColor: selectedDirection.color,
										}}
									/>
								</div>
							</div>
						</div>
						<div className={styles.testDirection}>
							<div
								className={styles.directionBadge}
								style={{
									backgroundColor: `${selectedDirection.color}20`,
									color: selectedDirection.color,
								}}
							>
								<Icon size={20} />
								<span>{selectedDirection.name}</span>
							</div>
						</div>
					</div>

					<div className={styles.questionContainer}>
						<h2 className={styles.questionText}>{currentQ.question}</h2>

						<div className={styles.optionsContainer}>
							{currentQ.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswerSelect(currentQ.id, index)}
									className={`${styles.optionButton} ${selectedAnswer === index ? styles.optionSelected : ''}`}
									style={{
										borderColor: selectedAnswer === index ? selectedDirection.color : '#e5e7eb',
										backgroundColor: selectedAnswer === index ? `${selectedDirection.color}10` : 'white',
									}}
								>
									<span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
									<span className={styles.optionText}>{option}</span>
									{selectedAnswer === index && (
										<CheckCircle
											className={styles.optionCheck}
											style={{ color: selectedDirection.color }}
										/>
									)}
								</button>
							))}
						</div>
					</div>

					<div className={styles.testActions}>
						<button
							onClick={handlePreviousQuestion}
							disabled={currentQuestion === 0}
							className={styles.navButton}
						>
							{t('test.previous')}
						</button>
						<button
							onClick={handleNextQuestion}
							disabled={selectedAnswer === undefined}
							className={styles.nextButton}
							style={{
								backgroundColor: selectedAnswer !== undefined ? selectedDirection.color : '#9ca3af',
								cursor: selectedAnswer !== undefined ? 'pointer' : 'not-allowed',
							}}
						>
							{currentQuestion === totalQuestions - 1 ? t('test.finish') : t('test.next')}
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.selectionContainer}>
				<div className={styles.selectionHeader}>
					<div className={styles.headerIcon}>
						<Award size={48} />
					</div>
					<h1 className={styles.selectionTitle}>{t('selection.title')}</h1>
					<p className={styles.selectionSubtitle}>{t('selection.subtitle')}</p>
				</div>

				<div className={styles.directionsGrid}>
					{directions.map((direction) => {
						const Icon = direction.icon
						return (
							<button
								key={direction.id}
								onClick={() => handleDirectionSelect(direction)}
								className={styles.directionCard}
								style={{
									borderColor: direction.color,
									'--direction-color': direction.color,
								}}
							>
								<div
									className={styles.directionIcon}
									style={{
										backgroundColor: `${direction.color}20`,
										color: direction.color,
									}}
								>
									<Icon size={32} />
								</div>
								<h3 className={styles.directionName}>{direction.name}</h3>
								<p className={styles.directionDescription}>{direction.description}</p>
								<div className={styles.directionArrow}>
									<ArrowRight size={20} />
								</div>
							</button>
						)
					})}
				</div>
			</div>
		</div>
	)
}
