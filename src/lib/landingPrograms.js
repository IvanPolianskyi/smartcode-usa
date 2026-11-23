import { ROBLOX_COURSE_ID } from '@/lib/courseIds'

/**
 * Program cards shown on the marketing site (pick → pricing flow).
 *
 * The site sells one product - Roblox (see SELLABLE_COURSE_IDS). Python and
 * AI for Real Life are kept for existing subscribers only, so they have no
 * marketing card here.
 */
export const LANDING_PROGRAMS = [
	{
		courseId: ROBLOX_COURSE_ID,
		tone: 'coral',
		kind: 'Roblox game development',
		title: 'SmartCode Club',
		popular: true,
		text: 'Learn Roblox Studio and Luau with an AI helper in every lesson, build with us at weekly live AI sessions, and publish a game people can play.',
		topics: [
			'92 lessons from your first part to a published game',
			'An AI helper in every lesson that explains your code',
			'Your code checked the moment you hit Run',
			'Weekly live builds with AI in our Discord',
			'Club-only Discord channels and help when you get stuck',
			'The best member games featured on our Instagram',
		],
	},
]
