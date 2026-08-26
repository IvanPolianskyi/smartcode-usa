/**
 * Lesson 10-3: Working with colors and filters
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_10_3 = {
  lessonId: "lesson-10-3",
  moduleId: "module-10",
  order: 3,
  title: "Working with colors and filters",
  
  learningObjectives: [
    "Convert color spaces",
    "Apply filters",
    "Create effects",
    "Work with the alpha channel"
  ],
  
  prerequisites: ["lesson-10-2"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Color spaces",
        content: `**Converting between color spaces:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# RGB -> Grayscale
gray = img.convert('L')
gray.save('photo_gray.jpg')

# RGB -> RGBA (add alpha channel)
rgba = img.convert('RGBA')
rgba.save('photo_rgba.png')

# RGB -> CMYK (for print)
cmyk = img.convert('CMYK')
cmyk.save('photo_cmyk.tif')

# RGB -> Palette (indexed colors)
palette = img.convert('P')
palette.save('photo_palette.png')
\`\`\`

**Working with RGB components:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Split into channels
r, g, b = img.split()

# Save individual channels
r.save('red_channel.jpg')
g.save('green_channel.jpg')
b.save('blue_channel.jpg')

# Merge channels
merged = Image.merge('RGB', (r, g, b))
merged.save('merged.jpg')

# Modify one channel
r_enhanced = ImageEnhance.Brightness(r).enhance(1.5)
new_img = Image.merge('RGB', (r_enhanced, g, b))
new_img.save('red_enhanced.jpg')
\`\`\`

**Working with HSV:**

\`\`\`python
from PIL import Image
import colorsys

img = Image.open('photo.jpg')

# Convert to HSV (Hue, Saturation, Value)
hsv = img.convert('HSV')
h, s, v = hsv.split()

# Adjust saturation
s_enhanced = ImageEnhance.Brightness(s).enhance(1.5)
hsv_enhanced = Image.merge('HSV', (h, s_enhanced, v))
rgb_enhanced = hsv_enhanced.convert('RGB')
rgb_enhanced.save('saturated.jpg')
\`\`\``
      },
      {
        title: "Working with the alpha channel",
        content: `**Creating a transparent image:**

\`\`\`python
from PIL import Image

# Create an image with transparency
img = Image.new('RGBA', (800, 600), (255, 0, 0, 128))  # Semi-transparent red
img.save('transparent.png')

# Add an alpha channel to an existing image
rgb_img = Image.open('photo.jpg')
rgba_img = rgb_img.convert('RGBA')
rgba_img.save('photo_with_alpha.png')
\`\`\`

**Manipulating the alpha channel:**

\`\`\`python
from PIL import Image

img = Image.open('photo.png')

if img.mode == 'RGBA':
    r, g, b, a = img.split()
    
    # Make more transparent
    a_light = ImageEnhance.Brightness(a).enhance(0.5)
    transparent = Image.merge('RGBA', (r, g, b, a_light))
    transparent.save('more_transparent.png')
    
    # Create a mask from the alpha channel
    mask = a
    mask.save('alpha_mask.png')
\`\`\`

**Compositing images with transparency:**

\`\`\`python
from PIL import Image

# Background image
background = Image.open('background.jpg').convert('RGBA')

# Image to overlay
overlay = Image.open('overlay.png')

# Composite with transparency
result = Image.alpha_composite(background, overlay)
result.save('composited.png')

# Or use paste with a mask
background.paste(overlay, (100, 100), overlay)
background.save('pasted.png')
\`\`\`

**Creating a transparency gradient:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg').convert('RGBA')
width, height = img.size

# Create an alpha channel with a gradient
alpha = Image.new('L', (width, height))
pixels = alpha.load()

for x in range(width):
    for y in range(height):
        # Gradient from opaque to transparent
        value = int(255 * (1 - x / width))
        pixels[x, y] = value

# Merge with the original
r, g, b, _ = img.split()
gradient = Image.merge('RGBA', (r, g, b, alpha))
gradient.save('gradient_alpha.png')
\`\`\``
      },
      {
        title: "Advanced filters",
        content: `**ImageFilter — additional filters:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Gaussian Blur with radius
blurred = img.filter(ImageFilter.GaussianBlur(radius=3))
blurred.save('photo_gaussian_blur.jpg')

# Box Blur
box_blur = img.filter(ImageFilter.BoxBlur(radius=5))
box_blur.save('photo_box_blur.jpg')

# Unsharp Mask (sharpening)
sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
sharp.save('photo_unsharp.jpg')

# Median Filter (noise removal)
denoised = img.filter(ImageFilter.MedianFilter(size=3))
denoised.save('photo_denoised.jpg')

# Min Filter
min_filter = img.filter(ImageFilter.MinFilter(size=3))
min_filter.save('photo_min.jpg')

# Max Filter
max_filter = img.filter(ImageFilter.MaxFilter(size=3))
max_filter.save('photo_max.jpg')
\`\`\`

**Kernels for filters:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Create a custom kernel
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

**Combining filters:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance

img = Image.open('photo.jpg')

# Apply several filters
processed = img.filter(ImageFilter.GaussianBlur(radius=1))
processed = processed.filter(ImageFilter.SHARPEN)
processed = ImageEnhance.Contrast(processed).enhance(1.2)
processed.save('photo_multi_processed.jpg')
\`\`\``
      },
      {
        title: "Creating effects",
        content: `**Sepia effect:**

\`\`\`python
from PIL import Image

def sepia(img):
    # Convert to grayscale
    gray = img.convert('L')
    
    # Create sepia
    sepia = Image.new('RGB', img.size)
    pixels = sepia.load()
    gray_pixels = gray.load()
    
    for x in range(img.width):
        for y in range(img.height):
            gray_value = gray_pixels[x, y]
            # Sepia formula
            r = min(255, int(gray_value * 1.2))
            g = min(255, int(gray_value * 0.9))
            b = min(255, int(gray_value * 0.6))
            pixels[x, y] = (r, g, b)
    
    return sepia

img = Image.open('photo.jpg')
sepia_img = sepia(img)
sepia_img.save('photo_sepia.jpg')
\`\`\`

**Vintage photo effect:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import random

def vintage_effect(img):
    # Convert to grayscale
    gray = img.convert('L')
    
    # Add noise
    noisy = gray.copy()
    pixels = noisy.load()
    for x in range(noisy.width):
        for y in range(noisy.height):
            noise = random.randint(-20, 20)
            value = max(0, min(255, pixels[x, y] + noise))
            pixels[x, y] = value
    
    # Apply sepia
    sepia = Image.new('RGB', noisy.size)
    sepia_pixels = sepia.load()
    for x in range(noisy.width):
        for y in range(noisy.height):
            gray_value = pixels[x, y]
            r = min(255, int(gray_value * 1.1))
            g = min(255, int(gray_value * 0.85))
            b = min(255, int(gray_value * 0.6))
            sepia_pixels[x, y] = (r, g, b)
    
    # Add a slight blur
    vintage = sepia.filter(ImageFilter.GaussianBlur(radius=0.5))
    
    return vintage

img = Image.open('photo.jpg')
vintage_img = vintage_effect(img)
vintage_img.save('photo_vintage.jpg')
\`\`\`

**Watercolor effect:**

\`\`\`python
from PIL import Image, ImageFilter

def watercolor_effect(img):
    # Apply Gaussian Blur
    blurred = img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Increase saturation
    from PIL import ImageEnhance
    saturated = ImageEnhance.Color(blurred).enhance(1.3)
    
    # Add a light sharpen
    sharp = saturated.filter(ImageFilter.SHARPEN)
    
    return sharp

img = Image.open('photo.jpg')
watercolor = watercolor_effect(img)
watercolor.save('photo_watercolor.jpg')
\`\`\`

**Cartoon effect:**

\`\`\`python
from PIL import Image, ImageFilter

def cartoon_effect(img):
    # Reduce the number of colors
    quantized = img.quantize(colors=64)
    quantized = quantized.convert('RGB')
    
    # Apply Median Filter for smoothing
    smoothed = quantized.filter(ImageFilter.MedianFilter(size=3))
    
    # Increase contrast
    from PIL import ImageEnhance
    contrasted = ImageEnhance.Contrast(smoothed).enhance(1.5)
    
    # Increase saturation
    saturated = ImageEnhance.Color(contrasted).enhance(1.3)
    
    return saturated

img = Image.open('photo.jpg')
cartoon = cartoon_effect(img)
cartoon.save('photo_cartoon.jpg')
\`\`\``
      },
      {
        title: "Working with masks",
        content: `**Creating a mask:**

\`\`\`python
from PIL import Image, ImageDraw

img = Image.open('photo.jpg')

# Create a mask (black-and-white image)
mask = Image.new('L', img.size, 0)  # 0 = black (transparent)

# Draw on the mask
draw = ImageDraw.Draw(mask)
draw.ellipse([100, 100, 400, 400], fill=255)  # 255 = white (opaque)

# Apply the mask
masked = Image.new('RGBA', img.size)
masked.paste(img, (0, 0))
masked.putalpha(mask)
masked.save('masked.png')
\`\`\`

**Gradient mask:**

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

# Apply the mask
r, g, b, a = img.split()
masked_alpha = Image.merge('L', (mask,))
result = Image.merge('RGBA', (r, g, b, masked_alpha))
result.save('gradient_mask.png')
\`\`\`

**Using a mask for cropping:**

\`\`\`python
from PIL import Image, ImageDraw

img = Image.open('photo.jpg')

# Create a circular mask
mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
center_x, center_y = img.size[0] // 2, img.size[1] // 2
radius = min(center_x, center_y)
draw.ellipse([center_x - radius, center_y - radius,
              center_x + radius, center_y + radius], fill=255)

# Apply the mask
output = Image.new('RGBA', img.size, (0, 0, 0, 0))
output.paste(img, (0, 0))
output.putalpha(mask)
output.save('circular_crop.png')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Color converter**

\`\`\`python
from PIL import Image

def convert_color_space(input_path, output_path, mode):
    img = Image.open(input_path)
    converted = img.convert(mode)
    converted.save(output_path)
    print(f'Converted to {mode}: {output_path}')

# Usage
convert_color_space('photo.jpg', 'photo_gray.jpg', 'L')
convert_color_space('photo.jpg', 'photo_rgba.png', 'RGBA')
\`\`\`

**Example 2: Adding a watermark**

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

def add_watermark(image_path, text, output_path):
    img = Image.open(image_path).convert('RGBA')
    
    # Create a text layer
    txt = Image.new('RGBA', img.size, (255, 255, 255, 0))
    draw = ImageDraw.Draw(txt)
    
    # Add text (try to use a TrueType font)
    try:
        font = ImageFont.truetype('arial.ttf', 40)
    except:
        font = ImageFont.load_default()
    
    # Text position
    text_width, text_height = draw.textsize(text, font=font)
    position = ((img.width - text_width) // 2, img.height - text_height - 20)
    
    # Semi-transparent text
    draw.text(position, text, fill=(255, 255, 255, 128), font=font)
    
    # Composite
    watermarked = Image.alpha_composite(img, txt)
    watermarked = watermarked.convert('RGB')
    watermarked.save(output_path)

# Usage
add_watermark('photo.jpg', '© My Watermark', 'photo_watermarked.jpg')
\`\`\`

**Example 3: Batch processing with effects**

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
                print(f'Processed: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

# Effect function
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

# Usage
batch_apply_effect('photos/', 'sepia/', sepia_effect)
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned how to work with colors and filters:

**Key concepts:**

1. **Color spaces** — RGB, RGBA, L, HSV, CMYK
2. **Alpha channel** — transparency, image compositing
3. **Advanced filters** — GaussianBlur, UnsharpMask, MedianFilter
4. **Effects** — sepia, vintage, watercolor, cartoon
5. **Masks** — creating and applying masks

**Main methods:**

- convert() — color space conversion
- split() / merge() — working with channels
- alpha_composite() — compositing with transparency
- ImageFilter — advanced filters
- Creating custom effects

**Important:**

- RGBA supports transparency (PNG and WebP only)
- The alpha channel uses values 0–255 (0 = transparent, 255 = opaque)
- Filters can be combined for complex effects
- Masks give precise control over transparency

**Next step:**

In the next lesson we will build a complete image-processing project.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Color conversion",
      code: `from PIL import Image

img = Image.open('photo.jpg')
gray = img.convert('L')
rgba = img.convert('RGBA')
gray.save('gray.jpg')
rgba.save('rgba.png')`,
      explanation: "Convert an image between different color spaces."
    },
    {
      title: "Example 2: Working with the alpha channel",
      code: `from PIL import Image

img = Image.open('photo.jpg').convert('RGBA')
r, g, b, a = img.split()
# Alpha channel manipulations
new_img = Image.merge('RGBA', (r, g, b, a))
new_img.save('with_alpha.png')`,
      explanation: "Split an image into channels and work with the alpha channel."
    },
    {
      title: "Example 3: Advanced filters",
      code: `from PIL import Image, ImageFilter

img = Image.open('photo.jpg')
blurred = img.filter(ImageFilter.GaussianBlur(radius=3))
sharp = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150))`,
      explanation: "Apply advanced filters with parameters."
    },
    {
      title: "Example 4: Sepia effect",
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
      explanation: "Create a sepia effect by turning grayscale tones into brown hues."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Trying to save RGBA as JPEG",
      explanation: "JPEG does not support an alpha channel; transparency data will be lost.",
      correctApproach: "Use PNG or WebP for images with transparency, or convert to RGB before saving as JPEG."
    },
    {
      mistake: "Incorrect use of the alpha channel",
      explanation: "The alpha channel uses values 0–255, where 0 = transparent and 255 = opaque.",
      correctApproach: "Check alpha values and use the right methods for manipulations."
    },
    {
      mistake: "Applying filters to the wrong mode",
      explanation: "Some filters only work with certain color modes.",
      correctApproach: "Convert the image to the required mode before applying filters."
    },
    {
      mistake: "Forgetting about mask size",
      explanation: "The mask must be the same size as the image.",
      correctApproach: "Create the mask with the same size: mask = Image.new('L', img.size, 0)."
    }
  ],
  
  summary: `In this lesson we learned how to work with colors and filters:

1. Color spaces — RGB, RGBA, L, HSV, conversion
2. Alpha channel — transparency, compositing
3. Advanced filters — GaussianBlur, UnsharpMask
4. Effects — sepia, vintage, watercolor
5. Masks — creating and applying

Working with colors and filters opens up endless possibilities!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which color mode supports transparency?",
        options: [
          "RGBA",
          "RGB",
          "L",
          "CMYK"
        ],
        correctAnswer: 0,
        explanation: "RGBA includes an alpha channel for transparency. RGB, L, and CMYK do not support transparency."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does a value of 0 in the alpha channel mean?",
        options: [
          "Fully transparent",
          "Fully opaque",
          "Semi-transparent",
          "Black"
        ],
        correctAnswer: 0,
        explanation: "0 in the alpha channel means a fully transparent pixel; 255 means fully opaque."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which file format does NOT support an alpha channel?",
        options: [
          "JPEG",
          "PNG",
          "WebP",
          "GIF"
        ],
        correctAnswer: 0,
        explanation: "JPEG does not support an alpha channel. PNG, WebP, and GIF support transparency."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you split an image into channels?",
        options: [
          "img.split()",
          "img.channels()",
          "img.separate()",
          "img.divide()"
        ],
        correctAnswer: 0,
        explanation: "img.split() splits the image into separate channels (R, G, B, A)."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "You can save an RGBA image as JPEG.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. JPEG does not support an alpha channel. Convert to RGB first: img.convert('RGB')."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
