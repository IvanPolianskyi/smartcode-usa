/** Unity Module 03 UK - Фізика */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson31 = {
  lessonId: 'lesson-unity-3-1',
  moduleId: 'module-03',
  order: 1,
  title: '3.1 - Rigidbody і гравітація',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Розуміти призначення компонента Rigidbody',
    'Вмикати і вимикати гравітацію через Use Gravity',
    'Розрізняти рух через Transform і рух через фізику (AddForce/velocity)',
    'Використовувати FixedUpdate для фізичного коду',
    'Налаштовувати Mass, Drag і Constraints',
  ],
  theory: {
    sections: [
      {
        title: 'Rigidbody: коли обʼєктом керує фізика, а не ти',
        content: `Досі всі рухи ти робив вручну, змінюючи \`transform.position\` в коді. Це працює, але не враховує гравітацію, зіткнення чи інерцію - обʼєкт просто "телепортується" на нову позицію кожен кадр.

**Rigidbody** - компонент, який передає обʼєкт під контроль **фізичного движка Unity**: тепер на нього діють гравітація, сили, зіткнення з іншими фізичними обʼєктами. Додай його через **Add Component → Physics → Rigidbody**.

Одразу після додавання Rigidbody кубу, що висить у повітрі, і натискання Play - куб **впаде** під дією гравітації. Це відбувається автоматично, без жодного коду.

**Зроби зараз (5 хв):** створи Cube трохи над Plane (Position Y ≈ 3), додай Rigidbody, натисни Play - спостерігай падіння. Зупини Play.`,
      },
      {
        title: 'Use Gravity, Mass, Drag',
        content: `У Inspector компонента Rigidbody є ключові поля:

| Поле | Що робить | Типове значення |
|------|-----------|-------------------|
| **Use Gravity** | Чи діє гравітація на обʼєкт | true (увімкнено) |
| **Mass** | "Вага" для розрахунків сили і зіткнень | 1 для звичайних обʼєктів |
| **Drag** | Опір рухові (як повітря/тертя) | 0 - без опору, вище - гальмує швидше |
| **Angular Drag** | Те саме, але для обертання | 0.05 за замовчуванням |
| **Is Kinematic** | Якщо true - фізика ігнорує обʼєкт, керуєш ним вручну через Transform | false для більшості випадків |

**Mass** впливає на те, як сильно обʼєкт "штовхає" інші при зіткненні: важчий Rigidbody зрушить легший при однаковій силі удару значно сильніше, ніж навпаки.

**Зроби зараз (5 хв):** зроби Mass = 5, подивись, чи падіння виглядає інакше (спойлер: сама швидкість падіння від гравітації не залежить від Mass, а от сила зіткнення - залежить).`,
      },
      {
        title: 'AddForce і velocity: рух через фізику, а не Transform',
        content: `Коли на обʼєкті є Rigidbody, **не можна** просто змінювати \`transform.position\` в Update, як раніше - фізичний движок і твій ручний код "конфліктуватимуть", рух виглядатиме сіпаним. Замість цього використовуй фізичні методи:

\`\`\`csharp
using UnityEngine;

public class SimplePhysicsMove : MonoBehaviour
{
    [SerializeField] private float force = 5f;
    private Rigidbody rb;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        if (Input.GetKey(KeyCode.W))
        {
            rb.AddForce(Vector3.forward * force);
        }
    }
}
\`\`\`

\`AddForce\` штовхає обʼєкт силою, яка враховує Mass і накопичується як імпульс (обʼєкт продовжує рухатись за інерцією, навіть коли клавішу відпустили - як реальний штовхнутий предмет).

**Зроби зараз (7 хв):** створи скрипт \`SimplePhysicsMove\`, прикріпи до кубу з Rigidbody на плоскій підлозі, перевір рух по W через AddForce.`,
      },
      {
        title: 'FixedUpdate: окремий такт для фізики',
        content: `**FixedUpdate()** - ще один метод життєвого циклу MonoBehaviour, який викликається **з фіксованою частотою** (за замовчуванням - кожні 0.02 секунди, тобто 50 разів на секунду), **незалежно** від частоти кадрів рендерингу (яку контролює Update).

**Правило:** увесь код, що напряму взаємодіє з Rigidbody (AddForce, зміна velocity), пиши в **FixedUpdate**, а не в Update. Це дає стабільну, передбачувану фізику незалежно від того, скільки кадрів рендерить компʼютер гравця.

Зчитувати ж **Input** (натискання клавіш) краще в звичайному Update, бо FixedUpdate може "пропустити" швидке натискання-відпускання клавіші між своїми фіксованими тактами:

\`\`\`csharp
private bool jumpPressed;

void Update()
{
    if (Input.GetKeyDown(KeyCode.Space))
    {
        jumpPressed = true;
    }
}

void FixedUpdate()
{
    if (jumpPressed)
    {
        rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);
        jumpPressed = false;
    }
}
\`\`\`

**Зроби зараз (5 хв):** заміни свій AddForce-код так, щоб зчитування Input.GetKey лишалось прямо в FixedUpdate для простоти (для утримуваних клавіш GetKey це прийнятно; для GetKeyDown-подій використовуй патерн з прикладу вище).`,
      },
      {
        title: 'Constraints: обмеження руху й обертання',
        content: `Іноді потрібно дозволити фізиці діяти лише частково. **Constraints** (розділ Inspector Rigidbody) дозволяють заблокувати рух чи обертання по конкретних осях:

- **Freeze Position** X/Y/Z - обʼєкт не рухатиметься по вибраній осі (наприклад, персонаж 2.5D, що не має "з'їжджати" по Z)
- **Freeze Rotation** X/Y/Z - обʼєкт не перевертатиметься від фізичних поштовхів (типово: заблокувати X і Z, лишивши обертання лише по Y для персонажа, що не повинен "падати на бік")

Без **Freeze Rotation** на X/Z фізичний персонаж часто "перекидається" від найменшого поштовху - типова проблема новачків при першому знайомстві з Rigidbody-персонажами (буде особливо актуально в модулі 4).

**Зроби зараз (5 хв):** увімкни Freeze Rotation X і Z на своєму Cube, штовхни його AddForce збоку - переконайся, що він ковзає, не перекидаючись.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Змінює transform.position напряму на обʼєкті з Rigidbody',
      explanation: 'Це "перебиває" фізичний движок і призводить до сіпаного, непередбачуваного руху та проблем зі зіткненнями.',
      correctApproach: 'На обʼєктах з Rigidbody рухай через rb.AddForce, rb.velocity або rb.MovePosition, а не transform.position.',
    },
    {
      mistake: 'Пише фізичний код (AddForce) в Update замість FixedUpdate',
      explanation: 'Update викликається з непостійною частотою, залежною від FPS, що робить фізику нестабільною.',
      correctApproach: 'Увесь код з Rigidbody.AddForce чи зміною velocity пиши в FixedUpdate.',
    },
    {
      mistake: 'Персонаж/обʼєкт постійно перекидається набік від найменшого поштовху',
      explanation: 'Немає обмежень Freeze Rotation на осях X і Z.',
      correctApproach: 'Увімкни Constraints → Freeze Rotation X і Z, лишивши вільним лише Y (для повороту персонажа).',
    },
  ],
  summary:
    'Ти додав Rigidbody і зрозумів, як гравітація впливає на обʼєкт автоматично, навчився штовхати обʼєкти через AddForce у FixedUpdate замість зміни Transform напряму та застосував Constraints для стабільної фізичної поведінки.',
  practiceTask: {
    title: 'Практика: перший фізичний обʼєкт (~25 хв)',
    difficulty: 'beginner',
    description: `**Мета:** Cube з Rigidbody, який падає під гравітацією і рухається через AddForce без перекидання.

### Part A - Падіння (разом / 8 хв)
1. Створи Cube над Plane (Position Y ≈ 3), додай Rigidbody.
2. Play - переконайся, що падає і зупиняється на підлозі (додай Rigidbody-friendly матеріал за потреби, або поки просто спостерігай падіння).

### Part B - Рух через AddForce (самі / 12-15 хв)
1. Створи скрипт \`SimplePhysicsMove\` зі SerializeField force.
2. У FixedUpdate додай AddForce по WASD (Vector3.forward/back/left/right * force).
3. Увімкни Freeze Rotation X і Z в Constraints, перевір, що куб не перекидається при русі.

### Критерій "зараховано"
- Rigidbody доданий, обʼєкт падає під гравітацією
- Рух здійснюється через AddForce у FixedUpdate, а не через transform.position
- Обʼєкт не перекидається набік при русі (Freeze Rotation застосовано)`,
    hints: [
      'AddForce накопичує імпульс - обʼєкт продовжує рухатись навіть після відпускання клавіші, це нормально',
      'Фізичний код - завжди в FixedUpdate, зчитування клавіш зручно тримати в Update',
      'Якщо куб перекидається - перевір Freeze Rotation X/Z в Constraints',
    ],
    optionalChallenge:
      'Додай ForceMode.Impulse для одноразового "стрибка" вгору по Space (rb.AddForce(Vector3.up * 5f, ForceMode.Impulse)) - різницю з накопичувальним AddForce відчуєш на дотик.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що робить компонент Rigidbody?',
        options: [
          'Додає текстуру обʼєкту',
          'Передає обʼєкт під контроль фізичного движка (гравітація, сили, зіткнення)',
          'Змінює колір матеріалу',
          'Прискорює рендеринг',
        ],
        correctAnswer: 1,
        explanation: 'Rigidbody дозволяє фізичному движку керувати рухом і взаємодіями обʼєкта.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Де правильно писати код з rb.AddForce()?',
        options: ['В Update', 'В FixedUpdate', 'В Awake', 'У конструкторі'],
        correctAnswer: 1,
        explanation: 'Фізичний код виконується з фіксованою частотою в FixedUpdate для стабільності.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Чому не варто змінювати transform.position напряму на обʼєкті з Rigidbody?',
        options: [
          'Unity заборонить компіляцію',
          'Це конфліктує з фізичним движком і дає сіпаний рух',
          'Це видаляє Rigidbody',
          'Це вимикає гравітацію назавжди',
        ],
        correctAnswer: 1,
        explanation: 'Ручна зміна Transform "перебиває" розрахунки фізики, тому рух стає непередбачуваним.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що робить Freeze Rotation X і Z у Constraints?',
        options: [
          'Забороняє обʼєкту рухатись взагалі',
          'Забороняє обертання по осях X і Z, лишаючи Y вільним',
          'Вимикає гравітацію',
          'Збільшує масу обʼєкта',
        ],
        correctAnswer: 1,
        explanation: 'Це запобігає "перекиданню" обʼєкта набік від фізичних поштовхів.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Яке поле Rigidbody вмикає/вимикає дію гравітації?',
        options: ['Mass', 'Use Gravity', 'Drag', 'Is Kinematic'],
        correctAnswer: 1,
        explanation: 'Use Gravity визначає, чи діє на обʼєкт сила тяжіння.',
      },
    ],
  },
}

