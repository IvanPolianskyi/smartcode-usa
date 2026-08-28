import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
} from '@/lib/courseIds'

/**
 * Program cards shown on the marketing site (pick → pricing flow).
 *
 * Every card closes on the same free-trial line rather than a per-program
 * promise - the offer, not the syllabus, is what the card is selling.
 */
export const LANDING_PROGRAMS = [
	{
		courseId: ROBLOX_COURSE_ID,
		tone: 'coral',
		kind: 'Game development',
		title: 'Roblox Studio',
		popular: true,
		text: 'Build a world, give it rules, and publish a game people can play.',
		topics: [
			'Build your first world',
			'Script it with Luau',
			'Turn it into a real game',
			'Publish it to Roblox',
			'Get your first players',
		],
	},
	{
		courseId: PYTHON_COURSE_ID,
		tone: 'cyan',
		kind: 'Programming',
		title: 'Python',
		text: 'Study the world’s most popular programming language - right in your browser from lesson one.',
		topics: [
			'Run code in your browser',
			'Loops, lists, and logic',
			'Build small working apps',
			'Automate boring tasks',
			'Your first AI model',
		],
	},
	{
		courseId: AI_AT_WORK_COURSE_ID,
		tone: 'violet',
		kind: 'AI & content',
		title: 'AI for Real Life',
		text: 'Prompting as a skill, generative media, and a content system you can run.',
		topics: [
			'How AI models really work',
			'Prompting like a pro',
			'Generate images and video',
			'Build a content workflow',
			'Use it for school and work',
		],
	},
]
