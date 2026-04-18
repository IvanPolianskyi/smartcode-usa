'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Code, Gamepad2, Box, Monitor, Phone, CheckCircle, Award, ArrowRight, Loader2, AlertCircle, Lock } from 'lucide-react'
import styles from './KnowledgeTestClient.module.css'
import { TEST_QUESTIONS } from '@/lib/testQuestions'
import { trackKnowledgeTestDirection, trackTrialLead } from '@/lib/metaPixel'

const DIRECTIONS = [
  {
    id: 'python',
    name: 'Python',
    icon: Code,
    color: '#3b82f6',
    description: 'Основи програмування на Python'
  },
  {
    id: 'roblox',
    name: 'Roblox Studio',
    icon: Box,
    color: '#10b981',
    description: 'Створення ігор у Roblox Studio'
  },
  {
    id: 'webdev',
    name: 'Веб-розробка',
    icon: Monitor,
    color: '#8b5cf6',
    description: 'HTML, CSS, React, дизайн'
  },
  {
    id: 'unity',
    name: 'Unity',
    icon: Gamepad2,
    color: '#f59e0b',
    description: 'C# та Unity'
  }
]

export default function KnowledgeTestClient() {
  const searchParams = useSearchParams()
  const [selectedDirection, setSelectedDirection] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showPhoneForm, setShowPhoneForm] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [testResult, setTestResult] = useState(null)

  // Auto-select direction from URL parameter
  useEffect(() => {
    const courseParam = searchParams.get('course')
    if (courseParam && !selectedDirection) {
      const direction = DIRECTIONS.find(d => d.id === courseParam)
      if (direction) {
        trackKnowledgeTestDirection(direction.id, direction.name)
        setSelectedDirection(direction)
        setCurrentQuestion(0)
        setAnswers({})
        setShowPhoneForm(false)
        setShowResults(false)
        setTestResult(null)
      }
    }
  }, [searchParams, selectedDirection])

  const questions = useMemo(() => 
    selectedDirection ? TEST_QUESTIONS[selectedDirection.id] : [], 
    [selectedDirection]
  )
  const totalQuestions = questions.length

  const handleDirectionSelect = (direction) => {
    trackKnowledgeTestDirection(direction.id, direction.name)
    setSelectedDirection(direction)
    setCurrentQuestion(0)
    setAnswers({})
    setShowPhoneForm(false)
    setShowResults(false)
    setTestResult(null)
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowPhoneForm(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const formatPhoneNumber = (digits) => {
    if (!digits) return '+380 '
    const part1 = digits.slice(0, 2)
    const part2 = digits.slice(2, 5)
    const part3 = digits.slice(5, 7)
    const part4 = digits.slice(7, 9)

    let formatted = '+380 '
    if (part1) formatted += part1
    if (part2) formatted += '-' + part2
    if (part3) formatted += '-' + part3
    if (part4) formatted += '-' + part4

    return formatted
  }

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '')
    const clean = digits.startsWith('380') ? digits.slice(3) : digits
    setPhone(clean.slice(0, 9))
    setError('')
  }

  const calculateScore = useCallback(() => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++
      }
    })
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100)
    }
  }, [questions, answers, totalQuestions])

  const handleSubmitPhone = async (e) => {
    e.preventDefault()
    setError('')
    
    if (phone.length !== 9) {
      setError('Будь ласка, введіть повний номер телефону (9 цифр після +380)')
      return
    }

    if (!name.trim()) {
      setError('Будь ласка, введіть ваше ім\'я')
      return
    }

    setIsSubmitting(true)

    try {
      const score = calculateScore()
      const fullPhoneNumber = `+380${phone}`

      const response = await fetch('/api/knowledge-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: fullPhoneNumber,
          name: name.trim(),
          direction: selectedDirection.id,
          directionName: selectedDirection.name,
          score: score.correct,
          totalQuestions: score.total,
          percentage: score.percentage,
          answers: answers,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        trackTrialLead(`Діагностика: ${selectedDirection.name}`)
        setTestResult(score)
        setShowPhoneForm(false)
        setShowResults(true)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit test results')
      }
    } catch (err) {
      console.error('Error submitting test results:', err)
      setError('Помилка при відправці. Спробуйте ще раз.')
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
    setPhone('')
    setName('')
    setError('')
  }

  if (showResults && testResult) {
    const Icon = selectedDirection.icon
    const getResultMessage = () => {
      if (testResult.percentage >= 80) return 'Відмінно! Ви маєте чудові знання! Продовжуйте розвиватися!'
      if (testResult.percentage >= 60) return 'Добре! Ви на правильному шляху! Записуйтесь на навчання і результат стане неодмінно краще!'
      if (testResult.percentage >= 40) return 'Непогано! Є що покращити. Записуйтесь на навчання і ви досягнете успіху!'
      return 'Записуйтесь на навчання і результат стане неодмінно краще! Разом ми досягнемо успіху!'
    }

    const getResultColor = () => {
      if (testResult.percentage >= 80) return '#10b981'
      if (testResult.percentage >= 60) return '#3b82f6'
      if (testResult.percentage >= 40) return '#f59e0b'
      return '#ef4444'
    }

    return (
      <div className={styles.container}>
        <div className={styles.resultsContainer}>
          <div className={styles.resultsHeader}>
            <div className={styles.resultsIcon} style={{ backgroundColor: `${selectedDirection.color}20`, color: selectedDirection.color }}>
              <Icon size={48} />
            </div>
            <h1 className={styles.resultsTitle}>Результати тесту</h1>
            <p className={styles.resultsSubtitle}>{selectedDirection.name}</p>
          </div>

          <div className={styles.scoreCard} style={{ borderColor: getResultColor() }}>
            <div className={styles.scoreCircle} style={{ borderColor: getResultColor() }}>
              <span className={styles.scorePercentage} style={{ color: getResultColor() }}>
                {testResult.percentage}%
              </span>
            </div>
            <div className={styles.scoreDetails}>
              <p className={styles.scoreText}>
                Правильних відповідей: <strong>{testResult.correct}</strong> з <strong>{testResult.total}</strong>
              </p>
              <p className={styles.resultMessage} style={{ color: getResultColor() }}>
                {getResultMessage()}
              </p>
            </div>
          </div>

          <div className={styles.resultsActions}>
            <button onClick={handleRestart} className={styles.restartButton}>
              Пройти тест ще раз
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
            <div className={styles.phoneFormIcon} style={{ backgroundColor: `${selectedDirection.color}20`, color: selectedDirection.color }}>
              <Phone size={32} />
            </div>
            <h2 className={styles.phoneFormTitle}>Введіть ваші дані</h2>
            <p className={styles.phoneFormSubtitle}>
              Щоб побачити результати тесту, введіть ваш номер телефону
            </p>
          </div>

          <form onSubmit={handleSubmitPhone} className={styles.phoneForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Ваше ім&apos;я *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Введіть ваше ім'я"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Номер телефону *
              </label>
              <div className={styles.phoneInputContainer}>
                <Phone className={styles.phoneIcon} />
                <input
                  type="tel"
                  id="phone"
                  value={formatPhoneNumber(phone)}
                  onChange={handlePhoneChange}
                  className={styles.phoneInput}
                  placeholder="+380 96-656-62-43"
                  required
                />
              </div>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle className={styles.errorIcon} />
                {error}
              </div>
            )}

            <div className={styles.privacyNote}>
              <Lock className={styles.privacyIcon} />
              <span>
                Ваші дані захищені та не будуть передані третім особам
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
              style={{ background: `linear-gradient(135deg, ${selectedDirection.color}, ${selectedDirection.color}dd)` }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={styles.buttonLoader} />
                  Відправляємо...
                </>
              ) : (
                <>
                  Побачити результати
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
                ← Назад
              </button>
              <div className={styles.testProgress}>
                <span className={styles.progressText}>
                  Питання {currentQuestion + 1} з {totalQuestions}
                </span>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ 
                      width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                      backgroundColor: selectedDirection.color
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.testDirection}>
              <div className={styles.directionBadge} style={{ backgroundColor: `${selectedDirection.color}20`, color: selectedDirection.color }}>
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
                    backgroundColor: selectedAnswer === index ? `${selectedDirection.color}10` : 'white'
                  }}
                >
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={styles.optionText}>{option}</span>
                  {selectedAnswer === index && (
                    <CheckCircle className={styles.optionCheck} style={{ color: selectedDirection.color }} />
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
              ← Попереднє
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === undefined}
              className={styles.nextButton}
              style={{ 
                backgroundColor: selectedAnswer !== undefined ? selectedDirection.color : '#9ca3af',
                cursor: selectedAnswer !== undefined ? 'pointer' : 'not-allowed'
              }}
            >
              {currentQuestion === totalQuestions - 1 ? 'Завершити тест' : 'Наступне →'}
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
          <h1 className={styles.selectionTitle}>Тест знань</h1>
          <p className={styles.selectionSubtitle}>
            Оберіть напрямок та перевірте свої знання
          </p>
        </div>

        <div className={styles.directionsGrid}>
          {DIRECTIONS.map((direction) => {
            const Icon = direction.icon
            return (
              <button
                key={direction.id}
                onClick={() => handleDirectionSelect(direction)}
                className={styles.directionCard}
                style={{
                  borderColor: direction.color,
                  '--direction-color': direction.color
                }}
              >
                <div className={styles.directionIcon} style={{ backgroundColor: `${direction.color}20`, color: direction.color }}>
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
