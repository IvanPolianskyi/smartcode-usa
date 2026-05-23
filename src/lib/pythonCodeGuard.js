/**
 * Client-side guards before running student Python (Pyodide).
 */

const DANGEROUS_PATTERNS = [
  /import\s+os\b/i,
  /import\s+subprocess\b/i,
  /import\s+urllib\b/i,
  /import\s+socket\b/i,
  /__import__\s*\(/i,
  /eval\s*\(/i,
  /exec\s*\(/i,
  /compile\s*\(/i,
  /open\s*\(['"]\/etc/i,
  /open\s*\(['"]\/proc/i,
  /open\s*\(['"]\/sys/i,
  /open\s*\(['"]\.\./i,
]

function normalizeCodeForCheck(code) {
  let normalized = code.replace(/#.*$/gm, '')
  normalized = normalized.replace(/""".*?"""/gs, '')
  normalized = normalized.replace(/'''.*?'''/gs, '')
  normalized = normalized.replace(/"[^"]*"/g, '')
  normalized = normalized.replace(/'[^']*'/g, '')
  return normalized
}

export function getFilteredDangerousPatterns(moduleId) {
  if (moduleId === 'module-09') {
    return DANGEROUS_PATTERNS.filter((pattern) => {
      const patternStr = pattern.toString().toLowerCase()
      return !patternStr.includes('requests')
    })
  }
  return DANGEROUS_PATTERNS
}

export function hasBlockedPythonCode(code, moduleId) {
  const normalized = normalizeCodeForCheck(code)
  const patterns = getFilteredDangerousPatterns(moduleId)
  return patterns.some((pattern) => pattern.test(normalized))
}
