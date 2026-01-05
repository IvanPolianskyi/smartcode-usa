"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { lesson_00_1 } from '@/lib/lessonContent/lesson-00-1'
import { lesson_00_2 } from '@/lib/lessonContent/lesson-00-2'
import { lesson_00_3 } from '@/lib/lessonContent/lesson-00-3'
import { lesson_00_4 } from '@/lib/lessonContent/lesson-00-4'
import { lesson_00_5 } from '@/lib/lessonContent/lesson-00-5'
import { lesson_00_6 } from '@/lib/lessonContent/lesson-00-6'
import { lesson_00_7 } from '@/lib/lessonContent/lesson-00-7'
import { lesson_00_8 } from '@/lib/lessonContent/lesson-00-8'
import { lesson_01_1 } from '@/lib/lessonContent/lesson-01-1'
import { lesson_01_2 } from '@/lib/lessonContent/lesson-01-2'
import { lesson_01_3 } from '@/lib/lessonContent/lesson-01-3'
import { lesson_02_1 } from '@/lib/lessonContent/lesson-02-1'
import { lesson_02_2 } from '@/lib/lessonContent/lesson-02-2'
import { lesson_02_3 } from '@/lib/lessonContent/lesson-02-3'
import { lesson_02_4 } from '@/lib/lessonContent/lesson-02-4'
import { lesson_02_5 } from '@/lib/lessonContent/lesson-02-5'
import { lesson_02_6 } from '@/lib/lessonContent/lesson-02-6'
import { lesson_02_7 } from '@/lib/lessonContent/lesson-02-7'
import { lesson_02_8 } from '@/lib/lessonContent/lesson-02-8'
import { lesson_03_1 } from '@/lib/lessonContent/lesson-03-1'
import { lesson_03_10 } from '@/lib/lessonContent/lesson-03-10'
import { lesson_03_2 } from '@/lib/lessonContent/lesson-03-2'
import { lesson_03_3 } from '@/lib/lessonContent/lesson-03-3'
import { lesson_03_4 } from '@/lib/lessonContent/lesson-03-4'
import { lesson_03_5 } from '@/lib/lessonContent/lesson-03-5'
import { lesson_03_6 } from '@/lib/lessonContent/lesson-03-6'
import { lesson_03_7 } from '@/lib/lessonContent/lesson-03-7'
import { lesson_03_8 } from '@/lib/lessonContent/lesson-03-8'
import { lesson_03_9 } from '@/lib/lessonContent/lesson-03-9'
import { lesson_04_6 } from '@/lib/lessonContent/lesson-04-6'
import { lesson_04_7 } from '@/lib/lessonContent/lesson-04-7'
import { lesson_04_8 } from '@/lib/lessonContent/lesson-04-8'
import { lesson_05_5 } from '@/lib/lessonContent/lesson-05-5'
import { lesson_06_4 } from '@/lib/lessonContent/lesson-06-4'
import { lesson_07_1 } from '@/lib/lessonContent/lesson-07-1'
import { lesson_07_2 } from '@/lib/lessonContent/lesson-07-2'
import { lesson_07_3 } from '@/lib/lessonContent/lesson-07-3'
import { lesson_07_4 } from '@/lib/lessonContent/lesson-07-4'
import { lesson_08_1 } from '@/lib/lessonContent/lesson-08-1'
import { lesson_08_2 } from '@/lib/lessonContent/lesson-08-2'
import { lesson_08_3 } from '@/lib/lessonContent/lesson-08-3'
import { lesson_08_4 } from '@/lib/lessonContent/lesson-08-4'
import { lesson_08_5 } from '@/lib/lessonContent/lesson-08-5'
import { lesson_08_6 } from '@/lib/lessonContent/lesson-08-6'
import { lesson_09_3 } from '@/lib/lessonContent/lesson-09-3'
import { lesson_09_4 } from '@/lib/lessonContent/lesson-09-4'
import { lesson_09_5 } from '@/lib/lessonContent/lesson-09-5'
import { lesson_09_6 } from '@/lib/lessonContent/lesson-09-6'
import { lesson_12_5 } from '@/lib/lessonContent/lesson-12-5'
import { lesson_12_6 } from '@/lib/lessonContent/lesson-12-6'
import { lesson_14_4 } from '@/lib/lessonContent/lesson-14-4'
import { lesson_14_5 } from '@/lib/lessonContent/lesson-14-5'
import { lesson_15_6 } from '@/lib/lessonContent/lesson-15-6'
import styles from './LessonPage.module.css'

