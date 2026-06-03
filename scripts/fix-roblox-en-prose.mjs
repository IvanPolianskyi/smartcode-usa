/**
 * Fix logical wording issues in EN Roblox lesson content.
 * Run: node scripts/fix-roblox-en-prose.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const enDir = path.join(__dirname, '../src/lib/robloxLessonContent/en')

const EN_FIXES = [
  ['**Teen rule:**', '**Golden rule:**'],
  ['Good teen-friendly tracks have:', 'Good beginner-friendly tracks have:'],
  ['**Teen-friendly** short tips', '**Short friendly** tips'],
  ["title: 'Teen-friendly UX polish'", "title: 'Clear shop UX polish'"],
  ["'UK translation'", "'Coins only'"],
  ["'UK only'", "'Coins only'"],
  ['teen-friendly UX', 'player-friendly UX'],
  ['Teen-friendly polish', 'Player-friendly polish'],
  ['Best practices for teen-friendly UX', 'Best practices for player-friendly UX'],
]

function fixContent(text) {
  let out = text
  for (const [from, to] of EN_FIXES) {
    out = out.split(from).join(to)
  }
  return out
}

const files = fs
  .readdirSync(enDir)
  .filter((f) => (f.startsWith('module') && f.endsWith('.js')) || f === 'allLessons.js')

let updated = 0
for (const file of files) {
  const filePath = path.join(enDir, file)
  const before = fs.readFileSync(filePath, 'utf8')
  const after = fixContent(before)
  if (after !== before) {
    fs.writeFileSync(filePath, after, 'utf8')
    updated++
    console.log(`fixed ${file}`)
  }
}

console.log(`Done. Updated ${updated} EN files.`)
