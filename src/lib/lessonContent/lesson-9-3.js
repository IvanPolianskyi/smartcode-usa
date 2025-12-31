/**
 * Lesson 9-3: Спрайти, рух об'єктів, колізії
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson9_3 = {
  lessonId: "lesson-9-3",
  moduleId: "module-9",
  order: 3,
  title: "Спрайти, рух об'єктів, колізії",
  
  learningObjectives: [
    "Створювати спрайти (об'єкти гри)",
    "Реалізувати рух об'єктів",
    "Виявляти колізії між об'єктами",
    "Обробляти зіткнення"
  ],
  
  estimatedTime: 120,
  prerequisites: ["lesson-9-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке спрайти?",
        content: `**Спрайт (Sprite)** — це об'єкт у грі, який має позицію, зображення та поведінку.

**Простий спрайт:**

\`\`\`python
class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = 50
        self.height = 50
        self.speed = 5
        self.color = (255, 0, 0)
    
    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
    
    def update(self):
        # Оновлення позиції, стану тощо
        pass
\`\`\`

**Використання:**

\`\`\`python
player = Player(400, 300)

# У циклі
player.update()
player.draw(screen)
\`\`\`

**Переваги класів для спрайтів:**
- Організація коду
- Легше керувати багатьма об'єктами
- Можна додавати методи та властивості`
      },
      {
        title: "Рух об'єктів",
        content: `**Базовий рух:**

\`\`\`python
class MovingObject:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.velocity_x = 0
        self.velocity_y = 0
        self.speed = 5
    
    def update(self):
        self.x += self.velocity_x
        self.y += self.velocity_y
    
    def move_left(self):
        self.velocity_x = -self.speed
    
    def move_right(self):
        self.velocity_x = self.speed
    
    def stop_x(self):
        self.velocity_x = 0
\`\`\`

**Рух з прискоренням:**

\`\`\`python
class AcceleratingObject:
    def __init__(self):
        self.x = 400
        self.y = 300
        self.velocity_x = 0
        self.velocity_y = 0
        self.acceleration = 0.5
        self.max_speed = 5
        self.friction = 0.9
    
    def update(self, keys):
        # Прискорення
        if keys[pygame.K_LEFT]:
            self.velocity_x -= self.acceleration
        if keys[pygame.K_RIGHT]:
            self.velocity_x += self.acceleration
        
        # Обмеження швидкості
        self.velocity_x = max(-self.max_speed, min(self.max_speed, self.velocity_x))
        
        # Гальмування
        self.velocity_x *= self.friction
        
        # Оновлення позиції
        self.x += self.velocity_x
        self.y += self.velocity_y
\`\`\`

**Гравітація:**

\`\`\`python
class FallingObject:
    def __init__(self):
        self.x = 400
        self.y = 0
        self.velocity_y = 0
        self.gravity = 0.5
    
    def update(self):
        self.velocity_y += self.gravity  # Прискорення вниз
        self.y += self.velocity_y
        
        # Відскок від нижньої межі
        if self.y > HEIGHT - 50:
            self.y = HEIGHT - 50
            self.velocity_y = -self.velocity_y * 0.8  # Втрата енергії
\`\`\``
      },
      {
        title: "Колізії (зіткнення)",
        content: `**Прямокутна колізія (AABB - Axis-Aligned Bounding Box):**

\`\`\`python
def check_collision(rect1, rect2):
    return (rect1.x < rect2.x + rect2.width and
            rect1.x + rect1.width > rect2.x and
            rect1.y < rect2.y + rect2.height and
            rect1.y + rect1.height > rect2.y)
\`\`\`

**Використання:**

\`\`\`python
class Player:
    def __init__(self):
        self.x = 100
        self.y = 100
        self.width = 50
        self.height = 50
    
    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)
    
    def check_collision(self, other):
        return self.get_rect().colliderect(other.get_rect())
\`\`\`

**Колізія з межами екрана:**

\`\`\`python
def check_boundaries(self, width, height):
    if self.x < 0:
        self.x = 0
    elif self.x + self.width > width:
        self.x = width - self.width
    
    if self.y < 0:
        self.y = 0
    elif self.y + self.height > height:
        self.y = height - self.height
\`\`\`

**Колізія з колом:**

\`\`\`python
def circle_collision(circle1, circle2):
    dx = circle1.x - circle2.x
    dy = circle1.y - circle2.y
    distance = (dx**2 + dy**2)**0.5
    return distance < (circle1.radius + circle2.radius)
\`\`\``
      },
      {
        title: "Практичний приклад: Гра з колізіями",
        content: `**Гра "Збирай монети":**

\`\`\`python
import pygame
import random

class Player:
    def __init__(self):
        self.x = 400
        self.y = 300
        self.width = 40
        self.height = 40
        self.speed = 5
        self.score = 0
    
    def update(self, keys):
        if keys[pygame.K_LEFT] and self.x > 0:
            self.x -= self.speed
        if keys[pygame.K_RIGHT] and self.x < 800 - self.width:
            self.x += self.speed
        if keys[pygame.K_UP] and self.y > 0:
            self.y -= self.speed
        if keys[pygame.K_DOWN] and self.y < 600 - self.height:
            self.y += self.speed
    
    def draw(self, screen):
        pygame.draw.rect(screen, (0, 255, 0), (self.x, self.y, self.width, self.height))
    
    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

class Coin:
    def __init__(self):
        self.x = random.randint(50, 750)
        self.y = random.randint(50, 550)
        self.radius = 15
    
    def draw(self, screen):
        pygame.draw.circle(screen, (255, 215, 0), (self.x, self.y), self.radius)
    
    def get_rect(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius, 
                          self.radius * 2, self.radius * 2)

# У циклі
player = Player()
coin = Coin()

while running:
    # ... обробка подій ...
    
    keys = pygame.key.get_pressed()
    player.update(keys)
    
    # Перевірка колізії
    if player.get_rect().colliderect(coin.get_rect()):
        player.score += 1
        coin = Coin()  # Нова монета
    
    # Малювання
    screen.fill((0, 0, 0))
    player.draw(screen)
    coin.draw(screen)
    # ... оновлення екрана ...
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Простий спрайт",
      code: `import pygame

class Player:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = 50
        self.height = 50
        self.speed = 5
    
    def update(self, keys):
        if keys[pygame.K_LEFT]:
            self.x -= self.speed
        if keys[pygame.K_RIGHT]:
            self.x += self.speed
    
    def draw(self, screen):
        pygame.draw.rect(screen, (255, 0, 0), (self.x, self.y, self.width, self.height))

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

player = Player(400, 300)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    keys = pygame.key.get_pressed()
    player.update(keys)
    
    screen.fill((0, 0, 0))
    player.draw(screen)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Демонструє створення простого спрайта (класу Player) з рухом та малюванням."
    },
    {
      title: "Приклад 2: Колізія між об'єктами",
      code: `import pygame

class Box:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.width = 50
        self.height = 50
    
    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)
    
    def draw(self, screen, color):
        pygame.draw.rect(screen, color, (self.x, self.y, self.width, self.height))

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

box1 = Box(100, 100)
box2 = Box(200, 150)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Перевірка колізії
    colliding = box1.get_rect().colliderect(box2.get_rect())
    
    screen.fill((0, 0, 0))
    box1.draw(screen, (255, 0, 0) if colliding else (0, 255, 0))
    box2.draw(screen, (255, 0, 0) if colliding else (0, 0, 255))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Показує перевірку колізії між двома об'єктами та зміну кольору при зіткненні."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не оновлювати позицію об'єктів",
      explanation: "Якщо не викликати update(), об'єкти не рухатимуться.",
      correctApproach: "Завжди викликайте update() для всіх об'єктів у циклі."
    },
    {
      mistake: "Неправильна перевірка колізії",
      explanation: "Помилки в логіці перевірки колізії можуть призвести до неправильних результатів.",
      correctApproach: "Використовуйте pygame.Rect.colliderect() для надійної перевірки."
    },
    {
      mistake: "Не обробляти колізії з межами",
      explanation: "Об'єкти можуть вийти за межі екрана.",
      correctApproach: "Перевіряйте межі екрана та обмежуйте позицію об'єктів."
    }
  ],
  
  summary: `На цьому уроці ми вивчили:

1. **Спрайти** — об'єкти гри як класи
2. **Рух об'єктів** — оновлення позиції в циклі
3. **Колізії** — виявлення зіткнень між об'єктами
4. **pygame.Rect** — для перевірки колізій
5. **Обробка зіткнень** — реакція на колізії

Тепер ви можете створювати об'єкти, які рухаються та взаємодіють!`,
  
  practiceTask: {
    title: "Гра з колізіями",
    description: "Створіть гру з об'єктами та колізіями",
    problemStatement: `Створіть програму, яка:
1. Має гравця (квадрат), який рухається стрілками
2. Має монети (кола), які з'являються випадково
3. При зіткненні з монетою гравець отримує очки
4. Монета зникає та з'являється нова
5. Показує рахунок на екрані`,
    inputFormat: "Користувач керує гравцем стрілками",
    outputFormat: "Гравець збирає монети та набирає очки",
    examples: [
      {
        input: "Рух до монети",
        output: "Монета зникає, рахунок збільшується",
        explanation: "Гра виявляє колізію та обробляє зіткнення"
      }
    ],
    solution: {
      code: `import pygame
import random

class Player:
    def __init__(self):
        self.x = 400
        self.y = 300
        self.width = 40
        self.height = 40
        self.speed = 5
    
    def update(self, keys):
        if keys[pygame.K_LEFT] and self.x > 0:
            self.x -= self.speed
        if keys[pygame.K_RIGHT] and self.x < 800 - self.width:
            self.x += self.speed
        if keys[pygame.K_UP] and self.y > 0:
            self.y -= self.speed
        if keys[pygame.K_DOWN] and self.y < 600 - self.height:
            self.y += self.speed
    
    def draw(self, screen):
        pygame.draw.rect(screen, (0, 255, 0), (self.x, self.y, self.width, self.height))
    
    def get_rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

class Coin:
    def __init__(self):
        self.respawn()
    
    def respawn(self):
        self.x = random.randint(50, 750)
        self.y = random.randint(50, 550)
        self.radius = 20
    
    def draw(self, screen):
        pygame.draw.circle(screen, (255, 215, 0), (self.x, self.y), self.radius)
    
    def get_rect(self):
        return pygame.Rect(self.x - self.radius, self.y - self.radius, 
                          self.radius * 2, self.radius * 2)

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Збирай монети")
clock = pygame.time.Clock()

player = Player()
coin = Coin()
score = 0
font = pygame.font.Font(None, 36)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    keys = pygame.key.get_pressed()
    player.update(keys)
    
    # Перевірка колізії
    if player.get_rect().colliderect(coin.get_rect()):
        score += 1
        coin.respawn()
    
    # Малювання
    screen.fill((0, 0, 0))
    player.draw(screen)
    coin.draw(screen)
    
    # Рахунок
    score_text = font.render(f"Рахунок: {score}", True, (255, 255, 255))
    screen.blit(score_text, (10, 10))
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      explanation: "Створює гру, де гравець збирає монети. При колізії рахунок збільшується та з'являється нова монета."
    },
    hints: [
      "Створіть класи Player та Coin",
      "Використовуйте pygame.Rect для перевірки колізій",
      "Оновлюйте рахунок при колізії",
      "Використовуйте random для позицій монет"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке спрайт?",
        options: ["Зображення", "Об'єкт у грі з позицією та поведінкою", "Анімація", "Звук"],
        correctAnswer: 1,
        explanation: "Спрайт — це об'єкт у грі, який має позицію, зображення та поведінку."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Як перевірити колізію між двома прямокутниками?",
        options: ["rect1 == rect2", "rect1.colliderect(rect2)", "rect1 + rect2", "Помилку"],
        correctAnswer: 1,
        explanation: "rect1.colliderect(rect2) перевіряє, чи перетинаються два прямокутники."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо обмежувати рух межами екрана?",
        options: ["Щоб об'єкт не вийшов за межі", "Щоб прискорити гру", "Не потрібно", "Щоб змінити колір"],
        correctAnswer: 0,
        explanation: "Без обмежень об'єкт може вийти за межі екрана та стати невидимим або недоступним."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.CODE_READING,
        question: "Що повертає rect.colliderect(other_rect)?",
        options: ["Позицію", "True якщо прямокутники перетинаються, False інакше", "Площа", "Помилку"],
        correctAnswer: 1,
        explanation: "colliderect() повертає True, якщо два прямокутники перетинаються, інакше False."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як створити спрайт у Pygame?",
        options: ["pygame.Sprite()", "Створити клас з методами draw() та update()", "pygame.create_sprite()", "Не можна"],
        correctAnswer: 1,
        explanation: "Спрайт — це клас, який містить позицію, зображення та методи для малювання та оновлення."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

