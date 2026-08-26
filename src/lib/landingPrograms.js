import {
	AI_AT_WORK_COURSE_ID,
	PYTHON_COURSE_ID,
	ROBLOX_COURSE_ID,
} from '@/lib/courseIds'

/** Program cards shown on the marketing site (pick → pricing flow). */
export const LANDING_PROGRAMS = [
	{
		courseId: ROBLOX_COURSE_ID,
		tone: 'coral',
		kind: 'Game development',
		title: 'Roblox Studio',
		text: 'Build a world, give it rules, and publish a game people can play.',
		topics: ['Studio & parts', 'Models', 'Luau', 'Game logic', 'Publishing'],
	},
	{
		courseId: PYTHON_COURSE_ID,
		tone: 'cyan',
		kind: 'Programming',
		title: 'Python',
		text: 'Write and run Python in the browser from lesson one - nothing to install.',
		topics: ['Data structures', 'Control flow', 'Functions', 'OOP', 'AI models'],
	},
	{
		courseId: AI_AT_WORK_COURSE_ID,
		tone: 'violet',
		kind: 'AI & content',
		title: 'AI at Work',
		text: 'Prompting as a skill, generative media, and a content system you can run.',
		topics: ['How models work', 'Prompting', 'Images', 'Video', 'Workflows'],
	},
]
