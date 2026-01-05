/**
 * Lesson 11-1: Робота з PDF: PyPDF2 та reportlab
 * Full educational content
 */

import { QUIZ_QUESTION_TYPES } from '../courseData'

export const lesson_11_1 = {
  lessonId: "lesson-11-1",
  moduleId: "module-11",
  order: 1,
  title: "Робота з PDF: PyPDF2 та reportlab",
  
  learningObjectives: [
    "Встановити PyPDF2 та reportlab",
    "Читати PDF файли",
    "Створювати PDF файли",
    "Маніпулювати PDF документами"
  ],
  
  estimatedTime: 90,
  prerequisites: ["lesson-10-4"],
  
  videoUrl: "",
  
  theory: {
    sections: [
      {
        title: "Вступ до роботи з PDF",
        content: `PDF (Portable Document Format) — популярний формат для документів, який зберігає форматуювання незалежно від платформи.

**Бібліотеки для роботи з PDF:**

- **PyPDF2** — читання та маніпуляції з існуючими PDF
- **reportlab** — створення нових PDF документів
- **pdfplumber** — більш потужне читання та аналіз

**Основні задачі:**

- Читання тексту з PDF
- Об'єднання кількох PDF
- Розділення PDF на окремі файли
- Створення нових PDF документів
- Додавання тексту, зображень, таблиць

**Встановлення:**

\`\`\`bash
pip install PyPDF2 reportlab
\`\`\`

**Імпорт:**

\`\`\`python
import PyPDF2
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
\`\`\``
      },
      {
        title: "Читання PDF з PyPDF2",
        content: `**Відкриття та читання PDF:**

\`\`\`python
import PyPDF2

# Відкрити PDF файл
with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    
    # Кількість сторінок
    num_pages = len(pdf_reader.pages)
    print(f'Кількість сторінок: {num_pages}')
    
    # Читати першу сторінку
    first_page = pdf_reader.pages[0]
    text = first_page.extract_text()
    print(text)
\`\`\`

**Читання всіх сторінок:**

\`\`\`python
import PyPDF2

def read_pdf(filepath):
    with open(filepath, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        full_text = ""
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            full_text += f"\\n--- Сторінка {page_num + 1} ---\\n"
            full_text += text
        
        return full_text

# Використання
text = read_pdf('document.pdf')
print(text)
\`\`\`

**Отримання метаданих:**

\`\`\`python
import PyPDF2

with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    
    # Метадані
    metadata = pdf_reader.metadata
    print(f'Назва: {metadata.title}')
    print(f'Автор: {metadata.author}')
    print(f'Створено: {metadata.creation_date}')
    print(f'Модифіковано: {metadata.modification_date}')
\`\`\``
      },
      {
        title: "Маніпуляції з PDF",
        content: `**Об'єднання PDF файлів:**

\`\`\`python
import PyPDF2

def merge_pdfs(pdf_list, output_path):
    """Об'єднати кілька PDF в один"""
    pdf_merger = PyPDF2.PdfMerger()
    
    for pdf_path in pdf_list:
        with open(pdf_path, 'rb') as file:
            pdf_merger.append(file)
    
    # Зберегти об'єднаний PDF
    with open(output_path, 'wb') as output_file:
        pdf_merger.write(output_file)
    
    print(f'Об\'єднано {len(pdf_list)} PDF файлів')

# Використання
merge_pdfs(['file1.pdf', 'file2.pdf', 'file3.pdf'], 'merged.pdf')
\`\`\`

**Розділення PDF:**

\`\`\`python
import PyPDF2

def split_pdf(input_path, output_dir):
    """Розділити PDF на окремі сторінки"""
    import os
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        for page_num in range(len(pdf_reader.pages)):
            pdf_writer = PyPDF2.PdfWriter()
            pdf_writer.add_page(pdf_reader.pages[page_num])
            
            output_path = os.path.join(output_dir, f'page_{page_num + 1}.pdf')
            with open(output_path, 'wb') as output_file:
                pdf_writer.write(output_file)
        
        print(f'Розділено на {len(pdf_reader.pages)} файлів')

# Використання
split_pdf('document.pdf', 'pages/')
\`\`\`

**Витягнення конкретних сторінок:**

\`\`\`python
import PyPDF2

def extract_pages(input_path, output_path, page_numbers):
    """Витягти конкретні сторінки з PDF"""
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_writer = PyPDF2.PdfWriter()
        
        for page_num in page_numbers:
            if 0 <= page_num < len(pdf_reader.pages):
                pdf_writer.add_page(pdf_reader.pages[page_num])
        
        with open(output_path, 'wb') as output_file:
            pdf_writer.write(output_file)
        
        print(f'Витягнуто {len(page_numbers)} сторінок')

# Використання
extract_pages('document.pdf', 'extracted.pdf', [0, 2, 4])
\`\`\`

**Поворот сторінок:**

\`\`\`python
import PyPDF2

def rotate_pages(input_path, output_path, page_numbers, rotation):
    """Повернути сторінки PDF"""
    # rotation: 90, 180, 270 (градуси за годинниковою стрілкою)
    with open(input_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        pdf_writer = PyPDF2.PdfWriter()
        
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            
            if page_num in page_numbers:
                page.rotate(rotation)
            
            pdf_writer.add_page(page)
        
        with open(output_path, 'wb') as output_file:
            pdf_writer.write(output_file)

# Використання
rotate_pages('document.pdf', 'rotated.pdf', [0, 1], 90)
\`\`\``
      },
      {
        title: "Створення PDF з reportlab",
        content: `**Простий PDF документ:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4

# Створити PDF
c = canvas.Canvas('simple.pdf', pagesize=letter)

# Додати текст
c.drawString(100, 750, "Привіт, це мій перший PDF!")
c.drawString(100, 730, "Це другий рядок тексту.")

# Зберегти PDF
c.save()
\`\`\`

**Форматування тексту:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch

c = canvas.Canvas('formatted.pdf', pagesize=A4)

# Розмір та стиль шрифту
c.setFont("Helvetica", 16)
c.drawString(100, 750, "Заголовок")

c.setFont("Helvetica", 12)
c.drawString(100, 720, "Звичайний текст")

# Кольори
c.setFillColorRGB(1, 0, 0)  # Червоний
c.drawString(100, 690, "Червоний текст")

c.setFillColorRGB(0, 0, 1)  # Синій
c.drawString(100, 660, "Синій текст")

# Повернути до чорного
c.setFillColorRGB(0, 0, 0)
c.drawString(100, 630, "Чорний текст")

c.save()
\`\`\`

**Багатосторінковий документ:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('multipage.pdf', pagesize=A4)

# Перша сторінка
c.drawString(100, 750, "Сторінка 1")
c.drawString(100, 730, "Це перша сторінка документа.")

# Друга сторінка
c.showPage()
c.drawString(100, 750, "Сторінка 2")
c.drawString(100, 730, "Це друга сторінка документа.")

# Третя сторінка
c.showPage()
c.drawString(100, 750, "Сторінка 3")
c.drawString(100, 730, "Це третя сторінка документа.")

c.save()
\`\`\`

**Додавання ліній та фігур:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('shapes.pdf', pagesize=A4)

# Лінія
c.line(100, 750, 500, 750)

# Прямокутник
c.rect(100, 700, 200, 50)

# Коло
c.circle(300, 500, 50)

# Заповнений прямокутник
c.setFillColorRGB(0.8, 0.8, 0.8)
c.rect(100, 400, 200, 50, fill=1)

c.save()
\`\`\``
      },
      {
        title: "Розширені можливості reportlab",
        content: `**Додавання зображень:**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

c = canvas.Canvas('with_image.pdf', pagesize=A4)

# Додати зображення
# drawImage(image_path, x, y, width, height)
c.drawImage('photo.jpg', 100, 600, width=200, height=150)

# Додати текст
c.drawString(100, 580, "Зображення додано до PDF")

c.save()
\`\`\`

**Таблиці з reportlab:**

\`\`\`python
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

# Створити документ
doc = SimpleDocTemplate('table.pdf', pagesize=A4)
story = []

# Дані для таблиці
data = [
    ['Назва', 'Ціна', 'Кількість'],
    ['Товар 1', '100 грн', '5'],
    ['Товар 2', '200 грн', '3'],
    ['Товар 3', '150 грн', '7'],
]

# Створити таблицю
table = Table(data)

# Стиль таблиці
style = TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
    ('GRID', (0, 0), (-1, -1), 1, colors.black)
])

table.setStyle(style)
story.append(table)

# Зберегти
doc.build(story)
\`\`\`

**Параграфи та стилі:**

\`\`\`python
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate('paragraphs.pdf', pagesize=A4)
story = []
styles = getSampleStyleSheet()

# Заголовок
title = Paragraph("Заголовок документа", styles['Title'])
story.append(title)
story.append(Spacer(1, 12))

# Підзаголовок
heading = Paragraph("Підзаголовок", styles['Heading1'])
story.append(heading)
story.append(Spacer(1, 12))

# Звичайний текст
text = Paragraph("Це звичайний текст параграфа. Він може містити <b>жирний</b> та <i>курсивний</i> текст.", styles['Normal'])
story.append(text)

doc.build(story)
\`\`\``
      },
      {
        title: "Практичні приклади",
        content: `**Приклад 1: Створення звіту з даних**

\`\`\`python
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def create_report(data, output_path):
    """Створити PDF звіт з даних"""
    c = canvas.Canvas(output_path, pagesize=A4)
    
    y_position = 750
    
    # Заголовок
    c.setFont("Helvetica-Bold", 20)
    c.drawString(100, y_position, "Звіт про продажі")
    y_position -= 30
    
    # Дані
    c.setFont("Helvetica", 12)
    for item in data:
        c.drawString(100, y_position, f"{item['name']}: {item['value']} грн")
        y_position -= 20
        
        if y_position < 50:  # Нова сторінка
            c.showPage()
            y_position = 750
    
    c.save()

# Використання
data = [
    {'name': 'Товар 1', 'value': 1000},
    {'name': 'Товар 2', 'value': 2000},
    {'name': 'Товар 3', 'value': 1500},
]
create_report(data, 'sales_report.pdf')
\`\`\`

**Приклад 2: Об'єднання звітів**

\`\`\`python
import PyPDF2
import os

def merge_reports(report_dir, output_path):
    """Об'єднати всі PDF звіти з директорії"""
    pdf_files = [f for f in os.listdir(report_dir) if f.endswith('.pdf')]
    pdf_files.sort()
    
    pdf_merger = PyPDF2.PdfMerger()
    
    for pdf_file in pdf_files:
        pdf_path = os.path.join(report_dir, pdf_file)
        with open(pdf_path, 'rb') as file:
            pdf_merger.append(file)
    
    with open(output_path, 'wb') as output_file:
        pdf_merger.write(output_file)
    
    print(f'Об\'єднано {len(pdf_files)} звітів')

# Використання
merge_reports('reports/', 'all_reports.pdf')
\`\`\``
      },
      {
        title: "Підсумок",
        content: `На цьому уроці ми вивчили роботу з PDF файлами:

**Ключові бібліотеки:**

1. **PyPDF2** — читання та маніпуляції з PDF
2. **reportlab** — створення нових PDF документів

**Основні операції:**

- Читання тексту з PDF
- Об'єднання кількох PDF
- Розділення PDF на сторінки
- Створення нових PDF документів
- Додавання тексту, зображень, таблиць
- Форматування документів

**Важливо:**

- PyPDF2 працює з існуючими PDF
- reportlab створює нові PDF з нуля
- Завжди використовуйте 'rb' режим для читання PDF
- Використовуйте контекстні менеджери (with) для роботи з файлами

**Наступний крок:**

У наступному уроці ми навчимося працювати з Excel файлами за допомогою openpyxl.

**Примітка:** Якщо ви вже знайомі з матеріалом про роботу з PDF, ви можете відразу переходити до тесту.`
      }
    ]
  },
  
  codeExamples: [
    {
      title: "Приклад 1: Читання PDF",
      code: `import PyPDF2

with open('document.pdf', 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    page = pdf_reader.pages[0]
    text = page.extract_text()
    print(text)`,
      explanation: "Відкриваємо PDF файл та читаємо текст з першої сторінки."
    },
    {
      title: "Приклад 2: Об'єднання PDF",
      code: `import PyPDF2

pdf_merger = PyPDF2.PdfMerger()
for pdf_file in ['file1.pdf', 'file2.pdf']:
    with open(pdf_file, 'rb') as file:
        pdf_merger.append(file)

with open('merged.pdf', 'wb') as output:
    pdf_merger.write(output)`,
      explanation: "Об'єднуємо кілька PDF файлів в один."
    },
    {
      title: "Приклад 3: Створення PDF",
      code: `from reportlab.pdfgen import canvas

c = canvas.Canvas('document.pdf')
c.drawString(100, 750, "Привіт, світ!")
c.save()`,
      explanation: "Створюємо простий PDF документ з текстом."
    },
    {
      title: "Приклад 4: Таблиця в PDF",
      code: `from reportlab.platypus import SimpleDocTemplate, Table
from reportlab.lib import colors

doc = SimpleDocTemplate('table.pdf')
data = [['Назва', 'Ціна'], ['Товар', '100 грн']]
table = Table(data)
doc.build([table])`,
      explanation: "Створюємо PDF з таблицею."
    }
  ],
  
  commonMistakes: [
    {
      mistake: "Не використовувати 'rb' режим для читання PDF",
      explanation: "PDF файли є бінарними, тому потрібен 'rb' режим.",
      correctApproach: "Завжди використовуйте 'rb' для читання: open('file.pdf', 'rb')."
    },
    {
      mistake: "Забувати закривати файли",
      explanation: "Незакриті файли можуть викликати проблеми з пам'яттю.",
      correctApproach: "Використовуйте контекстні менеджери: with open('file.pdf', 'rb') as file:."
    },
    {
      mistake: "Не перевіряти кількість сторінок",
      explanation: "Спроба доступу до неіснуючої сторінки викличе помилку.",
      correctApproach: "Перевіряйте кількість сторінок: if page_num < len(pdf_reader.pages)."
    },
    {
      mistake: "Не зберігати PDF після створення",
      explanation: "reportlab не зберігає PDF автоматично, потрібно викликати save().",
      correctApproach: "Завжди викликайте c.save() після створення PDF."
    }
  ],
  
  summary: `На цьому уроці ми вивчили роботу з PDF:

1. **PyPDF2** — читання та маніпуляції з PDF
2. **reportlab** — створення нових PDF документів
3. **Читання тексту** — extract_text()
4. **Об'єднання PDF** — PdfMerger
5. **Створення PDF** — canvas та platypus
6. **Таблиці та форматування** — стилі та таблиці

PDF — стандартний формат для документів!`,
  
  practiceTask: null,
  
  quiz: {
    questions: [
      {
        id: "q1",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Який режим файлу потрібен для читання PDF?",
        options: [
          "'rb' (read binary)",
          "'r' (read text)",
          "'wb' (write binary)",
          "'w' (write text)"
        ],
        correctAnswer: 0,
        explanation: "PDF файли є бінарними, тому потрібен 'rb' режим для читання."
      },
      {
        id: "q2",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Яка бібліотека використовується для створення нових PDF документів?",
        options: [
          "reportlab",
          "PyPDF2",
          "pdfplumber",
          "pdfkit"
        ],
        correctAnswer: 0,
        explanation: "reportlab використовується для створення нових PDF документів з нуля."
      },
      {
        id: "q3",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Як отримати текст зі сторінки PDF в PyPDF2?",
        options: [
          "page.extract_text()",
          "page.get_text()",
          "page.read_text()",
          "page.text()"
        ],
        correctAnswer: 0,
        explanation: "Метод extract_text() витягує текст зі сторінки PDF."
      },
      {
        id: "q4",
        type: QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE,
        question: "Що потрібно викликати після створення PDF в reportlab?",
        options: [
          "c.save()",
          "c.close()",
          "c.finish()",
          "c.write()"
        ],
        correctAnswer: 0,
        explanation: "Метод save() зберігає PDF документ на диск."
      },
      {
        id: "q5",
        type: QUIZ_QUESTION_TYPES.TRUE_FALSE,
        question: "PyPDF2 може створювати нові PDF документи з нуля.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. PyPDF2 працює з існуючими PDF. Для створення нових PDF використовуйте reportlab."
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
}


