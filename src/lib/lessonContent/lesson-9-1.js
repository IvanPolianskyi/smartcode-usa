/**
 * Lesson 9-1: Вступ до Pygame. Ігровий цикл
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson9_1 = {
  lessonId: "lesson-9-1",
  moduleId: "module-9",
  order: 1,
  title: "Вступ до Pygame. Ігровий цикл",
  
  learningObjectives: [
    "Встановити Pygame",
    "Створити ігрове вікно",
    "Розуміти ігровий цикл",
    "Оновлювати екран"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-8-6"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке Pygame?",
        content: `**Pygame** — бібліотека Python для створення ігор та мультимедійних додатків.

**Переваги Pygame:**
- **Простий** — легкий для початківців
- **Потужний** — можна створювати складні ігри
- **Кросплатформенний** — працює на Windows, Mac, Linux
- **Безкоштовний** — повністю безкоштовний
- **Документація** — багато прикладів та документації

**Що можна створювати:**
- 2D ігри
- Симуляції
- Інтерактивні додатки
- Візуалізації

**Встановлення:**

\`\`\`bash
pip install pygame
\`\`\`

**Перевірка встановлення:**

\`\`\`python
import pygame
print(pygame.version.ver)  # Виведе версію
\`\`\``
      },
      {
        title: "Створення ігрового вікна",
        content: `**Ініціалізація Pygame:**

\`\`\`python
import pygame

pygame.init()  # Ініціалізує всі модулі Pygame
\`\`\`

**Створення вікна:**

\`\`\`python
# Розміри вікна
WIDTH = 800
HEIGHT = 600

# Створення вікна
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Моя гра")
\`\`\`

**Кольори:**

\`\`\`python
# Визначення кольорів (RGB)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
\`\`\`

**Заповнення екрана:**

\`\`\`python
screen.fill(WHITE)  # Заповнює екран білим кольором
pygame.display.flip()  # Оновлює екран
\`\`\`

**Закриття:**

\`\`\`python
pygame.quit()  # Закриває Pygame
\`\`\``
      },
      {
        title: "Ігровий цикл",
        content: `**Ігровий цикл** — це цикл, який постійно виконується під час роботи гри.

**Структура ігрового циклу:**

\`\`\`python
running = True

while running:
    # 1. Обробка подій
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # 2. Оновлення стану гри
    # (рух об'єктів, перевірка колізій тощо)
    
    # 3. Малювання
    screen.fill(BLACK)
    # Малюємо об'єкти
    pygame.display.flip()
    
    # 4. Контроль FPS (опціонально)
    clock.tick(60)  # 60 кадрів на секунду
\`\`\`

**Кроки циклу:**

1. **Обробка подій** — перевірка подій (клавіатура, миша, закриття)
2. **Оновлення** — зміна позицій об'єктів, логіка гри
3. **Малювання** — відображення об'єктів на екрані
4. **Оновлення екрана** — показ намальованого

**Clock для контролю FPS:**

\`\`\`python
clock = pygame.time.Clock()

while running:
    # ... код гри ...
    clock.tick(60)  # Обмежує до 60 FPS
\`\`\`

**Повний приклад:**

\`\`\`python
import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Моя перша гра")
clock = pygame.time.Clock()

running = True
while running:
    # Обробка подій
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Малювання
    screen.fill((0, 0, 0))  # Чорний фон
    pygame.display.flip()
    
    clock.tick(60)

pygame.quit()
\`\`\``
      },
      {
        title: "Події (Events)",
        content: `**pygame.event.get()** — отримує всі події.

**Основні типи подій:**

\`\`\`python
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        # Закриття вікна
        running = False
    
    elif event.type == pygame.KEYDOWN:
        # Натискання клавіші
        if event.key == pygame.K_ESCAPE:
            running = False
        elif event.key == pygame.K_SPACE:
            print("Пробіл натиснуто!")
    
    elif event.type == pygame.KEYUP:
        # Відпускання клавіші
        pass
    
    elif event.type == pygame.MOUSEBUTTONDOWN:
        # Натискання кнопки миші
        print(f"Клік на позиції: {event.pos}")
    
    elif event.type == pygame.MOUSEMOTION:
        # Рух миші
        print(f"Миша на позиції: {event.pos}")
\`\`\`

**Клавіші:**

\`\`\`python
pygame.K_UP      # Стрілка вгору
pygame.K_DOWN    # Стрілка вниз
pygame.K_LEFT    # Стрілка вліво
pygame.K_RIGHT   # Стрілка вправо
pygame.K_SPACE   # Пробіл
pygame.K_ESCAPE  # Escape
pygame.K_a       # Буква a
pygame.K_1       # Цифра 1
\`\`\``
      },
      {
        title: "Малювання базових фігур",
        content: `**Прямокутник:**

\`\`\`python
# Заповнений прямокутник
pygame.draw.rect(screen, RED, (x, y, width, height))

# Порожній прямокутник
pygame.draw.rect(screen, RED, (x, y, width, height), 2)  # 2 — товщина лінії
\`\`\`

**Коло:**

\`\`\`python
# Заповнене коло
pygame.draw.circle(screen, BLUE, (x, y), radius)

# Порожнє коло
pygame.draw.circle(screen, BLUE, (x, y), radius, 2)
\`\`\`

**Лінія:**

\`\`\`python
pygame.draw.line(screen, GREEN, (x1, y1), (x2, y2), width)
\`\`\`

**Приклад:**

\`\`\`python
import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    screen.fill(WHITE)
    
    # Малюємо фігури
    pygame.draw.rect(screen, RED, (100, 100, 200, 150))
    pygame.draw.circle(screen, BLUE, (400, 300), 50)
    pygame.draw.line(screen, GREEN, (0, 0), (800, 600), 5)
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Найпростіше ігрове вікно",
      code: `import pygame

pygame.init()

# Налаштування
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Моя перша гра")

# Кольори
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Ігровий цикл
running = True
clock = pygame.time.Clock()

while running:
    # Обробка подій
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Малювання
    screen.fill(BLACK)
    pygame.display.flip()
    
    clock.tick(60)

pygame.quit()`,
      explanation: "Створює базове ігрове вікно з ігровим циклом. Вікно можна закрити кнопкою X."
    },
    {
      title: "Приклад 2: Малювання фігур",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Малювання")
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
    
    # Прямокутник
    pygame.draw.rect(screen, RED, (100, 100, 200, 150))
    
    # Коло
    pygame.draw.circle(screen, BLUE, (400, 300), 75)
    
    # Лінія
    pygame.draw.line(screen, GREEN, (0, 0), (800, 600), 5)
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Демонструє малювання різних фігур: прямокутник, коло, лінія."
    },
    {
      title: "Приклад 3: Обробка клавіатури",
      code: `import pygame

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Клавіатура")
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

x, y = 400, 300  # Позиція об'єкта

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                x -= 10
            elif event.key == pygame.K_RIGHT:
                x += 10
            elif event.key == pygame.K_UP:
                y -= 10
            elif event.key == pygame.K_DOWN:
                y += 10
    
    screen.fill(BLACK)
    pygame.draw.circle(screen, WHITE, (x, y), 20)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Демонструє обробку натискань клавіш для переміщення об'єкта стрілками."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Забути pygame.init()",
      explanation: "Без ініціалізації Pygame не працюватиме правильно.",
      correctApproach: "Завжди викликайте pygame.init() на початку програми."
    },
    {
      mistake: "Забути pygame.display.flip() або pygame.display.update()",
      explanation: "Без оновлення екрана зміни не відобразяться.",
      correctApproach: "Викликайте pygame.display.flip() або pygame.display.update() після малювання."
    },
    {
      mistake: "Не обробляти pygame.QUIT",
      explanation: "Без обробки QUIT вікно не закриється правильно.",
      correctApproach: "Завжди перевіряйте event.type == pygame.QUIT у циклі подій."
    },
    {
      mistake: "Малювати до screen.fill()",
      explanation: "Якщо малювати до fill(), об'єкти можуть не відобразитися або залишитися від попереднього кадру.",
      correctApproach: "Спочатку screen.fill(), потім малюйте об'єкти."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Pygame** — бібліотека для створення ігор
2. **Встановлення** — pip install pygame
3. **Ініціалізація** — pygame.init()
4. **Створення вікна** — pygame.display.set_mode()
5. **Ігровий цикл** — обробка подій, оновлення, малювання
6. **Малювання** — pygame.draw для фігур
7. **Події** — обробка клавіатури та миші

Тепер ви можете створювати прості ігри на Pygame!`,
  
  practiceTask: {
    title: "Перша гра",
    description: "Створіть просту гру з рухом об'єкта",
    problemStatement: `Створіть програму, яка:
1. Створює ігрове вікно 800x600
2. Має об'єкт (коло), який рухається стрілками
3. Об'єкт не виходить за межі екрана
4. Має чорний фон та білий об'єкт
5. Показує FPS у заголовку вікна`,
    inputFormat: "Користувач натискає стрілки на клавіатурі",
    outputFormat: "Об'єкт рухається по екрану відповідно до натискань",
    examples: [
      {
        input: "Натискання стрілок",
        output: "Об'єкт рухається в відповідному напрямку",
        explanation: "Гра обробляє натискання клавіш та оновлює позицію об'єкта"
      }
    ],
    solution: {
      code: `import pygame

pygame.init()

# Налаштування
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Моя перша гра")
clock = pygame.time.Clock()

# Кольори
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Позиція об'єкта
x, y = WIDTH // 2, HEIGHT // 2
speed = 5
radius = 20

running = True
while running:
    # Обробка подій
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Обробка клавіатури
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and x > radius:
        x -= speed
    if keys[pygame.K_RIGHT] and x < WIDTH - radius:
        x += speed
    if keys[pygame.K_UP] and y > radius:
        y -= speed
    if keys[pygame.K_DOWN] and y < HEIGHT - radius:
        y += speed
    
    # Малювання
    screen.fill(BLACK)
    pygame.draw.circle(screen, WHITE, (x, y), radius)
    pygame.display.flip()
    
    # FPS
    fps = clock.get_fps()
    pygame.display.set_caption(f"Моя перша гра - FPS: {int(fps)}")
    
    clock.tick(60)

pygame.quit()`,
      explanation: "Створює просту гру з об'єктом, який рухається стрілками та не виходить за межі екрана."
    },
    hints: [
      "Використовуйте pygame.key.get_pressed() для безперервного руху",
      "Перевіряйте межі екрана перед зміною позиції",
      "Оновлюйте заголовок через pygame.display.set_caption()",
      "Використовуйте clock.get_fps() для отримання FPS"
    ],
    difficulty: "beginner"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке Pygame?",
        options: ["Гра", "Бібліотека для створення ігор", "Мова програмування", "Редактор коду"],
        correctAnswer: 1,
        explanation: "Pygame — це бібліотека Python для створення ігор та мультимедійних додатків."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що робить pygame.display.flip()?",
        options: ["Перевертає екран", "Оновлює екран", "Закриває вікно", "Створює вікно"],
        correctAnswer: 1,
        explanation: "pygame.display.flip() оновлює екран, показуючи все, що було намальовано."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який порядок кроків у ігровому циклі?",
        options: ["Малювання, події, оновлення", "Події, оновлення, малювання", "Оновлення, малювання, події", "Будь-який"],
        correctAnswer: 1,
        explanation: "Правильний порядок: 1) Обробка подій, 2) Оновлення стану, 3) Малювання."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що означає clock.tick(60)?",
        options: ["60 секунд", "60 кадрів на секунду", "60 хвилин", "Помилку"],
        correctAnswer: 1,
        explanation: "clock.tick(60) обмежує швидкість до 60 кадрів на секунду (FPS)."
      }
    ],
    timeLimit: 12,
    passingScore: 70
  }
}

