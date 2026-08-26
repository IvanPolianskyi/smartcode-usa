/**
 * After inject: rename ukLesson→enLesson in EN module files and wire wrappers.
 *
 *   node scripts/wire-roblox-lessons-en.mjs
 *   node scripts/wire-roblox-lessons-en.mjs --modules 2,3,4,5
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { robloxCurriculum } from '../src/lib/robloxCurriculum.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.join(__dirname, '../src/lib/robloxLessonContent')

function parseModules() {
  const idx = process.argv.indexOf('--modules')
  if (idx === -1) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return process.argv[idx + 1]
    .split(',')
    .map((n) => Number(n.trim()))
    .filter((n) => n >= 1 && n <= 12)
}

function lessonNumsForModule(blk) {
  const mod = robloxCurriculum.modules.find(
    (m) => m.moduleId === `module-${String(blk).padStart(2, '0')}`
  )
  if (!mod) return []
  return mod.lessons.map((l) => {
    const match = l.lessonId.match(/lesson-roblox-\d+-(\d+)/)
    return match ? Number(match[1]) : l.order
  })
}

function prepareEnModuleFile(blk) {
  const pad = String(blk).padStart(2, '0')
  const file = path.join(contentDir, 'en', `module${pad}-lessons.js`)
  if (!fs.existsSync(file)) {
    console.warn(`Missing EN file: en/module${pad}-lessons.js`)
    return false
  }
  let code = fs.readFileSync(file, 'utf8')
  code = code.replace(/export const ukLesson/g, 'export const enLesson')
  code = code.replace(/\/\*\* Roblox Module 0?\d+ UK/gi, (m) => m.replace(/UK/i, 'EN'))
  // Inject leaves UK comment headers; normalize common patterns.
  code = code.replace(/\bUK\b(?= - lesson)/g, 'EN')
  fs.writeFileSync(file, code, 'utf8')
  return true
}

function wireLesson(blk, les) {
  const pad = String(blk).padStart(2, '0')
  const file = path.join(contentDir, `lesson-roblox-${blk}-${les}.js`)
  const enFile = path.join(contentDir, 'en', `module${pad}-lessons.js`)
  if (!fs.existsSync(file) || !fs.existsSync(enFile)) return false

  const ukExport = `ukLesson${blk}${les}`
  const enExport = `enLesson${blk}${les}`
  const content = `import { ${ukExport} } from './uk/module${pad}-lessons'
import { ${enExport} } from './en/module${pad}-lessons'

export const lesson_roblox_${blk}_${les} = { uk: ${ukExport}, en: ${enExport} }
`
  fs.writeFileSync(file, content, 'utf8')
  return true
}

const modules = parseModules()
let wired = 0
for (const blk of modules) {
  if (!prepareEnModuleFile(blk)) continue
  for (const les of lessonNumsForModule(blk)) {
    if (wireLesson(blk, les)) wired++
  }
}
console.log(`Prepared EN modules ${modules.join(',')} and wired ${wired} lesson wrappers.`)
