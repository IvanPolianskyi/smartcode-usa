export function markdownToHtml(text) {
  if (!text) return ''

  let html = String(text)

  const escapeHtml = (str) => {
    if (!str) return ''
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  const applyInline = (line) => {
    let s = line
    s = s.replace(/`([^`\n]+)`/g, '<code>$1</code>')
    s = s.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')
    s = s.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>')
    s = s.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
    s = s.replace(/\s→\s/g, ' <span class="md-arrow" aria-hidden="true">→</span> ')
    s = s.replace(/\s->\s/g, ' <span class="md-arrow" aria-hidden="true">→</span> ')
    s = s.replace(/([^>\s])→([^<\s])/g, '$1 <span class="md-arrow" aria-hidden="true">→</span> $2')
    s = s.replace(/\s—\s/g, ' <span class="md-emdash">—</span> ')
    return s
  }

  const isPropertyRow = (line) => {
    const t = line.trim()
    if (/^\d+\.\s+/.test(t)) return false
    return t.includes('|') && !t.startsWith('|') && !t.endsWith('|')
  }

  const isInlinePropertyLine = (text) => {
    if (!text.includes(' | ')) return false
    const parts = text.split(/\s\|\s+/)
    if (parts.length < 2) return false
    const withColon = parts.filter((p) => p.includes(':')).length
    return withColon >= 2
  }

  const propertyRowToHtml = (line, inline = false) => {
    const parts = line.split(/\s\|\s+/)
    const chips = parts
      .map((part) => {
        const colon = part.trim().match(/^([^:]+):\s*(.+)$/)
        if (colon) {
          return (
            `<span class="md-prop">` +
            `<span class="md-prop-k">${applyInline(colon[1].trim())}</span>` +
            `<span class="md-prop-v">${applyInline(colon[2].trim())}</span>` +
            `</span>`
          )
        }
        return `<span class="md-prop md-prop-plain">${applyInline(part.trim())}</span>`
      })
      .join('')
    return `<div class="md-props${inline ? ' md-props-inline' : ''}">${chips}</div>`
  }

  html = html.replace(/\\`\\`\\`/g, '```')
  html = html.replace(/\\`/g, '`')

  const codeBlocks = []
  let codeBlockIndex = 0

  html = html.replace(/```(\w+)?\s*\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODEBLOCK_${codeBlockIndex}__`
    const language = (lang && lang.trim()) || 'text'
    const codeContent = code.trim()
    if (codeContent) {
      codeBlocks.push({
        placeholder,
        html:
          `<div class="md-code-wrap">` +
          `<button type="button" class="md-code-copy" data-copy-code aria-label="Copy code">Copy</button>` +
          `<pre class="code-block"><code class="language-${language}">${escapeHtml(codeContent)}</code></pre>` +
          `</div>`,
      })
      codeBlockIndex++
      return placeholder
    }
    return match
  })

  const isTableRow = (line) => {
    const t = line.trim()
    return t.startsWith('|') && t.endsWith('|') && (t.match(/\|/g) || []).length >= 2
  }

  const isTableSeparator = (line) => {
    const t = line.trim()
    return /^\|[\s\-:|]+\|$/.test(t)
  }

  const parseTableRow = (line) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim())

  const tableToHtml = (tableLines) => {
    const rows = tableLines.filter((line) => !isTableSeparator(line))
    if (rows.length === 0) return ''

    const parsed = rows.map(parseTableRow)
    const header = parsed[0]
    const body = parsed.slice(1)

    let out = '<div class="md-table-wrap"><table class="md-table"><thead><tr>'
    header.forEach((cell) => {
      out += `<th>${applyInline(cell)}</th>`
    })
    out += '</tr></thead>'
    if (body.length) {
      out += '<tbody>'
      body.forEach((row) => {
        out += '<tr>'
        row.forEach((cell) => {
          out += `<td>${applyInline(cell)}</td>`
        })
        out += '</tr>'
      })
      out += '</tbody>'
    }
    out += '</table></div>'
    return out
  }

  const isChecklistLine = (line) => {
    const t = line.trim()
    return /^(\[[ xX]\]|-\s*\[[ xX]\])\s+/.test(t)
  }

  const parseChecklistLine = (line) => {
    const t = line.trim()
    const m = t.match(/^(\[[ xX]\]|-\s*\[[ xX]\])\s+(.+)$/)
    if (!m) return { checked: false, text: t }
    const marker = m[1]
    const checked = /\[x\]/i.test(marker)
    return { checked, text: m[2] }
  }

  const lines = html.split('\n')
  let inOrderedList = false
  let inUnorderedList = false
  let inChecklist = false
  let inStepCard = false
  const result = []

  const closeStepCard = () => {
    if (inStepCard) {
      result.push('</div>')
      inStepCard = false
    }
  }

  const closeLists = () => {
    if (inOrderedList) {
      result.push('</ol>')
      inOrderedList = false
    }
    if (inUnorderedList) {
      result.push('</ul>')
      inUnorderedList = false
    }
    if (inChecklist) {
      result.push('</ul>')
      inChecklist = false
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    if (/__CODEBLOCK_\d+__/.test(trimmedLine)) {
      closeLists()
      result.push(trimmedLine)
      continue
    }

    if (isTableRow(trimmedLine)) {
      closeLists()
      const tableLines = []
      while (i < lines.length && isTableRow(lines[i].trim())) {
        tableLines.push(lines[i].trim())
        i++
      }
      i--
      result.push(tableToHtml(tableLines))
      continue
    }

    const headingMatch = trimmedLine.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      closeLists()
      const level = headingMatch[1].length
      const title = applyInline(headingMatch[2])
      if (level >= 3) {
        closeStepCard()
        result.push(`<div class="md-step-card"><h4 class="md-step-title">${title}</h4>`)
        inStepCard = true
      } else {
        const tag = level === 1 ? 'h3' : 'h4'
        result.push(`<${tag} class="md-heading">${title}</${tag}>`)
      }
      continue
    }

    if (/^\*\*Goal:\*\*/i.test(trimmedLine)) {
      closeLists()
      closeStepCard()
      result.push(`<div class="md-goal">${applyInline(trimmedLine)}</div>`)
      continue
    }

    if (isPropertyRow(trimmedLine)) {
      closeLists()
      result.push(propertyRowToHtml(trimmedLine))
      continue
    }

    if (isChecklistLine(trimmedLine)) {
      if (!inChecklist) {
        closeLists()
        result.push('<ul class="lesson-checklist">')
        inChecklist = true
      }
      const { checked, text } = parseChecklistLine(trimmedLine)
      result.push(
        `<li class="lesson-checklist-item${checked ? ' is-checked' : ''}">` +
          `<span class="lesson-checklist-box" aria-hidden="true"></span>` +
          `<span class="lesson-checklist-text">${applyInline(text)}</span></li>`
      )
      continue
    }

    const orderedMatch = trimmedLine.match(/^\d+\.\s+(.+)$/)
    if (orderedMatch) {
      if (!inOrderedList) {
        closeLists()
        result.push('<ol class="md-ol md-steps">')
        inOrderedList = true
      }
      const itemContent = orderedMatch[1]
      const itemHtml = isInlinePropertyLine(itemContent)
        ? propertyRowToHtml(itemContent, true)
        : applyInline(itemContent)
      result.push(`<li class="md-step-li">${itemHtml}</li>`)
      continue
    }

    const unorderedMatch = trimmedLine.match(/^[-*+]\s+(.+)$/)
    if (unorderedMatch) {
      if (!inUnorderedList) {
        closeLists()
        result.push('<ul class="md-ul">')
        inUnorderedList = true
      }
      result.push(`<li>${applyInline(unorderedMatch[1])}</li>`)
      continue
    }

    closeLists()

    if (trimmedLine.startsWith('> ')) {
      result.push(`<blockquote class="md-quote">${applyInline(trimmedLine.slice(2))}</blockquote>`)
      continue
    }

    if (trimmedLine) {
      result.push(`<p>${applyInline(trimmedLine)}</p>`)
    } else {
      result.push('<br />')
    }
  }

  closeLists()
  closeStepCard()
  html = result.join('')

  codeBlocks.forEach(({ placeholder, html: blockHtml }) => {
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    html = html.replace(new RegExp(`<p>\\s*${escapedPlaceholder}\\s*</p>`, 'g'), blockHtml)
    html = html.replace(new RegExp(`\\s*${escapedPlaceholder}\\s*`, 'g'), blockHtml)
    html = html.replace(new RegExp(escapedPlaceholder, 'g'), blockHtml)
  })

  html = html.replace(/<p>\s*(<pre class="code-block">[\s\S]*?<\/pre>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p>\s*(<div class="md-table-wrap">[\s\S]*?<\/div>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p>\s*(<ul class="lesson-checklist">[\s\S]*?<\/ul>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p>\s*(<div class="md-step-card">[\s\S]*?<\/div>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p>\s*(<div class="md-props">[\s\S]*?<\/div>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p>\s*(<div class="md-goal">[\s\S]*?<\/div>)\s*<\/p>/gi, '$1')
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/(<br \/>){2,}/g, '<br />')
  html = html.replace(/__CODEBLOCK_\d+__/g, '')

  return html
}
