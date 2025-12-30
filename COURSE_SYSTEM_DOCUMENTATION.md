# Course System Documentation
## SmartCode Academy - Python Developer Course

---

## 1. COURSE PAGE UX DESCRIPTION

### Design Philosophy
The course page follows a **minimalistic, developer-style design** with focus on:
- **Readability**: Clear typography, proper spacing, high contrast
- **Dark-mode ready**: CSS variables for easy theme switching
- **Developer aesthetic**: Code-friendly color schemes, monospace fonts for code
- **Space for 3D visuals**: Modular layout allows future 3D elements integration

### Page Structure

#### Hero Section
- **Course Title**: Large, bold typography with gradient background
- **Value Proposition**: 1-2 sentence description
- **Level Badge**: Visual indicator (Beginner/Intermediate/Advanced)
- **Target Age**: Clear age range display
- **Progress Card** (for enrolled users): Visual progress bar with percentage
- **Course Stats**: Duration, lessons count, skills count, certificate info

#### Course Information Grid
Four-card layout displaying:
1. **Skills Section**: List of skills students will gain
2. **Learning Format**: Video, practice, tests, projects, code review
3. **Requirements**: Prerequisites for the course
4. **Certificate Info**: Details about certification

#### Course Roadmap
- **Expandable Module Cards**: Each module can be expanded to show lessons
- **Module Metadata**: Duration, lesson count
- **Learning Outcomes**: What students will learn in each module
- **Lesson List**: 
  - Visual indicators (completed, locked, available)
  - Lesson titles and estimated time
  - Project badges for project lessons
  - Unlock conditions based on prerequisites

#### CTA Section
- **For non-enrolled**: "Buy course" button
- **For enrolled**: "Continue learning" with progress percentage

### UX Decisions

1. **Progressive Disclosure**: Modules are collapsed by default, users expand to see details
2. **Visual Hierarchy**: Important information (title, stats) at the top
3. **Status Indicators**: Clear visual feedback for lesson completion and lock status
4. **Responsive Design**: Mobile-first approach with breakpoints at 768px
5. **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation

---

## 2. FULL COURSE CURRICULUM

### Course: "Python Developer: From Zero to Confident Junior"

**Total Duration**: 24 weeks, 48 lessons, 96 hours

### Module Breakdown

#### Module 1: Основи Python та середовище розробки (4 weeks, 6 lessons)
- Lesson 1-1: Вступ до Python та встановлення
- Lesson 1-2: Змінні та типи даних ⭐ (Full content available)
- Lesson 1-3: Оператори та вирази
- Lesson 1-4: Введення та виведення даних
- Lesson 1-5: Робота з рядками
- Lesson 1-6: Практичний проект - Калькулятор

#### Module 2: Умови, цикли та структури даних (5 weeks, 6 lessons)
- Lesson 2-1: Умовні оператори if/elif/else ⭐ (Full content available)
- Lesson 2-2: Цикли for та while
- Lesson 2-3: Списки (Lists)
- Lesson 2-4: Словники (Dictionaries)
- Lesson 2-5: Множини та кортежі
- Lesson 2-6: Практичний проект - Система управління завданнями

#### Module 3: Функції та модульність коду (4 weeks, 5 lessons)
- Lesson 3-1: Створення функцій
- Lesson 3-2: Область видимості та глобальні змінні
- Lesson 3-3: Аргументи: *args та **kwargs
- Lesson 3-4: Lambda функції та функції вищого порядку
- Lesson 3-5: Модулі та пакети

#### Module 4: Робота з файлами та обробка помилок (3 weeks, 5 lessons)
- Lesson 4-1: Читання та запис файлів
- Lesson 4-2: Обробка винятків (try/except)
- Lesson 4-3: Створення власних винятків
- Lesson 4-4: Робота з JSON та CSV
- Lesson 4-5: Практичний проект - Обробка даних

#### Module 5: Об'єктно-орієнтоване програмування (5 weeks, 6 lessons)
- Lesson 5-1: Класи та об'єкти
- Lesson 5-2: Методи та властивості
- Lesson 5-3: Наслідування
- Lesson 5-4: Поліморфізм та абстрактні класи
- Lesson 5-5: Спеціальні методи (магічні методи)
- Lesson 5-6: Практичний проект - Система управління бібліотекою

