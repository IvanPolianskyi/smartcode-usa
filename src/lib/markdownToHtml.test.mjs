/**
 * Tests for markdownToHtml renderer.
 * Verifies markdown transformation, security escaping, and edge cases.
 * Without this test, regressions in lesson content rendering or XSS vulnerabilities
 * can silently break student UI.
 */
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { markdownToHtml } from './markdownToHtml.js'

describe('markdownToHtml', () => {
  test('handles empty / null / undefined without throwing', () => {
    assert.equal(markdownToHtml(''), '')
    assert.equal(markdownToHtml(null), '')
    assert.equal(markdownToHtml(undefined), '')
  })

  test('escapes <script> and raw HTML in text content', () => {
    const raw = '<script>alert(1)</script>'
    const output = markdownToHtml(raw)
    assert.ok(!output.includes('<script>'), 'Must not contain raw script tag')
    assert.ok(output.includes('&lt;script&gt;'), 'Must contain escaped script tag')
  })

  test('blocks javascript: URLs in markdown links', () => {
    const raw = '[Click Me](javascript:alert(1))'
    const output = markdownToHtml(raw)
    assert.ok(!output.includes('href="javascript:'), 'Must not create javascript: href')
    assert.ok(output.includes('rel="noopener noreferrer"'), 'Must include rel="noopener noreferrer"')
  })

  test('safe links get target="_blank" and rel="noopener noreferrer"', () => {
    const raw = '[Google](https://google.com)'
    const output = markdownToHtml(raw)
    assert.ok(output.includes('href="https://google.com"'))
    assert.ok(output.includes('target="_blank"'))
    assert.ok(output.includes('rel="noopener noreferrer"'))
  })

  test('code blocks are not interpreted as markdown inside', () => {
    const raw = '```python\ndef test():\n    # **not bold** and *not italic*\n    x = 1\n```'
    const output = markdownToHtml(raw)
    assert.ok(!output.includes('<strong>'), 'Code block interior must not contain <strong>')
    assert.ok(!output.includes('<em>'), 'Code block interior must not contain <em>')
    assert.ok(output.includes('<code class="language-python">'), 'Must contain language code tag')
    assert.ok(output.includes('def test():'), 'Must contain raw code text')
  })

  test('inline code does not break adjacent bold text', () => {
    const raw = 'Use `print()` to **display output** on screen.'
    const output = markdownToHtml(raw)
    assert.ok(output.includes('<code>print()</code>'), 'Must render inline code')
    assert.ok(output.includes('<strong>display output</strong>'), 'Must render bold')
  })

  test('ordered and unordered lists are rendered properly', () => {
    const raw = '1. First item\n2. Second item\n- Bullet item'
    const output = markdownToHtml(raw)
    assert.ok(output.includes('<ol'), 'Must include ol')
    assert.ok(output.includes('<ul'), 'Must include ul')
    assert.ok(output.includes('First item'))
    assert.ok(output.includes('Bullet item'))
  })
})
