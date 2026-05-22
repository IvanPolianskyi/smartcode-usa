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

- Library for image processing
- Support for many formats (JPEG, PNG, GIF, BMP, TIFF, WebP)
- Manipulations with size, colors, filters
- Simple and convenient API

**Main features:**

- Opening and saving images
- Resize and crop
- Format conversion
- Application of filters and effects
- Work with colors and alpha channel

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
        content: `**Open image:**

\`\`\`python
from PIL import Image

# Open the image
img = Image.open('photo.jpg')
print(img) # <PIL.JpegImagePlugin.JpegImageFile image mode=RGB size=1920x1080 at 0x...>
\`\`\`

**Main methods:**

\`\`\`python
from PIL import Image

# Open the image
img = Image.open('photo.jpg')

# Show image (will open in standard viewer)
img.show()

# Save the image
img.save('new_photo.png')

# Save in a different format
img.save('photo_webp.webp', 'WEBP')
\`\`\`

**Working with different formats:**

\`\`\`python
from PIL import Image

# JPEG
img_jpg = Image.open('photo.jpg')
img_jpg.save('copy.jpg', 'JPEG')

# PNG (with transparency support)
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
        title: "Getting information about the image",
        content: `**Basic properties of the image:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Image size (width, height)
print(img.size) # (1920, 1080)
print(f'Width: {img.width}, Height: {img.height}')

# File format
print(img.format) # JPEG

# Color mode
print(img.mode) # RGB, RGBA, L (grayscale), P (palette), etc.

