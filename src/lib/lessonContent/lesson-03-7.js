/**
 * Lesson 03-7: Область видимості змінних
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_03_7 = {
  lessonId: "lesson-03-7",
  moduleId: "module-03",
  order: 7,
  title: "Область видимості змінних",
  
  learningObjectives: [
    "Розуміти, що таке область видимості змінних",
    "Застосовувати правило LEGB для пошуку змінних",
    "Розрізняти локальні та глобальні змінні",
    "Використовувати ключове слово global",
    "Розуміти роботу з вкладеними функціями",
    "Використовувати globals() та locals() для діагностики"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-03-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке область видимості?",
        content: `Область видимості (scope) визначає, де в коді можна використовувати змінну. Коли ви створюєте змінну в Python, вона зберігається в просторі імен (namespace), і Python використовує правила області видимості, щоб визначити, яку змінну ви маєте на увазі.

**Простий приклад:**

\`\`\`python
x = 25  # Глобальна змінна

def printer():
    x = 50  # Локальна змінна
    return x

print(x)        # Виведе: 25 (глобальна змінна)
print(printer())  # Виведе: 50 (локальна змінна)
\`\`\`

**Як Python визначає, яку змінну використовувати?**

Python використовує правило LEGB для пошуку змінних:
- **L** — Local (локальна)
- **E** — Enclosing (вкладені функції)
- **G** — Global (глобальна)
- **B** — Built-in (вбудована)

Python шукає змінну в такому порядку, зупиняючись на першій знайденій.`
      },
      {
        title: "Правило LEGB",
        content: `**LEGB** — це акронім, який описує порядок пошуку змінних в Python:

**L: Local (Локальна)**
- Змінні, визначені всередині функції
- Параметри функції
- Змінні, створені всередині функції

\`\`\`python
def example():
    x = 10  # Локальна змінна
    return x

# x тут не доступна (помилка, якщо спробувати використати)
\`\`\`

**E: Enclosing (Вкладені функції)**
- Змінні з функцій, які містять поточну функцію
- Працює для вкладених функцій

\`\`\`python
def outer():
    x = "outer"  # Змінна вкладеного простору
    
    def inner():
        print(x)  # Використовує x з outer()
    
    inner()

outer()  # Виведе: "outer"
\`\`\`

**G: Global (Глобальна)**
- Змінні, визначені на рівні модуля (файлу)
- Доступні в будь-якому місці модуля

\`\`\`python
x = "global"  # Глобальна змінна

def example():
    print(x)  # Використовує глобальну x

example()  # Виведе: "global"
\`\`\`

**B: Built-in (Вбудована)**
- Вбудовані функції та змінні Python
- Наприклад: \`len\`, \`print\`, \`range\`, \`str\`, \`int\`

\`\`\`python
# len — вбудована функція
result = len([1, 2, 3])  # Використовує вбудовану len
\`\`\`

**Важливо:** Python шукає змінну в такому порядку: спочатку Local, потім Enclosing, потім Global, нарешті Built-in. Якщо знайдено, пошук припиняється.`
      },
      {
        title: "Локальні змінні",
        content: `Змінні, визначені всередині функції, називаються локальними. Вони доступні тільки всередині цієї функції.

**Приклад:**

\`\`\`python
x = 50  # Глобальна змінна

def func(x):
    """
    x тут — це параметр (локальна змінна)
    """
    print(f'x is {x}')  # Використовує параметр x
    x = 2  # Змінює локальну змінну x
    print(f'Changed local x to {x}')

func(x)  # Передаємо глобальну x як аргумент
print(f'x is still {x}')  # Глобальна x не змінилася
\`\`\`

**Виведення:**
\`\`\`
x is 50
Changed local x to 2
x is still 50
\`\`\`

**Важливі моменти:**

1. **Локальні змінні не впливають на глобальні:**
\`\`\`python
x = 10

def change_x():
    x = 20  # Створює нову локальну змінну
    print(f"Inside function: {x}")

change_x()  # Виведе: Inside function: 20
print(f"Outside function: {x}")  # Виведе: Outside function: 10
\`\`\`

2. **Змінні створюються в момент присвоєння:**
\`\`\`python
def example():
    print(x)  # ❌ Помилка! x ще не визначена локально
    x = 5     # x стає локальною змінною

# Навіть якщо є глобальна x, Python вважає, що x локальна
# через присвоєння нижче, тому виникає помилка
\`\`\`

3. **Параметри функції — це локальні змінні:**
\`\`\`python
def example(param):
    print(param)  # param — локальна змінна
    param = 10    # Змінює локальну змінну
    return param

result = example(5)  # param = 5 всередині функції
\`\`\``
      },
      {
        title: "Глобальні змінні",
        content: `Глобальні змінні визначені на рівні модуля (файлу) і доступні в будь-якому місці коду.

**Читання глобальних змінних:**

\`\`\`python
x = 50  # Глобальна змінна

def read_global():
    print(x)  # Можна читати глобальну змінну

read_global()  # Виведе: 50
\`\`\`

**Зміна глобальних змінних:**

Для зміни глобальної змінної всередині функції потрібно використати ключове слово \`global\`:

\`\`\`python
x = 50  # Глобальна змінна

def change_global():
    global x  # Оголошуємо, що x — глобальна
    print('This function is now using the global x!')
    print(f'Because of global x is: {x}')
    x = 2  # Змінює глобальну змінну
    print(f'Ran change_global(), changed global x to {x}')

print(f'Before calling change_global(), x is: {x}')  # 50
change_global()
print(f'Value of x (outside of change_global()) is: {x}')  # 2
\`\`\`

**Виведення:**
\`\`\`
Before calling change_global(), x is: 50
This function is now using the global x!
Because of global x is: 50
Ran change_global(), changed global x to 2
Value of x (outside of change_global()) is: 2
\`\`\`

**Кілька глобальних змінних:**

\`\`\`python
x = 10
y = 20
z = 30

def change_globals():
    global x, y, z  # Можна оголосити кілька
    x = 100
    y = 200
    z = 300

change_globals()
print(x, y, z)  # 100 200 300
\`\`\`

**Коли використовувати global:**

- ✅ Для лічильників, налаштувань
- ✅ Коли потрібно змінити стан на рівні модуля
- ❌ Краще уникати, коли можна передати значення через параметри`
      },
      {
        title: "Вкладені функції (Enclosing)",
        content: `Коли функція визначена всередині іншої функції, внутрішня функція може використовувати змінні зовнішньої функції.

**Приклад:**

\`\`\`python
name = 'This is a global name'  # Глобальна змінна

def greet():
    """
    Зовнішня функція
    """
    name = 'Sammy'  # Змінна вкладеного простору
    
    def hello():
        """
        Внутрішня функція
        """
        print('Hello ' + name)  # Використовує name з greet()
    
    hello()

greet()  # Виведе: Hello Sammy
print(name)  # Виведе: This is a global name (глобальна не змінилася)
\`\`\`

**Порядок пошуку:**

1. Спочатку шукає в локальному просторі (hello)
2. Потім у вкладеному просторі (greet)
3. Потім у глобальному просторі
4. Нарешті у вбудованому просторі

**Більш складний приклад:**

\`\`\`python
x = "global"

def outer():
    x = "outer"
    
    def middle():
        x = "middle"
        
        def inner():
            print(x)  # Використовує x з middle()
        
        inner()
    
    middle()

outer()  # Виведе: "middle"
\`\`\`

**nonlocal — зміна змінної вкладеного простору:**

Якщо потрібно змінити змінну з вкладеного простору (але не глобальну), використовуйте \`nonlocal\`:

\`\`\`python
def outer():
    x = "outer"
    
    def inner():
        nonlocal x  # Оголошуємо, що x з вкладеного простору
        x = "changed in inner"
        print(f"Inner: {x}")
    
    print(f"Before inner: {x}")  # outer
    inner()
    print(f"After inner: {x}")  # changed in inner

outer()
\`\`\`

**Виведення:**
\`\`\`
Before inner: outer
Inner: changed in inner
After inner: changed in inner
\`\`\``
      },
      {
        title: "Вбудовані змінні (Built-in)",
        content: `Вбудовані змінні — це функції та змінні, які доступні в Python за замовчуванням.

**Приклади вбудованих функцій:**

\`\`\`python
# Вбудовані функції
print("Привіт")      # print — вбудована функція
length = len([1, 2, 3])  # len — вбудована функція
numbers = range(10)  # range — вбудована функція
text = str(123)      # str — вбудована функція
\`\`\`

**Важливо: Не перевизначайте вбудовані імена!**

\`\`\`python
# Неправильно:
len = 10  # ❌ Перевизначаємо вбудовану функцію len
result = len([1, 2, 3])  # ❌ Помилка! len тепер число, а не функція

# Правильно:
my_length = 10  # ✅ Використовуємо інше ім'я
result = len([1, 2, 3])  # ✅ len працює як функція
\`\`\`

**Перевірка вбудованих змінних:**

\`\`\`python
import builtins

# Подивитися всі вбудовані імена
print(dir(builtins))
\`\`\`

**Приклад конфлікту:**

\`\`\`python
# Глобальна змінна з ім'ям вбудованої функції
str = "Це не функція str!"

def example():
    # Спробуємо використати str як функцію
    result = str(123)  # ❌ Помилка! str тепер рядок, а не функція

# Краще:
my_string = "Це рядок"
result = str(123)  # ✅ str працює як функція
\`\`\``
      },
      {
        title: "globals() та locals()",
        content: `Python надає функції для перегляду поточних глобальних та локальних змінних.

**globals()** — повертає словник з усіма глобальними змінними:

\`\`\`python
x = 10
y = 20

def example():
    z = 30
    print("Globals:", globals().keys())  # Показує ключі глобальних змінних
    print("Locals:", locals().keys())    # Показує ключі локальних змінних

example()
\`\`\`

**locals()** — повертає словник з усіма локальними змінними:

\`\`\`python
def example():
    a = 1
    b = 2
    c = 3
    
    print("Local variables:", locals())
    # Виведе: {'a': 1, 'b': 2, 'c': 3, ...}

example()
\`\`\`

**Практичне використання:**

\`\`\`python
# Перевірка наявності змінної
def check_variable(name):
    if name in globals():
        print(f"{name} is a global variable")
        print(f"Value: {globals()[name]}")
    else:
        print(f"{name} is not a global variable")

x = 10
check_variable("x")  # x is a global variable, Value: 10
check_variable("y")  # y is not a global variable
\`\`\`

**Діагностика проблем:**

\`\`\`python
def debug_scope():
    x = "local"
    print("Local variables:", list(locals().keys()))
    print("Global variables (sample):", [k for k in globals().keys() if not k.startswith('_')][:5])

debug_scope()
\`\`\`

**Важливо:**

- \`globals()\` та \`locals()\` повертають словники
- Ці словники можна змінювати (але це не рекомендується)
- Корисно для діагностики та налагодження`
      },
      {
        title: "Практичні приклади та поради",
        content: `**Приклад 1: Лічильник з глобальною змінною**

\`\`\`python
counter = 0  # Глобальний лічильник

def increment():
    global counter
    counter += 1
    return counter

def reset():
    global counter
    counter = 0

increment()  # 1
increment()  # 2
print(counter)  # 2
reset()
print(counter)  # 0
\`\`\`

**Приклад 2: Налаштування**

\`\`\`python
DEBUG = False  # Глобальне налаштування

def set_debug(value):
    global DEBUG
    DEBUG = value

def log(message):
    if DEBUG:
        print(f"[DEBUG] {message}")

log("Це не виведеться")  # Не виведеться
set_debug(True)
log("Це виведеться")  # [DEBUG] Це виведеться
\`\`\`

**Приклад 3: Вкладені функції з замиканнями**

\`\`\`python
def create_multiplier(n):
    """
    Створює функцію, яка множить на n
    """
    def multiplier(x):
        return x * n  # Використовує n з зовнішньої функції
    return multiplier

double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15
\`\`\`

**Поради:**

1. **Уникайте глобальних змінних, коли можливо:**
   - Краще передавати значення через параметри
   - Глобальні змінні ускладнюють тестування та підтримку

2. **Використовуйте локальні змінні:**
   - Ізольовані в функції
   - Не конфліктують з іншими частинами коду

3. **Використовуйте вкладені функції для організації:**
   - Допомагають групувати пов'язаний код
   - Створюють замикання (closures)

4. **Не перевизначайте вбудовані імена:**
   - Використовуйте інші імена для змінних`
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили область видимості змінних:

**Ключові концепції:**

1. **Область видимості (Scope)**
   - Визначає, де в коді можна використовувати змінну
   - Python використовує правило LEGB для пошуку змінних

2. **Правило LEGB**
   - **L** — Local (локальна): змінні всередині функції
   - **E** — Enclosing (вкладені): змінні з зовнішніх функцій
   - **G** — Global (глобальна): змінні на рівні модуля
   - **B** — Built-in (вбудована): вбудовані функції Python

3. **Локальні змінні**
   - Визначені всередині функції
   - Не впливають на глобальні змінні
   - Створюються в момент присвоєння

4. **Глобальні змінні**
   - Визначені на рівні модуля
   - Для зміни потрібно ключове слово \`global\`
   - Краще уникати, коли можна передати через параметри

5. **Вкладені функції**
   - Можуть використовувати змінні з зовнішніх функцій
   - Для зміни потрібно ключове слово \`nonlocal\`
   - Створюють замикання (closures)

6. **Діагностика**
   - \`globals()\` — перегляд глобальних змінних
   - \`locals()\` — перегляд локальних змінних

**Важливі правила:**

- Python шукає змінну в порядку LEGB
- Локальні змінні не впливають на глобальні без \`global\`
- Не перевизначайте вбудовані імена
- Використовуйте локальні змінні, коли можливо

**Наступний крок:**

У наступному уроці ми дізнаємося про рекурсію — коли функція викликає сама себе.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Локальні та глобальні змінні",
      code: `x = 50  # Глобальна змінна

def func(x):
    print(f'x is {x}')  # Використовує параметр x
    x = 2  # Змінює локальну змінну
    print(f'Changed local x to {x}')

func(x)
print(f'x is still {x}')  # Глобальна x не змінилася`,
      explanation: "Демонструє різницю між локальними та глобальними змінними. Локальна змінна не впливає на глобальну."
    },
    {
      title: "Використання global",
      code: `x = 50  # Глобальна змінна

def change_global():
    global x  # Оголошуємо, що x — глобальна
    x = 2  # Змінює глобальну змінну
    print(f'Changed global x to {x}')

print(f'Before: {x}')  # 50
change_global()
print(f'After: {x}')  # 2`,
      explanation: "Показує, як використовувати ключове слово global для зміни глобальної змінної всередині функції."
    },
    {
      title: "Вкладені функції",
      code: `name = 'Global name'  # Глобальна змінна

def greet():
    name = 'Sammy'  # Змінна вкладеного простору
    
    def hello():
        print('Hello ' + name)  # Використовує name з greet()
    
    hello()

greet()  # Виведе: Hello Sammy
print(name)  # Виведе: Global name`,
      explanation: "Демонструє використання змінних з вкладеного простору (Enclosing) у вкладених функціях."
    },
    {
      title: "Використання nonlocal",
      code: `def outer():
    x = "outer"
    
    def inner():
        nonlocal x  # Оголошуємо, що x з вкладеного простору
        x = "changed in inner"
        print(f"Inner: {x}")
    
    print(f"Before: {x}")  # outer
    inner()
    print(f"After: {x}")  # changed in inner

outer()`,
      explanation: "Показує використання nonlocal для зміни змінної з вкладеного простору (але не глобальної)."
    },
    {
      title: "globals() та locals()",
      code: `x = 10
y = 20

def example():
    a = 1
    b = 2
    print("Local variables:", list(locals().keys()))
    print("Global x:", globals()['x'])

example()`,
      explanation: "Демонструє використання globals() та locals() для перегляду поточних змінних."
    },
    {
      title: "Замикання (Closure)",
      code: `def create_multiplier(n):
    """
    Створює функцію, яка множить на n
    """
    def multiplier(x):
        return x * n  # Використовує n з зовнішньої функції
    return multiplier

double = create_multiplier(2)
print(double(5))  # 10`,
      explanation: "Практичний приклад замикання — внутрішня функція 'запам'ятовує' змінну з зовнішньої функції."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба змінити глобальну змінну без global",
      explanation: "Початківці часто намагаються змінити глобальну змінну без ключового слова global.",
      correctApproach: `# Неправильно:
x = 10

def change():
    x = 20  # ❌ Створює нову локальну змінну, не змінює глобальну
    print(x)

change()  # 20
print(x)  # 10 (не змінилася!)

# Правильно:
x = 10

def change():
    global x  # ✅ Оголошуємо global
    x = 20  # Тепер змінює глобальну
    print(x)

change()  # 20
print(x)  # 20 (змінилася!)`
    },
    {
      mistake: "Помилка UnboundLocalError",
      explanation: "Якщо в функції є присвоєння змінній, Python вважає її локальною, навіть якщо вона використовується до присвоєння.",
      correctApproach: `# Неправильно:
x = 10

def example():
    print(x)  # ❌ Помилка! x вважається локальною через присвоєння нижче
    x = 20

# Правильно:
x = 10

def example():
    global x  # ✅ Оголошуємо global
    print(x)  # 10
    x = 20

# Або:
x = 10

def example():
    local_x = x  # ✅ Спочатку читаємо глобальну
    print(local_x)  # 10
    local_x = 20  # Змінюємо локальну`
    },
    {
      mistake: "Плутанина між global та nonlocal",
      explanation: "Початківці плутають, коли використовувати global, а коли nonlocal.",
      correctApproach: `# global — для змінних на рівні модуля
x = 10  # Глобальна

def outer():
    def inner():
        global x  # ✅ Звертається до глобальної x
        x = 20

# nonlocal — для змінних з вкладеного простору
def outer():
    x = 10  # Вкладеного простору
    
    def inner():
        nonlocal x  # ✅ Звертається до x з outer()
        x = 20`
    },
    {
      mistake: "Перевизначення вбудованих імен",
      explanation: "Початківці іноді випадково перевизначають вбудовані функції, що призводить до помилок.",
      correctApproach: `# Неправильно:
len = 10  # ❌ Перевизначаємо вбудовану функцію
result = len([1, 2, 3])  # ❌ Помилка!

# Правильно:
my_length = 10  # ✅ Використовуємо інше ім'я
result = len([1, 2, 3])  # ✅ len працює як функція`
    }
  ],
  
  summary: `На цьому уроці ми вивчили область видимості змінних:

1. Область видимості (Scope)
   - Визначає, де в коді можна використовувати змінну
   - Python використовує правило LEGB для пошуку змінних

2. Правило LEGB
   - L — Local: змінні всередині функції
   - E — Enclosing: змінні з зовнішніх функцій
   - G — Global: змінні на рівні модуля
   - B — Built-in: вбудовані функції Python

3. Локальні змінні
   - Визначені всередині функції
   - Не впливають на глобальні без global

4. Глобальні змінні
   - Визначені на рівні модуля
   - Для зміни потрібно ключове слово global
   - Краще уникати, коли можна передати через параметри

5. Вкладені функції
   - Можуть використовувати змінні з зовнішніх функцій
   - Для зміни потрібно nonlocal
   - Створюють замикання (closures)

6. Діагностика
   - globals() — перегляд глобальних змінних
   - locals() — перегляд локальних змінних

Розуміння області видимості допомагає писати більш структурований та передбачуваний код!`,
  
  practiceTask: {
    title: "Робота з областю видимості змінних",
    description: "Створіть функції, які демонструють різні аспекти області видимості змінних",
    problemStatement: `Напишіть програму, яка демонструє роботу з областю видимості змінних:

1. **local_example** — демонструє локальні змінні
   - Створює локальну змінну всередині функції
   - Показує, що локальна змінна не впливає на глобальну
   - Повертає значення локальної змінної

2. **global_counter** — лічильник з глобальною змінною
   - Використовує глобальну змінну counter
   - Функція increment() збільшує лічильник
   - Функція reset() скидає лічильник
   - Функція get_count() повертає поточне значення

3. **nested_example** — вкладені функції
   - Зовнішня функція outer() містить змінну
   - Внутрішня функція inner() використовує змінну з outer()
   - Демонструє роботу з вкладеними просторами

4. **closure_example** — замикання
   - Функція create_adder(n) створює функцію, яка додає n
   - Внутрішня функція "запам'ятовує" значення n
   - Створіть кілька функцій з різними значеннями n

**Важливо:** Не використовуйте функцію input(). Введіть значення напряму в коді.

Створіть приклади використання всіх функцій та виведіть результати.`,
    inputFormat: `Введіть значення напряму в коді:
# Глобальні змінні визначаються на рівні модуля
counter = 0

**Примітка:** Не використовуйте input(), введіть значення напряму в коді`,
    outputFormat: `Приклад виведення:
Локальна змінна: 20
Глобальна змінна: 10
Лічильник: 1
Лічильник після increment: 2
Лічильник після reset: 0
Outer: outer_value
Inner: outer_value
Adder(5): 8
Adder(10): 13`,
    examples: [
      {
        input: "x = 10 (глобальна змінна)",
        output: `Локальна змінна: 20
Глобальна змінна: 10
Лічильник: 0
Лічильник після increment: 1
Лічильник після reset: 0
Outer: outer_value
Inner: outer_value
Adder(5): 8
Adder(10): 13`,
        explanation: "Демонструє роботу з локальними, глобальними та вкладеними змінними."
      },
      {
        input: "Множинні виклики increment()",
        output: `Лічильник: 0
Після 3 викликів increment: 3
Після reset: 0
Після ще 2 викликів: 2`,
        explanation: "Демонструє збереження стану глобальної змінної між викликами функцій."
      },
      {
        input: "Різні замикання",
        output: `Adder(5) з n=3: 8
Adder(5) з n=7: 12
Multiplier(4) з n=2: 8
Multiplier(4) з n=5: 20`,
        explanation: "Демонструє створення різних функцій через замикання з різними значеннями."
      }
    ],
    solution: {
      code: `# Робота з областю видимості змінних

# Глобальна змінна
x = 10
counter = 0

# 1. Демонстрація локальних змінних
def local_example():
    """
    Демонструє локальні змінні
    """
    x = 20  # Локальна змінна (не впливає на глобальну)
    return x

# 2. Лічильник з глобальною змінною
def increment():
    """
    Збільшує глобальний лічильник
    """
    global counter
    counter += 1
    return counter

def reset():
    """
    Скидає глобальний лічильник
    """
    global counter
    counter = 0

def get_count():
    """
    Повертає поточне значення лічильника
    """
    return counter

# 3. Вкладені функції
def outer():
    """
    Зовнішня функція з вкладеногою
    """
    outer_var = "outer_value"
    
    def inner():
        """
        Внутрішня функція, яка використовує змінну з outer()
        """
        print(f"Inner: {outer_var}")
    
    print(f"Outer: {outer_var}")
    inner()
    return inner

# 4. Замикання
def create_adder(n):
    """
    Створює функцію, яка додає n до аргументу
    """
    def adder(x):
        return x + n  # Використовує n з зовнішньої функції
    return adder

def create_multiplier(n):
    """
    Створює функцію, яка множить аргумент на n
    """
    def multiplier(x):
        return x * n
    return multiplier

# Вводимо значення напряму в коді (не використовуємо input())

# Приклад 1: Локальні змінні
local_x = local_example()
print(f"Локальна змінна: {local_x}")
print(f"Глобальна змінна: {x}")  # Глобальна не змінилася

print()

# Приклад 2: Глобальний лічильник
print(f"Лічильник: {get_count()}")
increment()
print(f"Лічильник після increment: {get_count()}")
increment()
print(f"Лічильник після ще одного increment: {get_count()}")
reset()
print(f"Лічильник після reset: {get_count()}")

print()

# Приклад 3: Вкладені функції
inner_func = outer()

print()

# Приклад 4: Замикання
adder_3 = create_adder(3)
adder_7 = create_adder(7)

print(f"Adder(5) з n=3: {adder_3(5)}")
print(f"Adder(5) з n=7: {adder_7(5)}")

multiplier_2 = create_multiplier(2)
multiplier_5 = create_multiplier(5)

print(f"Multiplier(4) з n=2: {multiplier_2(4)}")
print(f"Multiplier(4) з n=5: {multiplier_5(4)}")`,
      explanation: "Рішення демонструє різні аспекти області видимості: локальні змінні, глобальні змінні з ключовим словом global, вкладені функції та замикання. Кожна функція показує різний рівень області видимості."
    },
    hints: [
      "Введіть значення напряму в коді - не використовуйте input()",
      "Для зміни глобальної змінної використовуйте ключове слово global",
      "Локальні змінні не впливають на глобальні без global",
      "Вкладені функції можуть використовувати змінні з зовнішніх функцій",
      "Замикання створюються, коли внутрішня функція 'запам'ятовує' змінну з зовнішньої",
      "Для зміни змінної з вкладеного простору використовуйте nonlocal (якщо потрібно)",
      "Глобальні змінні визначаються на рівні модуля (поза функціями)",
      "Використовуйте локальні змінні, коли можливо, щоб уникнути конфліктів"
    ],
    difficulty: "intermediate",
    testCases: [
      {
        input: [],
        expectedOutput: "Локальна змінна: 20",
        description: "Перевірка локальних змінних"
      },
      {
        input: [],
        expectedOutput: "Лічильник після increment: 1",
        description: "Перевірка глобального лічильника"
      },
      {
        input: [],
        expectedOutput: "Adder(5) з n=3: 8",
        description: "Перевірка замикання"
      }
    ]
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає акронім LEGB?",
        options: [
          "Local, Enclosing, Global, Built-in — порядок пошуку змінних",
          "Локальні, Експортні, Глобальні, Базові змінні",
          "Лінійні, Експоненційні, Геометричні, Бінарні",
          "Це не акронім"
        ],
        correctAnswer: 0,
        explanation: "LEGB — це порядок пошуку змінних в Python: спочатку Local (локальна), потім Enclosing (вкладені функції), потім Global (глобальна), нарешті Built-in (вбудована)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чи можна змінити глобальну змінну всередині функції без ключового слова global?",
        options: [
          "Ні, потрібно використати global",
          "Так, завжди можна",
          "Тільки для читання",
          "Тільки для деяких типів даних"
        ],
        correctAnswer: 0,
        explanation: "Для зміни глобальної змінної всередині функції потрібно використати ключове слово global. Без нього Python створить нову локальну змінну."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\n\ndef func():\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, потім 10",
          "10, потім 20",
          "10, потім 10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "Всередині func() створюється локальна змінна x=20, тому виводиться 20. Глобальна x=10 не змінилася, тому зовні виводиться 10."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке замикання (closure)?",
        options: [
          "Функція, яка 'запам'ятовує' змінні з зовнішнього простору",
          "Спосіб закриття програми",
          "Тип даних в Python",
          "Синтаксична помилка"
        ],
        correctAnswer: 0,
        explanation: "Замикання — це функція, яка зберігає посилання на змінні з зовнішнього простору (enclosing scope), навіть після того, як зовнішня функція завершила виконання."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\n\ndef outer():\n    x = 20\n    def inner():\n        print(x)\n    inner()\n\nouter()\nprint(x)\n```",
        options: [
          "20, потім 10",
          "10, потім 20",
          "10, потім 10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "inner() використовує x з вкладеного простору (outer), тому виводиться 20. Глобальна x=10 не змінилася, тому зовні виводиться 10."
      },
      {
        id: "q6",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Коли використовувати nonlocal замість global?",
        options: [
          "Коли потрібно змінити змінну з вкладеного простору (але не глобальну)",
          "Коли потрібно змінити глобальну змінну",
          "Коли потрібно створити нову локальну змінну",
          "nonlocal не існує в Python"
        ],
        correctAnswer: 0,
        explanation: "nonlocal використовується для зміни змінної з вкладеного простору (enclosing scope), але не глобальної. global використовується для зміни глобальної змінної."
      },
      {
        id: "q7",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що виведе цей код?\n\n```python\nx = 10\n\ndef func():\n    global x\n    x = 20\n    print(x)\n\nfunc()\nprint(x)\n```",
        options: [
          "20, потім 20",
          "10, потім 20",
          "20, потім 10",
          "Помилку"
        ],
        correctAnswer: 0,
        explanation: "global x оголошує, що x — глобальна змінна, тому x = 20 змінює глобальну змінну. Обидва виводи показують 20."
      },
      {
        id: "q8",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Локальні змінні доступні поза функцією, де вони визначені.",
        options: [
          "False",
          "True"
        ],
        correctAnswer: 0,
        explanation: "Ні, локальні змінні доступні тільки всередині функції, де вони визначені. Поза функцією вони не доступні."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
