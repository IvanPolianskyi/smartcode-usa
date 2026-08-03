/** Unity Module 02 UK - C# основи */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson21 = {
  lessonId: 'lesson-unity-2-1',
  moduleId: 'module-02',
  order: 1,
  title: '2.1 - MonoBehaviour: Start і Update',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Створювати C#-скрипт у Unity і розуміти звʼязок імені файлу й імені класу',
    'Розрізняти методи Awake, Start і Update у циклі MonoBehaviour',
    'Прикріплювати скрипт до GameObject як компонент',
    'Використовувати Debug.Log для перевірки роботи коду',
    'Розуміти, що Update викликається кожен кадр',
  ],
  theory: {
    sections: [
      {
        title: 'Перший скрипт: C# в Unity',
        content: `Досі ти керував сценою мишкою й Inspector. Тепер додаємо **поведінку через код**. У Unity скрипти пишуться на **C#** - строго типізованій мові від Microsoft.

Створи скрипт: у **Project** вікні правий клік → **Create → C# Script**, назви \`PlayerMover\` (без пробілів, з великої літери - конвенція PascalCase для класів). Unity одразу генерує шаблон:

\`\`\`csharp
using UnityEngine;

public class PlayerMover : MonoBehaviour
{
    void Start()
    {
        
    }

    void Update()
    {
        
    }
}
\`\`\`

**Критично важливо:** ім'я класу (\`PlayerMover\`) має **точно** збігатися з іменем файлу (\`PlayerMover.cs\`). Якщо перейменувати файл у Project, а клас лишити старим - Unity видасть помилку компіляції.

**Зроби зараз (5 хв):** створи скрипт \`PlayerMover\`, відкрий його подвійним кліком (відкриється Visual Studio або інший підключений редактор коду).`,
      },
      {
        title: 'MonoBehaviour - базовий клас будь-якого скрипта-компонента',
        content: `\`: MonoBehaviour\` означає, що твій клас **успадковує** (наслідує) від базового класу Unity - саме завдяки цьому скрипт можна прикріпити до GameObject як компонент і отримати доступ до вбудованих методів життєвого циклу.

Основні методи, які Unity викликає **автоматично**:

| Метод | Коли викликається | Типове використання |
|-------|---------------------|------------------------|
| **Awake()** | Один раз, одразу при завантаженні обʼєкта, до Start | Ініціалізація "внутрішніх" даних, кешування посилань |
| **Start()** | Один раз, перед першим кадром, після всіх Awake | Налаштування, яке залежить від інших обʼєктів |
| **Update()** | Кожен кадр (десятки разів на секунду) | Рух, введення з клавіатури, перевірки щокадру |

Ти **не викликаєш** ці методи сам - Unity робить це за тебе в потрібний момент. Твоя робота - написати код **всередині** них.

**Зроби зараз (5 хв):** у \`PlayerMover\` додай \`Debug.Log("Awake викликано");\` в Awake (додай метод сам, скопіювавши сигнатуру Start) і \`Debug.Log("Start викликано");\` у Start.`,
      },
      {
        title: 'Прикріплення скрипта до GameObject',
        content: `Скрипт сам по собі нічого не робить, доки не стане **компонентом** якогось GameObject. Два способи прикріпити:

1. Перетягнути файл скрипта з **Project** на GameObject у **Hierarchy** або **Scene**.
2. Виділити GameObject → в Inspector **Add Component** → знайти скрипт за назвою.

Після прикріплення скрипт зʼявиться в Inspector як звичайний компонент (як Transform чи Mesh Renderer), і Unity почне викликати його Awake/Start/Update разом з рештою.

**Важливо:** один скрипт можна прикріпити до кількох різних GameObject одночасно - кожен матиме свою окрему "копію" виконання цього коду.

**Зроби зараз (5 хв):** створи Cube, прикріпи \`PlayerMover\` до нього через Add Component. Натисни Play і подивись у Console (**Window → General → Console**), чи зʼявились повідомлення.`,
      },
      {
        title: 'Update викликається щокадру - і чому це важливо',
        content: `**Update()** виконується **кожен кадр рендерингу** - зазвичай 30-144+ разів на секунду залежно від продуктивності. Це робить Update ідеальним місцем для всього, що має "постійно перевірятись": чи натиснута клавіша, чи персонаж рухається, чи закінчився таймер.

**Типова помилка:** ставити одноразову дію (наприклад, "додати 100 очок") у Update без додаткової умови - вона виконуватиметься сотні разів на секунду замість одного разу.

Якщо додати \`Debug.Log("Update викликано");\` прямо в Update без умов, Console швидко заповниться тисячами однакових рядків - це нормальна поведінка, яка наочно показує частоту викликів, але для реального проєкту так писати не варто (Console стане непридатним для читання).

**Зроби зараз (5 хв):** додай \`Debug.Log("Update викликано");\` у Update, натисни Play на 1-2 секунди, подивись, скільки рядків зʼявилось у Console. Прибери цей рядок після спостереження - він більше не знадобиться.`,
      },
      {
        title: 'Console: твій головний інструмент діагностики',
        content: `**Console** (**Window → General → Console**) показує всі \`Debug.Log\`, попередження (жовті) і помилки (червоні). Якщо скрипт не компілюється - помилка компіляції завжди з'явиться тут **першою**, і без її виправлення жоден скрипт у проєкті не запуститься.

Подвійний клік на рядку в Console часто відкриває саме той рядок коду, де сталася проблема - економить час пошуку.

**Практика хорошого тону:** видаляй тестові \`Debug.Log\`, які вже виконали свою роль (як у попередній секції), щоб не засмічувати Console в фінальній версії скрипта.

**Зроби зараз (3 хв):** навмисно зроби помилку - постав зайву кому в коді, збережи файл, поверни фокус на Unity. Подивись, як виглядає помилка компіляції в Console. Виправ і збережи знову.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Ім\'я класу не збігається з іменем файлу',
      explanation: 'Unity вимагає точний збіг, інакше не може повʼязати компонент з класом.',
      correctApproach: 'Перейменовуй файл і клас одночасно, або створюй новий файл через Create → C# Script з правильною назвою одразу.',
    },
    {
      mistake: 'Скрипт написаний, але нічого не відбувається в Play',
      explanation: 'Скрипт не прикріплений до жодного GameObject як компонент.',
      correctApproach: 'Перевір в Inspector потрібного обʼєкта, чи є там скрипт у списку компонентів; якщо ні - додай через Add Component.',
    },
    {
      mistake: 'Console заповнена тисячами однакових повідомлень',
      explanation: 'Debug.Log поставлено в Update без умови, і воно виконується щокадру.',
      correctApproach: 'Для одноразових повідомлень використовуй Start чи Awake; для Update - додавай умову (наприклад, тільки при натисканні клавіші).',
    },
  ],
  summary:
    'Ти створив перший C#-скрипт, зрозумів різницю між Awake/Start (один раз) і Update (кожен кадр), навчився прикріплювати скрипт до GameObject як компонент і використовувати Console та Debug.Log для перевірки роботи коду.',
  practiceTask: {
    title: 'Практика: скрипт з Awake, Start, Update (~25 хв)',
    difficulty: 'beginner',
    description: `**Мета:** робочий скрипт, прикріплений до GameObject, який виводить повідомлення в Console у потрібні моменти.

### Part A - Створення скрипта (разом / 10 хв)
1. Створи скрипт \`FirstScript\`.
2. Додай Debug.Log у Awake, Start і Update (тимчасово, для спостереження).
3. Прикріпи до нового Cube.

### Part B - Лічильник кадрів (самі / 10-15 хв)
1. Онови Update так, щоб він рахував кількість викликів у приватну змінну \`int frameCount\` (поки що без [SerializeField], просто \`private int frameCount = 0;\` і \`frameCount++;\` в Update).
2. У Start виведи Debug.Log про старт з поясненням, що зараз почнеться підрахунок.
3. Прибери зайві Debug.Log з Update, залиш лише збільшення лічильника (без виводу щокадру).

### Критерій "зараховано"
- Скрипт компілюється без помилок
- Прикріплений до GameObject
- Awake і Start виводять повідомлення один раз кожен
- Update накопичує frameCount без спаму в Console`,
    hints: [
      'Ім\'я файлу і класу мають збігатись символ у символ',
      'Debug.Log приймає рядок; для чисел використовуй $"Frame: {frameCount}" або конкатенацію +',
      'Якщо код не компілюється - перше повідомлення про помилку в Console найважливіше',
    ],
    optionalChallenge:
      'Виведи через Debug.Log значення frameCount кожні 60 кадрів (підказка: if (frameCount % 60 == 0)) - це познайомить з оператором остачі % ще до 2.3.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що обовʼязково має збігатися при створенні C#-скрипта в Unity?',
        options: [
          'Розмір файлу і розмір GameObject',
          'Ім\'я класу і ім\'я файлу скрипта',
          'Колір іконки скрипта і колір GameObject',
          'Версія Unity і версія C#',
        ],
        correctAnswer: 1,
        explanation: 'Unity повʼязує компонент з класом за іменем файлу - вони мають бути ідентичними.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Скільки разів викликається Start() за час життя обʼєкта (за замовчуванням)?',
        options: ['Кожен кадр', 'Один раз', 'Двічі', 'Ніколи, якщо немає Update'],
        correctAnswer: 1,
        explanation: 'Start викликається один раз, перед першим кадром роботи обʼєкта.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Як часто викликається Update()?',
        options: [
          'Один раз при старті гри',
          'Кожен кадр',
          'Раз на секунду',
          'Тільки при натисканні клавіші',
        ],
        correctAnswer: 1,
        explanation: 'Update виконується кожен кадр рендерингу, поки обʼєкт активний.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що потрібно зробити, щоб скрипт почав виконуватись у сцені?',
        options: [
          'Просто зберегти файл скрипта',
          'Прикріпити його як компонент до GameObject',
          'Перейменувати сцену',
          'Запустити Unity Hub',
        ],
        correctAnswer: 1,
        explanation: 'Скрипт виконується лише коли прикріплений як компонент до активного GameObject.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Чому небезпечно ставити Debug.Log без умови прямо в Update?',
        options: [
          'Unity не дозволить це скомпілювати',
          'Console заповниться тисячами однакових повідомлень щосекунди',
          'Це видалить GameObject',
          'Це вимкне Play mode',
        ],
        correctAnswer: 1,
        explanation: 'Update викликається десятки разів на секунду, тому лог без умови засмічує Console.',
      },
    ],
  },
}

