/**
 * Lesson 9-4: Практика: міні-гра на Pygame
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson9_4 = {
  lessonId: "lesson-9-4",
  moduleId: "module-9",
  order: 4,
  title: "Практика: міні-гра на Pygame",
  
  learningObjectives: [
    "Створити повноцінну міні-гру",
    "Застосувати всі набуті знання Pygame",
    "Реалізувати ігрову механіку",
    "Додати графіку та звуки"
  ],
  
  estimatedTime: 180,
  prerequisites: ["lesson-9-3"],
  isProject: true,
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Огляд проекту",
        content: `Ми створимо гру **"Змійка"** (Snake) — класичну аркаду.

**Механіка гри:**
- Гравець керує змійкою стрілками
- Змійка рухається постійно
- З'їдаючи їжу, змійка збільшується
- Зіткнення зі стінами або собою — програш
- Рахунок збільшується за кожну з'їдену їжу

**Компоненти:**
- Клас Snake (змійка)
- Клас Food (їжа)
- Ігровий цикл
- Обробка колізій
- Рахунок та game over`
      },
      {
        title: "Структура гри",
        content: `**Клас Snake:**

\`\`\`python
class Snake:
    def __init__(self):
        self.body = [(400, 300)]  # Список сегментів
        self.direction = (1, 0)   # Напрямок руху
        self.grow = False         # Чи потрібно рости
    
    def move(self):
        head_x, head_y = self.body[0]
        new_head = (head_x + self.direction[0] * 20, 
                   head_y + self.direction[1] * 20)
        self.body.insert(0, new_head)
        
        if not self.grow:
            self.body.pop()
        else:
            self.grow = False
    
    def change_direction(self, new_dir):
        # Не можна рухатися в протилежному напрямку
        if (new_dir[0] * -1, new_dir[1] * -1) != self.direction:
            self.direction = new_dir
\`\`\`

**Клас Food:**

\`\`\`python
class Food:
    def __init__(self):
        self.x = random.randint(0, 39) * 20
        self.y = random.randint(0, 29) * 20
    
    def respawn(self):
        self.x = random.randint(0, 39) * 20
        self.y = random.randint(0, 29) * 20
    
    def draw(self, screen):
        pygame.draw.rect(screen, (255, 0, 0), 
                        (self.x, self.y, 20, 20))
\`\`\``
      },
      {
        title: "Логіка гри",
        content: `**Перевірка колізії з їжею:**

\`\`\`python
if snake.body[0] == (food.x, food.y):
    snake.grow = True
    score += 1
    food.respawn()
\`\`\`

**Перевірка колізії зі стінами:**

\`\`\`python
head_x, head_y = snake.body[0]
if head_x < 0 or head_x >= WIDTH or head_y < 0 or head_y >= HEIGHT:
    game_over = True
\`\`\`

**Перевірка колізії з собою:**

\`\`\`python
if snake.body[0] in snake.body[1:]:
    game_over = True
\`\`\`

**Game Over:**

\`\`\`python
def show_game_over(screen, score):
    font = pygame.font.Font(None, 72)
    text = font.render("GAME OVER", True, (255, 0, 0))
    screen.blit(text, (250, 250))
    
    score_text = font.render(f"Рахунок: {score}", True, (255, 255, 255))
    screen.blit(score_text, (300, 320))
\`\`\``
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад: Базова структура змійки",
      code: `import pygame
import random

class Snake:
    def __init__(self):
        self.body = [(400, 300)]
        self.direction = (20, 0)  # Рух вправо
        self.grow = False
    
    def move(self):
        head = self.body[0]
        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])
        self.body.insert(0, new_head)
        
        if not self.grow:
            self.body.pop()
        else:
            self.grow = False
    
    def draw(self, screen):
        for segment in self.body:
            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 20, 20))

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

snake = Snake()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    snake.move()
    
    screen.fill((0, 0, 0))
    snake.draw(screen)
    pygame.display.flip()
    clock.tick(10)  # Повільніше для змійки

pygame.quit()`,
      explanation: "Базова структура змійки, яка рухається автоматично."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не обробляти зміну напрямку правильно",
      explanation: "Змійка може рухатися в протилежному напрямку, що призведе до миттєвого програшу.",
      correctApproach: "Перевіряйте, чи новий напрямок не протилежний поточному."
    },
    {
      mistake: "Занадто швидкий рух",
      explanation: "Якщо змійка рухається занадто швидко, важко керувати.",
      correctApproach: "Використовуйте clock.tick(10) або подібне для контролю швидкості."
    }
  ],
  
  summary: `На цьому проекті ми:

1. **Створили повноцінну гру** — змійка з усією механікою
2. **Застосували знання Pygame** — спрайти, рух, колізії
3. **Реалізували ігрову логіку** — зростання, рахунок, game over
4. **Створили інтерактивну гру** — керування, реакція на події

Це перша повноцінна гра, яка демонструє всі можливості Pygame!`,
  
  practiceTask: {
    title: "Гра Змійка",
    description: "Створіть класичну гру Змійка",
    problemStatement: `Створіть гру, яка:
1. Має змійку, яка рухається постійно
2. Керується стрілками
3. З'їдає їжу (червоні квадрати)
4. Збільшується при з'їданні їжі
5. Завершується при зіткненні зі стінами або собою
6. Показує рахунок`,
    inputFormat: "Користувач керує змійкою стрілками",
    outputFormat: "Гра з повною механікою змійки",
    examples: [
      {
        input: "Рух стрілками, з'їдання їжі",
        output: "Змійка рухається, росте, набирає очки",
        explanation: "Гра реалізує повну механіку змійки"
      }
    ],
    solution: {
      code: `import pygame
import random

class Snake:
    def __init__(self):
        self.body = [(400, 300)]
        self.direction = (20, 0)
        self.grow = False
    
    def move(self):
        head = self.body[0]
        new_head = (head[0] + self.direction[0], head[1] + self.direction[1])
        self.body.insert(0, new_head)
        
        if not self.grow:
            self.body.pop()
        else:
            self.grow = False
    
    def change_direction(self, new_dir):
        if (new_dir[0] * -1, new_dir[1] * -1) != self.direction:
            self.direction = new_dir
    
    def draw(self, screen):
        for segment in self.body:
            pygame.draw.rect(screen, (0, 255, 0), (segment[0], segment[1], 20, 20))
    
    def check_collision(self, width, height):
        head_x, head_y = self.body[0]
        if head_x < 0 or head_x >= width or head_y < 0 or head_y >= height:
            return True
        if self.body[0] in self.body[1:]:
            return True
        return False

class Food:
    def __init__(self):
        self.respawn()
    
    def respawn(self):
        self.x = random.randint(0, 39) * 20
        self.y = random.randint(0, 29) * 20
    
    def draw(self, screen):
        pygame.draw.rect(screen, (255, 0, 0), (self.x, self.y, 20, 20))
    
    def get_pos(self):
        return (self.x, self.y)

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Змійка")
clock = pygame.time.Clock()

snake = Snake()
food = Food()
score = 0
font = pygame.font.Font(None, 36)
game_over = False

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN and not game_over:
            if event.key == pygame.K_UP:
                snake.change_direction((0, -20))
            elif event.key == pygame.K_DOWN:
                snake.change_direction((0, 20))
            elif event.key == pygame.K_LEFT:
                snake.change_direction((-20, 0))
            elif event.key == pygame.K_RIGHT:
                snake.change_direction((20, 0))
    
    if not game_over:
        snake.move()
        
        # Колізія з їжею
        if snake.body[0] == food.get_pos():
            snake.grow = True
            score += 10
            food.respawn()
        
        # Перевірка колізій
        if snake.check_collision(WIDTH, HEIGHT):
            game_over = True
    
    # Малювання
    screen.fill((0, 0, 0))
    snake.draw(screen)
    food.draw(screen)
    
    # Рахунок
    score_text = font.render(f"Рахунок: {score}", True, (255, 255, 255))
    screen.blit(score_text, (10, 10))
    
    if game_over:
        game_over_text = font.render("GAME OVER", True, (255, 0, 0))
        screen.blit(game_over_text, (300, 250))
    
    pygame.display.flip()
    clock.tick(10)

pygame.quit()`,
      explanation: "Повноцінна гра Змійка з усією механікою: рух, зростання, колізії, рахунок, game over."
    },
    hints: [
      "Використовуйте список для зберігання сегментів змійки",
      "Додавайте нову голову, видаляйте хвіст (якщо не росте)",
      "Перевіряйте колізію зі стінами та собою",
      "Використовуйте clock.tick(10) для контролю швидкості"
    ],
    difficulty: "intermediate"
  },
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке ігровий цикл?",
        options: ["Цикл for", "Цикл while, який постійно оновлює гру", "Цикл while True", "Немає такого"],
        correctAnswer: 1,
        explanation: "Ігровий цикл — це цикл while, який постійно виконується, обробляючи події, оновлюючи стан та малюючи кадри."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як перевірити колізію між змійкою та їжею?",
        options: ["snake == food", "snake.body[0] == food.get_pos()", "snake.collide(food)", "Неможливо"],
        correctAnswer: 1,
        explanation: "Перевіряємо, чи позиція голови змійки (snake.body[0]) збігається з позицією їжі."
      }
    ],
    timeLimit: 10,
    passingScore: 70
  }
}

