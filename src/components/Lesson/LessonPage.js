"use client"
import React, { useState, useEffect } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { 
  ArrowLeft, 
  Play, 
  Code, 
  BookOpen, 
  Target, 
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Lock,
  Loader2,
  Terminal,
  GripVertical
} from 'lucide-react'
import { updateProgress, checkCoursePurchase, createPayment, enrollInCourse } from '@/lib/authClient'
import { useLocale, useTranslations } from 'next-intl'
import { getCurriculum } from '@/lib/getCurriculum'
import { lessonContentMap as lessonContentMapUk } from '@/lib/lessonContentMap.uk'
import { lessonContentMap as lessonContentMapEn } from '@/lib/lessonContentMap.en'
import { checkPracticeOutput } from '@/lib/practiceValidation'
import { parsePracticeStdin } from '@/lib/parsePracticeStdin'
import { hasBlockedPythonCode } from '@/lib/pythonCodeGuard'
import { executePythonWithPyodide } from '@/lib/pyodideRunner'
import styles from './LessonPage.module.css'
import FloatingNavArrows from './FloatingNavArrows'

// Функція для конвертації markdown в HTML
const markdownToHtml = (text) => {
  if (!text) return ''
  
  let html = String(text)
  
  // Екрануємо HTML для безпеки (крім тих місць, де ми додаємо HTML навмисно)
  const escapeHtml = (str) => {
    if (!str) return ''
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  
  // КРОК 1: Спочатку обробляємо код блоки - це найважливіше!
  // Розекрановуємо backticks (замінюємо \`\`\` на ```)
  html = html.replace(/\\`\\`\\`/g, '```')
  html = html.replace(/\\`/g, '`')
  
  // Зберігаємо код блоки в масив перед обробкою
  const codeBlocks = []
  let codeBlockIndex = 0
  
  // Знаходимо всі код блоки (з мовою та без)
  // Використовуємо більш надійний regex, який знаходить блоки навіть з відступами
  html = html.replace(/```(\w+)?\s*\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODEBLOCK_${codeBlockIndex}__`
    const language = (lang && lang.trim()) || 'text'
    const codeContent = code.trim()
    
    if (codeContent) {
      codeBlocks.push({
        placeholder,
        html: `<pre class="code-block"><code class="language-${language}">${escapeHtml(codeContent)}</code></pre>`
      })
      codeBlockIndex++
      // Повертаємо унікальний плейсхолдер
      return placeholder
    }
    return match
  })
  
  // КРОК 2: Обробляємо inline код (тільки якщо не всередині код блоку)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>')
  
  // КРОК 3: Обробляємо жирний текст
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>')
  
  // КРОК 4: Обробляємо курсив
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
  html = html.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>')
  
  // КРОК 5: Обробляємо списки та параграфи
  const lines = html.split('\n')
  let inOrderedList = false
  let inUnorderedList = false
  let result = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Перевіряємо, чи це плейсхолдер код блоку
    const isCodeBlockPlaceholder = /__CODEBLOCK_\d+__/.test(trimmedLine)
    
    if (isCodeBlockPlaceholder) {
      // Закриваємо відкриті списки перед код блоком
      if (inOrderedList) {
        result.push('</ol>')
        inOrderedList = false
      }
      if (inUnorderedList) {
        result.push('</ul>')
        inUnorderedList = false
      }
      // Додаємо плейсхолдер БЕЗ обгортання в <p>
      result.push(trimmedLine)
      continue
    }
    
    // Перевіряємо нумеровані списки
    const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      if (!inOrderedList) {
        if (inUnorderedList) {
          result.push('</ul>')
          inUnorderedList = false
        }
        result.push('<ol>')
        inOrderedList = true
      }
      result.push(`<li>${orderedMatch[1]}</li>`)
      continue
    }
    
    // Перевіряємо марковані списки
    const unorderedMatch = trimmedLine.match(/^[-*+]\s+(.+)$/)
    if (unorderedMatch) {
      if (!inUnorderedList) {
        if (inOrderedList) {
          result.push('</ol>')
          inOrderedList = false
        }
        result.push('<ul>')
        inUnorderedList = true
      }
      result.push(`<li>${unorderedMatch[1]}</li>`)
      continue
    }
    
    // Звичайний текст - закриваємо списки якщо потрібно
    if (inOrderedList) {
      result.push('</ol>')
      inOrderedList = false
    }
    if (inUnorderedList) {
      result.push('</ul>')
      inUnorderedList = false
    }
    
    // Додаємо параграф або порожній рядок
    if (trimmedLine) {
      result.push(`<p>${trimmedLine}</p>`)
    } else {
      result.push('<br />')
    }
  }
  
  // Закриваємо відкриті списки
  if (inOrderedList) result.push('</ol>')
  if (inUnorderedList) result.push('</ul>')
  
  html = result.join('')
  
  // КРОК 6: Відновлюємо код блоки (ВАЖЛИВО: після всіх інших обробок!)
  codeBlocks.forEach(({ placeholder, html: blockHtml }) => {
    // Замінюємо плейсхолдер на реальний HTML код блоку
    // Використовуємо глобальну заміну для всіх входжень
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    
    // Спочатку пробуємо знайти в <p> тегах (якщо випадково обгорнувся)
    html = html.replace(new RegExp(`<p>\\s*${escapedPlaceholder}\\s*</p>`, 'g'), blockHtml)
    
    // Потім знаходимо безпосередньо (може бути з пробілами)
    html = html.replace(new RegExp(`\\s*${escapedPlaceholder}\\s*`, 'g'), blockHtml)
    
    // Нарешті, точний збіг
    html = html.replace(new RegExp(escapedPlaceholder, 'g'), blockHtml)
  })
  
  // КРОК 7: Очищаємо зайві <p> теги навколо код блоків
  html = html.replace(/<p>\s*(<pre class="code-block">[\s\S]*?<\/pre>)\s*<\/p>/gi, '$1')
  
  // КРОК 8: Очищаємо порожні параграфи та зайві br
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p><br \/><\/p>/g, '')
  html = html.replace(/(<br \/>){2,}/g, '<br />')
  
  // КРОК 9: Видаляємо залишки плейсхолдерів (на випадок якщо щось пішло не так)
  html = html.replace(/__CODEBLOCK_\d+__/g, '')
  
  return html
}