export const ukLesson32 = {
  lessonId: 'lesson-unity-3-2',
  moduleId: 'module-03',
  order: 2,
  title: '3.2 - Colliders: тверді й проходні обʼєкти',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Розуміти призначення Collider і різні його типи',
    'Розрізняти Collider і Rigidbody',
    'Використовувати Is Trigger для проходних зон',
    'Правильно комбінувати Collider + Rigidbody для роботи фізики',
    'Оптимізувати форму Collider для продуктивності',
  ],
  theory: {
    sections: [
      {
        title: 'Collider: невидимі межі для зіткнень',
        content: `**Collider** визначає **фізичну форму** обʼєкта для розрахунків зіткнень - на відміну від Mesh Renderer, який визначає лише **візуальну** форму. Це два окремі компоненти, і вони не завжди повинні збігатися один з одним.

Кожен примітив (Cube, Sphere, Plane) отримує відповідний Collider автоматично при створенні:

| Форма | Collider за замовчуванням |
|-------|------------------------------|
| Cube | Box Collider |
| Sphere | Sphere Collider |
| Cylinder / Capsule | Capsule Collider |
| Plane | Mesh Collider |
| Складна модель | Mesh Collider (точний, але "дорожчий" для продуктивності) |

**Зроби зараз (5 хв):** виділи будь-який Cube в сцені, знайди компонент Box Collider в Inspector - зверни увагу на жовту дротяну рамку навколо обʼєкта в Scene view, яка й показує межі Collider.`,
      },
      {
        title: 'Collider без Rigidbody vs Collider + Rigidbody',
        content: `**Важливо розуміти комбінації:**

- **Collider без Rigidbody** = статичний твердий обʼєкт (стіна, підлога) - не рухається, але блокує все, що на нього налітає.
- **Collider + Rigidbody** = динамічний фізичний обʼєкт - рухається під дією гравітації й сил, взаємодіє з іншими Collider.
- **Rigidbody без Collider** = обʼєкт падатиме під гравітацією, але **пройде крізь усе** - зіткнень не буде взагалі.

Типова помилка новачків - додати Rigidbody, забути перевірити, чи є Collider на обʼєкті (зазвичай він є за замовчуванням у примітивів, але може бути видалений випадково).

**Зроби зараз (5 хв):** тимчасово видали Box Collider з падаючого Cube (з 3.1), запусти Play - подивись, як він провалюється крізь підлогу. Поверни Collider назад.`,
      },
      {
        title: 'Is Trigger: коли зіткнення не має бути "твердим"',
        content: `Іноді потрібна зона, яку персонаж **проходить наскрізь**, але гра при цьому "помічає" факт входу - двері, чек-пойнти, зони пікапу монет. Для цього на Collider вмикається прапорець **Is Trigger**.

| Стан Is Trigger | Поведінка |
|--------------------|-----------|
| **false** (за замовчуванням) | Обʼєкт твердий, блокує рух інших |
| **true** | Обʼєкт проходний, але Unity все одно "помічає" перетин і викликає спеціальні методи в коді (тема 3.3) |

Trigger-зони **не обов'язково видимі** - типово Mesh Renderer вимикають (або взагалі не додають), лишаючи лише невидимий Collider з Is Trigger = true. Гравець бачить лише ефект (текст "монета зібрана"), а не саму геометрію тригера.

**Зроби зараз (5 хв):** створи Cube, вимкни на ньому Mesh Renderer (галочка в компоненті), увімкни Is Trigger на Box Collider - тепер це невидима проходна зона.`,
      },
      {
        title: 'Форма Collider: коли простіше - краще',
        content: `Складна модель персонажа чи меблів має тисячі полігонів, і використання **Mesh Collider** з точною копією цієї форми - дорого для продуктивності, особливо коли таких обʼєктів багато в сцені одночасно.

**Правило оптимізації:** де можливо, використовуй прості форми - **Box Collider**, **Sphere Collider**, **Capsule Collider** - навіть якщо вони не ідеально повторюють візуальну модель. Гравець рідко помічає невелику неточність меж зіткнення, а продуктивність виграє суттєво.

Для складних статичних обʼєктів (рельєф рівня, будівлі) Mesh Collider виправданий, оскільки вони не рухаються і фізичні розрахунки для них простіші (Unity не обробляє зіткнення двох рухомих Mesh Collider так само ефективно, як прості форми).

**Зроби зараз (3 хв):** знайди в Project будь-яку складнішу модель (або уяви персонажа) і обміркуй: чи достатньо для неї буде Capsule Collider замість точного Mesh Collider.`,
      },
      {
        title: 'Практичний приклад: підлога, стіна, тригер-зона',
        content: `Зберемо разом три типи Collider-використання в одній міні-сцені:

1. **Floor** (Plane) - Mesh Collider за замовчуванням, без Rigidbody - статична тверда підлога.
2. **Wall** (Cube) - Box Collider, без Rigidbody - статична тверда стіна.
3. **PickupZone** (Cube, Mesh Renderer вимкнено) - Box Collider з **Is Trigger = true**, без Rigidbody на самому тригері (Rigidbody потрібен лише на **одному** з двох учасників зіткнення - зазвичай на персонажі).

**Важливе правило Unity:** для спрацювання зіткнення чи тригера **хоча б один** з двох обʼєктів, що перетинаються, повинен мати Rigidbody (не обовʼязково kinematic чи ні - головне, щоб він був хоч на одному з двох).

**Зроби зараз (7 хв):** зібери цю міні-сцену: підлога, стіна, невидима тригер-зона. Проведи по ній Rigidbody-Cube з 3.1 (з клавіатурним керуванням) - переконайся, що він блокується стіною, але проходить крізь тригер-зону.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Обʼєкт з Rigidbody провалюється крізь підлогу',
      explanation: 'На обʼєкті або на підлозі відсутній Collider (можливо, випадково видалений).',
      correctApproach: 'Перевір наявність Collider на обох обʼєктах - і на тому, що падає, і на тому, на що має впасти.',
    },
    {
      mistake: 'Тригер-зона блокує рух персонажа замість пропускання',
      explanation: 'Is Trigger не увімкнено на Collider тригер-зони.',
      correctApproach: 'Перевір, що прапорець Is Trigger активний саме на цьому Collider.',
    },
    {
      mistake: 'Зіткнення чи тригер взагалі не спрацьовує',
      explanation: 'Жоден з двох обʼєктів, що перетинаються, не має Rigidbody.',
      correctApproach: 'Переконайся, що хоча б один з учасників (зазвичай персонаж) має компонент Rigidbody.',
    },
  ],
  summary:
    'Ти зрозумів різницю між Collider і Rigidbody, навчився комбінувати їх для статичних і динамічних обʼєктів, використав Is Trigger для проходних зон і засвоїв правило оптимізації форми Collider для продуктивності.',
  practiceTask: {
    title: 'Практика: підлога, стіна і невидима зона (~25 хв)',
    difficulty: 'beginner',
    description: `**Мета:** міні-сцена, що демонструє три типи використання Collider.

### Part A - Статичні обʼєкти (разом / 10 хв)
1. Створи \`Floor\` (Plane) і \`Wall\` (Cube) без Rigidbody - переконайся, що в обох є Collider.
2. Перевір Play: рухомий Rigidbody-обʼєкт з 3.1 має блокуватись стіною і стояти на підлозі.

### Part B - Тригер-зона (самі / 10-15 хв)
1. Створи Cube \`PickupZone\`, вимкни Mesh Renderer, увімкни Is Trigger на Collider.
2. Проведи керований обʼєкт крізь \`PickupZone\` - переконайся, що він проходить наскрізь, не зупиняючись.

### Критерій "зараховано"
- Стіна блокує рух рухомого обʼєкта
- Підлога тримає обʼєкт, не даючи провалитись
- Тригер-зона пропускає обʼєкт наскрізь без блокування`,
    hints: [
      'Жовта дротяна рамка в Scene view показує межі Collider - перевіряй її розмір і позицію',
      'Is Trigger - галочка прямо в компоненті Collider, не окремий компонент',
      'Хоча б один учасник зіткнення повинен мати Rigidbody',
    ],
    optionalChallenge:
      'Додай другу тригер-зону іншого розміру і форми (Sphere Collider з Is Trigger) поруч зі стіною - перевір, що зіткнення й тригер можуть існувати одночасно в одній сцені без конфлікту.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Чим Collider відрізняється від Mesh Renderer?',
        options: [
          'Це те саме, просто інша назва',
          'Collider визначає фізичну форму для зіткнень, Mesh Renderer - візуальний вигляд',
          'Collider відповідає лише за колір',
          'Mesh Renderer потрібен для фізики, а Collider - для графіки',
        ],
        correctAnswer: 1,
        explanation: 'Це два незалежні компоненти: один для фізики зіткнень, інший для рендерингу.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що станеться з падаючим Rigidbody-обʼєктом, якщо на підлозі немає Collider?',
        options: [
          'Обʼєкт зупиниться в повітрі',
          'Обʼєкт провалиться крізь підлогу',
          'Unity видасть помилку компіляції',
          'Гравітація автоматично вимкнеться',
        ],
        correctAnswer: 1,
        explanation: 'Без Collider на підлозі немає фізичної межі, тому обʼєкт проходить наскрізь.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Що робить прапорець Is Trigger на Collider?',
        options: [
          'Видаляє Collider',
          'Робить обʼєкт проходним, зберігаючи виявлення перетину',
          'Вимикає гравітацію на обʼєкті',
          'Збільшує швидкість обʼєкта',
        ],
        correctAnswer: 1,
        explanation: 'Is Trigger дозволяє обʼєктам проходити крізь Collider, водночас Unity фіксує факт перетину.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Яку умову Unity вимагає для спрацювання зіткнення чи тригера між двома обʼєктами?',
        options: [
          'Обидва повинні мати Rigidbody',
          'Хоча б один з двох обʼєктів повинен мати Rigidbody',
          'Жоден не повинен мати Rigidbody',
          'Лише статичні обʼєкти можуть взаємодіяти',
        ],
        correctAnswer: 1,
        explanation: 'Достатньо, щоб Rigidbody був хоча б на одному з двох учасників перетину.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Чому для складної моделі персонажа зазвичай обирають Capsule Collider замість точного Mesh Collider?',
        options: [
          'Capsule Collider виглядає красивіше',
          'Проста форма дешевша для продуктивності, ніж точна копія складної моделі',
          'Mesh Collider не працює з Rigidbody',
          'Capsule Collider обовʼязковий для всіх обʼєктів',
        ],
        correctAnswer: 1,
        explanation: 'Прості форми Collider значно легші для фізичних розрахунків, ніж детальний Mesh Collider.',
      },
    ],
  },
}