export const ukLesson22 = {
  lessonId: 'lesson-unity-2-2',
  moduleId: 'module-02',
  order: 2,
  title: '2.2 - Змінні та SerializeField в Inspector',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Оголошувати змінні базових типів: int, float, string, bool, Vector3',
    'Розуміти різницю між public і private полями',
    'Використовувати [SerializeField] для показу приватних полів в Inspector',
    'Змінювати значення змінних через Inspector без редагування коду',
    'Дотримуватись конвенцій іменування (camelCase / PascalCase)',
  ],
  theory: {
    sections: [
      {
        title: 'Змінні: контейнери для даних',
        content: `**Змінна** зберігає значення певного типу. У C# тип оголошується явно перед іменем:

\`\`\`csharp
public class PlayerStats : MonoBehaviour
{
    private int health = 100;
    private float speed = 5.5f;
    private string playerName = "Hero";
    private bool isAlive = true;
}
\`\`\`

Найчастіші типи на старті:

| Тип | Приклад значення | Навіщо |
|-----|-------------------|--------|
| **int** | \`10\`, \`-3\` | Цілі числа: очки, здоровʼя, кількість монет |
| **float** | \`5.5f\`, \`0.1f\` | Дробові числа: швидкість, час, відстань (літера \`f\` обовʼязкова!) |
| **string** | \`"Hero"\` | Текст: імена, повідомлення |
| **bool** | \`true\` / \`false\` | Так/ні: чи живий, чи відкрито |
| **Vector3** | \`new Vector3(0, 1, 0)\` | Три числа разом: позиція, напрямок у 3D |

**Зроби зараз (5 хв):** у новому скрипті \`PlayerStats\` оголоси всі пʼять змінних з прикладу вище, прикріпи до GameObject, переконайся, що компілюється без помилок.`,
      },
      {
        title: 'public проти private: хто має доступ',
        content: `**private** - поле видно лише всередині цього ж класу. **public** - поле видно і змінюване з інших скриптів, а також (важливо!) **автоматично показується в Inspector** Unity.

\`\`\`csharp
public class PlayerStats : MonoBehaviour
{
    public int health = 100;      // видно в Inspector і з інших скриптів
    private float speed = 5.5f;   // видно лише тут
}
\`\`\`

Робити все **public** заради зручності Inspector - погана звичка: інші скрипти можуть випадково зіпсувати значення ззовні. Професійний підхід - **private + [SerializeField]**, про це наступна секція.

**Зроби зараз (3 хв):** зроби \`health\` public, збережи, перейди в Unity й подивись Inspector свого GameObject - число 100 має зʼявитись як поле для редагування.`,
      },
      {
        title: '[SerializeField]: приватне поле, видиме в Inspector',
        content: `Найкраща практика Unity - позначати поле **private**, але додавати атрибут **[SerializeField]** над ним - тоді воно і захищене від зовнішнього коду, і водночас редагується в Inspector дизайнером/тестувальником без зміни коду:

\`\`\`csharp
public class PlayerStats : MonoBehaviour
{
    [SerializeField] private int health = 100;
    [SerializeField] private float speed = 5.5f;
    [SerializeField] private string playerName = "Hero";
}
\`\`\`

Це дозволяє **гейм-дизайнерський workflow**: програміст пише логіку один раз, а хтось (навіть сам програміст пізніше) підбирає значення швидкості, здоровʼя, кулдаунів прямо в Inspector - без перезапуску компіляції щоразу.

**Важливо:** значення, змінені в Inspector, **перезаписують** значення за замовчуванням з коду для цього конкретного GameObject у сцені - це називається серіалізованими даними екземпляра.

**Зроби зараз (5 хв):** зміни \`health\` на \`[SerializeField] private int health = 100;\`. Переконайся, що воно все ще видно в Inspector. Зміни значення в Inspector на 50 і натисни Play - подивись через Debug.Log(health) у Start, яке значення підхопилось.`,
      },
      {
        title: 'Vector3: три числа як єдине ціле',
        content: `**Vector3** - структура з трьома float-полями: \`.x\`, \`.y\`, \`.z\`. Використовується для позицій, напрямків, розмірів - усього, що вже знайоме з Transform в Inspector.

\`\`\`csharp
[SerializeField] private Vector3 spawnPoint = new Vector3(0f, 1f, 0f);

void Start()
{
    transform.position = spawnPoint;
    Debug.Log("Спавн у точці: " + spawnPoint);
}
\`\`\`

\`transform\` - вбудоване посилання MonoBehaviour на компонент Transform **цього ж** GameObject, до якого прикріплений скрипт. Це один із найчастіше використовуваних виразів у Unity-коді.

**Зроби зараз (5 хв):** додай \`[SerializeField] private Vector3 spawnPoint\` у свій скрипт, встанови значення в Inspector, і в Start присвой \`transform.position = spawnPoint;\`. Запусти Play - обʼєкт має "телепортуватись" у вказану точку.`,
      },
      {
        title: 'Конвенції іменування: чому це не забаганка',
        content: `У C#/Unity-спільноті прийнято:

- **PascalCase** для класів і публічних методів: \`PlayerStats\`, \`TakeDamage()\`
- **camelCase** для приватних полів і локальних змінних: \`health\`, \`moveSpeed\`, \`isAlive\`

Це не просто стиль - код, який виглядає "як усі приклади в документації Unity", легше читати іншим (і собі через місяць). Якщо змінна позначає булеве значення, гарна практика - префікс \`is\`/\`has\`/\`can\`: \`isAlive\`, \`hasKey\`, \`canJump\` - одразу видно з назви, що очікується true/false.

**Зроби зараз (2 хв):** переглянь усі свої змінні в \`PlayerStats\` - переконайся, що іменування відповідає camelCase, і додай префікс \`is\` до \`isAlive\`, якщо ще не має.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Забув літеру f у float-значенні: 5.5 замість 5.5f',
      explanation: 'У C# число без f за замовчуванням трактується як double, що не сумісне напряму з float без явного перетворення.',
      correctApproach: 'Завжди додавай f для дробових float-значень: 5.5f, 0.1f, 10f.',
    },
    {
      mistake: 'Зробив усі поля public "для зручності"',
      explanation: 'Public поля можна випадково змінити з будь-якого іншого скрипта, що ускладнює пошук багів.',
      correctApproach: 'Використовуй private + [SerializeField] - видно в Inspector, захищено від зовнішнього коду.',
    },
    {
      mistake: 'Дивується, чому в Play значення не таке, як написано в коді',
      explanation: 'Значення в Inspector, змінене вручну, перекриває значення за замовчуванням з коду для цього обʼєкта.',
      correctApproach: 'Перевіряй саме Inspector конкретного GameObject у сцені - там може бути своє перезаписане значення.',
    },
  ],
  summary:
    'Ти навчився оголошувати змінні базових типів (int, float, string, bool, Vector3), розрізняти public і private, використовувати [SerializeField] для безпечного показу приватних полів в Inspector і дотримуватись конвенцій іменування C#.',
  practiceTask: {
    title: 'Практика: налаштовувані статистики через Inspector (~25 хв)',
    difficulty: 'beginner',
    description: `**Мета:** скрипт зі змінними, які редагуються через Inspector без зміни коду.

### Part A - Базові поля (разом / 10 хв)
1. Створи скрипт \`UnitStats\`, прикріпи до Cube.
2. Додай [SerializeField] private поля: \`int health\`, \`float speed\`, \`string unitName\`, \`bool isAlive\`.
3. У Start виведи Debug.Log з усіма значеннями разом (можна через $"..." інтерполяцію рядків).

### Part B - Vector3 і Inspector (самі / 10-15 хв)
1. Додай \`[SerializeField] private Vector3 spawnPoint\`.
2. У Start присвой \`transform.position = spawnPoint\`.
3. У Inspector зміни всі значення на власні (health = 75, speed = 3.2, unitName = твоє імʼя персонажа, spawnPoint = будь-яка точка).
4. Запусти Play, перевір у Console, що значення підхопились саме ті, що в Inspector.

### Критерій "зараховано"
- Мінімум 5 різних [SerializeField] полів різних типів
- Значення видно і редагуються в Inspector
- Vector3 spawnPoint реально переміщує обʼєкт при Play`,
    hints: [
      'Не забувай f для float: 3.2f, а не 3.2',
      'Debug.Log($"Health: {health}, Speed: {speed}") - зручний спосіб вивести кілька змінних одразу',
      'Значення в Inspector зберігаються окремо для кожного GameObject у сцені',
    ],
    optionalChallenge:
      'Додай [Range(0, 100)] над полем health (наприклад, [SerializeField] [Range(0, 100)] private int health) - подивись, як Inspector перетворює число на повзунок.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Яка літера обовʼязкова в кінці дробового float-значення?',
        options: ['d', 'l', 'f', 'v'],
        correctAnswer: 2,
        explanation: 'f позначає float-літерал: 5.5f.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що робить атрибут [SerializeField] над приватним полем?',
        options: [
          'Робить поле статичним',
          'Показує приватне поле в Inspector, лишаючи його private для коду',
          'Видаляє поле з компіляції',
          'Перетворює поле на метод',
        ],
        correctAnswer: 1,
        explanation: '[SerializeField] дозволяє редагувати приватне поле в Inspector без надання public-доступу з коду.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Чому вважається поганою практикою робити всі поля public?',
        options: [
          'Public поля не компілюються',
          'Public поля доступні для зміни з будь-якого іншого скрипта, що ускладнює контроль',
          'Public поля повільніші',
          'Inspector не показує public поля',
        ],
        correctAnswer: 1,
        explanation: 'Public відкриває поле для будь-якого зовнішнього коду, що може призвести до випадкових змін.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Який тип найкраще підходить для зберігання позиції в 3D-просторі?',
        options: ['int', 'string', 'Vector3', 'bool'],
        correctAnswer: 2,
        explanation: 'Vector3 обʼєднує три float-значення (x, y, z) для позицій і напрямків.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Значення поля змінили в Inspector, а в коді стоїть інше значення за замовчуванням. Яке підхопиться при Play?',
        options: [
          'Завжди з коду',
          'Завжди 0',
          'Те, що встановлено в Inspector для цього конкретного GameObject',
          'Unity видасть помилку',
        ],
        correctAnswer: 2,
        explanation: 'Значення в Inspector перекриває значення за замовчуванням з коду для конкретного екземпляра.',
      },
    ],
  },
}