#### Module 6: Веб-розробка з Flask (5 weeks, 6 lessons)
- Lesson 6-1: Вступ до Flask та перший веб-додаток
- Lesson 6-2: Шаблони (Templates) та Jinja2
- Lesson 6-3: Форми та обробка даних
- Lesson 6-4: Робота з базами даних (SQLite/SQLAlchemy)
- Lesson 6-5: REST API з Flask
- Lesson 6-6: Практичний проект - Веб-додаток з API

#### Module 7: Тестування, Git та деплой (3 weeks, 4 lessons)
- Lesson 7-1: Тестування коду (pytest)
- Lesson 7-2: Версійний контроль з Git
- Lesson 7-3: Деплой проектів (Heroku/Vercel)
- Lesson 7-4: Фінальний проект - Повноцінний веб-додаток

---

## 3. LESSON PAGE STRUCTURE

### Page Layout

#### Header
- Back button to course
- Breadcrumb navigation
- Lesson title
- Meta information (time, completion status)

#### Learning Objectives Section
- Bulleted list of what students will learn
- Visual checkmarks for each objective

#### Tab Navigation
Three main tabs:
1. **Theory**: Video, theory sections, code examples, common mistakes, summary
2. **Practice**: Practice task with code editor, hints, solution
3. **Quiz**: Interactive quiz with immediate feedback

### Theory Tab Content

1. **Video Block** (placeholder for future implementation)
   - 16:9 aspect ratio
   - Play button overlay
   - Placeholder for video URL

2. **Theory Sections**
   - Multiple sections with titles
   - Rich text content with code blocks
   - Syntax highlighting for Python code
   - Proper formatting for lists and paragraphs

3. **Code Examples**
   - Multiple examples per lesson
   - Syntax-highlighted code blocks
   - Explanations below each example
   - Dark theme for code blocks

4. **Common Mistakes**
   - Red-bordered cards for mistakes
   - Explanation of why it's wrong
   - Green-bordered "Correct approach" section

5. **Summary**
   - Blue-bordered section
   - Bulleted summary of key points

### Practice Tab Content

1. **Task Header**
   - Task title
   - Difficulty badge (Beginner/Intermediate/Advanced)

2. **Task Description**
   - Clear problem statement
   - Input/output format specifications

3. **Examples**
   - Input/output examples
   - Explanations for each example

4. **Hints Section** (optional)
   - Yellow-bordered section
   - Bulleted hints

5. **Code Editor**
   - Syntax-highlighted textarea
   - "Show solution" toggle button
   - "Run code" button (placeholder)

6. **Solution Section** (hidden by default)
   - Complete solution code
   - Explanation of the solution

### Quiz Tab Content

1. **Quiz Header**
   - Number of questions
   - Passing score requirement
   - Time limit (if applicable)

2. **Questions**
   - Multiple choice questions
   - Code reading questions
   - Logic questions
   - True/False questions
   - Visual feedback (correct/incorrect)
   - Explanations after submission

3. **Results**
   - Score percentage
   - Pass/fail status
   - Retake information

---

## 4. DETAILED EXAMPLE LESSONS

### Lesson 1-2: Змінні та типи даних

**Full content available in**: `src/lib/lessonContent/lesson-1-2.js`

**Content includes**:
- 5 theory sections covering variables, data types, type checking, conversion, naming
- 3 code examples with explanations
- 4 common mistakes with corrections
- Practice task: "Калькулятор особистих даних"
- 8-question quiz covering all topics

### Lesson 2-1: Умовні оператори if/elif/else

**Full content available in**: `src/lib/lessonContent/lesson-2-1.js`

**Content includes**:
- 8 theory sections covering if/else/elif, comparison operators, logical operators, nested conditions, ternary operator
- 4 code examples
- 5 common mistakes
- Practice task: "Система оцінювання студентів"
- 10-question quiz with various question types

---

## 5. DATA STRUCTURE PROPOSAL

### File Structure

```
src/
├── lib/
│   ├── courseData.js          # Data structure definitions
│   ├── pythonCurriculum.js     # Full curriculum (modules + lessons overview)
│   └── lessonContent/
│       ├── lesson-1-2.js      # Full lesson 1-2 content
│       ├── lesson-2-1.js       # Full lesson 2-1 content
│       └── ...                 # Other lessons
├── components/
│   ├── Course/
│   │   ├── CoursePage.js
│   │   └── CoursePage.module.css
│   └── Lesson/
│       ├── LessonPage.js
│       └── LessonPage.module.css
└── app/
    └── courses/
        └── [courseId]/
            ├── page.js
            └── lessons/
                └── [lessonId]/
                    └── page.js
```

