/**
 * Lesson 10-2: Маніпуляції з зображеннями
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_2 = {
  lessonId: "lesson-10-2",
  moduleId: "module-10",
  order: 2,
  title: "Маніпуляції з зображеннями",
  
  learningObjectives: [
    "Змінювати розмір зображень",
    "Обрізати та повертати зображення",
    "Змінювати яскравість та контраст",
    "Застосовувати базові фільтри"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-10-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Зміна розміру зображення",
        content: `**resize() — зміна розміру:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Змінити розмір до конкретних розмірів
resized = img.resize((800, 600))
resized.save('photo_resized.jpg')

# Зберегти пропорції
width, height = img.size
new_width = 800
new_height = int(height * (new_width / width))
resized = img.resize((new_width, new_height))
resized.save('photo_proportional.jpg')
\`\`\`

**thumbnail() — створення мініатюри:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Створити мініатюру (змінює оригінальне зображення)
img.thumbnail((200, 200))
img.save('photo_thumb.jpg')

# Або створити копію
thumb = img.copy()
thumb.thumbnail((200, 200))
thumb.save('photo_thumb.jpg')
\`\`\`

**Алгоритми зміни розміру:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# NEAREST — найближчий піксель (швидко, але низька якість)
resized_nearest = img.resize((800, 600), Image.NEAREST)

# BILINEAR — білінійна інтерполяція (краща якість)
resized_bilinear = img.resize((800, 600), Image.BILINEAR)

# BICUBIC — бікубічна інтерполяція (найкраща якість, повільніше)
resized_bicubic = img.resize((800, 600), Image.BICUBIC)

# LANCZOS — найкраща якість для зменшення
resized_lanczos = img.resize((800, 600), Image.LANCZOS)

resized_lanczos.save('photo_high_quality.jpg')
\`\`\``
      },
      {
        title: "Обрізання зображення",
        content: `**crop() — обрізання:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Обрізати (лівий, верхній, правий, нижній)
# Координати: (x1, y1, x2, y2)
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')
\`\`\`

**Обрізання з центру:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

# Розмір обрізаної області
crop_width = 400
crop_height = 300

# Координати центру
left = (width - crop_width) // 2
top = (height - crop_height) // 2
right = left + crop_width
bottom = top + crop_height

# Обрізати
cropped = img.crop((left, top, right, bottom))
cropped.save('photo_center_crop.jpg')
\`\`\`

**Обрізання квадрата:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

# Знайти меншу сторону
size = min(width, height)

# Центрувати
left = (width - size) // 2
top = (height - size) // 2
right = left + size
bottom = top + size

# Обрізати квадрат
square = img.crop((left, top, right, bottom))
square.save('photo_square.jpg')
\`\`\``
      },
      {
        title: "Поворот та відображення",
        content: `**rotate() — поворот:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Повернути на 90 градусів за годинниковою стрілкою
rotated = img.rotate(-90)
rotated.save('photo_rotated_90.jpg')

# Повернути на 45 градусів
rotated = img.rotate(45)
rotated.save('photo_rotated_45.jpg')

# Повернути з розширенням canvas
rotated = img.rotate(45, expand=True)
rotated.save('photo_rotated_expanded.jpg')
\`\`\`

**transpose() — стандартні перетворення:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Повернути на 90 градусів за годинниковою стрілкою
rotated_90 = img.transpose(Image.ROTATE_90)

# Повернути на 180 градусів
rotated_180 = img.transpose(Image.ROTATE_180)

# Повернути на 270 градусів
rotated_270 = img.transpose(Image.ROTATE_270)

# Відобразити горизонтально
flipped_h = img.transpose(Image.FLIP_LEFT_RIGHT)

# Відобразити вертикально
flipped_v = img.transpose(Image.FLIP_TOP_BOTTOM)

rotated_90.save('photo_90.jpg')
flipped_h.save('photo_flipped_h.jpg')
\`\`\`

**Комбінація операцій:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Повернути та обрізати
rotated = img.rotate(45, expand=True)
cropped = rotated.crop((50, 50, 350, 350))
cropped.save('photo_rotated_cropped.jpg')
\`\`\``
      },
      {
        title: "Яскравість та контраст",
        content: `**ImageEnhance — покращення зображення:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

# Яскравість
enhancer = ImageEnhance.Brightness(img)
bright = enhancer.enhance(1.5)  # 1.5 = на 50% яскравіше
bright.save('photo_bright.jpg')

# Контраст
enhancer = ImageEnhance.Contrast(img)
contrast = enhancer.enhance(1.5)  # 1.5 = на 50% більше контрасту
contrast.save('photo_contrast.jpg')

# Насиченість кольорів
enhancer = ImageEnhance.Color(img)
saturated = enhancer.enhance(1.3)
saturated.save('photo_saturated.jpg')

# Різкість
enhancer = ImageEnhance.Sharpness(img)
sharp = enhancer.enhance(2.0)  # 2.0 = вдвічі різкіше
sharp.save('photo_sharp.jpg')
\`\`\`

**Ручна зміна яскравості:**

\`\`\`python
from PIL import Image

def adjust_brightness(img, factor):
    """Змінити яскравість зображення"""
    from PIL import ImageOps
    
    # Конвертувати в відтінки сірого для обробки
    if img.mode != 'L':
        gray = img.convert('L')
    else:
        gray = img
    
    # Застосувати зміну яскравості
    enhanced = ImageEnhance.Brightness(gray).enhance(factor)
    
    # Якщо оригінал був кольоровим, повернути кольори
    if img.mode != 'L':
        # Об'єднати з оригінальним кольоровим зображенням
        return Image.blend(img, img.convert('RGB'), 0.5)
    
    return enhanced

img = Image.open('photo.jpg')
bright = adjust_brightness(img, 1.5)
bright.save('photo_bright_manual.jpg')
\`\`\`

**Автоматичне покращення:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

# Автоматичне покращення
enhanced = ImageEnhance.Contrast(img).enhance(1.2)
enhanced = ImageEnhance.Brightness(enhanced).enhance(1.1)
enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.1)
enhanced.save('photo_auto_enhanced.jpg')
\`\`\``
      },
      {
        title: "Базові фільтри",
        content: `**ImageFilter — вбудовані фільтри:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Розмиття
blurred = img.filter(ImageFilter.BLUR)
blurred.save('photo_blur.jpg')

# Сильне розмиття
blurred_more = img.filter(ImageFilter.GaussianBlur(radius=5))
blurred_more.save('photo_blur_strong.jpg')

# Різкість
sharp = img.filter(ImageFilter.SHARPEN)
sharp.save('photo_sharpen.jpg')

# Деталізація
detail = img.filter(ImageFilter.DETAIL)
detail.save('photo_detail.jpg')

# Крайові ефекти
edges = img.filter(ImageFilter.FIND_EDGES)
edges.save('photo_edges.jpg')

# Рельєф
emboss = img.filter(ImageFilter.EMBOSS)
emboss.save('photo_emboss.jpg')

# Контур
contour = img.filter(ImageFilter.CONTOUR)
contour.save('photo_contour.jpg')
\`\`\`

**Комбінація фільтрів:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance

img = Image.open('photo.jpg')

# Застосувати кілька фільтрів
enhanced = img.filter(ImageFilter.SHARPEN)
enhanced = enhanced.filter(ImageFilter.DETAIL)
enhanced = ImageEnhance.Contrast(enhanced).enhance(1.2)
enhanced.save('photo_multi_filter.jpg')
\`\`\`

**Створення мініатюр з фільтрами:**

\`\`\`python
from PIL import Image, ImageFilter

def create_thumbnail_with_filter(img_path, size=(200, 200), filter_type=None):
    img = Image.open(img_path)
    img.thumbnail(size)
    
    if filter_type:
        img = img.filter(filter_type)
    
    return img

img = Image.open('photo.jpg')
thumb = create_thumbnail_with_filter('photo.jpg', (200, 200), ImageFilter.SHARPEN)
thumb.save('photo_thumb_sharp.jpg')
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Створення мініатюр**

\`\`\`python
from PIL import Image
import os

def create_thumbnails(input_dir, output_dir, size=(200, 200)):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, f'thumb_{filename}')
            
            try:
                img = Image.open(input_path)
                img.thumbnail(size)
                img.save(output_path)
                print(f'Створено мініатюру: {filename}')
            except Exception as e:
                print(f'Помилка {filename}: {e}')

# Використання
create_thumbnails('photos/', 'thumbs/', (200, 200))
\`\`\`

**Приклад 2: Обрізання та зміна розміру**

\`\`\`python
from PIL import Image

def process_image(input_path, output_path, crop_box=None, new_size=None):
    img = Image.open(input_path)
    
    # Обрізати якщо вказано
    if crop_box:
        img = img.crop(crop_box)
    
    # Змінити розмір якщо вказано
    if new_size:
        img = img.resize(new_size, Image.LANCZOS)
    
    img.save(output_path)
    print(f'Оброблено: {output_path}')

# Використання
process_image('photo.jpg', 'processed.jpg', 
              crop_box=(100, 100, 500, 400),
              new_size=(800, 600))
\`\`\`

**Приклад 3: Пакетна обробка з покращенням**

\`\`\`python
from PIL import Image, ImageEnhance, ImageFilter
import os

def batch_enhance(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            try:
                img = Image.open(input_path)
                
                # Покращення
                img = ImageEnhance.Contrast(img).enhance(1.2)
                img = ImageEnhance.Brightness(img).enhance(1.1)
                img = img.filter(ImageFilter.SHARPEN)
                
                img.save(output_path)
                print(f'Покращено: {filename}')
            except Exception as e:
                print(f'Помилка {filename}: {e}')

# Використання
batch_enhance('photos/', 'enhanced/')
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили маніпуляції з зображеннями:

**Ключові методи:**

1. **resize()** — зміна розміру
2. **thumbnail()** — створення мініатюри
3. **crop()** — обрізання
4. **rotate()** — поворот
5. **transpose()** — стандартні перетворення
6. **ImageEnhance** — покращення яскравості, контрасту
7. **ImageFilter** — застосування фільтрів

**Основні операції:**

- Зміна розміру з збереженням пропорцій
- Обрізання за координатами
- Поворот та відображення
- Покращення яскравості та контрасту
- Застосування фільтрів (розмиття, різкість, краї)

**Важливо:**

- Використовуйте LANCZOS для найкращої якості при зміні розміру
- thumbnail() змінює оригінальне зображення
- Фактор enhance() > 1.0 збільшує, < 1.0 зменшує
- Комбінуйте операції для складних ефектів

**Наступний крок:**

У наступному уроці ми вивчимо роботу з кольорами та більш складні фільтри.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Зміна розміру",
      code: `from PIL import Image

img = Image.open('photo.jpg')
resized = img.resize((800, 600), Image.LANCZOS)
resized.save('photo_resized.jpg')`,
      explanation: "Змінюємо розмір зображення до 800x600 з високою якістю."
    },
    {
      title: "Приклад 2: Обрізання",
      code: `from PIL import Image

img = Image.open('photo.jpg')
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')`,
      explanation: "Обрізаємо зображення за вказаними координатами."
    },
    {
      title: "Приклад 3: Поворот",
      code: `from PIL import Image

img = Image.open('photo.jpg')
rotated = img.rotate(90, expand=True)
rotated.save('photo_rotated.jpg')`,
      explanation: "Повертаємо зображення на 90 градусів з розширенням canvas."
    },
    {
      title: "Приклад 4: Покращення",
      code: `from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')
enhancer = ImageEnhance.Contrast(img)
enhanced = enhancer.enhance(1.5)
enhanced.save('photo_enhanced.jpg')`,
      explanation: "Підвищуємо контраст зображення на 50%."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Використання resize() замість thumbnail()",
      explanation: "resize() може спотворити пропорції, thumbnail() зберігає пропорції.",
      correctApproach: "Використовуйте thumbnail() для створення мініатюр, resize() тільки коли потрібні точні розміри."
    },
    {
      mistake: "Забувати expand=True при повороті",
      explanation: "Без expand=True обрізаються кути зображення при повороті.",
      correctApproach: "Використовуйте rotate(angle, expand=True) для збереження всього зображення."
    },
    {
      mistake: "Неправильні координати для crop()",
      explanation: "Координати crop() мають бути (x1, y1, x2, y2), де x2 > x1 та y2 > y1.",
      correctApproach: "Перевіряйте координати: left < right, top < bottom."
    },
    {
      mistake: "Застосування фільтрів без перевірки режиму",
      explanation: "Деякі фільтри працюють тільки з певними режимами кольору.",
      correctApproach: "Конвертуйте в RGB перед застосуванням фільтрів: img.convert('RGB')."
    }
  ],
  
  summary: `На цьому уроці ми вивчили маніпуляції з зображеннями:

1. **Зміна розміру** — resize(), thumbnail()
2. **Обрізання** — crop()
3. **Поворот** — rotate(), transpose()
4. **Покращення** — ImageEnhance (яскравість, контраст)
5. **Фільтри** — ImageFilter (розмиття, різкість, краї)

Маніпуляції з зображеннями — основа обробки!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який метод зберігає пропорції при зміні розміру?",
        options: [
          "thumbnail()",
          "resize()",
          "scale()",
          "Обидва thumbnail() та resize()"
        ],
        correctAnswer: 0,
        explanation: "thumbnail() автоматично зберігає пропорції, resize() може їх спотворити."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який алгоритм дає найкращу якість при зміні розміру?",
        options: [
          "LANCZOS",
          "NEAREST",
          "BILINEAR",
          "BICUBIC"
        ],
        correctAnswer: 0,
        explanation: "LANCZOS зазвичай дає найкращу якість, особливо при зменшенні зображення."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що робить параметр expand=True в rotate()?",
        options: [
          "Розширює canvas, щоб вмістити все зображення",
          "Збільшує розмір зображення",
          "Зменшує розмір зображення",
          "Нічого не робить"
        ],
        correctAnswer: 0,
        explanation: "expand=True розширює canvas, щоб обрізані кути не втрачалися при повороті."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як підвищити контраст зображення на 50%?",
        options: [
          "ImageEnhance.Contrast(img).enhance(1.5)",
          "ImageEnhance.Contrast(img).enhance(0.5)",
          "ImageEnhance.Contrast(img).enhance(50)",
          "img.contrast(1.5)"
        ],
        correctAnswer: 0,
        explanation: "enhance(1.5) підвищує контраст на 50%. Фактор > 1.0 збільшує, < 1.0 зменшує."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "thumbnail() змінює оригінальне зображення на місці.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. thumbnail() модифікує зображення in-place. Використовуйте copy() якщо потрібно зберегти оригінал."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

