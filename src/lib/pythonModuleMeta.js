/**
 * Taglines and richer module blurbs for the Python curriculum (EN).
 * Merged in getPythonCurriculum().
 */

export const PYTHON_MODULE_META_EN = {
  'module-00': {
    tagline: 'Getting started',
    description:
      'First steps in Python: variables, lists, dictionaries, strings, and nested data structures.',
  },
  'module-01': { tagline: 'Comparisons' },
  'module-02': { tagline: 'Loops and conditionals' },
  'module-03': { tagline: 'Functions' },
  'module-04': { tagline: 'OOP' },
  'module-05': { tagline: 'Errors' },
  'module-06': { tagline: 'Decorators' },
  'module-07': { tagline: 'Generators' },
  'module-08': { tagline: 'Stdlib modules' },
  'module-09': {
    tagline: 'Web scraping',
    description:
      'HTTP requests, BeautifulSoup, and collecting data from real sites — your first field project.',
  },
  'module-10': { tagline: 'Images' },
  'module-11': {
    tagline: 'PDF',
    description: 'Reading and creating PDFs — useful for reports and document automation.',
  },
  'module-12': {
    tagline: 'Email',
    description: 'Automate messages with smtplib — notifications and reports from a script.',
  },
  'module-13': {
    tagline: 'GUI (bonus)',
    description:
      'Final bonus: a desktop app with Tkinter — put it all together in a user-facing interface.',
  },
  'module-14': {
    tagline: 'Telegram bots',
    description:
      'From BotFather to your own bot: commands, keyboards, and an assistant project with python-telegram-bot.',
  },
  'module-15': {
    tagline: 'FastAPI',
    description:
      'REST APIs with FastAPI: Pydantic, CRUD, webhooks, and deploy — the course’s final backend module.',
  },
}

export function enrichPythonModules(modules) {
  return modules.map((m) => {
    const meta = PYTHON_MODULE_META_EN[m.moduleId] || {}
    return {
      ...m,
      tagline: meta.tagline,
      description: meta.description || m.description,
    }
  })
}
