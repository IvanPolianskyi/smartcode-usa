/**
 * Lesson 10-4: Practice: image processing
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../../courseData'

export const lesson_10_4 = {
  lessonId: "lesson-10-4",
  moduleId: "module-10",
  order: 4,
  title: "Practice: image processing",
  
  learningObjectives: [
    "Build an image-processing script",
    "Implement batch processing",
    "Create a useful tool",
    "Practice working with images"
  ],
  
  prerequisites: ["lesson-10-3"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Project introduction",
        content: `In this lesson we will build a complete image-processing project.

**Project goals:**

- Create a versatile processing tool
- Implement batch processing
- Add various effects and filters
- Save processed images
- Build a convenient interface

**What we will do:**

1. Plan the project structure
2. Create the ImageProcessor class
3. Implement basic operations
4. Add effects
5. Batch processing
6. Testing and optimization

**Project example: Universal image processor**

We will create a class that can process images with different effects and save the results.`
      },
      {
        title: "Stage 1: Planning and structure",
        content: `**Project structure:**

\`\`\`python
class ImageProcessor:
    def __init__(self, input_path):
        # Initialization
        pass
    
    def resize(self, size):
        # Resize
        pass
    
    def crop(self, box):
        # Crop
        pass
    
    def apply_filter(self, filter_type):
        # Apply a filter
        pass
    
    def apply_effect(self, effect_name):
        # Apply an effect
        pass
    
    def save(self, output_path):
        # Save
        pass
\`\`\`

**Planned features:**

- Opening and validating an image
- Basic operations (resize, crop, rotate)
- Applying filters
- Applying effects
- Saving in different formats
- Batch processing`
      },
      {
        title: "Stage 2: Base ImageProcessor class",
        content: `**Full class implementation:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import os

class ImageProcessor:
    def __init__(self, input_path):
        """Initialize the processor"""
        if not os.path.exists(input_path):
            raise FileNotFoundError(f'File not found: {input_path}')
        
        self.input_path = input_path
        self.image = Image.open(input_path)
        self.original = self.image.copy()
    
    def resize(self, size, keep_aspect=False):
        """Resize the image"""
        if keep_aspect:
            self.image.thumbnail(size, Image.LANCZOS)
        else:
            self.image = self.image.resize(size, Image.LANCZOS)
        return self
    
    def crop(self, box):
        """Crop the image"""
        self.image = self.image.crop(box)
        return self
    
    def rotate(self, angle, expand=True):
        """Rotate the image"""
        self.image = self.image.rotate(angle, expand=expand)
        return self
    
    def flip_horizontal(self):
        """Flip horizontally"""
        self.image = self.image.transpose(Image.FLIP_LEFT_RIGHT)
        return self
    
    def flip_vertical(self):
        """Flip vertically"""
        self.image = self.image.transpose(Image.FLIP_TOP_BOTTOM)
        return self
    
    def enhance_contrast(self, factor=1.2):
        """Increase contrast"""
        enhancer = ImageEnhance.Contrast(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_brightness(self, factor=1.1):
        """Increase brightness"""
        enhancer = ImageEnhance.Brightness(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def enhance_saturation(self, factor=1.3):
        """Increase saturation"""
        enhancer = ImageEnhance.Color(self.image)
        self.image = enhancer.enhance(factor)
        return self
    
    def apply_filter(self, filter_type):
        """Apply a filter"""
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
        """Restore the original"""
        self.image = self.original.copy()
        return self
    
    def save(self, output_path, format=None):
        """Save the processed image"""
        if format:
            self.image.save(output_path, format)
        else:
            self.image.save(output_path)
        print(f'Saved: {output_path}')
        return self
\`\`\`

**Usage:**

\`\`\`python
# Create a processor
processor = ImageProcessor('photo.jpg')

# Apply operations
processor.resize((800, 600)) \\
         .enhance_contrast(1.2) \\
         .enhance_brightness(1.1) \\
         .apply_filter('sharpen') \\
         .save('processed.jpg')
\`\`\``
      },
      {
        title: "Stage 3: Adding effects",
        content: `**Extending the class with effects:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance
import random

class ImageProcessor:
    # ... previous methods ...
    
    def sepia(self):
        """Sepia effect"""
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
        """Convert to grayscale"""
        self.image = self.image.convert('L').convert('RGB')
        return self
    
    def vintage(self):
        """Vintage effect"""
        # Convert to grayscale
        gray = self.image.convert('L')
        
        # Add noise
        noisy = gray.copy()
        pixels = noisy.load()
        for x in range(noisy.width):
            for y in range(noisy.height):
                noise = random.randint(-15, 15)
                value = max(0, min(255, pixels[x, y] + noise))
                pixels[x, y] = value
        
        # Apply sepia
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
        
        # Slight blur
        self.image = sepia.filter(ImageFilter.GaussianBlur(radius=0.5))
        return self
    
    def watercolor(self):
        """Watercolor effect"""
        blurred = self.image.filter(ImageFilter.GaussianBlur(radius=2))
        saturated = ImageEnhance.Color(blurred).enhance(1.3)
        self.image = saturated.filter(ImageFilter.SHARPEN)
        return self
    
    def cartoon(self):
        """Cartoon effect"""
        quantized = self.image.quantize(colors=64).convert('RGB')
        smoothed = quantized.filter(ImageFilter.MedianFilter(size=3))
        contrasted = ImageEnhance.Contrast(smoothed).enhance(1.5)
        self.image = ImageEnhance.Color(contrasted).enhance(1.3)
        return self
\`\`\`

**Using effects:**

\`\`\`python
processor = ImageProcessor('photo.jpg')

# Apply sepia effect
processor.sepia().save('photo_sepia.jpg')

# Vintage effect
processor.reset().vintage().save('photo_vintage.jpg')

# Watercolor
processor.reset().watercolor().save('photo_watercolor.jpg')
\`\`\``
      },
      {
        title: "Stage 4: Batch processing",
        content: `**Batch processing function:**

\`\`\`python
import os
from PIL import Image

def batch_process(input_dir, output_dir, operations):
    """
    Batch-process images
    
    operations: list of functions to apply
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
                
                # Apply all operations
                for operation in operations:
                    if callable(operation):
                        operation(processor)
                    elif isinstance(operation, dict):
                        # Operation with parameters
                        method = getattr(processor, operation['method'])
                        method(*operation.get('args', []), **operation.get('kwargs', {}))
                
                processor.save(output_path)
                processed += 1
                print(f' Processed: {filename}')
                
            except Exception as e:
                errors += 1
                print(f' Error {filename}: {e}')
    
    print(f'\\nDone: {processed} succeeded, {errors} errors')

# Usage
operations = [
    lambda p: p.resize((800, 600), keep_aspect=True),
    lambda p: p.enhance_contrast(1.2),
    lambda p: p.apply_filter('sharpen')
]

batch_process('input/', 'output/', operations)
\`\`\`

**Batch processing with different effects:**

\`\`\`python
def batch_apply_effects(input_dir, output_dir):
    """Apply different effects to images"""
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
                    print(f'Error {filename}: {e}')

# Usage
batch_apply_effects('photos/', 'processed/')
\`\`\``
      },
      {
        title: "Stage 5: Adding a watermark",
        content: `**Adding a watermark:**

\`\`\`python
from PIL import Image, ImageDraw, ImageFont

class ImageProcessor:
    # ... previous methods ...
    
    def add_watermark(self, text, position='bottom-right', opacity=128):
        """Add a text watermark"""
        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        
        # Create a text layer
        txt = Image.new('RGBA', self.image.size, (255, 255, 255, 0))
        draw = ImageDraw.Draw(txt)
        
        # Try to use a TrueType font
        try:
            font = ImageFont.truetype('arial.ttf', 40)
        except:
            font = ImageFont.load_default()
        
        # Calculate position
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
        
        # Draw the text
        draw.text(pos, text, fill=(255, 255, 255, opacity), font=font)
        
        # Composite
        self.image = Image.alpha_composite(self.image, txt)
        return self
    
    def add_image_watermark(self, watermark_path, position='bottom-right', opacity=0.5):
        """Add an image as a watermark"""
        watermark = Image.open(watermark_path).convert('RGBA')
        
        # Adjust opacity
        if opacity < 1.0:
            alpha = watermark.split()[3]
            alpha = alpha.point(lambda p: int(p * opacity))
            watermark.putalpha(alpha)
        
        # Calculate position
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
        
        # Paste
        if self.image.mode != 'RGBA':
            self.image = self.image.convert('RGBA')
        
        self.image.paste(watermark, pos, watermark)
        return self
\`\`\`

**Usage:**

\`\`\`python
processor = ImageProcessor('photo.jpg')
processor.add_watermark('© My Company', position='bottom-right') \\
         .save('watermarked.png')

# Or an image watermark
processor.reset() \\
         .add_image_watermark('logo.png', position='bottom-right', opacity=0.7) \\
         .save('watermarked2.png')
\`\`\``
      },
      {
        title: "Stage 6: Full project example",
        content: `**Complete implementation with all features:**

\`\`\`python
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageFont
import os
import random

class ImageProcessor:
    def __init__(self, input_path):
        if not os.path.exists(input_path):
            raise FileNotFoundError(f'File not found: {input_path}')
        self.input_path = input_path
        self.image = Image.open(input_path)
        self.original = self.image.copy()
    
    # Basic operations
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
    
    # Enhancements
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
    
    # Filters
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
    
    # Effects
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
    
    # Watermark
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
        print(f'Saved: {output_path}')
        return self

# Usage
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
        title: "Project summary",
        content: `In this lesson we built a complete image-processing project:

**What we did:**

1. **Planning** — defined structure and features
2. **Base class** — created ImageProcessor with core operations
3. **Effects** — added sepia, vintage, watercolor, cartoon
4. **Batch processing** — processed multiple files
5. **Watermark** — added text and image watermarks
6. **Full implementation** — combined all features

**Skills we practiced:**

- Structuring code into classes
- Creating chainable methods
- Implementing various effects
- Batch file processing
- Working with transparency and compositing

**Next steps:**

- Add a CLI interface
- Build a web interface
- Add more effects
- Optimize performance
- Add metadata support

Image processing is a powerful tool for automation!`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Example 1: Basic usage",
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
      explanation: "Basic example of using the ImageProcessor class with chainable methods."
    },
    {
      title: "Example 2: Batch processing",
      code: `import os
from PIL import Image, ImageEnhance

def batch_enhance(input_dir, output_dir):
    for filename in os.listdir(input_dir):
        if filename.endswith(('.jpg', '.png')):
            img = Image.open(os.path.join(input_dir, filename))
            enhanced = ImageEnhance.Contrast(img).enhance(1.2)
            enhanced.save(os.path.join(output_dir, filename))`,
      explanation: "Batch-process all images in a directory."
    },
    {
      title: "Example 3: Sepia effect",
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
      explanation: "Function that applies a sepia effect to an image."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Not keeping the original",
      explanation: "Without saving the original, you cannot restore the initial state.",
      correctApproach: "Always keep a copy of the original: self.original = self.image.copy()."
    },
    {
      mistake: "Not handling errors in batch processing",
      explanation: "A single error can stop the entire batch.",
      correctApproach: "Use try/except for each iteration in batch processing."
    },
    {
      mistake: "Not checking that directories exist",
      explanation: "If the output directory does not exist, you will get an error.",
      correctApproach: "Create directories before saving: os.makedirs(output_dir, exist_ok=True)."
    },
    {
      mistake: "Forgetting about formats when saving",
      explanation: "Some operations (for example, alpha channel) require specific formats.",
      correctApproach: "Specify the format explicitly or check the image mode before saving."
    }
  ],
  
  summary: `In this lesson we built a complete image-processing project:

1. Planning — structure and features
2. Base class — ImageProcessor with core operations
3. Effects — sepia, vintage, watercolor, cartoon
4. Batch processing — multiple files
5. Watermark — text and image
6. Full implementation — combining all features

A practical project is the best way to reinforce your skills!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to keep the original image?",
        options: [
          "So you can restore the initial state",
          "To use more memory",
          "To make the code more complex",
          "It is not needed"
        ],
        correctAnswer: 0,
        explanation: "Keeping the original lets you restore the initial state and try different effects."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "What are chainable methods?",
        options: [
          "Methods that return self for sequential calls",
          "Methods that are linked to each other",
          "Methods that only work with chains",
          "Methods for processing chains"
        ],
        correctAnswer: 0,
        explanation: "Chainable methods return self, which lets you call several methods in sequence: obj.method1().method2().method3()."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Why is it important to handle errors in batch processing?",
        options: [
          "So one error does not stop the whole batch",
          "To speed up processing",
          "To save memory",
          "Errors do not matter"
        ],
        correctAnswer: 0,
        explanation: "Error handling lets you continue processing other files even if one file fails."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Which file format supports an alpha channel for watermarks?",
        options: [
          "PNG",
          "JPEG",
          "BMP",
          "All formats"
        ],
        correctAnswer: 0,
        explanation: "PNG supports an alpha channel. JPEG and BMP do not support transparency."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "Batch processing is always faster than processing a single file.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Batch processing does not speed up a single file; it lets you automatically process many files."
      }
    ],
    timeLimit: 20,
    passingScore: 70
  }
}
