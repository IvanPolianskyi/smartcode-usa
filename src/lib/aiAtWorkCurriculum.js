/**
 * Stub curriculum for AI at Work.
 * Full lesson content ships later; structure is enough for enroll, preview, and billing.
 */

export const aiAtWorkCurriculum = {
	courseId: 'ai-at-work',
	title: 'AI at Work',
	modules: [
		{
			moduleId: 'module-00',
			order: 0,
			title: '00 — How these models actually work',
			description: 'What generative models do, what they do not, and how to talk to them usefully.',
			duration: { weeks: 1, lessons: 1 },
			learningOutcomes: [
				'Explain what a model is generating from',
				'Spot common failure modes',
			],
			lessons: [
				{
					lessonId: 'ai-lesson-00-1',
					order: 1,
					title: 'Welcome to AI at Work',
					learningObjectives: [
						'See how the course is structured',
						'Try your first structured prompt',
					],
					estimatedTime: 45,
					prerequisites: [],
					comingSoon: true,
				},
			],
		},
		{
			moduleId: 'module-01',
			order: 1,
			title: '01 — Prompting as an engineering skill',
			description: 'Treat prompts like briefs: constraints, examples, and iteration.',
			duration: { weeks: 2, lessons: 1 },
			learningOutcomes: ['Write prompts that hold up under reuse'],
			lessons: [
				{
					lessonId: 'ai-lesson-01-1',
					order: 1,
					title: 'Briefs, not vibes',
					learningObjectives: ['Turn a vague ask into a reusable prompt'],
					estimatedTime: 60,
					prerequisites: ['ai-lesson-00-1'],
					comingSoon: true,
				},
			],
		},
		{
			moduleId: 'module-02',
			order: 2,
			title: '02 — Generating images and video',
			description: 'Produce media you can actually use in a workflow.',
			duration: { weeks: 2, lessons: 1 },
			learningOutcomes: ['Ship usable generative media'],
			lessons: [
				{
					lessonId: 'ai-lesson-02-1',
					order: 1,
					title: 'Images that survive the brief',
					learningObjectives: ['Generate and refine images for real use'],
					estimatedTime: 60,
					prerequisites: ['ai-lesson-01-1'],
					comingSoon: true,
				},
			],
		},
	],
}
