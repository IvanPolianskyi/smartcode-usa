/**
 * Lesson 01-3: Практика: задачі з операторами порівняння та логічними операторами
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_01_3 = {
  lessonId: "lesson-01-3",
  moduleId: "module-01",
  order: 3,
  title: "Практика: задачі з операторами порівняння",
  
  learningObjectives: [
    "Закріпити знання про оператори порівняння",
    "Закріпити знання про логічні оператори",
    "Розв'язувати практичні задачі з використанням операторів",
    "Створювати складні умови з комбінацією операторів",
    "Застосовувати оператори для реальних сценаріїв"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-01-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд вивченого матеріалу",
        content: `На попередніх уроках ми вивчили:

**Оператори порівняння:**
- \`==\` — рівно
- \`!=\` — не рівно
- \`>\` — більше
- \`<\` — менше
- \`>=\` — більше або рівно
- \`<=\` — менше або рівно

**Логічні оператори:**
- \`and\` — логічне І (обидві умови True)
- \`or\` — логічне АБО (хоча б одна умова True)
- \`not\` — логічне НЕ (інверсія)

**Важливі моменти:**
- Всі оператори порівняння повертають булеве значення (True/False)
- Логічні оператори працюють з булевими значеннями
- Можна комбінувати оператори для створення складних умов
- Використовуйте дужки для контролю порядку обчислення

Тепер настав час закріпити ці знання на практиці!`
      },
      {
        title: "Стратегія розв'язання задач",
        content: `**Крок 1: Уважно прочитайте умову задачі**

Зрозумійте, що саме потрібно перевірити або обчислити.

**Крок 2: Визначте, які оператори потрібні**

- Чи потрібно порівняти значення? → оператори порівняння
- Чи потрібно об'єднати кілька умов? → логічні оператори

**Крок 3: Побудуйте логіку**

Розкладіть задачу на простіші частини:
- Спочатку прості перевірки
- Потім об'єднайте їх логічними операторами

**Крок 4: Напишіть код**

Перевірте кожну умову окремо, потім об'єднайте.

**Крок 5: Протестуйте**

Перевірте код з різними вхідними даними.

**Приклад:**

Задача: "Перевірити, чи користувач може водити машину (вік >= 18 І має права)"

Крок 1: Потрібно перевірити дві умови
Крок 2: Потрібні оператори: >= та and
Крок 3: age >= 18 and has_license
Крок 4: Написати код
Крок 5: Протестувати з різними віками та наявністю прав`
      },
      {
        title: "Типові патерни використання",
        content: `**Патерн 1: Перевірка діапазону**

\`\`\`python
# Перевірка, чи число в діапазоні
number = 7
in_range = 1 <= number <= 10  # True
print(f"В діапазоні: {in_range}")

# Або з використанням and
in_range2 = number >= 1 and number <= 10  # True
print(f"В діапазоні: {in_range2}")
\`\`\`

**Патерн 2: Перевірка кількох умов (всі мають виконуватися)**

\`\`\`python
# Всі умови мають бути True
age = 20
has_id = True
has_money = True
can_enter = age >= 18 and has_id and has_money  # True
print(f"Можна входити: {can_enter}")
\`\`\`

**Патерн 3: Альтернативні умови (хоча б одна має виконуватися)**

\`\`\`python
# Хоча б одна умова має бути True
is_student = True
is_pensioner = False
is_veteran = False
has_discount = is_student or is_pensioner or is_veteran  # True
print(f"Маєте знижку: {has_discount}")
\`\`\`

**Патерн 4: Інверсія умови**

\`\`\`python
# Якщо НЕ вихідний
is_weekend = False
go_to_work = not is_weekend  # True
print(f"Йдемо на роботу: {go_to_work}")

# Або простіше
go_to_work2 = is_weekend == False  # True
print(f"Йдемо на роботу: {go_to_work2}")
\`\`\`

**Патерн 5: Складні комбінації**

\`\`\`python
# (Умова1 АБО Умова2) І Умова3
is_student = True
is_pensioner = False
has_card = True
can_get_discount = (is_student or is_pensioner) and has_card  # True
print(f"Можна отримати знижку: {can_get_discount}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Калькулятор оцінки",
      code: `# Визначення оцінки на основі балу
score = 85

# Перевірка різних рівнів оцінок
is_excellent = score >= 90  # False
is_good = score >= 70  # True
is_satisfactory = score >= 50  # True
is_unsatisfactory = score < 50  # False

print(f"Відмінно: {is_excellent}")
print(f"Добре: {is_good}")
print(f"Задовільно: {is_satisfactory}")`,
      explanation: "Демонструє використання операторів порівняння для визначення оцінки."
    },
    {
      title: "Приклад 2: Система доступу",
      code: `# Перевірка доступу до системи
username = "admin"
password = "secret123"
age = 20

correct_username = "admin"
correct_password = "secret123"
min_age = 18

# Перевірка всіх умов
is_valid_login = username == correct_username and password == correct_password  # True
is_adult = age >= min_age  # True

can_access = is_valid_login and is_adult  # True
print(f"Доступ дозволено: {can_access}")
print(f"Логін правильний: {is_valid_login}")
print(f"Повнолітній: {is_adult}")`,
      explanation: "Показує комбінацію операторів порівняння та логічних операторів для системи доступу."
    },
    {
      title: "Приклад 3: Валідація форми",
      code: `# Валідація даних форми
email = "user@example.com"
password = "mypassword123"
confirm_password = "mypassword123"

# Перевірки
has_at = "@" in email  # True
is_email_not_empty = email and len(email.strip()) > 0  # True
is_password_long = password and len(password) >= 8  # True
passwords_match = password == confirm_password  # True

# Валідація
is_valid_email = has_at and is_email_not_empty  # True
is_valid_password = is_password_long and passwords_match  # True

form_is_valid = is_valid_email and is_valid_password  # True
print(f"Форма заповнена правильно: {form_is_valid}")
print(f"Email валідний: {is_valid_email}")
print(f"Пароль валідний: {is_valid_password}")`,
      explanation: "Демонструє комплексну валідацію з використанням логічних операторів."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Неправильне використання and замість or (або навпаки)",
      explanation: "and вимагає, щоб обидві умови були True, а or — щоб хоча б одна була True. Важливо правильно вибрати оператор.",
      correctApproach: "Уважно прочитайте умову: якщо потрібно 'обидві умови', використовуйте and; якщо 'хоча б одна', використовуйте or."
    },
    {
      mistake: "Забувати про дужки в складних виразах",
      explanation: "Без дужок Python може обчислити вираз не так, як ви очікуєте через пріоритет операторів.",
      correctApproach: "Завжди використовуйте дужки для ясності: (condition1 and condition2) or condition3"
    },
    {
      mistake: "Плутати == з =",
      explanation: "== використовується для порівняння, а = для присвоєння. Це різні оператори!",
      correctApproach: "Використовуйте == для порівняння: x == 5 (не x = 5 для порівняння)"
    },
    {
      mistake: "Не враховувати тип даних при порівнянні",
      explanation: "5 == '5' завжди False, оскільки це різні типи даних.",
      correctApproach: "Конвертуйте типи перед порівнянням: int(user_input) == 5"
    }
  ],
  
  summary: `На цьому уроці ми закріпили знання про:

1. **Оператори порівняння** — для порівняння значень
2. **Логічні оператори** — для об'єднання умов
3. **Комбінування операторів** — для створення складних умов
4. **Практичне застосування** — реальні сценарії використання

**Ключові навички:**
- Вибір правильного оператора для задачі
- Побудова логіки з простіших частин
- Використання дужок для контролю порядку обчислення
- Тестування коду з різними вхідними даними

Тепер ви впевнено використовуєте оператори порівняння та логічні оператори для створення складних умов у програмах!`,
  
  practiceTask: {
    title: "Система керування доступом до кінотеатру",
    description: "Створіть програму для перевірки доступу до кінотеатру з різними категоріями фільмів",
    problemStatement: `Напишіть програму для системи керування доступом до кінотеатру, яка:

1. Використовує дані користувача (введіть їх напряму в коді, не використовуйте input()):
   - Вік
   - Чи має студентський квиток (так/ні)
   - Чи має пенсійне посвідчення (так/ні)
   - Рейтинг фільму (G, PG, PG-13, R, NC-17)

2. Перевіряє доступ до фільмів за допомогою операторів порівняння:
   - G (для всіх) — доступний всім (завжди True)
   - PG (батьківський контроль) — доступний всім, але рекомендовано з батьками для дітей < 13
   - PG-13 — доступний з 13 років (age >= 13)
   - R — доступний з 17 років (age >= 17)
   - NC-17 — доступний тільки з 18 років (age >= 18)

3. Визначає знижки за допомогою логічних операторів:
   - Діти до 12 років: знижка 50% (age < 12)
   - Студенти: знижка 25% (is_student == True)
   - Пенсіонери: знижка 40% (is_pensioner == True)
   - Студенти-пенсіонери: знижка 50% (is_student and is_pensioner)

4. Виводить результати всіх перевірок та розрахунків

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді (наприклад: age = 20, is_student_input = "так", rating = "R")`,
    inputFormat: `Введіть значення напряму в коді:
age = 20
is_student_input = "так"
is_pensioner_input = "ні"
rating = "R"

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `=== Система керування доступом ===

Вік: 20
Студент: так
Пенсіонер: ні
Рейтинг фільму: R

Результат перевірки:
✅ Доступ дозволено!
💰 Ціна квитка: 150 грн (знижка для студентів)`,
    examples: [
      {
        input: `Введіть ваш вік: 20
Чи маєте студентський квиток? (так/ні): так
Чи маєте пенсійне посвідчення? (так/ні): ні
Введіть рейтинг фільму (G/PG/PG-13/R/NC-17): R`,
        output: `=== Система керування доступом ===

Вік: 20
Студент: True
Пенсіонер: False
Рейтинг фільму: R

Результати перевірки доступу:
Може переглянути G: False
Може переглянути PG: False
Може переглянути PG-13: False
Може переглянути R: True
Може переглянути NC-17: False
Загальний доступ: True
Потрібен супровід батьків (PG для дітей < 13): False
Максимальна знижка (50%): False, ціна: 100 грн
Знижка для пенсіонерів (40%): False, ціна: 120 грн
Знижка для студентів (25%): True, ціна: 150 грн
Без знижки: False, ціна: 200 грн

Результати розрахунку знижок:
Дитина до 12 років: False
Студент-пенсіонер: False
Пенсіонер: False
Студент: True

Можливі ціни:
З максимальною знижкою (50%): 100 грн - застосовується: False
Зі знижкою для пенсіонерів (40%): 120 грн - застосовується: False
Зі знижкою для студентів (25%): 150 грн - застосовується: True
Без знижки: 200 грн - застосовується: False`,
        explanation: "Студент 20 років може переглянути фільм з рейтингом R (17+) і отримує знижку."
      },
      {
        input: `Введіть ваш вік: 15
Чи маєте студентський квиток? (так/ні): ні
Чи маєте пенсійне посвідчення? (так/ні): ні
Введіть рейтинг фільму (G/PG/PG-13/R/NC-17): R`,
        output: `=== Система керування доступом ===

Вік: 15
Студент: False
Пенсіонер: False
Рейтинг фільму: R

Результати перевірки доступу:
Може переглянути G: False
Може переглянути PG: False
Може переглянути PG-13: False
Може переглянути R: False
Може переглянути NC-17: False
Загальний доступ: False
Потрібен супровід батьків (PG для дітей < 13): False
Максимальна знижка (50%): False, ціна: 100 грн
Знижка для пенсіонерів (40%): False, ціна: 120 грн
Знижка для студентів (25%): False, ціна: 150 грн
Без знижки: True, ціна: 200 грн

Результати розрахунку знижок:
Дитина до 12 років: False
Студент-пенсіонер: False
Пенсіонер: False
Студент: False

Можливі ціни:
З максимальною знижкою (50%): 100 грн - застосовується: False
Зі знижкою для пенсіонерів (40%): 120 грн - застосовується: False
Зі знижкою для студентів (25%): 150 грн - застосовується: False
Без знижки: 200 грн - застосовується: True`,
        explanation: "15-річний не може переглянути фільм з рейтингом R, який доступний з 17 років."
      },
      {
        input: `Введіть ваш вік: 10
Чи маєте студентський квиток? (так/ні): ні
Чи маєте пенсійне посвідчення? (так/ні): ні
Введіть рейтинг фільму (G/PG/PG-13/R/NC-17): G`,
        output: `=== Система керування доступом ===

Вік: 10
Студент: False
Пенсіонер: False
Рейтинг фільму: G

Результати перевірки доступу:
Може переглянути G: True
Може переглянути PG: False
Може переглянути PG-13: False
Може переглянути R: False
Може переглянути NC-17: False
Загальний доступ: True
Потрібен супровід батьків (PG для дітей < 13): False
Максимальна знижка (50%): True, ціна: 100 грн
Знижка для пенсіонерів (40%): False, ціна: 120 грн
Знижка для студентів (25%): False, ціна: 150 грн
Без знижки: False, ціна: 200 грн

Результати розрахунку знижок:
Дитина до 12 років: True
Студент-пенсіонер: False
Пенсіонер: False
Студент: False

Можливі ціни:
З максимальною знижкою (50%): 100 грн - застосовується: True
Зі знижкою для пенсіонерів (40%): 120 грн - застосовується: False
Зі знижкою для студентів (25%): 150 грн - застосовується: False
Без знижки: 200 грн - застосовується: False`,
        explanation: "Дитина 10 років може переглянути фільм G (для всіх) і отримує знижку для дітей."
      },
      {
        input: `Введіть ваш вік: 70
Чи маєте студентський квиток? (так/ні): так
Чи маєте пенсійне посвідчення? (так/ні): так
Введіть рейтинг фільму (G/PG/PG-13/R/NC-17): PG-13`,
        output: `=== Система керування доступом ===

Вік: 70
Студент: True
Пенсіонер: True
Рейтинг фільму: PG-13

Результати перевірки доступу:
Може переглянути G: False
Може переглянути PG: False
Може переглянути PG-13: True
Може переглянути R: False
Може переглянути NC-17: False
Загальний доступ: True
Потрібен супровід батьків (PG для дітей < 13): False
Максимальна знижка (50%): True, ціна: 100 грн
Знижка для пенсіонерів (40%): False, ціна: 120 грн
Знижка для студентів (25%): False, ціна: 150 грн
Без знижки: False, ціна: 200 грн

Результати розрахунку знижок:
Дитина до 12 років: False
Студент-пенсіонер: True
Пенсіонер: False
Студент: False

Можливі ціни:
З максимальною знижкою (50%): 100 грн - застосовується: True
Зі знижкою для пенсіонерів (40%): 120 грн - застосовується: False
Зі знижкою для студентів (25%): 150 грн - застосовується: False
Без знижки: 200 грн - застосовується: False`,
        explanation: "Студент-пенсіонер отримує максимальну знижку 50%."
      }
    ],
    solution: {
      code: `# Система керування доступом до кінотеатру
print("=== Система керування доступом ===")
print()

# Вводимо дані напряму в коді (не використовуємо input())
age = 20
is_student_input = "так"
is_pensioner_input = "ні"
rating = "R"

# Конвертуємо відповіді в булеві значення
is_student = is_student_input == "так"
is_pensioner = is_pensioner_input == "так"

print()
print(f"Вік: {age}")
print(f"Студент: {is_student}")
print(f"Пенсіонер: {is_pensioner}")
print(f"Рейтинг фільму: {rating}")
print()

# Базова ціна
base_price = 200

# Перевірка доступу до фільму за допомогою операторів порівняння
can_watch_g = rating == "G"  # G - для всіх
can_watch_pg = rating == "PG"  # PG - для всіх
can_watch_pg13 = rating == "PG-13" and age >= 13  # PG-13 - з 13 років
can_watch_r = rating == "R" and age >= 17  # R - з 17 років
can_watch_nc17 = rating == "NC-17" and age >= 18  # NC-17 - з 18 років

# Загальний доступ (хоча б одна умова True)
can_watch = can_watch_g or can_watch_pg or can_watch_pg13 or can_watch_r or can_watch_nc17

# Перевірка рекомендації для PG
needs_parents = rating == "PG" and age < 13

print("Результати перевірки доступу:")
print(f"Може переглянути G: {can_watch_g}")
print(f"Може переглянути PG: {can_watch_pg}")
print(f"Може переглянути PG-13: {can_watch_pg13}")
print(f"Може переглянути R: {can_watch_r}")
print(f"Може переглянути NC-17: {can_watch_nc17}")
print(f"Загальний доступ: {can_watch}")
print(f"Потрібен супровід батьків (PG для дітей < 13): {needs_parents}")

# Визначення знижок за допомогою логічних операторів
is_child = age < 12
is_student_pensioner = is_student and is_pensioner
has_child_discount = is_child
has_student_pensioner_discount = is_student_pensioner
has_pensioner_discount = is_pensioner and not is_student_pensioner
has_student_discount = is_student and not is_student_pensioner

# Розрахунок ціни (використовуємо логічні оператори та порівняння)
# Визначаємо, яка знижка застосовується
has_max_discount = is_student_pensioner or is_child  # 50% знижка (100 грн)
has_pensioner_discount = is_pensioner and not is_student_pensioner  # 40% знижка (120 грн)
has_student_discount = is_student and not is_student_pensioner  # 25% знижка (150 грн)
has_no_discount = not (has_max_discount or has_pensioner_discount or has_student_discount)  # Без знижки (200 грн)

# Визначаємо ціну на основі знижок
price_with_max_discount = 100
price_with_pensioner_discount = 120
price_with_student_discount = 150
price_without_discount = base_price

# Виводимо результати
print(f"Максимальна знижка (50%): {has_max_discount}, ціна: {price_with_max_discount} грн")
print(f"Знижка для пенсіонерів (40%): {has_pensioner_discount}, ціна: {price_with_pensioner_discount} грн")
print(f"Знижка для студентів (25%): {has_student_discount}, ціна: {price_with_student_discount} грн")
print(f"Без знижки: {has_no_discount}, ціна: {price_without_discount} грн")

print()
print("Результати розрахунку знижок:")
print(f"Дитина до 12 років: {has_child_discount}")
print(f"Студент-пенсіонер: {has_student_pensioner_discount}")
print(f"Пенсіонер: {has_pensioner_discount}")
print(f"Студент: {has_student_discount}")

# Визначаємо фінальну ціну на основі знижок
print()
print("Можливі ціни:")
print(f"З максимальною знижкою (50%): {price_with_max_discount} грн - застосовується: {has_max_discount}")
print(f"Зі знижкою для пенсіонерів (40%): {price_with_pensioner_discount} грн - застосовується: {has_pensioner_discount}")
print(f"Зі знижкою для студентів (25%): {price_with_student_discount} грн - застосовується: {has_student_discount}")
print(f"Без знижки: {price_without_discount} грн - застосовується: {has_no_discount}")`,
      explanation: "Рішення використовує оператори порівняння для перевірки віку та рейтингу фільму, логічні оператори для визначення знижок, та комбінує все це для створення повноцінної системи доступу."
    },
    hints: [
      "Введіть значення напряму в коді (age, is_student_input, rating тощо) - не використовуйте input()",
      "Використовуйте оператори порівняння (>=, <) для перевірки віку",
      "Використовуйте оператор == для перевірки рейтингу фільму",
      "Використовуйте логічні оператори and та or для визначення знижок",
      "Спочатку перевірте доступ до фільму, потім розрахуйте ціну",
      "Для студентів-пенсіонерів застосовується максимальна знижка (50%)",
      "Використовуйте логічні оператори для об'єднання перевірок"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: ["20", "так", "ні", "R"],
        expectedOutput: "Загальний доступ: True",
        description: "Студент 20 років може переглянути фільм R"
      },
      {
        input: ["15", "ні", "ні", "R"],
        expectedOutput: "Може переглянути R: False",
        description: "15-річний не може переглянути фільм R"
      },
      {
        input: ["10", "ні", "ні", "G"],
        expectedOutput: "100 грн",
        description: "Дитина отримує знижку 50%"
      },
      {
        input: ["70", "так", "так", "PG-13"],
        expectedOutput: "100 грн",
        description: "Студент-пенсіонер отримує максимальну знижку"
      },
      {
        input: ["16", "ні", "ні", "NC-17"],
        expectedOutput: "Може переглянути NC-17: False",
        description: "16-річний не може переглянути фільм NC-17"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 20\nhas_license = True\ncan_drive = age >= 18 and has_license\nprint(can_drive)\n```",
        options: [
          "True",
          "False",
          "20",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "age >= 18 є True (20 >= 18) і has_license є True, тому True and True = True."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор потрібен для перевірки, чи число знаходиться в діапазоні від 1 до 10?",
        options: [
          "1 < number < 10",
          "1 <= number <= 10",
          "number >= 1 and number <= 10",
          "Варіанти 2 та 3 правильні"
        ],
        correctAnswer: 3,
        explanation: "Можна використовувати ланцюгове порівняння (1 <= number <= 10) або логічний оператор (number >= 1 and number <= 10). Обидва варіанти правильні."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nis_student = True\nis_pensioner = False\nhas_discount = is_student or is_pensioner\nprint(has_discount)\n```",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "is_student є True, тому True or False = True (or повертає True, якщо хоча б одна умова True)."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: not (5 > 3 and 2 < 1)?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Спочатку обчислюється (5 > 3 and 2 < 1) = (True and False) = False, потім not False = True."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 25\nis_student = False\nis_pensioner = True\n\nis_child = age < 12\nis_student_pensioner = is_student and is_pensioner\nhas_pensioner_discount = is_pensioner and not is_student_pensioner\nhas_student_discount = is_student and not is_student_pensioner\n\nprint(f\"Дитина: {is_child}\")\nprint(f\"Студент-пенсіонер: {is_student_pensioner}\")\nprint(f\"Пенсіонер: {has_pensioner_discount}\")\nprint(f\"Студент: {has_student_discount}\")\n```",
        options: [
          "Дитина: False",
          "Студент-пенсіонер: False",
          "Пенсіонер: True",
          "Студент: False"
        ],
        correctAnswer: 2,
        explanation: "age >= 12 (True), is_student and is_pensioner = False and True = False, is_pensioner = True, тому has_pensioner_discount = True."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор має найвищий пріоритет: and, or, чи not?",
        options: [
          "and",
          "or",
          "not",
          "Всі мають однаковий пріоритет"
        ],
        correctAnswer: 2,
        explanation: "not має найвищий пріоритет, потім and, потім or."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nrating = \"R\"\nage = 17\ncan_watch = age >= 17 and rating == \"R\"\nprint(can_watch)\n```",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "age >= 17 є True (17 >= 17) і rating == 'R' є True, тому True and True = True."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: (True or False) and False?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "Спочатку обчислюється (True or False) = True, потім True and False = False."
      },
      {
        id: "q9",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nemail = \"user@example.com\"\npassword = \"pass123\"\nis_valid = email and \"@\" in email and len(password) >= 8\nprint(is_valid)\n```",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "email є True, '@' in email є True, але len(password) >= 8 є False (7 < 8), тому True and True and False = False."
      },
      {
        id: "q10",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор використовується для перевірки нерівності?",
        options: [
          "!=",
          "<>",
          "!=",
          "Варіанти 1 та 3 правильні (це один і той самий оператор)"
        ],
        correctAnswer: 3,
        explanation: "Оператор != використовується для перевірки нерівності в Python."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
