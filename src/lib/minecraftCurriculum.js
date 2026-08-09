/**
 * Auto-structured curriculum — 92 lessons / 12 modules
 * Grid: M1×8 + M2×4 + M3×8 + M4×8 + M5×10 + M6×10 + M7×8 + M8×8 + M9×8 + M10×8 + M11×6 + M12×6
 */

export const minecraftCurriculum = {
  "courseId": "minecraft-education",
  "title": "Minecraft Education: 92 уроки — агент, код і світи",
  "modules": [
    {
      "moduleId": "module-01",
      "order": 0,
      "title": "01 - Світ Education і агент",
      "description": "Орієнтація в Minecraft Education",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-1-1",
          "order": 1,
          "title": "1.1 - Що таке Minecraft Education",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-2",
          "order": 2,
          "title": "1.2 - Інтерфейс і режим світу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-3",
          "order": 3,
          "title": "1.3 - Камера та пересування",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-4",
          "order": 4,
          "title": "1.4 - Інвентар учня",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-5",
          "order": 5,
          "title": "1.5 - Агент: хто це",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-6",
          "order": 6,
          "title": "1.6 - Виклик агента",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-7",
          "order": 7,
          "title": "1.7 - Базові команди чату",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-1-8",
          "order": 8,
          "title": "1.8 - Checkpoint: агент поруч",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-02",
      "order": 1,
      "title": "02 - Code Builder / MakeCode",
      "description": "Старт кодування",
      "duration": {
        "weeks": 2,
        "lessons": 4
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-2-1",
          "order": 9,
          "title": "2.1 - Відкриття Code Builder",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-1-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-2-2",
          "order": 10,
          "title": "2.2 - Блоки MakeCode vs Python",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-2-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-2-3",
          "order": 11,
          "title": "2.3 - Перший скрипт агента",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-2-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-2-4",
          "order": 12,
          "title": "2.4 - Checkpoint: код запущено",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-2-3"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-03",
      "order": 2,
      "title": "03 - Агент: рух і будівництво",
      "description": "Переміщення та place",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-3-1",
          "order": 13,
          "title": "3.1 - Кроки агента вперед",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-2-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-2",
          "order": 14,
          "title": "3.2 - Повороти агента",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-3",
          "order": 15,
          "title": "3.3 - Підняти / опустити",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-4",
          "order": 16,
          "title": "3.4 - place блок",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-5",
          "order": 17,
          "title": "3.5 - destroy блок",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-6",
          "order": 18,
          "title": "3.6 - Будівництво лінії",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-7",
          "order": 19,
          "title": "3.7 - Будівництво стіни",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-3-8",
          "order": 20,
          "title": "3.8 - Checkpoint: хатинка 3×3",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-04",
      "order": 3,
      "title": "04 - Блоки, ресурси, патерни",
      "description": "Матеріали світу",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-4-1",
          "order": 21,
          "title": "4.1 - Типи блоків Education",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-3-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-2",
          "order": 22,
          "title": "4.2 - Вибір матеріалу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-3",
          "order": 23,
          "title": "4.3 - Патерн підлоги",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-4",
          "order": 24,
          "title": "4.4 - Дах і вікна",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-5",
          "order": 25,
          "title": "4.5 - Озеленення",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-6",
          "order": 26,
          "title": "4.6 - Дороги та стежки",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-7",
          "order": 27,
          "title": "4.7 - Декор і освітлення",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-4-8",
          "order": 28,
          "title": "4.8 - Checkpoint: оформлений двір",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-05",
      "order": 4,
      "title": "05 - Умови в коді агента",
      "description": "If і сенсори світу",
      "duration": {
        "weeks": 5,
        "lessons": 10
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-5-1",
          "order": 29,
          "title": "5.1 - Перевірка блоку попереду",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-4-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-2",
          "order": 30,
          "title": "5.2 - If / else у MakeCode",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-3",
          "order": 31,
          "title": "5.3 - Детект прогалини",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-4",
          "order": 32,
          "title": "5.4 - Уникнення лави/води",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-5",
          "order": 33,
          "title": "5.5 - Порівняння координат",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-6",
          "order": 34,
          "title": "5.6 - Логіка двох умов",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-7",
          "order": 35,
          "title": "5.7 - Авто-стоп біля стіни",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-8",
          "order": 36,
          "title": "5.8 - Збір предмета за умовою",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-7"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-9",
          "order": 37,
          "title": "5.9 - Повідомлення в чат",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-5-10",
          "order": 38,
          "title": "5.10 - Checkpoint: розумний обхід",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-9"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-06",
      "order": 5,
      "title": "06 - Цикли та геометрія споруд",
      "description": "Repeat і фігури",
      "duration": {
        "weeks": 5,
        "lessons": 10
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-6-1",
          "order": 39,
          "title": "6.1 - Цикл repeat N",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-5-10"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-2",
          "order": 40,
          "title": "6.2 - Квадрат і прямокутник",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-3",
          "order": 41,
          "title": "6.3 - Сходи циклом",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-4",
          "order": 42,
          "title": "6.4 - Вежа / колона",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-5",
          "order": 43,
          "title": "6.5 - Спіраль",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-6",
          "order": 44,
          "title": "6.6 - Вкладені цикли",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-7",
          "order": 45,
          "title": "6.7 - Сітка кімнат",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-8",
          "order": 46,
          "title": "6.8 - Симетрія будівлі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-7"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-9",
          "order": 47,
          "title": "6.9 - Параметри розміру",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-6-10",
          "order": 48,
          "title": "6.10 - Checkpoint: фортеця",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-9"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-07",
      "order": 6,
      "title": "07 - Події, чат, тригери",
      "description": "Реакції на світ",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-7-1",
          "order": 49,
          "title": "7.1 - Подія on chat command",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-6-10"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-2",
          "order": 50,
          "title": "7.2 - Кастомна команда учня",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-3",
          "order": 51,
          "title": "7.3 - Тригер на позицію",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-4",
          "order": 52,
          "title": "7.4 - Телепорт агента",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-5",
          "order": 53,
          "title": "7.5 - Сигнали між командами",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-6",
          "order": 54,
          "title": "7.6 - Таймер у коді",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-7",
          "order": 55,
          "title": "7.7 - Скидання сцени",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-7-8",
          "order": 56,
          "title": "7.8 - Checkpoint: командний пульт",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-08",
      "order": 7,
      "title": "08 - Command blocks і команди",
      "description": "Світові команди",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-8-1",
          "order": 57,
          "title": "8.1 - Що таке command block",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-7-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-2",
          "order": 58,
          "title": "8.2 - Проста команда /say",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-3",
          "order": 59,
          "title": "8.3 - Дати предмет",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-4",
          "order": 60,
          "title": "8.4 - Заповнення fill",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-5",
          "order": 61,
          "title": "8.5 - Клонування clone",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-6",
          "order": 62,
          "title": "8.6 - Ланцюжок command blocks",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-7",
          "order": 63,
          "title": "8.7 - Червоний камінь як тригер",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-8-8",
          "order": 64,
          "title": "8.8 - Checkpoint: авто-двері",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-09",
      "order": 8,
      "title": "09 - Квести, NPC, завдання",
      "description": "Навчальні сценарії",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-9-1",
          "order": 65,
          "title": "9.1 - NPC і діалог",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-8-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-2",
          "order": 66,
          "title": "9.2 - Завдання квесту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-3",
          "order": 67,
          "title": "9.3 - Чекпоінт у світі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-4",
          "order": 68,
          "title": "9.4 - Збір ресурсів за квестом",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-5",
          "order": 69,
          "title": "9.5 - Таймер квесту",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-6",
          "order": 70,
          "title": "9.6 - Підказки для учня",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-7",
          "order": 71,
          "title": "9.7 - Мультистеп квест",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-9-8",
          "order": 72,
          "title": "9.8 - Checkpoint: квест пройдено",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-10",
      "order": 9,
      "title": "10 - STEM-проєкти у світі",
      "description": "Наука та інженерія",
      "duration": {
        "weeks": 4,
        "lessons": 8
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-10-1",
          "order": 73,
          "title": "10.1 - Вимірювання відстаней",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-9-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-2",
          "order": 74,
          "title": "10.2 - Симетрія й геометрія",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-3",
          "order": 75,
          "title": "10.3 - Модель молекули / клітини",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-4",
          "order": 76,
          "title": "10.4 - Електросхема redstone",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-5",
          "order": 77,
          "title": "10.5 - Екосистема ферми",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-6",
          "order": 78,
          "title": "10.6 - Карта висот",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-5"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-7",
          "order": 79,
          "title": "10.7 - Дані в таблиці світу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-10-8",
          "order": 80,
          "title": "10.8 - Checkpoint: STEM-демо",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-7"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-11",
      "order": 10,
      "title": "11 - Командна робота / світи",
      "description": "Спільні проєкти",
      "duration": {
        "weeks": 3,
        "lessons": 6
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-11-1",
          "order": 81,
          "title": "11.1 - Ролі в команді",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-10-8"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-11-2",
          "order": 82,
          "title": "11.2 - Спільний план будівлі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-11-3",
          "order": 83,
          "title": "11.3 - Код-стандарти агента",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-11-4",
          "order": 84,
          "title": "11.4 - Code review у парі",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-11-5",
          "order": 85,
          "title": "11.5 - Злиття зон світу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-11-6",
          "order": 86,
          "title": "11.6 - Checkpoint: командний кампус",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-5"
          ],
          "isCheckpoint": true
        }
      ]
    },
    {
      "moduleId": "module-12",
      "order": 11,
      "title": "12 - Фінальний світ",
      "description": "Презентація",
      "duration": {
        "weeks": 3,
        "lessons": 6
      },
      "learningOutcomes": [],
      "lessons": [
        {
          "lessonId": "lesson-minecraft-12-1",
          "order": 87,
          "title": "12.1 - Концепт фінального світу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-11-6"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-12-2",
          "order": 88,
          "title": "12.2 - Збірка механік і коду",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-12-1"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-12-3",
          "order": 89,
          "title": "12.3 - Баланс квестів",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-12-2"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-12-4",
          "order": 90,
          "title": "12.4 - Плейтест",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-12-3"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-12-5",
          "order": 91,
          "title": "12.5 - Презентація класу",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-12-4"
          ],
          "isCheckpoint": false
        },
        {
          "lessonId": "lesson-minecraft-12-6",
          "order": 92,
          "title": "12.6 - Checkpoint: фінальний світ",
          "learningObjectives": [],
          "estimatedTime": 60,
          "prerequisites": [
            "lesson-minecraft-12-5"
          ],
          "isCheckpoint": true
        }
      ]
    }
  ]
}
