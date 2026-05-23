/**
 * Validates student practice output against lesson expectations.
 * Used on client (LessonPage) and server (/api/progress).
 */

function normalizeLine(line) {
  return String(line ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

function splitOutputLines(text) {
  return String(text ?? '').replace(/\r\n/g, '\n').split('\n')
}

function validateWithLineRules(actualLines, lineRules) {
  const errors = []
  const normalizedActual = actualLines.map(normalizeLine)

  if (normalizedActual.length < lineRules.length) {
    for (let i = normalizedActual.length; i < lineRules.length; i++) {
      errors.push(i)
    }
    return { isCorrect: false, errors }
  }

  for (let i = 0; i < lineRules.length; i++) {
    const rule = lineRules[i]
    const line = normalizedActual[i] || ''

    if (rule.pattern) {
      const pattern =
        rule.pattern instanceof RegExp ? rule.pattern : new RegExp(rule.pattern, rule.flags || 'i')
      if (!pattern.test(line)) {
        errors.push(i)
      }
      continue
    }

    if (rule.minLength != null && line.length < rule.minLength) {
      errors.push(i)
      continue
    }

    if (rule.contains) {
      const needle = normalizeLine(rule.contains)
      if (!line.includes(needle)) {
        errors.push(i)
      }
    }
  }

  const minLines = lineRules.length
  if (normalizedActual.length > minLines) {
    const extraLines = normalizedActual.slice(minLines).filter((line) => line.length > 0)
    if (extraLines.length > 0) {
      for (let i = minLines; i < normalizedActual.length; i++) {
        if (normalizedActual[i]) errors.push(i)
      }
    }
  }

  return { isCorrect: errors.length === 0, errors }
}

function validateExactExample(actualLines, expectedLines) {
  const errors = []
  const maxLines = Math.max(expectedLines.length, actualLines.length)

  if (actualLines.length !== expectedLines.length) {
    for (let i = 0; i < maxLines; i++) {
      errors.push(i)
    }
    return { isCorrect: false, errors: [...new Set(errors)] }
  }

  for (let i = 0; i < maxLines; i++) {
    const expectedLine = normalizeLine(expectedLines[i] || '')
    const actualLine = normalizeLine(actualLines[i] || '')
    if (expectedLine !== actualLine) {
      errors.push(i)
    }
  }

  return { isCorrect: errors.length === 0, errors }
}

/**
 * @param {string} output - Program stdout
 * @param {object|null|undefined} practiceTask - Lesson practiceTask config
 * @returns {{ isCorrect: boolean|null, errors: number[] }}
 */
export function checkPracticeOutput(output, practiceTask) {
  if (!practiceTask?.examples?.length) {
    return { isCorrect: null, errors: [] }
  }

  const actualLines = splitOutputLines(output).map((line) => line.trimEnd())
  const validation = practiceTask.validation

  if (validation?.lineRules?.length) {
    const minLines = validation.minLines ?? validation.lineRules.length
    const nonEmptyLines = actualLines.filter((line) => normalizeLine(line).length > 0)

    if (nonEmptyLines.length < minLines) {
      const errors = []
      for (let i = nonEmptyLines.length; i < minLines; i++) {
        errors.push(i)
      }
      return { isCorrect: false, errors }
    }

    if (validation.exactLineCount && nonEmptyLines.length !== validation.lineRules.length) {
      const errors = []
      for (let i = 0; i < Math.max(nonEmptyLines.length, validation.lineRules.length); i++) {
        errors.push(i)
      }
      return { isCorrect: false, errors }
    }

    return validateWithLineRules(
      nonEmptyLines.slice(0, validation.lineRules.length),
      validation.lineRules
    )
  }

  const expectedOutput = practiceTask.examples[0].output
  const expectedLines = splitOutputLines(expectedOutput).map((line) => line.trimEnd())

  return validateExactExample(actualLines, expectedLines)
}
