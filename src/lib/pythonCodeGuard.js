/**
 * Client-side guards before running student Python in Pyodide.
 */

const MAX_STUDENT_CODE_LENGTH = 50_000

const DANGEROUS_PATTERNS = [
  /import\s+os\b/i,
  /from\s+os\s+import/i,
  /import\s+subprocess\b/i,
  /from\s+subprocess\s+import/i,
  /import\s+commands\b/i,
  /from\s+commands\s+import/i,
  /__import__\s*\(/i,
  /eval\s*\(/i,
  /exec\s*\(/i,
  /compile\s*\(/i,
  /execfile\s*\(/i,
  /open\s*\(['"]\/etc/i,
  /open\s*\(['"]\/proc/i,
  /open\s*\(['"]\/sys/i,
  /open\s*\(['"]\/dev/i,
  /open\s*\(['"]\/root/i,
  /open\s*\(['"]\/home/i,
  /open\s*\(['"]\/var/i,
  /open\s*\(['"]\/usr/i,
  /open\s*\(['"]\.\./i,
  /file\s*\(/i,
  /import\s+requests\b/i,
  /from\s+requests\s+import/i,
  /import\s+urllib\b/i,
  /from\s+urllib\s+import/i,
  /import\s+urllib2\b/i,
  /from\s+urllib2\s+import/i,
  /import\s+http\.client\b/i,
  /from\s+http\.client\s+import/i,
  /import\s+socket\b/i,
  /from\s+socket\s+import/i,
  /import\s+ftplib\b/i,
  /from\s+ftplib\s+import/i,
  /import\s+telnetlib\b/i,
  /from\s+telnetlib\s+import/i,
  /import\s+httplib\b/i,
  /from\s+httplib\s+import/i,
  /os\.system\s*\(/i,
  /os\.popen\s*\(/i,
  /os\.spawn\s*\(/i,
  /os\.exec\s*\(/i,
  /subprocess\.call\s*\(/i,
  /subprocess\.Popen\s*\(/i,
  /subprocess\.run\s*\(/i,
  /subprocess\.check_call\s*\(/i,
  /subprocess\.check_output\s*\(/i,
  /commands\.getoutput\s*\(/i,
  /commands\.getstatusoutput\s*\(/i,
  /shutil\./i,
  /rm\s+-rf/i,
  /os\.rmdir\s*\(/i,
  /os\.remove\s*\(/i,
  /os\.unlink\s*\(/i,
  /pathlib\.Path\([^)]*\)\.unlink\s*\(/i,
  /shutil\.rmtree\s*\(/i,
  /os\.environ/i,
  /os\.getenv\s*\(/i,
  /os\.putenv\s*\(/i,
  /os\.setenv\s*\(/i,
  /os\.kill\s*\(/i,
  /os\.killpg\s*\(/i,
  /signal\./i,
  /importlib\./i,
  /\bimp\./i,
  /__builtin__\./i,
  /builtins\./i,
  /import\s+sqlite3\b/i,
  /from\s+sqlite3\s+import/i,
  /import\s+MySQLdb\b/i,
  /from\s+MySQLdb\s+import/i,
  /import\s+psycopg2\b/i,
  /from\s+psycopg2\s+import/i,
  /import\s+pymongo\b/i,
  /from\s+pymongo\s+import/i,
  /pickle\.loads\s*\(/i,
  /pickle\.load\s*\(/i,
  /marshal\.loads\s*\(/i,
  /marshal\.load\s*\(/i,
  /yaml\.load\s*\(/i,
  /__getattribute__/i,
  /__setattr__/i,
  /threading\.Thread\s*\(/i,
  /multiprocessing\.Process\s*\(/i,
  /multiprocessing\.Pool\s*\(/i,
  /platform\./i,
  /sys\.modules/i,
  /sys\.path/i,
  /\.\.\/\.\.\//,
  /\.\.\\\.\.\\/,
]

function normalizeCodeForCheck(code) {
  let normalized = String(code ?? '').replace(/#.*$/gm, '')
  normalized = normalized.replace(/""".*?"""/gs, '')
  normalized = normalized.replace(/'''.*?'''/gs, '')
  normalized = normalized.replace(/"[^"]*"/g, '')
  normalized = normalized.replace(/'[^']*'/g, '')
  return normalized
}

function getFilteredDangerousPatterns(moduleId) {
  if (moduleId === 'module-09') {
    return DANGEROUS_PATTERNS.filter((pattern) => {
      const patternStr = pattern.toString().toLowerCase()
      return (
        !patternStr.includes('requests') &&
        !patternStr.includes('bs4') &&
        !patternStr.includes('beautifulsoup')
      )
    })
  }

  if (moduleId === 'module-10') {
    return DANGEROUS_PATTERNS.filter((pattern) => {
      const patternStr = pattern.toString().toLowerCase()
      return !patternStr.includes('pil') && !patternStr.includes('image')
    })
  }

  return DANGEROUS_PATTERNS
}

export function hasBlockedPythonCode(code, moduleId) {
  if (!code || typeof code !== 'string') return true
  if (code.length > MAX_STUDENT_CODE_LENGTH) return true

  const normalized = normalizeCodeForCheck(code)
  const patterns = getFilteredDangerousPatterns(moduleId)
  return patterns.some((pattern) => pattern.test(normalized))
}
