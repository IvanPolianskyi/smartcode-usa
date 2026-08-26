/**
 * Lesson 10-2: Image manipulations
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_10_2 = {
  lessonId: "lesson-10-2",
  moduleId: "module-10",
  order: 2,
  title: "Image manipulations",
  
  learningObjectives: [
    "Resize images",
    "Crop and rotate images",
    "Adjust brightness and contrast",
    "Apply basic filters"
  ],
  
  prerequisites: ["lesson-10-1"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Resizing an image",
        content: `**resize() — change size:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Resize to exact dimensions
resized = img.resize((800, 600))
resized.save('photo_resized.jpg')

# Keep aspect ratio
width, height = img.size
new_width = 800
new_height = int(height * (new_width / width))
resized = img.resize((new_width, new_height))
resized.save('photo_proportional.jpg')
\`\`\`

**thumbnail() — create a thumbnail:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Create a thumbnail (modifies the original image)
img.thumbnail((200, 200))
img.save('photo_thumb.jpg')

# Or work on a copy
thumb = img.copy()
thumb.thumbnail((200, 200))
thumb.save('photo_thumb.jpg')
\`\`\`

**Resize algorithms:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# NEAREST — nearest pixel (fast, lower quality)
resized_nearest = img.resize((800, 600), Image.NEAREST)

# BILINEAR — bilinear interpolation (better quality)
resized_bilinear = img.resize((800, 600), Image.BILINEAR)

# BICUBIC — bicubic interpolation (higher quality, slower)
resized_bicubic = img.resize((800, 600), Image.BICUBIC)

# LANCZOS — best quality for downscaling
resized_lanczos = img.resize((800, 600), Image.LANCZOS)

resized_lanczos.save('photo_high_quality.jpg')
\`\`\``
      },
      {
        title: "Cropping an image",
        content: `**crop() — crop:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Crop (left, top, right, bottom)
# Coordinates: (x1, y1, x2, y2)
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')
\`\`\`

**Center crop:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

crop_width = 400
crop_height = 300

left = (width - crop_width) // 2
top = (height - crop_height) // 2
right = left + crop_width
bottom = top + crop_height

cropped = img.crop((left, top, right, bottom))
cropped.save('photo_center_crop.jpg')
\`\`\`

**Square crop:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')
width, height = img.size

size = min(width, height)

left = (width - size) // 2
top = (height - size) // 2
right = left + size
bottom = top + size

square = img.crop((left, top, right, bottom))
square.save('photo_square.jpg')
\`\`\``
      },
      {
        title: "Rotation and flips",
        content: `**rotate() — rotate:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

# Rotate 90 degrees clockwise
rotated = img.rotate(-90)
rotated.save('photo_rotated_90.jpg')

# Rotate 45 degrees
rotated = img.rotate(45)
rotated.save('photo_rotated_45.jpg')

# Rotate and expand the canvas
rotated = img.rotate(45, expand=True)
rotated.save('photo_rotated_expanded.jpg')
\`\`\`

**transpose() — standard transforms:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

rotated_90 = img.transpose(Image.ROTATE_90)
rotated_180 = img.transpose(Image.ROTATE_180)
rotated_270 = img.transpose(Image.ROTATE_270)

flipped_h = img.transpose(Image.FLIP_LEFT_RIGHT)
flipped_v = img.transpose(Image.FLIP_TOP_BOTTOM)

rotated_90.save('photo_90.jpg')
flipped_h.save('photo_flipped_h.jpg')
\`\`\`

**Combining operations:**

\`\`\`python
from PIL import Image

img = Image.open('photo.jpg')

rotated = img.rotate(45, expand=True)
cropped = rotated.crop((50, 50, 350, 350))
cropped.save('photo_rotated_cropped.jpg')
\`\`\``
      },
      {
        title: "Brightness and contrast",
        content: `**ImageEnhance — improve an image:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

# Brightness
enhancer = ImageEnhance.Brightness(img)
bright = enhancer.enhance(1.5)  # 1.5 = 50% brighter
bright.save('photo_bright.jpg')

# Contrast
enhancer = ImageEnhance.Contrast(img)
contrast = enhancer.enhance(1.5)  # 1.5 = 50% more contrast
contrast.save('photo_contrast.jpg')

# Color saturation
enhancer = ImageEnhance.Color(img)
saturated = enhancer.enhance(1.3)
saturated.save('photo_saturated.jpg')

# Sharpness
enhancer = ImageEnhance.Sharpness(img)
sharp = enhancer.enhance(2.0)  # 2.0 = twice as sharp
sharp.save('photo_sharp.jpg')
\`\`\`

**Auto enhancement:**

\`\`\`python
from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')

enhanced = ImageEnhance.Contrast(img).enhance(1.2)
enhanced = ImageEnhance.Brightness(enhanced).enhance(1.1)
enhanced = ImageEnhance.Sharpness(enhanced).enhance(1.1)
enhanced.save('photo_auto_enhanced.jpg')
\`\`\``
      },
      {
        title: "Basic filters",
        content: `**ImageFilter — built-in filters:**

\`\`\`python
from PIL import Image, ImageFilter

img = Image.open('photo.jpg')

blurred = img.filter(ImageFilter.BLUR)
blurred.save('photo_blur.jpg')

blurred_more = img.filter(ImageFilter.GaussianBlur(radius=5))
blurred_more.save('photo_blur_strong.jpg')

sharp = img.filter(ImageFilter.SHARPEN)
sharp.save('photo_sharpen.jpg')

detail = img.filter(ImageFilter.DETAIL)
detail.save('photo_detail.jpg')

edges = img.filter(ImageFilter.FIND_EDGES)
edges.save('photo_edges.jpg')

emboss = img.filter(ImageFilter.EMBOSS)
emboss.save('photo_emboss.jpg')

contour = img.filter(ImageFilter.CONTOUR)
contour.save('photo_contour.jpg')
\`\`\`

**Combining filters:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance

img = Image.open('photo.jpg')

enhanced = img.filter(ImageFilter.SHARPEN)
enhanced = enhanced.filter(ImageFilter.DETAIL)
enhanced = ImageEnhance.Contrast(enhanced).enhance(1.2)
enhanced.save('photo_multi_filter.jpg')
\`\`\`

**Thumbnails with filters:**

\`\`\`python
from PIL import Image, ImageFilter

def create_thumbnail_with_filter(img_path, size=(200, 200), filter_type=None):
    img = Image.open(img_path)
    img.thumbnail(size)
    
    if filter_type:
        img = img.filter(filter_type)
    
    return img

thumb = create_thumbnail_with_filter('photo.jpg', (200, 200), ImageFilter.SHARPEN)
thumb.save('photo_thumb_sharp.jpg')
\`\`\``
      },
      {
        title: "Practical examples",
        content: `**Example 1: Create thumbnails**

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
                print(f'Created thumbnail: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

create_thumbnails('photos/', 'thumbs/', (200, 200))
\`\`\`

**Example 2: Crop and resize**

\`\`\`python
from PIL import Image

def process_image(input_path, output_path, crop_box=None, new_size=None):
    img = Image.open(input_path)
    
    if crop_box:
        img = img.crop(crop_box)
    
    if new_size:
        img = img.resize(new_size, Image.LANCZOS)
    
    img.save(output_path)
    print(f'Processed: {output_path}')

process_image('photo.jpg', 'processed.jpg', 
              crop_box=(100, 100, 500, 400),
              new_size=(800, 600))
\`\`\`

**Example 3: Batch enhance**

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
                
                img = ImageEnhance.Contrast(img).enhance(1.2)
                img = ImageEnhance.Brightness(img).enhance(1.1)
                img = img.filter(ImageFilter.SHARPEN)
                
                img.save(output_path)
                print(f'Enhanced: {filename}')
            except Exception as e:
                print(f'Error {filename}: {e}')

batch_enhance('photos/', 'enhanced/')
\`\`\``
      },
      {
        title: "Summary",
        content: `In this lesson we learned image manipulations:

**Key methods:**

1. **resize()** — change size
2. **thumbnail()** — create a thumbnail
3. **crop()** — crop
4. **rotate()** — rotate
5. **transpose()** — standard transforms
6. **ImageEnhance** — brightness and contrast
7. **ImageFilter** — apply filters

**Main operations:**

- Resize while keeping aspect ratio
- Crop by coordinates
- Rotate and flip
- Improve brightness and contrast
- Apply filters (blur, sharpen, edges)

**Important:**

- Use LANCZOS for best resize quality
- thumbnail() modifies the original image
- enhance() factor > 1.0 increases, < 1.0 decreases
- Combine operations for complex effects

**Next step:**

Next we will work with colors and more advanced filters.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Resize",
      code: `from PIL import Image

img = Image.open('photo.jpg')
resized = img.resize((800, 600), Image.LANCZOS)
resized.save('photo_resized.jpg')`,
      explanation: "Resize an image to 800x600 with high quality."
    },
    {
      title: "Example 2: Crop",
      code: `from PIL import Image

img = Image.open('photo.jpg')
cropped = img.crop((100, 100, 500, 400))
cropped.save('photo_cropped.jpg')`,
      explanation: "Crop an image using the given coordinates."
    },
    {
      title: "Example 3: Rotate",
      code: `from PIL import Image

img = Image.open('photo.jpg')
rotated = img.rotate(90, expand=True)
rotated.save('photo_rotated.jpg')`,
      explanation: "Rotate an image 90 degrees and expand the canvas."
    },
    {
      title: "Example 4: Enhance",
      code: `from PIL import Image, ImageEnhance

img = Image.open('photo.jpg')
enhancer = ImageEnhance.Contrast(img)
enhanced = enhancer.enhance(1.5)
enhanced.save('photo_enhanced.jpg')`,
      explanation: "Increase image contrast by 50%."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Using resize() instead of thumbnail()",
      explanation: "resize() can distort proportions; thumbnail() keeps them.",
      correctApproach: "Use thumbnail() for thumbnails; resize() only when you need exact dimensions."
    },
    {
      mistake: "Forgetting expand=True when rotating",
      explanation: "Without expand=True, corners are clipped on rotation.",
      correctApproach: "Use rotate(angle, expand=True) to keep the full image."
    },
    {
      mistake: "Wrong coordinates for crop()",
      explanation: "crop() expects (x1, y1, x2, y2) with x2 > x1 and y2 > y1.",
      correctApproach: "Check coordinates: left < right, top < bottom."
    },
    {
      mistake: "Applying filters without checking mode",
      explanation: "Some filters only work with certain color modes.",
      correctApproach: "Convert to RGB before filtering: img.convert('RGB')."
    }
  ],
  
  summary: `In this lesson we learned image manipulations:

1. Resize — resize(), thumbnail()
2. Crop — crop()
3. Rotate — rotate(), transpose()
4. Enhance — ImageEnhance (brightness, contrast)
5. Filters — ImageFilter (blur, sharpen, edges)

Image manipulation is the foundation of image processing!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which method keeps aspect ratio when resizing?",
        options: [
          "thumbnail()",
          "resize()",
          "scale()",
          "Both thumbnail() and resize()"
        ],
        correctAnswer: 0,
        explanation: "thumbnail() keeps aspect ratio automatically; resize() can distort it."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which algorithm usually gives the best resize quality?",
        options: [
          "LANCZOS",
          "NEAREST",
          "BILINEAR",
          "BICUBIC"
        ],
        correctAnswer: 0,
        explanation: "LANCZOS usually gives the best quality, especially when downscaling."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What does expand=True do in rotate()?",
        options: [
          "Expands the canvas to fit the whole image",
          "Increases the image size",
          "Decreases the image size",
          "Does nothing"
        ],
        correctAnswer: 0,
        explanation: "expand=True expands the canvas so clipped corners are not lost on rotation."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "How do you increase contrast by 50%?",
        options: [
          "ImageEnhance.Contrast(img).enhance(1.5)",
          "ImageEnhance.Contrast(img).enhance(0.5)",
          "ImageEnhance.Contrast(img).enhance(50)",
          "img.contrast(1.5)"
        ],
        correctAnswer: 0,
        explanation: "enhance(1.5) increases contrast by 50%. Factor > 1.0 increases, < 1.0 decreases."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "thumbnail() modifies the original image in place.",
        options: ["True", "False"],
        correctAnswer: 0,
        explanation: "True. thumbnail() modifies the image in place. Use copy() if you need to keep the original."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}
