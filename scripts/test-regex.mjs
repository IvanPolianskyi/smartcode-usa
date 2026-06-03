const lines = [
  'Привіт!',
  'Мене звати Олександр',
  'Я вивчаю Python',
  'До побачення!',
]

function normalizeLine(line) {
  return String(line ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

const rules = [
  { pattern: '^(привіт|вітаю|hello|hi)', flags: 'i' },
  { minLength: 3 },
  { pattern: 'python', flags: 'i' },
  { pattern: '(до побачення|бувай|goodbye|bye)', flags: 'i' },
]

lines.forEach((raw, i) => {
  const line = normalizeLine(raw)
  const rule = rules[i]
  const pattern = new RegExp(rule.pattern, rule.flags || 'i')
  console.log(i, JSON.stringify(line), pattern.test(line), rule.minLength ? line.length >= rule.minLength : null)
})
