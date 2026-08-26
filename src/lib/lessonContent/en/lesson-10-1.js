/**
 * Lesson 10-1: Introduction to PIL/Pillow
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_10_1 = {
  lessonId: "lesson-10-1",
  moduleId: "module-10",
  order: 1,
  title: "Introduction to PIL/Pillow",
  
  learningObjectives: [
    "Install Pillow",
    "Open and save images",
    "Get image information",
    "Convert formats"
  ],
  
  prerequisites: ["lesson-09-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Introduction to PIL/Pillow",
        content: `PIL (Python Imaging Library) and its fork Pillow are powerful libraries for working with images in Python.

**What is Pillow?**

- A library for image processing
- Support for many formats (JPEG, PNG, GIF, BMP, TIFF, WebP)
- Resize, color, and filter operations
- A simple, convenient API

**Main capabilities:**

- Opening and saving images
- Resizing and cropping
- Format conversion
- Filters and effects
- Colors and alpha channel

**Installation:**

\`\`\`bash
pip install Pillow
\`\`\`

**Import:**

\`\`\`python
from PIL import Image
\`\`\``
      },
      {
        title: "Opening and saving images",
        content: `**Opening an image:**

\`\`\`python
from PIL import Image

# Open an image
img = Image.open('photo.jpg')
print(img)  # <PIL.JpegImagePlugin.JpegImageFile image mode=RGB size=1920x1080 at 0x...>
\`\`\`

**Main methods:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Show the image (opens in the default viewer)
img.show()

# Save the image
img.save('new_photo.png')

# Save in another format
img.save('photo_webp.webp', 'WEBP')
\`\`\`

**Working with different formats:**

\`\`\`python
from PIL import Image

# JPEG
img_jpg = Image.open('photo.jpg')
img_jpg.save('copy.jpg', 'JPEG')

# PNG (supports transparency)
img_png = Image.open('image.png')
img_png.save('copy.png', 'PNG')

# GIF
img_gif = Image.open('animation.gif')
img_gif.save('copy.gif', 'GIF')
\`\`\`

**Format conversion:**

\`\`\`python
from PIL import Image

# Convert JPEG to PNG
img = Image.open('photo.jpg')
img.save('photo.png', 'PNG')

# Convert PNG to WebP
img = Image.open('image.png')
img.save('image.webp', 'WEBP')
\`\`\``
      },
      {
        title: "Getting image information",
        content: `**Main image properties:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Image size (width, height)
print(img.size)  # (1920, 1080)
print(f'Width: {img.width}, Height: {img.height}')

# File format
print(img.format)  # JPEG

# Color mode
print(img.mode)  # RGB, RGBA, L (grayscale), P (palette), etc.

# File path (if opened from a file)
print(img.filename)  # photo.jpg
\`\`\`

**Color modes:**

- **RGB** — red, green, blue (24-bit)
- **RGBA** — RGB + alpha (transparency, 32-bit)
- **L** — grayscale (8-bit)
- **P** — palette (8-bit, indexed colors)
- **CMYK** — for print (cyan, magenta, yellow, black)

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}')
print(f'Format: {img.format}')
print(f'Mode: {img.mode}')

if img.mode == 'RGB':
    print('Image is in RGB color mode')
elif img.mode == 'RGBA':
    print('Image has transparency')
elif img.mode == 'L':
    print('Grayscale')
\`\`\`

**Working with pixels:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Get a pixel at (x, y)
pixel = img.getpixel((100, 200))
print(pixel)  # (255, 128, 64) for RGB

# Set a pixel
img.putpixel((100, 200), (255, 0, 0))  # Red pixel

# Access all pixel data
pixels = img.load()
print(pixels[100, 200])  # (255, 0, 0)
\`\`\``
      },
      {
        title: "Creating new images",
        content: `**Create a blank image:**

\`\`\`python
from PIL import Image

# New RGB image (width, height, color)
img = Image.new('RGB', (800, 600), color='white')
img.save('white_image.jpg')

# Image with a solid color
img = Image.new('RGB', (800, 600), color=(255, 0, 0))  # Red
img.save('red_image.jpg')

# Image with transparency
img = Image.new('RGBA', (800, 600), color=(255, 0, 0, 128))  # Semi-transparent red
img.save('transparent.png')
\`\`\`

**Create a gradient:**

\`\`\`python
from PIL import Image

width, height = 800, 600
img = Image.new('RGB', (width, height))

pixels = img.load()
for x in range(width):
    for y in range(height):
        # Gradient from red to blue
        r = int(255 * (x / width))
        g = 0
        b = int(255 * (1 - x / width))
        pixels[x, y] = (r, g, b)

img.save('gradient.jpg')
\`\`\`

**Copying an image:**

\`\`\`python
from PIL import Image

original = Image.open('photo.jpg')

copy = original.copy()
copy.save('photo_copy.jpg')

# Or simply save under another name
original.save('photo_backup.jpg')
\`\`\``
      },
      {
        title: "Basic operations",
        content: `**Mode conversion:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Convert to grayscale
gray = img.convert('L')
gray.save('photo_gray.jpg')

# Convert to RGBA (add alpha channel)
rgba = img.convert('RGBA')
rgba.save('photo_rgba.png')
\`\`\`

**Image statistics:**

\`\`\`python
from PIL import Image, ImageStat

img = Image.open('photo.jpg')

stat = ImageStat.Stat(img)
print(f'Mean: {stat.mean}')
print(f'Min: {stat.min}')
print(f'Max: {stat.max}')
print(f'Standard deviation: {stat.stddev}')
\`\`\`

**Validation:**

\`\`\`python
from PIL import Image

def is_valid_image(filepath):
    try:
        img = Image.open(filepath)
        img.verify()  # Integrity check
        return True
    except Exception as e:
        print(f'Error: {e}')
        return False

if is_valid_image('photo.jpg'):
    print('Image is valid')
else:
    print('Image is corrupted')
\`\`\`

**Working with EXIF data:**

\`\`\`python
from PIL import Image
from PIL.ExifTags import TAGS

img = Image.open('photo.jpg')

exifdata = img.getexif()

if exifdata:
    for tag_id in exifdata:
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        print(f'{tag}: {data}')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Format converter**

\`\`\`python
from PIL import Image

def convert_image(input_path, output_path, output_format):
    try:
        img = Image.open(input_path)
        img.save(output_path, output_format)
        print(f'Converted: {input_path} -> {output_path}')
        return True
    except Exception as e:
        print(f'Error: {e}')
        return False

convert_image('photo.jpg', 'photo.png', 'PNG')
\`\`\`

**Example 2: Batch conversion**

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
                print(f'Converted: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

batch_convert('images/', 'converted/', 'PNG')
\`\`\`

**Example 3: Check image size**

\`\`\`python
from PIL import Image

def check_image_size(filepath, max_width=1920, max_height=1080):
    img = Image.open(filepath)
    width, height = img.size
    
    if width > max_width or height > max_height:
        print(f'Image too large: {width}x{height}')
        return False
    else:
        print(f'Size OK: {width}x{height}')
        return True

check_image_size('photo.jpg', max_width=1920, max_height=1080)
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we covered the basics of Pillow:

**Key methods:**

1. **Image.open()** — open an image
2. **img.save()** — save an image
3. **img.size** — image size
4. **img.mode** — color mode
5. **img.convert()** — convert mode
6. **Image.new()** — create a new image

**Core ideas:**

- Image formats (JPEG, PNG, GIF, WebP)
- Color modes (RGB, RGBA, L, P)
- Opening and saving
- Format conversion
- Reading image metadata

**Important:**

- Pillow supports many formats
- Always check the format before saving
- RGBA supports transparency (PNG, WebP only)
- Use try/except for error handling

**Next step:**

Next we will manipulate images: resize, crop, rotate, and apply basic filters.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Open and save",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}, Format: {img.format}')
img.save('copy.png', 'PNG')`,
      explanation: "Open an image, print info, and save in another format."
    },
    {
      title: "Example 2: Create a new image",
      code: `from PIL import Image

img = Image.new('RGB', (800, 600), color='blue')
img.save('blue_image.jpg')`,
      explanation: "Create a new blue image at 800x600 pixels."
    },
    {
      title: "Example 3: Convert to grayscale",
      code: `from PIL import Image

img = Image.open('photo.jpg')
gray = img.convert('L')
gray.save('photo_gray.jpg')`,
      explanation: "Convert a color image to grayscale."
    },
    {
      title: "Example 4: Get information",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}')
print(f'Mode: {img.mode}')
print(f'Format: {img.format}')`,
      explanation: "Read basic information about an image."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not specifying the format when saving",
      explanation: "If the file extension does not match the format, you may get an error.",
      correctApproach: "Always set the format explicitly: img.save('file.png', 'PNG')."
    },
    {
      mistake: "Trying to save RGBA as JPEG",
      explanation: "JPEG does not support transparency — only PNG and WebP do.",
      correctApproach: "Use PNG or WebP for transparency, or convert to RGB before saving as JPEG."
    },
    {
      mistake: "Not checking that the file exists",
      explanation: "If the file is missing, Image.open() raises an exception.",
      correctApproach: "Use try/except or os.path.exists() before opening."
    },
    {
      mistake: "Forgetting to close large images",
      explanation: "Python closes files automatically, but it is better to close large images explicitly.",
      correctApproach: "Use img.close() or with Image.open() as img:."
    }
  ],
  
  summary: `In this lesson we learned the basics of Pillow:

1. Install and import — pip install Pillow
2. Open and save — Image.open(), img.save()
3. Image info — size, mode, format
4. Create images — Image.new()
5. Convert formats — save in different formats
6. Color modes — RGB, RGBA, L, P

Pillow is a powerful tool for working with images!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you install Pillow?",
        options: [
          "pip install Pillow",
          "pip install PIL",
          "pip install Image",
          "pip install pillow"
        ],
        correctAnswer: 0,
        explanation: "Install with pip install Pillow (capital P)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which color mode is used for images with transparency?",
        options: [
          "RGBA",
          "RGB",
          "L",
          "P"
        ],
        correctAnswer: 0,
        explanation: "RGBA (Red, Green, Blue, Alpha) includes an alpha channel for transparency."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which format does NOT support transparency?",
        options: [
          "JPEG",
          "PNG",
          "WebP",
          "GIF"
        ],
        correctAnswer: 0,
        explanation: "JPEG does not support transparency. PNG, WebP, and GIF do."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you get an image's size?",
        options: [
          "img.size",
          "img.width, img.height",
          "img.get_size()",
          "img.dimensions"
        ],
        correctAnswer: 0,
        explanation: "img.size returns a (width, height) tuple."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can save an RGBA image as JPEG without converting.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JPEG has no alpha channel. Convert first: img.convert('RGB')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
