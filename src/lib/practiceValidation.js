/**
 * Validates student practice output against lesson expectations.
 * Used on client (LessonPage) and server (/api/progress).
 */

const INVISIBLE_CHARS = /[\u200b-\u200d\ufeff]/g

function normalizeLine(line) {
  return String(line ?? '')
    .replace(/\r/g, '')
    .replace(INVISIBLE_CHARS, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function splitOutputLines(text) {
  return String(text ?? '')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .trimEnd()
    .split('\n')
}

function getNonEmptyLines(actualLines) {
  const lines = []
  const sourceIndices = []

  actualLines.forEach((line, index) => {
    if (normalizeLine(line).length > 0) {
      lines.push(line)
      sourceIndices.push(index)
    }
  })

  return { lines, sourceIndices }
}

function mapRuleErrorsToSourceIndices(ruleErrors, sourceIndices) {
  return [...new Set(ruleErrors.map((i) => sourceIndices[i] ?? i))]
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

function checkAgainstExpectedOutput(output, expectedOutput, validation) {
  const actualLines = splitOutputLines(output).map((line) => line.trimEnd())
  const { lines: nonEmptyLines, sourceIndices } = getNonEmptyLines(actualLines)

  const failWithRuleErrors = (ruleErrors) => ({
    isCorrect: false,
    errors: mapRuleErrorsToSourceIndices(ruleErrors, sourceIndices),
  })

  if (validation?.lineRules?.length) {
    const minLines = validation.minLines ?? validation.lineRules.length

    if (nonEmptyLines.length < minLines) {
      const errors = []
      for (let i = nonEmptyLines.length; i < minLines; i++) {
        errors.push(sourceIndices[i] ?? i)
      }
      return { isCorrect: false, errors }
    }

    const linesToCheck = nonEmptyLines.slice(0, validation.lineRules.length)
    const lineRuleResult = validateWithLineRules(linesToCheck, validation.lineRules)

    if (lineRuleResult.isCorrect) {
      if (
        validation.exactLineCount &&
        nonEmptyLines.length > validation.lineRules.length
      ) {
        const extraErrors = nonEmptyLines
          .slice(validation.lineRules.length)
          .map((_, offset) => sourceIndices[offset + validation.lineRules.length])
        return { isCorrect: false, errors: extraErrors }
      }
      return lineRuleResult
    }

    if (expectedOutput) {
      const expectedLines = splitOutputLines(expectedOutput)
        .map((line) => line.trimEnd())
        .filter((line) => normalizeLine(line).length > 0)
      const exactResult = validateExactExample(nonEmptyLines, expectedLines)
      if (exactResult.isCorrect) {
        return { isCorrect: true, errors: [] }
      }
    }

    return failWithRuleErrors(lineRuleResult.errors)
  }

  if (!expectedOutput && expectedOutput !== '') {
    return { isCorrect: false, errors: [0] }
  }

  const expectedLines = splitOutputLines(expectedOutput)
    .map((line) => line.trimEnd())
    .filter((line) => normalizeLine(line).length > 0)
  return validateExactExample(nonEmptyLines, expectedLines)
}

/**
 * Validate stdout against a single practice example.
 * @param {string} output
 * @param {{ output?: string, validation?: object }|null|undefined} example
 * @param {object|null|undefined} taskValidation - practiceTask.validation (shared)
 * @returns {{ isCorrect: boolean, errors: number[] }}
 */
export function checkPracticeAgainstExample(output, example, taskValidation) {
  if (!example) {
    return { isCorrect: false, errors: [0] }
  }
  const validation = example.validation || taskValidation
  return checkAgainstExpectedOutput(output, example.output, validation)
}

/**
 * Validate one or more run outputs against all practice examples.
 * @param {string|string[]} outputs - stdout per example (or single string for first/only)
 * @param {object|null|undefined} practiceTask
 * @returns {{
 *   isCorrect: boolean|null,
 *   errors: number[],
 *   failedExampleIndexes: number[],
 *   exampleResults: Array<{ isCorrect: boolean, errors: number[] }>
 * }}
 */
export function checkPracticeOutputs(outputs, practiceTask) {
  if (!practiceTask?.examples?.length) {
    return {
      isCorrect: null,
      errors: [],
      failedExampleIndexes: [],
      exampleResults: [],
    }
  }

  const examples = practiceTask.examples
  const outputList = Array.isArray(outputs) ? outputs : [outputs]
  const exampleResults = []
  const failedExampleIndexes = []

  for (let i = 0; i < examples.length; i++) {
    const output = outputList[i] ?? (i === 0 ? outputList[0] : '')
    // For tasks with only one submitted output but multiple examples that share
    // the same validation.lineRules (no distinct I/O), validate the first output
    // against lineRules once when every example lacks distinct expected output runs.
    const result = checkPracticeAgainstExample(
      output,
      examples[i],
      practiceTask.validation
    )
    exampleResults.push(result)
    if (!result.isCorrect) {
      failedExampleIndexes.push(i)
    }
  }

  // Special case: single-run lineRules tasks with multiple illustrative examples
  // that all rely on the same structural validation (no per-example input).
  // If only one output was provided and validation.lineRules exist, pass when
  // that output satisfies lineRules (examples are documentation).
  const onlyOneOutput =
    !Array.isArray(outputs) || outputs.length === 1 || outputList.filter((o) => o != null && o !== '').length <= 1
  const allExamplesLackInput = examples.every((ex) => !ex.input)
  if (
    failedExampleIndexes.length > 0 &&
    onlyOneOutput &&
    allExamplesLackInput &&
    practiceTask.validation?.lineRules?.length
  ) {
    const single = checkPracticeAgainstExample(
      outputList[0] ?? '',
      examples[0],
      practiceTask.validation
    )
    if (single.isCorrect) {
      return {
        isCorrect: true,
        errors: [],
        failedExampleIndexes: [],
        exampleResults: examples.map(() => ({ isCorrect: true, errors: [] })),
      }
    }
  }

  const firstFailed = failedExampleIndexes[0]
  return {
    isCorrect: failedExampleIndexes.length === 0,
    errors: firstFailed == null ? [] : exampleResults[firstFailed].errors,
    failedExampleIndexes,
    exampleResults,
  }
}

/**
 * @param {string} output - Program stdout
 * @param {object|null|undefined} practiceTask - Lesson practiceTask config
 * @returns {{ isCorrect: boolean|null, errors: number[], failedExampleIndexes?: number[], exampleResults?: Array<{ isCorrect: boolean, errors: number[] }> }}
 */
export function checkPracticeOutput(output, practiceTask) {
  return checkPracticeOutputs(output, practiceTask)
}
