import fs from 'fs'

const files = [
  'src/lib/pythonCurriculum.js',
  'src/lib/pythonCurriculum.en.js',
]

function fixLessonOrders(content) {
  const lines = content.split('\n')
  let depth = 0
  let lessonOrder = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.includes('lessons: [')) {
      depth = 1
      lessonOrder = 0
      continue
    }

    if (depth > 0) {
      depth += (line.match(/\[/g) || []).length
      depth -= (line.match(/\]/g) || []).length

      if (line.includes('lessonId:')) {
        lessonOrder += 1
      } else if (lessonOrder > 0 && /^\s+order: \d+,/.test(line)) {
        lines[i] = line.replace(/order: \d+,/, `order: ${lessonOrder},`)
      }

      if (depth <= 0) {
        depth = 0
        lessonOrder = 0
      }
      continue
    }
  }

  return lines.join('\n')
}

for (const file of files) {
  const path = new URL(`../${file}`, import.meta.url)
  const content = fs.readFileSync(path, 'utf8')
  fs.writeFileSync(path, fixLessonOrders(content))
  console.log('Fixed', file)
}
