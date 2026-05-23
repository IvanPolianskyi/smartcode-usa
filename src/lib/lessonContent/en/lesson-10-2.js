/**
 * Lesson 10-2: Image Manipulation
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_10_2 = {
  lessonId: "lesson-10-2",
  moduleId: "module-10",
  order: 2,
  title: "Image manipulation",
  
  learningObjectives: [
    "Resize images",
    "Crop and rotate images",
    "Change brightness and contrast",
    "Apply basic filters"
  ],
  
  prerequisites: ["lesson-10-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Resize the image",
        content: `**resize() - resize:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Resize to specific dimensions
resized = img.resize((800, 600))
resized.save('photo_resized.jpg')

# Save proportions
width, height = img.size
new_width = 800
new_height = int(height * (new_width / width))
resized = img.resize((new_width, new_height))
resized.save('photo_proportional.jpg')
\`\`\`

**thumbnail() - creating a thumbnail:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Create a thumbnail (changes the original image)
img.thumbnail((200, 200))
img.save('photo_thumb.jpg')

# Or create a copy
thumb = img.copy()
thumb.thumbnail((200, 200))
thumb.save('photo_thumb.jpg')
\`\`\`

**Algorithms for resizing:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# NEAREST - nearest pixel (fast, but low quality)
resized_nearest = img.resize((800, 600), Image.NEAREST)

# BILINEAR - bilinear interpolation (better quality)
resized_bilinear = img.resize((800, 600), Image.BILINEAR)

# BICUBIC - bicubic interpolation (best quality, slower)
resized_bicubic = img.resize((800, 600), Image.BICUBIC)

# LANCZOS - the best quality for reduction
resized_lanczos = img.resize((800, 600), Image.LANCZOS)

resized_lanczos.save('photo_high_quality.jpg')
\`\`\``
      },
      {
        title: "Image cropping",
        content: `**crop() - cropping:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Crop (left, top, right, bottom)
# Coordinates: (x1, y1, x2, y2)
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')
\`\`\`

**Crop from center:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

# The size of the cropped area
crop_width = 400
crop_height = 300

# Coordinates of the center
left = (width - crop_width) // 2
top = (height - crop_height) // 2
right = left + crop_width
bottom = top + crop_height

# Crop
cropped = img.crop((left, top, right, bottom))
cropped.save('photo_center_crop.jpg')
\`\`\`

**Trimming the square:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

# Find the smaller side
size = min(width, height)

# Center
left = (width - size) // 2
top = (height - size) // 2
right = left + size
bottom = top + size

# Crop the square
square = img.crop((left, top, right, bottom))
square.save('photo_square.jpg')
\`\`\``
      },
      {
        title: "Rotation and reflection",
        content: `**rotate() - rotation:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Rotate 90 degrees clockwise
rotated = img.rotate(-90)
rotated.save('photo_rotated_90.jpg')

# Rotate by 45 degrees
rotated = img.rotate(45)
rotated.save('photo_rotated_45.jpg')

# Return with canvas extension
rotated = img.rotate(45, expand=True)
rotated.save('photo_rotated_expanded.jpg')
\`\`\`

**transpose() - standard transformations:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Rotate 90 degrees clockwise
rotated_90 = img.transpose(Image.ROTATE_90)

# Rotate 180 degrees
rotated_180 = img.transpose(Image.ROTATE_180)

# Rotate 270 degrees
rotated_270 = img.transpose(Image.ROTATE_270)

# Display horizontally
flipped_h = img.transpose(Image.FLIP_LEFT_RIGHT)

# Display vertically
flipped_v = img.transpose(Image.FLIP_TOP_BOTTOM)

rotated_90.save('photo_90.jpg')
flipped_h.save('photo_flipped_h.jpg')
\`\`\`

**Combination of operations:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Rotate and crop
rotated = img.rotate(45, expand=True)
cropped = rotated.crop((50, 50, 350, 350))
cropped.save('photo_rotated_cropped.jpg')
\`\`\``
      },
      {
        title: "Brightness and contrast",
        content: `**ImageEnhance - image enhancement:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

# Brightness
enhancer = ImageEnhance.Brightness(img)
bright = enhancer.enhance(1.5) # 1.5 = 50% brighter
bright.save('photo_bright.jpg')

# Contrast
enhancer = ImageEnhance.Contrast(img)
contrast = enhancer.enhance(1.5) # 1.5 = 50% more contrast
contrast.save('photo_contrast.jpg')

# Color saturation
enhancer = ImageEnhance.Color(img)
saturated = enhancer.enhance(1.3)
saturated.save('photo_saturated.jpg')

# Sharpness
enhancer = ImageEnhance.Sharpness(img)
sharp = enhancer.enhance(2.0) # 2.0 = twice as sharp
sharp.save('photo_sharp.jpg')
\`\`\`

**Manual brightness change:**

\`\`\`python
from PIL import Image

def adjust_brightness(img, factor):
    """Change image brightness"""
    from PIL import ImageOps
    
    # Convert to grayscale for processing
    if img.mode != 'L':
        gray = img.convert('L')
    otherwise:
        gray = img
    
    # Apply brightness change
    enhanced = ImageEnhance.Brightness(gray).enhance(factor)
    
    # If the original was in color, return the colors
    if img.mode != 'L':
        # Combine with the original color image
        return Image.blend(img, img.convert('RGB'), 0.5)
    
    return enhanced

img = Image.open('photo.jpg')
bright = adjust_brightness(img, 1.5)
bright.save('photo_bright_manual.jpg')
\`\`\`

**Automatic Enhancement:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

# Automatic improvement
enhanced = ImageEnhance.Contrast(img).enhance(1.2)
enhanced = ImageEnhance.Brightness(enhanced).enhance(1.1)
enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.1)
enhanced.save('photo_auto_enhanced.jpg')
\`\`\``
      },
      {
        title: "Basic filters",
        content: `**ImageFilter - built-in filters:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

# Blur
blurred = img.filter(ImageFilter.BLUR)
blurred.save('photo_blur.jpg')

# Strong blur
blurred_more = img.filter(ImageFilter.GaussianBlur(radius=5))
blurred_more.save('photo_blur_strong.jpg')

# Sharpness
sharp = img.filter(ImageFilter.SHARPEN)
sharp.save('photo_sharpen.jpg')

# Detailing
detail = img.filter(ImageFilter.DETAIL)
detail.save('photo_detail.jpg')

# Edge effects
edges = img.filter(ImageFilter.FIND_EDGES)
edges.save('photo_edges.jpg')

# Relief
emboss = img.filter(ImageFilter.EMBOSS)
emboss.save('photo_emboss.jpg')

# Contour
contour = img.filter(ImageFilter.CONTOUR)
contour.save('photo_contour.jpg')
\`\`\`

**Combination of filters:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance

img = Image.open('photo.jpg')

# Apply multiple filters
enhanced = img.filter(ImageFilter.SHARPEN)
enhanced = enhanced.filter(ImageFilter.DETAIL)
enhanced = ImageEnhance.Contrast(enhanced).enhance(1.2)
enhanced.save('photo_multi_filter.jpg')
\`\`\`

**Creating thumbnails with filters:**

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
        title: "Practical examples",
        content: `**Example 1: Creating Thumbnails**

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
                print(f'Thumbnail created: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

# Usage
create_thumbnails('photos/', 'thumbs/', (200, 200))
\`\`\`

**Example 2: Cropping and resizing**

\`\`\`python
from PIL import Image

def process_image(input_path, output_path, crop_box=None, new_size=None):
    img = Image.open(input_path)
    
    # Trim if specified
    if crop_box:
        img = img.crop(crop_box)
    
    # Resize if specified
    if new_size:
        img = img.resize(new_size, Image.LANCZOS)
    
    img.save(output_path)
    print(f'Processed by: {output_path}')

# Usage
process_image('photo.jpg', 'processed.jpg', 
              crop_box=(100, 100, 500, 400),
              new_size=(800, 600))
\`\`\`

**Example 3: Batch processing with enhancement**

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
                
                # Improvements
                img = ImageEnhance.Contrast(img).enhance(1.2)
                img = ImageEnhance.Brightness(img).enhance(1.1)
                img = img.filter(ImageFilter.SHARPEN)
                
                img.save(output_path)
                print(f'Improved: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

# Usage
batch_enhance('photos/', 'enhanced/')
\`\`\``
      },
      {
        title: "Result",
        content: `In this lesson, we learned how to manipulate images:

**Key Methods:**

1. **resize()** - resize
2. **thumbnail()** - creating a thumbnail
3. **crop()** - cropping
4. **rotate()** - rotation
5. **transpose()** - standard transformations
6. **ImageEnhance** - improvement of brightness, contrast
7. **ImageFilter** - application of filters

**Basic operations:**

- Resizing while maintaining proportions
- Cropping by coordinates
- Rotate and mirror
- Improvement of brightness and contrast
- Application of filters (blur, sharpness, edges)

**Important:**

- Use LANCZOS for best resizing quality
- thumbnail() changes the original image
- The enhance() factor > 1.0 increases, < 1.0 decreases
- Combine operations for complex effects

**Next step:**

In the next lesson, we will explore working with colors and more complex filters.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Resizing",
      code: `from PIL import Image

img = Image.open('photo.jpg')
resized = img.resize((800, 600), Image.LANCZOS)
resized.save('photo_resized.jpg')`,
      explanation: "We change the image size to 800x600 with high quality."
    },
    {
      title: "Example 2: Circumcision",
      code: `from PIL import Image

img = Image.open('photo.jpg')
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')`,
      explanation: "Crop the image according to the specified coordinates."
    },
    {
      title: "Example 3: Turn",
      code: `from PIL import Image

img = Image.open('photo.jpg')
rotated = img.rotate(90, expand=True)
rotated.save('photo_rotated.jpg')`,
      explanation: "We rotate the image by 90 degrees with the canvas extension."
    },
    {
      title: "Example 4: Improvement",
      code: `from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')
enhancer = ImageEnhance.Contrast(img)
enhanced = enhancer.enhance(1.5)
enhanced.save('photo_enhanced.jpg')`,
      explanation: "We increase the contrast of the image by 50%."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using resize() instead of thumbnail()",
      explanation: "resize() can distort the proportions, thumbnail() preserves the proportions.",
      correctApproach: "Use thumbnail() to create thumbnails, resize() only when exact dimensions are required."
    },
    {
      mistake: "Forget expand=True when turning",
      explanation: "Without expand=True, the corners of the image are cropped when rotated.",
      correctApproach: "Use rotate(angle, expand=True) to keep the entire image."
    },
    {
      mistake: "Incorrect coordinates for crop()",
      explanation: "The coordinates of crop() should be (x1, y1, x2, y2), where x2 > x1 and y2 > y1.",
      correctApproach: "Check the coordinates: left < right, top < bottom."
    },
    {
      mistake: "Application of filters without checking mode",
      explanation: "Some filters only work with certain color modes.",
      correctApproach: "Convert to RGB before applying filters: img.convert('RGB')."
    }
  ],
  
  summary: `In this lesson, we learned how to manipulate images:

1. Changing the size - resize(), thumbnail()
2. Cropping - crop()
3. Rotation - rotate(), transpose()
4. Improvement - ImageEnhance (brightness, contrast)
5. Filters - ImageFilter (blur, sharpness, edges)

Image manipulation is the basis of processing!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method preserves proportions when resizing?",
        options: [
          "thumbnail()",
          "resize()",
          "scale()",
          "Both thumbnail() and resize()"
        ],
        correctAnswer: 0,
        explanation: "thumbnail() automatically preserves proportions, resize() can distort them."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which algorithm gives the best resizing quality?",
        options: [
          "LANCZOS",
          "NEAREST",
          "BILINEAR",
          "BICUBIC"
        ],
        correctAnswer: 0,
        explanation: "LANCZOS usually gives the best quality, especially when zooming out."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does the expand=True parameter do in rotate()?",
        options: [
          "Expands the canvas to fit the entire image",
          "Increases the image size",
          "Reduces the image size",
          "Does nothing"
        ],
        correctAnswer: 0,
        explanation: "expand=True expands the canvas so that the trimmed corners are not lost when rotated."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How to increase image contrast by 50%?",
        options: [
          "ImageEnhance.Contrast(img).enhance(1.5)",
          "ImageEnhance.Contrast(img).enhance(0.5)",
          "ImageEnhance.Contrast(img).enhance(50)",
          "img.contrast(1.5)"
        ],
        correctAnswer: 0,
        explanation: "enhance(1.5) increases the contrast by 50%. A factor > 1.0 increases, < 1.0 decreases."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "thumbnail() modifies the original image in place.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. thumbnail() modifies the image in-place. Use copy() if you want to keep the original."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}

