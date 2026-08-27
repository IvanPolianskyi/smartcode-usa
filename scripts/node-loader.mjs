import { isBuiltin } from 'node:module'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' && !isBuiltin(specifier)) {
      const parentURL = context.parentURL
      if (parentURL && (specifier.startsWith('./') || specifier.startsWith('../'))) {
        const resolved = new URL(specifier, parentURL)
        try {
          const filePath = fileURLToPath(resolved.href + '.js')
          await fs.access(filePath)
          return nextResolve(specifier + '.js', context)
        } catch {}
      }
    }
    throw err
  }
}