export const ukLesson33 = {
  lessonId: 'lesson-unity-3-3',
  moduleId: 'module-03',
  order: 3,
  title: '3.3 - OnCollisionEnter та OnTriggerEnter',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Використовувати OnCollisionEnter для реакції на тверді зіткнення',
    'Використовувати OnTriggerEnter для реакції на проходні зони',
    'Читати інформацію про інший обʼєкт через Collision і Collider параметри',
    'Перевіряти обʼєкт за тегом (CompareTag)',
    'Розрізняти Enter, Stay та Exit варіанти цих подій',
  ],
  theory: {
    sections: [
      {
        title: 'OnCollisionEnter: код реагує на тверде зіткнення',
        content: `Коли два обʼєкти з Collider (і хоча б одним Rigidbody) **фізично стикаються** (Is Trigger = false на обох), Unity автоматично викликає метод **OnCollisionEnter** на скриптах обох обʼєктів:

\`\`\`csharp
using UnityEngine;

public class BounceLogger : MonoBehaviour
{
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Зіткнення з: " + collision.gameObject.name);
    }
}
\`\`\`

\`collision\` - параметр типу **Collision**, що містить інформацію про зіткнення: з яким обʼєктом (\`collision.gameObject\`), точку контакту, силу удару та інше.

Цей метод, як і Start/Update, **не викликається тобою вручну** - Unity сам знаходить його за назвою на скрипті, якщо вона написана точно (з великої літери, без помилок у написанні).

**Зроби зараз (5 хв):** створи скрипт \`BounceLogger\` за прикладом, прикріпи до Rigidbody-Cube з 3.1, кинь його на підлогу - подивись повідомлення в Console при ударі.`,
      },
      {
        title: 'OnTriggerEnter: код реагує на прохід крізь тригер',
        content: `Для Collider з **Is Trigger = true** використовується інший метод - **OnTriggerEnter**, з іншим типом параметра:

\`\`\`csharp
using UnityEngine;

public class PickupZone : MonoBehaviour
{
    void OnTriggerEnter(Collider other)
    {
        Debug.Log("Хтось увійшов у зону: " + other.gameObject.name);
    }
}
\`\`\`

Зверни увагу: параметр називається \`other\` і має тип **Collider** (не Collision!) - у тригера немає "сили удару" чи точки контакту, лише факт перетину меж.

**Правило вибору:** якщо Collider обʼєкта, на який прикріплюєш скрипт, має Is Trigger = **false** - працює OnCollisionEnter. Якщо Is Trigger = **true** - працює OnTriggerEnter. Використання не того методу для типу Collider - метод просто ніколи не викликається, без явної помилки.

**Зроби зараз (5 хв):** створи скрипт \`PickupZone\`, прикріпи до тригер-зони з 3.2, пройди крізь неї керованим обʼєктом - перевір Console.`,
      },
      {
        title: 'CompareTag: перевірка, хто саме торкнувся',
        content: `У реальній грі важливо реагувати по-різному залежно від **типу** обʼєкта, що зіткнувся - персонаж, ворог, куля. Для цього використовують **Tag** - мітку, яку призначають GameObject в Inspector (**Tag** dropdown вгорі, поруч з Layer).

\`\`\`csharp
void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Player"))
    {
        Debug.Log("Гравець зібрав предмет!");
        Destroy(gameObject);
    }
    else
    {
        Debug.Log("Щось інше торкнулось зони: " + other.gameObject.name);
    }
}
\`\`\`

\`CompareTag("Player")\` швидший і безпечніший за порівняння рядків через \`==\`, оскільки Unity перевіряє це на внутрішньому рівні без створення нових рядкових обʼєктів. \`Destroy(gameObject)\` видаляє обʼєкт зі сцени - типова дія для зібраної монети чи знищеного ворога (детальніше про Destroy - у 3.4 разом з Instantiate).

Новий тег створюється через **Tag dropdown → Add Tag...** в Inspector, якщо стандартних (Player, Untagged, тощо) не вистачає.

**Зроби зараз (7 хв):** признач тег \`Player\` своєму керованому обʼєкту, онови \`PickupZone\`, щоб реагувала лише на цей тег, перевір реакцію Debug.Log при вході саме персонажа.`,
      },
      {
        title: 'Enter, Stay, Exit: три моменти взаємодії',
        content: `Крім \`*Enter\`, існують парні методи для **триваючого** контакту і **завершення** контакту:

| Подія | Коли викликається | Приклад використання |
|-------|----------------------|------------------------|
| **OnCollisionEnter / OnTriggerEnter** | Момент першого контакту | Отримати урон, зібрати предмет |
| **OnCollisionStay / OnTriggerStay** | Кожен кадр, поки контакт триває | Стояння на "лаві з шипами", що завдає урон з часом |
| **OnCollisionExit / OnTriggerExit** | Момент виходу з контакту | Вийти із зони уповільнення, зникнення підсвітки |

\`\`\`csharp
void OnTriggerExit(Collider other)
{
    if (other.CompareTag("Player"))
    {
        Debug.Log("Гравець покинув зону");
    }
}
\`\`\`

**Обережно з Stay-варіантами:** вони викликаються **кожен кадр** контакту (аналогічно до Update) - логіка всередині має бути легкою і, за потреби, обмежена умовами (наприклад, дамаг раз на секунду, а не щокадру).

**Зроби зараз (5 хв):** додай OnTriggerExit у \`PickupZone\` з Debug.Log про вихід персонажа із зони.`,
      },
      {
        title: 'Практичний приклад: небезпечна зона з уроном по часу',
        content: `Обʼєднаємо Stay-подію з таймером, щоб не спамити уроном щокадру:

\`\`\`csharp
using UnityEngine;

public class DamageZone : MonoBehaviour
{
    [SerializeField] private int damagePerTick = 5;
    [SerializeField] private float tickInterval = 1f;
    private float timer;

    void OnTriggerStay(Collider other)
    {
        if (!other.CompareTag("Player")) return;

        timer += Time.deltaTime;
        if (timer >= tickInterval)
        {
            Debug.Log("Урон гравцю: " + damagePerTick);
            timer = 0f;
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            timer = 0f;
        }
    }
}
\`\`\`

Тут \`if (!other.CompareTag("Player")) return;\` - патерн **раннього виходу**: якщо умова не виконана, метод одразу завершується, і решта коду не виконується взагалі - це чистіше за обгортання всього тіла методу у великий \`if\`.

**Зроби зараз (8 хв):** створи \`DamageZone\` за прикладом, прикріпи до нової тригер-зони, перевір, що урон "тікає" раз на секунду, а не щокадру.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Написав OnCollisionEnter на обʼєкті з Is Trigger = true',
      explanation: 'Тригер-Collider викликає OnTriggerEnter, а не OnCollisionEnter - метод просто ніколи не спрацює.',
      correctApproach: 'Звір тип Collider (Is Trigger true/false) з відповідним методом: Trigger → OnTrigger*, звичайний → OnCollision*.',
    },
    {
      mistake: 'Логіка урону в OnTriggerStay спрацьовує щокадру без обмеження',
      explanation: 'Stay-методи викликаються кожен кадр контакту, тому без таймера урон "сиплеться" десятки разів на секунду.',
      correctApproach: 'Додай накопичувальний таймер (Time.deltaTime) і застосовуй дію лише коли він досягає інтервалу.',
    },
    {
      mistake: 'Порівнює тег через рядок tag == "Player" замість CompareTag',
      explanation: 'Це працює, але менш ефективно і не є прийнятою практикою Unity.',
      correctApproach: 'Використовуй other.CompareTag("Player") для перевірки тегу.',
    },
  ],
  summary:
    'Ти навчився обробляти зіткнення (OnCollisionEnter) і тригери (OnTriggerEnter), перевіряти конкретний тип обʼєкта через CompareTag, а також використовувати Stay/Exit варіанти для триваючих і завершених контактів з обмеженням по таймеру.',
  practiceTask: {
    title: 'Практика: зони з реакцією на Player (~30 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** сцена з твердим зіткненням і двома різними тригер-зонами, що реагують саме на тег Player.

### Part A - Зіткнення (разом / 10 хв)
1. Признач тег \`Player\` своєму керованому обʼєкту з 3.1/3.2.
2. Додай OnCollisionEnter скрипт на стіну, що логує назву обʼєкта, який врізався.

### Part B - Тригер з CompareTag (самі / 12-15 хв)
1. Створи тригер-зону \`PickupZone\`, реагуй лише на CompareTag("Player") через OnTriggerEnter, виведи Debug.Log і Destroy(gameObject) на самій зоні (зникає після використання).
2. Створи другу тригер-зону \`DamageZone\` за прикладом з теорії - урон раз на секунду через OnTriggerStay + таймер.

### Part C - Здача + челендж (5 хв)
1. Пройди керованим обʼєктом крізь обидві зони, перевір Console.
2. **Челендж:** додай OnTriggerExit у DamageZone, який скидає таймер і логує "гравець вийшов із зони урону".

### Критерій "зараховано"
- OnCollisionEnter логує зіткнення зі стіною
- PickupZone реагує лише на тег Player і знищується після використання
- DamageZone завдає урон з інтервалом, а не щокадру`,
    hints: [
      'Is Trigger true → OnTrigger*, Is Trigger false → OnCollision*',
      'Early return (if (!condition) return;) робить код читабельнішим за вкладені if',
      'Таймер для Stay-подій - звичайна private float, що накопичується через Time.deltaTime',
    ],
    optionalChallenge:
      'Додай третю зону \`SpeedBoostZone\`, яка через OnTriggerEnter/OnTriggerExit тимчасово збільшує швидкість гравця (потрібне поле moveSpeed у скрипті гравця, доступне через GetComponent з іншого скрипта).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Який метод спрацює для Collider з Is Trigger = true?',
        options: ['OnCollisionEnter', 'OnTriggerEnter', 'Обидва одночасно', 'Жоден без Rigidbody на обох'],
        correctAnswer: 1,
        explanation: 'Тригер-Collider викликає саме OnTriggerEnter, а не OnCollisionEnter.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Який тип параметра приймає OnTriggerEnter?',
        options: ['Collision', 'Collider', 'GameObject', 'Rigidbody'],
        correctAnswer: 1,
        explanation: 'OnTriggerEnter приймає параметр типу Collider (зазвичай названий other).',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Навіщо використовувати CompareTag замість порівняння рядків через ==?',
        options: [
          'CompareTag взагалі не працює з рядками',
          'CompareTag ефективніший і є прийнятою практикою Unity для перевірки тегів',
          'Це обовʼязкова синтаксична вимога C#',
          'CompareTag змінює тег обʼєкта',
        ],
        correctAnswer: 1,
        explanation: 'CompareTag оптимізований для порівняння тегів без створення додаткових рядкових обʼєктів.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Як часто викликається OnTriggerStay, поки обʼєкти перетинаються?',
        options: ['Один раз', 'Кожен кадр', 'Раз на секунду', 'Ніколи, якщо є OnTriggerEnter'],
        correctAnswer: 1,
        explanation: 'Stay-методи викликаються кожен кадр, поки триває контакт.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Чому небезпечно застосовувати урон прямо в OnTriggerStay без таймера?',
        options: [
          'Це не скомпілюється',
          'Урон застосовуватиметься кожен кадр, тобто десятки разів на секунду',
          'OnTriggerStay взагалі не може завдавати урон',
          'Це вимкне гравітацію',
        ],
        correctAnswer: 1,
        explanation: 'Без обмеження по часу Stay-подія спрацьовує щокадру, що робить урон надмірним.',
      },
    ],
  },
}

