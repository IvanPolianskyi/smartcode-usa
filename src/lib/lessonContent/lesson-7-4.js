/**
 * Lesson 7-4: pathlib
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson7_4 = {
  lessonId: "lesson-7-4",
  moduleId: "module-7",
  order: 4,
  title: "pathlib",
  
  learningObjectives: [
    "Використовувати pathlib для роботи з шляхами",
    "Створювати та маніпулювати шляхами",
    "Перевіряти існування файлів",
    "Об'єднувати шляхи",
    "Розуміти переваги pathlib над os.path"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-7-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке pathlib?",
        content: `**pathlib** — сучасний модуль для роботи з шляхами (Python 3.4+).

**Переваги над os.path:**
- ✅ Об'єктно-орієнтований підхід
- ✅ Більш читабельний код
- ✅ Крос-платформенність
- ✅ Менше помилок

**Імпорт:**
\`\`\`python
from pathlib import Path
\`\`\`

**Створення Path об'єкта:**
\`\`\`python
from pathlib import Path

# Різні способи створення
path1 = Path("file.txt")
path2 = Path("folder", "subfolder", "file.txt")
path3 = Path("/absolute/path/file.txt")
\`\`\`

**Поточна директорія:**
\`\`\`python
from pathlib import Path

current = Path.cwd()  # Поточна робоча директорія
print(current)
\`\`\``
      },
      {
        title: "Основні операції",
        content: `**Перевірка існування:**
\`\`\`python
from pathlib import Path

path = Path("file.txt")

print(path.exists())    # True/False
print(path.is_file())   # Чи це файл
print(path.is_dir())    # Чи це директорія
\`\`\`

**Частини шляху:**
\`\`\`python
from pathlib import Path

path = Path("folder/subfolder/file.txt")

print(path.name)        # file.txt (ім'я файлу)
print(path.stem)        # file (ім'я без розширення)
print(path.suffix)      # .txt (розширення)
print(path.parent)      # folder/subfolder (батьківська директорія)
print(path.parts)       # ('folder', 'subfolder', 'file.txt')
\`\`\`

**Абсолютний шлях:**
\`\`\`python
from pathlib import Path

path = Path("file.txt")
abs_path = path.resolve()  # Абсолютний шлях
print(abs_path)
\`\`\`

**Об'єднання шляхів:**
\`\`\`python
from pathlib import Path

base = Path("folder")
file = base / "subfolder" / "file.txt"  # Використовуємо /
print(file)  # folder/subfolder/file.txt
\`\`\``
      },
      {
        title: "Робота з файлами",
        content: `**Читання та запис:**
\`\`\`python
from pathlib import Path

path = Path("file.txt")

# Читання
content = path.read_text(encoding="utf-8")
lines = path.read_text().splitlines()

# Запис
path.write_text("Привіт, світ!", encoding="utf-8")

# Бінарне читання/запис
data = path.read_bytes()
path.write_bytes(data)
\`\`\`

**Створення директорій:**
\`\`\`python
from pathlib import Path

# Створити одну директорію
Path("new_folder").mkdir()

# Створити дерево директорій
Path("folder/subfolder").mkdir(parents=True, exist_ok=True)
\`\`\`

**Видалення:**
\`\`\`python
from pathlib import Path

# Видалити файл
Path("file.txt").unlink()

# Видалити порожню директорію
Path("empty_folder").rmdir()

# Видалити не порожню директорію (потрібен shutil)
import shutil
shutil.rmtree("folder")
\`\`\``
      },
      {
        title: "Перебір файлів",
        content: `**Пошук файлів:**
\`\`\`python
from pathlib import Path

# Всі файли у директорії
folder = Path(".")
for file in folder.iterdir():
    print(file)

# Тільки файли
for file in folder.iterdir():
    if file.is_file():
        print(file)

# Рекурсивний пошук
for file in folder.rglob("*.txt"):  # Всі .txt файли
    print(file)

# Пошук з шаблоном
for file in folder.glob("*.py"):  # Всі .py файли
    print(file)
\`\`\`

**Фільтрація:**
\`\`\`python
from pathlib import Path

folder = Path(".")

# Тільки Python файли
py_files = list(folder.glob("*.py"))

# Файли більше 1MB
large_files = [f for f in folder.iterdir() 
               if f.is_file() and f.stat().st_size > 1024*1024]
\`\`\``
      },
      {
        title: "Порівняння з os.path",
        content: `**os.path (старий спосіб):**
\`\`\`python
import os

path = os.path.join("folder", "file.txt")
if os.path.exists(path):
    dir_name = os.path.dirname(path)
    file_name = os.path.basename(path)
\`\`\`

**pathlib (новий спосіб):**
\`\`\`python
from pathlib import Path

path = Path("folder") / "file.txt"
if path.exists():
    dir_name = path.parent
    file_name = path.name
\`\`\`

**Переваги pathlib:**
- Більш читабельний код
- Об'єктно-орієнтований підхід
- Менше помилок
- Крос-платформенність

**Коли використовувати:**
- pathlib — для нових проектів (Python 3.4+)
- os.path — для сумісності зі старим кодом`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові операції",
      code: `from pathlib import Path

# Створення шляху
path = Path("folder/file.txt")

# Частини шляху
print(f"Ім'я: {path.name}")
print(f"Розширення: {path.suffix}")
print(f"Директорія: {path.parent}")

# Перевірка
print(f"Існує: {path.exists()}")
print(f"Файл: {path.is_file()}")`,
      explanation: "Демонструє базові операції з Path."
    },
    {
      title: "Приклад 2: Об'єднання шляхів",
      code: `from pathlib import Path

# Об'єднання через /
base = Path("folder")
file = base / "subfolder" / "file.txt"
print(file)  # folder/subfolder/file.txt

# Абсолютний шлях
abs_path = file.resolve()
print(abs_path)`,
      explanation: "Показує об'єднання шляхів та отримання абсолютного шляху."
    },
    {
      title: "Приклад 3: Пошук файлів",
      code: `from pathlib import Path

folder = Path(".")

# Всі Python файли
for py_file in folder.glob("*.py"):
    print(py_file)

# Рекурсивний пошук
for txt_file in folder.rglob("*.txt"):
    print(txt_file)`,
      explanation: "Демонструє пошук файлів з використанням glob."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання рядкових операцій замість Path",
      explanation: "Конкатенація рядків для шляхів може не працювати на різних ОС.",
      correctApproach: "Використовуйте Path / для об'єднання шляхів: path1 / path2."
    },
    {
      mistake: "Забути exist_ok=True при створенні директорій",
      explanation: "mkdir() викличе помилку, якщо директорія вже існує.",
      correctApproach: "Використовуйте mkdir(exist_ok=True) для безпечного створення."
    },
    {
      mistake: "Плутанина між glob() та rglob()",
      explanation: "glob() шукає тільки в поточній директорії, rglob() рекурсивно.",
      correctApproach: "Використовуйте glob() для поточної директорії, rglob() для рекурсивного пошуку."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **pathlib** — сучасний модуль для роботи з шляхами
2. **Path** — основний клас для роботи з шляхами
3. **Створення шляхів** — Path("file.txt") або Path("folder") / "file.txt"
4. **Частини шляху** — name, stem, suffix, parent
5. **Перевірки** — exists(), is_file(), is_dir()
6. **Робота з файлами** — read_text(), write_text()
7. **Створення директорій** — mkdir(parents=True, exist_ok=True)
8. **Пошук файлів** — glob(), rglob()
9. **Переваги** — об'єктно-орієнтований, читабельний, крос-платформенний

**Важливо:**
- Використовуйте / для об'єднання шляхів
- exist_ok=True для безпечного створення
- glob() для поточної директорії, rglob() для рекурсивного

pathlib — сучасний та зручний спосіб роботи з шляхами!`,
  
  practiceTask: {
    title: "Створення утиліти для роботи з файлами",
    description: "Створіть утиліту з використанням pathlib",
    problemStatement: `Створіть утиліту для роботи з файлами з використанням pathlib:

**Функції:**
1. find_files(directory, pattern) — знаходить файли за шаблоном
   - Повертає список файлів, що відповідають pattern
   - Використовуйте glob() або rglob()

2. get_file_stats(directory) — статистика файлів
   - Кількість файлів
   - Загальний розмір
   - Найбільший файл
   - Найменший файл

3. organize_files(directory) — організація файлів
   - Створює папки за розширенням (.txt, .py, .jpg тощо)
   - Переміщує файли у відповідні папки

4. clean_empty_dirs(directory) — видалення порожніх директорій
   - Знаходить та видаляє всі порожні директорії

5. backup_files(directory, backup_dir) — резервне копіювання
   - Копіює всі файли у backup_dir
   - Зберігає структуру директорій

**Вимоги:**
- Використовуйте pathlib для всіх операцій
- Обробляйте помилки
- Створіть меню для вибору функції

**Створіть утиліту та продемонструйте роботу.**`,
    inputFormat: "Створіть утиліту з функціями та меню",
    outputFormat: `Приклад виведення:
=== Утиліта для роботи з файлами ===
1. Знайти файли
2. Статистика файлів
3. Організувати файли
4. Видалити порожні директорії
5. Резервне копіювання
0. Вихід

Виберіть дію: 2
Статистика:
- Всього файлів: 10
- Загальний розмір: 5.2 MB
- Найбільший: large_file.txt (2.1 MB)
- Найменший: small.txt (1 KB)`,
    examples: [
      {
        input: "Робота з файлами",
        output: "Утиліта працює коректно",
        explanation: "Демонстрація pathlib"
      }
    ],
    solution: {
      code: `from pathlib import Path
import shutil

class FileUtility:
    def find_files(self, directory, pattern):
        """Знаходить файли за шаблоном."""
        dir_path = Path(directory)
        if not dir_path.exists():
            return f"Помилка: директорія '{directory}' не існує!"
        
        files = list(dir_path.rglob(pattern))
        return files
    
    def get_file_stats(self, directory):
        """Повертає статистику файлів."""
        dir_path = Path(directory)
        if not dir_path.exists():
            return "Помилка: директорія не існує!"
        
        files = [f for f in dir_path.rglob("*") if f.is_file()]
        
        if not files:
            return "Файлів не знайдено!"
        
        total_size = sum(f.stat().st_size for f in files)
        largest = max(files, key=lambda f: f.stat().st_size)
        smallest = min(files, key=lambda f: f.stat().st_size)
        
        stats = f"Статистика для: {directory}\\n"
        stats += f"- Всього файлів: {len(files)}\\n"
        stats += f"- Загальний розмір: {total_size / 1024 / 1024:.2f} MB\\n"
        stats += f"- Найбільший: {largest.name} ({largest.stat().st_size / 1024 / 1024:.2f} MB)\\n"
        stats += f"- Найменший: {smallest.name} ({smallest.stat().st_size} байт)\\n"
        
        return stats
    
    def organize_files(self, directory):
        """Організує файли за розширенням."""
        dir_path = Path(directory)
        if not dir_path.exists():
            return "Помилка: директорія не існує!"
        
        files = [f for f in dir_path.iterdir() if f.is_file()]
        moved = 0
        
        for file in files:
            if file.suffix:  # Якщо є розширення
                ext = file.suffix[1:]  # Без крапки
                folder = dir_path / ext
                folder.mkdir(exist_ok=True)
                
                new_path = folder / file.name
                if not new_path.exists():
                    file.rename(new_path)
                    moved += 1
        
        return f"Організовано {moved} файлів!"
    
    def clean_empty_dirs(self, directory):
        """Видаляє порожні директорії."""
        dir_path = Path(directory)
        if not dir_path.exists():
            return "Помилка: директорія не існує!"
        
        # Знаходимо всі порожні директорії (знизу вгору)
        empty_dirs = []
        for path in sorted(dir_path.rglob("*"), reverse=True):
            if path.is_dir() and not any(path.iterdir()):
                empty_dirs.append(path)
        
        removed = 0
        for empty_dir in empty_dirs:
            try:
                empty_dir.rmdir()
                removed += 1
            except OSError:
                pass
        
        return f"Видалено {removed} порожніх директорій!"
    
    def backup_files(self, directory, backup_dir):
        """Створює резервну копію."""
        source = Path(directory)
        backup = Path(backup_dir)
        
        if not source.exists():
            return "Помилка: вихідна директорія не існує!"
        
        backup.mkdir(parents=True, exist_ok=True)
        
        files = [f for f in source.rglob("*") if f.is_file()]
        copied = 0
        
        for file in files:
            # Зберігаємо структуру
            relative = file.relative_to(source)
            dest = backup / relative
            dest.parent.mkdir(parents=True, exist_ok=True)
            
            shutil.copy2(file, dest)
            copied += 1
        
        return f"Скопійовано {copied} файлів у {backup_dir}!"

def головне_меню():
    """Головне меню утиліти."""
    utility = FileUtility()
    
    while True:
        print("\\n=== Утиліта для роботи з файлами ===")
        print("1. Знайти файли")
        print("2. Статистика файлів")
        print("3. Організувати файли")
        print("4. Видалити порожні директорії")
        print("5. Резервне копіювання")
        print("0. Вихід")
        
        вибір = input("\\nВиберіть дію: ")
        
        if вибір == "1":
            directory = input("Директорія: ")
            pattern = input("Шаблон (наприклад, *.txt): ")
            files = utility.find_files(directory, pattern)
            print(f"\\nЗнайдено {len(files)} файлів:")
            for f in files[:10]:  # Показуємо перші 10
                print(f"  {f}")
        elif вибір == "2":
            directory = input("Директорія: ")
            print(utility.get_file_stats(directory))
        elif вибір == "3":
            directory = input("Директорія: ")
            confirm = input("Організувати файли? (y/n): ")
            if confirm.lower() == 'y':
                print(utility.organize_files(directory))
        elif вибір == "4":
            directory = input("Директорія: ")
            confirm = input("Видалити порожні директорії? (y/n): ")
            if confirm.lower() == 'y':
                print(utility.clean_empty_dirs(directory))
        elif вибір == "5":
            directory = input("Вихідна директорія: ")
            backup_dir = input("Директорія для резервної копії: ")
            print(utility.backup_files(directory, backup_dir))
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір!")

if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повну утиліту з використанням pathlib."
    },
    hints: [
      "Використовуйте rglob() для рекурсивного пошуку",
      "Використовуйте stat().st_size для розміру файлу",
      "Використовуйте mkdir(exist_ok=True) для безпечного створення",
      "Використовуйте relative_to() для збереження структури"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як об'єднати шляхи в pathlib?",
        options: ["path1 + path2", "path1 / path2", "path1.join(path2)", "path1.concat(path2)"],
        correctAnswer: 1,
        explanation: "В pathlib використовується оператор / для об'єднання шляхів: path1 / path2."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе: from pathlib import Path; p=Path('file.txt'); print(p.suffix)?",
        options: [".txt", "txt", "file.txt", "file"],
        correctAnswer: 0,
        explanation: "suffix повертає розширення файлу з крапкою: .txt"
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка різниця між glob() та rglob()?",
        options: ["Немає різниці", "glob() рекурсивно, rglob() ні", "rglob() рекурсивно, glob() ні", "Обидва рекурсивні"],
        correctAnswer: 2,
        explanation: "glob() шукає тільки в поточній директорії, rglob() рекурсивно в усіх піддиректоріях."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}