// Map lesson IDs to content
const lessonContentMap = {
  "lesson-00-1": lesson_00_1,
  "lesson-00-2": lesson_00_2,
  "lesson-00-3": lesson_00_3,
  "lesson-00-4": lesson_00_4,
  "lesson-00-5": lesson_00_5,
  "lesson-00-6": lesson_00_6,
  "lesson-00-7": lesson_00_7,
  "lesson-00-8": lesson_00_8,
  "lesson-01-1": lesson_01_1,
  "lesson-01-2": lesson_01_2,
  "lesson-01-3": lesson_01_3,
  "lesson-02-1": lesson_02_1,
  "lesson-02-2": lesson_02_2,
  "lesson-02-3": lesson_02_3,
  "lesson-02-4": lesson_02_4,
  "lesson-02-5": lesson_02_5,
  "lesson-02-6": lesson_02_6,
  "lesson-02-7": lesson_02_7,
  "lesson-02-8": lesson_02_8,
  "lesson-03-1": lesson_03_1,
  "lesson-03-10": lesson_03_10,
  "lesson-03-2": lesson_03_2,
  "lesson-03-3": lesson_03_3,
  "lesson-03-4": lesson_03_4,
  "lesson-03-5": lesson_03_5,
  "lesson-03-6": lesson_03_6,
  "lesson-03-7": lesson_03_7,
  "lesson-03-8": lesson_03_8,
  "lesson-03-9": lesson_03_9,
  "lesson-04-1": lesson_04_6,
  "lesson-04-2": lesson_04_6,
  "lesson-04-3": lesson_04_6,
  "lesson-04-4": lesson_04_6,
  "lesson-04-5": lesson_04_6,
  "lesson-04-6": lesson_04_6,
  "lesson-04-7": lesson_04_7,
  "lesson-04-8": lesson_04_8,
  "lesson-05-1": lesson_05_5,
  "lesson-05-2": lesson_05_5,
  "lesson-05-3": lesson_05_5,
  "lesson-05-4": lesson_05_5,
  "lesson-05-5": lesson_05_5,
  "lesson-06-1": lesson_06_4,
  "lesson-06-2": lesson_06_4,
  "lesson-06-3": lesson_06_4,
  "lesson-06-4": lesson_06_4,
  "lesson-07-1": lesson_07_1,
  "lesson-07-2": lesson_07_2,
  "lesson-07-3": lesson_07_3,
  "lesson-07-4": lesson_07_4,
  "lesson-08-1": lesson_08_1,
  "lesson-08-2": lesson_08_2,
  "lesson-08-3": lesson_08_3,
  "lesson-08-4": lesson_08_4,
  "lesson-08-5": lesson_08_5,
  "lesson-08-6": lesson_08_6,
  "lesson-09-3": lesson_09_3,
  "lesson-09-4": lesson_09_4,
  "lesson-09-5": lesson_09_5,
  "lesson-09-6": lesson_09_6,
  "lesson-12-5": lesson_12_5,
  "lesson-12-6": lesson_12_6,
  "lesson-14-4": lesson_14_4,
  "lesson-14-5": lesson_14_5,
  "lesson-15-6": lesson_15_6,
}

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