export const ukLesson23 = {
  lessonId: 'lesson-unity-2-3',
  moduleId: 'module-02',
  order: 3,
  title: '2.3 - Умови if та Input: керування з клавіатури',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Писати умовні конструкції if / else if / else',
    'Використовувати Input.GetKey, GetKeyDown, GetKeyUp',
    'Розуміти різницю між "затиснуто" і "натиснуто один раз"',
    'Комбінувати умови через && (AND) та || (OR)',
    'Реагувати на клавіші зміною кольору чи невеликим рухом обʼєкта',
  ],
  theory: {
    sections: [
      {
        title: 'if / else: гра приймає рішення',
        content: `**if** виконує блок коду, тільки якщо умова істинна (true):

\`\`\`csharp
private int health = 100;

void CheckHealth()
{
    if (health <= 0)
    {
        Debug.Log("Гравець загинув");
    }
    else if (health < 30)
    {
        Debug.Log("Критично мало здоровʼя!");
    }
    else
    {
        Debug.Log("Все гаразд");
    }
}
\`\`\`

Порядок перевірки важливий: **else if** перевіряється лише якщо попередній **if** був хибним. C# перевіряє умови зверху вниз і виконує **тільки перший** блок, що підійшов.

**Зроби зараз (5 хв):** створи метод \`CheckHealth\` за прикладом вище у своєму скрипті, виклич його з Start з різними тестовими значеннями health (100, 50, 20, 0).`,
      },
      {
        title: 'Input.GetKey, GetKeyDown, GetKeyUp - три різні моменти',
        content: `Unity дає три способи перевірити клавішу, і плутанина між ними - джерело багатьох багів новачків:

| Метод | Спрацьовує | Приклад використання |
|-------|-------------|------------------------|
| **GetKeyDown** | Один раз у кадрі, коли клавішу щойно натиснули | Стрибок, постріл, відкрити меню |
| **GetKey** | Кожен кадр, поки клавіша затиснута | Безперервний рух, утримання щита |
| **GetKeyUp** | Один раз у кадрі, коли клавішу щойно відпустили | Відпустити тятиву лука, зупинити зарядку |

\`\`\`csharp
void Update()
{
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Debug.Log("Стрибок!");
    }

    if (Input.GetKey(KeyCode.W))
    {
        Debug.Log("Рухаємось вперед");
    }
}
\`\`\`

**Типова плутанина:** використати GetKey там, де треба GetKeyDown, - дія виконуватиметься щокадру, поки клавіша затиснута, замість одного разу.

**Зроби зараз (5 хв):** додай в Update перевірку GetKeyDown(KeyCode.Space) з Debug.Log і перевірку GetKey(KeyCode.W) з іншим Debug.Log - порівняй, як часто зʼявляються повідомлення в Console при затисканні клавіш.`,
      },
      {
        title: 'Комбінування умов: && і ||',
        content: `Часто потрібно перевірити **кілька умов одночасно**:

- **&&** (AND) - обидві умови мають бути true
- **||** (OR) - достатньо, щоб хоча б одна була true

\`\`\`csharp
private bool hasKey = true;
private bool isNearDoor = false;

void Update()
{
    if (hasKey && isNearDoor)
    {
        Debug.Log("Двері відчинено");
    }

    if (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift))
    {
        Debug.Log("Прискорення активне");
    }
}
\`\`\`

Уважно стеж за дужками у складних умовах - \`(a && b) || c\` і \`a && (b || c)\` можуть давати різний результат.

**Зроби зараз (5 хв):** додай дві bool-змінні \`hasKey\` і \`isNearDoor\` у скрипт, перевір комбінацію через && в Update, поекспериментуй зі значеннями в Inspector (якщо зробиш їх [SerializeField]).`,
      },
      {
        title: 'Практична реакція: зміна кольору за натисканням',
        content: `Обʼєднаємо if, Input і вже відомий GetComponent (детальніше - у 2.4) для наочного результату - зміни кольору матеріалу при натисканні клавіші:

\`\`\`csharp
using UnityEngine;

public class ColorSwitcher : MonoBehaviour
{
    private Renderer rend;

    void Start()
    {
        rend = GetComponent<Renderer>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R))
        {
            rend.material.color = Color.red;
        }
        else if (Input.GetKeyDown(KeyCode.G))
        {
            rend.material.color = Color.green;
        }
        else if (Input.GetKeyDown(KeyCode.B))
        {
            rend.material.color = Color.blue;
        }
    }
}
\`\`\`

\`GetComponent<Renderer>()\` шукає компонент Renderer на цьому ж GameObject і зберігає посилання один раз у Start - це швидше, ніж викликати GetComponent щокадру в Update.

**Зроби зараз (7 хв):** створи скрипт \`ColorSwitcher\` за прикладом, прикріпи до Cube з матеріалом, перевір у Play натисканням R, G, B.`,
      },
      {
        title: 'Легкий рух через if + Input (передвісник модуля 4)',
        content: `Поки що без повноцінного контролера персонажа (це M4), можна показати ідею руху через Transform і Input:

\`\`\`csharp
[SerializeField] private float moveSpeed = 3f;

void Update()
{
    if (Input.GetKey(KeyCode.W))
    {
        transform.position += Vector3.forward * moveSpeed * Time.deltaTime;
    }
    if (Input.GetKey(KeyCode.S))
    {
        transform.position += Vector3.back * moveSpeed * Time.deltaTime;
    }
}
\`\`\`

\`Time.deltaTime\` - час у секундах між попереднім і поточним кадром. Множення на нього робить рух **однаковим за швидкістю** незалежно від частоти кадрів комп'ютера - без цього на потужному ПК обʼєкт рухався б швидше, ніж на слабкому.

**Зроби зараз (8 хв):** додай ці два блоки if у свій скрипт (можна в той самий \`ColorSwitcher\` або новий), перевір рух вперед/назад по W/S.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Використав GetKey замість GetKeyDown для одноразової дії',
      explanation: 'GetKey true кожен кадр, поки клавіша затиснута - дія повторюється десятки разів на секунду.',
      correctApproach: 'Для дій "один раз за натискання" (стрибок, постріл) завжди використовуй GetKeyDown.',
    },
    {
      mistake: 'Рух без Time.deltaTime - різна швидкість на різних компʼютерах',
      explanation: 'Update викликається з різною частотою залежно від продуктивності, тому без Time.deltaTime рух прив\'язаний до FPS.',
      correctApproach: 'Завжди множ рух на Time.deltaTime, щоб швидкість була постійною в секундах, а не в кадрах.',
    },
    {
      mistake: 'Заплутана логіка if/else if без урахування порядку перевірки',
      explanation: 'C# виконує лише перший блок, умова якого істинна, і ігнорує решту навіть якщо вони теж true.',
      correctApproach: 'Розташовуй умови від найспецифічнішої до найзагальнішої, або перевіряй кожну окремим if, якщо потрібні незалежні перевірки.',
    },
  ],
  summary:
    'Ти навчився писати if/else if/else, розрізняти GetKey/GetKeyDown/GetKeyUp, комбінувати умови через && і ||, а також застосував це для зміни кольору обʼєкта і найпростішого руху з Time.deltaTime.',
  practiceTask: {
    title: 'Практика: реакція на клавіші (~30 хв)',
    difficulty: 'beginner',
    description: `**Мета:** GameObject, що реагує на кілька клавіш різними способами (колір, рух, лог у Console).

### Part A - Колір за клавішами (разом / 10 хв)
1. Створи \`ColorSwitcher\` за прикладом з теорії (R/G/B міняють колір).
2. Прикріпи до Cube з матеріалом, перевір у Play.

### Part B - Рух і комбінована умова (самі / 15 хв)
1. Додай рух по W/S (вперед/назад) через transform.position і Time.deltaTime.
2. Додай bool \`isSprinting\`, який стає true, поки затиснутий LeftShift (GetKey), і false в іншому випадку.
3. Коли isSprinting true, множ moveSpeed на 2 (наприклад, через локальну змінну currentSpeed).

### Part C - Здача + челендж (5 хв)
1. Перевір усі клавіші разом: R/G/B для кольору, W/S для руху, Shift для прискорення.
2. **Челендж:** додай A/D для руху вліво/вправо (Vector3.left / Vector3.right).

### Критерій "зараховано"
- Мінімум 3 клавіші дають різну реакцію (наприклад, R/G/B)
- Рух по W/S працює і використовує Time.deltaTime
- Прискорення через Shift реально прискорює рух`,
    hints: [
      'GetKeyDown - для одноразової дії, GetKey - для утримання',
      'Time.deltaTime множиться на швидкість, а не додається окремо',
      'KeyCode.LeftShift і KeyCode.RightShift - різні клавіші, можна перевіряти через ||',
    ],
    optionalChallenge:
      'Додай KeyCode.Escape, який виводить Debug.Log("Пауза") - підготовка до теми меню паузи в модулі 5.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Який метод Input спрацьовує лише один раз у момент натискання клавіші?',
        options: ['Input.GetKey', 'Input.GetKeyDown', 'Input.GetAxis', 'Input.GetMouseButton'],
        correctAnswer: 1,
        explanation: 'GetKeyDown повертає true рівно один кадр - момент натискання.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що станеться, якщо використати GetKey замість GetKeyDown для стрибка?',
        options: [
          'Нічого не зміниться',
          'Стрибок виконуватиметься щокадру, поки клавіша затиснута',
          'Гра не скомпілюється',
          'Стрибок стане повільнішим',
        ],
        correctAnswer: 1,
        explanation: 'GetKey true кожен кадр при утриманні, тому дія повторюватиметься багато разів.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Що робить оператор && у C#?',
        options: [
          'Повертає true, якщо хоча б одна умова true',
          'Повертає true, тільки якщо обидві умови true',
          'Заперечує умову',
          'Порівнює рядки',
        ],
        correctAnswer: 1,
        explanation: '&& (логічне AND) вимагає істинності обох умов.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Навіщо множити рух на Time.deltaTime?',
        options: [
          'Щоб код виглядав складнішим',
          'Щоб швидкість руху не залежала від частоти кадрів (FPS)',
          'Це обовʼязково для GetComponent',
          'Щоб зменшити розмір скрипта',
        ],
        correctAnswer: 1,
        explanation: 'Time.deltaTime вирівнює рух у секундах незалежно від FPS комп’ютера.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'У ланцюжку if / else if / else скільки блоків виконається, якщо перша умова true?',
        options: ['Усі підряд', 'Жодного', 'Лише перший блок', 'Лише останній else'],
        correctAnswer: 2,
        explanation: 'C# виконує лише перший блок з істинною умовою і пропускає решту ланцюжка.',
      },
    ],
  },
}

