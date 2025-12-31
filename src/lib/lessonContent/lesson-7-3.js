/**
 * Lesson 7-3: os та sys
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_3 = {
  lessonId: "lesson-7-3",
  moduleId: "module-7",
  order: 3,
  title: "os та sys",
  
  learningObjectives: [
    "Взаємодіяти з операційною системою",
    "Використовувати os для роботи з файлами",
    "Працювати з sys для системних параметрів",
    "Отримувати інформацію про систему",
    "Розуміти різницю між os та sys"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-7-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Модуль os",
        content: `**os** - модуль для взаємодії з операційною системою.

**Імпорт:**
\`\`\`python
import os
\`\`\`

**Основні функції:**

**1. Інформація про систему:**
\`\`\`python
import os

print(os.name)           # 'nt' (Windows) або 'posix' (Linux/Mac)
print(os.getcwd())       # Поточна робоча директорія
print(os.getenv('PATH')) # Значення змінної оточення
\`\`\`

**2. Робота з файлами та директоріями:**
\`\`\`python
import os

# Перевірка існування
print(os.path.exists("file.txt"))      # True/False
print(os.path.isfile("file.txt"))      # Чи це файл
print(os.path.isdir("folder"))        # Чи це директорія

# Створення/видалення
os.mkdir("new_folder")                 # Створити директорію
os.remove("file.txt")                  # Видалити файл
os.rmdir("empty_folder")               # Видалити порожню директорію
\`\`\`

**3. Робота з шляхами:**
\`\`\`python
import os

# Об'єднання шляхів
path = os.path.join("folder", "subfolder", "file.txt")
print(path)  # folder/subfolder/file.txt (або folder\\subfolder\\file.txt на Windows)

# Розбиття шляху
print(os.path.dirname(path))   # folder/subfolder
print(os.path.basename(path))  # file.txt
print(os.path.splitext(path))  # ('folder/subfolder/file', '.txt')
\`\`\`

**4. Список файлів:**
\`\`\`python
import os

files = os.listdir(".")  # Список файлів у поточній директорії
for file in files:
    print(file)
\`\`\``
      },
      {
        title: "Модуль sys",
        content: `**sys** - модуль для роботи з системними параметрами Python.

**Імпорт:**
\`\`\`python
import sys
\`\`\`

**Основні функції:**

**1. Аргументи командного рядка:**
\`\`\`python
import sys

# sys.argv - список аргументів командного рядка
print(sys.argv)  # ['script.py', 'arg1', 'arg2']

if len(sys.argv) > 1:
    print(f"Перший аргумент: {sys.argv[1]}")
\`\`\`

**2. Версія Python:**
\`\`\`python
import sys

print(sys.version)        # Детальна інформація про версію
print(sys.version_info)   # Кортеж з версією (major, minor, micro)
print(sys.version_info.major)  # 3
\`\`\`

**3. Шляхи модулів:**
\`\`\`python
import sys

print(sys.path)  # Список шляхів, де Python шукає модулі

# Додати шлях
sys.path.append("/custom/path")
\`\`\`

**4. Вихід з програми:**
\`\`\`python
import sys

sys.exit(0)   # Нормальний вихід
sys.exit(1)   # Вихід з помилкою
\`\`\`

**5. Стандартні потоки:**
\`\`\`python
import sys

sys.stdout.write("Виведення\\n")  # Стандартний вивід
sys.stderr.write("Помилка\\n")     # Стандартна помилка
\`\`\`
      },
      {
        title: "os.path - робота з шляхами",
        content: \`os.path - підмодуль для роботи з шляхами файлів.

**Основні функції:**
\`\`\`python
import os

# Об'єднання
path = os.path.join("folder", "file.txt")

# Розбиття
dir_name = os.path.dirname(path)      # folder
base_name = os.path.basename(path)    # file.txt
name, ext = os.path.splitext(path)    # ('folder/file', '.txt')

# Абсолютний шлях
abs_path = os.path.abspath("file.txt")

# Нормалізація шляху
normalized = os.path.normpath("folder/../file.txt")  # file.txt

# Розмір файлу
size = os.path.getsize("file.txt")  # Розмір у байтах

# Час модифікації
mtime = os.path.getmtime("file.txt")  # Timestamp
\`\`\`

**Перевірки:**
\`\`\`python
import os

print(os.path.exists("file.txt"))    # Чи існує
print(os.path.isfile("file.txt"))    # Чи це файл
print(os.path.isdir("folder"))       # Чи це директорія
print(os.path.isabs("/path"))        # Чи це абсолютний шлях
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Обхід директорії**
\`\`\`python
import os

def list_files(directory):
    """Повертає список файлів у директорії."""
    files = []
    for item in os.listdir(directory):
        path = os.path.join(directory, item)
        if os.path.isfile(path):
            files.append(item)
    return files

files = list_files(".")
print(files)
\`\`\`

**Приклад 2: Обробка аргументів командного рядка**
\`\`\`python
import sys

def main():
    if len(sys.argv) < 2:
        print("Використання: python script.py <ім'я_файлу>")
        sys.exit(1)
    
    filename = sys.argv[1]
    print(f"Обробка файлу: {filename}")

if __name__ == "__main__":
    main()
\`\`\`

**Приклад 3: Перевірка версії Python**
\`\`\`python
import sys

if sys.version_info < (3, 7):
    print("Потрібен Python 3.7 або новіший!")
    sys.exit(1)

print("Версія Python підходить!")
\`\`\`

**Приклад 4: Створення структури директорій**
\`\`\`python
import os

def create_structure(base_dir):
    """Створює структуру директорій."""
    folders = ["data", "logs", "temp"]
    for folder in folders:
        path = os.path.join(base_dir, folder)
        if not os.path.exists(path):
            os.mkdir(path)
            print(f"Створено: {path}")

create_structure(".")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Робота з os",
      code: `import os

# Поточна директорія
print(f"Поточна директорія: {os.getcwd()}")

# Список файлів
files = os.listdir(".")
print(f"Файли: {files}")

# Перевірка існування
if os.path.exists("test.txt"):
    print("Файл існує")
else:
    print("Файл не існує")`,
      explanation: "Демонструє базову роботу з os модулем."
    },
    {
      title: "Приклад 2: Робота з sys",
      code: `import sys

# Версія Python
print(f"Версія Python: {sys.version}")

# Аргументи командного рядка
print(f"Аргументи: {sys.argv}")

# Шляхи модулів
print(f"Кількість шляхів: {len(sys.path)}")`,
      explanation: "Показує використання sys модуля."
    },
    {
      title: "Приклад 3: os.path",
      code: `import os

# Об'єднання шляхів
path = os.path.join("folder", "subfolder", "file.txt")
print(f"Шлях: {path}")

# Розбиття
print(f"Директорія: {os.path.dirname(path)}")
print(f"Файл: {os.path.basename(path)}")
print(f"Розширення: {os.path.splitext(path)[1]}")`,
      explanation: "Демонструє роботу з os.path."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання os.path.join() неправильно",
      explanation: "os.path.join() приймає окремі частини шляху, не один рядок з слешами.",
      correctApproach: "Використовуйте os.path.join('folder', 'file.txt'), а не os.path.join('folder/file.txt')."
    },
    {
      mistake: "Не перевіряти існування перед операціями",
      explanation: "Спроба створити директорію, яка вже існує, або видалити неіснуючий файл викличе помилку.",
      correctApproach: "Завжди перевіряйте os.path.exists() перед операціями з файлами/директоріями."
    },
    {
      mistake: "Плутанина між os та sys",
      explanation: "os для роботи з файловою системою, sys для системних параметрів Python.",
      correctApproach: "Використовуйте os для файлів/директорій, sys для аргументів/версії/шляхів модулів."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Модуль os** - взаємодія з операційною системою
2. **os.getcwd()** - поточна директорія
3. **os.listdir()** - список файлів
4. **os.path** - робота з шляхами
5. **os.path.join()** - об'єднання шляхів
6. **os.path.exists()** - перевірка існування
7. **Модуль sys** - системні параметри Python
8. **sys.argv** - аргументи командного рядка
9. **sys.version** - версія Python
10. **sys.path** - шляхи модулів
11. **sys.exit()** - вихід з програми

**Важливо:**
- os для файлової системи
- sys для системних параметрів
- os.path для роботи з шляхами
- Завжди перевіряйте існування перед операціями

Модулі os та sys - потужні інструменти для роботи з системою!`,
  
  practiceTask: {
    title: "Створення файлового менеджера",
    description: "Створіть простий файловий менеджер з використанням os та sys",
    problemStatement: `Створіть простий файловий менеджер з наступними функціями:

**Функції:**
1. list_files(directory) - список файлів у директорії
   - Показує файли та директорії окремо
   - Показує розмір файлів

2. create_directory(name) - створення директорії
   - Перевіряє, чи не існує вже
   - Створює, якщо не існує

3. delete_file(name) - видалення файлу
   - Перевіряє існування
   - Підтверджує видалення

4. get_file_info(name) - інформація про файл
   - Розмір
   - Час модифікації
   - Тип (файл/директорія)

5. navigate(directory) - перехід у директорію
   - Змінює поточну директорію
   - Перевіряє існування

6. get_current_directory() - поточна директорія

**Головне меню:**
1. Список файлів
2. Створити директорію
3. Видалити файл
4. Інформація про файл
5. Перейти в директорію
6. Поточна директорія
0. Вихід

**Додатково:**
- Обробляйте помилки
- Використовуйте os.path для роботи з шляхами
- Форматуйте виведення

**Створіть менеджер та продемонструйте роботу.**`,
    inputFormat: "Створіть програму з меню та функціями",
    outputFormat: `Приклад виведення:
=== Файловий менеджер ===
Поточна директорія: /current/path

Файли:
- file1.txt (1024 байт)
- file2.py (2048 байт)

Директорії:
- folder1
- folder2`,
    examples: [
      {
        input: "Робота з файлами та директоріями",
        output: "Менеджер працює коректно",
        explanation: "Демонстрація os та sys модулів"
      }
    ],
    solution: {
      code: `import os
import sys
from datetime import datetime

class FileManager:
    def __init__(self):
        self.current_dir = os.getcwd()
    
    def get_current_directory(self):
        """Повертає поточну директорію."""
        return self.current_dir
    
    def list_files(self, directory=None):
        """Список файлів у директорії."""
        if directory is None:
            directory = self.current_dir
        
        if not os.path.exists(directory):
            return f"Помилка: директорія '{directory}' не існує!"
        
        if not os.path.isdir(directory):
            return f"Помилка: '{directory}' не є директорією!"
        
        files = []
        dirs = []
        
        try:
            items = os.listdir(directory)
            for item in items:
                path = os.path.join(directory, item)
                if os.path.isfile(path):
                    size = os.path.getsize(path)
                    files.append((item, size))
                elif os.path.isdir(path):
                    dirs.append(item)
        except PermissionError:
            return "Помилка: немає доступу до директорії!"
        
        result = f"Директорія: {directory}\\n\\n"
        
        if dirs:
            result += "Директорії:\\n"
            for d in sorted(dirs):
                result += f"  📁 {d}\\n"
        
        if files:
            result += "\\nФайли:\\n"
            for name, size in sorted(files):
                result += f"  📄 {name} ({size} байт)\\n"
        
        if not dirs and not files:
            result += "Директорія порожня.\\n"
        
        return result
    
    def create_directory(self, name):
        """Створює директорію."""
        path = os.path.join(self.current_dir, name)
        
        if os.path.exists(path):
            return f"Помилка: '{name}' вже існує!"
        
        try:
            os.mkdir(path)
            return f"Директорія '{name}' створена успішно!"
        except OSError as e:
            return f"Помилка при створенні: {e}"
    
    def delete_file(self, name):
        """Видаляє файл."""
        path = os.path.join(self.current_dir, name)
        
        if not os.path.exists(path):
            return f"Помилка: файл '{name}' не існує!"
        
        if os.path.isdir(path):
            return f"Помилка: '{name}' є директорією, не файлом!"
        
        try:
            os.remove(path)
            return f"Файл '{name}' видалено успішно!"
        except OSError as e:
            return f"Помилка при видаленні: {e}"
    
    def get_file_info(self, name):
        """Повертає інформацію про файл."""
        path = os.path.join(self.current_dir, name)
        
        if not os.path.exists(path):
            return f"Помилка: '{name}' не існує!"
        
        info = f"Інформація про: {name}\\n"
        info += f"Шлях: {os.path.abspath(path)}\\n"
        
        if os.path.isfile(path):
            info += "Тип: Файл\\n"
            size = os.path.getsize(path)
            info += f"Розмір: {size} байт ({size / 1024:.2f} KB)\\n"
        elif os.path.isdir(path):
            info += "Тип: Директорія\\n"
        
        mtime = os.path.getmtime(path)
        mod_time = datetime.fromtimestamp(mtime)
        info += f"Час модифікації: {mod_time.strftime('%Y-%m-%d %H:%M:%S')}\\n"
        
        return info
    
    def navigate(self, directory):
        """Переходить у директорію."""
        if not os.path.exists(directory):
            return f"Помилка: директорія '{directory}' не існує!"
        
        if not os.path.isdir(directory):
            return f"Помилка: '{directory}' не є директорією!"
        
        try:
            os.chdir(directory)
            self.current_dir = os.getcwd()
            return f"Перехід у директорію: {self.current_dir}"
        except OSError as e:
            return f"Помилка при переході: {e}"

def головне_меню():
    """Головне меню файлового менеджера."""
    manager = FileManager()
    
    while True:
        print("\\n=== Файловий менеджер ===")
        print(f"Поточна директорія: {manager.get_current_directory()}")
        print("1. Список файлів")
        print("2. Створити директорію")
        print("3. Видалити файл")
        print("4. Інформація про файл")
        print("5. Перейти в директорію")
        print("6. Поточна директорія")
        print("0. Вихід")
        
        вибір = input("\\nВиберіть дію: ")
        
        if вибір == "1":
            print(manager.list_files())
        elif вибір == "2":
            name = input("Назва директорії: ")
            print(manager.create_directory(name))
        elif вибір == "3":
            name = input("Назва файлу для видалення: ")
            confirm = input(f"Видалити '{name}'? (y/n): ")
            if confirm.lower() == 'y':
                print(manager.delete_file(name))
        elif вибір == "4":
            name = input("Назва файлу: ")
            print(manager.get_file_info(name))
        elif вибір == "5":
            directory = input("Шлях до директорії: ")
            print(manager.navigate(directory))
        elif вибір == "6":
            print(f"Поточна директорія: {manager.get_current_directory()}")
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір!")

if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повний файловий менеджер з використанням os та sys."
    },
    hints: [
      "Використовуйте os.path.join() для шляхів",
      "Перевіряйте os.path.exists() перед операціями",
      "Використовуйте os.path.isfile() та os.path.isdir() для перевірки типу",
      "Обробляйте помилки (PermissionError, OSError)"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке os.path.join()?",
        options: ["Видаляє файл", "Об'єднує шляхи", "Створює директорію", "Виводить список"],
        correctAnswer: 1,
        explanation: "os.path.join() об'єднує частини шляху в правильний формат для поточної ОС."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: import sys; print(len(sys.argv))?",
        options: ["Кількість аргументів", "Довжину першого аргументу", "Помилку", "0"],
        correctAnswer: 0,
        explanation: "sys.argv - список аргументів, len(sys.argv) повертає їх кількість."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який модуль використовувати для роботи з файловою системою?",
        options: ["sys", "os", "path", "file"],
        correctAnswer: 1,
        explanation: "os модуль використовується для роботи з файловою системою та операційною системою."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
