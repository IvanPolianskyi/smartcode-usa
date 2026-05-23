/**
 * Normalizes practice-task stdin for Python runners (Pyodide / server).
 */
export function parsePracticeStdin(input) {
  if (!input) return ''

  if (Array.isArray(input)) {
    return input.join('\n') + '\n'
  }

  if (typeof input === 'string') {
    const lines = input.split('\n').filter((line) => line.trim())
    return (
      lines
        .map((line) => {
          const colonMatch = line.match(/:\s*(.+)$/)
          if (colonMatch) return colonMatch[1].trim()
          const numberMatch = line.match(/\d+/)
          if (numberMatch) return numberMatch[0]
          return line.trim()
        })
        .filter(Boolean)
        .join('\n') + '\n'
    )
  }

  return ''
}
