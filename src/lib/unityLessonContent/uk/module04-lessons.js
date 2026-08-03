/** Unity Module 04 UK - Гравець */
import { QUIZ_QUESTION_TYPES } from '../../courseData'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const ukLesson41 = {
  lessonId: 'lesson-unity-4-1',
  moduleId: 'module-04',
  order: 1,
  title: '4.1 - Рух персонажа (Transform і CharacterController)',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Розуміти два підходи до руху персонажа: Rigidbody-фізика і CharacterController',
    'Використовувати Input.GetAxis для плавного руху по осях',
    'Додавати компонент CharacterController і метод Move()',
    'Нормалізувати вектор напрямку для однакової швидкості по діагоналі',
    'Обирати підхід залежно від типу гри',
  ],
  theory: {
    sections: [
      {
        title: 'Два шляхи руху персонажа: Rigidbody чи CharacterController',
        content: `У модулі 3 ти рухав обʼєкти через **Rigidbody.AddForce** - підхід, що добре працює для фізичних предметів (монети, ящики, машини), де важлива інерція і реалістичні поштовхи.

Для **персонажа гравця** Unity пропонує альтернативу - **CharacterController**: спеціальний компонент, розроблений саме для керованих персонажів. Він не використовує Rigidbody-фізику напряму, а рухається через явний виклик методу \`Move()\` з коду, при цьому автоматично обробляючи зіткнення зі стінами й схилами.

| Підхід | Плюси | Мінуси |
|--------|-------|--------|
| **Rigidbody + AddForce** | Реалістична фізика, інерція, поштовхи | Складніше точно контролювати "відчуття" руху |
| **CharacterController** | Точний, передбачуваний контроль, стандарт для платформерів/шутерів | Не має природної фізичної інерції "з коробки" |

Для цього курсу ми обираємо **CharacterController** як основний підхід до керування персонажем - він простіший для точного контролю руху й стрибка.

**Зроби зараз (5 хв):** створи Capsule (**GameObject → 3D Object → Capsule**) - стандартна форма-заготовка для персонажа, назви \`Player\`.`,
      },
      {
        title: 'CharacterController: додавання і базові налаштування',
        content: `Додай компонент **Add Component → Physics → Character Controller** до \`Player\`. Він автоматично додає власний Capsule-подібний Collider (окремий від Capsule Collider примітива) з налаштуваннями:

| Поле | Що робить |
|------|-----------|
| **Slope Limit** | Максимальний кут схилу, яким може йти персонаж (типово 45°) |
| **Step Offset** | Висота "сходинки", яку персонаж переступає автоматично |
| **Skin Width** | Невеликий запас, що запобігає застряганню в геометрії |
| **Center / Radius / Height** | Форма і розмір капсули колізії |

CharacterController **не потребує Rigidbody** - фактично, додавання Rigidbody на той самий обʼєкт може викликати конфлікти. Це окрема, самодостатня система руху.

**Зроби зараз (5 хв):** додай CharacterController до \`Player\`, подивись значення Radius і Height за замовчуванням, підлаштуй Height під видиму форму Capsule, якщо потрібно.`,
      },
      {
        title: 'Input.GetAxis: плавне зчитування руху',
        content: `Замість окремих \`Input.GetKey(KeyCode.W)\`, \`KeyCode.A\` тощо, Unity пропонує **Input.GetAxis**, що одразу повертає число від -1 до 1 для стандартних осей "Horizontal" (A/D або стрілки) і "Vertical" (W/S або стрілки):

\`\`\`csharp
float horizontal = Input.GetAxis("Horizontal"); // -1 (A) ... 0 ... 1 (D)
float vertical = Input.GetAxis("Vertical");     // -1 (S) ... 0 ... 1 (W)
\`\`\`

Перевага GetAxis - **плавність**: значення поступово наростає від 0 до 1 замість миттєвого стрибка, що робить рух менш "смиканим" (це налаштовується в **Edit → Project Settings → Input Manager**, за замовчуванням уже добре підходить для навчання).

Є також **GetAxisRaw**, яке дає миттєве -1/0/1 без згладжування - корисно для точних платформерів, де потрібна миттєва реакція.

**Зроби зараз (5 хв):** створи скрипт \`PlayerMovement\`, зчитай і виведи через Debug.Log значення Input.GetAxis("Horizontal") і "Vertical" в Update, натискаючи WASD чи стрілки.`,
      },
      {
        title: 'CharacterController.Move(): переміщення персонажа',
        content: `Метод **Move(Vector3)** компонента CharacterController переміщує персонажа на вказаний вектор **за один кадр**, автоматично обробляючи зіткнення зі стінами й підлогою:

\`\`\`csharp
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    private CharacterController controller;

    void Start()
    {
        controller = GetComponent<CharacterController>();
    }

    void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        Vector3 direction = new Vector3(horizontal, 0f, vertical);
        controller.Move(direction * moveSpeed * Time.deltaTime);
    }
}
\`\`\`

Зверни увагу: \`Move()\` очікує вектор **уже помножений** на швидкість і Time.deltaTime - на відміну від Rigidbody.AddForce, тут ти напряму керуєш **зміщенням за кадр**, а не силою.

**Зроби зараз (7 хв):** створи цей скрипт, прикріпи до \`Player\` з CharacterController, перевір рух по WASD на рівній підлозі.`,
      },
      {
        title: 'Нормалізація вектора: чому діагональ не має бути швидшою',
        content: `Якщо рухатись одночасно вперед і вправо (W+D одночасно), вектор \`(horizontal, 0, vertical)\` за довжиною більший за рух лише в одному напрямку (за теоремою Піфагора: √(1² + 1²) ≈ 1.41) - персонаж рухатиметься **швидше по діагоналі**, що відчувається як баг.

Розвʼязання - **нормалізація** вектора перед множенням на швидкість: \`.normalized\` приводить довжину вектора рівно до 1, зберігаючи напрямок:

\`\`\`csharp
Vector3 direction = new Vector3(horizontal, 0f, vertical);
if (direction.magnitude > 1f)
{
    direction = direction.normalized;
}
controller.Move(direction * moveSpeed * Time.deltaTime);
\`\`\`

Перевірка \`if (direction.magnitude > 1f)\` (замість беззастережного \`.normalized\` завжди) зберігає плавність GetAxis для повільного нахилу стіка/клавіш, обмежуючи лише "надшвидку" діагональ.

**Зроби зараз (5 хв):** онови скрипт із нормалізацією, порівняй швидкість руху прямо і по діагоналі до і після виправлення.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Додав і Rigidbody, і CharacterController на того самого персонажа',
      explanation: 'Дві системи фізики/руху конфліктують і дають непередбачувану поведінку.',
      correctApproach: 'Обирай один підхід: для персонажа гравця в цьому курсі - CharacterController без Rigidbody.',
    },
    {
      mistake: 'Персонаж рухається швидше по діагоналі, ніж прямо',
      explanation: 'Вектор напрямку (horizontal, 0, vertical) не нормалізований, тому по діагоналі його довжина більша за 1.',
      correctApproach: 'Застосуй .normalized до вектора напрямку перед множенням на швидкість.',
    },
    {
      mistake: 'Плутає GetAxis і GetAxisRaw, дивуючись затримці реакції',
      explanation: 'GetAxis має вбудоване згладжування (поступове наростання значення), тоді як GetAxisRaw реагує миттєво.',
      correctApproach: 'Для більшості випадків GetAxis підходить; для миттєвої точної реакції обирай GetAxisRaw свідомо.',
    },
  ],
  summary:
    'Ти обрав CharacterController як основний підхід до руху персонажа, навчився зчитувати плавний рух через Input.GetAxis, переміщувати персонажа через controller.Move() і нормалізувати вектор напрямку, щоб діагональний рух не був швидшим за прямий.',
  practiceTask: {
    title: 'Практика: персонаж з CharacterController (~25 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** Capsule-персонаж, що рухається по WASD/стрілках з однаковою швидкістю у всіх напрямках, включно з діагоналями.

### Part A - Базовий рух (разом / 10 хв)
1. Створи Capsule \`Player\` з CharacterController.
2. Створи скрипт \`PlayerMovement\` з базовим Move() за прикладом теорії.
3. Перевір рух по WASD на рівній Plane-підлозі.

### Part B - Нормалізація і налаштування (самі / 12-15 хв)
1. Додай нормалізацію вектора напрямку (лише коли magnitude > 1).
2. Зроби moveSpeed налаштовуваним через [SerializeField], протестуй кілька значень.
3. Перевір швидкість руху прямо і по діагоналі секундоміром чи на око - вони мають бути однаковими.

### Критерій "зараховано"
- Персонаж рухається по WASD/стрілках через CharacterController.Move()
- Швидкість по діагоналі не перевищує швидкість прямого руху
- moveSpeed редагується через Inspector`,
    hints: [
      'Не додавай Rigidbody разом з CharacterController - обери один підхід',
      'direction.normalized працює лише коли довжина вектора > 0, перевір крайній випадок стояння на місці',
      'Move() приймає вже готове зміщення за кадр, множене на Time.deltaTime',
    ],
    optionalChallenge:
      'Додай другу швидкість "бігу" (Shift затиснутий → moveSpeed * 1.5) за прикладом if/GetKey з модуля 2.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Чому для керованого персонажа в цьому курсі обрано CharacterController, а не Rigidbody?',
        options: [
          'Rigidbody неможливо використовувати для персонажів',
          'CharacterController дає точніший і передбачуваніший контроль руху',
          'CharacterController швидший для рендерингу',
          'Rigidbody не підтримує зіткнення',
        ],
        correctAnswer: 1,
        explanation: 'CharacterController спеціально розроблений для точного керованого руху персонажа.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що повертає Input.GetAxis("Horizontal")?',
        options: [
          'true/false',
          'Число від -1 до 1',
          'Рядок з назвою клавіші',
          'Vector3',
        ],
        correctAnswer: 1,
        explanation: 'GetAxis повертає плавне число в діапазоні від -1 до 1.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Чому персонаж рухається швидше по діагоналі без нормалізації вектора?',
        options: [
          'Це помилка Unity',
          'Довжина вектора (1,0,1) більша за 1 через теорему Піфагора',
          'GetAxis дає подвійне значення по діагоналі',
          'CharacterController завжди прискорює діагональний рух',
        ],
        correctAnswer: 1,
        explanation: '√(1² + 1²) ≈ 1.41, тому без нормалізації довжина вектора перевищує 1.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що робить .normalized з вектором?',
        options: [
          'Видаляє вектор',
          'Приводить довжину вектора до 1, зберігаючи напрямок',
          'Обертає вектор на 90 градусів',
          'Множить вектор на Time.deltaTime',
        ],
        correctAnswer: 1,
        explanation: 'normalized масштабує вектор так, щоб його довжина (magnitude) дорівнювала 1.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Чи можна додавати Rigidbody разом з CharacterController на того самого персонажа?',
        options: [
          'Так, це рекомендований підхід',
          'Небажано - дві системи руху можуть конфліктувати',
          'Це обовʼязково для роботи CharacterController',
          'Rigidbody автоматично вимикається сам',
        ],
        correctAnswer: 1,
        explanation: 'CharacterController - самодостатня система, що не потребує і конфліктує з Rigidbody-фізикою.',
      },
    ],
  },
}

