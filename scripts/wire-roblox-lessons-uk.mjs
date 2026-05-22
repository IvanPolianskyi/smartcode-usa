/**
 * Updates lesson-roblox-X-Y.js to import UK from uk/moduleXX-lessons.js
 * Run: node scripts/wire-roblox-lessons-uk.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(__dirname, '../src/lib/robloxLessonContent')

function wireLesson(blk, les) {
  const pad = String(blk).padStart(2, '0')
  const file = path.join(contentDir, `lesson-roblox-${blk}-${les}.js`)
  if (!fs.existsSync(file)) return false

  const ukExport = `ukLesson${blk}${les}`
  const enExport = `enLesson${blk}${les}`
  const modFile = `./uk/module${pad}-lessons`
  const enModFile = blk === 1 && les <= 3 ? `./en/module01-lessons` : `./en/module${pad}-lessons`

  const content = `import { ${ukExport} } from '${modFile}'
import { ${enExport} } from '${enModFile}'

export const lesson_roblox_${blk}_${les} = { uk: ${ukExport}, en: ${enExport} }
`
  fs.writeFileSync(file, content, 'utf8')
  return true
}

let count = 0
for (let blk = 1; blk <= 12; blk++) {
  for (let les = 1; les <= 6; les++) {
    if (wireLesson(blk, les)) count++
  }
}
console.log(`Wired ${count} lesson files.`)
