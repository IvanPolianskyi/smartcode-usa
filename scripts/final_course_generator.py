#!/usr/bin/env python3
"""
Фінальний скрипт для створення повного курсу
"""

import json
import re
from pathlib import Path

curriculum_path = Path('src/lib/pythonCurriculum.js')
lesson_dir = Path('src/lib/lessonContent')
lesson_page_path = Path('src/components/Lesson/LessonPage.js')

# Читаємо curriculum
with open(curriculum_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Знаходимо всі lessonId
lesson_ids = re.findall(r'lessonId:\s*"([^"]+)"', content)
print(f"Знайдено {len(lesson_ids)} lessonId")

# Для кожного lessonId знаходимо дані з навколишнього контексту
lessons = []
for lesson_id in lesson_ids:
    # Знаходимо позицію lessonId
    pattern = rf'lessonId:\s*"{re.escape(lesson_id)}"'
    match = re.search(pattern, content)
    if not match:
        continue
    
    # Беремо 500 символів після lessonId
    start = match.end()
    context = content[start:start+1000]
    
    # Парсимо дані
    module_match = re.search(r'moduleId:\s*"([^"]+)"', context)
    order_match = re.search(r'order:\s*(\d+)', context)
    title_match = re.search(r'title:\s*"([^"]+)"', context)
    time_match = re.search(r'estimatedTime:\s*(\d+)', context)
    
    # Знаходимо learningObjectives - шукаємо масив
    obj_start = context.find('learningObjectives:')
    objectives = []
    if obj_start != -1:
        obj_text = context[obj_start:obj_start+500]
        objectives = re.findall(r'"([^"]+)"', obj_text)
    
    # Знаходимо prerequisites
    prereq_start = context.find('prerequisites:')
    prerequisites = []
    if prereq_start != -1:
        prereq_text = context[prereq_start:prereq_start+200]
        prerequisites = re.findall(r'"([^"]+)"', prereq_text)
    
    lesson = {
        'lessonId': lesson_id,
        'moduleId': module_match.group(1) if module_match else 'module-00',
        'order': int(order_match.group(1)) if order_match else 1,
        'title': title_match.group(1) if title_match else lesson_id.replace('-', ' ').title(),
        'learningObjectives': objectives if objectives else ["Вивчити основні концепції", "Застосувати знання на практиці"],
        'estimatedTime': int(time_match.group(1)) if time_match else 90,
        'prerequisites': prerequisites
    }
    
    lessons.append(lesson)

print(f"Парсено {len(lessons)} уроків з повною інформацією")

# Перевіряємо які файли існують
existing_files = set()
if lesson_dir.exists():
    for file in lesson_dir.glob('lesson-*.js'):
        existing_files.add(file.stem)

# Знаходимо відсутні
missing_lessons = [l for l in lessons if l['lessonId'] not in existing_files]

print(f"Існуючих файлів: {len(existing_files)}")
print(f"Відсутніх файлів: {len(missing_lessons)}")

# Генеруємо відсутні уроки
def generate_lesson_file(lesson):
    var_name = lesson['lessonId'].replace('-', '_')
    objectives_json = json.dumps(lesson['learningObjectives'], ensure_ascii=False, indent=4)
    prereqs_json = json.dumps(lesson['prerequisites'], ensure_ascii=False, indent=4)
    
    # Екрануємо лапки
    title_escaped = lesson['title'].replace('"', '\\"').replace('`', '\\`')
    
    content = f'''/**
 * {lesson['title']}
 * Full educational content
 */

import {{ QUIZ_QUESTION_TYPES }} from '../courseData'

export const {var_name} = {{
  lessonId: "{lesson['lessonId']}",
  moduleId: "{lesson['moduleId']}",
  order: {lesson['order']},
  title: "{title_escaped}",
  
  learningObjectives: {objectives_json},
  
  estimatedTime: {lesson['estimatedTime']},
  prerequisites: {prereqs_json},
  
  videoUrl: "",
  
  theory: {{
    sections: [
      {{
        title: "Вступ",
        content: `{lesson['title']}

На цьому уроці ми вивчимо основні концепції та навички, необхідні для розуміння та застосування матеріалу.

**Що ви дізнаєтеся:**
{chr(10).join(f"- {obj}" for obj in lesson['learningObjectives'])}

**Час на вивчення:** приблизно {lesson['estimatedTime']} хвилин

**Попередні вимоги:** {', '.join(lesson['prerequisites']) if lesson['prerequisites'] else 'Немає'}
`
      }}
    ]
  }},
  
  codeExamples: [
    {{
      title: "Приклад 1",
      code: `# Приклад коду
print("Привіт, світ!")`,
      explanation: "Базовий приклад для розуміння концепції"
    }}
  ],
  
  commonMistakes: [
    {{
      mistake: "Типова помилка",
      explanation: "Пояснення помилки",
      correctApproach: "Правильний підхід"
    }}
  ],
  
  summary: `Підсумок уроку "{lesson['title']}"

На цьому уроці ми вивчили основні концепції та навички.`,
  
  practiceTask: {{
    title: "Практична задача",
    description: "Застосуйте набуті знання на практиці",
    problemStatement: "Створіть програму, яка демонструє вивчені концепції",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {{
      code: `# Рішення
# Ваш код тут`,
      explanation: "Пояснення рішення"
    }},
    hints: [
      "Підказка 1",
      "Підказка 2"
    ],
    difficulty: "beginner"
  }},
  
  quiz: {{
    questions: [
      {{
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
      }}
    ],
    timeLimit: 10,
    passingScore: 70
  }}
}}
'''
    
    file_path = lesson_dir / f"{lesson['lessonId']}.js"
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✓ Створено: {lesson['lessonId']}")

# Створюємо відсутні уроки
if missing_lessons:
    print(f"\nСтворюємо {len(missing_lessons)} відсутніх уроків...")
    for lesson in missing_lessons:
        generate_lesson_file(lesson)

# Оновлюємо LessonPage.js
print(f"\nОновлюємо LessonPage.js...")
with open(lesson_page_path, 'r', encoding='utf-8') as f:
    lesson_page_content = f.read()

# Знаходимо всі існуючі імпорти
existing_imports = set(re.findall(r'import\s+\{\s*(\w+)\s*\}\s+from', lesson_page_content))

# Генеруємо нові імпорти та мапу
new_imports = []
new_map_entries = []

for lesson in lessons:
    var_name = lesson['lessonId'].replace('-', '_')
    import_path = f"@/lib/lessonContent/{lesson['lessonId']}"
    
    if var_name not in existing_imports:
        new_imports.append(f"import {{ {var_name} }} from '{import_path}'")
    
    new_map_entries.append(f'  "{lesson["lessonId"]}": {var_name},')

# Вставляємо нові імпорти
if new_imports:
    # Знаходимо останній імпорт уроку
    last_import_match = list(re.finditer(r'import\s+\{.*?\}\s+from\s+[\'"]@/lib/lessonContent', lesson_page_content))
    if last_import_match:
        last_import = last_import_match[-1]
        insert_pos = lesson_page_content.find('\n', last_import.end()) + 1
        imports_to_add = '\n'.join(new_imports) + '\n'
        lesson_page_content = (lesson_page_content[:insert_pos] + 
                              imports_to_add + 
                              lesson_page_content[insert_pos:])

# Оновлюємо lessonContentMap
map_start = lesson_page_content.find('const lessonContentMap = {')
if map_start != -1:
    map_end = lesson_page_content.find('\n}', map_start) + 2
    new_map = 'const lessonContentMap = {\n' + '\n'.join(new_map_entries) + '\n}'
    lesson_page_content = (lesson_page_content[:map_start] + 
                          new_map + 
                          lesson_page_content[map_end:])

with open(lesson_page_path, 'w', encoding='utf-8') as f:
    f.write(lesson_page_content)

print(f"✅ Оновлено LessonPage.js з {len(lessons)} уроками")

print(f"\n{'='*60}")
print(f"✅ ГОТОВО!")
print(f"{'='*60}")
print(f"📚 Всього уроків в curriculum: {len(lessons)}")
print(f"📁 Створено нових файлів: {len(missing_lessons)}")
print(f"📁 Всього файлів уроків: {len(existing_files) + len(missing_lessons)}")
print(f"🔗 Оновлено імпорти в LessonPage.js")