# File path (if opened from file)
print(img.filename) # photo.jpg
\`\`\`

**Color modes:**

- **RGB** - red, green, blue (24 bits)
- **RGBA** - RGB + alpha channel (transparency, 32 bits)
- **L** - shades of gray (8 bits)
- **P** - palette (8 bits, indexed colors)
- **CMYK** - for printing (cyan, magenta, yellow, black)

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}')
print(f'Format: {img.format}')
print(f'Mode: {img.mode}')

# Type checking
if img.mode == 'RGB':
    print('Image in RGB color mode')
elif img.mode == 'RGBA':
    print('Image with transparency')
elif img.mode == 'L':
    print('Shades of Grey')
\`\`\`

**Receiving Pixels:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Get the pixel by coordinates (x, y)
pixel = img.getpixel((100, 200))
print(pixel) # (255, 128, 64) for RGB

# Set the pixel
img.putpixel((100, 200), (255, 0, 0)) # Red pixel

# Get all pixel data
pixels = img.load()
print(pixels[100, 200]) # (255, 0, 0)
\`\`\``
      },
      {
        title: "Creating new images",
        content: `**Creating a blank image:**

\`\`\`python
from PIL import Image

# Create a new RGB image (width, height, color)
img = Image.new('RGB', (800, 600), color='white')
img.save('white_image.jpg')

# Create an image with color
img = Image.new('RGB', (800, 600), color=(255, 0, 0)) # Red
img.save('red_image.jpg')

# Create an image with transparency
img = Image.new('RGBA', (800, 600), color=(255, 0, 0, 128)) # Translucent red
img.save('transparent.png')
\`\`\`

**Gradient creation:**

\`\`\`python
from PIL import Image

# Create an image
width, height = 800, 600
img = Image.new('RGB', (width, height))

# Fill with gradient
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

**Image copy:**

\`\`\`python
from PIL import Image

# Open the image
original = Image.open('photo.jpg')

# Create a copy
copy = original.copy()
copy.save('photo_copy.jpg')

# Or just save under a different name
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

**Getting statistics:**

\`\`\`python
from PIL import Image, ImageStat

img = Image.open('photo.jpg')

# Image statistics
stat = ImageStat.Stat(img)
print(f'Mean: {stat.mean}')
print(f'Minimum: {stat.min}')
print(f'Max: {stat.max}')
print(f'Standard deviation: {stat.stddev}')
\`\`\`

**Verification and Validation:**

\`\`\`python
from PIL import Image

def is_valid_image(filepath):
    try:
        img = Image.open(filepath)
        img.verify() # Integrity check
        return True
    except Exception as e:
        print(f'Error: {e}')
        return False

# Usage
if is_valid_image('photo.jpg'):
    print('Image is valid')
otherwise:
    print('Image is corrupted')
\`\`\`

**Working with EXIF data:**

\`\`\`python
from PIL import Image
from PIL.ExifTags import TAGS

img = Image.open('photo.jpg')

# Get EXIF data (if available)
gifdata = img.getexif()

if Exifdata:
    for tag_id in geolocation data:
        tag = TAGS.get(tag_id, tag_id)
        data = geolocationdata.get(tag_id)
        print(f'{tag}: {data}')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Format Converter**

\`\`\`python
from PIL import Image
import os

def convert_image(input_path, output_path, output_format):
    try:
        img = Image.open(input_path)
        img.save(output_path, output_format)
        print(f'Converted: {input_path} -> {output_path}')
        return True
    except Exception as e:
        print(f'Error: {e}')
        return False

# Usage
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

# Usage
batch_convert('images/', 'converted/', 'PNG')
\`\`\`

**Example 3: Checking Image Size**

\`\`\`python
from PIL import Image

def check_image_size(filepath, max_width=1920, max_height=1080):
    img = Image.open(filepath)
    width, height = img.size
    
    if width > max_width or height > max_height:
        print(f'Image too big: {width}x{height}')
        return False
    otherwise:
        print(f'Size OK: {width}x{height}')
        return True

# Usage
check_image_size('photo.jpg', max_width=1920, max_height=1080)
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned the basics of working with Pillow:

**Key Methods:**

1. **Image.open()** - opening the image
2. **img.save()** - image saving
3. **img.size** - image size
4. **img.mode** - color mode
5. **img.convert()** - mode conversion
6. **Image.new()** - creating a new image

**Basic concepts:**

- Image formats (JPEG, PNG, GIF, WebP)
- Color modes (RGB, RGBA, L, P)
- Opening and saving
- Format conversion
- Getting information about the image

**Important:**

- Pillow supports many formats
- Always check the format before saving
- RGBA supports transparency (PNG, WebP only)
- Use try/except for error handling

**Next step:**

In the next lesson, we will learn how to manipulate images: resize, crop, rotate and apply basic filters.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Opening and saving",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}, Format: {img.format}')
img.save('copy.png', 'PNG')`,
      explanation: "We open the image, display the information and save it in another format."
    },
    {
      title: "Example 2: Creating a new image",
      code: `from PIL import Image

img = Image.new('RGB', (800, 600), color='blue')
img.save('blue_image.jpg')`,
      explanation: "We create a new blue image with a size of 800x600 pixels."
    },
    {
      title: "Example 3: Conversion to shades of gray",
      code: `from PIL import Image

img = Image.open('photo.jpg')
gray = img.convert('L')
gray.save('photo_gray.jpg')`,
      explanation: "We convert a color image into shades of gray."
    },
    {
      title: "Example 4: Receiving information",
      code: `from PIL import Image

img = Image.open('photo.jpg')
print(f'Size: {img.size}')
print(f'Mode: {img.mode}')
print(f'Format: {img.format}')`,
      explanation: "We get basic information about the image."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Do not specify the format when saving",
      explanation: "If the file extension does not match the format, an error may occur.",
      correctApproach: "Always specify the format explicitly: img.save('file.png', 'PNG')."
    },
    {
      mistake: "Trying to save RGBA to JPEG",
      explanation: "JPEG does not support transparency, only PNG and WebP.",
      correctApproach: "Use PNG or WebP for images with transparency, or convert to RGB before saving to JPEG."
    },
    {
      mistake: "Do not check for file existence",
      explanation: "If the file does not exist, Image.open() will throw an exception.",
      correctApproach: "Use try/except or os.path.exists() to check before opening."
    },
    {
      mistake: "Forgetting to close the image",
      explanation: "Although Python closes files automatically, it is better to explicitly close large images.",
      correctApproach: "Use img.close() or context manager with Image.open() as img:."
    }
  ],
  
  summary: `In this lesson, we learned the basics of working with Pillow:

1. Installation and import - pip install Pillow
2. Opening and saving - Image.open(), img.save()
3. Image information - size, mode, format
4. Creating new images - Image.new()
5. Format conversion - saving in different formats
6. Color modes - RGB, RGBA, L, P

Pillow - a powerful tool for working with images!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to install Pillow?",
        options: [
          "pip install Pillow",
          "pip install PIL",
          "pip install Image",
          "pip install pillow"
        ],
        correctAnswer: 0,
        explanation: "Pillow is installed with the command pip install Pillow (with a capital P)."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What color mode is used for images with transparency?",
        options: [
          "RGBA",
          "RGB",
          "L",
          "P"
        ],
        correctAnswer: 0,
        explanation: "RGBA (Red, Green, Blue, Alpha) contains an alpha channel for transparency."
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
        explanation: "JPEG does not support transparency. PNG, WebP, and GIF support an alpha channel or transparency."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to get image size?",
        options: [
          "img.size",
          "img.width, img.height",
          "img.get_size()",
          "img.dimensions"
        ],
        correctAnswer: 0,
        explanation: "img.size returns a tuple (width, height) with the size of the image."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can save RGBA images in JPEG format without conversion.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JPEG does not support an alpha channel. You need to convert to RGB first: img.convert('RGB')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