const LessonPage = ({ lessonId, courseId = "python-developer-zero-to-junior", userProgress = null, isPurchased = false, userRole = 'user', isAccessible = false, allowedLessons = [] }) => {
  const locale = useLocale()
  const t = useTranslations('lms.lesson')
  const tCommon = useTranslations('lms.common')
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('theory')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(null)
  const [showPracticeSolution, setShowPracticeSolution] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [codeExecution, setCodeExecution] = useState({
    isRunning: false,
    output: null,
    error: null,
    success: null
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [practiceCompleted, setPracticeCompleted] = useState(false)
  const [practiceChecked, setPracticeChecked] = useState(false)
  const [outputErrors, setOutputErrors] = useState([]) // Масив індексів рядків з помилками
  const [isPyodideLoading, setIsPyodideLoading] = useState(false)
  
  // Sidebar state — fixed defaults for SSR; restored from localStorage after mount
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)
  const [sidebarPrefsHydrated, setSidebarPrefsHydrated] = useState(false)
  
  // Handle Tab key for indentation in code editor
  const handleCodeKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.target
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = userCode
      const indent = '    ' // 4 spaces for Python
      const indentSize = 4
      
      if (e.shiftKey) {
        // Shift+Tab: remove indentation
        const lines = value.split('\n')
        const startLine = value.substring(0, start).split('\n').length - 1
        const endLine = value.substring(0, end).split('\n').length - 1
        
        let newValue = ''
        let newStart = start
        let newEnd = end
        let removedChars = 0
        
        for (let i = 0; i < lines.length; i++) {
          if (i >= startLine && i <= endLine) {
            const line = lines[i]
            const leadingSpaces = line.match(/^(\s*)/)[1].length
            if (leadingSpaces >= indentSize) {
              const newLine = line.substring(indentSize)
              newValue += newLine
              if (i < lines.length - 1) newValue += '\n'
              if (i === startLine) {
                removedChars = Math.min(indentSize, leadingSpaces)
                newStart = start - removedChars
              }
              newEnd -= Math.min(indentSize, leadingSpaces)
            } else {
              newValue += line
              if (i < lines.length - 1) newValue += '\n'
            }
          } else {
            newValue += lines[i]
            if (i < lines.length - 1) newValue += '\n'
          }
        }
        
        setUserCode(newValue)
        setTimeout(() => {
          textarea.selectionStart = Math.max(0, newStart)
          textarea.selectionEnd = Math.max(0, newEnd)
        }, 0)
      } else {
        // Tab: add indentation
        if (start === end) {
          // Single cursor - just add indent
          const newValue = value.substring(0, start) + indent + value.substring(end)
          setUserCode(newValue)
          setTimeout(() => {
            textarea.selectionStart = start + indent.length
            textarea.selectionEnd = start + indent.length
          }, 0)
        } else {
          // Multiple lines selected - indent all lines
          const lines = value.split('\n')
          const startLine = value.substring(0, start).split('\n').length - 1
          const endLine = value.substring(0, end).split('\n').length - 1
          
          let newValue = ''
          let newStart = start + indent.length
          let newEnd = end
          
          for (let i = 0; i < lines.length; i++) {
            if (i >= startLine && i <= endLine) {
              newValue += indent + lines[i]
              newEnd += indent.length
            } else {
              newValue += lines[i]
            }
            if (i < lines.length - 1) newValue += '\n'
          }
          
          setUserCode(newValue)
          setTimeout(() => {
            textarea.selectionStart = newStart
            textarea.selectionEnd = newEnd
          }, 0)
        }
      }
    }
  }
  
  // Get lesson content (locale-specific; EN falls back to UK until translated)
  const lessonContentMap = locale === 'en' ? lessonContentMapEn : lessonContentMapUk
  const lesson = lessonContentMap[lessonId]
  
  const curriculum = getCurriculum(courseId, locale)
  
  // If lesson not found in content map, try to get from curriculum
  const curriculumLesson = curriculum.modules
    .flatMap(m => m.lessons)
    .find(l => l.lessonId === lessonId)
  
  // Користувач вважається зареєстрованим якщо є userProgress або якщо він авторизований
  // (API автоматично створить прогрес при збереженні)
  const isEnrolled = userProgress !== null || userRole !== 'user'
  const isCompleted = userProgress?.completedLessons?.includes(lessonId) || false
  
  // Find next lesson
  const getNextLesson = () => {
    const allLessons = curriculum.modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.lessonId === lessonId)
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1]
    }
    return null
  }
  
  const nextLesson = getNextLesson()
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Завантажити стан практичного завдання при завантаженні сторінки
    if (userProgress?.completedPracticeTasks?.includes(lessonId)) {
      setPracticeCompleted(true)
    }
    
    // Завантажити результат тесту якщо він вже пройдений
    if (userProgress?.completedQuizzes?.[lessonId]) {
      const quizData = userProgress.completedQuizzes[lessonId]
      setQuizScore(quizData.score)
      setQuizSubmitted(true)
      // Відновити відповіді якщо вони збережені
      if (quizData.answers) {
        // Конвертуємо всі відповіді в числа для коректного порівняння
        const normalizedAnswers = {}
        Object.keys(quizData.answers).forEach(key => {
          const value = quizData.answers[key]
          normalizedAnswers[key] = value !== undefined && value !== null ? Number(value) : value
        })
        setQuizAnswers(normalizedAnswers)
      }
    }
    
    // Перевірити чи урок пройдено
    if (userProgress?.completedLessons?.includes(lessonId)) {
      // Lesson already completed
    }
  }, [lessonId, userProgress])

  // Автоматично відкрити тест для модулів 11 та 12, якщо немає практичного завдання
  useEffect(() => {
    if (isLoaded && lesson) {
      const moduleId = lesson.moduleId
      if ((moduleId === 'module-11' || moduleId === 'module-12') && !lesson.practiceTask) {
        setActiveTab('quiz')
      }
    }
  }, [isLoaded, lesson])

  // Restore sidebar prefs after mount (avoids SSR/client hydration mismatch)
  useEffect(() => {
    const savedWidth = localStorage.getItem('lessonSidebarWidth')
    if (savedWidth) {
      const width = parseInt(savedWidth, 10)
      if (!Number.isNaN(width) && width > 0) {
        setSidebarWidth(width)
      }
    }

    const savedCollapsed = localStorage.getItem('lessonSidebarCollapsed')
    if (savedCollapsed === 'true') {
      setIsSidebarCollapsed(true)
    }

    const savedClosed = localStorage.getItem('lessonSidebarClosed')
    if (savedClosed !== null) {
      setIsSidebarClosed(savedClosed === 'true')
    } else if (window.innerWidth <= 1024) {
      setIsSidebarClosed(true)
      localStorage.setItem('lessonSidebarClosed', 'true')
    }

    setSidebarPrefsHydrated(true)
  }, [])

  // Save sidebar width to localStorage when it changes
  useEffect(() => {
    if (!sidebarPrefsHydrated || isResizing || !sidebarWidth) return
    localStorage.setItem('lessonSidebarWidth', sidebarWidth.toString())
  }, [sidebarWidth, isResizing, sidebarPrefsHydrated])

  // Auto-close sidebar on mobile when viewport shrinks
  useEffect(() => {
    if (!sidebarPrefsHydrated) return

    const handleResize = () => {
      const isMobile = window.innerWidth <= 1024
      if (isMobile) {
        setIsSidebarClosed((closed) => {
          if (closed) return closed
          localStorage.setItem('lessonSidebarClosed', 'true')
          return true
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarPrefsHydrated])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', () => {})
      document.removeEventListener('mouseup', () => {})
    }
  }, [])
  
  if (!lesson && !curriculumLesson) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>{t('notFound')}</h2>
          <Link href={`/courses/${courseId}`}>{t('returnToCourse')}</Link>
        </div>
      </div>
    )
  }
  
  // Check if lesson is accessible
  const allLessons = curriculum.modules.flatMap(m => m.lessons)
  const currentLesson = allLessons.find(l => l.lessonId === lessonId)
  const lessonModuleIndex = curriculum.modules.findIndex(m => 
    m.lessons.some(l => l.lessonId === lessonId)
  )
  const isFirstLesson = lessonModuleIndex === 0 && currentLesson?.order === 1
  const explicitAllowedSet = new Set(allowedLessons || [])
  const hasAccess = userRole === 'admin' || isPurchased || isAccessible || explicitAllowedSet.has(lessonId) || isFirstLesson
  
  // Find current module
  const currentModule = lessonModuleIndex >= 0 ? curriculum.modules[lessonModuleIndex] : null
  
  const lockedDescription =
    locale === 'uk'
      ? courseId === 'roblox-studio'
        ? t('lockedDescriptionRoblox')
        : t('lockedDescriptionPython')
      : t('lockedDescription')

  const handlePurchase = async () => {
    setIsPurchasing(true)
    try {
      if (locale === 'en') {
        try {
          await fetch('/api/metrics/clicks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseId, source: 'lesson_page' })
          })
        } catch (err) {
          console.error('Failed to track click', err)
        }
      }

      const paymentData = await createPayment(courseId, locale)
      if (paymentData.paymentUrl) {
        window.location.href = paymentData.paymentUrl
      }
    } catch (error) {
      console.error('Purchase error:', error)
      alert(t('paymentError'))
      setIsPurchasing(false)
    }
  }
  
  // Show locked message if lesson is not accessible
  if (!hasAccess) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link 
            href={`/courses/${courseId}`}
            className={styles.backButton}
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToCourse')}
          </Link>
        </header>
        <div className={styles.error}>
          <Lock className="w-16 h-16" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h2>{t('lockedTitle')}</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '500px' }}>
            {lockedDescription}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              href={`/courses/${courseId}`}
              className={styles.ctaButton}
            >
              {t('returnToCourse')}
            </Link>
            {locale === 'en' && userProgress && (
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className={styles.ctaButton}
                style={{ backgroundColor: 'var(--accent-blue)' }}
              >
                {isPurchasing ? t('processing') : t('purchaseCourse')}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Use full lesson content if available, otherwise use curriculum data
  const fullLesson = lesson || {
    ...curriculumLesson,
    theory: { sections: [] },
    codeExamples: [],
    practiceTask: null,
    quiz: { questions: [] },
    commonMistakes: [],
    summary: ""
  }
  
  const handleQuizSubmit = async (e) => {
    // Запобігаємо стандартній поведінці форми та перекиданню на футер
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (!fullLesson.quiz || !fullLesson.quiz.questions) return
    
    let correct = 0
    fullLesson.quiz.questions.forEach(q => {
      const userAnswer = quizAnswers[q.id]
      // Порівнюємо як числа (індекси відповідей)
      const isCorrect = userAnswer !== undefined && userAnswer !== null && Number(userAnswer) === Number(q.correctAnswer)
      if (isCorrect) {
        correct++
      }
    })
    
    const score = Math.round((correct / fullLesson.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)
    
    // Запам'ятовуємо позицію скролу перед оновленням
    const scrollPosition = window.scrollY || window.pageYOffset
    
    // Save quiz result (API автоматично створить прогрес якщо його немає)
    setIsSaving(true)
    try {
      // Спочатку зберігаємо результат тесту (API створить прогрес якщо потрібно)
      // Зберігаємо також відповіді для відображення результатів
      const quizResult = await updateProgress(courseId, {
        action: 'completeQuiz',
        lessonId,
        quizScore: score,
        quizAnswers: quizAnswers // Зберігаємо відповіді
      })
      
      // Mark lesson as completed ONLY if quiz passed (score >= passingScore)
      const passingScore = fullLesson.quiz?.passingScore || 60
      if (score >= passingScore) {
        await updateProgress(courseId, {
          action: 'completeLesson',
          lessonId
        })
      }
      
      // Refresh page data without reloading
      router.refresh()
      
      // Прокручуємо до результатів тесту замість футеру
      setTimeout(() => {
        const quizResultsElement = document.getElementById('quiz-results')
        if (quizResultsElement) {
          // Додаємо offset для хедера (якщо він фіксований на десктопі)
          const headerOffset = window.innerWidth > 1024 ? 100 : 0
          const elementPosition = quizResultsElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        } else {
          // Якщо елемент ще не відрендерений, відновлюємо попередню позицію
          window.scrollTo({
            top: scrollPosition,
            behavior: 'instant'
          })
        }
      }, 300)
    } catch (error) {
      console.error('Error saving progress:', error)
      alert(t('progressError'))
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }
  
  const handleRetakeQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(null)
  }
  
  const isQuizPassed = quizScore !== null && quizScore >= (fullLesson.quiz?.passingScore || 60)

  const checkPracticeTask = (output) =>
    checkPracticeOutput(output, fullLesson.practiceTask)

  const handleRunCode = async () => {
    if (!userCode.trim()) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.emptyCode'),
        success: false
      })
      return
    }

    const moduleId = fullLesson?.moduleId || curriculumLesson?.moduleId

    if (hasBlockedPythonCode(userCode, moduleId)) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.dangerousCode'),
        success: false
      })
      return
    }

    // Check code length
    if (userCode.length > 50000) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: t('runCodeErrors.codeTooLong'),
        success: false
      })
      return
    }

    setCodeExecution({
      isRunning: true,
      output: null,
      error: null,
      success: null
    })
    setPracticeChecked(false)
    setOutputErrors([])
    setIsPyodideLoading(true)

    try {
      let stdinData = ''
      if (fullLesson.practiceTask?.examples?.length > 0) {
        const firstExample = fullLesson.practiceTask.examples[0]
        if (firstExample.input) {
          stdinData = parsePracticeStdin(firstExample.input)
        }
      }

      const data = await executePythonWithPyodide(userCode, {
        stdin: stdinData,
        moduleId,
        onLoading: () => setIsPyodideLoading(true),
        messages: {
          timeout: t('runCodeErrors.executionTimeout'),
          workerError: t('runCodeErrors.workerError'),
          workerStartFailed: t('runCodeErrors.workerStartFailed'),
        },
      })

      setIsPyodideLoading(false)

      const output = data.output || ''
      const checkResult = checkPracticeTask(output)

      setCodeExecution({
        isRunning: false,
        output,
        error: data.errorOutput || null,
        success: data.success,
      })

      if (checkResult.isCorrect !== null) {
        setPracticeChecked(true)
        setOutputErrors(checkResult.errors)
        setPracticeCompleted(Boolean(checkResult.isCorrect))

        if (checkResult.isCorrect) {
          try {
            await updateProgress(courseId, {
              action: 'completePracticeTask',
              lessonId,
              practiceOutput: output,
              locale,
            })
            router.refresh()
          } catch (error) {
            console.error('Error saving practice task completion:', error)
            setPracticeCompleted(false)
          }
        }
      }
    } catch (error) {
      console.error('Error executing code with Pyodide:', error)
      setIsPyodideLoading(false)
      const isLoadError = error?.message === 'PYODIDE_LOAD_FAILED'
      setCodeExecution({
        isRunning: false,
        output: null,
        error: isLoadError
          ? t('runCodeErrors.pyodideLoadFailed')
          : t('runCodeErrors.executionFailed'),
        success: false,
      })
      setPracticeChecked(false)
      setOutputErrors([])
      setPracticeCompleted(
        Boolean(userProgress?.completedPracticeTasks?.includes(lessonId))
      )
    }
  }
  
  // Helper function to check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(lessonId) || false
  }

  // Helper function to check if lesson is unlocked
  const isLessonUnlocked = (lesson) => {
    if (userRole === 'admin' || isPurchased) return true
    return explicitAllowedSet.has(lesson.lessonId)
  }

  // Handle sidebar resize
  const handleResizeStart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    
    const startX = e.clientX
    const startWidth = isSidebarClosed ? 0 : sidebarWidth
    let currentWidth = startWidth
    let isClosed = isSidebarClosed
    
    let rafId = null
    
    const handleMouseMove = (e) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const diff = e.clientX - startX
        const newWidth = Math.max(0, startWidth + diff)
        const maxWidth = Math.min(600, window.innerWidth * 0.5)
        
        if (newWidth <= 0) {
          currentWidth = 0
          isClosed = true
          setIsSidebarClosed(true)
          setSidebarWidth(0)
        } else if (newWidth > 0 && newWidth < 50) {
          // Мінімальна ширина для відображення
          currentWidth = 50
          isClosed = false
          setSidebarWidth(50)
          setIsSidebarClosed(false)
        } else if (newWidth >= 50 && newWidth <= maxWidth) {
          currentWidth = newWidth
          isClosed = false
          setSidebarWidth(newWidth)
          setIsSidebarClosed(false)
        } else if (newWidth > maxWidth) {
          currentWidth = maxWidth
          isClosed = false
          setSidebarWidth(maxWidth)
          setIsSidebarClosed(false)
        }
      })
    }
    
    const handleMouseUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      setIsResizing(false)
      localStorage.setItem('lessonSidebarWidth', currentWidth.toString())
      localStorage.setItem('lessonSidebarClosed', isClosed.toString())
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.body.style.pointerEvents = ''
    }
    
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.body.style.pointerEvents = 'auto'
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle edge drag to open sidebar when closed
  const handleEdgeDragStart = (e) => {
    if (!isSidebarClosed) return
    
    e.preventDefault()
    setIsResizing(true)
    
    const startX = e.clientX
    const savedWidth = sidebarWidth > 0 ? sidebarWidth : 320
    let currentWidth = 0
    let isClosed = true
    
    let rafId = null
    
    const handleMouseMove = (e) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      
      rafId = requestAnimationFrame(() => {
        const newWidth = Math.max(0, e.clientX)
        const maxWidth = Math.min(600, window.innerWidth * 0.5)
        
        if (newWidth >= 50 && newWidth <= maxWidth) {
          currentWidth = newWidth
          isClosed = false
          setSidebarWidth(newWidth)
          setIsSidebarClosed(false)
        } else if (newWidth > maxWidth) {
          currentWidth = maxWidth
          isClosed = false
          setSidebarWidth(maxWidth)
          setIsSidebarClosed(false)
        } else if (newWidth < 50 && newWidth > 0) {
          currentWidth = 50
          isClosed = false
          setSidebarWidth(50)
          setIsSidebarClosed(false)
        }
      })
    }
    
    const handleMouseUp = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      setIsResizing(false)
      localStorage.setItem('lessonSidebarWidth', currentWidth > 0 ? currentWidth.toString() : savedWidth.toString())
      localStorage.setItem('lessonSidebarClosed', isClosed.toString())
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle sidebar toggle
  const toggleSidebar = () => {
    if (isSidebarClosed) {
      // Якщо закрите, відкрити
      setIsSidebarClosed(false)
      const savedWidth = sidebarWidth > 0 ? sidebarWidth : 320
      setSidebarWidth(savedWidth)
      localStorage.setItem('lessonSidebarClosed', 'false')
      localStorage.setItem('lessonSidebarWidth', savedWidth.toString())
    } else {
      // Якщо відкрите, закрити
      setIsSidebarClosed(true)
      setSidebarWidth(0)
      localStorage.setItem('lessonSidebarClosed', 'true')
    }
  }

  const handleNextAction = () => {
    if (activeTab === 'theory') {
      if (fullLesson.practiceTask) {
        setActiveTab('practice')
      } else if (fullLesson.quiz && fullLesson.quiz.questions && fullLesson.quiz.questions.length > 0) {
        setActiveTab('quiz')
      } else if (nextLesson) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    } else if (activeTab === 'practice') {
      if (fullLesson.quiz && fullLesson.quiz.questions && fullLesson.quiz.questions.length > 0) {
        const isPracticeCompleted = practiceCompleted || userProgress?.completedPracticeTasks?.includes(lessonId)
        if (!isPracticeCompleted) {
          alert(t('practiceRequiredAlert'))
        } else {
          setActiveTab('quiz')
        }
      } else if (nextLesson) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    } else if (activeTab === 'quiz') {
      if (nextLesson && isQuizPassed) {
        router.push(`/courses/${courseId}/lessons/${nextLesson.lessonId}`)
      }
    }
  }

  const handlePrevAction = () => {
    if (activeTab === 'quiz') {
      if (fullLesson.practiceTask) {
        setActiveTab('practice')
      } else {
        setActiveTab('theory')
      }
    } else if (activeTab === 'practice') {
      setActiveTab('theory')
    }
  }

  return (
    <>
      {/* Edge drag area when sidebar is closed */}
      {isSidebarClosed && (
        <div 
          className={styles.edgeDragArea}
          onMouseDown={handleEdgeDragStart}
          title={t('dragOpenMenu')}
        />
      )}

      {/* Toggle button when closed */}
      {isSidebarClosed && (
        <button 
          className={styles.sidebarToggleClosed}
          onClick={toggleSidebar}
          title={t('openMenu')}
        >
          <ChevronRight className={styles.toggleIcon} />
        </button>
      )}

      {/* Toggle button when open */}
      {!isSidebarClosed && (
        <button 
          className={styles.sidebarToggle}
          style={{ left: isSidebarCollapsed ? '45px' : `calc(${sidebarWidth}px - 25px)` }}
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? t('expandMenu') : t('collapseMenu')}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className={styles.toggleIcon} />
          ) : (
            <ChevronLeft className={styles.toggleIcon} />
          )}
        </button>
      )}

      <FloatingNavArrows 
        onNextAction={handleNextAction} 
        onPrevAction={handlePrevAction} 
      />
      <div className={`${styles.pageWrapper} ${isResizing ? styles.resizing : ''}`}>
        
        {/* Sidebar Navigation */}
      <aside 
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isSidebarClosed ? styles.closed : ''}`}
        style={{ 
          width: isSidebarClosed ? '0px' : (isSidebarCollapsed ? '60px' : `${sidebarWidth}px`),
          '--sidebar-width': `${sidebarWidth}px`
        }}
        >
          {/* Resize Handle */}
          {!isSidebarCollapsed && (
          <div 
            className={styles.resizeHandle}
            onMouseDown={handleResizeStart}
            title={t('resizeMenu')}
          >
            <GripVertical className={styles.resizeIcon} />
          </div>
        )}

        <div className={styles.sidebarHeader}>
          {!isSidebarCollapsed && <h3>{t('sidebarTitle')}</h3>}
        </div>
        {!isSidebarCollapsed && (
          <nav className={styles.sidebarNav}>
            {curriculum.modules.map((module, moduleIndex) => {
              const isModuleExpanded = moduleIndex === lessonModuleIndex || moduleIndex < lessonModuleIndex
              return (
                <div key={module.moduleId} className={styles.moduleSection}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleTitle}>
                      {t('sidebarModule', { order: module.order, title: module.title })}
                    </span>
                  </div>
                  <div className={styles.lessonsList}>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(lesson.lessonId)
                      const isUnlocked = isLessonUnlocked(lesson)
                      const isActive = lesson.lessonId === lessonId
                      
                      return (
                        <Link
                          key={lesson.lessonId}
                          href={`/courses/${courseId}/lessons/${lesson.lessonId}`}
                          className={`${styles.lessonLink} ${isActive ? styles.active : ''} ${!isUnlocked ? styles.locked : ''} ${isCompleted ? styles.completed : ''}`}
                          onClick={(e) => {
                            if (!isUnlocked) {
                              e.preventDefault()
                            }
                          }}
                        >
                          <div className={styles.lessonLinkContent}>
                            {isCompleted ? (
                              <CheckCircle2 className={styles.lessonIcon} />
                            ) : isUnlocked ? (
                              <Play className={styles.lessonIcon} />
                            ) : (
                              <Lock className={styles.lessonIcon} />
                            )}
                            <span className={styles.lessonNumber}>{lesson.order}</span>
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
        <div className={styles.backButtons}>
          <Link 
            href={`/courses/${courseId}`}
            className={styles.backButton}
          >
            <ArrowLeft className="w-5 h-5" />
            {t('backToCourse')}
          </Link>
          {currentModule && (
            <Link 
              href={`/courses/${courseId}#module-${currentModule.moduleId}`}
              className={styles.backButton}
            >
              <ArrowLeft className="w-5 h-5" />
              {t('backToModule')}
            </Link>
          )}
        </div>
        
        <div className={styles.headerInfo}>
          <div className={styles.breadcrumb}>
            <Link href="/">{tCommon('breadcrumb.home')}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/courses/${courseId}`}>{t('breadcrumb.course')}</Link>
            <ChevronRight className="w-4 h-4" />
            {currentModule ? (
              <Link href={`/courses/${courseId}#module-${currentModule.moduleId}`}>{t('breadcrumb.module')}</Link>
            ) : (
              <span>{t('breadcrumb.module')}</span>
            )}
            <ChevronRight className="w-4 h-4" />
            <span>{t('breadcrumb.lesson')}</span>
          </div>
          
          <h1 className={styles.title}>{fullLesson.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock className="w-4 h-4" />
              <span>{t('minutes', { count: fullLesson.estimatedTime || 60 })}</span>
            </div>
            {isCompleted && (
              <div className={styles.metaItem}>
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('completed')}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Learning Objectives */}
      {fullLesson.learningObjectives && fullLesson.learningObjectives.length > 0 && (
        <section className={styles.objectivesSection}>
          <h2 className={styles.sectionTitle}>
            <Target className="w-5 h-5" />
            {t('objectivesTitle')}
          </h2>
          <ul className={styles.objectivesList}>
            {fullLesson.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>
      )}
      
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'theory' ? styles.active : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          <BookOpen className="w-4 h-4" />
          {t('tabs.theory')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'practice' ? styles.active : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Code className="w-4 h-4" />
          {t('tabs.practice')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''} ${!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask ? styles.disabled : ''}`}
          onClick={() => {
            const isPracticeCompleted = practiceCompleted || userProgress?.completedPracticeTasks?.includes(lessonId)
            if (!isPracticeCompleted && fullLesson.practiceTask) {
              alert(t('practiceRequiredAlert'))
              setActiveTab('practice')
            } else {
              setActiveTab('quiz')
            }
          }}
          disabled={!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask}
          title={!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask ? t('practiceRequiredTitle') : ''}
        >
          <Target className="w-4 h-4" />
          {t('tabs.quiz')}
          {!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask && <Lock className="w-3 h-3" />}
        </button>
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className={styles.tabContent}>
            {/* Video Placeholder */}
            {fullLesson.videoUrl && (
              <div className={styles.videoSection}>
                <div className={styles.videoPlaceholder}>
                  <Play className="w-16 h-16" />
                  <p>{t('videoLesson')}</p>
                </div>
              </div>
            )}
            
            {/* Theory Sections */}
            {fullLesson.theory?.sections?.map((section, index) => (
              <div key={index} className={`${styles.theorySection} navigable-block`}>
                <h3 className={styles.theorySectionTitle}>{section.title}</h3>
                <div 
                  className={styles.theoryContent}
                  dangerouslySetInnerHTML={{ 
                    __html: markdownToHtml(section.content)
                  }}
                />
              </div>
            ))}
            
            {/* Code Examples */}
            {fullLesson.codeExamples && fullLesson.codeExamples.length > 0 && (
              <div className={`${styles.codeExamplesSection} navigable-block`}>
                <h3 className={styles.sectionTitle}>
                  <Code className="w-5 h-5" />
                  {t('codeExamplesTitle')}
                </h3>
                {fullLesson.codeExamples.map((example, index) => (
                  <div key={index} className={styles.codeExample}>
                    <h4 className={styles.codeExampleTitle}>{example.title}</h4>
                    <pre className={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                    <p className={styles.codeExplanation}>{example.explanation}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Common Mistakes */}
            {fullLesson.commonMistakes && fullLesson.commonMistakes.length > 0 && (
              <div className={`${styles.mistakesSection} navigable-block`}>
                <h3 className={styles.sectionTitle}>
                  <AlertCircle className="w-5 h-5" />
                  {t('mistakesTitle')}
                </h3>
                {fullLesson.commonMistakes.map((mistake, index) => (
                  <div key={index} className={styles.mistakeItem}>
                    <div className={styles.mistakeHeader}>
                      <XCircle className="w-5 h-5" />
                      <strong>{mistake.mistake}</strong>
                    </div>
                    <p className={styles.mistakeExplanation}>{mistake.explanation}</p>
                    <div className={styles.mistakeCorrect}>
                      <CheckCircle2 className="w-5 h-5" />
                      <strong>{t('correctLabel')}</strong> {mistake.correctApproach}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Summary */}
            {fullLesson.summary && (
              <div className={`${styles.summarySection} navigable-block`}>
                <h3 className={styles.sectionTitle}>
                  <Lightbulb className="w-5 h-5" />
                  {t('summaryTitle')}
                </h3>
                <div className={styles.summaryContent}>
                  {fullLesson.summary.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className={styles.tabContent}>
            {fullLesson.practiceTask ? (
              <>
                <div className={`${styles.practiceTask} navigable-block`}>
                  <h3 className={styles.sectionTitle}>
                    <Code className="w-5 h-5" />
                    {t('practiceTitle')}
                  </h3>
                  
                  <div className={styles.taskHeader}>
                    <h4>{fullLesson.practiceTask.title}</h4>
                    <span className={styles.difficultyBadge}>
                      {fullLesson.practiceTask.difficulty === 'beginner' ? t('difficulty.beginner') :
                       fullLesson.practiceTask.difficulty === 'intermediate' ? t('difficulty.intermediate') :
                       t('difficulty.advanced')}
                    </span>
                  </div>
                  
                  <p className={styles.taskDescription}>{fullLesson.practiceTask.description}</p>
                  
                  <div className={styles.taskSection}>
                    <h5>{t('taskCondition')}</h5>
                    <p>{fullLesson.practiceTask.problemStatement}</p>
                  </div>
                  
                  {fullLesson.practiceTask.examples && fullLesson.practiceTask.examples.length > 0 && (
                    <div className={styles.taskSection}>
                      <h5>{t('examplesTitle')}</h5>
                      {fullLesson.practiceTask.examples.map((example, index) => (
                        <div key={index} className={styles.exampleBox}>
                          {example.input && (
                            <div className={styles.exampleInput}>
                              <strong>{t('inputLabel')}</strong>
                              <pre>{example.input}</pre>
                            </div>
                          )}
                          <div className={styles.exampleOutput}>
                            <strong>{t('outputLabel')}</strong>
                            <pre>{example.output}</pre>
                          </div>
                          {example.explanation && (
                            <p className={styles.exampleExplanation}>{example.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {fullLesson.practiceTask.hints && fullLesson.practiceTask.hints.length > 0 && (
                    <div className={styles.hintsSection}>
                      <h5>
                        <Lightbulb className="w-4 h-4" />
                        {t('hintsTitle')}
                      </h5>
                      <ul>
                        {fullLesson.practiceTask.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className={styles.codeEditor}>
                    <div className={styles.editorHeader}>
                      <span>{t('yourCode')}</span>
                      <button
                        className={styles.solutionButton}
                        onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                      >
                        {t('solutionToggle', { action: showPracticeSolution ? t('hideSolution') : t('showSolution') })}
                      </button>
                    </div>
                    <textarea
                      className={styles.codeInput}
                      placeholder={t('codePlaceholder')}
                      rows={15}
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      onKeyDown={handleCodeKeyDown}
                      disabled={codeExecution.isRunning}
                    />
                    <button 
                      className={styles.runButton}
                      onClick={handleRunCode}
                      disabled={codeExecution.isRunning}
                    >
                      {codeExecution.isRunning ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {isPyodideLoading ? t('pyodideLoading') : t('running')}
                        </>
                      ) : (
                        <>
                          <Terminal className="w-4 h-4" />
                          {t('runCode')}
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Code Execution Results */}
                  {codeExecution.output !== null || codeExecution.error ? (
                    <div className={styles.executionResults}>
                      <h5>
                        <Terminal className="w-4 h-4" />
                        {t('executionResult')}
                      </h5>
                      {codeExecution.success !== false && codeExecution.output && (
                        <div className={styles.executionOutput}>
                          <strong>{t('outputResult')}</strong>
                          <pre>
                            {codeExecution.output.split('\n').map((line, index) => {
                              const isError = outputErrors.includes(index)
                              return (
                                <React.Fragment key={index}>
                                  <span
                                    className={isError ? styles.outputErrorLine : ''}
                                    style={{
                                      color: isError ? '#ef4444' : undefined,
                                      backgroundColor: isError ? 'rgba(239, 68, 68, 0.2)' : undefined,
                                      padding: isError ? '2px 4px' : undefined,
                                      borderRadius: isError ? '3px' : undefined,
                                      display: 'inline-block',
                                      width: '100%'
                                    }}
                                  >
                                    {line || '\u00A0'}
                                  </span>
                                  {'\n'}
                                </React.Fragment>
                              )
                            })}
                          </pre>
                        </div>
                      )}
                      {codeExecution.error && (
                        <div className={styles.executionError}>
                          <strong>{t('errorLabel')}</strong>
                          <pre>{codeExecution.error}</pre>
                        </div>
                      )}
                      {codeExecution.success === false && !codeExecution.error && codeExecution.output && (
                        <div className={styles.executionError}>
                          <strong>{t('executionError')}</strong>
                          <pre>{codeExecution.output}</pre>
                        </div>
                      )}
                      {/* Перевірка практичного завдання */}
                      {practiceChecked && fullLesson.practiceTask && (
                        <div className={practiceCompleted ? styles.practiceSuccess : styles.practiceError}>
                          {practiceCompleted ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              <strong>{t('practiceSuccess')}</strong>
                              <p>{t('practiceSuccessHint')}</p>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              <strong>{t('practiceFail')}</strong>
                              <p>{t('practiceFailHint')}</p>
                              {outputErrors.length > 0 && (
                                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#ef4444' }}>
                                  {t('outputErrorsFound', { count: outputErrors.length })}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : null}
                  
                  {showPracticeSolution && fullLesson.practiceTask.solution && (
                    <div className={styles.solutionSection}>
                      <h5>{t('exampleSolution')}</h5>
                      <pre className={styles.codeBlock}>
                        <code>{fullLesson.practiceTask.solution.code}</code>
                      </pre>
                      <button
                        className={styles.solutionButton}
                        onClick={() => {
                          setUserCode(fullLesson.practiceTask.solution.code)
                          setShowPracticeSolution(false)
                        }}
                        style={{ marginTop: '1rem' }}
                      >
                        {t('insertCode')}
                      </button>
                      <p className={styles.solutionExplanation}>
                        {fullLesson.practiceTask.solution.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.noContent}>
                <p>
                  {(fullLesson?.moduleId === 'module-09' && fullLesson?.lessonId !== 'lesson-09-1') ||
                   (fullLesson?.moduleId === 'module-10') ||
                   (fullLesson?.moduleId === 'module-11') ||
                   (fullLesson?.moduleId === 'module-12') ||
                   (fullLesson?.moduleId === 'module-13')
                    ? t('noPracticeAdvanced')
                    : t('noPracticeYet')}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className={styles.tabContent}>
            {/* Перевірка чи практичне завдання виконано */}
            {!practiceCompleted && fullLesson.practiceTask ? (
              <div className={styles.practiceError}>
                <Lock className="w-5 h-5" />
                <div>
                  <strong>{t('quizLockedTitle')}</strong>
                  <p>{t('quizLockedDescription')}</p>
                  <button
                    className={styles.ctaButton}
                    onClick={() => setActiveTab('practice')}
                    style={{ marginTop: '1rem' }}
                  >
                    {t('goToPractice')}
                  </button>
                </div>
              </div>
            ) : fullLesson.quiz && fullLesson.quiz.questions && fullLesson.quiz.questions.length > 0 ? (
              <>
                <div className={`${styles.quizHeader} navigable-block`}>
                  <h3 className={styles.sectionTitle}>
                    <Target className="w-5 h-5" />
                    {t('quizTitle')}
                  </h3>
                  <p className={styles.quizInfo}>
                    {t('quizInfo', { count: fullLesson.quiz.questions.length, passingScore: fullLesson.quiz?.passingScore || 60 })}
                    {fullLesson.quiz.timeLimit > 0 && t('quizTimeLimit', { minutes: fullLesson.quiz.timeLimit })}
                  </p>
                </div>
                
                <div className={styles.quizQuestions}>
                  {fullLesson.quiz.questions.map((question, index) => {
                    const userAnswer = quizAnswers[question.id]
                    // Перевірка правильності відповіді: порівнюємо індекси відповідей як числа
                    const isCorrect = userAnswer !== undefined && 
                                     userAnswer !== null && 
                                     Number(userAnswer) === Number(question.correctAnswer)
                    const showAnswer = quizSubmitted
                    
                    return (
                      <div 
                        key={question.id}
                        className={`${styles.quizQuestion} navigable-block ${
                          showAnswer ? (isCorrect ? styles.correct : styles.incorrect) : ''
                        }`}
                      >
                        <div className={styles.questionHeader}>
                          <span className={styles.questionNumber}>
                            {t('questionNumber', { number: index + 1 })}
                          </span>
                          {showAnswer && (
                            <span className={styles.questionResult}>
                              {isCorrect ? (
                                <><CheckCircle2 className="w-5 h-5" /> {t('correct')}</>
                              ) : (
                                <><XCircle className="w-5 h-5" /> {t('incorrect')}</>
                              )}
                            </span>
                          )}
                        </div>
                        
                        <div 
                          className={styles.questionText}
                          dangerouslySetInnerHTML={{ 
                            __html: markdownToHtml(question.question)
                          }}
                        />
                        
                        {question.type === 'code_reading' && question.code && (
                          <pre className={styles.questionCode}>
                            <code>{question.code}</code>
                          </pre>
                        )}
                        
                        <div className={styles.questionOptions}>
                          {question.options.map((option, optionIndex) => {
                            const isSelected = userAnswer !== undefined && userAnswer !== null && Number(userAnswer) === optionIndex
                            const isCorrectAnswer = optionIndex === Number(question.correctAnswer)
                            
                            return (
                              <button
                                key={optionIndex}
                                className={`${styles.optionButton} ${
                                  isSelected ? styles.selected : ''
                                } ${
                                  showAnswer && isCorrectAnswer ? styles.correctAnswer : ''
                                } ${
                                  showAnswer && isSelected && !isCorrect ? styles.wrongAnswer : ''
                                }`}
                                onClick={() => handleQuizAnswer(question.id, optionIndex)}
                                disabled={quizSubmitted}
                              >
                                <span className={styles.optionLetter}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                <span 
                                  className={styles.optionText}
                                  dangerouslySetInnerHTML={{ 
                                    __html: markdownToHtml(option)
                                  }}
                                />
                                {showAnswer && isCorrectAnswer && (
                                  <CheckCircle2 className={styles.optionIcon} />
                                )}
                                {showAnswer && isSelected && !isCorrect && (
                                  <XCircle className={styles.optionIcon} />
                                )}
                              </button>
                            )
                          })}
                        </div>
                        
                        {showAnswer && question.explanation && (
                          <div 
                            className={styles.questionExplanation}
                            dangerouslySetInnerHTML={{ 
                              __html: `<strong>${t('explanation')}</strong> ${markdownToHtml(question.explanation)}`
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                
                <div className={styles.quizActions}>
                  {!quizSubmitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                      <button
                        type="button"
                        className={styles.submitButton}
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(quizAnswers).length < fullLesson.quiz.questions.length}
                      >
                        {t('submitQuiz')}
                      </button>
                      {Object.keys(quizAnswers).length < fullLesson.quiz.questions.length && (
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          ({Object.keys(quizAnswers).length}/{fullLesson.quiz.questions.length})
                        </span>
                      )}
                    </div>
                  ) : (
                    <div id="quiz-results" className={styles.quizResults}>
                      <div className={styles.scoreCard}>
                        <h4>{t('yourScore')}</h4>
                        <div className={styles.scoreValue}>
                          {quizScore}%
                        </div>
                        <div className={styles.scoreStatus}>
                          {isQuizPassed ? (
                            <><CheckCircle2 className="w-5 h-5" /> {t('quizPassed')}</>
                          ) : (
                            <><XCircle className="w-5 h-5" /> {t('quizFailed')}</>
                          )}
                        </div>
                        {!isQuizPassed && (
                          <p className={styles.retakeInfo}>
                            {t('retakeInfo', { passingScore: fullLesson.quiz?.passingScore || 60 })}
                          </p>
                        )}
                        {nextLesson && (
                          <Link
                            href={`/courses/${courseId}/lessons/${nextLesson.lessonId}`}
                            className={styles.nextLessonButton}
                          >
                            <ChevronRight className="w-5 h-5" />
                            {t('nextLesson', { title: nextLesson.title })}
                          </Link>
                        )}
                        {!nextLesson && (
                          <p className={styles.completionMessage}>
                            {t('courseCompleted')}
                          </p>
                        )}
                        <button
                          className={styles.retakeButton}
                          onClick={handleRetakeQuiz}
                          style={{ marginTop: '1rem' }}
                        >
                          {t('retakeQuiz')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.noContent}>
                <p>{t('noQuizYet')}</p>
              </div>
            )}
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default LessonPage

