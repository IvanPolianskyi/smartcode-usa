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
  Lock,
  Loader2,
  Terminal
} from 'lucide-react'
import { updateProgress } from '@/lib/authClient'
import { pythonCurriculum } from '@/lib/pythonCurriculum'
import { webDevCurriculum } from '@/lib/webDevCurriculum'
import { lesson1_1 } from '@/lib/lessonContent/lesson-1-1'
import { lesson1_2 } from '@/lib/lessonContent/lesson-1-2'
import { lesson1_3 } from '@/lib/lessonContent/lesson-1-3'
import { lesson1_4 } from '@/lib/lessonContent/lesson-1-4'
import { lesson1_5 } from '@/lib/lessonContent/lesson-1-5'
import { lesson1_6 } from '@/lib/lessonContent/lesson-1-6'
import { lesson2_1 } from '@/lib/lessonContent/lesson-2-1'
import { lesson2_2 } from '@/lib/lessonContent/lesson-2-2'
import { lesson2_3 } from '@/lib/lessonContent/lesson-2-3'
import { lesson2_4 } from '@/lib/lessonContent/lesson-2-4'
import { lesson2_5 } from '@/lib/lessonContent/lesson-2-5'
import { lesson2_6 } from '@/lib/lessonContent/lesson-2-6'
import { lesson3_1 } from '@/lib/lessonContent/lesson-3-1'
import { lesson3_2 } from '@/lib/lessonContent/lesson-3-2'
import { lesson3_3 } from '@/lib/lessonContent/lesson-3-3'
import { lesson3_4 } from '@/lib/lessonContent/lesson-3-4'
import { lesson3_5 } from '@/lib/lessonContent/lesson-3-5'
import { lesson4_1 } from '@/lib/lessonContent/lesson-4-1'
import { lesson4_2 } from '@/lib/lessonContent/lesson-4-2'
import { lesson4_3 } from '@/lib/lessonContent/lesson-4-3'
import { lesson4_4 } from '@/lib/lessonContent/lesson-4-4'
import { lesson4_5 } from '@/lib/lessonContent/lesson-4-5'
import { lesson5_1 } from '@/lib/lessonContent/lesson-5-1'
import { lesson5_2 } from '@/lib/lessonContent/lesson-5-2'
import { lesson5_3 } from '@/lib/lessonContent/lesson-5-3'
import { lesson5_4 } from '@/lib/lessonContent/lesson-5-4'
import { lesson5_5 } from '@/lib/lessonContent/lesson-5-5'
import { lesson5_6 } from '@/lib/lessonContent/lesson-5-6'
import { lesson6_1 } from '@/lib/lessonContent/lesson-6-1'
import { lesson6_2 } from '@/lib/lessonContent/lesson-6-2'
import { lesson6_3 } from '@/lib/lessonContent/lesson-6-3'
import { lesson6_4 } from '@/lib/lessonContent/lesson-6-4'
import { lesson6_5 } from '@/lib/lessonContent/lesson-6-5'
import { lesson6_6 } from '@/lib/lessonContent/lesson-6-6'
import { lesson7_1 } from '@/lib/lessonContent/lesson-7-1'
import { lesson7_2 } from '@/lib/lessonContent/lesson-7-2'
import { lesson7_3 } from '@/lib/lessonContent/lesson-7-3'
import { lesson7_4 } from '@/lib/lessonContent/lesson-7-4'
import styles from './LessonPage.module.css'

