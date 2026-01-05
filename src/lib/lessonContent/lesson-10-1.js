/**
 * Lesson 10-1: Вступ до PIL/Pillow
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_1 = {
  lessonId: "lesson-10-1",
  moduleId: "module-10",
  order: 1,
  title: "Вступ до PIL/Pillow",
  
  learningObjectives: [
    "Встановити Pillow",
    "Відкривати та зберігати зображення",
    "Отримувати інформацію про зображення",
    "Конвертувати формати"
  ],
  
  prerequisites: ["lesson-09-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до PIL/Pillow",
        content: `PIL (Python Imaging Library) та його форк Pillow - це потужні бібліотеки для роботи з зображеннями в Python.

**Що таке Pillow?**

- Бібліотека для обробки зображень
- Підтримка багатьох форматів (JPEG, PNG, GIF, BMP, TIFF, WebP)
- Маніпуляції з розміром, кольорами, фільтрами
- Простий та зручний API

**Основні можливості:**

- Відкриття та збереження зображень
- Зміна розміру та обрізання
- Конвертація форматів
- Застосування фільтрів та ефектів
- Робота з кольорами та альфа-каналом

**Встановлення:**

\`\`\`bash
pip install Pillow
\`\`\`

**Імпорт:**

\`\`\`python
from PIL import Image
\`\`\``
      },
      {
        title: "Відкриття та збереження зображень",
        content: `**Відкриття зображення:**

\`\`\`python
from PIL import Image

# Відкрити зображення
img = Image.open('photo.jpg')
print(img)  # <PIL.JpegImagePlugin.JpegImageFile image mode=RGB size=1920x1080 at 0x...>
\`\`\`

**Основні методи:**

\`\`\`python
from PIL import Image

# Відкрити зображення
img = Image.open('photo.jpg')

# Показати зображення (відкриє в стандартному переглядачі)
img.show()

# Зберегти зображення
img.save('new_photo.png')

# Зберегти в іншому форматі
img.save('photo_webp.webp', 'WEBP')
\`\`\`

**Робота з різними форматами:**

\`\`\`python
from PIL import Image

# JPEG
img_jpg = Image.open('photo.jpg')
img_jpg.save('copy.jpg', 'JPEG')

# PNG (з підтримкою прозорості)
img_png = Image.open('image.png')
img_png.save('copy.png', 'PNG')

# GIF
img_gif = Image.open('animation.gif')
img_gif.save('copy.gif', 'GIF')
\`\`\`

**Конвертація форматів:**

\`\`\`python
from PIL import Image

# Конвертувати JPEG в PNG
img = Image.open('photo.jpg')
img.save('photo.png', 'PNG')

# Конвертувати PNG в WebP
img = Image.open('image.png')
img.save('image.webp', 'WEBP')
\`\`\``
      },
      {
        title: "Отримання інформації про зображення",
        content: `**Основні властивості зображення:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Розмір зображення (ширина, висота)
print(img.size)  # (1920, 1080)
print(f'Ширина: {img.width}, Висота: {img.height}')

# Формат файлу
print(img.format)  # JPEG

# Режим кольору
print(img.mode)  # RGB, RGBA, L (grayscale), P (palette), etc.

# Файловий шлях (якщо відкрито з файлу)
print(img.filename)  # photo.jpg
\`\`\`

**Режими кольору:**

- **RGB** - червоний, зелений, синій (24 біти)
- **RGBA** - RGB + альфа-канал (прозорість, 32 біти)
- **L** - відтінки сірого (8 біт)
- **P** - палітра (8 біт, індексовані кольори)
- **CMYK** - для друку (cyan, magenta, yellow, black)

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
print(f'Розмір: {img.size}')
print(f'Формат: {img.format}')
print(f'Режим: {img.mode}')

# Перевірка типу
if img.mode == 'RGB':
    print('Зображення в кольоровому режимі RGB')
elif img.mode == 'RGBA':
    print('Зображення з прозорістю')
elif img.mode == 'L':
    print('Відтінки сірого')
\`\`\`

**Отримання пікселів:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Отримати піксель за координатами (x, y)
pixel = img.getpixel((100, 200))
print(pixel)  # (255, 128, 64) для RGB

# Встановити піксель
img.putpixel((100, 200), (255, 0, 0))  # Червоний піксель

# Отримати всі дані пікселів
pixels = img.load()
print(pixels[100, 200])  # (255, 0, 0)
\`\`\``
      },
      {
        title: "Створення нових зображень",
        content: `**Створення порожнього зображення:**

\`\`\`python
from PIL import Image

# Створити нове RGB зображення (ширина, висота, колір)
img = Image.new('RGB', (800, 600), color='white')
img.save('white_image.jpg')

# Створити зображення з кольором
img = Image.new('RGB', (800, 600), color=(255, 0, 0))  # Червоний
img.save('red_image.jpg')

# Створити зображення з прозорістю
img = Image.new('RGBA', (800, 600), color=(255, 0, 0, 128))  # Напівпрозорий червоний
img.save('transparent.png')
\`\`\`

**Створення градієнта:**

\`\`\`python
from PIL import Image

# Створити зображення
width, height = 800, 600
img = Image.new('RGB', (width, height))

# Заповнити градієнтом
pixels = img.load()
for x in range(width):
    for y in range(height):
        # Градієнт від червоного до синього
        r = int(255 * (x / width))
        g = 0
        b = int(255 * (1 - x / width))
        pixels[x, y] = (r, g, b)

img.save('gradient.jpg')
\`\`\`

**Копіювання зображення:**

\`\`\`python
from PIL import Image

# Відкрити зображення
original = Image.open('photo.jpg')

# Створити копію
copy = original.copy()
copy.save('photo_copy.jpg')

# Або просто зберегти під іншим ім'ям
original.save('photo_backup.jpg')
\`\`\``
      },
      {
        title: "Базові операції",
        content: `**Конвертація режимів:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Конвертувати в відтінки сірого
gray = img.convert('L')
gray.save('photo_gray.jpg')

# Конвертувати в RGBA (додати альфа-канал)
rgba = img.convert('RGBA')
rgba.save('photo_rgba.png')
\`\`\`

**Отримання статистики:**

\`\`\`python
from PIL import Image, ImageStat

img = Image.open('photo.jpg')

# Статистика зображення
stat = ImageStat.Stat(img)
print(f'Середнє значення: {stat.mean}')
print(f'Мінімальне: {stat.min}')
print(f'Максимальне: {stat.max}')
print(f'Стандартне відхилення: {stat.stddev}')
\`\`\`

**Перевірка та валідація:**

\`\`\`python
from PIL import Image

def is_valid_image(filepath):
    try:
        img = Image.open(filepath)
        img.verify()  # Перевірка цілісності
        return True
    except Exception as e:
        print(f'Помилка: {e}')
        return False

# Використання
if is_valid_image('photo.jpg'):
    print('Зображення валідне')
else:
    print('Зображення пошкоджене')
\`\`\`

**Робота з EXIF даними:**

\`\`\`python
from PIL import Image
from PIL.ExifTags import TAGS

img = Image.open('photo.jpg')

# Отримати EXIF дані (якщо є)
exifdata = img.getexif()

if exifdata:
    for tag_id in exifdata:
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        print(f'{tag}: {data}')
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Конвертер форматів**

\`\`\`python
from PIL import Image
import os

def convert_image(input_path, output_path, output_format):
    try:
        img = Image.open(input_path)
        img.save(output_path, output_format)
        print(f'Конвертовано: {input_path} -> {output_path}')
        return True
    except Exception as e:
        print(f'Помилка: {e}')
        return False

# Використання
convert_image('photo.jpg', 'photo.png', 'PNG')
\`\`\`

**Приклад 2: Пакетна конвертація**

\`\`\`python
from PIL import Image
import os

def batch_convert(input_dir, output_dir, output_format='PNG'):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            input_path = os.path.join(input_dir, filename)
            name, _ = os.path.splitext(filename)
            output_path = os.path.join(output_dir, f'{name}.{output_format.lower()}')
            
            try:
                img = Image.open(input_path)
                img.save(output_path, output_format)
                print(f'Конвертовано: {filename}')
            except Exception as e:
                print(f'Помилка {filename}: {e}')

# Використання
batch_convert('images/', 'converted/', 'PNG')
\`\`\`

**Приклад 3: Перевірка розміру зображення**

\`\`\`python
from PIL import Image

def check_image_size(filepath, max_width=1920, max_height=1080):
    img = Image.open(filepath)
    width, height = img.size
    
    if width > max_width or height > max_height:
        print(f'Зображення занадто велике: {width}x{height}')
        return False
    else:
        print(f'Розмір OK: {width}x{height}')
        return True

# Використання
check_image_size('photo.jpg', max_width=1920, max_height=1080)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили основи роботи з Pillow:

**Ключові методи:**

1. **Image.open()** - відкриття зображення
2. **img.save()** - збереження зображення
3. **img.size** - розмір зображення
4. **img.mode** - режим кольору
5. **img.convert()** - конвертація режиму
6. **Image.new()** - створення нового зображення

**Основні концепції:**

- Формати зображень (JPEG, PNG, GIF, WebP)
- Режими кольору (RGB, RGBA, L, P)
- Відкриття та збереження
- Конвертація форматів
- Отримання інформації про зображення

**Важливо:**

- Pillow підтримує багато форматів
- Завжди перевіряйте формат перед збереженням
- RGBA підтримує прозорість (тільки PNG, WebP)
- Використовуйте try/except для обробки помилок

**Наступний крок:**

У наступному уроці ми навчимося маніпулювати зображеннями: змінювати розмір, обрізати, повертати та застосовувати базові фільтри.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Відкриття та збереження",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Розмір: {img.size}, Формат: {img.format}')
img.save('copy.png', 'PNG')`,
      explanation: "Відкриваємо зображення, виводимо інформацію та зберігаємо в іншому форматі."
    },
    {
      title: "Приклад 2: Створення нового зображення",
      code: `from PIL import Image

img = Image.new('RGB', (800, 600), color='blue')
img.save('blue_image.jpg')`,
      explanation: "Створюємо нове сині зображення розміром 800x600 пікселів."
    },
    {
      title: "Приклад 3: Конвертація в відтінки сірого",
      code: `from PIL import Image

img = Image.open('photo.jpg')
gray = img.convert('L')
gray.save('photo_gray.jpg')`,
      explanation: "Конвертуємо кольорове зображення в відтінки сірого."
    },
    {
      title: "Приклад 4: Отримання інформації",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Розмір: {img.size}')
print(f'Режим: {img.mode}')
print(f'Формат: {img.format}')`,
      explanation: "Отримуємо основну інформацію про зображення."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не вказувати формат при збереженні",
      explanation: "Якщо розширення файлу не відповідає формату, може виникнути помилка.",
      correctApproach: "Завжди вказуйте формат явно: img.save('file.png', 'PNG')."
    },
    {
      mistake: "Спроба зберегти RGBA в JPEG",
      explanation: "JPEG не підтримує прозорість, тільки PNG та WebP.",
      correctApproach: "Використовуйте PNG або WebP для зображень з прозорістю, або конвертуйте в RGB перед збереженням в JPEG."
    },
    {
      mistake: "Не перевіряти існування файлу",
      explanation: "Якщо файл не існує, Image.open() викличе виняток.",
      correctApproach: "Використовуйте try/except або os.path.exists() для перевірки перед відкриттям."
    },
    {
      mistake: "Забувати закривати зображення",
      explanation: "Хоча Python закриває файли автоматично, краще явно закривати великі зображення.",
      correctApproach: "Використовуйте img.close() або контекстний менеджер with Image.open() as img:."
    }
  ],
  
  summary: `На цьому уроці ми вивчили основи роботи з Pillow:

1. Встановлення та імпорт - pip install Pillow
2. Відкриття та збереження - Image.open(), img.save()
3. Інформація про зображення - size, mode, format
4. Створення нових зображень - Image.new()
5. Конвертація форматів - збереження в різних форматах
6. Режими кольору - RGB, RGBA, L, P

Pillow - потужний інструмент для роботи з зображеннями!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як встановити Pillow?",
        options: [
          "pip install Pillow",
          "pip install PIL",
          "pip install Image",
          "pip install pillow"
        ],
        correctAnswer: 0,
        explanation: "Pillow встановлюється командою pip install Pillow (з великої літери P)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим кольору використовується для зображень з прозорістю?",
        options: [
          "RGBA",
          "RGB",
          "L",
          "P"
        ],
        correctAnswer: 0,
        explanation: "RGBA (Red, Green, Blue, Alpha) містить альфа-канал для прозорості."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат НЕ підтримує прозорість?",
        options: [
          "JPEG",
          "PNG",
          "WebP",
          "GIF"
        ],
        correctAnswer: 0,
        explanation: "JPEG не підтримує прозорість. PNG, WebP та GIF підтримують альфа-канал або прозорість."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати розмір зображення?",
        options: [
          "img.size",
          "img.width, img.height",
          "img.get_size()",
          "img.dimensions"
        ],
        correctAnswer: 0,
        explanation: "img.size повертає кортеж (width, height) з розміром зображення."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна зберегти RGBA зображення в JPEG формат без конвертації.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JPEG не підтримує альфа-канал. Потрібно спочатку конвертувати в RGB: img.convert('RGB')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