export const ukLesson42 = {
  lessonId: 'lesson-unity-4-2',
  moduleId: 'module-04',
  order: 2,
  title: '4.2 - Камера, що слідує за гравцем',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Реалізувати камеру, що слідує за персонажем через LateUpdate',
    'Розуміти різницю між Update і LateUpdate',
    'Використовувати зміщення (offset) для позиціонування камери відносно цілі',
    'Застосовувати Vector3.Lerp для плавного згладженого руху камери',
    'Розуміти базову ідею parent-based камери як альтернативу',
  ],
  theory: {
    sections: [
      {
        title: 'Навіщо камері слідувати за персонажем',
        content: `Досі Main Camera стояла нерухомо. Якщо персонаж рухається CharacterController по великій сцені, статична камера швидко "загубить" його з кадру. Потрібна камера, яка **автоматично** підтримує персонажа в полі зору.

Найпростіший спосіб - зробити камеру **дитиною (child)** персонажа в Hierarchy: тоді вона рухається разом з ним автоматично, без жодного коду, як ти вже бачив з parent-child у 1.2.

Обмеження такого підходу: камера буде **обертатись разом з персонажем**, що не завжди бажано (наприклад, у виглядi "від третьої особи" камера часто має лишатись позаду під фіксованим кутом, навіть коли персонаж повертається боком). Тому для гнучкішого контролю використовують **скрипт camera follow**.

**Зроби зараз (3 хв):** спробуй зробити Main Camera дитиною свого \`Player\` з 4.1 у Hierarchy - подивись Play, як це виглядає (потім прибери це рішення - далі зробимо гнучкіший варіант).`,
      },
      {
        title: 'LateUpdate: спеціальний момент для камери',
        content: `Unity викликає ще один метод життєвого циклу - **LateUpdate()** - **після** того, як усі Update() всіх обʼєктів сцени вже виконались у цьому кадрі.

Це вирішує важливу проблему: якщо персонаж рухається в Update, а камера теж намагається слідувати за ним у **своєму власному** Update, є ризик, що камера "запізнюється" на один кадр залежно від порядку виконання скриптів - результат виглядає як сіпання (jitter).

**Правило:** увесь код камери, що слідує за персонажем, пиши в **LateUpdate**, а не в Update - тоді камера гарантовано бачить **фінальну** позицію персонажа за цей кадр.

\`\`\`csharp
void LateUpdate()
{
    // тут вже точно відома фінальна позиція гравця за цей кадр
}
\`\`\`

**Зроби зараз (3 хв):** відкрий документацію-мнемоніку подумки: Update → фізика/логіка гравців, LateUpdate → камера. Тримай це правило в голові для всіх наступних камерних скриптів курсу.`,
      },
      {
        title: 'Offset: зміщення камери відносно цілі',
        content: `Замість жорсткого parent-child, скрипт камери зберігає посилання на ціль (\`target\`) і бажане **зміщення (offset)** - наскільки камера має бути позаду/вище цілі:

\`\`\`csharp
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private Vector3 offset = new Vector3(0f, 3f, -6f);

    void LateUpdate()
    {
        if (target == null) return;

        transform.position = target.position + offset;
        transform.LookAt(target);
    }
}
\`\`\`

\`transform.LookAt(target)\` розвертає камеру так, щоб вона завжди дивилась точно на ціль, незалежно від того, як змінюється offset чи позиція персонажа. \`[SerializeField] private Transform target\` дозволяє перетягнути \`Player\` в Inspector скрипта камери.

**Зроби зараз (7 хв):** створи скрипт \`CameraFollow\`, прикріпи до Main Camera (не роблячи її дитиною персонажа!), перетягни \`Player\` у поле target, перевір Play.`,
      },
      {
        title: 'Vector3.Lerp: плавне згладжування руху камери',
        content: `Пряме присвоєння \`transform.position = target.position + offset\` дає камеру, що **миттєво "приклеєна"** до персонажа - рухається різко, без інерції, що часто виглядає незручно. **Vector3.Lerp** (linear interpolation - лінійна інтерполяція) дає плавний перехід:

\`\`\`csharp
[SerializeField] private float smoothSpeed = 5f;

void LateUpdate()
{
    if (target == null) return;

    Vector3 desiredPosition = target.position + offset;
    Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed * Time.deltaTime);
    transform.position = smoothedPosition;

    transform.LookAt(target);
}
\`\`\`

\`Vector3.Lerp(a, b, t)\` повертає точку **між** \`a\` і \`b\`, де \`t\` (від 0 до 1) визначає, наскільки близько до \`b\`. При \`t\` близькому до 0 - камера майже не рухається; при \`t\` = 1 - миттєво "телепортується" до цілі. Множення на \`Time.deltaTime\` робить згладжування узгодженим з частотою кадрів.

**Зроби зараз (7 хв):** онови \`CameraFollow\`, додавши Lerp зі SerializeField smoothSpeed. Поекспериментуй зі значеннями 1, 5, 20 - відчуй різницю "інертності" камери.`,
      },
      {
        title: 'Коли краще parent-child, а коли скрипт-follow',
        content: `Обидва підходи мають своє місце:

| Ситуація | Кращий підхід |
|----------|-----------------|
| Проста аркадна гра, камера завжди строго позаду персонажа | Parent-child (простіше, без коду) |
| Персонаж обертається, а камера має лишатись під фіксованим кутом | Скрипт camera follow з offset |
| Потрібне плавне згладжування чи "запізнення" камери | Скрипт camera follow з Lerp |
| Камера має обмінюватись між кількома цілями (перемикання персонажів) | Скрипт camera follow (просто зміни target) |

Для платформера з M4-M5 курсу скрипт-follow гнучкіший і буде повторно використовуватись з невеликими змінами далі.

**Зроби зараз (3 хв):** обміркуй: якщо гра курсу - платформер з боку (2.5D), чи потрібен offset по X, чи камера має триматись строго збоку з фіксованим X.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Код камери написаний в Update замість LateUpdate',
      explanation: 'Це може призвести до "запізнення" камери на один кадр і помітного сіпання (jitter).',
      correctApproach: 'Увесь рух камери, що слідує за ціллю, пиши в LateUpdate.',
    },
    {
      mistake: 'Камера "телепортується" різко замість плавного руху',
      explanation: 'Позиція камери присвоюється напряму без Vector3.Lerp.',
      correctApproach: 'Використовуй Vector3.Lerp(transform.position, desiredPosition, smoothSpeed * Time.deltaTime) для плавності.',
    },
    {
      mistake: 'Забув перетягнути Player у поле target скрипта камери',
      explanation: 'Без призначеної цілі target буде null, і LateUpdate завершиться раніше через early return, камера лишиться нерухомою.',
      correctApproach: 'Перевір Inspector скрипта CameraFollow - поле Target не повинно бути None.',
    },
  ],
  summary:
    'Ти реалізував камеру, що слідує за персонажем через LateUpdate з offset-зміщенням, застосував transform.LookAt для орієнтації на ціль і додав плавне згладжування через Vector3.Lerp замість різкого "приклеювання".',
  practiceTask: {
    title: 'Практика: плавна камера-слідкувач (~25 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** камера, що плавно слідує за персонажем з 4.1 на фіксованому зміщенні, дивлячись на нього.

### Part A - Базовий follow (разом / 10 хв)
1. Створи скрипт \`CameraFollow\` з полями target і offset.
2. Прикріпи до Main Camera, перетягни \`Player\` у target.
3. Перевір Play: камера має слідувати без згладжування спочатку.

### Part B - Плавність (самі / 10-15 хв)
1. Додай Vector3.Lerp зі SerializeField smoothSpeed.
2. Підбери значення smoothSpeed, яке виглядає природно (не занадто різко, не занадто "тягуче").
3. Перевір LookAt - камера має завжди дивитись на персонажа під час руху.

### Критерій "зараховано"
- Камера слідує за персонажем на фіксованому offset
- Рух камери плавний (через Lerp), а не миттєвий
- Код розташований у LateUpdate, а не Update`,
    hints: [
      'Якщо камера сіпається - перевір, чи код у LateUpdate, а не Update',
      'smoothSpeed від 3 до 8 зазвичай дає природний результат для платформера',
      'target == null перевірка захищає від помилок, якщо забув призначити ціль',
    ],
    optionalChallenge:
      'Додай окрему функцію обмеження offset по X для 2.5D-платформера (камера завжди на фіксованій X-відстані, ігноруючи рух персонажа по X, якщо гра суто бокова).',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Чому код камери, що слідує за персонажем, краще писати в LateUpdate?',
        options: [
          'LateUpdate швидший за Update',
          'LateUpdate викликається після всіх Update, тому бачить фінальну позицію персонажа за кадр',
          'Update не підтримує камери',
          'LateUpdate викликається рідше',
        ],
        correctAnswer: 1,
        explanation: 'Це запобігає сіпанню камери через порядок виконання скриптів у кадрі.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Що робить Vector3.Lerp(a, b, t)?',
        options: [
          'Видаляє вектор a',
          'Повертає точку між a і b залежно від значення t',
          'Обертає вектор a на кут t',
          'Додає a і b разом без t',
        ],
        correctAnswer: 1,
        explanation: 'Lerp (linear interpolation) інтерполює між двома точками з коефіцієнтом t від 0 до 1.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Що робить transform.LookAt(target)?',
        options: [
          'Переміщує обʼєкт до target',
          'Розвертає обʼєкт так, щоб він дивився на target',
          'Видаляє target зі сцени',
          'Робить target дочірнім обʼєктом',
        ],
        correctAnswer: 1,
        explanation: 'LookAt орієнтує обʼєкт (наприклад, камеру) у напрямку вказаної цілі.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Який недолік у підходу "камера - дитина персонажа" (parent-child)?',
        options: [
          'Він взагалі не працює в Unity',
          'Камера обертається разом з персонажем, що не завжди бажано',
          'Це вимагає написання коду',
          'Це неможливо для CharacterController',
        ],
        correctAnswer: 1,
        explanation: 'Parent-child камера успадковує й обертання персонажа, що може бути небажаним ефектом.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Що станеться, якщо забути призначити target у скрипті CameraFollow?',
        options: [
          'Unity автоматично призначить перший GameObject',
          'При правильній перевірці (target == null) камера просто не рухатиметься',
          'Гра не скомпілюється',
          'Камера видалиться зі сцени',
        ],
        correctAnswer: 1,
        explanation: 'Перевірка на null із early return запобігає помилці, але камера залишиться нерухомою без цілі.',
      },
    ],
  },
}

