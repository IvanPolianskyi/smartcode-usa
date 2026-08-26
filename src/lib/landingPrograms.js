import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
} from '@/lib/courseIds'

/**
 * Program cards shown on the marketing site (pick → pricing flow).
 *
 * `outcome` is the promise the card closes on - what the student actually has
 * at the end. Traffic arrives from Instagram reels of finished student games,
 * so every card states a finished thing, not a syllabus.
 */
export const LANDING_PROGRAMS = [
	{
		courseId: ROBLOX_COURSE_ID,
		tone: 'coral',
		kind: 'Game development',
		title: 'Roblox Studio',
		popular: true,
		text: 'Build a world, give it rules, and publish a game people can play.',
		outcome: 'You finish with a published game your friends can actually play.',
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
		outcome: 'You finish able to write real Python without following a tutorial.',
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
		outcome: 'You finish with a content system you can run for yourself or a client.',
		topics: [
			'How AI models really work',
			'Prompting like a pro',
			'Generate images and video',
			'Build a content workflow',
			'Use it for school and work',
		],
	},
]
