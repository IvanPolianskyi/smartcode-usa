/**
 * Taglines and richer module blurbs for Python curriculum (UK).
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

export function enrichPythonModules(modules) {
  return modules.map((m) => {
    const meta = PYTHON_MODULE_META_UK[m.moduleId] || {}
    return {
      ...m,
      tagline: meta.tagline,
      description: meta.description || m.description,
    }
  })
}
