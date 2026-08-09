/**
 * Auto-structured curriculum — 92 lessons / 12 modules
 * Grid: M1×8 + M2×4 + M3×8 + M4×8 + M5×10 + M6×10 + M7×8 + M8×8 + M9×8 + M10×8 + M11×6 + M12×6
 */

export const scratchCurriculum = {
  "courseId": "scratch",
  "title": "Scratch: 92 уроки — від першого спрайта до гри",
  "modules": [
    {
      "moduleId": "module-01",
      "order": 0,
      "title": "01 - Старт у Scratch",
      "description": "Інтерфейс, спрайт, сцена, збереження",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-1-1",
          "order": 1,
          "title": "1.1 - Знайомство зі Scratch Online",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-2",
          "order": 2,
          "title": "1.2 - Інтерфейс: сцена, спрайти, блоки",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-3",
          "order": 3,
          "title": "1.3 - Кіт і перший скрипт",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-4",
          "order": 4,
          "title": "1.4 - Координати x/y на сцені",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-5",
          "order": 5,
          "title": "1.5 - Розмір і напрямок спрайта",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-6",
          "order": 6,
          "title": "1.6 - Збереження й шерінг проєкту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-7",
          "order": 7,
          "title": "1.7 - Бібліотека спрайтів і звуків",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-1-8",
          "order": 8,
          "title": "1.8 - Checkpoint: мій перший рух",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-02",
      "order": 1,
      "title": "02 - Сцени й костюми",
      "description": "Бекдропи та перемикання",
      "duration": {
        "weeks": 2,
        "lessons": 4
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-2-1",
          "order": 9,
          "title": "2.1 - Бекдропи сцени",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-1-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-2-2",
          "order": 10,
          "title": "2.2 - Зміна костюмів спрайта",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-2-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-2-3",
          "order": 11,
          "title": "2.3 - Перемикання сцен за подією",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-2-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-2-4",
          "order": 12,
          "title": "2.4 - Checkpoint: сцена з двома локаціями",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-2-3"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-03",
      "order": 2,
      "title": "03 - Рух і анімація",
      "description": "Кроки, повороти, gliding",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-3-1",
          "order": 13,
          "title": "3.1 - Кроки вперед і назад",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-2-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-2",
          "order": 14,
          "title": "3.2 - Повороти та обертання",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-3",
          "order": 15,
          "title": "3.3 - Плавання glide",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-4",
          "order": 16,
          "title": "3.4 - Відскок від краю",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-5",
          "order": 17,
          "title": "3.5 - Плавна анімація костюмів",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-6",
          "order": 18,
          "title": "3.6 - Сліди pen і малювання",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-7",
          "order": 19,
          "title": "3.7 - Шари: передній/задній план",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-3-8",
          "order": 20,
          "title": "3.8 - Checkpoint: анімований персонаж",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-04",
      "order": 3,
      "title": "04 - Події та керування",
      "description": "Прапорець, клавіші, кліки",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-4-1",
          "order": 21,
          "title": "4.1 - Коли натиснуто зелений прапорець",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-3-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-2",
          "order": 22,
          "title": "4.2 - Керування стрілками",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-3",
          "order": 23,
          "title": "4.3 - Клік по спрайту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-4",
          "order": 24,
          "title": "4.4 - Повідомлення broadcast",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-5",
          "order": 25,
          "title": "4.5 - Очікування повідомлення",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-6",
          "order": 26,
          "title": "4.6 - Кілька спрайтів — одна подія",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-7",
          "order": 27,
          "title": "4.7 - Старт з меню сцени",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-4-8",
          "order": 28,
          "title": "4.8 - Checkpoint: керований герой",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-05",
      "order": 4,
      "title": "05 - Змінні й рахунок",
      "description": "Score, життя, таймер",
      "duration": {
        "weeks": 5,
        "lessons": 10
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-5-1",
          "order": 29,
          "title": "5.1 - Що таке змінна",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-4-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-2",
          "order": 30,
          "title": "5.2 - Створення змінної score",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-3",
          "order": 31,
          "title": "5.3 - Збільшення й зменшення рахунку",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-4",
          "order": 32,
          "title": "5.4 - Життя гравця",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-5",
          "order": 33,
          "title": "5.5 - Таймер на сцені",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-6",
          "order": 34,
          "title": "5.6 - Показ змінних на сцені",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-7",
          "order": 35,
          "title": "5.7 - Локальні змінні спрайта",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-8",
          "order": 36,
          "title": "5.8 - Скидання рахунку на старті",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-7"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-9",
          "order": 37,
          "title": "5.9 - Порівняння рекордів",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-5-10",
          "order": 38,
          "title": "5.10 - Checkpoint: гра з рахунком",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-9"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-06",
      "order": 5,
      "title": "06 - Умови та логіка",
      "description": "If, сенсори, зіткнення",
      "duration": {
        "weeks": 5,
        "lessons": 10
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-6-1",
          "order": 39,
          "title": "6.1 - Блок if / else",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-5-10"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-2",
          "order": 40,
          "title": "6.2 - Порівняння чисел",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-3",
          "order": 41,
          "title": "6.3 - Дотик до кольору",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-4",
          "order": 42,
          "title": "6.4 - Дотик до спрайта",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-5",
          "order": 43,
          "title": "6.5 - Сенсор відстані",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-6",
          "order": 44,
          "title": "6.6 - Логічне І / АБО",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-7",
          "order": 45,
          "title": "6.7 - Складні умови",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-8",
          "order": 46,
          "title": "6.8 - Перевірка краю сцени",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-7"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-9",
          "order": 47,
          "title": "6.9 - Win і lose умови",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-6-10",
          "order": 48,
          "title": "6.10 - Checkpoint: логічна міні-гра",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-9"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-07",
      "order": 6,
      "title": "07 - Цикли",
      "description": "Repeat, forever, wait",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-7-1",
          "order": 49,
          "title": "7.1 - Повторювати N разів",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-6-10"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-2",
          "order": 50,
          "title": "7.2 - Цикл forever",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-3",
          "order": 51,
          "title": "7.3 - Wait і паузи",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-4",
          "order": 52,
          "title": "7.4 - Цикл у циклі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-5",
          "order": 53,
          "title": "7.5 - Анімація в циклі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-6",
          "order": 54,
          "title": "7.6 - Рух ворога по шляху",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-7",
          "order": 55,
          "title": "7.7 - Спавн предметів у циклі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-7-8",
          "order": 56,
          "title": "7.8 - Checkpoint: нескінченний рівень",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-08",
      "order": 7,
      "title": "08 - Звук, текст, діалоги",
      "description": "Аудіо та мова",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-8-1",
          "order": 57,
          "title": "8.1 - Звуки зі бібліотеки",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-7-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-2",
          "order": 58,
          "title": "8.2 - Запис власного звуку",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-3",
          "order": 59,
          "title": "8.3 - Музика фону",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-4",
          "order": 60,
          "title": "8.4 - Say / think діалоги",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-5",
          "order": 61,
          "title": "8.5 - Ask і відповідь гравця",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-6",
          "order": 62,
          "title": "8.6 - Текст на сцені",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-7",
          "order": 63,
          "title": "8.7 - Ефекти звуку",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-8-8",
          "order": 64,
          "title": "8.8 - Checkpoint: історія з діалогами",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-09",
      "order": 8,
      "title": "09 - Клони й списки",
      "description": "Клонування та дані",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-9-1",
          "order": 65,
          "title": "9.1 - Створення клона",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-8-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-2",
          "order": 66,
          "title": "9.2 - Коли я клон починаю",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-3",
          "order": 67,
          "title": "9.3 - Видалення клона",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-4",
          "order": 68,
          "title": "9.4 - Список: додати елемент",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-5",
          "order": 69,
          "title": "9.5 - Список як інвентар",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-6",
          "order": 70,
          "title": "9.6 - Випадковий елемент зі списку",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-7",
          "order": 71,
          "title": "9.7 - Клони ворогів",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-9-8",
          "order": 72,
          "title": "9.8 - Checkpoint: шутер з клонами",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-10",
      "order": 9,
      "title": "10 - Ігрові механіки",
      "description": "Рівні, меню, win/lose",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-10-1",
          "order": 73,
          "title": "10.1 - Екран меню",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-9-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-2",
          "order": 74,
          "title": "10.2 - Кнопка Start",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-3",
          "order": 75,
          "title": "10.3 - Перехід між рівнями",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-4",
          "order": 76,
          "title": "10.4 - Пауза гри",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-5",
          "order": 77,
          "title": "10.5 - Екран перемоги",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-6",
          "order": 78,
          "title": "10.6 - Екран поразки",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-7",
          "order": 79,
          "title": "10.7 - Збереження прогресу рівня",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-10-8",
          "order": 80,
          "title": "10.8 - Checkpoint: повний ігровий цикл",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-11",
      "order": 10,
      "title": "11 - Міні-проєкти",
      "description": "Практичні ігри",
      "duration": {
        "weeks": 3,
        "lessons": 6
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-11-1",
          "order": 81,
          "title": "11.1 - Платформер: стрибок",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-10-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-11-2",
          "order": 82,
          "title": "11.2 - Catcher: ловимо предмети",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-11-3",
          "order": 83,
          "title": "11.3 - Лабіринт",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-11-4",
          "order": 84,
          "title": "11.4 - Quiz-гра",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-11-5",
          "order": 85,
          "title": "11.5 - Кліккер з апгрейдами",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-11-6",
          "order": 86,
          "title": "11.6 - Checkpoint: вибір проєкту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-5"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-12",
      "order": 11,
      "title": "12 - Фінальний проєкт",
      "description": "Ревʼю та презентація",
      "duration": {
        "weeks": 3,
        "lessons": 6
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-scratch-12-1",
          "order": 87,
          "title": "12.1 - Планування фінальної гри",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-11-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-12-2",
          "order": 88,
          "title": "12.2 - Збірка механік",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-12-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-12-3",
          "order": 89,
          "title": "12.3 - Полірування UX",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-12-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-12-4",
          "order": 90,
          "title": "12.4 - Тест з другом",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-12-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-12-5",
          "order": 91,
          "title": "12.5 - Презентація проєкту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-12-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-scratch-12-6",
          "order": 92,
          "title": "12.6 - Checkpoint: фінальний реліз",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-scratch-12-5"
          ],
          "isCheckpoint": true
        }
      ]
    }
  ]
}
