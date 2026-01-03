/**
 * Full Curriculum for "Web Development: From Zero to Confident Junior"
 * 
 * 7 Modules, 4-6 lessons each
 * Total: 44 lessons
 */

import { QUIZ_QUESTION_TYPES } from './courseData'

export const webDevCurriculum = {
  courseId: "web-development",
  title: "Веб-розробка: Від основ до просунутого рівня",
  
  modules: [
    {
      moduleId: "module-1",
      order: 1,
      title: "Основи HTML та CSS",
      description: "Створення структури веб-сторінок та їх стилізація",
      duration: { weeks: 4, lessons: 6 },
      learningOutcomes: [
        "Розуміння структури HTML документів",
        "Створення семантичної розмітки",
        "Стилізація за допомогою CSS",
        "Адаптивний дизайн"
      ],
      lessons: [
        {
          lessonId: "web-lesson-1-1",
          order: 1,
          title: "Вступ до веб-розробки та HTML",
          learningObjectives: [
            "Зрозуміти що таке веб-розробка",
            "Створити першу HTML сторінку",
            "Вивчити основні HTML теги",
            "Розуміти структуру HTML документу"
          ],
          estimatedTime: 60,
          prerequisites: []
        },
        {
          lessonId: "web-lesson-1-2",
          order: 2,
          title: "Семантична розмітка HTML5",
          learningObjectives: [
            "Використовувати семантичні теги",
            "Створювати структуру сторінки",
            "Розуміти різницю між div та семантичними тегами",
            "Створювати навігацію та футер"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-1-1"]
        },
        {
          lessonId: "web-lesson-1-3",
          order: 3,
          title: "Основи CSS: Селектори та властивості",
          learningObjectives: [
            "Використовувати CSS селектори",
            "Застосовувати стилі до елементів",
            "Розуміти каскадність та специфічність",
            "Працювати з кольорами та шрифтами"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-1-2"]
        },
        {
          lessonId: "web-lesson-1-4",
          order: 4,
          title: "CSS Flexbox та Grid",
          learningObjectives: [
            "Використовувати Flexbox для розміщення",
            "Створювати сітки з CSS Grid",
            "Адаптувати макет під різні екрани",
            "Комбінувати Flexbox та Grid"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-3"]
        },
        {
          lessonId: "web-lesson-1-5",
          order: 5,
          title: "Адаптивний дизайн та медіа-запити",
          learningObjectives: [
            "Створювати адаптивні макети",
            "Використовувати медіа-запити",
            "Розуміти mobile-first підхід",
            "Тестувати на різних пристроях"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-4"]
        },
        {
          lessonId: "web-lesson-1-6",
          order: 6,
          title: "Модуль 1: Практичний проект - Персональна сторінка",
          learningObjectives: [
            "Створити повноцінну веб-сторінку",
            "Застосувати всі навички з модуля",
            "Зробити адаптивний дизайн",
            "Опублікувати проект"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-1-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-2",
      order: 2,
      title: "Поглиблення в CSS та анімації",
      description: "Просунуті техніки CSS, анімації та ефекти",
      duration: { weeks: 3, lessons: 5 },
      learningOutcomes: [
        "Створення анімацій та переходів",
        "Робота з CSS змінними",
        "Використання препроцесорів",
        "Оптимізація CSS"
      ],
      lessons: [
        {
          lessonId: "web-lesson-2-1",
          order: 1,
          title: "CSS Анімації та переходи",
          learningObjectives: [
            "Створювати плавні переходи",
            "Використовувати keyframes",
            "Анімувати елементи",
            "Оптимізувати продуктивність анімацій"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-1-6"]
        },
        {
          lessonId: "web-lesson-2-2",
          order: 2,
          title: "CSS Змінні та кастомні властивості",
          learningObjectives: [
            "Використовувати CSS змінні",
            "Створювати теми",
            "Динамічно змінювати стилі",
            "Організовувати CSS код"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-1"]
        },
        {
          lessonId: "web-lesson-2-3",
          order: 3,
          title: "Псевдокласи та псевдоелементи",
          learningObjectives: [
            "Використовувати псевдокласи",
            "Створювати псевдоелементи",
            "Застосовувати складні селектори",
            "Створювати інтерактивні ефекти"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-2"]
        },
        {
          lessonId: "web-lesson-2-4",
          order: 4,
          title: "CSS Препроцесори (SASS/SCSS)",
          learningObjectives: [
            "Розуміти переваги препроцесорів",
            "Використовувати змінні та міксини",
            "Організовувати код з partials",
            "Компілювати SCSS в CSS"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-2-3"]
        },
        {
          lessonId: "web-lesson-2-5",
          order: 5,
          title: "Модуль 2: Практичний проект - Анімований портфоліо",
          learningObjectives: [
            "Створити інтерактивне портфоліо",
            "Застосувати анімації",
            "Використати CSS змінні",
            "Оптимізувати продуктивність"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-2-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-3",
      order: 3,
      title: "Основи JavaScript",
      description: "Програмування на JavaScript для веб-розробки",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Розуміння основ JavaScript",
        "Робота з DOM",
        "Обробка подій",
        "Асинхронне програмування"
      ],
      lessons: [
        {
          lessonId: "web-lesson-3-1",
          order: 1,
          title: "Вступ до JavaScript",
          learningObjectives: [
            "Зрозуміти роль JavaScript у веб-розробці",
            "Вивчити основні типи даних",
            "Працювати зі змінними",
            "Використовувати консоль розробника"
          ],
          estimatedTime: 75,
          prerequisites: ["web-lesson-2-5"]
        },
        {
          lessonId: "web-lesson-3-2",
          order: 2,
          title: "Функції та об'єкти в JavaScript",
          learningObjectives: [
            "Створювати та викликати функції",
            "Працювати з об'єктами",
            "Використовувати методи об'єктів",
            "Розуміти this контекст"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-1"]
        },
        {
          lessonId: "web-lesson-3-3",
          order: 3,
          title: "Робота з DOM",
          learningObjectives: [
            "Отримувати доступ до елементів",
            "Модифікувати DOM",
            "Створювати та видаляти елементи",
            "Маніпулювати атрибутами"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-2"]
        },
        {
          lessonId: "web-lesson-3-4",
          order: 4,
          title: "Обробка подій (Events)",
          learningObjectives: [
            "Додавати обробники подій",
            "Розуміти event bubbling",
            "Працювати з формами",
            "Валідувати дані"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-3"]
        },
        {
          lessonId: "web-lesson-3-5",
          order: 5,
          title: "Асинхронний JavaScript: Promises та async/await",
          learningObjectives: [
            "Розуміти асинхронність",
            "Використовувати Promises",
            "Працювати з async/await",
            "Обробляти помилки"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-3-4"]
        },
        {
          lessonId: "web-lesson-3-6",
          order: 6,
          title: "Модуль 3: Практичний проект - Інтерактивний Todo додаток",
          learningObjectives: [
            "Створити повноцінний додаток",
            "Застосувати всі навички JavaScript",
            "Зберігати дані в localStorage",
            "Створити інтерактивний UI"
          ],
          estimatedTime: 150,
          prerequisites: ["web-lesson-3-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-4",
      order: 4,
      title: "React: Сучасний JavaScript фреймворк",
      description: "Створення інтерактивних UI з React",
      duration: { weeks: 6, lessons: 6 },
      learningOutcomes: [
        "Розуміння концепцій React",
        "Створення компонентів",
        "Робота зі станом",
        "Роутинг та навігація"
      ],
      lessons: [
        {
          lessonId: "web-lesson-4-1",
          order: 1,
          title: "Вступ до React та компоненти",
          learningObjectives: [
            "Зрозуміти що таке React",
            "Створити перший компонент",
            "Використовувати JSX",
            "Налаштувати React проект"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-3-6"]
        },
        {
          lessonId: "web-lesson-4-2",
          order: 2,
          title: "Props та State",
          learningObjectives: [
            "Передавати дані через props",
            "Використовувати useState",
            "Керувати станом компонентів",
            "Розуміти re-rendering"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-4-1"]
        },
        {
          lessonId: "web-lesson-4-3",
          order: 3,
          title: "Життєвий цикл та хуки",
          learningObjectives: [
            "Використовувати useEffect",
            "Розуміти життєвий цикл",
            "Застосовувати інші хуки",
            "Оптимізувати продуктивність"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-4-2"]
        },
        {
          lessonId: "web-lesson-4-4",
          order: 4,
          title: "Роутинг з React Router",
          learningObjectives: [
            "Налаштувати React Router",
            "Створювати маршрути",
            "Використовувати навігацію",
            "Захищати маршрути"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-4-3"]
        },
        {
          lessonId: "web-lesson-4-5",
          order: 5,
          title: "Робота з API та Context API",
          learningObjectives: [
            "Виконувати HTTP запити",
            "Використовувати Context API",
            "Керувати глобальним станом",
            "Обробляти завантаження та помилки"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-4-4"]
        },
        {
          lessonId: "web-lesson-4-6",
          order: 6,
          title: "Модуль 4: Практичний проект - React додаток",
          learningObjectives: [
            "Створити повноцінний React додаток",
            "Використати роутинг",
            "Інтегрувати з API",
            "Деплоїти на Vercel/Netlify"
          ],
          estimatedTime: 180,
          prerequisites: ["web-lesson-4-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-5",
      order: 5,
      title: "Backend розробка з Node.js",
      description: "Створення серверної частини веб-додатків",
      duration: { weeks: 5, lessons: 6 },
      learningOutcomes: [
        "Розуміння backend розробки",
        "Створення REST API",
        "Робота з базами даних",
        "Аутентифікація та авторизація"
      ],
      lessons: [
        {
          lessonId: "web-lesson-5-1",
          order: 1,
          title: "Вступ до Node.js та Express",
          learningObjectives: [
            "Зрозуміти що таке Node.js",
            "Створити перший сервер",
            "Використовувати Express",
            "Налаштувати маршрути"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-4-6"]
        },
        {
          lessonId: "web-lesson-5-2",
          order: 2,
          title: "REST API: GET, POST, PUT, DELETE",
          learningObjectives: [
            "Створити REST API",
            "Обробляти HTTP методи",
            "Валідувати дані",
            "Обробляти помилки"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-5-1"]
        },
        {
          lessonId: "web-lesson-5-3",
          order: 3,
          title: "Робота з базами даних (MongoDB)",
          learningObjectives: [
            "Підключити MongoDB",
            "Створювати схеми",
            "Виконувати CRUD операції",
            "Використовувати Mongoose"
          ],
          estimatedTime: 135,
          prerequisites: ["web-lesson-5-2"]
        },
        {
          lessonId: "web-lesson-5-4",
          order: 4,
          title: "Аутентифікація та JWT",
          learningObjectives: [
            "Реалізувати реєстрацію",
            "Створити систему входу",
            "Використовувати JWT токени",
            "Захищати маршрути"
          ],
          estimatedTime: 135,
          prerequisites: ["web-lesson-5-3"]
        },
        {
          lessonId: "web-lesson-5-5",
          order: 5,
          title: "Файли та завантаження",
          learningObjectives: [
            "Завантажувати файли",
            "Обробляти зображення",
            "Зберігати файли",
            "Оптимізувати завантаження"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-5-4"]
        },
        {
          lessonId: "web-lesson-5-6",
          order: 6,
          title: "Модуль 5: Практичний проект - Backend API",
          learningObjectives: [
            "Створити повноцінний API",
            "Реалізувати аутентифікацію",
            "Підключити базу даних",
            "Написати документацію"
          ],
          estimatedTime: 180,
          prerequisites: ["web-lesson-5-5"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-6",
      order: 6,
      title: "Інтеграція Frontend та Backend",
      description: "Об'єднання React додатку з backend API",
      duration: { weeks: 4, lessons: 5 },
      learningOutcomes: [
        "Інтегрувати React з API",
        "Керувати станом додатку",
        "Обробляти помилки",
        "Оптимізувати продуктивність"
      ],
      lessons: [
        {
          lessonId: "web-lesson-6-1",
          order: 1,
          title: "Підключення React до API",
          learningObjectives: [
            "Виконувати HTTP запити з React",
            "Використовувати axios/fetch",
            "Обробляти відповіді",
            "Керувати станом завантаження"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-5-6"]
        },
        {
          lessonId: "web-lesson-6-2",
          order: 2,
          title: "Аутентифікація на Frontend",
          learningObjectives: [
            "Зберігати токени",
            "Створити контекст аутентифікації",
            "Захищати маршрути",
            "Реалізувати вихід"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-6-1"]
        },
        {
          lessonId: "web-lesson-6-3",
          order: 3,
          title: "Обробка помилок та валідація",
          learningObjectives: [
            "Обробляти помилки API",
            "Валідувати форми",
            "Показувати повідомлення",
            "Обробляти edge cases"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-6-2"]
        },
        {
          lessonId: "web-lesson-6-4",
          order: 4,
          title: "Оптимізація та продуктивність",
          learningObjectives: [
            "Оптимізувати запити",
            "Використовувати кешування",
            "Ліниве завантаження",
            "Мінімізувати re-renders"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-6-3"]
        },
        {
          lessonId: "web-lesson-6-5",
          order: 5,
          title: "Модуль 6: Практичний проект - Повноцінний веб-додаток",
          learningObjectives: [
            "Об'єднати frontend та backend",
            "Реалізувати всі функції",
            "Протестувати додаток",
            "Оптимізувати продуктивність"
          ],
          estimatedTime: 240,
          prerequisites: ["web-lesson-6-4"],
          isProject: true
        }
      ]
    },
    {
      moduleId: "module-7",
      order: 7,
      title: "Деплой та DevOps основи",
      description: "Публікація проектів та DevOps практики",
      duration: { weeks: 3, lessons: 4 },
      learningOutcomes: [
        "Деплоїти frontend та backend",
        "Використовувати CI/CD",
        "Моніторити додатки",
        "Оптимізувати для продакшену"
      ],
      lessons: [
        {
          lessonId: "web-lesson-7-1",
          order: 1,
          title: "Деплой Frontend (Vercel/Netlify)",
          learningObjectives: [
            "Деплоїти React додаток",
            "Налаштувати змінні середовища",
            "Оптимізувати білд",
            "Налаштувати домен"
          ],
          estimatedTime: 90,
          prerequisites: ["web-lesson-6-5"]
        },
        {
          lessonId: "web-lesson-7-2",
          order: 2,
          title: "Деплой Backend (Heroku/Railway)",
          learningObjectives: [
            "Деплоїти Node.js додаток",
            "Налаштувати базу даних",
            "Конфігурувати змінні середовища",
            "Моніторити сервер"
          ],
          estimatedTime: 105,
          prerequisites: ["web-lesson-7-1"]
        },
        {
          lessonId: "web-lesson-7-3",
          order: 3,
          title: "Git, GitHub та CI/CD",
          learningObjectives: [
            "Використовувати Git",
            "Працювати з GitHub",
            "Налаштувати CI/CD",
            "Автоматизувати деплой"
          ],
          estimatedTime: 120,
          prerequisites: ["web-lesson-7-2"]
        },
        {
          lessonId: "web-lesson-7-4",
          order: 4,
          title: "Фінальний проект - Повноцінний веб-додаток",
          learningObjectives: [
            "Створити фінальний проект",
            "Застосувати всі навички",
            "Деплоїти проект",
            "Написати документацію"
          ],
          estimatedTime: 480,
          prerequisites: ["web-lesson-7-3"],
          isProject: true,
          isFinalProject: true
        }
      ]
    }
  ]
}