// Map lesson IDs to content
const lessonContentMap = {
  "lesson-1-1": lesson1_1,
  "lesson-1-2": lesson1_2,
  "lesson-1-3": lesson1_3,
  "lesson-1-4": lesson1_4,
  "lesson-1-5": lesson1_5,
  "lesson-1-6": lesson1_6,
  "lesson-2-1": lesson2_1,
  "lesson-2-2": lesson2_2,
  "lesson-2-3": lesson2_3,
  "lesson-2-4": lesson2_4,
  "lesson-2-5": lesson2_5,
  "lesson-2-6": lesson2_6,
  "lesson-3-1": lesson3_1,
  "lesson-3-2": lesson3_2,
  "lesson-3-3": lesson3_3,
  "lesson-3-4": lesson3_4,
  "lesson-3-5": lesson3_5,
  "lesson-4-1": lesson4_1,
  "lesson-4-2": lesson4_2,
  "lesson-4-3": lesson4_3,
  "lesson-4-4": lesson4_4,
  "lesson-4-5": lesson4_5,
  "lesson-5-1": lesson5_1,
  "lesson-5-2": lesson5_2,
  "lesson-5-3": lesson5_3,
  "lesson-5-4": lesson5_4,
  "lesson-5-5": lesson5_5,
  "lesson-5-6": lesson5_6,
  "lesson-6-1": lesson6_1,
  "lesson-6-2": lesson6_2,
  "lesson-6-3": lesson6_3,
  "lesson-6-4": lesson6_4,
  "lesson-6-5": lesson6_5,
  "lesson-6-6": lesson6_6,
  "lesson-7-1": lesson7_1,
  "lesson-7-2": lesson7_2,
  "lesson-7-3": lesson7_3,
  "lesson-7-4": lesson7_4
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
  
  // Нормалізуємо відступи - видаляємо зайві порожні рядки (більше 2 підряд)
  html = html.replace(/\n{3,}/g, '\n\n')
  
  // Спочатку розекрановуємо backticks (замінюємо \`\`\` на ```)
  html = html.replace(/\\`\\`\\`/g, '```')
  // Також розекрановуємо одинарні backticks для inline коду
  html = html.replace(/\\`/g, '`')
  
  // Зберігаємо код блоки перед обробкою (підтримуємо різні мови)
  const codeBlockPlaceholders = []
  // Обробляємо код блоки з мовою: ```python, ```bash, ```javascript тощо
  // Спочатку пробуємо знайти код блоки з мовою
  html = html.replace(/([ \t]*)```(\w+)\s*\n([\s\S]*?)```/g, (match, indent, lang, code) => {
    const placeholder = `__CODEBLOCK${codeBlockPlaceholders.length}__`
    const language = lang.trim()
    const codeContent = code.trim()
    if (codeContent) {
      codeBlockPlaceholders.push({
        placeholder,
        html: `<pre class="code-block"><code class="language-${language}">${escapeHtml(codeContent)}</code></pre>`
      })
      // Повертаємо плейсхолдер на новому рядку, щоб він не обгортався в <p>
      return '\n' + placeholder + '\n'
    }
    return match // Якщо код порожній, залишаємо як є
  })
  // Потім знаходимо код блоки без мови
  html = html.replace(/([ \t]*)```\s*\n([\s\S]*?)```/g, (match, indent, code) => {
    const placeholder = `__CODEBLOCK${codeBlockPlaceholders.length}__`
    const codeContent = code.trim()
    if (codeContent) {
      codeBlockPlaceholders.push({
        placeholder,
        html: `<pre class="code-block"><code class="language-text">${escapeHtml(codeContent)}</code></pre>`
      })
      // Повертаємо плейсхолдер на новому рядку, щоб він не обгортався в <p>
      return '\n' + placeholder + '\n'
    }
    return match // Якщо код порожній, залишаємо як є
  })
  
  // Обробляємо inline код (тільки якщо не всередині код блоку)
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>')
  
  // Обробляємо жирний текст **текст** (спочатку обробляємо **, щоб не конфліктувало з *)
  // Використовуємо більш надійний regex
  html = html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>')
  
  // Обробляємо курсив *текст* (тільки якщо не частина **)
  html = html.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
  html = html.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>')
  
  // Обробляємо нумеровані списки та марковані списки
  const lines = html.split('\n')
  let inOrderedList = false
  let inUnorderedList = false
  let result = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/)
    const unorderedMatch = line.match(/^[-*+]\s+(.+)$/)
    
    // Перевіряємо, чи це плейсхолдер код блоку - не обгортаємо його в <p>
    const isCodeBlockPlaceholder = /__CODEBLOCK\d+__/.test(line)
    
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
    } else if (unorderedMatch) {
      if (!inUnorderedList) {
        if (inOrderedList) {
          result.push('</ol>')
          inOrderedList = false
        }
        result.push('<ul>')
        inUnorderedList = true
      }
      result.push(`<li>${unorderedMatch[1]}</li>`)
    } else if (isCodeBlockPlaceholder) {
      // Закриваємо відкриті списки перед код блоком
      if (inOrderedList) {
        result.push('</ol>')
        inOrderedList = false
      }
      if (inUnorderedList) {
        result.push('</ul>')
        inUnorderedList = false
      }
      // Додаємо плейсхолдер без обгортання в <p>, прибираємо зайві пробіли
      const cleanPlaceholder = line.trim()
      result.push(cleanPlaceholder)
    } else {
      if (inOrderedList) {
        result.push('</ol>')
        inOrderedList = false
      }
      if (inUnorderedList) {
        result.push('</ul>')
        inUnorderedList = false
      }
      // Пропускаємо порожні рядки (вони вже нормалізовані)
      if (line.trim()) {
        result.push(`<p>${line}</p>`)
      } else {
        result.push('<br />')
      }
    }
  }
  
  // Закриваємо відкриті списки
  if (inOrderedList) result.push('</ol>')
  if (inUnorderedList) result.push('</ul>')
  
  html = result.join('')
  
  // Відновлюємо код блоки (важливо робити це після всіх інших обробок)
  codeBlockPlaceholders.forEach(({ placeholder, html: blockHtml }) => {
    // Використовуємо глобальну заміну для всіх входжень
    // Замінюємо плейсхолдер навіть якщо він обгорнутий в <p> теги або має пробіли навколо
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Знаходимо плейсхолдер в будь-якому контексті (в <p>, з пробілами, на окремих рядках)
    // Спочатку пробуємо знайти в <p> тегах
    let regex = new RegExp(`<p>\\s*${escapedPlaceholder}\\s*</p>`, 'g')
    html = html.replace(regex, blockHtml)
    // Потім знаходимо без <p> тегів (може бути з пробілами)
    regex = new RegExp(`\\s*${escapedPlaceholder}\\s*`, 'g')
    html = html.replace(regex, blockHtml)
    // Нарешті, знаходимо точний збіг
    regex = new RegExp(escapedPlaceholder, 'g')
    html = html.replace(regex, blockHtml)
  })
  
  // Видаляємо <p> теги навколо код блоків (якщо вони там опинилися)
  html = html.replace(/<p>\s*(<pre class="code-block">[\s\S]*?<\/pre>)\s*<\/p>/g, '$1')
  html = html.replace(/<p>\s*(<pre[\s\S]*?<\/pre>)\s*<\/p>/g, '$1')
  
  // Обробляємо одинарні переноси всередині параграфів
  html = html.replace(/<p>([^<]+)<br \/>([^<]+)<\/p>/g, '<p>$1<br />$2</p>')
  
  // Очищаємо порожні параграфи та зайві br
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p><br \/><\/p>/g, '')
  html = html.replace(/(<br \/>)+/g, '<br />')
  
  // Видаляємо залишки плейсхолдерів (на випадок якщо щось пішло не так)
  html = html.replace(/__CODEBLOCK\d+__/g, '')
  
  // Видаляємо зайві порожні рядки навколо код блоків
  html = html.replace(/\n\s*(<pre class="code-block">)/g, '\n$1')
  html = html.replace(/(<\/pre>)\s*\n/g, '$1\n')
  
  return html
}

