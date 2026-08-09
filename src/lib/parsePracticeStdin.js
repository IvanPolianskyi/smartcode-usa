/**
 * Normalizes practice-task stdin for Python runners (Pyodide / server).
 *
 * Supports:
 * - Raw multi-line stdin (passed through), including times like 10:30:45
 * - Labeled lines like "Price: 100" (colon followed by whitespace) → value only
 * - Array of values → joined with newlines
 */
export function parsePracticeStdin(input) {
  if (!input) return ''

  if (Array.isArray(input)) {
    return input.join('\n') + '\n'
  }

  if (typeof input === 'string') {
    const lines = String(input).replace(/\r\n/g, '\n').split('\n')
    while (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop()
    }

    const nonEmpty = lines.filter((line) => line.trim())
    // Require whitespace after colon so times like 10:30:45 stay intact
    const hasLabeledLines = nonEmpty.some((line) =>
      /^[^:\n]+:\s+\S/.test(line.trim())
    )

    if (hasLabeledLines) {
      return (
        nonEmpty
          .map((line) => {
            const colonMatch = line.match(/^[^:]+:\s+(.+)$/)
            if (colonMatch) return colonMatch[1].trim()
            return line.trim()
          })
          .join('\n') + '\n'
      )
    }

    return lines.join('\n') + '\n'
  }

  return ''
}
