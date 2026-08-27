/**
 * Practice output validation tests.
 *
 * Run: node --test src/lib/practiceValidation.test.mjs
 *
 * Without these, a student can paste a correct answer and still fail because of
 * \\r\\n vs \\n, trailing spaces, invisible Unicode, or case — or pass with
 * junk around the expected lines. That mismatch is a direct path to chargebacks
 * and cancellations: "I solved it, the platform said no."
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import {
  checkPracticeOutput,
  checkPracticeOutputs,
  checkPracticeAgainstExample,
} from './practiceValidation.js'

function task(examples, validation) {
  return { examples, validation }
}

test('exact match: happy path', () => {
  const result = checkPracticeOutput('Hello\nWorld', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
  assert.deepEqual(result.errors, [])
})

test('normalizes CRLF to LF', () => {
  const result = checkPracticeOutput('Hello\r\nWorld\r\n', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
})

test('trims trailing spaces per line and ignores trailing blank lines', () => {
  const result = checkPracticeOutput('Hello  \nWorld\n\n', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
})

test('comparison is case-insensitive', () => {
  const result = checkPracticeOutput('HELLO\nworld', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
})

test('strips zero-width / BOM invisible characters', () => {
  const withInvisible = '\uFEFFHe\u200bllo\nWorld'
  const result = checkPracticeOutput(withInvisible, task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
})

test('collapses internal whitespace runs on a line', () => {
  const result = checkPracticeOutput('Hello   World', task([{ output: 'Hello World' }]))
  assert.equal(result.isCorrect, true)
})

test('rejects wrong line order', () => {
  const result = checkPracticeOutput('World\nHello', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, false)
  assert.ok(result.errors.length > 0)
})

test('rejects partial match (missing a required line)', () => {
  const result = checkPracticeOutput('Hello', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, false)
})

test('rejects empty output when something is expected', () => {
  const result = checkPracticeOutput('', task([{ output: 'Hello' }]))
  assert.equal(result.isCorrect, false)
})

test('rejects extra non-empty lines beyond expected', () => {
  const result = checkPracticeOutput('Hello\nWorld\nExtra', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, false)
})

test('ignores blank lines between expected content when filtering empties', () => {
  // split keeps blanks; getNonEmptyLines drops them before exact compare
  const result = checkPracticeOutput('Hello\n\nWorld', task([{ output: 'Hello\nWorld' }]))
  assert.equal(result.isCorrect, true)
})

test('rejects surrounding junk that adds non-empty lines', () => {
  const result = checkPracticeOutput(
    'DEBUG\nHello\nWorld',
    task([{ output: 'Hello\nWorld' }])
  )
  assert.equal(result.isCorrect, false)
})

test('no examples → isCorrect null (nothing to grade)', () => {
  const result = checkPracticeOutput('anything', { examples: [] })
  assert.equal(result.isCorrect, null)
})

test('lineRules: contains match is case-insensitive', () => {
  const practice = task(
    [{ output: '' }],
    { lineRules: [{ contains: 'ok' }, { contains: 'done' }] }
  )
  const result = checkPracticeAgainstExample('OK\nDone', practice.examples[0], practice.validation)
  assert.equal(result.isCorrect, true)
})

test('lineRules: fails when a required fragment is missing', () => {
  const practice = task(
    [{ output: '' }],
    { lineRules: [{ contains: 'ok' }, { contains: 'done' }] }
  )
  const result = checkPracticeAgainstExample('OK\nnope', practice.examples[0], practice.validation)
  assert.equal(result.isCorrect, false)
})

test('multiple examples: all must pass when multiple outputs provided', () => {
  const practice = task([
    { input: '1', output: '2' },
    { input: '3', output: '4' },
  ])
  const ok = checkPracticeOutputs(['2', '4'], practice)
  assert.equal(ok.isCorrect, true)
  const bad = checkPracticeOutputs(['2', '9'], practice)
  assert.equal(bad.isCorrect, false)
  assert.deepEqual(bad.failedExampleIndexes, [1])
})

test('single output against multi-example I/O tasks fails later examples', () => {
  const practice = task([
    { input: '1', output: '2' },
    { input: '3', output: '4' },
  ])
  // Only first output supplied → second compared as ''
  const result = checkPracticeOutputs('2', practice)
  assert.equal(result.isCorrect, false)
  assert.ok(result.failedExampleIndexes.includes(1))
})
