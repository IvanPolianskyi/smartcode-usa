/**
 * Replace em dash (—) and en dash (–) with hyphen (-) in Python course files.
 * Run: node scripts/fix-python-dashes.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const TARGETS = [
  path.join(root, 'src/lib/lessonContent'),
  path.join(root, 'src/lib/pythonCurriculum.js'),
  path.join(root, 'src/lib/pythonCurriculum.en.js'),
  path.join(root, 'src/lib/pythonModuleMeta.js'),
  path.join(root, 'src/hooks/usePythonCourseData.js'),
  path.join(root, 'src/components/PythonCourseComponents'),
  path.join(root, 'scripts/python-lesson-files.json'),
  path.join(root, 'messages/uk/dashboard.json'),
  path.join(root, 'messages/en/dashboard.json'),
]

const EM = '\u2014'
const EN = '\u2013'

function replaceDashes(text) {
  return text
    .split(EM)
    .join('-')
    .split(EN)
    .join('-')
    .replace(/\u200B/g, '')
    .replace(/\uFEFF/g, '')
    .replace(/ \u202F/g, ' ')
    .replace(/ ​​/g, ' ')
    .replace(/values ​​/g, 'values ')
    .replace(/Values ​​/g, 'Values ')
}

function walk(filePath, stats) {
  const st = fs.statSync(filePath)
  if (st.isFile()) {
    if (!/\.(js|json|mjs|md)$/i.test(filePath)) return
    const before = fs.readFileSync(filePath, 'utf8')
    const after = replaceDashes(before)
    if (after !== before) {
      const count =
        (before.match(/\u2014/g) || []).length +
        (before.match(/\u2013/g) || []).length +
        (before.match(/\u200B|\uFEFF| ​​/g) || []).length
      fs.writeFileSync(filePath, after, 'utf8')
      stats.files++
      stats.replacements += count
      console.log(`${count}  ${path.relative(root, filePath)}`)
    }
    return
  }
  for (const name of fs.readdirSync(filePath)) {
    walk(path.join(filePath, name), stats)
  }
}

const stats = { files: 0, replacements: 0 }
for (const target of TARGETS) {
  if (!fs.existsSync(target)) {
    console.warn('skip (missing):', path.relative(root, target))
    continue
  }
  walk(target, stats)
}

console.log(`Done. ${stats.replacements} replacements in ${stats.files} files.`)