export const ukLesson43 = {
  lessonId: 'lesson-unity-4-3',
  moduleId: 'module-04',
  order: 3,
  title: '4.3 - Стрибок і перевірка землі (ground check)',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Реалізувати вертикальну швидкість і гравітацію для CharacterController',
    'Використовувати CharacterController.isGrounded і власний ground check',
    'Реалізувати стрибок по натисканню клавіші',
    'Запобігти "подвійному стрибку в повітрі"',
    'Використовувати Physics.CheckSphere для точнішої перевірки землі',
  ],
  theory: {
    sections: [
      {
        title: 'CharacterController не має вбудованої гравітації',
        content: `На відміну від Rigidbody, **CharacterController не падає сам по собі** - гравітацію потрібно симулювати вручну в коді, накопичуючи вертикальну швидкість:

\`\`\`csharp
[SerializeField] private float gravity = -9.81f;
private float verticalVelocity;

void Update()
{
    verticalVelocity += gravity * Time.deltaTime;

    Vector3 move = new Vector3(0, verticalVelocity, 0);
    controller.Move(move * Time.deltaTime);
}
\`\`\`

Без цього коду персонаж просто "висить" у повітрі, ігноруючи гравітацію повністю - типова несподіванка новачків після переходу з Rigidbody-фізики модуля 3 до CharacterController у 4.1.

**Зроби зараз (5 хв):** додай симуляцію гравітації до свого \`PlayerMovement\`, підніми персонажа над підлогою в Inspector і перевір, що він падає донизу в Play.`,
      },
      {
        title: 'isGrounded: вбудована перевірка землі',
        content: `CharacterController має вбудовану властивість **isGrounded** - true, якщо персонаж торкається землі за останній виклик Move(). Використовується, щоб не накопичувати вертикальну швидкість нескінченно, коли персонаж стоїть на підлозі:

\`\`\`csharp
void Update()
{
    if (controller.isGrounded && verticalVelocity < 0)
    {
        verticalVelocity = -2f; // невеликий "притиск" до землі, не 0
    }

    verticalVelocity += gravity * Time.deltaTime;

    Vector3 move = new Vector3(horizontal, verticalVelocity, vertical);
    controller.Move(move * Time.deltaTime);
}
\`\`\`

Чому \`-2f\`, а не рівно \`0\`? Якщо поставити 0, на схилах чи нерівностях isGrounded може "миготіти" між true/false щокадру. Невелике постійне "тиснення" вниз (-2, а не 0) стабілізує виявлення землі.

**Зроби зараз (5 хв):** онови код гравітації з перевіркою isGrounded, переконайся, що персонаж більше не "провалюється" нескінченно швидко при стоянні на підлозі.`,
      },
      {
        title: 'Стрибок: додаємо вертикальний імпульс',
        content: `Стрибок - це разова зміна \`verticalVelocity\` на позитивне значення при натисканні клавіші, **за умови**, що персонаж зараз на землі:

\`\`\`csharp
[SerializeField] private float jumpHeight = 2f;

void Update()
{
    if (controller.isGrounded && verticalVelocity < 0)
    {
        verticalVelocity = -2f;
    }

    if (controller.isGrounded && Input.GetKeyDown(KeyCode.Space))
    {
        verticalVelocity = Mathf.Sqrt(jumpHeight * -2f * gravity);
    }

    verticalVelocity += gravity * Time.deltaTime;

    Vector3 move = new Vector3(horizontal, verticalVelocity, vertical);
    controller.Move(move * Time.deltaTime);
}
\`\`\`

Формула \`Mathf.Sqrt(jumpHeight * -2f * gravity)\` - фізична формула розрахунку початкової швидкості для досягнення точної висоти \`jumpHeight\` під заданою гравітацією (виведена зі шкільної кінематики - не обов'язково запам'ятовувати виведення, важливо розуміти, що вона дає передбачувану висоту стрибка).

**Зроби зараз (7 хв):** додай стрибок за прикладом, перевір Play: Space має підкидати персонажа на приблизно однакову висоту щоразу.`,
      },
      {
        title: 'Проблема "подвійного стрибка в повітрі" і як її уникнути',
        content: `Якщо прибрати умову \`controller.isGrounded &&\` перед перевіркою Space, персонаж зможе стрибати **нескінченну кількість разів прямо в повітрі** - класичний баг новачків, який руйнує відчуття гри.

**Правило:** будь-яка дія стрибка обовʼязково перевіряє \`isGrounded\` (або власний ground check, наступна секція) **до** застосування вертикального імпульсу. Якщо потрібен подвійний стрибок як **навмисна** механіка - його реалізують явним лічильником дозволених стрибків (\`jumpsRemaining\`), а не випадково через відсутність перевірки.

\`\`\`csharp
// Навмисний подвійний стрибок (не обов'язково для checkpoint):
private int jumpsRemaining;

void Update()
{
    if (controller.isGrounded)
    {
        jumpsRemaining = 2;
    }

    if (Input.GetKeyDown(KeyCode.Space) && jumpsRemaining > 0)
    {
        verticalVelocity = Mathf.Sqrt(jumpHeight * -2f * gravity);
        jumpsRemaining--;
    }
}
\`\`\`

**Зроби зараз (3 хв):** перевір свій код стрибка - переконайся, що без затиснутого Space в повітрі персонаж не може стрибнути повторно, лише після приземлення.`,
      },
      {
        title: 'Physics.CheckSphere: власний, точніший ground check',
        content: `Вбудований \`isGrounded\` іноді неточний на краях платформ чи сходах. Альтернатива - **власна перевірка** через невидиму точку під ногами персонажа і \`Physics.CheckSphere\`:

\`\`\`csharp
[SerializeField] private Transform groundCheck;
[SerializeField] private float groundDistance = 0.3f;
[SerializeField] private LayerMask groundMask;
private bool isGrounded;

void Update()
{
    isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
    // далі використовуй isGrounded замість controller.isGrounded
}
\`\`\`

\`groundCheck\` - порожній дочірній GameObject, розміщений точно біля "ступень" персонажа. \`CheckSphere\` перевіряє, чи є Collider у вказаному радіусі навколо цієї точки, на вказаному **LayerMask** (шар "Ground" - фільтр, що перевіряє лише потрібні обʼєкти, ігноруючи, наприклад, самого персонажа чи монети).

**Зроби зараз (7 хв):** створи порожній дочірній GameObject \`GroundCheck\` під ногами \`Player\`, налаштуй LayerMask "Default" чи створений шар "Ground", онови код на власну перевірку CheckSphere.`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Персонаж "висить" у повітрі без падіння',
      explanation: 'CharacterController не має вбудованої гравітації - без ручного коду вертикальна швидкість завжди 0.',
      correctApproach: 'Накопичуй verticalVelocity += gravity * Time.deltaTime кожен кадр і застосовуй через Move().',
    },
    {
      mistake: 'Персонаж може стрибати нескінченно в повітрі',
      explanation: 'Перевірка isGrounded відсутня або неправильно розташована перед застосуванням стрибка.',
      correctApproach: 'Завжди перевіряй isGrounded (чи власний ground check) безпосередньо перед тим, як застосувати вертикальний імпульс стрибка.',
    },
    {
      mistake: 'verticalVelocity встановлено рівно 0 при isGrounded, і isGrounded миготить',
      explanation: 'На нерівностях підлоги нульова вертикальна швидкість не дає стабільного "притиску" до землі.',
      correctApproach: 'Використовуй невелике постійне значення на кшталт -2f замість 0 при isGrounded.',
    },
  ],
  summary:
    'Ти реалізував ручну симуляцію гравітації для CharacterController, використав isGrounded для стабільного визначення землі, додав стрибок з передбачуваною висотою через фізичну формулу і зрозумів, як уникнути помилкового нескінченного стрибка в повітрі, а також ознайомився з власним ground check через Physics.CheckSphere.',
  practiceTask: {
    title: 'Практика: гравітація і стрибок (~30 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** персонаж з 4.1-4.2, що падає під власною симульованою гравітацією і стрибає рівно один раз за приземлення.

### Part A - Гравітація (разом / 10 хв)
1. Додай verticalVelocity і симуляцію гравітації в PlayerMovement.
2. Перевір isGrounded-стабілізацію (-2f замість 0).
3. Play: персонаж падає і стабільно стоїть на підлозі.

### Part B - Стрибок (самі / 12-15 хв)
1. Додай стрибок по Space з перевіркою isGrounded, використовуючи формулу Mathf.Sqrt(jumpHeight * -2f * gravity).
2. Перевір, що повторне натискання Space в повітрі не дає ефекту.
3. Підбери jumpHeight так, щоб стрибок виглядав природно для платформера.

### Критерій "зараховано"
- Персонаж падає під гравітацією і стабільно стоїть на підлозі
- Стрибок працює по Space лише коли isGrounded true
- Неможливо стрибнути повторно, перебуваючи в повітрі`,
    hints: [
      'Гравітація - негативне число (наприклад -9.81f), додається до verticalVelocity кожен кадр',
      'Формула Mathf.Sqrt(jumpHeight * -2f * gravity) дає передбачувану висоту стрибка',
      'Перевіряй isGrounded саме перед застосуванням стрибка, а не після',
    ],
    optionalChallenge:
      'Реалізуй Physics.CheckSphere з окремим GroundCheck-обʼєктом замість controller.isGrounded і порівняй поведінку на краю платформи.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Чи має CharacterController вбудовану гравітацію "з коробки"?',
        options: [
          'Так, як і Rigidbody',
          'Ні, гравітацію потрібно симулювати вручну в коді',
          'Лише в новіших версіях Unity',
          'Так, але лише для 2D-проєктів',
        ],
        correctAnswer: 1,
        explanation: 'На відміну від Rigidbody, CharacterController вимагає ручної симуляції гравітації.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Навіщо встановлювати verticalVelocity = -2f (а не 0) при isGrounded?',
        options: [
          'Це просто традиція',
          'Стабілізує виявлення землі на нерівностях, запобігаючи миготінню isGrounded',
          'Це прискорює рух персонажа',
          'Це обовʼязкова вимога компілятора',
        ],
        correctAnswer: 1,
        explanation: 'Невеликий постійний "притиск" вниз стабільніший за рівний нуль на нерівній поверхні.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Яка умова обовʼязкова перед застосуванням стрибка, щоб уникнути стрибка в повітрі?',
        options: [
          'Input.GetKey(KeyCode.W)',
          'controller.isGrounded (або власний ground check)',
          'Time.deltaTime > 0',
          'Немає жодної обовʼязкової умови',
        ],
        correctAnswer: 1,
        explanation: 'Перевірка землі перед стрибком запобігає нескінченному стрибанню в повітрі.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що робить Physics.CheckSphere?',
        options: [
          'Створює нову сферу-GameObject',
          'Перевіряє, чи є Collider у вказаному радіусі навколо точки',
          'Змінює форму Collider на сферичну',
          'Видаляє всі Collider у сцені',
        ],
        correctAnswer: 1,
        explanation: 'CheckSphere повертає true, якщо в заданій сфері знайдено Collider відповідного шару.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Як реалізувати навмисний подвійний стрибок правильно?',
        options: [
          'Прибрати перевірку isGrounded взагалі',
          'Використати явний лічильник дозволених стрибків (jumpsRemaining)',
          'Збільшити gravity удвічі',
          'Це неможливо реалізувати з CharacterController',
        ],
        correctAnswer: 1,
        explanation: 'Лічильник jumpsRemaining дозволяє контрольовано дозволити обмежену кількість стрибків у повітрі.',
      },
    ],
  },
}

export const ukLesson44 = {
  lessonId: 'lesson-unity-4-4',
  moduleId: 'module-04',
  order: 4,
  title: '4.4 - Основи анімації: Animator і переходи',
  theoryMinutes: 35,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Розуміти звʼязок Animator Controller, Animation Clip і компонента Animator',
    'Створювати параметри Animator (Bool, Float, Trigger)',
    'Налаштовувати переходи (Transitions) між станами анімації',
    'Керувати параметрами Animator з C#-коду',
    'Синхронізувати стан руху персонажа з анімацією',
  ],
  theory: {
    sections: [
      {
        title: 'Animator, Animator Controller, Animation Clip - три складові',
        content: `Анімація персонажа в Unity складається з трьох понять, які легко сплутати новачку:

| Поняття | Що це |
|---------|-------|
| **Animation Clip** | Файл із самим рухом (наприклад, "Idle.anim", "Run.anim") - як окремий відеокліп |
| **Animator Controller** | asset-файл зі схемою станів і переходів між кліпами (як блок-схема "коли який кліп грати") |
| **Animator** | компонент на GameObject, що виконує Animator Controller у реальному часі |

Для готових персонажів з Asset Store чи безкоштовних пакетів Animation Clip зазвичай уже є. Для навчання можна використати найпростіші вбудовані рухи (обертання чи зміну масштабу через Animation вікно) або готові безкоштовні анімації з Unity Asset Store.

**Зроби зараз (5 хв):** виділи \`Player\`, додай компонент **Add Component → Animator**, створи новий Animator Controller (**Create → Animator Controller** в Project), перетягни його в поле Controller компонента Animator.`,
      },
      {
        title: 'Стани і переходи в Animator Controller',
        content: `Відкрий Animator Controller подвійним кліком - зʼявиться вікно **Animator** з візуальною схемою: прямокутники-**стани** (State), зʼєднані стрілками-**переходами** (Transition).

Типова схема персонажа-платформера:

\`\`\`
Idle (стояння) → Run (біг) → Jump (стрибок) → назад до Idle
\`\`\`

Кожен стан містить посилання на конкретний Animation Clip. Переходи визначають, **за яких умов** Animator перемикається з одного стану на інший - ці умови базуються на **параметрах**.

**Зроби зараз (5 хв):** у відкритому Animator, правий клік на порожньому місці → **Create State → Empty** - створи два порожні стани \`Idle\` і \`Run\` (навіть без реальних Animation Clip поки що, для розуміння структури).`,
      },
      {
        title: 'Параметри Animator: Bool, Float, Trigger, Int',
        content: `Переходи між станами контролюються **параметрами** - змінними всередині Animator Controller, які **встановлюються з коду**:

| Тип параметра | Приклад використання |
|-----------------|------------------------|
| **Bool** | \`isRunning\` - true/false, чи біжить персонаж |
| **Float** | \`speed\` - число швидкості для плавного змішування (blend) анімацій |
| **Trigger** | \`jumpTrigger\` - одноразова подія, автоматично скидається після використання |
| **Int** | \`comboStep\` - лічильник для послідовностей атак |

Додати параметр: у вікні Animator відкрий вкладку **Parameters** (зазвичай зліва) → **+** → обери тип → дай імʼя (наприклад, \`isRunning\`).

**Зроби зараз (5 хв):** додай параметр \`isRunning\` типу Bool у своєму Animator Controller. Клікни на стрілку-перехід між \`Idle\` і \`Run\` → в Inspector переходу додай умову (Condition) \`isRunning = true\`.`,
      },
      {
        title: 'Керування Animator з коду',
        content: `З C#-скрипта параметри Animator змінюються через методи компонента **Animator**:

\`\`\`csharp
using UnityEngine;

public class PlayerAnimatorController : MonoBehaviour
{
    private Animator animator;
    private CharacterController controller;

    void Start()
    {
        animator = GetComponent<Animator>();
        controller = GetComponent<CharacterController>();
    }

    void Update()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        bool isMoving = Mathf.Abs(horizontal) > 0.1f || Mathf.Abs(vertical) > 0.1f;

        animator.SetBool("isRunning", isMoving);

        if (Input.GetKeyDown(KeyCode.Space) && controller.isGrounded)
        {
            animator.SetTrigger("jumpTrigger");
        }
    }
}
\`\`\`

\`SetBool(name, value)\` встановлює Bool-параметр; \`SetTrigger(name)\` активує Trigger-параметр один раз (Animator сам скидає його після переходу). Ці методи - **міст** між твоєю логікою руху (Update, isGrounded) і візуальним станом анімації.

**Зроби зараз (7 хв):** створи \`PlayerAnimatorController\`, прикріпи до \`Player\`, перевір через Window → Animation → Animator вікно наживо в Play mode, як \`isRunning\` перемикається при русі.`,
      },
      {
        title: 'Blend через Float-параметр: плавний перехід швидкості',
        content: `Для природнішого результату (замість різкого "стоїть/біжить") можна використати Float-параметр \`speed\` і **Blend Tree** - спеціальний тип стану Animator, що плавно змішує кілька анімацій (Idle, Walk, Run) залежно від числового значення:

\`\`\`csharp
float currentSpeed = new Vector2(horizontal, vertical).magnitude;
animator.SetFloat("speed", currentSpeed);
\`\`\`

Тут використано \`Vector2\` замість \`Vector3\`, бо нас цікавить лише "наскільки сильно нахилені осі управління" (2D-величина X/Z вводу), а не 3D-простір. Blend Tree налаштовується у вікні Animator (правий клік у стані → **Create → From New Blend Tree**), але для checkpoint достатньо розуміти сам принцип - плавний перехід через Float-параметр, а не миттєве перемикання через Bool.

**Зроби зараз (3 хв):** обміркуй різницю між Bool-підходом (різке перемикання) і Float+Blend Tree (плавне змішування) - який підійде для гри з бігом і ходьбою одночасно?`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Плутає Animation Clip, Animator Controller і компонент Animator',
      explanation: 'Це три різні речі: файл руху, схема станів і виконавчий компонент відповідно.',
      correctApproach: 'Запамʼятай ланцюжок: Animator (компонент) виконує Animator Controller (схему), яка посилається на Animation Clip (сам рух).',
    },
    {
      mistake: 'Параметр створено, але перехід між станами не спрацьовує',
      explanation: 'Умова (Condition) на стрілці-переході не додана або не відповідає імені/типу параметра.',
      correctApproach: 'Перевір Inspector самого переходу (клікни на стрілку) - там має бути Condition з правильним параметром і значенням.',
    },
    {
      mistake: 'Використав SetBool для одноразової дії типу стрибка',
      explanation: 'Bool залишається true, поки явно не встановити false, що може викликати повторні спрацювання переходу.',
      correctApproach: 'Для одноразових подій (стрибок, атака) використовуй Trigger - він автоматично скидається після спрацювання переходу.',
    },
  ],
  summary:
    'Ти зрозумів звʼязок Animation Clip, Animator Controller і компонента Animator, навчився створювати параметри (Bool, Float, Trigger) і переходи між станами, а також керувати ними з коду через SetBool/SetTrigger/SetFloat синхронно з рухом персонажа.',
  practiceTask: {
    title: 'Практика: Animator для стану руху (~30 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** Animator Controller з мінімум двома станами і робочим переходом, керованим з коду.

### Part A - Структура Animator (разом / 12 хв)
1. Створи Animator Controller, признач \`Player\`.
2. Створи два стани \`Idle\` і \`Run\` (можна порожні, без реальних Animation Clip, для розуміння структури).
3. Додай параметр Bool \`isRunning\`, налаштуй переходи Idle→Run (isRunning = true) і Run→Idle (isRunning = false).

### Part B - Керування з коду (самі / 13-15 хв)
1. Створи скрипт \`PlayerAnimatorController\`, що визначає isMoving з Input.GetAxis і викликає animator.SetBool("isRunning", isMoving).
2. Додай Trigger \`jumpTrigger\`, що активується при стрибку (Space + isGrounded).
3. Перевір Play з відкритим вікном Animator - переходи між станами мають підсвічуватись відповідно до руху.

### Критерій "зараховано"
- Animator Controller має мінімум 2 стани і 1 параметр Bool
- Перехід між станами реально спрацьовує при русі персонажа
- SetBool/SetTrigger викликаються з коду синхронно з логікою руху`,
    hints: [
      'Порожні стани (без реального Animation Clip) достатні для перевірки логіки переходів',
      'Клікни на стрілку-перехід, щоб побачити і додати Condition в Inspector',
      'Trigger автоматично скидається Animator-ом після спрацювання - не потрібно вручну ставити false',
    ],
    optionalChallenge:
      'Заміни Bool isRunning на Float speed і спробуй створити найпростіший Blend Tree між Idle і Run для плавнішого переходу.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що з переліченого є "файлом самого руху" (наприклад, ходьби)?',
        options: ['Animator Controller', 'Animation Clip', 'Компонент Animator', 'Параметр Bool'],
        correctAnswer: 1,
        explanation: 'Animation Clip - файл, що містить сам запис руху.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Який тип параметра найкраще підходить для одноразової дії типу стрибка?',
        options: ['Bool', 'Float', 'Trigger', 'String'],
        correctAnswer: 2,
        explanation: 'Trigger автоматично скидається після спрацювання переходу, ідеально для одноразових подій.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Який метод компонента Animator встановлює Bool-параметр з коду?',
        options: ['SetTrigger', 'SetBool', 'SetInteger', 'Play'],
        correctAnswer: 1,
        explanation: 'SetBool(name, value) встановлює значення Bool-параметра.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Де налаштовується умова (Condition), за якою відбувається перехід між станами?',
        options: [
          'В Inspector самого стрілки-переходу в вікні Animator',
          'У коді C# напряму',
          'У вікні Console',
          'У Project Settings',
        ],
        correctAnswer: 0,
        explanation: 'Умови переходу налаштовуються при виділенні конкретного Transition у вікні Animator.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Що виконує компонент Animator на GameObject?',
        options: [
          'Зберігає текстури персонажа',
          'Виконує в реальному часі логіку, задану Animator Controller',
          'Керує фізикою персонажа',
          'Замінює CharacterController',
        ],
        correctAnswer: 1,
        explanation: 'Animator - компонент, що виконує схему станів і переходів з Animator Controller.',
      },
    ],
  },
}

