import fs from 'fs'
import path from 'path'

const STEMS = [
  'lesson-05-5', 'lesson-06-4', 'lesson-07-1', 'lesson-07-2', 'lesson-07-3', 'lesson-07-4',
  'lesson-08-1', 'lesson-08-2', 'lesson-08-3', 'lesson-08-4', 'lesson-08-5', 'lesson-08-6',
  'lesson-09-1', 'lesson-09-2', 'lesson-09-3', 'lesson-09-4',
]

const HEADER_SUB = {
  'lesson-09-2': 'Short reference lesson about BeautifulSoup',
}

const HEADER = {
  'lesson-05-5': 'Lesson 05-5: Practice: error handling in programs',
  'lesson-06-4': 'Lesson 06-4: Practice: decorator exercises',
  'lesson-07-1': 'Lesson 07-1: Introduction to generators',
  'lesson-07-2': 'Lesson 07-2: Generator expressions and yield',
  'lesson-07-3': 'Lesson 07-3: Iterators and the iteration protocol',
  'lesson-07-4': 'Lesson 07-4: Practice: generators in action',
  'lesson-08-1': 'Lesson 08-1: The collections module',
  'lesson-08-2': 'Lesson 08-2: The itertools module',
  'lesson-08-3': 'Lesson 08-3: The functools module',
  'lesson-08-4': 'Lesson 08-4: Working with JSON',
  'lesson-08-5': 'Lesson 08-5: Working with CSV and Excel',
  'lesson-08-6': 'Lesson 08-6: Practice: data processing with modules',
  'lesson-09-1': 'Lesson 09-1: HTTP requests with requests',
  'lesson-09-2': 'Lesson 09-2: Additional tools: BeautifulSoup',
  'lesson-09-3': 'Lesson 09-3: Web scraping',
  'lesson-09-4': 'Lesson 09-4: Practice: web scraping project',
}

for (const stem of STEMS) {
  const p = path.join('src/lib/lessonContent/en', `${stem}.js`)
  let c = fs.readFileSync(p, 'utf8')
  // Fix over-escaped markdown fences (\\\` -> \`)
  while (c.includes('\\\\\\`\\\\\\`\\\\\\`')) {
    c = c.replaceAll('\\\\\\`\\\\\\`\\\\\\`', '\\`\\`\\`')
  }
  // Fix header comment
  if (HEADER[stem]) {
    const sub = HEADER_SUB[stem] || 'Full educational content'
    c = c.replace(/^\/\*\*[\s\S]*?\*\//, `/**\n * ${HEADER[stem]}\n * ${sub}\n */`)
  }
  // Stragglers
  c = c.replace(/\*\*Аналогія:\*\*/g, '**Analogy:**')
  c = c.replace(/name='Александр'/g, "name='Alexander'")
  fs.writeFileSync(p, c)
  console.log('Fixed', stem)
}
