import fs from 'fs'
import path from 'path'

const dir = path.join('curriculum', 'roblox-v2')
const outDir = path.join(dir, 'templates')
const files = fs
  .readdirSync(dir)
  .filter((f) => /^module-\d+/.test(f))
  .sort()

const catalog = []
const lessonCounters = new Map()

fs.mkdirSync(outDir, { recursive: true })
for (const existing of fs.readdirSync(outDir)) {
  if (existing.endsWith('.lua')) fs.unlinkSync(path.join(outDir, existing))
}

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8')
  const moduleMatch = file.match(/module-(\d+)/)
  const moduleNum = moduleMatch ? moduleMatch[1] : '00'
  const lessons = [...text.matchAll(/^## Урок ([\d.]+)\s+[—–-]\s*(.+?)\s*$/gm)]
  const re = /```lua\r?\n([\s\S]*?)```/g
  let m

  while ((m = re.exec(text)) !== null) {
    let lessonId = `${Number(moduleNum)}.x`
    let lessonTitle = ''
    for (const L of lessons) {
      if (L.index < m.index) {
        lessonId = L[1]
        lessonTitle = L[2].trim()
      }
    }

    const key = `${moduleNum}:${lessonId}`
    const n = (lessonCounters.get(key) || 0) + 1
    lessonCounters.set(key, n)

    const before = text.slice(Math.max(0, m.index - 400), m.index)
    const h = before.match(/### ([^\n]+)\s*$/)
    const heading = h ? h[1].trim() : ''
    const code = m[1].replace(/\r\n/g, '\n').trimEnd() + '\n'
    const lessonSlug = String(lessonId).replace(/\./g, '-')
    const modPad = moduleNum.padStart(2, '0')
    const finalName =
      n === 1 ? `m${modPad}-lesson-${lessonSlug}.lua` : `m${modPad}-lesson-${lessonSlug}-${n}.lua`

    const header = [
      `-- SmartCode Roblox v2 template`,
      `-- Module ${Number(moduleNum)} | Lesson ${lessonId}${lessonTitle ? ` — ${lessonTitle}` : ''}`,
      heading ? `-- ${heading}` : null,
      `-- Source: ${file}`,
      `--`,
      ``,
    ]
      .filter((line) => line !== null)
      .join('\n')

    fs.writeFileSync(path.join(outDir, finalName), header + code, 'utf8')
    catalog.push({
      file: finalName,
      module: Number(moduleNum),
      lessonId,
      lessonTitle,
      heading,
      source: file,
    })
  }
}

catalog.sort(
  (a, b) =>
    a.module - b.module ||
    String(a.lessonId).localeCompare(String(b.lessonId), 'en', { numeric: true }) ||
    a.file.localeCompare(b.file)
)

fs.writeFileSync(path.join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2) + '\n', 'utf8')

const byModule = catalog.reduce((acc, item) => {
  ;(acc[item.module] ||= []).push(item)
  return acc
}, {})

const lines = [
  '# Lua templates — SmartCode Roblox v2',
  '',
  'Єдине джерело готових скриптів для уроків (особливо **М4 іскри** і механіки D).',
  '',
  '## Як роздавати учням',
  '',
  '1. Відкрий потрібний `.lua` з цього каталогу.',
  '2. Скопіюй тіло (або весь файл) в Script / LocalScript у Studio.',
  '3. Не імпровізуй 5 версій в одній групі — один шаблон на урок.',
  '4. Учням: спочатку міняй **числа / рядки / кольори**, не видаляй рядки «бо не розумію».',
  '',
  `**Усього шаблонів:** ${catalog.length}`,
  '',
  '## Індекс',
  '',
]

for (const mod of Object.keys(byModule)
  .map(Number)
  .sort((a, b) => a - b)) {
  lines.push(`### Модуль ${mod}`)
  lines.push('')
  lines.push('| Урок | Файл | Нотатка |')
  lines.push('|------|------|---------|')
  for (const item of byModule[mod]) {
    const note = (item.heading || item.lessonTitle || '').replace(/\|/g, '/')
    lines.push(`| ${item.lessonId} | \`${item.file}\` | ${note} |`)
  }
  lines.push('')
}

lines.push('## Регенерація')
lines.push('')
lines.push('```bash')
lines.push('node scripts/extract-roblox-templates.mjs')
lines.push('```')
lines.push('')
lines.push('Скрипт витягує всі блоки ` ```lua ` з `module-*.md` і оновлює цей каталог + `catalog.json`.')
lines.push('')

fs.writeFileSync(path.join(outDir, 'README.md'), lines.join('\n'), 'utf8')

console.log(`Wrote ${catalog.length} templates → ${outDir}`)
for (const [mod, items] of Object.entries(byModule)) {
  console.log(`  M${mod}: ${items.length}`)
}