export const ukLesson45 = {
  lessonId: 'lesson-unity-4-5',
  moduleId: 'module-04',
  order: 5,
  title: '4.5 - Checkpoint: персонаж-платформер',
  theoryMinutes: 20,
  quizMinutes: 15,
  estimatedTime: 60,
  learningObjectives: [
    'Обʼєднати CharacterController, камеру-слідкувач, стрибок і Animator в одного персонажа',
    'Самостійно налаштувати параметри руху для гарного "відчуття" гри',
    'Перевірити поведінку персонажа на тестовому рівні з платформами',
    'Оцінити результат за рубрикою модуля',
  ],
  theory: {
    sections: [
      {
        title: 'Що зібралось у голові за модуль 4',
        content: `За чотири уроки модуля 4 ти пройшов шлях від "статичної камери й відсутності руху персонажа" до повноцінного контролера платформера:

- **4.1**: CharacterController, Input.GetAxis, Move(), нормалізація вектора
- **4.2**: камера-слідкувач через LateUpdate, offset, Vector3.Lerp
- **4.3**: ручна гравітація, isGrounded, стрибок, захист від подвійного стрибка
- **4.4**: Animator Controller, параметри, переходи, керування з коду

Сьогодні - **персонаж-платформер**: усе разом працює на тестовому рівні з кількома платформами різної висоти, куди персонаж має вміти застрибувати.

**Зроби зараз (2 хв):** переконайся, що всі скрипти модуля 4 компілюються без помилок і персонаж не "провалюється" крізь підлогу перед початком checkpoint-практики.`,
      },
      {
        title: 'Чекліст перед практикою',
        content: `- [ ] CharacterController рухається по WASD/стрілках без прискорення по діагоналі
- [ ] Камера плавно слідує за персонажем через LateUpdate
- [ ] Персонаж падає під власною гравітацією і стабільно стоїть на землі
- [ ] Стрибок працює лише коли isGrounded, без стрибка в повітрі
- [ ] Animator має мінімум перехід Idle↔Run, керований з коду

Якщо якийсь пункт викликає сумнів - поверни до відповідного уроку 4.1-4.4 перед checkpoint-практикою.`,
      },
      {
        title: 'Як викладач оцінює цей урок (рубрика)',
        content: `| Рівень | Що видно в проєкті | Типовий коментар викладача |
|--------|------------------------|------------------------------|
| **Не зараховано** | Персонаж не рухається / провалюється крізь підлогу / камера статична | «Доведи базовий рух і гравітацію до робочого стану» |
| **Зараховано** | Рух, камера-слідкувач, стрибок на землі, без подвійного стрибка | «Базовий контролер платформера працює» |
| **Добре** | Плавна камера через Lerp, Animator перемикає Idle/Run, кілька платформ пройдені | «Готовий фундамент для UI і циклу гри в M5» |
| **Відмінно** | Blend Tree чи додаткові анімації, продумані значення jumpHeight/moveSpeed, чистий код | «Показовий приклад для портфоліо» |`,
      },
    ],
  },
  commonMistakes: [
    {
      mistake: 'Тестує лише на рівній підлозі, не перевіряючи стрибки між платформами різної висоти',
      explanation: 'Checkpoint вимагає перевірки саме платформерної механіки, а не лише руху по прямій.',
      correctApproach: 'Збери тестовий рівень з мінімум трьома платформами різної висоти й перевір стрибки між ними.',
    },
    {
      mistake: 'Камера "провалюється" крізь платформи чи застрягає в стінах через різке позиціювання',
      explanation: 'Offset камери підібраний без урахування геометрії тестового рівня.',
      correctApproach: 'Підбери offset і, за потреби, обмеж мінімальну висоту камери, щоб вона не проходила крізь платформи.',
    },
  ],
  summary:
    'Ти зібрав повноцінного персонажа-платформера: CharacterController з нормалізованим рухом, плавна камера-слідкувач, симульована гравітація зі стрибком без подвійного стрибка в повітрі і Animator, що реагує на стан руху - готовий фундамент для UI та циклу гри в модулі 5.',
  practiceTask: {
    title: 'Checkpoint практика: персонаж-платформер (~35 хв)',
    difficulty: 'intermediate',
    description: `**Мета:** повністю самостійний персонаж-платформер на тестовому рівні з кількома платформами.

### Part A - Тестовий рівень (10 хв)
1. Збери 3-4 платформи різної висоти (Cube з Collider, без Rigidbody) з проміжками, які персонаж може перестрибнути.

### Part B - Персонаж (самостійно, спираючись на 4.1-4.4, 20 хв)
1. CharacterController з нормалізованим рухом по WASD.
2. Камера-слідкувач з offset і Vector3.Lerp.
3. Гравітація і стрибок з перевіркою isGrounded.
4. Animator з переходом Idle↔Run, керований з коду.

### Part C - Здача + челендж (5 хв)
1. Пройди тестовий рівень, застрибуючи на всі платформи по черзі.
2. **Челендж:** додай Trigger для стрибка в Animator і перевір спрацювання в реальному часі через вікно Animator під час Play.

### Критерій "зараховано"
- Персонаж рухається, стрибає і не провалюється крізь жодну платформу
- Камера плавно слідує, не втрачаючи персонажа з кадру
- Animator реагує на стан руху хоча б через один параметр`,
    hints: [
      'Якщо персонаж застрягає між платформами - перевір Step Offset і Slope Limit CharacterController',
      'Camera offset підбирай так, щоб бачити і персонажа, і платформу під ним одночасно',
      'Якщо застряг - поверни до конкретного уроку 4.1-4.4, а не переписуй усе з нуля',
    ],
    optionalChallenge:
      'Додай платформу, яка рухається туди-сюди (простий Vector3.Lerp між двома точками в окремому скрипті) - перевір, чи персонаж коректно на неї застрибує.',
  },
  quiz: {
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q1',
        type: MC,
        question: 'Що обовʼязково потрібно перевірити на тестовому рівні checkpoint модуля 4?',
        options: [
          'Лише рух по рівній підлозі',
          'Стрибки між платформами різної висоти',
          'Лише роботу Animator без руху',
          'Швидкість завантаження сцени',
        ],
        correctAnswer: 1,
        explanation: 'Checkpoint модуля 4 перевіряє саме платформерну механіку зі стрибками між рівнями висоти.',
      },
      {
        id: 'q2',
        type: MC,
        question: 'Де має бути розташований код камери, що слідує за персонажем?',
        options: ['Update', 'LateUpdate', 'Awake', 'FixedUpdate'],
        correctAnswer: 1,
        explanation: 'LateUpdate гарантує, що камера бачить фінальну позицію персонажа за кадр.',
      },
      {
        id: 'q3',
        type: MC,
        question: 'Яка умова обовʼязкова перед стрибком персонажа?',
        options: [
          'Input.GetAxis("Horizontal") > 0',
          'isGrounded (персонаж на землі)',
          'Animator.SetTrigger вже викликано',
          'Камера дивиться на персонажа',
        ],
        correctAnswer: 1,
        explanation: 'Перевірка землі перед стрибком - головний захист від нескінченного стрибка в повітрі.',
      },
      {
        id: 'q4',
        type: MC,
        question: 'Що з переліченого НЕ входить у базовий чекліст модуля 4?',
        options: [
          'Рух без прискорення по діагоналі',
          'Плавна камера через Lerp',
          'ScriptableObject для збереження даних рівня',
          'Animator з переходом Idle/Run',
        ],
        correctAnswer: 2,
        explanation: 'ScriptableObject - тема модуля 7, а не checkpoint модуля 4.',
      },
      {
        id: 'q5',
        type: MC,
        question: 'Що визначає рівень "Відмінно" для checkpoint модуля 4?',
        options: [
          'Лише наявність будь-якого руху',
          'Продумані параметри руху/стрибка, Blend Tree чи додаткові анімації, чистий код',
          'Відсутність платформ у сцені',
          'Використання лише Rigidbody без CharacterController',
        ],
        correctAnswer: 1,
        explanation: 'Рівень "Відмінно" вимагає додаткового поліша й якості понад базовий мінімум.',
      },
    ],
  },
}
