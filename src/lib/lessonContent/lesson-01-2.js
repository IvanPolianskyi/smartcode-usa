/**
 * Lesson 01-2: Логічні оператори: and, or, not
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_01_2 = {
  lessonId: "lesson-01-2",
  moduleId: "module-01",
  order: 2,
  title: "Логічні оператори: and, or, not",
  
  learningObjectives: [
    "Розуміти, що таке логічні оператори та навіщо вони потрібні",
    "Використовувати оператор and для об'єднання умов",
    "Використовувати оператор or для альтернативних умов",
    "Використовувати оператор not для інверсії",
    "Розуміти пріоритет логічних операторів",
    "Створювати складні умови з комбінацією операторів"
  ],
  
  estimatedTime: 75,
  prerequisites: ["lesson-01-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до логічних операторів",
        content: `Логічні оператори дозволяють об'єднувати кілька умов разом та створювати складніші перевірки. Вони працюють з булевими значеннями (True/False) та повертають булеве значення.

**Навіщо потрібні логічні оператори?**

У реальному житті ми часто використовуємо логічні зв'язки:
- "Якщо дощ І холодно, то візьму парасольку"
- "Якщо втомлений АБО пізно, то ляжу спати"
- "Якщо НЕ вихідний, то йду на роботу"

У програмуванні ми робимо те саме за допомогою логічних операторів:
- \`and\` — "І" (обидві умови мають бути True)
- \`or\` — "АБО" (хоча б одна умова має бути True)
- \`not\` — "НЕ" (інвертує значення)

**Python має три логічні оператори:**
1. \`and\` — логічне І
2. \`or\` — логічне АБО
3. \`not\` — логічне НЕ`
      },
      {
        title: "Оператор and (Логічне І)",
        content: `Оператор \`and\` повертає \`True\` тільки якщо **обидві** умови є \`True\`. Якщо хоча б одна умова \`False\`, результат буде \`False\`.

**Таблиця істинності для and:**

| A | B | A and B |
|---|---|---------|
| True | True | **True** |
| True | False | False |
| False | True | False |
| False | False | False |

**Приклади:**

\`\`\`python
# Обидві умови True
True and True      # True
5 > 3 and 10 > 5   # True (обидві умови виконуються)

# Одна з умов False
True and False     # False
5 > 3 and 2 > 5    # False (друга умова не виконується)

# Обидві умови False
False and False    # False
2 > 5 and 1 > 10   # False
\`\`\`

**Практичне застосування:**

\`\`\`python
# Перевірка віку та наявності документів
age = 18
has_id = True

can_access = age >= 18 and has_id  # True
print(f"Доступ дозволено: {can_access}")  # Доступ дозволено: True

# Перевірка діапазону
number = 7
in_range = number >= 1 and number <= 10  # True
print(f"Число в діапазоні від 1 до 10: {in_range}")  # Число в діапазоні від 1 до 10: True

# Перевірка пароля та логіну
username = "admin"
password = "secret123"
user_input_name = "admin"
user_input_pass = "secret123"

login_successful = username == user_input_name and password == user_input_pass  # True
print(f"Вхід успішний: {login_successful}")  # Вхід успішний: True
\`\`\`

**Важливо:**
- \`and\` вимагає, щоб **обидві** умови були True
- Якщо перша умова False, Python може не перевіряти другу (short-circuit evaluation)`
      },
      {
        title: "Оператор or (Логічне АБО)",
        content: `Оператор \`or\` повертає \`True\` якщо **хоча б одна** з умов є \`True\`. Повертає \`False\` тільки якщо **обидві** умови є \`False\`.

**Таблиця істинності для or:**

| A | B | A or B |
|---|---|--------|
| True | True | **True** |
| True | False | **True** |
| False | True | **True** |
| False | False | False |

**Приклади:**

\`\`\`python
# Хоча б одна умова True
True or False      # True
False or True      # True
5 > 3 or 2 > 10    # True (перша умова виконується)

# Обидві умови True
True or True       # True
10 > 5 or 3 > 1    # True

# Обидві умови False
False or False     # False
2 > 5 or 1 > 10    # False
\`\`\`

**Практичне застосування:**

\`\`\`python
# Перевірка знижки (студент АБО пенсіонер)
is_student = True
is_pensioner = False

has_discount = is_student or is_pensioner  # True
print(f"Ви маєте право на знижку: {has_discount}")  # Ви маєте право на знижку: True

# Перевірка доступу (адмін АБО модератор)
role = "user"
has_access = role == "admin" or role == "moderator"  # False
print(f"Доступ до панелі управління: {has_access}")  # Доступ до панелі управління: False

# Перевірка температури (спекотно АБО холодно)
temperature = 35
is_extreme = temperature > 30 or temperature < 10  # True
print(f"Екстремальна температура: {is_extreme}")  # Екстремальна температура: True
\`\`\`

**Важливо:**
- \`or\` повертає True, якщо **хоча б одна** умова True
- Якщо перша умова True, Python може не перевіряти другу (short-circuit evaluation)`
      },
      {
        title: "Оператор not (Логічне НЕ)",
        content: `Оператор \`not\` **інвертує** (заперечує) булеве значення. Якщо значення \`True\`, то \`not\` поверне \`False\`, і навпаки.

**Таблиця істинності для not:**

| A | not A |
|---|-------|
| True | False |
| False | True |

**Приклади:**

\`\`\`python
# Інверсія True
not True           # False
not (5 > 3)        # False (5 > 3 є True, not True = False)

# Інверсія False
not False          # True
not (2 > 5)       # True (2 > 5 є False, not False = True)

# Практичні приклади
is_raining = True
can_go_out = not is_raining  # False
print(f"Можна йти на прогулянку: {can_go_out}")  # Можна йти на прогулянку: False

# Перевірка, чи число НЕ в діапазоні
number = 15
not_in_range = not (1 <= number <= 10)  # True
print(f"Число не в діапазоні від 1 до 10: {not_in_range}")  # Число не в діапазоні від 1 до 10: True
\`\`\`

**Практичне застосування:**

\`\`\`python
# Перевірка, чи користувач НЕ заблокований
is_blocked = False
is_active = not is_blocked  # True
print(f"Користувач активний: {is_active}")  # Користувач активний: True

# Перевірка, чи пароль НЕ порожній
password = ""
is_empty = not password  # True
print(f"Пароль порожній: {is_empty}")  # Пароль порожній: True

# Перевірка, чи число НЕ дорівнює нулю
number = 5
not_zero1 = not (number == 0)  # True
not_zero2 = number != 0  # True (простіше)
print(f"Число не дорівнює нулю: {not_zero2}")  # Число не дорівнює нулю: True
\`\`\`

**Важливо:**
- \`not\` завжди повертає протилежне значення
- \`not\` має найвищий пріоритет серед логічних операторів`
      },
      {
        title: "Комбінування логічних операторів",
        content: `Можна комбінувати кілька логічних операторів разом для створення складних умов.

**Приклади комбінацій:**

\`\`\`python
# Комбінація and та or
age = 25
has_license = True
has_car = False

# Може водити, якщо (вік >= 18 І має права) АБО має машину
can_drive = (age >= 18 and has_license) or has_car
# True (оскільки age >= 18 and has_license є True)

# Комбінація з not
is_weekend = False
is_holiday = True

# Працюємо, якщо НЕ вихідний АБО НЕ свято
go_to_work = not is_weekend or not is_holiday  # True
print(f"Йдемо на роботу: {go_to_work}")  # Йдемо на роботу: True

# Складні умови
temperature = 22
is_sunny = True
has_umbrella = False

# Виходимо, якщо (температура комфортна АБО є парасолька) І сонячно
can_go_out = (temperature >= 20 and temperature <= 25) or has_umbrella and is_sunny  # True
print(f"Можна йти на прогулянку: {can_go_out}")  # Можна йти на прогулянку: True
\`\`\`

**Пріоритет операторів:**

1. \`not\` — найвищий пріоритет
2. \`and\` — середній пріоритет
3. \`or\` — найнижчий пріоритет

**Використання дужок:**

Дужки допомагають контролювати порядок обчислення:

\`\`\`python
# Без дужок (може бути незрозуміло)
result1 = True or False and False
# Python обчислить: True or (False and False) = True or False = True

# З дужками (ясніше)
result2 = (True or False) and False
# Обчислить: (True or False) and False = True and False = False

# Завжди використовуйте дужки для ясності!
result3 = (age >= 18 and has_license) or has_car
\`\`\``
      },
      {
        title: "Short-circuit evaluation (Коротке замикання)",
        content: `Python використовує механізм "короткого замикання" (short-circuit evaluation) для оптимізації обчислень.

**Як це працює:**

**Для оператора \`and\`:**
- Якщо перша умова \`False\`, Python **не перевіряє** другу умову (результат вже відомий — \`False\`)
- Якщо перша умова \`True\`, Python перевіряє другу умову

**Для оператора \`or\`:**
- Якщо перша умова \`True\`, Python **не перевіряє** другу умову (результат вже відомий — \`True\`)
- Якщо перша умова \`False\`, Python перевіряє другу умову

**Приклади:**

\`\`\`python
# Приклад з and - коротке замикання
# Якщо перша умова False, друга частина не обчислюється
result1 = False and True  # False (друга частина не перевіряється)
result2 = True and True   # True (обидві частини перевіряються)

# Приклад з or - коротке замикання
# Якщо перша умова True, друга частина не обчислюється
result3 = True or False   # True (друга частина не перевіряється)
result4 = False or True   # True (обидві частини перевіряються)

print(f"False and True: {result1}")  # False
print(f"True and True: {result2}")   # True
print(f"True or False: {result3}")   # True
print(f"False or True: {result4}")   # True
\`\`\`

**Практичне застосування:**

\`\`\`python
# Безпечна перевірка списку
my_list = [1, 2, 3]

# Якщо список порожній, len(my_list) > 0 буде False
# і друга частина не виконається (безпечно!)
is_not_empty = len(my_list) > 0  # True
first_is_one = my_list[0] == 1  # True
is_valid = is_not_empty and first_is_one  # True
print(f"Перший елемент дорівнює 1: {is_valid}")  # Перший елемент дорівнює 1: True

# Безпечна перевірка словника
my_dict = {"name": "Python"}

# Якщо ключа немає, перша умова False
# і друга частина не виконається (безпечно!)
has_key = "name" in my_dict  # True
value_matches = my_dict["name"] == "Python"  # True
found = has_key and value_matches  # True
print(f"Знайдено: {found}")  # Знайдено: True
\`\`\``
      },
      {
        title: "Практичні приклади використання",
        content: `Давайте розглянемо реальні сценарії використання логічних операторів:

**Приклад 1: Система входу**

\`\`\`python
username = "admin"
password = "secret123"

correct_username = "admin"
correct_password = "secret123"

# Перевірка логіну та пароля
login_successful = username == correct_username and password == correct_password  # True
print(f"Вхід успішний: {login_successful}")  # Вхід успішний: True
\`\`\`

**Приклад 2: Перевірка віку для різних послуг**

\`\`\`python
age = 20

# Може водити машину
can_drive = age >= 18  # True

# Може голосувати
can_vote = age >= 18  # True

# Може купувати алкоголь
can_buy_alcohol = age >= 21  # False

# Може отримати знижку (студент або пенсіонер)
is_student = True
is_pensioner = False
has_discount = is_student or is_pensioner  # True

print(f"Може водити: {can_drive}")
print(f"Може голосувати: {can_vote}")
print(f"Має знижку: {has_discount}")
\`\`\`

**Приклад 3: Валідація форми**

\`\`\`python
email = "user@example.com"
password = "mypassword123"

# Перевірка, чи email не порожній І містить @
is_valid_email = email and "@" in email  # True

# Перевірка, чи пароль не порожній І має мінімум 8 символів
is_valid_password = password and len(password) >= 8  # True

form_is_valid = is_valid_email and is_valid_password  # True
print(f"Форма заповнена правильно: {form_is_valid}")  # Форма заповнена правильно: True
\`\`\`

**Приклад 4: Умови для прогулянки**

\`\`\`python
temperature = 22
is_raining = False
is_weekend = True

# Виходимо, якщо (температура комфортна АБО вихідний) І НЕ дощ
comfortable_temp = 15 <= temperature <= 25  # True
can_go_out = (comfortable_temp or is_weekend) and not is_raining  # True

print(f"Можна йти на прогулянку: {can_go_out}")  # Можна йти на прогулянку: True
\`\`\``
      },
      {
        title: "Типові помилки та як їх уникнути",
        content: `**Помилка 1: Плутати and з or**

\`\`\`python
# ❌ НЕПРАВИЛЬНО
age = 20
is_working_age_wrong = age >= 18 or age <= 65  # Це завжди True!
print(f"Працездатний вік: {is_working_age_wrong}")  # Працездатний вік: True (завжди!)

# ✅ ПРАВИЛЬНО
is_working_age_correct = age >= 18 and age <= 65  # True
print(f"Працездатний вік: {is_working_age_correct}")  # Працездатний вік: True
\`\`\`

**Помилка 2: Забувати про пріоритет операторів**

\`\`\`python
# ❌ НЕПРАВИЛЬНО (може працювати не так, як очікується)
result = True or False and False
# Python обчислить: True or (False and False) = True

# ✅ ПРАВИЛЬНО (використовуйте дужки для ясності)
result = (True or False) and False
# Обчислить: (True or False) and False = False
\`\`\`

**Помилка 3: Використовувати and замість or (або навпаки)**

\`\`\`python
# ❌ НЕПРАВИЛЬНО
is_student = True
is_pensioner = False
has_discount_wrong = is_student and is_pensioner  # False (ніхто не може бути і студентом, і пенсіонером одночасно)

# ✅ ПРАВИЛЬНО
has_discount_correct = is_student or is_pensioner  # True (або студент, або пенсіонер)
print(f"Має знижку: {has_discount_correct}")
\`\`\`

**Помилка 4: Неправильне використання not**

\`\`\`python
# ❌ НЕПРАВИЛЬНО
age = 15
is_minor_wrong = not age >= 18  # Працює, але нечитабельно

# ✅ ПРАВИЛЬНО
is_minor_correct = age < 18  # Простіше та зрозуміліше
print(f"Неповнолітній: {is_minor_correct}")
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базові логічні оператори",
      code: `# Оператор and
print(f"True and True: {True and True}")      # True
print(f"True and False: {True and False}")    # False

# Оператор or
print(f"True or False: {True or False}")      # True
print(f"False or False: {False or False}")    # False

# Оператор not
print(f"not True: {not True}")               # False
print(f"not False: {not False}")              # True`,
      explanation: "Демонструє базову роботу всіх трьох логічних операторів."
    },
    {
      title: "Приклад 2: Комбінування операторів",
      code: `# Комбінація and та or
age = 25
has_license = True
has_car = False

can_drive = (age >= 18 and has_license) or has_car
print(f"Може водити: {can_drive}")  # True

# Комбінація з not
is_weekend = False
is_holiday = True

go_to_work = not is_weekend or not is_holiday  # True
print(f"Йдемо на роботу: {go_to_work}")  # Йдемо на роботу: True`,
      explanation: "Показує, як комбінувати логічні оператори для створення складних умов."
    },
    {
      title: "Приклад 3: Практичне застосування",
      code: `# Система входу
username = "admin"
password = "secret123"
user_input_name = "admin"
user_input_pass = "secret123"

login_successful = username == user_input_name and password == user_input_pass
print(f"Вхід успішний: {login_successful}")  # Вхід успішний: True

# Перевірка знижки
is_student = True
is_pensioner = False

has_discount = is_student or is_pensioner
print(f"Ви маєте право на знижку: {has_discount}")  # Ви маєте право на знижку: True`,
      explanation: "Демонструє реальні сценарії використання логічних операторів."
    },
    {
      title: "Приклад 4: Валідація даних",
      code: `# Перевірка email та пароля
email = "user@example.com"
password = "mypassword123"

# Email має містити @ та не бути порожнім
is_valid_email = email and "@" in email

# Пароль має бути не менше 8 символів
is_valid_password = password and len(password) >= 8

data_is_valid = is_valid_email and is_valid_password
print(f"Дані валідні: {data_is_valid}")  # Дані валідні: True`,
      explanation: "Показує використання логічних операторів для валідації даних."
    },
    {
      title: "Приклад 5: Складні умови",
      code: `# Умови для прогулянки
temperature = 22
is_raining = False
is_weekend = True

# Виходимо, якщо (температура комфортна АБО вихідний) І НЕ дощ
comfortable_temp = 15 <= temperature <= 25
can_go_out = (comfortable_temp or is_weekend) and not is_raining

print(f"Можна йти на прогулянку: {can_go_out}")  # Можна йти на прогулянку: True`,
      explanation: "Демонструє створення складних умов з використанням дужок для контролю пріоритету."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Плутати and з or",
      explanation: "and вимагає, щоб обидві умови були True, а or — щоб хоча б одна була True. Це різні речі!",
      correctApproach: "Використовуйте and для об'єднання умов (обидві мають бути True), or для альтернатив (хоча б одна True)."
    },
    {
      mistake: "Забувати про пріоритет операторів",
      explanation: "not має найвищий пріоритет, потім and, потім or. Без дужок код може працювати не так, як очікується.",
      correctApproach: "Завжди використовуйте дужки для ясності: (condition1 and condition2) or condition3"
    },
    {
      mistake: "Використовувати and замість or для взаємовиключних умов",
      explanation: "Якщо умови взаємовиключні (наприклад, студент або пенсіонер), використовуйте or, а не and.",
      correctApproach: "Для взаємовиключних умов використовуйте or: is_student or is_pensioner"
    },
    {
      mistake: "Неправильне використання not",
      explanation: "not інвертує значення. Іноді простіше використовувати інший оператор порівняння замість not.",
      correctApproach: "Замість not (age >= 18) використовуйте age < 18 — це простіше та зрозуміліше."
    },
    {
      mistake: "Не враховувати short-circuit evaluation",
      explanation: "Python може не перевіряти другу умову, якщо результат вже відомий. Це може призвести до неочікуваної поведінки.",
      correctApproach: "Пам'ятайте про short-circuit evaluation. Якщо потрібно, щоб обидві умови завжди перевірялися, використовуйте окремі if-блоки."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Три логічні оператори:**
   - \`and\` — логічне І (обидві умови мають бути True)
   - \`or\` — логічне АБО (хоча б одна умова має бути True)
   - \`not\` — логічне НЕ (інвертує значення)

2. **Таблиці істинності:**
   - \`and\`: True тільки якщо обидві умови True
   - \`or\`: False тільки якщо обидві умови False
   - \`not\`: інвертує значення

3. **Комбінування операторів:**
   - Можна комбінувати кілька операторів разом
   - Використовуйте дужки для контролю порядку обчислення

4. **Пріоритет операторів:**
   - \`not\` — найвищий
   - \`and\` — середній
   - \`or\` — найнижчий

5. **Short-circuit evaluation:**
   - Python може не перевіряти другу умову, якщо результат вже відомий
   - Це оптимізує код, але може призвести до неочікуваної поведінки

6. **Практичне застосування:**
   - Валідація даних
   - Системи входу
   - Перевірка умов для різних сценаріїв

Тепер ви можете створювати складні умови та приймати рішення в програмах! Наступний урок — практика з операторами порівняння та логічними операторами.`,
  
  practiceTask: {
    title: "Система валідації користувача",
    description: "Створіть програму для валідації даних користувача з використанням логічних операторів",
    problemStatement: `Напишіть програму, яка:
1. Використовує дані користувача (введіть їх напряму в коді, не використовуйте input()):
   - Ім'я (не може бути порожнім)
   - Email (має містити символ @)
   - Вік (має бути від 13 до 120)
   - Чи є студентом (так/ні)
   - Чи є пенсіонером (так/ні)

2. Перевіряє всі дані та виводить:
   - Чи всі дані валідні
   - Чи має користувач право на знижку (студент АБО пенсіонер)
   - Чи може користувач зареєструватися (вік >= 13)

3. Використовуйте логічні оператори and, or, not для всіх перевірок

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді (наприклад: name = "Олександр", email = "alex@example.com", age = 20)`,
    inputFormat: `Введіть значення напряму в коді:
name = "Олександр"
email = "alex@example.com"
age = 20
is_student_input = "так"
is_pensioner_input = "ні"

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Результати валідації:
✅ Ім'я: валідне
✅ Email: валідний
✅ Вік: валідний
✅ Можна зареєструватися: так
✅ Маєте право на знижку: так`,
    examples: [
      {
        input: `Введіть ім'я: Олександр
Введіть email: alex@example.com
Введіть вік: 20
Ви студент? (так/ні): так
Ви пенсіонер? (так/ні): ні`,
        output: `=== Система реєстрації ===

Результати валідації:
Ім'я валідне: True
Email валідний: True
Вік валідний: True
Можна зареєструватися: True
Маєте право на знижку: True

Всі дані валідні: True
Маєте знижку: True`,
        explanation: "Демонструє валідацію з використанням логічних операторів."
      },
      {
        input: `Введіть ім'я: 
Введіть email: invalid-email
Введіть вік: 10
Ви студент? (так/ні): ні
Ви пенсіонер? (так/ні): ні`,
        output: `=== Система реєстрації ===

Результати валідації:
Ім'я валідне: False
Email валідний: False
Вік валідний: False
Можна зареєструватися: False
Маєте право на знижку: False

Всі дані валідні: False
Маєте знижку: False`,
        explanation: "Показує обробку невалідних даних."
      }
    ],
    solution: {
      code: `# Система валідації користувача
print("=== Система реєстрації ===")
print()

# Вводимо дані напряму в коді (не використовуємо input())
name = "Олександр"
email = "alex@example.com"
age = 20
is_student_input = "так"
is_pensioner_input = "ні"

# Конвертуємо відповіді в булеві значення
is_student = is_student_input == "так"
is_pensioner = is_pensioner_input == "так"

print()
print("Результати валідації:")

# Валідація імені (не може бути порожнім)
is_valid_name = name and len(name.strip()) > 0
print(f"Ім'я валідне: {is_valid_name}")

# Валідація email (має містити @)
is_valid_email = email and "@" in email
print(f"Email валідний: {is_valid_email}")

# Валідація віку (від 13 до 120)
is_valid_age = age >= 13 and age <= 120
print(f"Вік валідний: {is_valid_age}")

# Перевірка, чи можна зареєструватися (всі дані валідні)
can_register = is_valid_name and is_valid_email and is_valid_age
print(f"Можна зареєструватися: {can_register}")

# Перевірка знижки (студент АБО пенсіонер)
has_discount = is_student or is_pensioner
print(f"Маєте право на знижку: {has_discount}")

# Додаткова інформація
print()
print(f"Всі дані валідні: {can_register}")
print(f"Маєте знижку: {has_discount}")`,
      explanation: "Рішення використовує всі три логічні оператори (and, or, not) для валідації даних та перевірки умов. Демонструє практичне застосування логічних операторів."
    },
    hints: [
      "Введіть значення напряму в коді (name, email, age тощо) - не використовуйте input()",
      "Використовуйте and для перевірки, чи всі умови виконуються одночасно",
      "Використовуйте or для перевірки альтернативних умов (студент АБО пенсіонер)",
      "Перевірте, чи рядок не порожній: name and len(name.strip()) > 0",
      "Перевірте наявність символу в рядку: '@' in email",
      "Використовуйте and для об'єднання всіх валідацій: is_valid_name and is_valid_email and is_valid_age"
    ],
    difficulty: "beginner",
    testCases: [
      {
        input: ["Олександр", "alex@example.com", "20", "так", "ні"],
        expectedOutput: "✅ Можна зареєструватися: так",
        description: "Перевірка валідних даних"
      },
      {
        input: ["", "invalid", "10", "ні", "ні"],
        expectedOutput: "❌ Можна зареєструватися: ні",
        description: "Перевірка невалідних даних"
      },
      {
        input: ["Іван", "ivan@test.com", "25", "ні", "так"],
        expectedOutput: "✅ Маєте право на знижку: так",
        description: "Перевірка знижки для пенсіонера"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: True and False?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "Оператор and повертає True тільки якщо обидві умови True. Оскільки друга умова False, результат буде False."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: True or False?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Оператор or повертає True, якщо хоча б одна умова True. Оскільки перша умова True, результат буде True."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: not True?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "Оператор not інвертує значення. not True = False."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 20\nhas_license = True\nresult = age >= 18 and has_license\nprint(result)\n```",
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
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор має найвищий пріоритет серед логічних операторів?",
        options: [
          "and",
          "or",
          "not",
          "Всі мають однаковий пріоритет"
        ],
        correctAnswer: 2,
        explanation: "Оператор not має найвищий пріоритет, потім and, потім or."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nis_student = True\nis_pensioner = False\nresult = is_student or is_pensioner\nprint(result)\n```",
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
        id: "q7",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що поверне вираз: False and True?",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 1,
        explanation: "Оператор and повертає True тільки якщо обидві умови True. Оскільки перша умова False, результат буде False (і друга умова може не перевірятися через short-circuit evaluation)."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nresult = (True or False) and False\nprint(result)\n```",
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
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який оператор використовується для інверсії булевого значення?",
        options: [
          "and",
          "or",
          "not",
          "!"
        ],
        correctAnswer: 2,
        explanation: "Оператор not використовується для інверсії булевого значення в Python."
      },
      {
        id: "q10",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nage = 25\nhas_license = True\nhas_car = False\nresult = (age >= 18 and has_license) or has_car\nprint(result)\n```",
        options: [
          "True",
          "False",
          "Помилку",
          "None"
        ],
        correctAnswer: 0,
        explanation: "Спочатку обчислюється (age >= 18 and has_license) = (True and True) = True, потім True or has_car = True or False = True."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
