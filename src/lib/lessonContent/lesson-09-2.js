/**
 * Lesson 09-2: Додаткові інструменти: BeautifulSoup
 * Short reference lesson about BeautifulSoup
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_09_2 = {
  lessonId: "lesson-09-2",
  moduleId: "module-09",
  order: 2,
  title: "Додаткові інструменти: BeautifulSoup",
  
  learningObjectives: [
    "Дізнатися про BeautifulSoup",
    "Зрозуміти, коли використовувати BeautifulSoup",
    "Побачити базові приклади використання"
  ],
  
  estimatedTime: 30,
  prerequisites: ["lesson-09-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Що таке BeautifulSoup?",
        content: `BeautifulSoup — це популярна бібліотека Python для парсингу HTML та XML документів.

**Основні можливості:**

- Простий та інтуїтивний API для навігації по HTML
- Автоматичне виправлення некоректного HTML
- Зручні методи пошуку елементів за тегами, класами, id
- Підтримка різних парсерів (html.parser, lxml)

**Коли використовувати BeautifulSoup:**

- Коли потрібно парсити складний HTML
- Для витягування даних з веб-сторінок
- Коли потрібна гнучка навігація по DOM дереву
- Для обробки некоректного або неповного HTML

**Встановлення:**

\`\`\`bash
pip install beautifulsoup4
\`\`\`

**Примітка:** BeautifulSoup вимагає додаткового встановлення на вашому комп'ютері. У цьому курсі ми зосередимося на роботі з requests та JSON API, які не потребують додаткових бібліотек.`
      },
      {
        title: "Базовий приклад використання",
        content: `**Простий приклад парсингу HTML:**

\`\`\`python
from bs4 import BeautifulSoup
import requests

# Отримуємо HTML
response = requests.get('https://example.com')
html = response.text

# Створюємо об'єкт BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Знаходимо елементи
title = soup.find('title')
print(title.text)  # Текст заголовка

# Знаходимо всі посилання
links = soup.find_all('a')
for link in links:
    print(link.get('href'))
\`\`\`

**Пошук за класом або id:**

\`\`\`python
# Знайти елемент за класом
div = soup.find('div', class_='content')

# Знайти елемент за id
header = soup.find(id='header')

# Знайти всі елементи з класом
items = soup.find_all('div', class_='item')
\`\`\`

**Витягування тексту:**

\`\`\`python
# Отримати весь текст з елемента
text = soup.get_text()

# Отримати текст конкретного елемента
paragraph = soup.find('p')
if paragraph:
    print(paragraph.get_text())
\`\`\``
      },
      {
        title: "Альтернативи BeautifulSoup",
        content: `**Для простих задач можна використовувати:**

1. **Регулярні вирази (re)** — для простих патернів
2. **Вбудований html.parser** — для базового парсингу
3. **JSON API** — якщо сайт надає API (найкращий варіант)

**Рекомендація:**

Для навчальних цілей у цьому курсі ми використовуємо **requests** для роботи з JSON API, що простіше та не потребує додаткових бібліотек. BeautifulSoup корисний для складних задач парсингу HTML, але для більшості практичних завдань достатньо requests та JSON.`
      }
    ]
  },
  
  codeExamples: [],
  
  practiceTask: null,
  
  quiz: {
    questions: []
  },
  
  commonMistakes: [],
  
  summary: `BeautifulSoup — потужний інструмент для парсингу HTML, але для більшості завдань у цьому курсі достатньо requests та JSON API.`
}
