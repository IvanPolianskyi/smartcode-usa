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
  title: "Complete Python Course",
  shortDescription:
    "A complete Python programming course from the basics to a confident junior level",
  valueProposition:
    "Learn to build real Python projects and gain the skills you need to start a career in IT.",

  // Course metadata
  level: "Beginner",
  targetAge: "13-17",
  duration: {
    weeks: 41,
    lessons: 96,
    hours: 192
  },

  // Skills students will gain
  skills: [
    "Python programming fundamentals",
    "Working with data and files",
    "Object-oriented programming",
    "Working with databases",
    "Web development with Flask",
    "Code testing",
    "Git version control",
    "REST API development",
    "Deploying projects"
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
    requirements: "Complete all modules and the final project",
    type: "International SmartCode Academy certificate"
  },

  // Requirements
  requirements: [
    "Basic English",
    "A computer with internet access",
    "Motivation and readiness to learn"
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

