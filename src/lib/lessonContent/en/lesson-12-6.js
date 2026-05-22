/**
 * Lesson 12-6: Practice: Email Automation
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_12_6 = {
  lessonId: "lesson-12-6",
  moduleId: "module-12",
  order: 4,
  title: "Practice: generation of reports",
  
  learningObjectives: [
    "Create a script for generating reports",
    "Process data from different sources",
    "Generate PDF and Excel reports",
    "Create a useful tool",
    "lesson-12-5",
    "module-13",
    "13 - Bonus: Introduction to Graphical User Interfaces (GUI)",
    "Sending email messages, working with SMTP, creating HTML email"
],
  
  prerequisites: [
    "lesson-12-5",
    "module-13",
    "13 - Bonus: Introduction to Graphical User Interfaces (GUI)"
  ],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction",
        content: `Practice: generation of reports

In this lesson, we will explore the basic concepts and skills needed to understand and apply the material.

**What you will learn:**
- Create a script for generating reports
- Process data from various sources
- Generate PDF and Excel reports
- Create a useful tool
- lesson-12-5
- module-13
- 13 - Bonus: Introduction to Graphical User Interfaces (GUI)

**Prerequisites:** lesson-12-5, module-13, 13 - Bonus: Introduction to Graphical User Interfaces (GUI)`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1",
      code: `# Example code
print("Hello world!")`,
      explanation: "A basic example to understand the concept"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Typical mistake",
      explanation: "Explanation of the error",
      correctApproach: "The right approach"
    }
  ],
  
  summary: `Summary of the lesson "Practice: generating reports"

In this lesson, we learned the basic concepts and skills.`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Questions about core concepts?",
        options: [
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4"
        ],
        correctAnswer: 0,
        explanation: "Explanation of the correct answer"
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
