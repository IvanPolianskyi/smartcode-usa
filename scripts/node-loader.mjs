import { isBuiltin } from 'node:module'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Mirrors jsconfig.json's "@/*": ["./src/*"] so `@/lib/foo` resolves under plain
// `node --test`, not just inside Next.js's own bundler.
const SRC_URL = new URL('../src/', import.meta.url)

function resolveAlias(specifier) {
  if (!specifier.startsWith('@/')) return null
  return new URL(specifier.slice(2), SRC_URL)
}

export async function resolve(specifier, context, nextResolve) {
  const aliased = resolveAlias(specifier)
  const target = aliased ? aliased.href : specifier

  try {
    return await nextResolve(target, context)
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND' && !isBuiltin(specifier)) {
      const parentURL = context.parentURL
      const isRelative = specifier.startsWith('./') || specifier.startsWith('../')
      if (aliased || (parentURL && isRelative)) {
        const resolved = aliased || new URL(specifier, parentURL)
        try {
          const filePath = fileURLToPath(resolved.href + '.js')
          await fs.access(filePath)
          return nextResolve(resolved.href + '.js', context)
        } catch {}
      }
    }
    throw err
  }
}
