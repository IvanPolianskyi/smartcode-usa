/**
 * Creates missing uk/moduleXX-lessons.js from EN sources (export rename only).
 * Full Ukrainian translation: npm run gen:roblox-uk
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const contentDir = path.join(root, 'src/lib/robloxLessonContent')
const ukDir = path.join(contentDir, 'uk')

for (let mod = 1; mod <= 12; mod++) {
  const pad = String(mod).padStart(2, '0')
  const ukPath = path.join(ukDir, `module${pad}-lessons.js`)
  if (fs.existsSync(ukPath)) {
    console.log(`skip module ${pad} (uk exists)`)
    continue
  }

  const enPath = path.join(contentDir, 'en', `module${pad}-lessons.js`)
  if (!fs.existsSync(enPath)) {
    console.warn(`skip module ${pad} (no en file)`)
    continue
  }

  let code = fs.readFileSync(enPath, 'utf8')
  code = code.replace(
    /^\/\*\*[\s\S]*?\*\/\n/,
    `/** UK clone from EN — run npm run gen:roblox-uk for Ukrainian translation */\n`
  )
  code = code.replace(/export const enLesson/g, 'export const ukLesson')

  fs.mkdirSync(ukDir, { recursive: true })
  fs.writeFileSync(ukPath, code, 'utf8')
  console.log(`created ${ukPath}`)
}

console.log('Done.')