const LessonPage = ({ lessonId, courseId = "python-developer-zero-to-junior", userProgress = null, isPurchased = false, userRole = 'user', isAccessible = false }) => {
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
  
  // Sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lessonSidebarWidth')
      return saved ? parseInt(saved, 10) : 320
    }
    return 320
  })
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lessonSidebarCollapsed')
      return saved === 'true'
    }
    return false
  })
  const [isResizing, setIsResizing] = useState(false)
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lessonSidebarClosed')
      return saved === 'true'
    }
    return false
  })
  
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
  
  // Get lesson content
  const lesson = lessonContentMap[lessonId]
  
  // Get curriculum based on courseId
  const getCurriculum = () => {
    if (courseId === "web-development") {
      return webDevCurriculum
    }
    return pythonCurriculum
  }
  
  const curriculum = getCurriculum()
  
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
      console.log('Practice task already completed for lesson:', lessonId)
      setPracticeCompleted(true)
    }
    
    // Завантажити результат тесту якщо він вже пройдений
    if (userProgress?.completedQuizzes?.[lessonId]) {
      const quizData = userProgress.completedQuizzes[lessonId]
      console.log('Quiz already completed for lesson:', lessonId, 'score:', quizData.score)
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
      console.log('Lesson already completed:', lessonId)
    }
  }, [lessonId, userProgress])

  // Save sidebar width to localStorage when it changes
  useEffect(() => {
    if (!isResizing && sidebarWidth) {
      localStorage.setItem('lessonSidebarWidth', sidebarWidth.toString())
    }
  }, [sidebarWidth, isResizing])

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
          <h2>Урок не знайдено</h2>
          <Link href={`/courses/${courseId}`}>Повернутися до курсу</Link>
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
  const hasAccess = userRole === 'admin' || isPurchased || isAccessible || isFirstLesson
  
  // Find current module
  const currentModule = lessonModuleIndex >= 0 ? curriculum.modules[lessonModuleIndex] : null
  
  const handlePurchase = async () => {
    setIsPurchasing(true)
    try {
      // Create payment and redirect to payment page
      const paymentData = await createPayment(courseId)
      
      // Create form and submit to LiqPay
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = paymentData.paymentUrl
      
      const dataInput = document.createElement('input')
      dataInput.type = 'hidden'
      dataInput.name = 'data'
      dataInput.value = paymentData.data
      form.appendChild(dataInput)
      
      const signatureInput = document.createElement('input')
      signatureInput.type = 'hidden'
      signatureInput.name = 'signature'
      signatureInput.value = paymentData.signature
      form.appendChild(signatureInput)
      
      document.body.appendChild(form)
      form.submit()
    } catch (error) {
      console.error('Purchase error:', error)
      alert('Помилка створення платежу. Спробуйте ще раз.')
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
            До курсу
          </Link>
        </header>
        <div className={styles.error}>
          <Lock className="w-16 h-16" style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h2>Урок заблоковано</h2>
          <p style={{ marginBottom: '2rem', textAlign: 'center', maxWidth: '500px' }}>
            Цей урок доступний тільки після придбання курсу. Перший урок першого модуля доступний безкоштовно для ознайомлення.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              href={`/courses/${courseId}`}
              className={styles.ctaButton}
            >
              Повернутися до курсу
            </Link>
            {userProgress && (
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className={styles.ctaButton}
                style={{ backgroundColor: 'var(--accent-blue)' }}
              >
                {isPurchasing ? 'Обробка...' : 'Придбати курс'}
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
  
  const handleQuizSubmit = async () => {
    if (!fullLesson.quiz || !fullLesson.quiz.questions) return
    
    let correct = 0
    fullLesson.quiz.questions.forEach(q => {
      const userAnswer = quizAnswers[q.id]
      // Порівнюємо як числа (індекси відповідей)
      const isCorrect = userAnswer !== undefined && userAnswer !== null && Number(userAnswer) === Number(q.correctAnswer)
      if (isCorrect) {
        correct++
      }
      // Діагностика
      if (process.env.NODE_ENV === 'development') {
        console.log('Quiz submit - Question:', q.id, 'User:', userAnswer, 'Correct:', q.correctAnswer, 'Match:', isCorrect)
      }
    })
    
    const score = Math.round((correct / fullLesson.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)
    
    // Save quiz result (API автоматично створить прогрес якщо його немає)
    setIsSaving(true)
    try {
      console.log('Saving quiz result:', { lessonId, score, courseId, isEnrolled, userProgress })
      
      // Спочатку зберігаємо результат тесту (API створить прогрес якщо потрібно)
      // Зберігаємо також відповіді для відображення результатів
      const quizResult = await updateProgress(courseId, {
        action: 'completeQuiz',
        lessonId,
        quizScore: score,
        quizAnswers: quizAnswers // Зберігаємо відповіді
      })
      console.log('Quiz result saved:', quizResult)
      
      // Mark lesson as completed ONLY if quiz passed (score >= passingScore)
      const passingScore = fullLesson.quiz?.passingScore || 60
      if (score >= passingScore) {
        console.log('Quiz passed, marking lesson as completed')
        const lessonResult = await updateProgress(courseId, {
          action: 'completeLesson',
          lessonId
        })
        console.log('Lesson marked as completed:', lessonResult)
      }
      
      // Refresh page data without reloading
      router.refresh()
    } catch (error) {
      console.error('Error saving progress:', error)
      alert('Помилка збереження прогресу. Спробуйте ще раз.')
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

  // Функція для перевірки правильності практичного завдання
  const checkPracticeTask = (output) => {
    if (!fullLesson.practiceTask || !fullLesson.practiceTask.examples || fullLesson.practiceTask.examples.length === 0) {
      return { isCorrect: null, errors: [] } // Немає прикладів для перевірки
    }

    // Нормалізуємо вивід (видаляємо зайві пробіли, переводимо в нижній регістр для порівняння)
    const normalizeOutput = (text) => {
      return text.trim().toLowerCase().replace(/\s+/g, ' ')
    }

    // Отримуємо очікуваний та фактичний вивід
    const expectedOutput = fullLesson.practiceTask.examples[0].output
    const actualOutput = output

    // Розбиваємо на рядки для порівняння (зберігаємо всі рядки, включаючи порожні)
    const expectedLines = expectedOutput.split('\n')
    const actualLines = actualOutput.split('\n')

    // Знаходимо помилки - рядки, які не відповідають
    const errors = []
    const maxLines = Math.max(expectedLines.length, actualLines.length)
    
    for (let i = 0; i < maxLines; i++) {
      const expectedLine = normalizeOutput(expectedLines[i] || '')
      const actualLine = normalizeOutput(actualLines[i] || '')
      
      // Якщо рядки не співпадають або один з них відсутній
      if (expectedLine !== actualLine) {
        errors.push(i)
      }
    }

    // Перевіряємо чи містить вивід ключові елементи очікуваного виводу
    const normalizedExpected = normalizeOutput(expectedOutput)
    const normalizedActual = normalizeOutput(actualOutput)

    let isCorrect = false
    if (normalizedExpected.length < 100) {
      // Для коротких виводів - точне порівняння
      isCorrect = normalizedActual === normalizedExpected
    } else {
      // Для довгих виводів - перевіряємо ключові фрази
      const keyPhrases = normalizedExpected.split('\n').filter(line => line.trim().length > 10)
      const matches = keyPhrases.filter(phrase => normalizedActual.includes(phrase))
      isCorrect = matches.length >= keyPhrases.length * 0.7 // 70% співпадінь
    }

    return { isCorrect, errors }
  }

  const handleRunCode = async () => {
    if (!userCode.trim()) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: 'Будь ласка, введіть код перед запуском',
        success: false
      })
      return
    }

    // Client-side security check (basic patterns)
    const dangerousPatterns = [
      /import\s+os\b/i,
      /import\s+subprocess\b/i,
      /import\s+requests\b/i,
      /import\s+urllib\b/i,
      /import\s+socket\b/i,
      /__import__\s*\(/i,
      /eval\s*\(/i,
      /exec\s*\(/i,
      /compile\s*\(/i,
      /open\s*\(['"]\/etc/i,
      /open\s*\(['"]\/proc/i,
      /open\s*\(['"]\/sys/i,
      /open\s*\(['"]\.\./i,
    ]

    // Normalize code for checking (remove comments and strings)
    const normalizeCode = (code) => {
      let normalized = code.replace(/#.*$/gm, '')
      normalized = normalized.replace(/""".*?"""/gs, '')
      normalized = normalized.replace(/'''.*?'''/gs, '')
      normalized = normalized.replace(/"[^"]*"/g, '')
      normalized = normalized.replace(/'[^']*'/g, '')
      return normalized
    }

    const normalizedCode = normalizeCode(userCode)
    const hasDangerousCode = dangerousPatterns.some(pattern => pattern.test(normalizedCode))

    if (hasDangerousCode) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: 'Код містить небезпечні операції, які не дозволені для виконання. Будь ласка, використовуйте тільки безпечні Python конструкції для навчання.',
        success: false
      })
      return
    }

    // Check code length
    if (userCode.length > 50000) {
      setCodeExecution({
        isRunning: false,
        output: null,
        error: 'Код занадто довгий. Максимальна довжина: 50000 символів',
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

    try {
      // Extract input data from examples if available
      let inputData = null
      if (fullLesson.practiceTask?.examples && fullLesson.practiceTask.examples.length > 0) {
        const firstExample = fullLesson.practiceTask.examples[0]
        if (firstExample.input) {
          inputData = firstExample.input
        }
      }

      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: userCode,
          input: inputData
        })
      })

      const data = await response.json()

      if (response.ok) {
        const output = data.output || ''
        const checkResult = checkPracticeTask(output)
        
        setCodeExecution({
          isRunning: false,
          output: output,
          error: data.errorOutput || null,
          success: data.success
        })

        // Перевіряємо правильність практичного завдання
        if (checkResult.isCorrect !== null) {
          setPracticeChecked(true)
          setOutputErrors(checkResult.errors)
          if (checkResult.isCorrect) {
            setPracticeCompleted(true)
            // Зберігаємо статус виконання практичного завдання (API створить прогрес якщо потрібно)
            try {
              await updateProgress(courseId, {
                action: 'completePracticeTask',
                lessonId
              })
              // Оновити сторінку для відображення змін
              router.refresh()
            } catch (error) {
              console.error('Error saving practice task completion:', error)
            }
          } else {
            // Не встановлюємо false, якщо завдання вже було успішно виконано раніше
            const wasAlreadyCompleted = userProgress?.completedPracticeTasks?.includes(lessonId)
            if (!wasAlreadyCompleted) {
              setPracticeCompleted(false)
            }
          }
        }
      } else {
        setCodeExecution({
          isRunning: false,
          output: data.output || '',
          error: data.error || data.errorOutput || 'Помилка виконання коду',
          success: false
        })
        setPracticeChecked(false)
        setOutputErrors([])
        // Не встановлюємо false, якщо завдання вже було успішно виконано раніше
        const wasAlreadyCompleted = userProgress?.completedPracticeTasks?.includes(lessonId)
        if (!wasAlreadyCompleted) {
          setPracticeCompleted(false)
        }
      }
    } catch (error) {
      console.error('Error executing code:', error)
      setCodeExecution({
        isRunning: false,
        output: null,
        error: 'Помилка підключення до сервера. Спробуйте ще раз.',
        success: false
      })
      setPracticeChecked(false)
      setOutputErrors([])
      // Не встановлюємо false, якщо завдання вже було успішно виконано раніше
      const wasAlreadyCompleted = userProgress?.completedPracticeTasks?.includes(lessonId)
      if (!wasAlreadyCompleted) {
        setPracticeCompleted(false)
      }
    }
  }
  
  // Helper function to check if lesson is completed
  const isLessonCompleted = (lessonId) => {
    return userProgress?.completedLessons?.includes(lessonId) || false
  }

  // Helper function to check if lesson is unlocked
  const isLessonUnlocked = (lesson, lessonIndex, moduleIndex) => {
    if (userRole === 'admin' || isPurchased) return true
    if (moduleIndex === 0 && lesson.order === 1) return true
    if (moduleIndex === 0) return true
    // Check if previous lesson is completed
    const allLessons = curriculum.modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.lessonId === lesson.lessonId)
    if (currentIndex === 0) return true
    const previousLesson = allLessons[currentIndex - 1]
    return isLessonCompleted(previousLesson.lessonId)
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

  return (
    <div className={`${styles.pageWrapper} ${isResizing ? styles.resizing : ''}`}>
      {/* Edge drag area when sidebar is closed */}
      {isSidebarClosed && (
        <div 
          className={styles.edgeDragArea}
          onMouseDown={handleEdgeDragStart}
          title="Тягніть, щоб відкрити меню"
        />
      )}
      
      {/* Sidebar Navigation */}
      <aside 
        className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''} ${isSidebarClosed ? styles.closed : ''}`}
        style={{ 
          width: isSidebarClosed ? '0px' : (isSidebarCollapsed ? '60px' : `${sidebarWidth}px`),
          '--sidebar-width': `${sidebarWidth}px`
        }}
      >
        {/* Collapse/Expand Button */}
        {!isSidebarClosed && (
          <button 
            className={styles.sidebarToggle}
            onClick={toggleSidebar}
            title={isSidebarCollapsed ? 'Розгорнути меню' : 'Згорнути меню'}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className={styles.toggleIcon} />
            ) : (
              <ChevronLeft className={styles.toggleIcon} />
            )}
          </button>
        )}
        
        {/* Toggle button when closed */}
        {isSidebarClosed && (
          <button 
            className={styles.sidebarToggleClosed}
            onClick={toggleSidebar}
            title="Відкрити меню"
          >
            <ChevronRight className={styles.toggleIcon} />
          </button>
        )}

        {/* Resize Handle */}
        {!isSidebarCollapsed && (
          <div 
            className={styles.resizeHandle}
            onMouseDown={handleResizeStart}
            title="Змінити розмір меню"
          >
            <GripVertical className={styles.resizeIcon} />
          </div>
        )}

        <div className={styles.sidebarHeader}>
          {!isSidebarCollapsed && <h3>Навігація по курсу</h3>}
        </div>
        {!isSidebarCollapsed && (
          <nav className={styles.sidebarNav}>
            {curriculum.modules.map((module, moduleIndex) => {
              const isModuleExpanded = moduleIndex === lessonModuleIndex || moduleIndex < lessonModuleIndex
              return (
                <div key={module.moduleId} className={styles.moduleSection}>
                  <div className={styles.moduleHeader}>
                    <span className={styles.moduleTitle}>
                      Модуль {module.order}: {module.title}
                    </span>
                  </div>
                  <div className={styles.lessonsList}>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(lesson.lessonId)
                      const isUnlocked = isLessonUnlocked(lesson, lessonIndex, moduleIndex)
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
            До курсу
          </Link>
          {currentModule && (
            <Link 
              href={`/courses/${courseId}#module-${currentModule.moduleId}`}
              className={styles.backButton}
            >
              <ArrowLeft className="w-5 h-5" />
              До модуля
            </Link>
          )}
        </div>
        
        <div className={styles.headerInfo}>
          <div className={styles.breadcrumb}>
            <Link href="/">Головна</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/courses/${courseId}`}>Курс</Link>
            <ChevronRight className="w-4 h-4" />
            {currentModule ? (
              <Link href={`/courses/${courseId}#module-${currentModule.moduleId}`}>Модуль</Link>
            ) : (
              <span>Модуль</span>
            )}
            <ChevronRight className="w-4 h-4" />
            <span>Урок</span>
          </div>
          
          <h1 className={styles.title}>{fullLesson.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock className="w-4 h-4" />
              <span>{fullLesson.estimatedTime || 60} хвилин</span>
            </div>
            {isCompleted && (
              <div className={styles.metaItem}>
                <CheckCircle2 className="w-4 h-4" />
                <span>Завершено</span>
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
            Цілі уроку
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
          Теорія
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'practice' ? styles.active : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Code className="w-4 h-4" />
          Практика
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''} ${!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask ? styles.disabled : ''}`}
          onClick={() => {
            const isPracticeCompleted = practiceCompleted || userProgress?.completedPracticeTasks?.includes(lessonId)
            if (!isPracticeCompleted && fullLesson.practiceTask) {
              alert('Спочатку виконайте практичне завдання правильно!')
              setActiveTab('practice')
            } else {
              setActiveTab('quiz')
            }
          }}
          disabled={!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask}
          title={!practiceCompleted && !userProgress?.completedPracticeTasks?.includes(lessonId) && fullLesson.practiceTask ? 'Спочатку виконайте практичне завдання' : ''}
        >
          <Target className="w-4 h-4" />
          Тест
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
                  <p>Відео-урок</p>
                </div>
              </div>
            )}
            
            {/* Theory Sections */}
            {fullLesson.theory?.sections?.map((section, index) => (
              <div key={index} className={styles.theorySection}>
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
              <div className={styles.codeExamplesSection}>
                <h3 className={styles.sectionTitle}>
                  <Code className="w-5 h-5" />
                  Приклади коду
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
              <div className={styles.mistakesSection}>
                <h3 className={styles.sectionTitle}>
                  <AlertCircle className="w-5 h-5" />
                  Типові помилки
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
                      <strong>Правильно:</strong> {mistake.correctApproach}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Summary */}
            {fullLesson.summary && (
              <div className={styles.summarySection}>
                <h3 className={styles.sectionTitle}>
                  <Lightbulb className="w-5 h-5" />
                  Підсумок
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
                <div className={styles.practiceTask}>
                  <h3 className={styles.sectionTitle}>
                    <Code className="w-5 h-5" />
                    Практичне завдання
                  </h3>
                  
                  <div className={styles.taskHeader}>
                    <h4>{fullLesson.practiceTask.title}</h4>
                    <span className={styles.difficultyBadge}>
                      {fullLesson.practiceTask.difficulty === 'beginner' ? 'Початківець' :
                       fullLesson.practiceTask.difficulty === 'intermediate' ? 'Середній' :
                       'Просунутий'}
                    </span>
                  </div>
                  
                  <p className={styles.taskDescription}>{fullLesson.practiceTask.description}</p>
                  
                  <div className={styles.taskSection}>
                    <h5>Умова завдання:</h5>
                    <p>{fullLesson.practiceTask.problemStatement}</p>
                  </div>
                  
                  {fullLesson.practiceTask.examples && fullLesson.practiceTask.examples.length > 0 && (
                    <div className={styles.taskSection}>
                      <h5>Приклади:</h5>
                      {fullLesson.practiceTask.examples.map((example, index) => (
                        <div key={index} className={styles.exampleBox}>
                          {example.input && (
                            <div className={styles.exampleInput}>
                              <strong>Вхід:</strong>
                              <pre>{example.input}</pre>
                            </div>
                          )}
                          <div className={styles.exampleOutput}>
                            <strong>Вихід:</strong>
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
                        Підказки:
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
                      <span>Ваш код</span>
                      <button
                        className={styles.solutionButton}
                        onClick={() => setShowPracticeSolution(!showPracticeSolution)}
                      >
                        {showPracticeSolution ? 'Приховати' : 'Показати'} рішення
                      </button>
                    </div>
                    <textarea
                      className={styles.codeInput}
                      placeholder="Напишіть ваш код тут..."
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
                          Виконання...
                        </>
                      ) : (
                        <>
                          <Terminal className="w-4 h-4" />
                          Запустити код
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Code Execution Results */}
                  {codeExecution.output !== null || codeExecution.error ? (
                    <div className={styles.executionResults}>
                      <h5>
                        <Terminal className="w-4 h-4" />
                        Результат виконання:
                      </h5>
                      {codeExecution.success !== false && codeExecution.output && (
                        <div className={styles.executionOutput}>
                          <strong>Вивід:</strong>
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
                          <strong>Помилка:</strong>
                          <pre>{codeExecution.error}</pre>
                        </div>
                      )}
                      {codeExecution.success === false && !codeExecution.error && codeExecution.output && (
                        <div className={styles.executionError}>
                          <strong>Помилка виконання:</strong>
                          <pre>{codeExecution.output}</pre>
                        </div>
                      )}
                      {/* Перевірка практичного завдання */}
                      {practiceChecked && fullLesson.practiceTask && (
                        <div className={practiceCompleted ? styles.practiceSuccess : styles.practiceError}>
                          {practiceCompleted ? (
                            <>
                              <CheckCircle2 className="w-5 h-5" />
                              <strong>Вітаємо! Практичне завдання виконано правильно!</strong>
                              <p>Тепер ви можете перейти до тесту.</p>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5" />
                              <strong>Практичне завдання виконано неправильно.</strong>
                              <p>Перевірте ваш код та спробуйте ще раз. Перегляньте приклади виводу та підказки.</p>
                              {outputErrors.length > 0 && (
                                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#ef4444' }}>
                                  Знайдено {outputErrors.length} помилок у виводі. Рядки з помилками виділені червоним кольором.
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
                      <h5>Приклад рішення:</h5>
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
                        Вставити код в редактор
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
                <p>Практичне завдання для цього уроку ще не додано.</p>
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
                  <strong>Тест заблоковано</strong>
                  <p>Спочатку виконайте практичне завдання правильно!</p>
                  <button
                    className={styles.ctaButton}
                    onClick={() => setActiveTab('practice')}
                    style={{ marginTop: '1rem' }}
                  >
                    Перейти до практичного завдання
                  </button>
                </div>
              </div>
            ) : fullLesson.quiz && fullLesson.quiz.questions && fullLesson.quiz.questions.length > 0 ? (
              <>
                <div className={styles.quizHeader}>
                  <h3 className={styles.sectionTitle}>
                    <Target className="w-5 h-5" />
                    Тест знань
                  </h3>
                  <p className={styles.quizInfo}>
                    {fullLesson.quiz.questions.length} питань • 
                    Мінімальний бал для проходження: 60%
                    {fullLesson.quiz.timeLimit > 0 && ` • Час: ${fullLesson.quiz.timeLimit} хв`}
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
                        className={`${styles.quizQuestion} ${
                          showAnswer ? (isCorrect ? styles.correct : styles.incorrect) : ''
                        }`}
                      >
                        <div className={styles.questionHeader}>
                          <span className={styles.questionNumber}>
                            Питання {index + 1}
                          </span>
                          {showAnswer && (
                            <span className={styles.questionResult}>
                              {isCorrect ? (
                                <><CheckCircle2 className="w-5 h-5" /> Правильно</>
                              ) : (
                                <><XCircle className="w-5 h-5" /> Неправильно</>
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
                              __html: `<strong>Пояснення:</strong> ${markdownToHtml(question.explanation)}`
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                
                <div className={styles.quizActions}>
                  {!quizSubmitted ? (
                    <button
                      className={styles.submitButton}
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < fullLesson.quiz.questions.length}
                    >
                      Завершити тест
                    </button>
                  ) : (
                    <div className={styles.quizResults}>
                      <div className={styles.scoreCard}>
                        <h4>Ваш результат</h4>
                        <div className={styles.scoreValue}>
                          {quizScore}%
                        </div>
                        <div className={styles.scoreStatus}>
                          {isQuizPassed ? (
                            <><CheckCircle2 className="w-5 h-5" /> Тест пройдено!</>
                          ) : (
                            <><XCircle className="w-5 h-5" /> Тест не пройдено</>
                          )}
                        </div>
                        {!isQuizPassed && (
                          <p className={styles.retakeInfo}>
                            Мінімальний бал: {fullLesson.quiz?.passingScore || 60}%. 
                            Спробуйте ще раз!
                          </p>
                        )}
                        {nextLesson && (
                          <Link
                            href={`/courses/${courseId}/lessons/${nextLesson.lessonId}`}
                            className={styles.nextLessonButton}
                          >
                            <ChevronRight className="w-5 h-5" />
                            Перейти до наступного уроку: {nextLesson.title}
                          </Link>
                        )}
                        {!nextLesson && (
                          <p className={styles.completionMessage}>
                            Вітаємо! Ви завершили всі уроки цього курсу!
                          </p>
                        )}
                        <button
                          className={styles.retakeButton}
                          onClick={handleRetakeQuiz}
                          style={{ marginTop: '1rem' }}
                        >
                          Пройти тест знову
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.noContent}>
                <p>Тест для цього уроку ще не додано.</p>
              </div>
            )}
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPage

