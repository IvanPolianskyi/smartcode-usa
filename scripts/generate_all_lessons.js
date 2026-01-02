#!/usr/bin/env node
/**
 * Скрипт для генерації всіх відсутніх уроків та оновлення імпортів
 */

const fs = require('fs');
const path = require('path');

const curriculumPath = path.join(__dirname, '../src/lib/pythonCurriculum.js');
const lessonDir = path.join(__dirname, '../src/lib/lessonContent');
const lessonPagePath = path.join(__dirname, '../src/components/Lesson/LessonPage.js');

// Читаємо curriculum
const curriculumContent = fs.readFileSync(curriculumPath, 'utf-8');

// Знаходимо всі уроки
const lessonMatches = curriculumContent.matchAll(/lessonId:\s*"([^"]+)",\s*moduleId:\s*"([^"]+)",\s*order:\s*(\d+),\s*title:\s*"([^"]+)"/g);
const lessons = [];

for (const match of lessonMatches) {
  const [, lessonId, moduleId, order, title] = match;
  const startPos = match.index + match[0].length;
  const next200 = curriculumContent.substring(startPos, startPos + 500);
  
  // Знаходимо learningObjectives
  const objMatch = next200.match(/learningObjectives:\s*\[([^\]]+)\]/);
  const learningObjectives = objMatch 
    ? objMatch[1].match(/"([^"]+)"/g).map(s => s.slice(1, -1))
    : ["Вивчити основні концепції", "Застосувати знання на практиці"];
  
  // Знаходимо estimatedTime
  const timeMatch = next200.match(/estimatedTime:\s*(\d+)/);
  const estimatedTime = timeMatch ? parseInt(timeMatch[1]) : 90;
  
  // Знаходимо prerequisites
  const prereqMatch = next200.match(/prerequisites:\s*\[([^\]]*)\]/);
  const prerequisites = prereqMatch && prereqMatch[1]
    ? prereqMatch[1].match(/"([^"]+)"/g).map(s => s.slice(1, -1))
    : [];
  
  lessons.push({
    lessonId,
    moduleId,
    order: parseInt(order),
    title,
    learningObjectives,
    estimatedTime,
    prerequisites
  });
}

// Перевіряємо які файли існують
const existingFiles = new Set();
if (fs.existsSync(lessonDir)) {
  const files = fs.readdirSync(lessonDir);
  files.forEach(file => {
    if (file.startsWith('lesson-') && file.endsWith('.js')) {
      existingFiles.add(file.replace('.js', ''));
    }
  });
}

// Знаходимо відсутні
const missingLessons = lessons.filter(l => !existingFiles.has(l.lessonId));

console.log(`Всього уроків в curriculum: ${lessons.length}`);
console.log(`Існуючих файлів: ${existingFiles.size}`);
console.log(`Відсутніх файлів: ${missingLessons.length}`);

// Генеруємо відсутні уроки
function generateLessonFile(lesson) {
  const varName = lesson.lessonId.replace(/-/g, '_');
  const objectivesJson = JSON.stringify(lesson.learningObjectives, null, 2);
  const prereqsJson = JSON.stringify(lesson.prerequisites, null, 2);
  
  const content = `/**
 * ${lesson.title}
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const ${varName} = {
  lessonId: "${lesson.lessonId}",
  moduleId: "${lesson.moduleId}",
  order: ${lesson.order},
  title: "${lesson.title}",
  
  learningObjectives: ${objectivesJson},
  
  estimatedTime: ${lesson.estimatedTime},
  prerequisites: ${prereqsJson},
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ",
        content: \`${lesson.title}

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
${lesson.learningObjectives.map(obj => `- ${obj}`).join('\n')}

**Час на вивчення:** приблизно ${lesson.estimatedTime} хвилин\`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1",
      code: \`# Приклад коду
print("Привіт, світ!")\`,
      explanation: "Базовий приклад для розуміння концепції"
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Типова помилка",
      explanation: "Пояснення помилки",
      correctApproach: "Правильний підхід"
    }
  ],
  
  summary: \`Підсумок уроку "${lesson.title}"

На цьому уроці ми вивчили основні концепції та навички.\`,
  
  practiceTask: {
    title: "Практична задача",
    description: "Застосуйте набуті знання на практиці",
    problemStatement: "Створіть програму, яка демонструє вивчені концепції",
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
      code: \`# Рішення
# Ваш код тут\`,
      explanation: "Пояснення рішення"
    },
    hints: [
      "Підказка 1",
      "Підказка 2"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Питання про основні концепції?",
        options: [
          "Варіант 1",
          "Варіант 2",
          "Варіант 3",
          "Варіант 4"
        ],
        correctAnswer: 0,
        explanation: "Пояснення правильної відповіді"
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
`;

  const filePath = path.join(lessonDir, `${lesson.lessonId}.js`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Створено: ${lesson.lessonId}`);
}

// Створюємо відсутні уроки
missingLessons.forEach(generateLessonFile);

// Оновлюємо LessonPage.js з імпортами
function updateLessonPageImports() {
  let lessonPageContent = fs.readFileSync(lessonPagePath, 'utf-8');
  
  // Знаходимо всі імпорти уроків
  const importRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@\/lib\/lessonContent\/lesson-[\d-]+['"]/g;
  const existingImports = new Set();
  let match;
  while ((match = importRegex.exec(lessonPageContent)) !== null) {
    existingImports.add(match[1]);
  }
  
  // Генеруємо нові імпорти
  const newImports = [];
  const newMapEntries = [];
  
  lessons.forEach(lesson => {
    const varName = lesson.lessonId.replace(/-/g, '_');
    const importPath = `@/lib/lessonContent/${lesson.lessonId}`;
    
    if (!existingImports.has(varName)) {
      newImports.push(`import { ${varName} } from '${importPath}'`);
    }
    
    // Додаємо до мапи
    newMapEntries.push(`  "${lesson.lessonId}": ${varName},`);
  });
  
  // Вставляємо нові імпорти після останнього існуючого імпорту
  const lastImportIndex = lessonPageContent.lastIndexOf("import {");
  const lastImportEnd = lessonPageContent.indexOf('\n', lessonPageContent.lastIndexOf("} from"));
  
  if (lastImportEnd !== -1 && newImports.length > 0) {
    const importsToAdd = newImports.join('\n') + '\n';
    lessonPageContent = lessonPageContent.slice(0, lastImportEnd + 1) + 
                       importsToAdd + 
                       lessonPageContent.slice(lastImportEnd + 1);
  }
  
  // Оновлюємо lessonContentMap
  const mapStart = lessonPageContent.indexOf('const lessonContentMap = {');
  const mapEnd = lessonPageContent.indexOf('}', mapStart) + 1;
  
  if (mapStart !== -1 && mapEnd !== -1) {
    const newMap = `const lessonContentMap = {\n${newMapEntries.join('\n')}\n}`;
    lessonPageContent = lessonPageContent.slice(0, mapStart) + 
                       newMap + 
                       lessonPageContent.slice(mapEnd);
  }
  
  fs.writeFileSync(lessonPagePath, lessonPageContent, 'utf-8');
  console.log(`Оновлено: ${lessonPagePath}`);
}

if (missingLessons.length > 0) {
  updateLessonPageImports();
  console.log(`\nГотово! Створено ${missingLessons.length} уроків та оновлено імпорти.`);
} else {
  console.log('\nВсі уроки вже існують!');
}



