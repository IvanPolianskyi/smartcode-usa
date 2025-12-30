/**
 * Lesson 9-2: Робота з екраном, подіями та клавіатурою
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson9_2 = {
  lessonId: "lesson-9-2",
  moduleId: "module-9",
  order: 2,
  title: "Робота з екраном, подіями та клавіатурою",
  
  learningObjectives: [
    "Малювати на екрані різні об'єкти",
    "Обробляти події клавіатури",
    "Реагувати на натискання клавіш",
    "Контролювати рух об'єктів"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-9-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Малювання на екрані",
        content: `**screen.fill()** — заповнює весь екран кольором:

\`\`\`python
screen.fill((0, 0, 0))  # Чорний фон
\`\`\`

**Прямокутники:**

\`\`\`python
# Заповнений
pygame.draw.rect(screen, RED, (x, y, width, height))

# Порожній (тільки контур)
pygame.draw.rect(screen, RED, (x, y, width, height), 2)
\`\`\`

**Кола:**

\`\`\`python
# Заповнене
pygame.draw.circle(screen, BLUE, (x, y), radius)

# Порожнє
pygame.draw.circle(screen, BLUE, (x, y), radius, 2)
\`\`\`

**Лінії:**

\`\`\`python
# Проста лінія
pygame.draw.line(screen, GREEN, (x1, y1), (x2, y2), width)

# Багатокутник
points = [(100, 100), (200, 100), (150, 200)]
pygame.draw.polygon(screen, YELLOW, points)
\`\`\`

**Оновлення екрана:**

\`\`\`python
pygame.display.flip()  # Оновлює весь екран
# або
pygame.display.update()  # Оновлює частину екрана (ефективніше)
\`\`\``
      },
      {
        title: "Обробка клавіатури",
        content: `**Два способи обробки клавіатури:**

**1. Через події (event-based):**

\`\`\`python
for event in pygame.event.get():
    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_SPACE:
            print("Пробіл натиснуто!")
\`\`\`

**Переваги:** Точна обробка натискань
**Недоліки:** Не підходить для безперервного руху

**2. Через стан клавіатури (state-based):**

\`\`\`python
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    x -= speed
if keys[pygame.K_RIGHT]:
    x += speed
\`\`\`

**Переваги:** Ідеально для безперервного руху
**Недоліки:** Менш точний для одноразових дій

**Клавіші:**

\`\`\`python
pygame.K_UP, pygame.K_DOWN, pygame.K_LEFT, pygame.K_RIGHT  # Стрілки
pygame.K_SPACE  # Пробіл
pygame.K_ESCAPE  # Escape
pygame.K_RETURN  # Enter
pygame.K_a, pygame.K_b, ..., pygame.K_z  # Букви
pygame.K_0, pygame.K_1, ..., pygame.K_9  # Цифри
\`\`\`

**Комбінації клавіш:**

\`\`\`python
keys = pygame.key.get_pressed()
mods = pygame.key.get_mods()

if keys[pygame.K_s] and mods & pygame.KMOD_CTRL:
    print("Ctrl+S натиснуто!")
\`\`\``
      },
      {
        title: "Рух об'єктів",
        content: `**Базовий рух:**

\`\`\`python
x, y = 400, 300  # Початкова позиція
speed = 5

# У ігровому циклі
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    x -= speed
if keys[pygame.K_RIGHT]:
    x += speed
if keys[pygame.K_UP]:
    y -= speed
if keys[pygame.K_DOWN]:
    y += speed
\`\`\`

**Обмеження меж:**

\`\`\`python
# Не виходити за межі екрана
if x < 0:
    x = 0
elif x > WIDTH - object_width:
    x = WIDTH - object_width

if y < 0:
    y = 0
elif y > HEIGHT - object_height:
    y = HEIGHT - object_height
\`\`\`

**Плавний рух:**

\`\`\`python
# Змінювати швидкість поступово
velocity_x = 0
velocity_y = 0
acceleration = 0.5
max_speed = 5

keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    velocity_x -= acceleration
if keys[pygame.K_RIGHT]:
    velocity_x += acceleration

# Обмеження швидкості
velocity_x = max(-max_speed, min(max_speed, velocity_x))
velocity_y = max(-max_speed, min(max_speed, velocity_y))

# Оновлення позиції
x += velocity_x
y += velocity_y

# Гальмування
velocity_x *= 0.9
velocity_y *= 0.9
\`\`\``
      },
      {
        title: "Практичний приклад: Рухомий квадрат",
        content: `**Повний приклад з рухомим об'єктом:**

\`\`\`python
import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Рухомий об'єкт")
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Параметри об'єкта
x, y = WIDTH // 2, HEIGHT // 2
size = 50
speed = 5

running = True
while running:
    # Обробка подій
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
    
    # Обробка клавіатури
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and x > 0:
        x -= speed
    if keys[pygame.K_RIGHT] and x < WIDTH - size:
        x += speed
    if keys[pygame.K_UP] and y > 0:
        y -= speed
    if keys[pygame.K_DOWN] and y < HEIGHT - size:
        y += speed
    
    # Малювання
    screen.fill(BLACK)
    pygame.draw.rect(screen, RED, (x, y, size, size))
    pygame.display.flip()
    
    clock.tick(60)

pygame.quit()
\`\`\`

**Покращення:**
- Додати обертання
- Додати анімацію
- Додати звуки
- Додати колізії`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Малювання різних фігур",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    screen.fill(WHITE)
    
    # Різні фігури
    pygame.draw.rect(screen, RED, (50, 50, 100, 80))
    pygame.draw.circle(screen, BLUE, (300, 200), 60)
    pygame.draw.line(screen, GREEN, (0, 0), (800, 600), 5)
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Демонструє малювання різних фігур: прямокутник, коло, лінія."
    },
    {
      title: "Приклад 2: Рух стрілками",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
YELLOW = (255, 255, 0)

x, y = 400, 300
speed = 5

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        x -= speed
    if keys[pygame.K_RIGHT]:
        x += speed
    if keys[pygame.K_UP]:
        y -= speed
    if keys[pygame.K_DOWN]:
        y += speed
    
    # Обмеження меж
    x = max(0, min(800, x))
    y = max(0, min(600, y))
    
    screen.fill(BLACK)
    pygame.draw.circle(screen, YELLOW, (x, y), 30)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Створює об'єкт, який рухається стрілками та не виходить за межі екрана."
    },
    {
      title: "Приклад 3: Обробка різних клавіш",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

color = WHITE

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r:
                color = (255, 0, 0)  # Червоний
            elif event.key == pygame.K_g:
                color = (0, 255, 0)  # Зелений
            elif event.key == pygame.K_b:
                color = (0, 0, 255)  # Синій
            elif event.key == pygame.K_SPACE:
                color = WHITE  # Білий
    
    screen.fill(BLACK)
    pygame.draw.circle(screen, color, (400, 300), 100)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Демонструє зміну кольору об'єкта при натисканні різних клавіш."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання event-based для безперервного руху",
      explanation: "event.KEYDOWN спрацьовує один раз, не підходить для безперервного руху.",
      correctApproach: "Використовуйте pygame.key.get_pressed() для безперервного руху."
    },
    {
      mistake: "Не обмежувати рух межами екрана",
      explanation: "Об'єкт може вийти за межі екрана та стати невидимим.",
      correctApproach: "Перевіряйте межі перед зміною позиції: if x > 0: x -= speed"
    },
    {
      mistake: "Забути screen.fill() перед малюванням",
      explanation: "Без fill() попередні кадри залишаться на екрані, створюючи 'слід'.",
      correctApproach: "Завжди викликайте screen.fill() на початку малювання."
    },
    {
      mistake: "Не оновлювати екран після малювання",
      explanation: "Без pygame.display.flip() зміни не відобразяться.",
      correctApproach: "Викликайте pygame.display.flip() після всього малювання."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Малювання** — pygame.draw для різних фігур
2. **Обробка клавіатури** — event-based та state-based підходи
3. **Рух об'єктів** — оновлення позиції в циклі
4. **Обмеження меж** — перевірка, щоб об'єкт не вийшов за межі
5. **Плавний рух** — використання швидкості та прискорення

Тепер ви можете створювати інтерактивні об'єкти, які рухаються!`,
  
  practiceTask: {
    title: "Рухомий об'єкт з контролем",
    description: "Створіть гру з рухомим об'єктом",
    problemStatement: `Створіть програму, яка:
1. Має об'єкт (квадрат або коло), який рухається стрілками
2. Об'єкт не виходить за межі екрана
3. При натисканні пробілу об'єкт збільшується
4. При натисканні Shift об'єкт зменшується
5. Показує поточну позицію об'єкта`,
    inputFormat: "Користувач натискає клавіші",
    outputFormat: "Об'єкт рухається та змінює розмір",
    examples: [
      {
        input: "Стрілки для руху, пробіл для збільшення",
        output: "Об'єкт рухається та змінює розмір",
        explanation: "Гра обробляє різні клавіші для різних дій"
      }
    ],
    solution: {
      code: `import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Рухомий об'єкт")
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
GREEN = (0, 255, 0)

# Параметри об'єкта
x, y = WIDTH // 2, HEIGHT // 2
size = 50
speed = 5

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                size = min(100, size + 10)  # Збільшення
            elif event.key == pygame.K_LSHIFT or event.key == pygame.K_RSHIFT:
                size = max(20, size - 10)  # Зменшення
    
    # Рух
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and x > size // 2:
        x -= speed
    if keys[pygame.K_RIGHT] and x < WIDTH - size // 2:
        x += speed
    if keys[pygame.K_UP] and y > size // 2:
        y -= speed
    if keys[pygame.K_DOWN] and y < HEIGHT - size // 2:
        y += speed
    
    # Малювання
    screen.fill(BLACK)
    pygame.draw.circle(screen, GREEN, (x, y), size)
    
    # Показ позиції
    font = pygame.font.Font(None, 36)
    text = font.render(f"Позиція: ({x}, {y})", True, (255, 255, 255))
    screen.blit(text, (10, 10))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Створює інтерактивний об'єкт, який рухається стрілками та змінює розмір при натисканні пробілу або Shift."
    },
    hints: [
      "Використовуйте pygame.key.get_pressed() для руху",
      "Використовуйте event.KEYDOWN для одноразових дій (пробіл, Shift)",
      "Перевіряйте межі з урахуванням розміру об'єкта",
      "Використовуйте pygame.font для відображення тексту"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод краще для безперервного руху?",
        options: ["event.KEYDOWN", "pygame.key.get_pressed()", "Обидва однаково", "Нічого"],
        correctAnswer: 1,
        explanation: "pygame.key.get_pressed() повертає поточний стан клавіатури, ідеально для безперервного руху."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить pygame.draw.rect(screen, RED, (100, 50, 200, 150))?",
        options: ["Малює коло", "Малює прямокутник на позиції (100, 50) розміром 200x150", "Малює лінію", "Помилку"],
        correctAnswer: 1,
        explanation: "Малює червоний прямокутник: x=100, y=50, ширина=200, висота=150."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо викликати screen.fill() перед малюванням?",
        options: ["Щоб очистити попередній кадр", "Щоб змінити колір", "Не потрібно", "Щоб прискорити"],
        correctAnswer: 0,
        explanation: "screen.fill() очищає екран від попереднього кадру, інакше об'єкти залишатимуть 'слід'."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

