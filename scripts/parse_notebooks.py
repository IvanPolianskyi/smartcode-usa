#!/usr/bin/env python3
"""
Скрипт для парсингу .ipynb файлів з Complete Python 3 Bootcamp
та створення файлів уроків у форматі проекту
"""

import json
import os
import re
from pathlib import Path
from typing import List, Dict, Tuple

# Мапінг модулів з репозиторію на наші lesson IDs
# Формат: (filename, lesson_id, order_in_lesson)
MODULE_MAPPING = {
    "00-Python Object and Data Structure Basics": [
        ("01-Numbers.ipynb", "lesson-00-2", 1),
        ("01-Variable Assignment.ipynb", "lesson-00-2", 2),
        ("02-Strings.ipynb", "lesson-00-6", 1),
        ("03-Print Formatting with Strings.ipynb", "lesson-00-6", 2),
        ("04-Lists.ipynb", "lesson-00-3", 1),
        ("05-Dictionaries.ipynb", "lesson-00-4", 1),
        ("06-Tuples.ipynb", "lesson-00-5", 1),
        ("07-Sets and Booleans.ipynb", "lesson-00-5", 2),
        ("08-Files.ipynb", "lesson-00-7", 1),
    ],
    "01-Python Comparison Operators": [
        ("01-Comparison Operators.ipynb", "lesson-01-1", 1),
        ("02-Chained Comparison Operators.ipynb", "lesson-01-1", 2),
    ],
    "02-Python Statements": [
        ("01-Introduction to Python Statements.ipynb", "lesson-02-1", 0),
        ("02-if, elif, and else Statements.ipynb", "lesson-02-1", 1),
        ("03-for Loops.ipynb", "lesson-02-3", 1),
        ("04-while Loops.ipynb", "lesson-02-2", 1),
        ("05-Useful-Operators.ipynb", "lesson-02-4", 1),
        ("06-List Comprehensions.ipynb", "lesson-02-6", 1),
    ],
    "03-Methods and Functions": [
        ("01-Methods.ipynb", "lesson-03-5", 1),
        ("02-Functions.ipynb", "lesson-03-1", 1),
        ("05-Lambda-Expressions-Map-and-Filter.ipynb", "lesson-03-6", 1),
        ("06-Nested Statements and Scope.ipynb", "lesson-03-7", 1),
        ("07-args and kwargs.ipynb", "lesson-03-4", 1),
    ],
    "05-Object Oriented Programming": [
        ("01-Object Oriented Programming.ipynb", "lesson-05-1", 1),
        ("04-OOP Challenge.ipynb", "lesson-05-10", 1),
    ],
    "06-Modules and Packages": [
        ("Useful_Info_Notebook.ipynb", "lesson-06-1", 1),
    ],
    "07-Errors and Exception Handling": [
        ("01-Errors and Exceptions Handling.ipynb", "lesson-07-1", 1),
    ],
    "10-Python Decorators": [
        ("01-Decorators.ipynb", "lesson-10-1", 1),
    ],
    "11-Python Generators": [
        ("01-Iterators and Generators.ipynb", "lesson-11-1", 1),
    ],
    "12-Advanced Python Modules": [
        ("00-Collections-Module.ipynb", "lesson-12-1", 1),
        ("01-Opening-and-Reading-Files-Folders.ipynb", "lesson-12-4", 1),
        ("02-Datetime-Module.ipynb", "lesson-12-2", 1),
        ("03-Math-and-Random-Module.ipynb", "lesson-12-3", 1),
    ],
    "13-Web-Scraping": [
        ("00-Guide-to-Web-Scraping.ipynb", "lesson-13-1", 1),
        ("01-Web-Scraping-Exercises.ipynb", "lesson-13-2", 1),
    ],
    "14-Working-with-Images": [
        ("00-Overview-of-Working-with-Images.ipynb", "lesson-14-1", 1),
        ("01-Image-Exercise.ipynb", "lesson-14-2", 1),
    ],
    "15-PDFs-and-Spreadsheets": [
        ("00-Working-with-CSV-Files.ipynb", "lesson-15-3", 1),
        ("01-Working-with-PDFs.ipynb", "lesson-15-1", 1),
    ],
    "16-Emailing-with-Python": [
        ("00-Overview-of-Sending-Emails.ipynb", "lesson-16-1", 1),
        ("01-Overview-of-Received-Emails.ipynb", "lesson-16-2", 1),
    ],
    "17-Advanced Python Objects and Data Structures": [
        ("01-Advanced Numbers.ipynb", "lesson-17-4", 1),
        ("02-Advanced Strings.ipynb", "lesson-17-4", 2),
        ("03-Advanced Sets.ipynb", "lesson-17-4", 3),
        ("04-Advanced Dictionaries.ipynb", "lesson-17-4", 4),
        ("05-Advanced Lists.ipynb", "lesson-17-4", 5),
        ("08-BONUS - With Statement Context Managers.ipynb", "lesson-17-1", 1),
    ],
    "19-Bonus Material - Introduction to GUIs": [
        ("01-Interact.ipynb", "lesson-19-1", 1),
        ("02-Widget Basics.ipynb", "lesson-19-3", 1),
    ],
}

