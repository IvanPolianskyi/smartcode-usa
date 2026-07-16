'use client'

import { useEffect } from 'react'

/**
 * Enables copy buttons rendered by markdownToHtml ([data-copy-code]).
 */
export function useCopyCodeBlocks(containerRef, { copyLabel = 'Copy', copiedLabel = 'Copied', deps = [] } = {}) {
  useEffect(() => {
    const root = containerRef?.current
    if (!root) return undefined

    const syncLabels = () => {
      root.querySelectorAll('[data-copy-code]').forEach((btn) => {
        if (btn.dataset.state === 'copied') return
        btn.textContent = copyLabel
        btn.setAttribute('aria-label', copyLabel)
      })
    }
    syncLabels()

    const onClick = async (event) => {
      const btn = event.target.closest('[data-copy-code]')
      if (!btn || !root.contains(btn)) return
      event.preventDefault()
      const pre = btn.parentElement?.querySelector('pre')
      const text = pre?.textContent || ''
      if (!text) return
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      btn.dataset.state = 'copied'
      btn.textContent = copiedLabel
      window.setTimeout(() => {
        btn.dataset.state = ''
        btn.textContent = copyLabel
        btn.setAttribute('aria-label', copyLabel)
      }, 1400)
    }

    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [containerRef, copyLabel, copiedLabel, ...deps])
}
