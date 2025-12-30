/**
 * Course Data Structure for SmartCode Academy
 * 
 * This file defines the data structure for courses, modules, lessons,
 * quizzes, and practice tasks.
 */

/**
 * Main Course Structure
 */
export const courseStructure = {
  courseId: "python-developer-zero-to-junior",
  title: "Python Developer: From Zero to Confident Junior",
  shortDescription: "Повний курс програмування на Python від основ до рівня впевненого джуніора",
  valueProposition: "Навчись створювати реальні проекти на Python та отримай навички, необхідні для початку кар'єри в IT.",
  
  // Course metadata
  level: "Beginner",
  targetAge: "13-17",
  duration: {
    weeks: 36,
    lessons: 72,
    hours: 144
  },
  
  // Skills students will gain
  skills: [
    "Основи програмування на Python",
    "Робота з даними та файлами",
    "Об'єктно-орієнтоване програмування",
    "Робота з базами даних",
    "Веб-розробка з Flask",
    "Тестування коду",
    "Версійний контроль Git",
    "Розробка REST API",
    "Деплой проектів"
  ],
  
  // Learning format
  learningFormat: {
    video: true,
    practice: true,
    tests: true,
    projects: true,
    codeReview: true
  },
  
  // Certificate info
  certificate: {
    available: true,
    requirements: "Завершення всіх модулів та фінального проекту",
    type: "Міжнародний сертифікат SmartCode Academy"
  },
  
  // Requirements
  requirements: [
    "Базові знання англійської мови",
    "Доступ до комп'ютера з інтернетом",
    "Мотивація та готовність до навчання"
  ],
  
  // Course roadmap (modules overview)
  modules: [] // Will be populated from curriculum
}

/**
 * Quiz Question Types
 */
export const QUIZ_QUESTION_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  CODE_READING: "code_reading",
  LOGIC: "logic",
  TRUE_FALSE: "true_false"
}

/**
 * Lesson Completion Rules
 */
export const LESSON_COMPLETION_RULES = {
  QUIZ_PASS_THRESHOLD: 70, // Percentage
  PRACTICE_REQUIRED: true,
  VIDEO_WATCHED: false, // Optional for now
  MAX_RETAKES: 3
}

/**
 * Module Unlock Conditions
 */
export const MODULE_UNLOCK_RULES = {
  PREVIOUS_MODULE_COMPLETE: true,
  ALL_LESSONS_COMPLETE: true,
  FINAL_QUIZ_PASSED: false // Optional module quiz
}

/**
 * Progress Calculation
 */
export const PROGRESS_CALCULATION = {
  LESSON_WEIGHT: 1,
  QUIZ_WEIGHT: 0.3,
  PRACTICE_WEIGHT: 0.5,
  PROJECT_WEIGHT: 2
}

/**
 * Data Structure for a Lesson
 */
export const lessonStructure = {
  lessonId: "",
  moduleId: "",
  order: 0,
  title: "",
  learningObjectives: [],
  videoUrl: "",
  theory: {
    sections: [
      {
        title: "",
        content: "",
        codeExamples: []
      }
    ]
  },
  codeExamples: [
    {
      title: "",
      code: "",
      explanation: "",
      language: "python"
    }
  ],
  practiceTask: {
    title: "",
    description: "",
    problemStatement: "",
    inputFormat: "",
    outputFormat: "",
    examples: [
      {
        input: "",
        output: "",
        explanation: ""
      }
    ],
    solution: {
      code: "",
      explanation: ""
    },
    hints: [],
    difficulty: "beginner" // beginner, intermediate, advanced
  },
  quiz: {
    questions: [
      {
        id: "",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "",
        options: [],
        correctAnswer: 0,
        explanation: ""
      }
    ],
    timeLimit: 0, // minutes, 0 = no limit
    passingScore: LESSON_COMPLETION_RULES.QUIZ_PASS_THRESHOLD
  },
  commonMistakes: [
    {
      mistake: "",
      explanation: "",
      correctApproach: ""
    }
  ],
  summary: "",
  estimatedTime: 0, // minutes
  prerequisites: [] // lessonIds
}

/**
 * Data Structure for a Module
 */
export const moduleStructure = {
  moduleId: "",
  courseId: "",
  order: 0,
  title: "",
  description: "",
  duration: {
    weeks: 0,
    lessons: 0
  },
  lessons: [], // Array of lessonIds
  learningOutcomes: [],
  finalProject: null // Optional project for module
}

/**
 * User Progress Structure
 */
export const userProgressStructure = {
  userId: "",
  courseId: "",
  enrolledAt: "",
  completedLessons: [],
  completedQuizzes: {
    // lessonId: { score: 0, attempts: 0, passed: false, lastAttempt: "" }
  },
  completedPracticeTasks: [],
  currentModule: 0,
  currentLesson: 0,
  overallProgress: 0, // percentage
  certificates: []
}