export const ukLesson24 = {
  lessonId: 'lesson-unity-2-4',
  moduleId: 'module-02',
  order: 4,
  title: '2.4 - Методи та GetComponent',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Створювати власні методи з параметрами і значенням, що повертається',
    'Розуміти, навіщо виносити повторюваний код у методи',
    'Використовувати GetComponent<T>() для доступу до інших компонентів',
    'Кешувати посилання на компоненти в Awake/Start замість повторних викликів у Update',
    'Комбінувати методи, GetComponent і умови в одному скрипті',
  ],
  theory: {
    sections: [
      {
        title: 'Методи: іменовані блоки коду, що повторно використовуються',
        content: `Метод - це блок коду з іменем, який можна викликати скільки завгодно разів. Ти вже користувався готовими методами (\`Debug.Log\`, \`GetComponent\`) - тепер створимо власний:

\`\`\`csharp
public class UnitStats : MonoBehaviour
{
    private int health = 100;

    void TakeDamage(int amount)
    {
        health -= amount;
        Debug.Log("Здоровʼя: " + health);

        if (health <= 0)
        {
            Debug.Log("Юніт знищено");
        }
    }

    void Start()
    {
        TakeDamage(30);
        TakeDamage(50);
    }
}
\`\`\`

\`void\` означає, що метод **нічого не повертає**. \`(int amount)\` - **параметр**: значення, яке передається під час виклику і використовується всередині методу.

**Зроби зараз (5 хв):** створи метод \`TakeDamage(int amount)\` за прикладом, виклич його двічі з Start різними числами, перевір Console.`,
      },
      {
        title: 'Методи, що повертають значення',
        content: `Замість \`void\` метод може повертати результат - тоді тип результату вказується перед іменем методу, а всередині обовʼязковий \`return\`:

\`\`\`csharp
bool IsAlive()
{
    return health > 0;
}

int GetHealthPercent()
{
    return (health * 100) / maxHealth;
}

void Start()
{
    if (IsAlive())
    {
        Debug.Log("Юніт живий, здоровʼя: " + GetHealthPercent() + "%");
    }
}
\`\`\`

Методи, що повертають \`bool\` і названі як питання (\`IsAlive\`, \`CanJump\`, \`HasKey\`), роблять код, що його викликає, дуже читабельним: \`if (IsAlive())\` читається майже як звичайне речення.

**Зроби зараз (5 хв):** додай метод \`bool IsAlive()\` і метод \`int GetHealthPercent()\` (додай поле \`maxHealth = 100\`), використай обидва у Start через if.`,
      },
      {
        title: 'GetComponent<T>(): доступ до "сусідніх" компонентів',
        content: `GameObject часто має кілька компонентів одночасно (Transform, Renderer, Rigidbody, твої скрипти). **GetComponent<T>()** шукає компонент потрібного типу **на цьому ж GameObject** і повертає посилання на нього (або \`null\`, якщо не знайдено):

\`\`\`csharp
private Renderer rend;
private Rigidbody rb;

void Start()
{
    rend = GetComponent<Renderer>();
    rb = GetComponent<Rigidbody>();

    if (rb == null)
    {
        Debug.LogWarning("На обʼєкті немає Rigidbody!");
    }
}
\`\`\`

Кутові дужки \`<Renderer>\` - **generic**-синтаксис C#: ти повідомляєш методу, компонент **якого саме типу** шукати.

**Зроби зараз (5 хв):** на GameObject без Rigidbody виклич GetComponent<Rigidbody>() і перевір через if (rb == null), чи справді Unity поверне null - переконайся, що перевірка на null рятує від помилок NullReferenceException далі в коді.`,
      },
      {
        title: 'Кешування: чому GetComponent не місце в Update',
        content: `\`GetComponent\` - відносно "дорога" операція (Unity шукає по списку компонентів обʼєкта). Викликати її **щокадру** в Update - марна трата продуктивності, особливо коли компонент однаково той самий кожен раз.

**Правильний підхід:** викликати GetComponent **один раз** у Awake або Start, зберегти результат у приватному полі, і надалі користуватись лише цим полем:

\`\`\`csharp
private Renderer rend; // поле класу - "кеш"

void Start()
{
    rend = GetComponent<Renderer>(); // один раз
}

void Update()
{
    // rend вже готовий, GetComponent тут НЕ потрібен
    if (Input.GetKeyDown(KeyCode.Space))
    {
        rend.material.color = Color.yellow;
    }
}
\`\`\`

Це той самий принцип, що ти вже бачив у прикладі \`ColorSwitcher\` з 2.3 - там \`rend\` кешувався в Start з самого початку.

**Зроби зараз (5 хв):** перевір свій код з попередніх уроків - переконайся, що жоден GetComponent не викликається всередині Update без потреби.`,
      },
      {
        title: 'Обʼєднуємо: методи + GetComponent + if',
        content: `Зберемо все модуля 2 в одному прикладі - скрипт, що змінює колір і масштаб обʼєкта через власні методи:

\`\`\`csharp
using UnityEngine;

public class UnitController : MonoBehaviour
{
    [SerializeField] private int health = 100;
    private Renderer rend;

    void Start()
    {
        rend = GetComponent<Renderer>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            TakeDamage(25);
        }
    }

    void TakeDamage(int amount)
    {
        health -= amount;
        UpdateColorByHealth();

        if (health <= 0)
        {
            Debug.Log("Юніт знищено");
        }
    }

    void UpdateColorByHealth()
    {
        if (health > 50)
        {
            rend.material.color = Color.green;
        }
        else if (health > 0)
        {
            rend.material.color = Color.yellow;
        }
        else
        {
            rend.material.color = Color.red;
        }
    }
}
\`\`\`

Поміть: **Update** тут короткий і зрозумілий - уся "важка" логіка винесена в окремі методи (\`TakeDamage\`, \`UpdateColorByHealth\`). Це стиль, який ти будеш використовувати весь курс: Update лише "диспетчер", методи - виконавці.

**Зроби зараз (10 хв):** зберіть цей скрипт повністю, прикріпіть до Cube з матеріалом, перевірте натисканням Space кілька разів - колір має міняти зелений → жовтий → червоний.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Викликає GetComponent<T>() кожен кадр в Update',
      explanation: 'Це зайве навантаження на продуктивність, коли компонент не змінюється між кадрами.',
      correctApproach: 'Кешуй результат GetComponent в приватному полі один раз у Start чи Awake.',
    },
    {
      mistake: 'Забув return у методі, що повинен повертати значення',
      explanation: 'Метод з типом результату, відмінним від void, обовʼязково має return у кожній гілці виконання.',
      correctApproach: 'Перевір компілятор - він підкаже "not all code paths return a value", якщо return відсутній.',
    },
    {
      mistake: 'Весь код пхає прямо в Update замість винесення в методи',
      explanation: 'Довгий Update важко читати, тестувати і повторно використовувати.',
      correctApproach: 'Виносити логічно завершені дії (TakeDamage, UpdateColor, CheckGrounded) в окремі методи, а Update лишати "диспетчером".',
    },
  ],
  summary:
    'Ти навчився створювати власні методи з параметрами й значенням, що повертається, отримувати доступ до компонентів через GetComponent<T>(), кешувати посилання замість повторних викликів у Update і структурувати код так, щоб Update лишався коротким і зрозумілим.',
  practiceTask: {
    title: 'Практика: контролер юніта з методами (~30 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** скрипт \`UnitController\`, який реагує на клавіші через власні методи і GetComponent.

### Part A - Базові методи (разом / 12 хв)
1. Створи скрипт \`UnitController\` з [SerializeField] private int health = 100.
2. Додай метод \`void TakeDamage(int amount)\` - зменшує health і виводить у Console.
3. Додай метод \`bool IsAlive()\` - повертає health > 0.

### Part B - GetComponent і колір (самі / 13-15 хв)
1. Закешуй Renderer в Start у приватне поле.
2. Створи метод \`void UpdateColorByHealth()\` за прикладом з теорії (зелений/жовтий/червоний).
3. В Update: по Space викликай TakeDamage(20), а потім UpdateColorByHealth().
4. Коли IsAlive() поверне false - виведи окреме повідомлення в Console і зупини подальші виклики TakeDamage (можна через if на початку TakeDamage).

### Критерій "зараховано"
- Мінімум 3 власних методи, серед них хоча б один з параметром і хоча б один, що повертає значення
- GetComponent<Renderer>() закешований, а не викликається в Update
- Колір реально змінюється відповідно до рівня здоровʼя`,
    hints: [
      'return всередині if має покривати всі можливі гілки методу',
      'GetComponent<Renderer>() шукає саме на цьому GameObject - переконайся, що Renderer там є',
      'Винось логіку в окремі методи навіть якщо здається, що "простіше написати прямо в Update"',
    ],
    optionalChallenge:
      'Додай метод \`void Heal(int amount)\`, який збільшує health, але не більше maxHealth (підказка: Mathf.Min(health, maxHealth)), і виклич його по клавіші H.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що означає ключове слово void перед іменем методу?',
        options: [
          'Метод приватний',
          'Метод нічого не повертає',
          'Метод викликається автоматично',
          'Метод повертає число 0',
        ],
        correctAnswer: 1,
        explanation: 'void означає, що метод не має значення, що повертається.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що робить GetComponent<Rigidbody>(), якщо на GameObject немає компонента Rigidbody?',
        options: [
          'Автоматично додає Rigidbody',
          'Повертає null',
          'Викликає помилку компіляції',
          'Зупиняє гру',
        ],
        correctAnswer: 1,
        explanation: 'GetComponent повертає null, якщо відповідний компонент не знайдено на обʼєкті.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Чому не варто викликати GetComponent щокадру в Update?',
        options: [
          'Це заборонено синтаксисом C#',
          'Це зайве навантаження на продуктивність без потреби',
          'Update не підтримує GetComponent',
          'Це видаляє компонент',
        ],
        correctAnswer: 1,
        explanation: 'GetComponent - відносно витратна операція; краще кешувати результат один раз.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Метод оголошено як `bool IsAlive()`. Що обовʼязково має бути всередині?',
        options: [
          'Виклик Debug.Log',
          'Оператор return, що повертає bool-значення',
          'Параметр типу int',
          'Цикл for',
        ],
        correctAnswer: 1,
        explanation: 'Метод з типом результату, відмінним від void, повинен мати return з відповідним типом.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Навіщо виносити логіку з Update в окремі методи, як TakeDamage чи UpdateColor?',
        options: [
          'Це обовʼязкова вимога компілятора',
          'Це робить Update коротшим, зрозумілішим і легшим для повторного використання',
          'Це прискорює компіляцію в 10 разів',
          'Update не може містити більше одного рядка коду',
        ],
        correctAnswer: 1,
        explanation: 'Розбиття на методи - практика чистого коду: Update лишається "диспетчером" логіки.',
      },
    ],
  },
}