### Data Models

#### Course Structure
```javascript
{
  courseId: string,
  title: string,
  shortDescription: string,
  valueProposition: string,
  level: "Beginner" | "Intermediate" | "Advanced",
  targetAge: string,
  duration: { weeks: number, lessons: number, hours: number },
  skills: string[],
  learningFormat: {
    video: boolean,
    practice: boolean,
    tests: boolean,
    projects: boolean,
    codeReview: boolean
  },
  certificate: {
    available: boolean,
    requirements: string,
    type: string
  },
  requirements: string[],
  modules: Module[]
}
```

#### Module Structure
```javascript
{
  moduleId: string,
  courseId: string,
  order: number,
  title: string,
  description: string,
  duration: { weeks: number, lessons: number },
  learningOutcomes: string[],
  lessons: Lesson[]
}
```

#### Lesson Structure (Overview)
```javascript
{
  lessonId: string,
  moduleId: string,
  order: number,
  title: string,
  learningObjectives: string[],
  estimatedTime: number, // minutes
  prerequisites: string[], // lessonIds
  isProject: boolean,
  isFinalProject: boolean
}
```

#### Full Lesson Content
```javascript
{
  // ... overview fields above
  videoUrl: string,
  theory: {
    sections: [{
      title: string,
      content: string, // Markdown-like with code blocks
      codeExamples: CodeExample[]
    }]
  },
  codeExamples: [{
    title: string,
    code: string,
    explanation: string,
    language: "python"
  }],
  practiceTask: {
    title: string,
    description: string,
    problemStatement: string,
    inputFormat: string,
    outputFormat: string,
    examples: [{
      input: string,
      output: string,
      explanation: string
    }],
    solution: {
      code: string,
      explanation: string
    },
    hints: string[],
    difficulty: "beginner" | "intermediate" | "advanced"
  },
  quiz: {
    questions: [{
      id: string,
      type: "multiple_choice" | "code_reading" | "logic" | "true_false",
      question: string,
      code?: string, // For code_reading type
      options: string[],
      correctAnswer: number,
      explanation: string
    }],
    timeLimit: number, // minutes, 0 = no limit
    passingScore: number // percentage
  },
  commonMistakes: [{
    mistake: string,
    explanation: string,
    correctApproach: string
  }],
  summary: string
}
```

#### User Progress Structure
```javascript
{
  userId: string,
  courseId: string,
  enrolledAt: Date,
  completedLessons: string[], // lessonIds
  completedQuizzes: {
    [lessonId: string]: {
      score: number,
      attempts: number,
      passed: boolean,
      lastAttempt: Date
    }
  },
  completedPracticeTasks: string[], // lessonIds
  currentModule: number,
  currentLesson: number,
  overallProgress: number, // percentage
  certificates: string[]
}
```

### Database Schema (MongoDB)

#### Courses Collection
```javascript
{
  _id: ObjectId,
  courseId: string (unique),
  title: string,
  // ... all course fields
  createdAt: Date,
  updatedAt: Date
}
```

#### Lessons Collection
```javascript
{
  _id: ObjectId,
  lessonId: string (unique),
  moduleId: string,
  courseId: string,
  // ... all lesson fields
  createdAt: Date,
  updatedAt: Date
}
```

