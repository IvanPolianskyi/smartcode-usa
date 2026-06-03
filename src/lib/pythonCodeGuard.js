/**
 * Client-side guards before running student Python (pre-check in lesson UI).
 */

import { validateStudentPythonCode } from '@/lib/pythonExecutionSecurity'

export { getFilteredDangerousPatterns, normalizeCodeForCheck } from '@/lib/pythonExecutionSecurity'

export function hasBlockedPythonCode(code, moduleId) {
  return !validateStudentPythonCode(code, moduleId).ok
}
