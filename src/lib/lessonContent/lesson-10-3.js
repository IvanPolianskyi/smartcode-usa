/**
 * Lesson 10-3: Робота з кольорами та фільтрами
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_3 = {
  lessonId: "lesson-10-3",
  moduleId: "module-10",
  order: 3,
  title: "Робота з кольорами та фільтрами",
  
  learningObjectives: [
    "Конвертувати кольорові простори",
    "Застосовувати фільтри",
    "Створювати ефекти",
    "Працювати з альфа-каналом"
  ],
  
  prerequisites: ["lesson-10-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Кольорові простори",
        content: `**Конвертація між кольоровими просторами:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# RGB -> Grayscale (відтінки сірого)
gray = img.convert('L')
gray.save('photo_gray.jpg')

# RGB -> RGBA (додати альфа-канал)
rgba = img.convert('RGBA')
rgba.save('photo_rgba.png')

# RGB -> CMYK (для друку)
cmyk = img.convert('CMYK')
cmyk.save('photo_cmyk.tif')

# RGB -> Palette (індексовані кольори)
palette = img.convert('P')
palette.save('photo_palette.png')
\`\`\`

**Робота з RGB компонентами:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Розділити на канали
r, g, b = img.split()

# Зберегти окремі канали
r.save('red_channel.jpg')
g.save('green_channel.jpg')
b.save('blue_channel.jpg')

# Об'єднати канали
merged = Image.merge('RGB', (r, g, b))
merged.save('merged.jpg')

# Змінити один канал
r_enhanced = ImageEnhance.Brightness(r).enhance(1.5)
new_img = Image.merge('RGB', (r_enhanced, g, b))
new_img.save('red_enhanced.jpg')
\`\`\`

**Робота з HSV:**

\`\`\`python
from PIL import Image
import colorsys

img = Image.open('photo.jpg')

# Конвертувати в HSV (Hue, Saturation, Value)
hsv = img.convert('HSV')
h, s, v = hsv.split()

# Змінити насиченість
s_enhanced = ImageEnhance.Brightness(s).enhance(1.5)
hsv_enhanced = Image.merge('HSV', (h, s_enhanced, v))
rgb_enhanced = hsv_enhanced.convert('RGB')
rgb_enhanced.save('saturated.jpg')
\`\`\``
      },
      {
        title: "Робота з альфа-каналом",
        content: `**Створення прозорого зображення:**

\`\`\`python
from PIL import Image

# Створити зображення з прозорістю
img = Image.new('RGBA', (800, 600), (255, 0, 0, 128))  # Напівпрозорий червоний
img.save('transparent.png')

# Додати альфа-канал до існуючого зображення
rgb_img = Image.open('photo.jpg')
rgba_img = rgb_img.convert('RGBA')
rgba_img.save('photo_with_alpha.png')
\`\`\`

**Маніпуляції з альфа-каналом:**

\`\`\`python
from PIL import Image

img = Image.open('photo.png')

if img.mode == 'RGBA':
    r, g, b, a = img.split()
    
    # Зробити більш прозорим
    a_light = ImageEnhance.Brightness(a).enhance(0.5)
    transparent = Image.merge('RGBA', (r, g, b, a_light))
    transparent.save('more_transparent.png')
    
    # Створити маску з альфа-каналу
    mask = a
    mask.save('alpha_mask.png')
\`\`\`

**Накладання зображень з прозорістю:**

\`\`\`python
from PIL import Image

# Фонове зображення
background = Image.open('background.jpg').convert('RGBA')

# Зображення для накладання
overlay = Image.open('overlay.png')

# Накласти з прозорістю
result = Image.alpha_composite(background, overlay)
result.save('composited.png')

# Або використати paste з маскою
background.paste(overlay, (100, 100), overlay)
background.save('pasted.png')
\`\`\`

**Створення градієнта прозорості:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg').convert('RGBA')
width, height = img.size

# Створити альфа-канал з градієнтом
alpha = Image.new('L', (width, height))
pixels = alpha.load()

for x in range(width):
    for y in range(height):
        # Градієнт від непрозорого до прозорого
        value = int(255 * (1 - x / width))
        pixels[x, y] = value

# Об'єднати з оригіналом
r, g, b, _ = img.split()
gradient = Image.merge('RGBA', (r, g, b, alpha))
gradient.save('gradient_alpha.png')
\`\`\``
      },
      {
        title: "Просунуті фільтри",
        content: `**ImageFilter - додаткові фільтри:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Gaussian Blur з радіусом
blurred = img.filter(ImageFilter.GaussianBlur(radius=3))
blurred.save('photo_gaussian_blur.jpg')

# Box Blur
box_blur = img.filter(ImageFilter.BoxBlur(radius=5))
box_blur.save('photo_box_blur.jpg')

# Unsharp Mask (підвищення різкості)
sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
sharp.save('photo_unsharp.jpg')

# Median Filter (видалення шуму)
denoised = img.filter(ImageFilter.MedianFilter(size=3))
denoised.save('photo_denoised.jpg')

# Min Filter
min_filter = img.filter(ImageFilter.MinFilter(size=3))
min_filter.save('photo_min.jpg')

# Max Filter
max_filter = img.filter(ImageFilter.MaxFilter(size=3))
max_filter.save('photo_max.jpg')
\`\`\`

**Кернели (Kernels) для фільтрів:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Створити власний кернел
kernel = ImageFilter.Kernel(
    size=(3, 3),
    kernel=[-1, -1, -1,
            -1,  9, -1,
            -1, -1, -1],
    scale=1
)

sharpened = img.filter(kernel)
sharpened.save('photo_custom_kernel.jpg')
\`\`\`

**Комбінація фільтрів:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance

img = Image.open('photo.jpg')

# Застосувати кілька фільтрів
processed = img.filter(ImageFilter.GaussianBlur(radius=1))
processed = processed.filter(ImageFilter.SHARPEN)
processed = ImageEnhance.Contrast(processed).enhance(1.2)
processed.save('photo_multi_processed.jpg')
\`\`\``
      },
      {
        title: "Створення ефектів",
        content: `**Ефект сепії:**

\`\`\`python
from PIL import Image

def sepia(img):
    # Конвертувати в відтінки сірого
    gray = img.convert('L')
    
    # Створити сепію
    sepia = Image.new('RGB', img.size)
    pixels = sepia.load()
    gray_pixels = gray.load()
    
    for x in range(img.width):
        for y in range(img.height):
            gray_value = gray_pixels[x, y]
            # Формула сепії
            r = min(255, int(gray_value * 1.2))
            g = min(255, int(gray_value * 0.9))
            b = min(255, int(gray_value * 0.6))
            pixels[x, y] = (r, g, b)
    
    return sepia

img = Image.open('photo.jpg')
sepia_img = sepia(img)
sepia_img.save('photo_sepia.jpg')
\`\`\`

**Ефект старих фотографій:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import random

def vintage_effect(img):
    # Конвертувати в відтінки сірого
    gray = img.convert('L')
    
    # Додати шум
    noisy = gray.copy()
    pixels = noisy.load()
    for x in range(noisy.width):
        for y in range(noisy.height):
            noise = random.randint(-20, 20)
            value = max(0, min(255, pixels[x, y] + noise))
            pixels[x, y] = value
    
    # Застосувати сепію
    sepia = Image.new('RGB', noisy.size)
    sepia_pixels = sepia.load()
    for x in range(noisy.width):
        for y in range(noisy.height):
            gray_value = pixels[x, y]
            r = min(255, int(gray_value * 1.1))
            g = min(255, int(gray_value * 0.85))
            b = min(255, int(gray_value * 0.6))
            sepia_pixels[x, y] = (r, g, b)
    
    # Додати легке розмиття
    vintage = sepia.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    return vintage

img = Image.open('photo.jpg')
vintage_img = vintage_effect(img)
vintage_img.save('photo_vintage.jpg')
\`\`\`

**Ефект акварелі:**

\`\`\`python
from PIL import Image, ImageFilter

def watercolor_effect(img):
    # Застосувати Gaussian Blur
    blurred = img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Підвищити насиченість
    from PIL import ImageEnhance
    saturated = ImageEnhance.Color(blurred).enhance(1.3)
    
    # Додати легку різкість
    sharp = saturated.filter(ImageFilter.SHARPEN)
    
    return sharp

img = Image.open('photo.jpg')
watercolor = watercolor_effect(img)
watercolor.save('photo_watercolor.jpg')
\`\`\`

**Ефект карикатури:**

\`\`\`python
from PIL import Image, ImageFilter

def cartoon_effect(img):
    # Зменшити кількість кольорів
    quantized = img.quantize(colors=64)
    quantized = quantized.convert('RGB')
    
    # Застосувати Median Filter для згладжування
    smoothed = quantized.filter(ImageFilter.MedianFilter(size=3))
    
    # Підвищити контраст
    from PIL import ImageEnhance
    contrasted = ImageEnhance.Contrast(smoothed).enhance(1.5)
    
    # Підвищити насиченість
    saturated = ImageEnhance.Color(contrasted).enhance(1.3)
    
    return saturated

img = Image.open('photo.jpg')
cartoon = cartoon_effect(img)
cartoon.save('photo_cartoon.jpg')
\`\`\``
      },
      {
        title: "Робота з масками",
        content: `**Створення маски:**

\`\`\`python
from PIL import Image, ImageDraw

img = Image.open('photo.jpg')

# Створити маску (чорно-біле зображення)
mask = Image.new('L', img.size, 0)  # 0 = чорний (прозорий)

# Малювати на маску
draw = ImageDraw.Draw(mask)
draw.ellipse([100, 100, 400, 400], fill=255)  # 255 = білий (непрозорий)

# Застосувати маску
masked = Image.new('RGBA', img.size)
masked.paste(img, (0, 0))
masked.putalpha(mask)
masked.save('masked.png')
\`\`\`

**Маска з градієнтом:**

\`\`\`python
from PIL import Image

def create_gradient_mask(size, direction='horizontal'):
    mask = Image.new('L', size)
    pixels = mask.load()
    width, height = size
    
    if direction == 'horizontal':
        for x in range(width):
            value = int(255 * (x / width))
            for y in range(height):
                pixels[x, y] = value
    else:  # vertical
        for y in range(height):
            value = int(255 * (y / height))
            for x in range(width):
                pixels[x, y] = value
    
    return mask

img = Image.open('photo.jpg').convert('RGBA')
mask = create_gradient_mask(img.size, 'horizontal')

# Застосувати маску
r, g, b, a = img.split()
masked_alpha = Image.merge('L', (mask,))
result = Image.merge('RGBA', (r, g, b, masked_alpha))
result.save('gradient_mask.png')
\`\`\`

**Використання маски для обрізання:**

\`\`\`python
from PIL import Image, ImageDraw

img = Image.open('photo.jpg')

# Створити круглу маску
mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
center_x, center_y = img.size[0] // 2, img.size[1] // 2
radius = min(center_x, center_y)
draw.ellipse([center_x - radius, center_y - radius,
              center_x + radius, center_y + radius], fill=255)

# Застосувати маску
output = Image.new('RGBA', img.size, (0, 0, 0, 0))
output.paste(img, (0, 0))
output.putalpha(mask)
output.save('circular_crop.png')
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Конвертер кольорів**

\`\`\`python
from PIL import Image

def convert_color_space(input_path, output_path, mode):
    img = Image.open(input_path)
    converted = img.convert(mode)
    converted.save(output_path)
    print(f'Конвертовано в {mode}: {output_path}')

# Використання
convert_color_space('photo.jpg', 'photo_gray.jpg', 'L')
convert_color_space('photo.jpg', 'photo_rgba.png', 'RGBA')
\`\`\`

**Приклад 2: Створення водяного знака**

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

def add_watermark(image_path, text, output_path):
    img = Image.open(image_path).convert('RGBA')
    
    # Створити текстовий шар
    txt = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt)
    
    # Додати текст (спробувати використати шрифт)
    try:
        font = ImageFont.truetype('arial.ttf', 40)
    except:
        font = ImageFont.load_default()
    
    # Позиція тексту
    text_width, text_height = draw.textsize(text, font=font)
    position = ((img.width - text_width) // 2, img.height - text_height - 20)
    
    # Напівпрозорий текст
    draw.text(position, text, fill=(255, 255, 255, 128), font=font)
    
    # Об'єднати
    watermarked = Image.alpha_composite(img, txt)
    watermarked = watermarked.convert('RGB')
    watermarked.save(output_path)

# Використання
add_watermark('photo.jpg', '© My Watermark', 'photo_watermarked.jpg')
\`\`\`

**Приклад 3: Пакетна обробка з ефектами**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import os

def batch_apply_effect(input_dir, output_dir, effect_func):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            try:
                img = Image.open(input_path)
                processed = effect_func(img)
                processed.save(output_path)
                print(f'Оброблено: {filename}')
            except Exception as e:
                print(f'Помилка {filename}: {e}')

# Функція ефекту
def sepia_effect(img):
    gray = img.convert('L')
    sepia = Image.new('RGB', img.size)
    pixels = sepia.load()
    gray_pixels = gray.load()
    for x in range(img.width):
        for y in range(img.height):
            g = gray_pixels[x, y]
            pixels[x, y] = (min(255, int(g * 1.2)), 
                          min(255, int(g * 0.9)), 
                          min(255, int(g * 0.6)))
    return sepia

# Використання
batch_apply_effect('photos/', 'sepia/', sepia_effect)
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили роботу з кольорами та фільтрами:

**Ключові концепції:**

1. **Кольорові простори** - RGB, RGBA, L, HSV, CMYK
2. **Альфа-канал** - прозорість, накладання зображень
3. **Просунуті фільтри** - GaussianBlur, UnsharpMask, MedianFilter
4. **Ефекти** - сепія, вінтаж, акварель, карикатура
5. **Маски** - створення та застосування масок

**Основні методи:**

- convert() - конвертація кольорових просторів
- split() / merge() - робота з каналами
- alpha_composite() - накладання з прозорістю
- ImageFilter - просунуті фільтри
- Створення власних ефектів

**Важливо:**

- RGBA підтримує прозорість (тільки PNG, WebP)
- Альфа-канал має значення 0-255 (0 = прозорий, 255 = непрозорий)
- Фільтри можна комбінувати для складних ефектів
- Маски дозволяють точно контролювати прозорість

**Наступний крок:**

У наступному уроці ми створимо повноцінний проект обробки зображень.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Конвертація кольорів",
      code: `from PIL import Image

img = Image.open('photo.jpg')
gray = img.convert('L')
rgba = img.convert('RGBA')
gray.save('gray.jpg')
rgba.save('rgba.png')`,
      explanation: "Конвертуємо зображення між різними кольоровими просторами."
    },
    {
      title: "Приклад 2: Робота з альфа-каналом",
      code: `from PIL import Image

img = Image.open('photo.jpg').convert('RGBA')
r, g, b, a = img.split()
# Маніпуляції з альфа-каналом
new_img = Image.merge('RGBA', (r, g, b, a))
new_img.save('with_alpha.png')`,
      explanation: "Розділяємо зображення на канали та працюємо з альфа-каналом."
    },
    {
      title: "Приклад 3: Просунуті фільтри",
      code: `from PIL import Image, ImageFilter

img = Image.open('photo.jpg')
blurred = img.filter(ImageFilter.GaussianBlur(radius=3))
sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150))`,
      explanation: "Застосовуємо просунуті фільтри з параметрами."
    },
    {
      title: "Приклад 4: Ефект сепії",
      code: `from PIL import Image

def sepia(img):
    gray = img.convert('L')
    sepia = Image.new('RGB', img.size)
    pixels = sepia.load()
    for x in range(img.width):
        for y in range(img.height):
            g = gray.getpixel((x, y))
            pixels[x, y] = (min(255, int(g*1.2)), 
                          min(255, int(g*0.9)), 
                          min(255, int(g*0.6)))
    return sepia`,
      explanation: "Створюємо ефект сепії, перетворюючи відтінки сірого в коричневі тони."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Спроба зберегти RGBA в JPEG",
      explanation: "JPEG не підтримує альфа-канал, дані будуть втрачені.",
      correctApproach: "Використовуйте PNG або WebP для зображень з прозорістю, або конвертуйте в RGB перед збереженням в JPEG."
    },
    {
      mistake: "Неправильне використання альфа-каналу",
      explanation: "Альфа-канал має значення 0-255, де 0 = прозорий, 255 = непрозорий.",
      correctApproach: "Перевіряйте значення альфа-каналу та використовуйте правильні методи для маніпуляцій."
    },
    {
      mistake: "Застосування фільтрів до неправильного режиму",
      explanation: "Деякі фільтри працюють тільки з певними режимами кольору.",
      correctApproach: "Конвертуйте зображення в потрібний режим перед застосуванням фільтрів."
    },
    {
      mistake: "Забувати про розмір маски",
      explanation: "Маска повинна мати той самий розмір, що й зображення.",
      correctApproach: "Створюйте маску з тим самим розміром: mask = Image.new('L', img.size, 0)."
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з кольорами та фільтрами:

1. Кольорові простори - RGB, RGBA, L, HSV, конвертація
2. Альфа-канал - прозорість, накладання
3. Просунуті фільтри - GaussianBlur, UnsharpMask
4. Ефекти - сепія, вінтаж, акварель
5. Маски - створення та застосування

Робота з кольорами та фільтрами відкриває безмежні можливості!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим кольору підтримує прозорість?",
        options: [
          "RGBA",
          "RGB",
          "L",
          "CMYK"
        ],
        correctAnswer: 0,
        explanation: "RGBA містить альфа-канал для прозорості. RGB, L та CMYK не підтримують прозорість."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що означає значення 0 в альфа-каналі?",
        options: [
          "Повністю прозорий",
          "Повністю непрозорий",
          "Напівпрозорий",
          "Чорний"
        ],
        correctAnswer: 0,
        explanation: "0 в альфа-каналі означає повністю прозорий піксель, 255 означає повністю непрозорий."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат файлу НЕ підтримує альфа-канал?",
        options: [
          "JPEG",
          "PNG",
          "WebP",
          "GIF"
        ],
        correctAnswer: 0,
        explanation: "JPEG не підтримує альфа-канал. PNG, WebP та GIF підтримують прозорість."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як розділити зображення на канали?",
        options: [
          "img.split()",
          "img.channels()",
          "img.separate()",
          "img.divide()"
        ],
        correctAnswer: 0,
        explanation: "img.split() розділяє зображення на окремі канали (R, G, B, A)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Можна зберегти RGBA зображення в JPEG формат.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JPEG не підтримує альфа-канал. Потрібно спочатку конвертувати в RGB: img.convert('RGB')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