export const ukLesson34 = {
  lessonId: 'lesson-unity-3-4',
  moduleId: 'module-03',
  order: 4,
  title: '3.4 - Prefabs та Instantiate',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Створювати Prefab з GameObject у сцені',
    'Розуміти звʼязок Prefab-обʼєктів на сцені з оригіналом asset',
    'Створювати обʼєкти під час гри через Instantiate',
    'Видаляти обʼєкти через Destroy',
    'Використовувати Instantiate у циклі для розстановки кількох копій',
  ],
  theory: {
    sections: [
      {
        title: 'Prefab: "шаблон", що зберігається як asset',
        content: `Досі кожен обʼєкт (Cube, стіна, зона) існував лише в конкретній сцені. **Prefab** - це спосіб зберегти GameObject **разом з усіма його компонентами й дочірніми обʼєктами** як окремий файл-asset у Project, який можна повторно використовувати в будь-якій кількості сцен.

Створення Prefab: перетягни GameObject із **Hierarchy** у вікно **Project** - Unity створить файл \`.prefab\` і обʼєкт у сцені стане **інстансом (екземпляром)** цього Prefab (позначається синім кольором в Hierarchy, на відміну від звичайного білого імені).

Найбільша перевага: зміни в самому Prefab-asset (наприклад, додати новий компонент чи змінити колір матеріалу) **автоматично поширюються** на всі інстанси цього Prefab у всіх сценах - не треба редагувати кожну копію окремо.

**Зроби зараз (5 хв):** створи Cube з матеріалом, перетягни його з Hierarchy в Project - переконайся, що зʼявився файл \`.prefab\` і назва в Hierarchy стала синьою.`,
      },
      {
        title: 'Редагування Prefab: Prefab Mode',
        content: `Подвійний клік на Prefab-файлі в Project (або на синьому обʼєкті в Hierarchy → **Open Prefab**) відкриває **Prefab Mode** - ізольований режим редагування, де видно лише цей Prefab окремо від решти сцени.

Зміни, зроблені в Prefab Mode, зберігаються при виході (кнопка **Save** у верхній панелі Prefab Mode або автоматично при виході через стрілку "назад") і поширюються на всі інстанси в усіх сценах.

Якщо ж змінити конкретний **інстанс** Prefab прямо в звичайній сцені (не заходячи в Prefab Mode) - це створює **Override** (позначається жирним/синім у Inspector), яке діє лише на цей конкретний екземпляр, а не на всі. Це корисно, коли 9 з 10 однакових ворогів мають бути ідентичними, а один - трохи іншим кольором.

**Зроби зараз (5 хв):** відкрий свій Prefab у Prefab Mode, зміни колір матеріалу, збережи. Перевір в основній сцені, що колір змінився на всіх інстансах.`,
      },
      {
        title: 'Instantiate: створення обʼєктів під час гри',
        content: `Prefab дозволяє не просто повторно використовувати обʼєкти вручну в редакторі, а й **створювати їх кодом під час Play** - ключова техніка для монет, куль, ворогів, ефектів.

\`\`\`csharp
using UnityEngine;

public class CoinSpawner : MonoBehaviour
{
    [SerializeField] private GameObject coinPrefab;
    [SerializeField] private Vector3 spawnPosition = new Vector3(0f, 1f, 0f);

    void Start()
    {
        Instantiate(coinPrefab, spawnPosition, Quaternion.identity);
    }
}
\`\`\`

\`Instantiate(prefab, position, rotation)\` створює **новий екземпляр** Prefab у вказаній позиції з вказаним поворотом. \`Quaternion.identity\` означає "без повороту" - стандартне значення, коли обертання не важливе.

Поле \`[SerializeField] private GameObject coinPrefab\` дозволяє перетягнути сам Prefab-asset із Project прямо в Inspector цього скрипта - типовий спосіб "звʼязати" код з конкретним Prefab без хардкоду шляхів у коді.

**Зроби зараз (7 хв):** створи Prefab монети (маленька Sphere з жовтим матеріалом), створи скрипт \`CoinSpawner\`, перетягни Prefab у поле в Inspector, перевір Play - монета має зʼявитись у сцені.`,
      },
      {
        title: 'Destroy: видалення обʼєктів',
        content: `Симетрична до Instantiate операція - **Destroy(gameObject)** видаляє обʼєкт зі сцени назавжди (для цього кадру гри). Найчастіше застосовується разом з тригерами з 3.3 - зникнення зібраної монети, знищеного ворога, використаного снаряда:

\`\`\`csharp
void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Player"))
    {
        Debug.Log("Монету зібрано!");
        Destroy(gameObject);
    }
}
\`\`\`

**Важлива деталь:** \`Destroy(gameObject)\` видаляє обʼєкт, на якому виконується цей скрипт (тобто саму монету), а не гравця, що її торкнувся. Легко переплутати з \`Destroy(other.gameObject)\`, яке видалило б натомість гравця - явно небажаний результат.

Є також **Destroy(obj, delay)** - видалення із затримкою в секундах, корисне для ефектів вибуху, які мають "дограти" перед зникненням.

**Зроби зараз (5 хв):** онови свій Prefab монети скриптом, що знищує її при вході гравця в тригер-зону навколо неї.`,
      },
      {
        title: 'Instantiate у циклі: розставляємо кілька копій',
        content: `Найпотужніший сценарій використання Instantiate - створення **кількох** копій за один виклик коду, наприклад ряду монет:

\`\`\`csharp
using UnityEngine;

public class CoinRowSpawner : MonoBehaviour
{
    [SerializeField] private GameObject coinPrefab;
    [SerializeField] private int coinCount = 5;
    [SerializeField] private float spacing = 2f;

    void Start()
    {
        for (int i = 0; i < coinCount; i++)
        {
            Vector3 pos = new Vector3(i * spacing, 1f, 0f);
            Instantiate(coinPrefab, pos, Quaternion.identity);
        }
    }
}
\`\`\`

Цикл \`for\` тут повторює тіло \`coinCount\` разів, кожного разу зі своїм значенням \`i\` (від 0 до coinCount - 1), яке використовується для розрахунку позиції наступної монети вздовж осі X.

**Зроби зараз (8 хв):** створи \`CoinRowSpawner\`, перевір Play - має зʼявитись рівний ряд із 5 монет уздовж осі X з однаковим кроком.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Редагує інстанс Prefab прямо в сцені, очікуючи, що зміни поширяться на всі копії',
      explanation: 'Зміни в звичайній сцені (не в Prefab Mode) створюють лише локальний Override для цього екземпляра.',
      correctApproach: 'Для змін, що мають вплинути на всі копії, редагуй сам Prefab через Prefab Mode (подвійний клік на asset).',
    },
    {
      mistake: 'Плутає Destroy(gameObject) з Destroy(other.gameObject)',
      explanation: 'Перше видаляє обʼєкт, на якому виконується скрипт; друге - обʼєкт, який спричинив подію (наприклад, гравця).',
      correctApproach: 'Явно продумай, який саме обʼєкт має зникнути, і використовуй правильне посилання.',
    },
    {
      mistake: 'Забув перетягнути Prefab у поле [SerializeField] в Inspector',
      explanation: 'Instantiate(null, ...) викличе помилку в Console під час Play.',
      correctApproach: 'Перевір Inspector скрипта перед запуском - поле coinPrefab не повинно бути порожнім (None).',
    },
  ],
  summary:
    'Ти навчився створювати Prefab із GameObject, редагувати його через Prefab Mode з поширенням змін на всі інстанси, створювати нові обʼєкти під час гри через Instantiate, видаляти їх через Destroy і розставляти кілька копій у циклі.',
  practiceTask: {
    title: 'Практика: спавнер монет (~30 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** Prefab монети, що зʼявляється кількома копіями через код і зникає при зборі гравцем.

### Part A - Prefab монети (разом / 10 хв)
1. Створи Sphere \`Coin\` з жовтим матеріалом, Box/Sphere Collider з Is Trigger = true.
2. Додай скрипт, що через OnTriggerEnter реагує на CompareTag("Player"), логує "Монету зібрано" і Destroy(gameObject).
3. Перетягни Coin у Project - створи Prefab, видали оригінал зі сцени (Prefab-asset лишається).

### Part B - Спавнер у циклі (самі / 12-15 хв)
1. Створи скрипт \`CoinRowSpawner\` за прикладом з теорії ([SerializeField] GameObject coinPrefab, int coinCount, float spacing).
2. Прикріпи до порожнього GameObject, перетягни Prefab монети в поле в Inspector.
3. Play - переконайся, що зʼявляється рівний ряд монет, і кожна зникає при проході гравця.

### Критерій "зараховано"
- Prefab монети створено і застосовується через Instantiate
- Ряд з кількох монет спавниться циклом for
- Кожна монета зникає (Destroy) при зборі гравцем через тригер`,
    hints: [
      'Не забудь перетягнути сам Prefab-asset у поле [SerializeField] в Inspector - без цього Instantiate поверне помилку',
      'Destroy(gameObject) видаляє саме той обʼєкт, на якому виконується скрипт',
      'i * spacing у циклі for дає рівномірний крок між копіями',
    ],
    optionalChallenge:
      'Дозволь CoinRowSpawner розставляти монети у дві осі (сітка X і Z) через вкладений цикл for всередині for.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що таке Prefab у Unity?',
        options: [
          'Тимчасовий обʼєкт лише для поточної сцени',
          'Asset-файл, що зберігає GameObject з компонентами для повторного використання',
          'Тип матеріалу',
          'Вбудований метод MonoBehaviour',
        ],
        correctAnswer: 1,
        explanation: 'Prefab - шаблон-asset, з якого можна створювати однакові інстанси в будь-якій сцені.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що станеться з усіма інстансами Prefab у сценах, якщо змінити щось у самому Prefab через Prefab Mode?',
        options: [
          'Нічого не зміниться',
          'Зміни автоматично поширяться на всі інстанси',
          'Тільки перший інстанс оновиться',
          'Unity видасть помилку',
        ],
        correctAnswer: 1,
        explanation: 'Редагування Prefab-asset поширюється на всі його інстанси у всіх сценах.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Яка функція створює новий обʼєкт зі Prefab під час гри?',
        options: ['Destroy()', 'Instantiate()', 'GetComponent()', 'Awake()'],
        correctAnswer: 1,
        explanation: 'Instantiate(prefab, position, rotation) створює новий екземпляр Prefab у сцені.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що робить Quaternion.identity у виклику Instantiate?',
        options: [
          'Видаляє обʼєкт',
          'Означає "без повороту" - стандартна орієнтація',
          'Задає випадковий поворот',
          'Прискорює виконання коду',
        ],
        correctAnswer: 1,
        explanation: 'Quaternion.identity - нульовий поворот, часто використовується як значення за замовчуванням.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'У чому різниця між Destroy(gameObject) і Destroy(other.gameObject) всередині OnTriggerEnter монети?',
        options: [
          'Це два однакові виклики',
          'Перший видаляє саму монету, другий - обʼєкт, що торкнувся (наприклад, гравця)',
          'Обидва видаляють гравця',
          'Другий варіант некоректний синтаксично',
        ],
        correctAnswer: 1,
        explanation: 'gameObject посилається на обʼєкт скрипта, other.gameObject - на обʼєкт, який спричинив подію.',
      },
    ],
  },
}