export const ukLesson25 = {
  lessonId: 'lesson-unity-2-5',
  moduleId: 'module-02',
  order: 5,
  title: '2.5 - Checkpoint: керований куб',
  theoryMinutes: 20,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Обʼєднати MonoBehaviour, змінні, if, Input, методи і GetComponent в один скрипт',
    'Самостійно спроєктувати структуру скрипта-контролера',
    'Перевірити роботу через Play mode і Console',
    'Оцінити власний код за рубрикою чистоти й читабельності',
  ],
  theory: {
    sections: [
      {
        title: 'Що зібралось у голові за модуль 2',
        content: `За чотири уроки ти пройшов шлях від "порожнього скрипта" до повноцінного контролера з логікою. Коротко, що вже в тебе в руках:

- **2.1**: MonoBehaviour, Awake/Start/Update, прикріплення скрипта, Console
- **2.2**: змінні (int, float, string, bool, Vector3), public/private, [SerializeField]
- **2.3**: if/else if/else, Input.GetKey/GetKeyDown/GetKeyUp, && і ||, Time.deltaTime
- **2.4**: власні методи з параметрами й return, GetComponent<T>(), кешування

Сьогодні - не нова тема, а **збірка**: керований куб, який рухається клавішами, змінює колір і має просту логіку здоровʼя, повністю написана тобою без покрокової копії коду з попередніх уроків.

**Зроби зараз (2 хв):** відкрий свій проєкт, переконайся, що всі скрипти з 2.1-2.4 компілюються без помилок перед тим, як починати новий.`,
      },
      {
        title: 'Чекліст перед практикою',
        content: `- [ ] Розумію Awake vs Start vs Update
- [ ] Вмію оголошувати [SerializeField] private поля різних типів
- [ ] Впевнено пишу if/else if/else і комбіную && / ||
- [ ] Знаю різницю GetKey / GetKeyDown / GetKeyUp
- [ ] Вмію писати методи з параметрами і з return
- [ ] Вмію GetComponent<T>() і кешувати результат у Start
- [ ] Рух множу на Time.deltaTime

Якщо якийсь пункт викликає сумнів - поверни до відповідного уроку 2.1-2.4 перед тим, як братись за checkpoint-практику.`,
      },
      {
        title: 'Як викладач оцінює цей урок (рубрика)',
        content: `| Рівень | Що видно в коді/сцені | Типовий коментар викладача |
|--------|--------------------------|------------------------------|
| **Не зараховано** | Скрипт не компілюється / куб не рухається / немає жодного [SerializeField] | «Дороби базовий рух і перевір компіляцію» |
| **Зараховано** | Куб рухається клавішами, є хоча б одна умова if, хоча б один власний метод | «Базовий контролер працює» |
| **Добре** | Кешований GetComponent, зрозумілі імена, Update короткий і читабельний | «Готовий структурний стиль для M3» |
| **Відмінно** | Health/damage система, зміна кольору за станом, чистий поділ на методи | «Показовий приклад для портфоліо» |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Копіює код з попередніх уроків без розуміння, що робить кожен рядок',
      explanation: 'Checkpoint перевіряє саме розуміння, а не здатність скопіювати.',
      correctApproach: 'Спробуй писати кожен блок самостійно, звіряючись з попередніми уроками лише за потреби, а не копіюючи одразу все.',
    },
    {
      mistake: 'Весь код в одному величезному Update без методів',
      explanation: 'Це працює, але суперечить стилю чистого коду, вивченому в 2.4.',
      correctApproach: 'Виніси хоча б рух, зміну кольору і здоровʼя в окремі методи - Update має лишатись диспетчером.',
    },
  ],
  summary:
    'Ти зібрав повноцінний керований куб: рух клавішами з Time.deltaTime, зміна кольору через GetComponent<Renderer>(), проста система здоровʼя з власними методами і умовами - усе обʼєднано в один структурований скрипт, готовий до фізики в модулі 3.',
  practiceTask: {
    title: 'Checkpoint практика: керований куб (~35 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** повністю самостійний скрипт-контролер куба, що поєднує все з модуля 2.

### Part A - Рух і взаємодія (самостійно, спираючись на 2.1-2.4, 20 хв)
1. Створи скрипт \`CubeController\`, прикріпи до Cube з матеріалом.
2. Рух по WASD через transform.position і Time.deltaTime (швидкість - [SerializeField] float).
3. По клавіші Space виклич метод \`TakeDamage(int amount)\`, що зменшує health (SerializeField int, стартове значення 100).
4. Метод \`UpdateColorByHealth()\` міняє колір залежно від health (зелений/жовтий/червоний), використовуючи закешований у Start Renderer.

### Part B - Самоперевірка (10 хв)
1. Пройдись чеклістом із теорії.
2. Перевір Console на помилки й попередження.
3. Порівняй свій результат з рівнями рубрики.

### Part C - Здача + челендж (5 хв)
1. Збережи сцену і скрипт.
2. **Челендж:** додай метод \`bool IsAlive()\` і зупини рух і TakeDamage, якщо IsAlive() повертає false.

### Критерій "зараховано"
- Куб рухається клавішами з Time.deltaTime
- Space зменшує health через власний метод TakeDamage
- Колір міняється відповідно до health
- GetComponent<Renderer>() закешований у Start`,
    hints: [
      'Почни з руху - це найпростіше перевірити візуально',
      'Здоровʼя і колір - окремі методи, які викликаються одне за одним',
      'Якщо застряг - подивись відповідний урок 2.1-2.4, а не сусідній проєкт',
    ],
    optionalChallenge:
      'Додай другий Cube з таким самим скриптом, але іншим стартовим health - переконайся, що кожен екземпляр має власне незалежне значення.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Для чого потрібен Time.deltaTime у русі персонажа?',
        options: [
          'Для випадкового руху',
          'Щоб швидкість руху не залежала від частоти кадрів',
          'Щоб вимкнути гравітацію',
          'Це декоративний параметр без впливу',
        ],
        correctAnswer: 1,
        explanation: 'Time.deltaTime робить рух рівномірним у секундах незалежно від FPS.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Де правильно кешувати результат GetComponent<Renderer>()?',
        options: ['В Update кожен кадр', 'В Start чи Awake один раз', 'У методі TakeDamage', 'У конструкторі класу'],
        correctAnswer: 1,
        explanation: 'Кешування в Start/Awake уникає повторних дорогих викликів GetComponent.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Яка структура коду вважається хорошим стилем за підсумками модуля 2?',
        options: [
          'Весь код в одному Update без методів',
          'Update короткий, логіка винесена в окремі методи',
          'Використання лише публічних полів',
          'Відсутність коментарів і імен',
        ],
        correctAnswer: 1,
        explanation: 'Розбиття на методи покращує читабельність і повторне використання коду.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що перевіряє Checkpoint-урок насамперед?',
        options: [
          'Здатність скопіювати чужий код',
          'Самостійне застосування вже вивченого матеріалу модуля',
          'Знання нової теми, яка ще не вивчалась',
          'Швидкість набору тексту',
        ],
        correctAnswer: 1,
        explanation: 'Checkpoint перевіряє впевненість у застосуванні вивченого, а не нові теми.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Два Cube мають однаковий скрипт CubeController з різними стартовими значеннями health в Inspector. Що станеться?',
        options: [
          'Обидва матимуть однакове health, бо код той самий',
          'Кожен GameObject матиме власне незалежне значення health',
          'Unity видасть помилку дублювання',
          'Другий Cube перезапише health першого',
        ],
        correctAnswer: 1,
        explanation: 'Кожен екземпляр компонента на своєму GameObject зберігає власні серіалізовані значення.',
      },
    ],
  },
}
