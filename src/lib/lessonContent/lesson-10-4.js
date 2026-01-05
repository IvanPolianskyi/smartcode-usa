/**
 * Lesson 10-4: Практика: обробка зображень
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_10_4 = {
  lessonId: "lesson-10-4",
  moduleId: "module-10",
  order: 4,
  title: "Практика: обробка зображень",
  
  learningObjectives: [
    "Створити скрипт для обробки зображень",
    "Реалізувати пакетну обробку",
    "Створити корисний інструмент",
    "Практикуватися у роботі з зображеннями"
  ],
  
  prerequisites: ["lesson-10-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до проекту",
        content: `У цьому уроці ми створимо повноцінний проект для обробки зображень.

**Цілі проекту:**

- Створити універсальний інструмент обробки
- Реалізувати пакетну обробку
- Додати різні ефекти та фільтри
- Зберегти оброблені зображення
- Створити зручний інтерфейс

**Що ми будемо робити:**

1. Планування структури проекту
2. Створення класу ImageProcessor
3. Реалізація базових операцій
4. Додавання ефектів
5. Пакетна обробка
6. Тестування та оптимізація

**Приклад проекту: Універсальний обробник зображень**

Ми створимо клас, який дозволяє обробляти зображення з різними ефектами та зберігати результати.`
      },
      {
        title: "Етап 1: Планування та структура",
        content: `**Структура проекту:**

\`\`\`python
class ImageProcessor:
    def __init__(self, input_path):
        # Ініціалізація
        pass
    
    def resize(self, size):
        # Зміна розміру
        pass
    
    def crop(self, box):
        # Обрізання
        pass
    
    def apply_filter(self, filter_type):
        # Застосування фільтра
        pass
    
    def apply_effect(self, effect_name):
        # Застосування ефекту
        pass
    
    def save(self, output_path):
        # Збереження
        pass
\`\`\`

**Планування функцій:**

- Відкриття та валідація зображення
- Базові операції (resize, crop, rotate)
- Застосування фільтрів
- Застосування ефектів
- Збереження в різних форматах
- Пакетна обробка`
      },
      {
        title: "Етап 2: Базовий клас ImageProcessor",
        content: `**Повна реалізація класу:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import os

class ImageProcessor:
    def __init__(self, input_path):
        """Ініціалізація обробника"""
        if not os.path.exists(input_path):
            raise FileNotFoundError(f'Файл не знайдено: {input_path}')
        
        self.input_path = input_path
        self.image = Image.open(input_path)
        self.original = self.image.copy()
    
    def resize(self, size, keep_aspect=False):
        """Змінити розмір зображення"""
        if keep_aspect:
            self.image.thumbnail(size, Image.LANCZOS)
        else:
            self.image = self.image.resize(size, Image.LANCZOS)
        return self
    
    def crop(self, box):
        """Обрізати зображення"""
        self.image = self.image.crop(box)
        return self
    
    def rotate(self, angle, expand=True):
        """Повернути зображення"""
        self.image = self.image.rotate(angle, expand=expand)
        return self
    
    def flip_horizontal(self):
        """Відобразити горизонтально"""
        self.image = self.image.transpose(Image.FLIP_LEFT_RIGHT)
        return self
    
    def flip_vertical(self):
        """Відобразити вертикально"""
        self.image = self.image.transpose(Image.FLIP_TOP_BOTTOM)
        return self
    
    def enhance_contrast(self, factor=1.2):
        """Підвищити контраст"""
        enhancer = ImageEnhance.Contrast(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_brightness(self, factor=1.1):
        """Підвищити яскравість"""
        enhancer = ImageEnhance.Brightness(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_saturation(self, factor=1.3):
        """Підвищити насиченість"""
        enhancer = ImageEnhance.Color(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def apply_filter(self, filter_type):
        """Застосувати фільтр"""
        if filter_type == 'blur':
            self.image = self.image.filter(ImageFilter.BLUR)
        elif filter_type == 'sharpen':
            self.image = self.image.filter(ImageFilter.SHARPEN)
        elif filter_type == 'gaussian_blur':
            self.image = self.image.filter(ImageFilter.GaussianBlur(radius=3))
        elif filter_type == 'edge':
            self.image = self.image.filter(ImageFilter.FIND_EDGES)
        elif filter_type == 'emboss':
            self.image = self.image.filter(ImageFilter.EMBOSS)
        return self
    
    def reset(self):
        """Повернути до оригіналу"""
        self.image = self.original.copy()
        return self
    
    def save(self, output_path, format=None):
        """Зберегти оброблене зображення"""
        if format:
            self.image.save(output_path, format)
        else:
            self.image.save(output_path)
        print(f'Збережено: {output_path}')
        return self
\`\`\`

**Використання:**

\`\`\`python
# Створити обробник
processor = ImageProcessor('photo.jpg')

# Застосувати операції
processor.resize((800, 600)) \\
         .enhance_contrast(1.2) \\
         .enhance_brightness(1.1) \\
         .apply_filter('sharpen') \\
         .save('processed.jpg')
\`\`\``
      },
      {
        title: "Етап 3: Додавання ефектів",
        content: `**Розширення класу ефектами:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import random

class ImageProcessor:
    # ... попередні методи ...
    
    def sepia(self):
        """Ефект сепії"""
        gray = self.image.convert('L')
        sepia = Image.new('RGB', self.image.size)
        pixels = sepia.load()
        gray_pixels = gray.load()
        
        for x in range(self.image.width):
            for y in range(self.image.height):
                g = gray_pixels[x, y]
                pixels[x, y] = (
                    min(255, int(g * 1.2)),
                    min(255, int(g * 0.9)),
                    min(255, int(g * 0.6))
                )
        
        self.image = sepia
        return self
    
    def grayscale(self):
        """Конвертувати в відтінки сірого"""
        self.image = self.image.convert('L').convert('RGB')
        return self
    
    def vintage(self):
        """Вінтажний ефект"""
        # Конвертувати в відтінки сірого
        gray = self.image.convert('L')
        
        # Додати шум
        noisy = gray.copy()
        pixels = noisy.load()
        for x in range(noisy.width):
            for y in range(noisy.height):
                noise = random.randint(-15, 15)
                value = max(0, min(255, pixels[x, y] + noise))
                pixels[x, y] = value
        
        # Застосувати сепію
        sepia = Image.new('RGB', noisy.size)
        sepia_pixels = sepia.load()
        for x in range(noisy.width):
            for y in range(noisy.height):
                g = pixels[x, y]
                sepia_pixels[x, y] = (
                    min(255, int(g * 1.1)),
                    min(255, int(g * 0.85)),
                    min(255, int(g * 0.6))
                )
        
        # Легке розмиття
        self.image = sepia.filter(ImageFilter.GaussianBlur(radius=0.5))
        return self
    
    def watercolor(self):
        """Ефект акварелі"""
        blurred = self.image.filter(ImageFilter.GaussianBlur(radius=2))
        saturated = ImageEnhance.Color(blurred).enhance(1.3)
        self.image = saturated.filter(ImageFilter.SHARPEN)
        return self
    
    def cartoon(self):
        """Ефект карикатури"""
        quantized = self.image.quantize(colors=64).convert('RGB')
        smoothed = quantized.filter(ImageFilter.MedianFilter(size=3))
        contrasted = ImageEnhance.Contrast(smoothed).enhance(1.5)
        self.image = ImageEnhance.Color(contrasted).enhance(1.3)
        return self
\`\`\`

**Використання ефектів:**

\`\`\`python
processor = ImageProcessor('photo.jpg')

# Застосувати ефект сепії
processor.sepia().save('photo_sepia.jpg')

# Вінтажний ефект
processor.reset().vintage().save('photo_vintage.jpg')

# Акварель
processor.reset().watercolor().save('photo_watercolor.jpg')
\`\`\``
      },
      {
        title: "Етап 4: Пакетна обробка",
        content: `**Функція пакетної обробки:**

\`\`\`python
import os
from PIL import Image

def batch_process(input_dir, output_dir, operations):
    """
    Пакетна обробка зображень
    
    operations: список функцій для застосування
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    processed = 0
    errors = 0
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)
            
            try:
                processor = ImageProcessor(input_path)
                
                # Застосувати всі операції
                for operation in operations:
                    if callable(operation):
                        operation(processor)
                    elif isinstance(operation, dict):
                        # Операція з параметрами
                        method = getattr(processor, operation['method'])
                        method(*operation.get('args', []), **operation.get('kwargs', {}))
                
                processor.save(output_path)
                processed += 1
                print(f' Оброблено: {filename}')
                
            except Exception as e:
                errors += 1
                print(f' Помилка {filename}: {e}')
    
    print(f'\\nЗавершено: {processed} успішно, {errors} помилок')

# Використання
operations = [
    lambda p: p.resize((800, 600), keep_aspect=True),
    lambda p: p.enhance_contrast(1.2),
    lambda p: p.apply_filter('sharpen')
]

batch_process('input/', 'output/', operations)
\`\`\`

**Пакетна обробка з різними ефектами:**

\`\`\`python
def batch_apply_effects(input_dir, output_dir):
    """Застосувати різні ефекти до зображень"""
    effects = {
        'sepia': lambda p: p.sepia(),
        'vintage': lambda p: p.vintage(),
        'watercolor': lambda p: p.watercolor(),
        'cartoon': lambda p: p.cartoon()
    }
    
    for effect_name, effect_func in effects.items():
        effect_dir = os.path.join(output_dir, effect_name)
        if not os.path.exists(effect_dir):
            os.makedirs(effect_dir)
        
        for filename in os.listdir(input_dir):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                input_path = os.path.join(input_dir, filename)
                output_path = os.path.join(effect_dir, filename)
                
                try:
                    processor = ImageProcessor(input_path)
                    effect_func(processor)
                    processor.save(output_path)
                    print(f'{effect_name}: {filename}')
                except Exception as e:
                    print(f'Помилка {filename}: {e}')

# Використання
batch_apply_effects('photos/', 'processed/')
\`\`\``
      },
      {
        title: "Етап 5: Створення водяного знака",
        content: `**Додавання водяного знака:**

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

class ImageProcessor:
    # ... попередні методи ...
    
    def add_watermark(self, text, position='bottom-right', opacity=128):
        """Додати текстовий водяний знак"""
        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        
        # Створити текстовий шар
        txt = Image.new('RGBA', self.image.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(txt)
        
        # Спробувати використати шрифт
        try:
            font = ImageFont.truetype('arial.ttf', 40)
        except:
            font = ImageFont.load_default()
        
        # Розрахувати позицію
        text_width, text_height = draw.textsize(text, font=font)
        width, height = self.image.size
        
        if position == 'bottom-right':
            pos = (width - text_width - 20, height - text_height - 20)
        elif position == 'bottom-left':
            pos = (20, height - text_height - 20)
        elif position == 'top-right':
            pos = (width - text_width - 20, 20)
        elif position == 'top-left':
            pos = (20, 20)
        else:  # center
            pos = ((width - text_width) // 2, (height - text_height) // 2)
        
        # Намалювати текст
        draw.text(pos, text, fill=(255, 255, 255, opacity), font=font)
        
        # Об'єднати
        self.image = Image.alpha_composite(self.image, txt)
        return self
    
    def add_image_watermark(self, watermark_path, position='bottom-right', opacity=0.5):
        """Додати зображення як водяний знак"""
        watermark = Image.open(watermark_path).convert('RGBA')
        
        # Змінити прозорість
        if opacity < 1.0:
            alpha = watermark.split()[3]
            alpha = alpha.point(lambda p: int(p * opacity))
            watermark.putalpha(alpha)
        
        # Розрахувати позицію
        img_width, img_height = self.image.size
        wm_width, wm_height = watermark.size
        
        if position == 'bottom-right':
            pos = (img_width - wm_width - 20, img_height - wm_height - 20)
        elif position == 'bottom-left':
            pos = (20, img_height - wm_height - 20)
        elif position == 'top-right':
            pos = (img_width - wm_width - 20, 20)
        elif position == 'top-left':
            pos = (20, 20)
        else:  # center
            pos = ((img_width - wm_width) // 2, (img_height - wm_height) // 2)
        
        # Накласти
        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        
        self.image.paste(watermark, pos, watermark)
        return self
\`\`\`

**Використання:**

\`\`\`python
processor = ImageProcessor('photo.jpg')
processor.add_watermark('© My Company', position='bottom-right') \\
         .save('watermarked.png')

# Або зображення
processor.reset() \\
         .add_image_watermark('logo.png', position='bottom-right', opacity=0.7) \\
         .save('watermarked2.png')
\`\`\``
      },
      {
        title: "Етап 6: Повний приклад проекту",
        content: `**Повна реалізація з усіма функціями:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageFont
import os
import random

class ImageProcessor:
    def __init__(self, input_path):
        if not os.path.exists(input_path):
            raise FileNotFoundError(f'Файл не знайдено: {input_path}')
        self.input_path = input_path
        self.image = Image.open(input_path)
        self.original = self.image.copy()
    
    # Базові операції
    def resize(self, size, keep_aspect=False):
        if keep_aspect:
            self.image.thumbnail(size, Image.LANCZOS)
        else:
            self.image = self.image.resize(size, Image.LANCZOS)
        return self
    
    def crop(self, box):
        self.image = self.image.crop(box)
        return self
    
    def rotate(self, angle, expand=True):
        self.image = self.image.rotate(angle, expand=expand)
        return self
    
    # Покращення
    def enhance_contrast(self, factor=1.2):
        enhancer = ImageEnhance.Contrast(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_brightness(self, factor=1.1):
        enhancer = ImageEnhance.Brightness(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_saturation(self, factor=1.3):
        enhancer = ImageEnhance.Color(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    # Фільтри
    def apply_filter(self, filter_type):
        filters = {
            'blur': ImageFilter.BLUR,
            'sharpen': ImageFilter.SHARPEN,
            'gaussian_blur': ImageFilter.GaussianBlur(radius=3),
            'edge': ImageFilter.FIND_EDGES,
            'emboss': ImageFilter.EMBOSS
        }
        if filter_type in filters:
            self.image = self.image.filter(filters[filter_type])
        return self
    
    # Ефекти
    def sepia(self):
        gray = self.image.convert('L')
        sepia = Image.new('RGB', self.image.size)
        pixels = sepia.load()
        gray_pixels = gray.load()
        for x in range(self.image.width):
            for y in range(self.image.height):
                g = gray_pixels[x, y]
                pixels[x, y] = (
                    min(255, int(g * 1.2)),
                    min(255, int(g * 0.9)),
                    min(255, int(g * 0.6))
                )
        self.image = sepia
        return self
    
    def grayscale(self):
        self.image = self.image.convert('L').convert('RGB')
        return self
    
    # Водяний знак
    def add_watermark(self, text, position='bottom-right', opacity=128):
        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        txt = Image.new('RGBA', self.image.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(txt)
        try:
            font = ImageFont.truetype('arial.ttf', 40)
        except:
            font = ImageFont.load_default()
        text_width, text_height = draw.textsize(text, font=font)
        width, height = self.image.size
        positions = {
            'bottom-right': (width - text_width - 20, height - text_height - 20),
            'bottom-left': (20, height - text_height - 20),
            'top-right': (width - text_width - 20, 20),
            'top-left': (20, 20),
            'center': ((width - text_width) // 2, (height - text_height) // 2)
        }
        pos = positions.get(position, positions['bottom-right'])
        draw.text(pos, text, fill=(255, 255, 255, opacity), font=font)
        self.image = Image.alpha_composite(self.image, txt)
        return self
    
    def reset(self):
        self.image = self.original.copy()
        return self
    
    def save(self, output_path, format=None):
        if format:
            self.image.save(output_path, format)
        else:
            self.image.save(output_path)
        print(f'Збережено: {output_path}')
        return self

# Використання
if __name__ == '__main__':
    processor = ImageProcessor('photo.jpg')
    processor.resize((800, 600), keep_aspect=True) \\
             .enhance_contrast(1.2) \\
             .enhance_brightness(1.1) \\
             .apply_filter('sharpen') \\
             .add_watermark('© 2024', position='bottom-right') \\
             .save('processed.jpg')
\`\`\``
      },
      {
        title: "Підсумок проекту",
        content: `На цьому уроці ми створили повноцінний проект обробки зображень:

**Що ми зробили:**

1. **Планування** - визначили структуру та функції
2. **Базовий клас** - створили ImageProcessor з основними операціями
3. **Ефекти** - додали сепію, вінтаж, акварель, карикатуру
4. **Пакетна обробка** - реалізували обробку кількох файлів
5. **Водяний знак** - додали текстовий та графічний водяний знак
6. **Повна реалізація** - об'єднали всі функції

**Навички, які ми отримали:**

- Структурування коду в класи
- Створення ланцюжкових методів
- Реалізація різних ефектів
- Пакетна обробка файлів
- Робота з прозорістю та накладанням

**Наступні кроки:**

- Додати CLI інтерфейс
- Створити веб-інтерфейс
- Додати більше ефектів
- Оптимізувати продуктивність
- Додати підтримку метаданих

Обробка зображень - потужний інструмент для автоматизації!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Базове використання",
      code: `from PIL import Image, ImageEnhance, ImageFilter

class ImageProcessor:
    def __init__(self, input_path):
        self.image = Image.open(input_path)
    
    def enhance_contrast(self, factor):
        enhancer = ImageEnhance.Contrast(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def save(self, output_path):
        self.image.save(output_path)

processor = ImageProcessor('photo.jpg')
processor.enhance_contrast(1.2).save('enhanced.jpg')`,
      explanation: "Базовий приклад використання класу ImageProcessor з ланцюжковими методами."
    },
    {
      title: "Приклад 2: Пакетна обробка",
      code: `import os
from PIL import Image, ImageEnhance

def batch_enhance(input_dir, output_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith(('.jpg', '.png')):
            img = Image.open(os.path.join(input_dir, filename))
            enhanced = ImageEnhance.Contrast(img).enhance(1.2)
            enhanced.save(os.path.join(output_dir, filename))`,
      explanation: "Пакетна обробка всіх зображень у директорії."
    },
    {
      title: "Приклад 3: Ефект сепії",
      code: `def sepia(img):
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
      explanation: "Функція для застосування ефекту сепії до зображення."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не зберігати оригінал",
      explanation: "Якщо не зберегти оригінал, неможливо повернутися до початкового стану.",
      correctApproach: "Завжди зберігайте копію оригіналу: self.original = self.image.copy()."
    },
    {
      mistake: "Не обробляти помилки в пакетній обробці",
      explanation: "Одна помилка може зупинити всю пакетну обробку.",
      correctApproach: "Використовуйте try/except для кожної ітерації в пакетній обробці."
    },
    {
      mistake: "Не перевіряти існування директорій",
      explanation: "Якщо вихідна директорія не існує, виникне помилка.",
      correctApproach: "Створюйте директорії перед збереженням: os.makedirs(output_dir, exist_ok=True)."
    },
    {
      mistake: "Забувати про формати при збереженні",
      explanation: "Деякі операції (наприклад, альфа-канал) потребують певних форматів.",
      correctApproach: "Вказуйте формат явно або перевіряйте режим зображення перед збереженням."
    }
  ],
  
  summary: `На цьому уроці ми створили повноцінний проект обробки зображень:

1. Планування - структура та функції
2. Базовий клас - ImageProcessor з основними операціями
3. Ефекти - сепія, вінтаж, акварель, карикатура
4. Пакетна обробка - обробка кількох файлів
5. Водяний знак - текстовий та графічний
6. Повна реалізація - об'єднання всіх функцій

Практичний проект - найкращий спосіб закріпити навички!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо зберігати оригінальне зображення?",
        options: [
          "Щоб можна було повернутися до початкового стану",
          "Щоб зайняти більше пам'яті",
          "Щоб ускладнити код",
          "Це не потрібно"
        ],
        correctAnswer: 0,
        explanation: "Збереження оригіналу дозволяє повернутися до початкового стану та спробувати різні ефекти."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що таке ланцюжкові методи?",
        options: [
          "Методи, які повертають self для послідовного виклику",
          "Методи, які з'єднані між собою",
          "Методи, які працюють тільки з ланцюгами",
          "Методи для обробки ланцюгів"
        ],
        correctAnswer: 0,
        explanation: "Ланцюжкові методи повертають self, що дозволяє викликати кілька методів послідовно: obj.method1().method2().method3()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Чому важливо обробляти помилки в пакетній обробці?",
        options: [
          "Щоб одна помилка не зупинила всю обробку",
          "Щоб прискорити обробку",
          "Щоб зберегти пам'ять",
          "Помилки не важливі"
        ],
        correctAnswer: 0,
        explanation: "Обробка помилок дозволяє продовжити обробку інших файлів навіть якщо один файл викликав помилку."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який формат файлу підтримує альфа-канал для водяного знака?",
        options: [
          "PNG",
          "JPEG",
          "BMP",
          "Всі формати"
        ],
        correctAnswer: 0,
        explanation: "PNG підтримує альфа-канал. JPEG та BMP не підтримують прозорість."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Пакетна обробка завжди швидша за обробку одного файлу.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Пакетна обробка не прискорює обробку одного файлу, але дозволяє автоматично обробити багато файлів."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}