export const ukLesson35 = {
  lessonId: 'lesson-unity-3-5',
  moduleId: 'module-03',
  order: 5,
  title: '3.5 - Checkpoint: збирач монет',
  theoryMinutes: 20,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Обʼєднати Rigidbody, Collider, тригери, Prefab та Instantiate в один робочий проєкт',
    'Самостійно спроєктувати систему монет і рахунку',
    'Перевірити фізичну поведінку і взаємодію обʼєктів',
    'Оцінити результат за рубрикою модуля',
  ],
  theory: {
    sections: [
      {
        title: 'Що зібралось у голові за модуль 3',
        content: `За чотири уроки модуля 3 ти пройшов від "обʼєкт просто падає" до повноцінної системи прогресу:

- **3.1**: Rigidbody, гравітація, AddForce у FixedUpdate, Constraints
- **3.2**: Collider, Is Trigger, комбінації Rigidbody + Collider
- **3.3**: OnCollisionEnter / OnTriggerEnter, CompareTag, Stay/Exit
- **3.4**: Prefab, Instantiate, Destroy, спавн у циклі

Сьогодні - збірка **збирача монет**: керований обʼєкт із 3.1-2.3, що рухається по сцені з фізичною підлогою і стінами, збирає кілька Prefab-монет через тригери, а кожен збір знищує монету і виводить рахунок у Console (повноцінний UI-рахунок буде вже в модулі 5).

**Зроби зараз (2 хв):** переконайся, що всі попередні скрипти модуля 3 компілюються без помилок перед початком checkpoint-практики.`,
      },
      {
        title: 'Чекліст перед практикою',
        content: `- [ ] Розумію різницю Rigidbody vs Collider vs обидва разом
- [ ] Вмію налаштувати Is Trigger для проходних зон
- [ ] Знаю, коли викликається OnCollisionEnter, а коли OnTriggerEnter
- [ ] Вмію перевіряти тег через CompareTag
- [ ] Вмію створювати Prefab і Instantiate з нього обʼєкти в коді
- [ ] Вмію Destroy обʼєкт при потрібній події

Якщо якийсь пункт викликає сумнів - поверни до відповідного уроку 3.1-3.4 перед checkpoint-практикою.`,
      },
      {
        title: 'Як викладач оцінює цей урок (рубрика)',
        content: `| Рівень | Що видно в проєкті | Типовий коментар викладача |
|--------|------------------------|------------------------------|
| **Не зараховано** | Персонаж не рухається фізично / монети не зникають / немає Prefab | «Доведи базову фізику й тригери до робочого стану» |
| **Зараховано** | Персонаж рухається через Rigidbody, мінімум 3 монети через Prefab, кожна зникає при зборі | «Базовий core loop збирання є» |
| **Добре** | Рахунок виводиться в Console при кожному зборі, монети розставлені циклом, персонаж не перекидається | «Готовий до системи руху й камери в M4» |
| **Відмінно** | Додано звук/лог різних типів монет, рахунок накопичується коректно, чиста структура методів | «Показовий приклад для портфоліо» |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Персонаж рухається через transform.position, хоча має Rigidbody',
      explanation: 'Це суперечить принципам фізичного руху з 3.1 і призводить до сіпаного проходження крізь стіни.',
      correctApproach: 'Використовуй rb.AddForce чи rb.MovePosition у FixedUpdate замість прямої зміни Transform.',
    },
    {
      mistake: 'Монети зникають одразу при старті гри, а не при зборі гравцем',
      explanation: 'Ймовірно, Destroy викликається не всередині OnTriggerEnter, або умова CompareTag відсутня.',
      correctApproach: 'Перевір, що Destroy(gameObject) розташований саме всередині if (other.CompareTag("Player")) в OnTriggerEnter.',
    },
  ],
  summary:
    'Ти зібрав повноцінний прототип збирача монет: фізично керований персонаж з Rigidbody, кілька Prefab-монет, розставлених циклом, тригери з перевіркою тегу і рахунок, що накопичується в Console при кожному зборі - готовий фундамент для системи руху персонажа в модулі 4.',
  practiceTask: {
    title: 'Checkpoint практика: збирач монет (~35 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** повністю самостійний прототип "збери всі монети", що використовує весь матеріал модуля 3.

### Part A - Персонаж і фізика (самостійно, спираючись на 3.1-3.4, 20 хв)
1. Керований Rigidbody-обʼєкт з рухом по WASD через AddForce у FixedUpdate, Freeze Rotation X/Z, тег \`Player\`.
2. Підлога і стіни (Collider без Rigidbody), що блокують персонажа фізично.
3. Prefab монети (маленька Sphere, Is Trigger Collider) з логікою збору: OnTriggerEnter → CompareTag("Player") → Debug.Log + Destroy(gameObject).

### Part B - Спавн і рахунок (10 хв)
1. Спавнер, що розставляє мінімум 5 монет через Instantiate у циклі.
2. Рахунок (int score) у скрипті персонажа чи окремому GameManager-скрипті, що збільшується при кожному зборі й виводиться в Console.

### Part C - Здача + челендж (5 хв)
1. Пройди повний рівень, збери всі монети, перевір Console на коректний фінальний рахунок.
2. **Челендж:** виведи Debug.Log("Усі монети зібрано!"), коли рахунок дорівнює загальній кількості монет.

### Критерій "зараховано"
- Персонаж рухається фізично і блокується стінами
- Мінімум 5 монет через Prefab + Instantiate у циклі
- Кожна монета зникає при зборі, рахунок збільшується коректно`,
    hints: [
      'Раху нок можна тримати простим int у скрипті персонажа, детальний GameManager - тема пізніших модулів',
      'Перевіряй Console на помилки NullReferenceException - зазвичай означає незакешований чи не призначений компонент',
      'Якщо застряг на конкретному кроці - поверни до відповідного уроку 3.1-3.4, а не вигадуй з нуля',
    ],
    optionalChallenge:
      'Додай другий тип "коштовної" монети (інший Prefab, більше очок за збір) і окремо порахуй кожен тип у Console.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Яким чином найкраще рухати персонажа з Rigidbody у checkpoint-практиці?',
        options: [
          'transform.position += напряму в Update',
          'rb.AddForce у FixedUpdate',
          'Зміною Scale',
          'Через Debug.Log',
        ],
        correctAnswer: 1,
        explanation: 'Фізичний рух через AddForce у FixedUpdate узгоджений з рештою фізики Unity.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Де має бути виклик Destroy(gameObject) для монети, щоб вона зникала саме при зборі гравцем?',
        options: [
          'У Start',
          'Всередині OnTriggerEnter, за умови CompareTag("Player")',
          'В Update без умов',
          'У методі Awake',
        ],
        correctAnswer: 1,
        explanation: 'Це гарантує, що монета зникне лише при реальному вході гравця в тригер-зону.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Яка комбінація компонентів потрібна монеті-Prefab, щоб вона діяла як проходна тригер-зона?',
        options: [
          'Rigidbody без Collider',
          'Collider з Is Trigger = true',
          'Тільки Mesh Renderer',
          'Camera компонент',
        ],
        correctAnswer: 1,
        explanation: 'Is Trigger = true робить Collider проходним, зберігаючи виявлення входу.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Скільки монет мінімум вимагає рубрика "Зараховано" для цього checkpoint?',
        options: ['1', '3', '5', '10'],
        correctAnswer: 1,
        explanation: 'Мінімум 3 монети через Prefab потрібні для базового зарахування.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Що допомагає розставити кілька монет без ручного перетягування кожної в редакторі?',
        options: [
          'Instantiate у циклі for',
          'Тільки ручне копіювання Ctrl+D',
          'Prefab не можна розставляти циклом',
          'Метод Destroy',
        ],
        correctAnswer: 0,
        explanation: 'Цикл for з Instantiate дозволяє автоматично розставити будь-яку кількість копій Prefab.',
      },
    ],
  },
}
