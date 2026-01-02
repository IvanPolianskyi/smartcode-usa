#!/usr/bin/env python3
"""
Скрипт для генерації всіх відсутніх уроків та оновлення імпортів
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

# Знаходимо всі уроки - шукаємо блоки з lessonId
lessons = []
pattern = r'lessonId:\s*"([^"]+)",\s*moduleId:\s*"([^"]+)",\s*order:\s*(\d+),\s*title:\s*"([^"]+)"'
matches = list(re.finditer(pattern, content))

for match in matches:
    lesson_id, module_id, order, title = match.groups()
    start_pos = match.end()
    next_500 = content[start_pos:start_pos+500]
    
    # Знаходимо learningObjectives
    obj_match = re.search(r'learningObjectives:\s*\[([^\]]+)\]', next_500)
    if obj_match:
        objectives_text = obj_match.group(1)
        objectives = [o.strip().strip('"') for o in re.findall(r'"([^"]+)"', objectives_text)]
    else:
        objectives = ["Вивчити основні концепції", "Застосувати знання на практиці"]
    
    # Знаходимо estimatedTime
    time_match = re.search(r'estimatedTime:\s*(\d+)', next_500)
    estimated_time = int(time_match.group(1)) if time_match else 90
    
    # Знаходимо prerequisites
    prereq_match = re.search(r'prerequisites:\s*\[([^\]]*)\]', next_500)
    prerequisites = []
    if prereq_match and prereq_match.group(1):
        prereq_text = prereq_match.group(1)
        prerequisites = [p.strip().strip('"') for p in re.findall(r'"([^"]+)"', prereq_text)]
    
    lessons.append({
        'lessonId': lesson_id,
        'moduleId': module_id,
        'order': int(order),
        'title': title,
        'learningObjectives': objectives,
        'estimatedTime': estimated_time,
        'prerequisites': prerequisites
    })

print(f"Знайдено {len(lessons)} уроків в curriculum")

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
    objectives_json = json.dumps(lesson['learningObjectives'], ensure_ascii=False, indent=2)
    prereqs_json = json.dumps(lesson['prerequisites'], ensure_ascii=False, indent=2)
    
    content = f'''/**
 * {lesson['title']}
 * Full educational content
 */

import {{ QUIZ_QUESTION_TYPES }} from '../courseData'

export const {var_name} = {{
  lessonId: "{lesson['lessonId']}",
  moduleId: "{lesson['moduleId']}",
  order: {lesson['order']},
  title: "{lesson['title']}",
  
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

**Час на вивчення:** приблизно {lesson['estimatedTime']} хвилин`
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
    print(f"Створено: {lesson['lessonId']}")

# Створюємо відсутні уроки
for lesson in missing_lessons:
    generate_lesson_file(lesson)

# Оновлюємо LessonPage.js
if missing_lessons:
    with open(lesson_page_path, 'r', encoding='utf-8') as f:
        lesson_page_content = f.read()
    
    # Знаходимо всі існуючі імпорти
    existing_imports = set(re.findall(r'import\s+\{\s*(\w+)\s*\}\s+from', lesson_page_content))
    
    # Генеруємо нові імпорти
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
        last_import_pos = lesson_page_content.rfind("import {")
        if last_import_pos != -1:
            last_import_end = lesson_page_content.find('\n', lesson_page_content.find('}', last_import_pos))
            if last_import_end != -1:
                imports_to_add = '\n'.join(new_imports) + '\n'
                lesson_page_content = (lesson_page_content[:last_import_end + 1] + 
                                      imports_to_add + 
                                      lesson_page_content[last_import_end + 1:])
    
    # Оновлюємо lessonContentMap
    map_start = lesson_page_content.find('const lessonContentMap = {')
    if map_start != -1:
        map_end = lesson_page_content.find('}', map_start) + 1
        new_map = 'const lessonContentMap = {\n' + '\n'.join(new_map_entries) + '\n}'
        lesson_page_content = (lesson_page_content[:map_start] + 
                              new_map + 
                              lesson_page_content[map_end:])
    
    with open(lesson_page_path, 'w', encoding='utf-8') as f:
        f.write(lesson_page_content)
    print(f"\nОновлено: {lesson_page_path}")

if missing_lessons:
    print(f"\nГотово! Створено {len(missing_lessons)} уроків та оновлено імпорти.")
else:
    print("\nВсі уроки вже існують!")