def read_notebook(filepath: str) -> Dict:
    """Читає .ipynb файл"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def clean_markdown(text: str) -> str:
    """Очищає markdown текст від зайвих символів"""
    # Видаляємо HTML теги
    text = re.sub(r'<[^>]+>', '', text)
    # Видаляємо зайві пробіли
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def parse_notebook(nb: Dict) -> Tuple[List[Dict], List[Dict]]:
    """Парсить notebook на секції та приклади коду"""
    sections = []
    code_examples = []
    current_section = None
    
    for cell in nb['cells']:
        if cell['cell_type'] == 'markdown':
            source = ''.join(cell['source'])
            source = clean_markdown(source)
            
            # Пропускаємо порожні комірки та логотипи
            if not source.strip() or 'Pierian_Data_Logo' in source or 'Copyright' in source:
                continue
            
            # Перевіряємо чи це заголовок
            lines = source.split('\n')
            first_line = lines[0].strip()
            
            if first_line.startswith('#'):
                # Зберігаємо попередню секцію
                if current_section and current_section['content'].strip():
                    sections.append(current_section)
                
                # Визначаємо рівень заголовка
                level = len(first_line) - len(first_line.lstrip('#'))
                title = first_line.lstrip('#').strip()
                
                # Видаляємо зайві символи
                title = re.sub(r'^[#\s]+', '', title)
                title = title.strip()
                
                if title:
                    content = '\n'.join(lines[1:]).strip()
                    current_section = {'title': title, 'content': content}
            else:
                # Додаємо до поточної секції
                if current_section:
                    if current_section['content']:
                        current_section['content'] += '\n\n' + source
                    else:
                        current_section['content'] = source
                else:
                    # Створюємо секцію без заголовка
                    current_section = {'title': 'Вступ', 'content': source}
                    
        elif cell['cell_type'] == 'code':
            source = ''.join(cell['source'])
            if source.strip() and not source.strip().startswith('%'):
                # Видаляємо magic commands
                code = re.sub(r'^%\w+.*\n', '', source, flags=re.MULTILINE)
                if code.strip():
                    # Шукаємо коментар для назви
                    first_line = code.split('\n')[0].strip()
                    if first_line.startswith('#'):
                        title = first_line.lstrip('#').strip()
                    else:
                        title = 'Приклад коду'
                    
                    code_examples.append({
                        'code': code.strip(),
                        'title': title
                    })
    
    # Додаємо останню секцію
    if current_section and current_section['content'].strip():
        sections.append(current_section)
    
    return sections, code_examples

def generate_lesson_file(lesson_id: str, module_id: str, order: int, title: str,
                        sections: List[Dict], code_examples: List[Dict],
                        output_dir: str):
    """Генерує файл уроку"""
    
    # Створюємо базовий шаблон
    template = f'''/**
 * {title}
 * Full educational content
 */

import {{ QUIZ_QUESTION_TYPES }} from '../courseData'

export const {lesson_id.replace('-', '_')} = {{
  lessonId: "{lesson_id}",
  moduleId: "{module_id}",
  order: {order},
  title: "{title}",
  
  learningObjectives: [
    "Вивчити основні концепції",
    "Застосувати знання на практиці",
    "Розв'язати практичні задачі"
  ],
  
  estimatedTime: 90,
  prerequisites: [],
  
  videoUrl: "",
  
  theory: {{
    sections: [
'''
    
    # Додаємо секції
    for i, section in enumerate(sections):
        title_js = section['title'].replace('"', '\\"').replace('\n', ' ')
        content_js = section['content'].replace('`', '\\`').replace('${', '\\${')
        content_js = content_js.replace('"', '\\"')
        
        template += f'''      {{
        title: "{title_js}",
        content: `{content_js}`
      }}{',' if i < len(sections) - 1 else ''}
'''
    
    template += '''    ]
  },
  
  codeExamples: [
'''
    
    # Додаємо приклади коду
    for i, example in enumerate(code_examples[:10]):  # Обмежуємо до 10 прикладів
        title_js = example['title'].replace('"', '\\"')
        code_js = example['code'].replace('`', '\\`').replace('${', '\\${')
        code_js = code_js.replace('\\', '\\\\').replace('"', '\\"')
        
        template += f'''    {{
      title: "{title_js}",
      code: `{code_js}`,
      explanation: "Приклад коду з курсу"
    }}{',' if i < min(len(code_examples), 10) - 1 else ''}
'''
    
    template += '''  ],
  
  commonMistakes: [],
  
  summary: "Підсумок уроку",
  
  practiceTask: {
    title: "Практична задача",
    description: "Опишіть задачу",
    problemStatement: "Умова задачі",
    inputFormat: "",
    outputFormat: "",
    examples: [],
    solution: {
      code: "",
      explanation: ""
    },
    hints: [],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [],
    timeLimit: 10,
    passingScore: 70
  }
}
'''
    
    # Зберігаємо файл
    output_path = Path(output_dir) / f"{lesson_id}.js"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(template)
    
    print(f"Створено: {output_path}")

def main():
    """Головна функція"""
    repo_path = Path('/tmp/Complete-Python-3-Bootcamp')
    output_dir = Path('/home/boss/programming/smartcodeacademy/src/lib/lessonContent')
    
    # Створюємо директорію якщо не існує
    output_dir.mkdir(parents=True, exist_ok=True)
    
    processed = 0
    lesson_data = {}  # Зберігаємо дані для кожного уроку
    
    # Обробляємо кожен модуль
    for module_dir, file_list in MODULE_MAPPING.items():
        module_path = repo_path / module_dir
        
        if not module_path.exists():
            print(f"Пропущено: {module_dir} (не знайдено)")
            continue
        
        for filename, lesson_id, order_in_lesson in file_list:
            filepath = module_path / filename
            
            if not filepath.exists():
                print(f"Пропущено: {filename} (не знайдено)")
                continue
            
            try:
                # Читаємо notebook
                nb = read_notebook(str(filepath))
                
                # Парсимо
                sections, code_examples = parse_notebook(nb)
                
                if not sections:
                    print(f"Попередження: {filename} не містить секцій")
                    continue
                
                # Додаємо до уроку (може бути кілька файлів на один урок)
                if lesson_id not in lesson_data:
                    lesson_data[lesson_id] = {
                        'sections': [],
                        'code_examples': [],
                        'files': []
                    }
                
                lesson_data[lesson_id]['sections'].extend(sections)
                lesson_data[lesson_id]['code_examples'].extend(code_examples)
                lesson_data[lesson_id]['files'].append(filename)
                
                processed += 1
                print(f"Оброблено: {filename} -> {lesson_id} ({len(sections)} секцій, {len(code_examples)} прикладів)")
                
            except Exception as e:
                print(f"Помилка при обробці {filename}: {e}")
                import traceback
                traceback.print_exc()
    
    # Генеруємо файли уроків
    print(f"\nГенеруємо файли уроків...")
    for lesson_id, data in lesson_data.items():
        try:
            # Визначаємо module_id та order з lesson_id
            parts = lesson_id.split('-')
            module_id = f"module-{parts[1]}"
            order = int(parts[2]) if len(parts) > 2 else 1
            
            # Генеруємо назву уроку з першого файлу
            first_file = data['files'][0]
            title = first_file.replace('.ipynb', '').replace('-', ' ').title()
            
            # Генеруємо файл
            generate_lesson_file(
                lesson_id, module_id, order, title,
                data['sections'], data['code_examples'], str(output_dir)
            )
            
            print(f"Створено: {lesson_id} ({len(data['sections'])} секцій, {len(data['code_examples'])} прикладів)")
            
        except Exception as e:
            print(f"Помилка при створенні {lesson_id}: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\nЗавершено! Оброблено {processed} файлів, створено {len(lesson_data)} уроків")

if __name__ == '__main__':
    main()