const LessonPage = ({ lessonId, courseId = "python-developer-zero-to-junior", userProgress = null }) => {
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
  
  const isEnrolled = userProgress !== null
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
  }, [lessonId])
  
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
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    
    const score = Math.round((correct / fullLesson.quiz.questions.length) * 100)
    setQuizScore(score)
    setQuizSubmitted(true)
    
    // Save quiz result and complete lesson if passed
    if (isEnrolled && score >= 60) {
      setIsSaving(true)
      try {
        await updateProgress(courseId, {
          action: 'completeQuiz',
          lessonId,
          quizScore: score
        })
        
        // Also mark lesson as completed
        await updateProgress(courseId, {
          action: 'completeLesson',
          lessonId
        })
        
        // Refresh the page to update progress
        router.refresh()
      } catch (error) {
        console.error('Error saving progress:', error)
      } finally {
        setIsSaving(false)
      }
    }
  }
  
  const handleQuizAnswer = (questionId, answerIndex) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }
  
  const isQuizPassed = quizScore !== null && quizScore >= (fullLesson.quiz?.passingScore || 60)

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

    setCodeExecution({
      isRunning: true,
      output: null,
      error: null,
      success: null
    })

    try {
      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: userCode })
      })

      const data = await response.json()

      if (response.ok) {
        setCodeExecution({
          isRunning: false,
          output: data.output || '',
          error: data.errorOutput || null,
          success: data.success
        })
      } else {
        setCodeExecution({
          isRunning: false,
          output: data.output || '',
          error: data.error || data.errorOutput || 'Помилка виконання коду',
          success: false
        })
      }
    } catch (error) {
      console.error('Error executing code:', error)
      setCodeExecution({
        isRunning: false,
        output: null,
        error: 'Помилка підключення до сервера. Спробуйте ще раз.',
        success: false
      })
    }
  }
  
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link 
          href={`/courses/${courseId}`}
          className={styles.backButton}
        >
          <ArrowLeft className="w-5 h-5" />
          До курсу
        </Link>
        
        <div className={styles.headerInfo}>
          <div className={styles.breadcrumb}>
            <Link href="/">Головна</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/courses/${courseId}`}>Курс</Link>
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
          className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <Target className="w-4 h-4" />
          Тест
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
                          <div className={styles.exampleInput}>
                            <strong>Вхід:</strong>
                            <pre>{example.input}</pre>
                          </div>
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
                          <pre>{codeExecution.output}</pre>
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
                    </div>
                  ) : null}
                  
                  {showPracticeSolution && fullLesson.practiceTask.solution && (
                    <div className={styles.solutionSection}>
                      <h5>Приклад рішення:</h5>
                      <pre className={styles.codeBlock}>
                        <code>{fullLesson.practiceTask.solution.code}</code>
                      </pre>
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
            {fullLesson.quiz && fullLesson.quiz.questions && fullLesson.quiz.questions.length > 0 ? (
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
                    const isCorrect = userAnswer === question.correctAnswer
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
                        
                        <p className={styles.questionText}>{question.question}</p>
                        
                        {question.type === 'code_reading' && question.code && (
                          <pre className={styles.questionCode}>
                            <code>{question.code}</code>
                          </pre>
                        )}
                        
                        <div className={styles.questionOptions}>
                          {question.options.map((option, optionIndex) => {
                            const isSelected = userAnswer === optionIndex
                            const isCorrectAnswer = optionIndex === question.correctAnswer
                            
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
                                <span className={styles.optionText}>{option}</span>
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
                          <div className={styles.questionExplanation}>
                            <strong>Пояснення:</strong> {question.explanation}
                          </div>
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
                            Мінімальний бал: 60%. 
                            Спробуйте ще раз!
                          </p>
                        )}
                        {isQuizPassed && nextLesson && (
                          <Link
                            href={`/courses/${courseId}/lessons/${nextLesson.lessonId}`}
                            className={styles.nextLessonButton}
                          >
                            <ChevronRight className="w-5 h-5" />
                            Перейти до наступного уроку: {nextLesson.title}
                          </Link>
                        )}
                        {isQuizPassed && !nextLesson && (
                          <p className={styles.completionMessage}>
                            Вітаємо! Ви завершили всі уроки цього курсу!
                          </p>
                        )}
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
  )
}

export default LessonPage