#### UserProgress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  courseId: string (ref: Courses),
  // ... all progress fields
  updatedAt: Date
}
```

---

## 6. PROGRESSION LOGIC

### Lesson Unlock Conditions

1. **First lesson of first module**: Always unlocked for enrolled users
2. **Subsequent lessons**: Unlocked when all prerequisites are completed
3. **Prerequisites**: Array of lessonIds that must be completed first

### Quiz Pass Threshold

- **Default**: 70% correct answers
- **Configurable**: Per-lesson setting in quiz.passingScore
- **Retakes**: Up to 3 attempts (configurable in LESSON_COMPLETION_RULES)

### Lesson Completion Rules

A lesson is considered complete when:
1. ✅ Quiz passed (score >= passing threshold)
2. ✅ Practice task completed (optional, configurable)
3. ✅ Video watched (optional, currently not enforced)

### Module Unlock Conditions

- **First module**: Always unlocked
- **Subsequent modules**: Unlocked when previous module is complete
- **Module completion**: All lessons in module must be completed

### Progress Calculation

```javascript
overallProgress = (
  (completedLessons.length * LESSON_WEIGHT) +
  (completedQuizzes.length * QUIZ_WEIGHT) +
  (completedPracticeTasks.length * PRACTICE_WEIGHT) +
  (completedProjects.length * PROJECT_WEIGHT)
) / totalCourseItems * 100
```

**Weights**:
- Lesson: 1.0
- Quiz: 0.3
- Practice: 0.5
- Project: 2.0

---

## 7. UI/UX REQUIREMENTS IMPLEMENTATION

### Minimalistic Design
- ✅ Clean layouts with ample white space
- ✅ Simple color palette (blue, purple, green accents)
- ✅ Clear typography hierarchy

### Dark-Mode Ready
- ✅ CSS variables for all colors
- ✅ Easy theme switching via CSS variable updates
- ✅ High contrast for readability

### Developer-Style Design
- ✅ Monospace fonts for code (Courier New)
- ✅ Dark code blocks (#1e293b background)
- ✅ Syntax highlighting ready
- ✅ Terminal-like aesthetics

### Readability Focus
- ✅ Large font sizes (1.125rem base)
- ✅ Line height 1.6-1.8
- ✅ Proper spacing between elements
- ✅ Clear section divisions

### Space for 3D Visuals
- ✅ Modular component structure
- ✅ Flexible grid layouts
- ✅ Reserved space in hero sections
- ✅ Easy integration points for 3D elements

---

## 8. IMPLEMENTATION STATUS

### ✅ Completed

1. **Data Structures**
   - Course data structure definitions
   - Full curriculum (7 modules, 48 lessons)
   - Lesson content structure
   - User progress structure

2. **Course Page**
   - Hero section with stats
   - Course information grid
   - Expandable roadmap
   - Progress tracking
   - CTA sections

3. **Lesson Page**
   - Tabbed interface (Theory/Practice/Quiz)
   - Theory sections with code examples
   - Practice tasks with code editor
   - Interactive quizzes
   - Common mistakes section
   - Summary section

4. **Full Lesson Content**
   - Lesson 1-2: Змінні та типи даних (complete)
   - Lesson 2-1: Умовні оператори (complete)

5. **Progression Logic**
   - Unlock conditions
   - Completion rules
   - Progress calculation

### 🔄 Future Enhancements

1. **Video Integration**
   - Video player component
   - Progress tracking
   - Playback speed controls

2. **Code Execution**
   - Online Python interpreter
   - Real-time code execution
   - Output display

3. **User Authentication**
   - Login/signup
   - Progress persistence
   - Certificate generation

4. **Database Integration**
   - MongoDB connection
   - User progress storage
   - Course content management

5. **Additional Features**
   - Discussion forums
   - Peer code review
   - Mentor feedback
   - 3D visualizations

---

## 9. USAGE INSTRUCTIONS

### Accessing the Course Page

```
/courses/python-developer-zero-to-junior
```

### Accessing a Lesson

```
/courses/python-developer-zero-to-junior/lessons/lesson-1-2
/courses/python-developer-zero-to-junior/lessons/lesson-2-1
```

### Adding New Lessons

1. Create lesson content file in `src/lib/lessonContent/`
2. Export lesson object following the structure in `lesson-1-2.js`
3. Add lesson to `lessonContentMap` in `LessonPage.js`
4. Add lesson overview to appropriate module in `pythonCurriculum.js`

### Customizing Course Data

Edit `src/lib/pythonCurriculum.js` to modify:
- Course metadata
- Module structure
- Lesson overviews

Edit individual lesson files in `src/lib/lessonContent/` to modify:
- Theory content
- Code examples
- Practice tasks
- Quiz questions

---

## 10. TECHNICAL NOTES

### Dependencies
- Next.js 15 (App Router)
- React 19
- Lucide React (icons)
- CSS Modules (styling)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS, Android)

### Performance
- Code splitting via Next.js
- Lazy loading for lesson content
- Optimized images and assets

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Screen reader friendly

---

**Documentation Version**: 1.0  
**Last Updated**: 2025-01-27  
**Author**: SmartCode Academy Development Team

