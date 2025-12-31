/**
 * Lesson 5-2: Контекстний менеджер with
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson5_2 = {
  lessonId: "lesson-5-2",
  moduleId: "module-5",
  order: 2,
  title: "Контекстний менеджер with",
  
  learningObjectives: [
    "Використовувати контекстний менеджер with",
    "Розуміти переваги with",
    "Автоматично закривати файли",
    "Уникати витоку ресурсів",
    "Розуміти принцип роботи контекстних менеджерів"
  ],
  
  estimatedTime: 60,
  prerequisites: ["lesson-5-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Проблема з close()",
        content: `**Проблема:** Легко забути закрити файл або закрити його не завжди.

**Приклади проблем:**
\`\`\`python
# Проблема 1: Забули close()
file = open("data.txt", "r")
content = file.read()
# Забули file.close() - файл залишився відкритим!

# Проблема 2: Помилка перед close()
file = open("data.txt", "r")
content = file.read()
result = 10 / 0  # Помилка! close() не викличеться
file.close()  # Цей рядок не виконається
\`\`\`

**Наслідки:**
- Файл залишається відкритим
- Дані можуть не зберегтися
- Файл може бути заблокований
- Витрата ресурсів пам'яті

**Рішення:** Контекстний менеджер \`with\`!`
      },
      {
        title: "Що таке контекстний менеджер?",
        content: `**Контекстний менеджер** — об'єкт, який автоматично виконує дії при вході та виході з блоку коду.

**Синтаксис:**
\`\`\`python
with open("файл.txt", "режим") as file:
    # Робота з файлом
    content = file.read()
# Тут файл автоматично закриється!
\`\`\`

**Як це працює:**
1. Відкриває файл
2. Виконує код всередині блоку
3. **Автоматично закриває файл** (навіть якщо виникла помилка!)

**Переваги:**
- ✅ Автоматичне закриття файлу
- ✅ Працює навіть при помилках
- ✅ Чистіший код
- ✅ Менше помилок`
      },
      {
        title: "Базове використання with",
        content: `**Приклад 1: Читання файлу**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закрито!

# Спробувати прочитати після блоку - помилка!
# content = file.read()  # ValueError: I/O operation on closed file
\`\`\`

**Приклад 2: Запис у файл**
\`\`\`python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок")
# Файл автоматично закрито, дані збережено!
\`\`\`

**Приклад 3: Обробка помилок**
\`\`\`python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        result = 10 / 0  # Помилка!
        # Але файл все одно закриється!
except ZeroDivisionError:
    print("Помилка обчислення")
# Файл гарантовано закрито, навіть при помилці!
\`\`\`

**Важливо:** Файл закривається автоматично, навіть якщо виникла помилка!`
      },
      {
        title: "Кілька файлів одночасно",
        content: `**Можна відкривати кілька файлів одночасно:**

\`\`\`python
# Читання з одного файлу та запис у інший
with open("input.txt", "r", encoding="utf-8") as input_file, \\
     open("output.txt", "w", encoding="utf-8") as output_file:
    content = input_file.read()
    output_file.write(content.upper())
# Обидва файли автоматично закрито!
\`\`\`

**Альтернативний синтаксис (багаторядковий):**
\`\`\`python
with open("input.txt", "r", encoding="utf-8") as input_file:
    with open("output.txt", "w", encoding="utf-8") as output_file:
        content = input_file.read()
        output_file.write(content.upper())
# Обидва файли закрито!
\`\`\`

**Приклад: Копіювання файлу**
\`\`\`python
with open("source.txt", "r", encoding="utf-8") as source, \\
     open("copy.txt", "w", encoding="utf-8") as destination:
    destination.write(source.read())
print("Файл скопійовано!")
\`\`\``
      },
      {
        title: "Порівняння: з with та без with",
        content: `**Без with (старий спосіб):**
\`\`\`python
file = open("data.txt", "r", encoding="utf-8")
try:
    content = file.read()
    # Якщо тут виникне помилка, close() не викличеться
    result = 10 / 0
finally:
    file.close()  # Потрібно вручну закривати
\`\`\`

**З with (рекомендований спосіб):**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    result = 10 / 0  # Помилка, але файл закриється!
# Файл автоматично закрито!
\`\`\`

**Переваги with:**
- ✅ Менше коду
- ✅ Автоматичне закриття
- ✅ Працює при помилках
- ✅ Більш читабельний код
- ✅ Менше можливостей для помилок

**Висновок:** Завжди використовуйте \`with\` для роботи з файлами!`
      },
      {
        title: "Що ще можна використовувати з with?",
        content: `**Контекстні менеджери працюють не тільки з файлами:**

**1. Бібліотеки для роботи з базами даних**
\`\`\`python
with database.connection() as conn:
    # Робота з базою даних
    pass
# З'єднання автоматично закрито
\`\`\`

**2. Блокування потоків (threading)**
\`\`\`python
with lock:
    # Критична секція коду
    pass
# Блокування автоматично знято
\`\`\`

**3. Власні контекстні менеджери (вивчимо пізніше)**
\`\`\`python
class MyContextManager:
    def __enter__(self):
        # Код при вході
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Код при виході
        pass

with MyContextManager() as cm:
    # Робота з ресурсом
    pass
\`\`\`

**Головна ідея:** Контекстні менеджери гарантують правильне управління ресурсами!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання with",
      code: `# Читання файлу
with open("students.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
# Файл автоматично закрито!

# Запис у файл
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Привіт, світ!\\n")
    file.write("Це другий рядок")
# Файл автоматично закрито, дані збережено!`,
      explanation: "Демонструє базове використання контекстного менеджера with для читання та запису."
    },
    {
      title: "Приклад 2: Обробка помилок з with",
      code: `# Навіть при помилці файл закриється!
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
        result = 10 / 0  # Помилка ділення на нуль
        print("Цей рядок не виконається")
except ZeroDivisionError:
    print("Помилка обчислення")
# Файл гарантовано закрито, навіть при помилці!

# Перевірка, що файл закрито
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
    # Тут файл вже закрито
    file.read()  # Спроба прочитати - помилка!
except ValueError as e:
    print(f"Помилка: {e}")  # I/O operation on closed file`,
      explanation: "Показує, що файл закривається автоматично навіть при помилках."
    },
    {
      title: "Приклад 3: Копіювання файлу",
      code: `# Копіювання вмісту одного файлу в інший
with open("source.txt", "r", encoding="utf-8") as source, \\
     open("destination.txt", "w", encoding="utf-8") as destination:
    content = source.read()
    destination.write(content)
    print("Файл скопійовано!")
# Обидва файли автоматично закрито!`,
      explanation: "Демонструє відкриття кількох файлів одночасно з with."
    },
    {
      title: "Приклад 4: Обробка даних з файлу",
      code: `# Читання, обробка та запис
with open("input.txt", "r", encoding="utf-8") as input_file:
    lines = input_file.readlines()

# Обробка даних (поза контекстним менеджером)
processed_lines = []
for line in lines:
    processed_lines.append(line.strip().upper() + "\\n")

# Запис оброблених даних
with open("output.txt", "w", encoding="utf-8") as output_file:
    output_file.writelines(processed_lines)
    print("Дані оброблено та збережено!")`,
      explanation: "Показує читання, обробку та запис даних з використанням with."
    },
    {
      title: "Приклад 5: Додавання до файлу з with",
      code: `# Додавання записів у лог-файл
import datetime

def додати_лог(повідомлення):
    """Додає запис у лог-файл з датою та часом."""
    зараз = datetime.datetime.now()
    дата_час = зараз.strftime("%Y-%m-%d %H:%M:%S")
    
    with open("app.log", "a", encoding="utf-8") as log_file:
        log_file.write(f"{дата_час}: {повідомлення}\\n")

# Використання
додати_лог("Програма запущена")
додати_лог("Обробка даних")
додати_лог("Програма завершена")

# Читання логів
with open("app.log", "r", encoding="utf-8") as log_file:
    print("=== Логи ===")
    print(log_file.read())`,
      explanation: "Демонструє практичне використання with для логування."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба використати файл після блоку with",
      explanation: "Після виходу з блоку with файл автоматично закривається. Спроба прочитати або записати викличе ValueError.",
      correctApproach: "Використовуйте файл тільки всередині блоку with. Якщо потрібні дані після закриття, збережіть їх у змінну."
    },
    {
      mistake: "Використання старого способу (без with) замість with",
      explanation: "Старий спосіб з file.close() більш схильний до помилок та витоку ресурсів.",
      correctApproach: "Завжди використовуйте with open() для роботи з файлами - це безпечніше та зручніше."
    },
    {
      mistake: "Забути encoding='utf-8' в with",
      explanation: "Навіть з with потрібно вказувати кодування для українського тексту.",
      correctApproach: "Завжди вказуйте encoding='utf-8': with open('file.txt', 'r', encoding='utf-8') as file:"
    },
    {
      mistake: "Спроба відкрити файл, який не існує, без обробки помилок",
      explanation: "Якщо файл не існує, open() з режимом 'r' викличе FileNotFoundError.",
      correctApproach: "Використовуйте try/except для обробки FileNotFoundError або перевіряйте існування файлу."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Контекстний менеджер with** — автоматично закриває файли
2. **Синтаксис:** with open("file.txt", "r") as file: ...
3. **Переваги:** автоматичне закриття, працює при помилках, чистий код
4. **Кілька файлів:** можна відкривати кілька файлів одночасно
5. **Гарантія:** файл завжди закриється, навіть при помилках

**Рекомендація:** Завжди використовуйте \`with\` для роботи з файлами!

Це найбезпечніший та найзручніший спосіб роботи з файлами в Python!`,
  
  practiceTask: {
    title: "Створення системи резервного копіювання",
    description: "Створіть програму для резервного копіювання файлів з використанням with",
    problemStatement: `Створіть програму для резервного копіювання файлів з наступними функціями:

**Функція 1: Створити резервну копію файлу**
- Приймає назву файлу
- Створює копію з назвою "файл_backup.txt"
- Використовує with для обох файлів
- Виводить повідомлення про успіх

**Функція 2: Створити резервну копію з датою**
- Створює копію з назвою "файл_2024-01-15.txt"
- Використовує поточну дату в назві
- Використовує with

**Функція 3: Відновити файл з резервної копії**
- Приймає назву оригінального файлу та резервної копії
- Відновлює файл з копії
- Використовує with

**Вимоги:**
- Використовуйте тільки with (без file.close())
- Обробіть помилки (FileNotFoundError)
- Використовуйте encoding='utf-8'
- Додайте перевірку існування файлів

**Приклад використання:**
\`\`\`
1. Створити резервну копію
2. Створити резервну копію з датою
3. Відновити файл
0. Вихід
Виберіть дію: 1
Введіть назву файлу: data.txt
Резервна копія створена: data_backup.txt
\`\`\``,
    inputFormat: "Створіть програму з меню та функціями",
    outputFormat: `Приклад виведення:
=== Система резервного копіювання ===
1. Створити резервну копію
2. Створити резервну копію з датою
3. Відновити файл
0. Вихід

Виберіть дію: 1
Введіть назву файлу: data.txt
Резервна копія створена: data_backup.txt`,
    examples: [
      {
        input: "Створити копію: data.txt",
        output: "Створено data_backup.txt",
        explanation: "Програма створює резервну копію файлу"
      },
      {
        input: "Відновити data.txt з data_backup.txt",
        output: "Файл відновлено",
        explanation: "Програма відновлює оригінальний файл з копії"
      }
    ],
    solution: {
      code: `from datetime import datetime
import os

def створити_резервну_копію(назва_файлу):
    """Створює резервну копію файлу."""
    if not os.path.exists(назва_файлу):
        print(f"Помилка: Файл '{назва_файлу}' не знайдено!")
        return False
    
    резервна_копія = f"{назва_файлу}_backup.txt"
    
    try:
        with open(назва_файлу, "r", encoding="utf-8") as source, \\
             open(резервна_копія, "w", encoding="utf-8") as backup:
            content = source.read()
            backup.write(content)
        
        print(f"Резервна копія створена: {резервна_копія}")
        return True
    except Exception as e:
        print(f"Помилка при створенні копії: {e}")
        return False

def створити_резервну_копію_з_датою(назва_файлу):
    """Створює резервну копію з датою в назві."""
    if not os.path.exists(назва_файлу):
        print(f"Помилка: Файл '{назва_файлу}' не знайдено!")
        return False
    
    зараз = datetime.now()
    дата = зараз.strftime("%Y-%m-%d")
    резервна_копія = f"{назва_файлу}_{дата}.txt"
    
    try:
        with open(назва_файлу, "r", encoding="utf-8") as source, \\
             open(резервна_копія, "w", encoding="utf-8") as backup:
            content = source.read()
            backup.write(content)
        
        print(f"Резервна копія з датою створена: {резервна_копія}")
        return True
    except Exception as e:
        print(f"Помилка при створенні копії: {e}")
        return False

def відновити_файл(оригінальний_файл, резервна_копія):
    """Відновлює файл з резервної копії."""
    if not os.path.exists(резервна_копія):
        print(f"Помилка: Резервна копія '{резервна_копія}' не знайдена!")
        return False
    
    try:
        with open(резервна_копія, "r", encoding="utf-8") as backup, \\
             open(оригінальний_файл, "w", encoding="utf-8") as original:
            content = backup.read()
            original.write(content)
        
        print(f"Файл '{оригінальний_файл}' відновлено з '{резервна_копія}'")
        return True
    except Exception as e:
        print(f"Помилка при відновленні: {e}")
        return False

def головне_меню():
    """Головне меню програми."""
    while True:
        print("\\n=== Система резервного копіювання ===")
        print("1. Створити резервну копію")
        print("2. Створити резервну копію з датою")
        print("3. Відновити файл")
        print("0. Вихід")
        
        вибір = input("Виберіть дію: ")
        
        if вибір == "1":
            назва = input("Введіть назву файлу: ")
            створити_резервну_копію(назва)
        elif вибір == "2":
            назва = input("Введіть назву файлу: ")
            створити_резервну_копію_з_датою(назва)
        elif вибір == "3":
            оригінал = input("Введіть назву оригінального файлу: ")
            копія = input("Введіть назву резервної копії: ")
            відновити_файл(оригінал, копія)
        elif вибір == "0":
            print("До побачення!")
            break
        else:
            print("Невірний вибір! Спробуйте ще раз.")

# Запуск програми
if __name__ == "__main__":
    головне_меню()`,
      explanation: "Рішення демонструє повну програму для резервного копіювання з використанням with для всіх операцій з файлами."
    },
    hints: [
      "Використовуйте with для обох файлів (джерело та призначення)",
      "Використовуйте datetime.now() та strftime() для форматування дати",
      "Обробіть FileNotFoundError для перевірки існування файлів",
      "Не забудьте encoding='utf-8'",
      "Використовуйте os.path.exists() для перевірки існування файлів"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить контекстний менеджер with?",
        options: ["Відкриває файл", "Автоматично закриває файл", "Читає файл", "Всі вище"],
        correctAnswer: 3,
        explanation: "Контекстний менеджер with відкриває файл, дозволяє працювати з ним, і автоматично закриває його після виходу з блоку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що станеться з файлом у цьому коді?\nwith open('data.txt', 'r') as file:\n    content = file.read()\n    result = 10 / 0\nprint('Готово')",
        options: ["Файл залишиться відкритим", "Файл закриється автоматично", "Виникне помилка", "Код не виконається"],
        correctAnswer: 1,
        explanation: "Навіть при помилці (ZeroDivisionError) файл автоматично закриється, бо with гарантує виклик __exit__ при виході з блоку."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка перевага with перед звичайним open()?",
        options: ["Швидше працює", "Автоматично закриває файл навіть при помилках", "Менше пам'яті використовує", "Підтримує більше форматів"],
        correctAnswer: 1,
        explanation: "Головна перевага with - автоматичне закриття файлу навіть якщо виникла помилка, що запобігає витоку ресурсів."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\nwith open('test.txt', 'w') as f:\n    f.write('Привіт')\nprint(f.closed)",
        options: ["True", "False", "Помилку", "None"],
        correctAnswer: 0,
        explanation: "Після виходу з блоку with файл автоматично закривається, тому f.closed поверне True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна відкрити кілька файлів одночасно з with?",
        options: ["Ні", "Так, через кому", "Так, але тільки для читання", "Так, але потрібно вкладені блоки"],
        correctAnswer: 1,
        explanation: "Так, можна відкрити кілька файлів: with open('file1.txt') as f1, open('file2.txt') as f2: або через вкладені блоки."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}
