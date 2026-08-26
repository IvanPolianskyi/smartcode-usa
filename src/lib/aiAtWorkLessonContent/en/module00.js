/** AI for Real Life - module 00 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson001 = {
	lessonId: 'ai-lesson-00-1',
	moduleId: 'module-00',
	order: 1,
	title: 'Welcome to AI for Real Life',
	estimatedTime: 45,
	theoryMinutes: 25,
	quizMinutes: 10,
	learningObjectives: [
		'See how the course is structured',
		'Set up a free AI chat account you will reuse',
		'Run your first structured brief',
	],
	theory: {
		sections: [
			{
				title: 'What you will leave with',
				content: `This program builds a **runnable content system**: prompting, generative media, writing that still sounds human, and a weekly pipeline you can run for yourself or a client.

**Six modules:** how models work → prompting → images/video → writing → weekly system → ethics + capstone.

Every lesson is **theory → practice brief → quiz**. Practice happens in your tools (ChatGPT, Claude, Gemini, Midjourney, CapCut, etc.). We stay tool-agnostic on purpose.`,
			},
			{
				title: 'Set up one chat tool',
				content: `Pick **one** text model you can open today (free tier is fine).

**Do this now**
1. Create or sign into the account.
2. Create a folder named \`AI for Real Life\`.
3. Start a chat titled \`Course - Lesson 00-1\`.`,
			},
			{
				title: 'Your first structured brief',
				content: `Weak ask: “Help me with content.”

Strong brief = **role + task + constraints + format**:

\`\`\`text
Role: You are a practical content coach for a 17-year-old creator.
Task: Draft a one-week plan for posting about learning AI skills.
Constraints: Max 7 posts. No jargon. Each post under 30 minutes to make.
Format: Markdown table - Day | Platform | Hook | Format | Time estimate.
\`\`\`

Run it. If fluffy, reply: “Cut fluff. Shorter hooks. Keep the table.”`,
			},
		],
	},
	commonMistakes: [
		{
			mistake: 'Jumping between five tools in week one',
			explanation: 'You learn interfaces instead of skills.',
			correctApproach: 'One chat tool + one notes folder until Module 02.',
		},
		{
			mistake: 'Treating the first output as final',
			explanation: 'First drafts are raw material.',
			correctApproach: 'Always do one improve pass with a clear instruction.',
		},
		{
			mistake: 'Skipping saves',
			explanation: 'Good prompts disappear in chat history.',
			correctApproach: 'Copy the winning prompt and output into your course folder.',
		},
	],
	summary:
		'You know the course map, have one chat tool ready, and ran a role+task+constraints+format brief. Next: what models actually do under the hood.',
	practiceTask: {
		title: 'First brief (~20 min)',
		difficulty: 'beginner',
		description: `**Goal:** run one structured brief and save it.

1. Open your chat tool.
2. Paste the week-plan brief from theory (or adapt the topic).
3. Ask one revision: shorter hooks, stricter time estimates.
4. **Save:** prompt + best table into \`AI for Real Life / 00-1\`.`,
		hints: [
			'If the model ignores the table, say: “Output only the markdown table.”',
			'Topic can be your hobby - relevance beats perfection.',
		],
		optionalChallenge: 'Add a second table that batches similar formats onto one production day.',
	},
	quiz: {
		passingScore: 70,
		timeLimit: 10,
		questions: [
			{
				id: 'q1',
				type: MC,
				question: 'What four parts make a strong brief in this course?',
				options: [
					'Role, task, constraints, format',
					'Emoji, hashtags, virality, SEO',
					'Model name, API key, temperature, tokens',
					'Video, image, audio, code',
				],
				correctAnswer: 0,
				explanation: 'Those four keep outputs usable and reusable.',
			},
			{
				id: 'q2',
				type: MC,
				question: 'Where should practice happen?',
				options: [
					'Only inside SmartCode’s code runner',
					'In your own AI tools, then save results',
					'Only on paper',
					'Only after buying every premium plan',
				],
				correctAnswer: 1,
				explanation: 'The course is tool-agnostic and brief-driven.',
			},
			{
				id: 'q3',
				type: MC,
				question: 'What is the main outcome of the whole program?',
				options: [
					'A PhD in machine learning',
					'A content system you can keep running',
					'A Roblox game',
					'A Python web server',
				],
				correctAnswer: 1,
				explanation: 'Marketing and curriculum aim at a runnable system.',
			},
			{
				id: 'q4',
				type: MC,
				question: 'What should you do after a good first result?',
				options: [
					'Close the tab and never revisit it',
					'One improve pass, then save prompt + output',
					'Regenerate 50 times with no notes',
					'Post raw output with zero edit',
				],
				correctAnswer: 1,
				explanation: 'Iteration + saves build your library.',
			},
		],
	},
}

export const aiLesson002 = {
	lessonId: 'ai-lesson-00-2',
	moduleId: 'module-00',
	order: 2,
	title: 'What generative models actually do',
	estimatedTime: 50,
	theoryMinutes: 30,
	quizMinutes: 10,
	learningObjectives: [
		'Describe prediction vs search vs memory',
		'Separate training data from your chat context',
		'Name three things models are bad at',
	],
	theory: {
		sections: [
			{
				title: 'Prediction, not magic',
				content: `A large language model predicts **likely next tokens** given the text so far. It is not (by default):

- A live search engine
- A database of your private files
- A guarantee of truth

**Mental model:** fluent autocomplete trained on a huge pile of text, then steered by your prompt and this conversation.`,
			},
			{
				title: 'Training vs context',
				content: `| Layer | What it is | You control it? |
|--------|------------|-----------------|
| Training | Patterns learned earlier | No |
| Product rules | Guardrails | Partially |
| Context window | This chat + uploads | Yes |
| Tools | Browse, code, image | When enabled |

When the model “remembers” earlier turns, that is **context**, not lifelong memory. Long chats drop early details when the window fills.`,
			},
			{
				title: 'What models are bad at',
				content: `Expect trouble with:

1. Exact facts and citations without verification
2. Fresh events after the cutoff (unless browsing is on)
3. Private specifics you never provided
4. Your unique voice unless you teach it with examples

**Do this now:** ask a fact you know, then ask for tonight’s live sports score - notice hedges or invention.`,
			},
		],
	},
	commonMistakes: [
		{
			mistake: 'Believing the model “looked it up” by default',
			explanation: 'Fluent text feels like research.',
			correctApproach: 'Assume no browsing unless the product shows sources.',
		},
		{
			mistake: 'Pasting secrets into chat “for a demo”',
			explanation: 'Vendors may store prompts.',
			correctApproach: 'Never paste passwords, keys, or private client data.',
		},
		{
			mistake: 'One giant chat for every project',
			explanation: 'Context gets noisy.',
			correctApproach: 'New thread per project or lesson.',
		},
	],
	summary:
		'Models predict tokens from context; they are not automatic search or memory. Next: hallucinations and bias.',
	practiceTask: {
		title: 'Map a real answer (~20 min)',
		difficulty: 'beginner',
		description: `**Goal:** separate prediction from lookup.

1. Ask a factual question you already know.
2. Retry with: “If unsure, say UNSURE - do not invent.”
3. Ask something that needs today’s news.
4. **Save:** notes - solid / hedged / wrong for each.`,
		hints: [
			'Compare with a known source.',
			'Note whether the UI shows browsing or citations.',
		],
	},
	quiz: {
		passingScore: 70,
		timeLimit: 10,
		questions: [
			{
				id: 'q1',
				type: MC,
				question: 'What does an LLM primarily do?',
				options: [
					'Predict likely next tokens from context',
					'Download your hard drive',
					'Always query Google',
					'Run your business automatically',
				],
				correctAnswer: 0,
				explanation: 'Next-token prediction is the core mechanism.',
			},
			{
				id: 'q2',
				type: MC,
				question: 'What is the context window?',
				options: [
					'The model’s childhood memories',
					'The current chat/uploads the model can see',
					'Your Wi-Fi password',
					'A camera lens setting only',
				],
				correctAnswer: 1,
				explanation: 'Context is the working memory of the conversation.',
			},
			{
				id: 'q3',
				type: MC,
				question: 'Which task is riskiest without verification?',
				options: [
					'Brainstorming blog titles',
					'Inventing academic citations',
					'Rewriting your own paragraph',
					'Formatting a markdown table',
				],
				correctAnswer: 1,
				explanation: 'Citations are a classic hallucination magnet.',
			},
			{
				id: 'q4',
				type: MC,
				question: 'Why start a new chat per project?',
				options: [
					'Because models hate long chats for no reason',
					'To keep context clean and on-task',
					'To reset your internet',
					'Because quizzes require it',
				],
				correctAnswer: 1,
				explanation: 'Noisy context degrades results.',
			},
		],
	},
}

export const aiLesson003 = {
	lessonId: 'ai-lesson-00-3',
	moduleId: 'module-00',
	order: 3,
	title: 'Hallucinations, bias, and quiet failure modes',
	estimatedTime: 50,
	theoryMinutes: 30,
	quizMinutes: 10,
	learningObjectives: [
		'Recognize confident wrong answers',
		'Add a verification step to any workflow',
		'Spot when a model is inventing sources',
	],
	theory: {
		sections: [
			{
				title: 'Confident ≠ correct',
				content: `A **hallucination** is a fluent answer that is wrong or unsupported. Models optimize for sounding coherent, not for epistemic humility.

**Red flags:** specific papers/URLs you cannot open, exact statistics with no source, “as of…” with no browse tool, agreeing with a false premise you planted.`,
			},
			{
				title: 'Bias and framing',
				content: `Training data and product rules shape defaults: tone, culture, what gets emphasized. Bias is often a **statistical default**, not a cartoon villain.

For health, law, politics, or hiring: AI is a drafting aid only. Final judgment stays human.`,
			},
			{
				title: 'Verification loop',
				content: `1. **Claim** - what did it assert?
2. **Check** - open a primary source.
3. **Correct** - paste the fix back into chat.
4. **Ship** - only after the check.

\`\`\`text
List every factual claim as bullets.
Mark each: VERIFIED / NEEDS SOURCE / DELETE.
Do not invent sources.
\`\`\``,
			},
		],
	},
	commonMistakes: [
		{
			mistake: 'Trusting “links to studies” without opening them',
			explanation: 'URLs and titles are often fabricated.',
			correctApproach: 'Open every link; prefer known databases.',
		},
		{
			mistake: 'No verification for public posts',
			explanation: 'One wrong fact trashes trust.',
			correctApproach: 'Verification loop before publish.',
		},
		{
			mistake: 'Using AI alone for medical/legal decisions',
			explanation: 'High stakes amplify harm.',
			correctApproach: 'Professionals and primary sources only.',
		},
	],
	summary:
		'Fluency hides errors. You have a claim→check→correct loop. Next: pick a small toolkit you will stick with.',
	practiceTask: {
		title: 'Break a confident answer (~25 min)',
		difficulty: 'beginner',
		description: `**Goal:** catch a hallucination on purpose.

1. Ask for five peer-reviewed papers on a niche topic you know.
2. Try to open each citation.
3. Re-ask with the verification prompt from theory.
4. **Save:** which citations failed + your improved prompt.`,
		hints: [
			'Niche hobby or local topics make failures obvious.',
			'If links work, still note how you verified them.',
		],
	},
	quiz: {
		passingScore: 70,
		timeLimit: 10,
		questions: [
			{
				id: 'q1',
				type: MC,
				question: 'What is a hallucination here?',
				options: [
					'A graphics card overheating',
					'A fluent but wrong or unsupported answer',
					'Any creative story',
					'A slow internet connection',
				],
				correctAnswer: 1,
				explanation: 'Coherence without truth.',
			},
			{
				id: 'q2',
				type: MC,
				question: 'Best first response to a specific statistic from a model?',
				options: [
					'Post it immediately',
					'Verify with a primary source',
					'Ask it to make the number bigger',
					'Ignore all numbers forever',
				],
				correctAnswer: 1,
				explanation: 'Verification before shipping.',
			},
			{
				id: 'q3',
				type: MC,
				question: 'Why can invented citations look real?',
				options: [
					'Models optimize for plausible patterns',
					'Your browser invents tabs',
					'Quizzes inject fake papers',
					'Only paid plans hallucinate',
				],
				correctAnswer: 0,
				explanation: 'Plausible text is the training objective.',
			},
			{
				id: 'q4',
				type: MC,
				question: 'Which domain needs the strictest human oversight?',
				options: [
					'Brainstorming podcast names',
					'Medical or legal decisions',
					'Choosing a color palette',
					'Renaming project folders',
				],
				correctAnswer: 1,
				explanation: 'High-stakes domains amplify harm.',
			},
		],
	},
}

export const aiLesson004 = {
	lessonId: 'ai-lesson-00-4',
	moduleId: 'module-00',
	order: 4,
	title: 'Pick your toolkit',
	estimatedTime: 45,
	theoryMinutes: 25,
	quizMinutes: 10,
	learningObjectives: [
		'Compare chat, image, and video tools at a high level',
		'Decide free vs paid for your use case',
		'Document a personal stack you will stick to',
	],
	theory: {
		sections: [
			{
				title: 'Three lanes',
				content: `| Lane | Examples | Use for |
|------|----------|---------|
| Chat / writing | ChatGPT, Claude, Gemini | Briefs, drafts, plans, edits |
| Image | Midjourney, DALL·E, Ideogram, Flux | Thumbnails, posts, concepts |
| Video / motion | Runway, Pika, CapCut+AI | Shorts, motion from stills |

Modules 00-01 only need **chat**. Image/video open in Module 02.`,
			},
			{
				title: 'Free vs paid',
				content: `Upgrade when you hit a real limit: rate caps, watermark, commercial license, or speed - not FOMO.

**Rule:** stay free until a paid feature blocks a specific deliverable in this course.`,
			},
			{
				title: 'Write your stack card',
				content: `\`\`\`text
Chat tool:
Image tool (later):
Video tool (later):
Notes / library folder:
Disclosure default:
Things I never paste into prompts:
\`\`\`

Create folders: \`prompts\`, \`outputs\`, \`media\`. This card returns in Module 05.`,
			},
		],
	},
	commonMistakes: [
		{
			mistake: 'Collecting accounts instead of finishing briefs',
			explanation: 'Tool tourism kills momentum.',
			correctApproach: 'One tool per lane until the capstone.',
		},
		{
			mistake: 'Paying annually on day one',
			explanation: 'You may switch after trying workflows.',
			correctApproach: 'Monthly or free until the workflow sticks.',
		},
		{
			mistake: 'No notes folder',
			explanation: 'Prompts scatter.',
			correctApproach: 'Single course library from lesson one.',
		},
	],
	summary:
		'You chose a small stack and documented it. Module 01 turns prompting into a reusable engineering skill.',
	practiceTask: {
		title: 'Stack card (~15 min)',
		difficulty: 'beginner',
		description: `**Goal:** document your toolkit.

1. Fill the stack card from theory.
2. Confirm your chat tool login works.
3. Create folders: prompts / outputs / media.
4. **Save:** \`AI for Real Life / stack-card.md\`.`,
		hints: [
			'Image/video can stay blank until Module 02.',
			'Add: “Review stack after Module 04.”',
		],
	},
	quiz: {
		passingScore: 70,
		timeLimit: 10,
		questions: [
			{
				id: 'q1',
				type: MC,
				question: 'Which lane do you need for Modules 00-01?',
				options: ['Only video', 'Chat / writing', 'Only 3D rendering', 'Only spreadsheets'],
				correctAnswer: 1,
				explanation: 'Early modules are brief- and text-first.',
			},
			{
				id: 'q2',
				type: MC,
				question: 'When is paying for a tool justified here?',
				options: [
					'When a real deliverable is blocked by free limits',
					'Always on day one',
					'Never',
					'Only if influencers say so',
				],
				correctAnswer: 0,
				explanation: 'Pay for blockers, not FOMO.',
			},
			{
				id: 'q3',
				type: MC,
				question: 'What belongs on a stack card?',
				options: [
					'Your banking password',
					'Tools, notes folder, disclosure default, never-paste list',
					'Every AI product ever made',
					'Only your favorite meme',
				],
				correctAnswer: 1,
				explanation: 'Operational clarity for the rest of the course.',
			},
			{
				id: 'q4',
				type: MC,
				question: 'Why stay tool-agnostic in this course?',
				options: [
					'Skills transfer when products change',
					'Because tools never change',
					'To avoid learning anything practical',
					'Quizzes require it legally',
				],
				correctAnswer: 0,
				explanation: 'Briefs and systems outlast brand names.',
			},
		],
	},
}

export const module00Lessons = {
	'ai-lesson-00-1': aiLesson001,
	'ai-lesson-00-2': aiLesson002,
	'ai-lesson-00-3': aiLesson003,
	'ai-lesson-00-4': aiLesson004,
}
