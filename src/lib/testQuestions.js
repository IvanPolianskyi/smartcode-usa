// Test questions data extracted for better code splitting and maintainability
export const TEST_QUESTIONS = {
  python: [
    {
      id: 1,
      question: 'Що таке змінна в Python?',
      options: [
        'Контейнер для зберігання даних',
        'Функція для виводу тексту',
        'Тип даних',
        'Оператор циклу'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Який оператор використовується для порівняння рівності?',
      options: ['=', '==', '===', '!='],
      correct: 1
    },
    {
      id: 3,
      question: 'Що виведе код: print(2 + 3 * 2)?',
      options: ['10', '8', '12', '7'],
      correct: 1
    },
    {
      id: 4,
      question: 'Яка функція використовується для виводу тексту на екран?',
      options: ['show()', 'print()', 'display()', 'output()'],
      correct: 1
    },
    {
      id: 5,
      question: 'Що таке цикл for в Python?',
      options: [
        'Оператор умови',
        'Спосіб повторення коду',
        'Тип даних',
        'Функція'
      ],
      correct: 1
    },
    {
      id: 6,
      question: 'Яка функція використовується для отримання довжини списку?',
      options: ['size()', 'length()', 'len()', 'count()'],
      correct: 2
    },
    {
      id: 7,
      question: 'Як створити список в Python?',
      options: [
        'list = []',
        'list = {}',
        'list = ()',
        'list = <>'
      ],
      correct: 0
    },
    {
      id: 8,
      question: 'Що таке if в Python?',
      options: [
        'Цикл',
        'Умовний оператор',
        'Функція',
        'Список'
      ],
      correct: 1
    },
    {
      id: 9,
      question: 'Як додати елемент до списку?',
      options: ['add()', 'append()', 'insert()', 'push()'],
      correct: 1
    },
    {
      id: 10,
      question: 'Що таке рядок (string) в Python?',
      options: [
        'Послідовність символів',
        'Число',
        'Список',
        'Функція'
      ],
      correct: 0
    },
    {
      id: 11,
      question: 'Як отримати перший елемент списку?',
      options: ['list[0]', 'list[1]', 'list.first', 'list.get(0)'],
      correct: 0
    },
    {
      id: 12,
      question: 'Що робить оператор in в Python?',
      options: [
        'Перевіряє чи є елемент у послідовності',
        'Додає елемент',
        'Видаляє елемент',
        'Сортує список'
      ],
      correct: 0
    },
    {
      id: 13,
      question: 'Що таке функція range()?',
      options: [
        'Створює послідовність чисел',
        'Сортує список',
        'Знаходить максимум',
        'Округлює число'
      ],
      correct: 0
    },
    {
      id: 14,
      question: 'Що робить ключове слово def в Python?',
      options: [
        'Створює функцію',
        'Створює змінну',
        'Створює цикл',
        'Створює умову'
      ],
      correct: 0
    },
    {
      id: 15,
      question: 'Як викликати функцію в Python?',
      options: [
        'function_name()',
        'call function_name',
        'function_name.call()',
        'execute function_name'
      ],
      correct: 0
    }
  ],
  roblox: [
    {
      id: 1,
      question: 'Що таке Roblox Studio?',
      options: [
        'Ігровий рушій для створення ігор',
        'Онлайн-гра',
        'Мова програмування',
        'Графічний редактор'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Яка мова програмування використовується в Roblox?',
      options: ['Python', 'JavaScript', 'Lua', 'C++'],
      correct: 2
    },
    {
      id: 3,
      question: 'Що таке Part в Roblox Studio?',
      options: [
        'Скрипт',
        'Базовий об\'єкт для створення ігор',
        'Анімація',
        'Звук'
      ],
      correct: 1
    },
    {
      id: 4,
      question: 'Де знаходиться панель інструментів в Roblox Studio?',
      options: ['Зверху', 'Зліва', 'Справа', 'Знизу'],
      correct: 0
    },
    {
      id: 5,
      question: 'Що таке Script в Roblox?',
      options: [
        'Об\'єкт для створення скриптів',
        'Графічний елемент',
        'Анімація',
        'Звуковий файл'
      ],
      correct: 0
    },
    {
      id: 6,
      question: 'Як називається система фізики в Roblox?',
      options: ['Physics', 'Rigidbody', 'BodyVelocity', 'BodyPosition'],
      correct: 0
    },
    {
      id: 7,
      question: 'Що таке Workspace в Roblox?',
      options: [
        'Місце де розміщуються об\'єкти гри',
        'Скрипт',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 8,
      question: 'Як змінити колір Part?',
      options: [
        'Через властивість Color',
        'Через скрипт',
        'Не можна змінити',
        'Через анімацію'
      ],
      correct: 0
    },
    {
      id: 9,
      question: 'Що таке SpawnLocation?',
      options: [
        'Місце де з\'являються гравці',
        'Скрипт',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 10,
      question: 'Як додати скрипт до об\'єкта?',
      options: [
        'Перетягнути Script в об\'єкт',
        'Скопіювати код',
        'Натиснути кнопку',
        'Не можна додати'
      ],
      correct: 0
    },
    {
      id: 11,
      question: 'Що таке LocalScript в Roblox?',
      options: [
        'Скрипт що працює тільки на клієнті',
        'Скрипт для сервера',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 12,
      question: 'Як зробити об\'єкт невидимим?',
      options: [
        'Встановити Transparency = 1',
        'Видалити об\'єкт',
        'Змінити колір',
        'Перемістити'
      ],
      correct: 0
    },
    {
      id: 13,
      question: 'Що таке Tool в Roblox?',
      options: [
        'Інструмент який може тримати гравець',
        'Скрипт',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 14,
      question: 'Як створити анімацію в Roblox?',
      options: [
        'Використовувати Animation Editor',
        'Через скрипт',
        'Не можна створити',
        'Автоматично'
      ],
      correct: 0
    },
    {
      id: 15,
      question: 'Що робить функція wait() в Lua?',
      options: [
        'Чекає певний час',
        'Видаляє об\'єкт',
        'Створює об\'єкт',
        'Змінює колір'
      ],
      correct: 0
    }
  ],
  webdev: [
    {
      id: 1,
      question: 'Що означає HTML?',
      options: [
        'HyperText Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlink Text Markup Language'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Що таке CSS?',
      options: [
        'Мова стилізації веб-сторінок',
        'Мова програмування',
        'База даних',
        'Фреймворк'
      ],
      correct: 0
    },
    {
      id: 3,
      question: 'Який тег використовується для створення заголовка?',
      options: ['<title>', '<h1>', '<header>', '<head>'],
      correct: 1
    },
    {
      id: 4,
      question: 'Який тег використовується для створення посилання?',
      options: ['<link>', '<a>', '<url>', '<href>'],
      correct: 1
    },
    {
      id: 5,
      question: 'Який CSS властивість змінює колір тексту?',
      options: ['text-color', 'font-color', 'color', 'text-style'],
      correct: 2
    },
    {
      id: 6,
      question: 'Як додати зображення на веб-сторінку?',
      options: ['<img>', '<image>', '<picture>', '<photo>'],
      correct: 0
    },
    {
      id: 7,
      question: 'Що таке JavaScript?',
      options: [
        'Мова програмування для веб-сторінок',
        'Мова стилізації',
        'Мова розмітки',
        'База даних'
      ],
      correct: 0
    },
    {
      id: 8,
      question: 'Як змінити розмір тексту в CSS?',
      options: ['font-size', 'text-size', 'size', 'font'],
      correct: 0
    },
    {
      id: 9,
      question: 'Що таке div в HTML?',
      options: [
        'Контейнер для інших елементів',
        'Зображення',
        'Посилання',
        'Заголовок'
      ],
      correct: 0
    },
    {
      id: 10,
      question: 'Як зробити текст жирним?',
      options: ['<b>', '<strong>', '<bold>', 'Обидва <b> та <strong>'],
      correct: 3
    },
    {
      id: 11,
      question: 'Що таке React?',
      options: [
        'Бібліотека для створення інтерфейсів',
        'Мова програмування',
        'База даних',
        'Сервер'
      ],
      correct: 0
    },
    {
      id: 12,
      question: 'Як створити список в HTML?',
      options: ['<ul> або <ol>', '<list>', '<li>', '<list-item>'],
      correct: 0
    },
    {
      id: 13,
      question: 'Що таке клас в CSS?',
      options: [
        'Спосіб стилізації елементів',
        'Функція',
        'Змінна',
        'Тег'
      ],
      correct: 0
    },
    {
      id: 14,
      question: 'Як підключити CSS до HTML?',
      options: [
        'Через тег <link> або <style>',
        'Тільки через <style>',
        'Тільки через <link>',
        'Не можна підключити'
      ],
      correct: 0
    },
    {
      id: 15,
      question: 'Що робить функція в JavaScript?',
      options: [
        'Виконує набір інструкцій',
        'Створює змінну',
        'Створює HTML',
        'Стилізує сторінку'
      ],
      correct: 0
    }
  ],
  unity: [
    {
      id: 1,
      question: 'Що таке Unity?',
      options: [
        'Ігровий рушій для створення ігор',
        'Мова програмування',
        'Графічний редактор',
        'База даних'
      ],
      correct: 0
    },
    {
      id: 2,
      question: 'Яка мова програмування використовується в Unity?',
      options: ['Python', 'JavaScript', 'C#', 'Java'],
      correct: 2
    },
    {
      id: 3,
      question: 'Що таке GameObject в Unity?',
      options: [
        'Базовий об\'єкт у сцені',
        'Скрипт',
        'Анімація',
        'Матеріал'
      ],
      correct: 0
    },
    {
      id: 4,
      question: 'Що таке Scene в Unity?',
      options: [
        'Рівень або сцена гри',
        'Скрипт',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 5,
      question: 'Що таке Component в Unity?',
      options: [
        'Частина функціональності GameObject',
        'Сцена',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 6,
      question: 'Який компонент відповідає за позицію об\'єкта?',
      options: ['Transform', 'Position', 'Location', 'Place'],
      correct: 0
    },
    {
      id: 7,
      question: 'Який компонент відповідає за фізику об\'єкта?',
      options: ['Rigidbody', 'Collider', 'Transform', 'Renderer'],
      correct: 0
    },
    {
      id: 8,
      question: 'Що таке Prefab в Unity?',
      options: [
        'Готовий об\'єкт для повторного використання',
        'Скрипт',
        'Анімація',
        'Звук'
      ],
      correct: 0
    },
    {
      id: 9,
      question: 'Як додати скрипт до GameObject?',
      options: [
        'Перетягнути скрипт на об\'єкт',
        'Скопіювати код',
        'Натиснути кнопку',
        'Не можна додати'
      ],
      correct: 0
    },
    {
      id: 10,
      question: 'Що таке Inspector в Unity?',
      options: [
        'Вікно для редагування властивостей',
        'Сцена',
        'Анімація',
        'Скрипт'
      ],
      correct: 0
    },
    {
      id: 11,
      question: 'Як створити новий скрипт в Unity?',
      options: [
        'Правий клік → Create → C# Script',
        'Через меню File',
        'Автоматично',
        'Не можна створити'
      ],
      correct: 0
    },
    {
      id: 12,
      question: 'Що таке Collider в Unity?',
      options: [
        'Компонент для визначення меж об\'єкта',
        'Анімація',
        'Звук',
        'Скрипт'
      ],
      correct: 0
    },
    {
      id: 13,
      question: 'Що таке метод Start() в Unity?',
      options: [
        'Метод що викликається один раз при старті',
        'Метод для оновлення',
        'Метод для руху',
        'Метод для анімації'
      ],
      correct: 0
    },
    {
      id: 14,
      question: 'Що таке метод Update() в Unity?',
      options: [
        'Метод що викликається кожен кадр',
        'Метод для старту',
        'Метод для зупинки',
        'Метод для знищення'
      ],
      correct: 0
    },
    {
      id: 15,
      question: 'Як отримати доступ до компонента в C# скрипті?',
      options: [
        'GetComponent<ComponentName>()',
        'FindComponent()',
        'GetComponentByName()',
        'Не можна отримати'
      ],
      correct: 0
    }
  ]
}






















