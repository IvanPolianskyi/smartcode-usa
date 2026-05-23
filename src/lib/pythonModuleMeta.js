/**
 * Taglines and richer module blurbs for Python curriculum (UK + EN).
 * Merged in getPythonCurriculum().
 */

export const PYTHON_MODULE_META_UK = {
  'module-00': {
    tagline: 'Старт',
    description:
      'Перші кроки в Python: змінні, списки, словники, рядки та вкладені структури даних.',
  },
  'module-01': { tagline: 'Порівняння' },
  'module-02': { tagline: 'Цикли та умови' },
  'module-03': { tagline: 'Функції' },
  'module-04': { tagline: 'ООП' },
  'module-05': { tagline: 'Помилки' },
  'module-06': { tagline: 'Декоратори' },
  'module-07': { tagline: 'Генератори' },
  'module-08': { tagline: 'Модулі stdlib' },
  'module-09': {
    tagline: 'Веб-скрапінг',
    description:
      'HTTP-запити, BeautifulSoup і збір даних з реальних сайтів - перший «польовий» проєкт.',
  },
  'module-10': { tagline: 'Зображення' },
  'module-11': {
    tagline: 'PDF',
    description: 'Читання та створення PDF - корисно для звітів і автоматизації документів.',
  },
  'module-12': {
    tagline: 'Email',
    description: 'Автоматизація листів через smtplib - сповіщення та звіти скриптом.',
  },
  'module-13': {
    tagline: 'GUI (бонус)',
    description:
      'Фінальний бонус: віконний додаток на Tkinter - збираєш усе в інтерфейс для користувача.',
  },
  'module-14': {
    tagline: 'Telegram-боти',
    description:
      'Від BotFather до власного бота: команди, клавіатури та проєкт-асистент на python-telegram-bot.',
  },
  'module-15': {
    tagline: 'FastAPI',
    description:
      'REST API на FastAPI: Pydantic, CRUD і webhook, щоб поєднати бота з бекендом.',
  },
}

export const PYTHON_MODULE_META_EN = {
  'module-00': {
    tagline: 'Getting started',
    description:
      'First steps in Python: variables, lists, dicts, strings, and nested data structures.',
  },
  'module-01': { tagline: 'Comparisons' },
  'module-02': { tagline: 'Loops & conditionals' },
  'module-03': { tagline: 'Functions' },
  'module-04': { tagline: 'OOP' },
  'module-05': { tagline: 'Errors' },
  'module-06': { tagline: 'Decorators' },
  'module-07': { tagline: 'Generators' },
  'module-08': { tagline: 'Stdlib modules' },
  'module-09': {
    tagline: 'Web scraping',
    description:
      'HTTP requests, BeautifulSoup, and pulling data from real websites - your first field project.',
  },
  'module-10': { tagline: 'Images' },
  'module-11': {
    tagline: 'PDF',
    description: 'Read and create PDFs - handy for reports and document automation.',
  },
  'module-12': {
    tagline: 'Email',
    description: 'Automate emails with smtplib - notifications and scripted reports.',
  },
  'module-13': {
    tagline: 'GUI (bonus)',
    description:
      'Capstone bonus: a Tkinter desktop app that ties your skills into a user interface.',
  },
  'module-14': {
    tagline: 'Telegram bots',
    description:
      'From BotFather to your own bot: commands, keyboards, and an assistant project with python-telegram-bot.',
  },
  'module-15': {
    tagline: 'FastAPI',
    description:
      'REST APIs with FastAPI: Pydantic, CRUD, and a webhook to connect your bot to a backend.',
  },
}

export function enrichPythonModules(modules, locale = 'uk') {
  const metaMap = locale === 'en' ? PYTHON_MODULE_META_EN : PYTHON_MODULE_META_UK

  return modules.map((m) => {
    const meta = metaMap[m.moduleId] || {}
    return {
      ...m,
      tagline: meta.tagline,
      description: meta.description || m.description,
    }
  })
}
