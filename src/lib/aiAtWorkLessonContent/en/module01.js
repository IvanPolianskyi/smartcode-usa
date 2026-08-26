/** AI for Real Life - module 01 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson011 = {
  "lessonId": "ai-lesson-01-1",
  "moduleId": "module-01",
  "order": 1,
  "title": "Briefs, not vibes",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Turn a vague ask into a reusable brief",
    "Name the four parts of a solid prompt",
    "Rewrite one weak prompt into a strong one"
  ],
  "theory": {
    "sections": [
      {
        "title": "Vibes vs briefs",
        "content": "Vibe asking sounds like: “Make this better” or “Write a catchy post.” The model is forced to guess your taste, audience, and definition of done.\n\nA **brief** treats the model like a professional contractor. It locks down four essentials:\n\n1. **Audience:** Who is this for?\n2. **Definition of Done:** What exact problem does it solve?\n3. **Negative Constraints:** What must it avoid?\n4. **Format:** How should the answer be shaped?\n\nScore outputs **1-5 against the brief** - not against how smart or poetic it sounds."
      },
      {
        "title": "Reusable brief templates",
        "content": "Use standardized placeholders: `{{TOPIC}}`, `{{AUDIENCE}}`, `{{LENGTH}}`, `{{FORMAT}}`.\n\nKeep core templates under 150 words so you actually reuse them weekly:\n\n```text\nRole: Practical content editor for {{AUDIENCE}}.\nTask: Draft 3 short hook options about {{TOPIC}}.\nConstraints: Max 20 words per hook. No buzzwords or clichés. Grade-8 reading level.\nFormat: Numbered list 1-3 with a one-sentence rationale for each.\n```\n\nWhen a prompt is modular, you swap variables in 5 seconds instead of retyping from scratch."
      },
      {
        "title": "Fit over flourish",
        "content": "A dull, precise output that fits your brief beats a poetic output that misses your target by a mile.\n\nIf your result scores < 4 out of 5:\n- **Do NOT delete the prompt and start over.**\n- Change **one constraint** (e.g., lower reading level, change format, add a banned word).\n- Re-run and compare."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Asking “make it better” with no criteria",
      "explanation": "The model invents its own criteria, leading to generic fluff.",
      "correctApproach": "State audience, length, tone, and explicit success criteria."
    },
    {
      "mistake": "One-off chats never saved",
      "explanation": "You waste 20 minutes rediscovering prompts that worked last week.",
      "correctApproach": "Save winning templates with {{PLACEHOLDERS}} in a course folder."
    },
    {
      "mistake": "Scoring on cleverness instead of brief fit",
      "explanation": "Fancy vocabulary can still completely miss the intended user goal.",
      "correctApproach": "Score outputs strictly against your written brief requirements."
    }
  ],
  "summary": "Vague asks become reusable briefs. Next: master the RTCF framework (Role, Task, Constraints, Format).",
  "practiceTask": {
    "title": "Three rewrites (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** rewrite three vague asks into structured, reusable briefs.\n\n1. Pick three vague asks from school, work, or content (e.g., “summarize this”, “write an intro”, “give me ideas”).\n2. Rewrite each using **Role + Task + Constraints + Format**.\n3. Run one rewritten brief in your chat tool and score the output 1-5 against your requirements.\n4. **Save** all three templates with `{{PLACEHOLDERS}}` into `AI for Real Life / 01-1`.",
    "hints": [
      "If the score is under 4, adjust one negative constraint and retry.",
      "Keep your templates short and easy to scan."
    ],
    "optionalChallenge": "Turn your best brief into a template with 4 distinct placeholders that a teammate or friend could run."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why does “Make this better” consistently fail?",
        "options": [
          "AI models dislike self-improvement",
          "It lacks audience, success criteria, and format constraints",
          "The prompt is too polite",
          "It uses too many tokens"
        ],
        "correctAnswer": 1,
        "explanation": "Without clear criteria, the model has no definition of done.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is the primary benefit of using {{PLACEHOLDERS}} in prompts?",
        "options": [
          "They hide API keys from the model",
          "They make the same proven brief reusable across different tasks",
          "They bypass rate limits on free plans",
          "They force the model to output code"
        ],
        "correctAnswer": 1,
        "explanation": "Placeholders turn one-off chats into permanent reusable assets.",
        type: MC
      },
      {
        "id": "q3",
        "question": "How should you evaluate an AI model’s output?",
        "options": [
          "By how sophisticated the vocabulary sounds",
          "Against the explicit success criteria of the brief",
          "By output length alone",
          "By how quickly the model responded"
        ],
        "correctAnswer": 1,
        "explanation": "Brief fit beats subjective vibes every time.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What are the four pillars of a strong brief in this course?",
        "options": [
          "Role, Task, Constraints, Format (RTCF)",
          "Hope, Hype, Haste, Hashtags",
          "Cut, Copy, Paste, Publish",
          "Train, Test, Tune, Ship"
        ],
        "correctAnswer": 0,
        "explanation": "RTCF is our foundational standard for structured briefs.",
        type: MC
      }
    ]
  }
}

export const aiLesson012 = {
  "lessonId": "ai-lesson-01-2",
  "moduleId": "module-01",
  "order": 2,
  "title": "Role, task, constraints, format",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Assign a useful role without cosplay",
    "Lock output format so results are usable",
    "Add constraints that prevent fluff"
  ],
  "theory": {
    "sections": [
      {
        "title": "Roles that imply standards",
        "content": "Avoid theatrical cosplay: `You are a mystical wizard of knowledge.` It adds fluff and weird analogies.\n\nUse roles that imply **concrete quality standards**:\n\n- `You are a tough copy editor who cuts corporate jargon for busy founders.`\n- `You are a senior tutor preparing a high school student for an AP physics exam.`\n- `You are a direct response writer who writes at a grade-8 reading level.`\n\nA good role tells the model what baseline standards and perspective to adopt."
      },
      {
        "title": "Tasks and negative constraints",
        "content": "**Task:** Always start with an active command verb: *Draft, Outline, Critique, Compress, Compare, Classify*.\n\n**Constraints:** Tell the model what **NOT** to do:\n\n```text\nConstraints:\n- Maximum 120 words.\n- No buzzwords (banned: delve, synergy, crucial, landscape).\n- Grade-8 reading level.\n- Do not include an introductory greeting or concluding summary.\n```"
      },
      {
        "title": "Format locks",
        "content": "Make outputs paste-ready without manual reformatting. Demand explicit shapes:\n\n```text\nFormat:\nMarkdown table with columns: [Step | Action | Time Estimate | Owner]\n```\n\n```text\nFormat:\nJSON object with keys: {\"headline\": \"\", \"hook\": \"\", \"bullets\": []}\n```\n\nIf the model strays from the format, reply: `Output only the requested format, nothing else.`"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Cosplay roles with no standard",
      "explanation": "“You are a genius wizard” produces theatrical nonsense.",
      "correctApproach": "Use roles that define real-world professional quality filters."
    },
    {
      "mistake": "No length or word limits",
      "explanation": "You receive 8 paragraphs when you needed a 3-bullet summary.",
      "correctApproach": "Set hard constraints: max words, bullet count, or reading level."
    },
    {
      "mistake": "Leaving format open-ended",
      "explanation": "You waste time cleaning up formatting by hand.",
      "correctApproach": "Lock format as markdown tables, JSON keys, or clean bulleted blocks."
    }
  ],
  "summary": "RTCF makes outputs comparable, testable, and paste-ready. Next: teach taste with few-shot examples.",
  "practiceTask": {
    "title": "RTCF template drill (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** build one full RTCF template and run it on two distinct topics.\n\n1. Write a role line that sets a high editorial standard.\n2. Add a specific action task, at least 3 negative constraints, and an exact format lock.\n3. Run the prompt on **Topic A**, verify the output, then swap placeholders and run on **Topic B**.\n4. **Save** the template and both outputs in your course library.",
    "hints": [
      "Try negative constraints like: “No hashtags, no passive voice, under 100 words.”",
      "If the output wanders, repeat only the format lock line."
    ],
    "optionalChallenge": "Create an RTCF prompt that outputs both a student version (grade 7) and a professional version in a side-by-side markdown table."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Which role prompt produces the highest quality output?",
        "options": [
          "“You are an all-knowing oracle of wisdom”",
          "“You are a direct copy editor who cuts jargon for busy professionals”",
          "“Act like a friendly computer”",
          "“Be the smartest AI on the planet”"
        ],
        "correctAnswer": 1,
        "explanation": "Roles should establish measurable quality standards, not theatrical costumes.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why are negative constraints (what NOT to do) so powerful?",
        "options": [
          "They reduce model token cost to zero",
          "They eliminate predictable AI defaults like filler words and throat-clearing",
          "They make the prompt invisible to filters",
          "They turn off hallucination completely"
        ],
        "correctAnswer": 1,
        "explanation": "Negative constraints prevent the model from drifting into generic chatbot habits.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the best way to ensure an output is paste-ready?",
        "options": [
          "Hope the AI chooses a nice layout",
          "Specify an exact format lock (e.g. Markdown table, JSON schema, bullet list)",
          "Ask for “good formatting”",
          "Use uppercase letters only"
        ],
        "correctAnswer": 1,
        "explanation": "Explicit format locks make outputs immediately usable in downstream tools.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Which verb is most effective for opening a task line?",
        "options": [
          "Think about",
          "Feel free to discuss",
          "Draft a 3-step action plan for",
          "Try your best with"
        ],
        "correctAnswer": 2,
        "explanation": "Direct action verbs give clear operational direction.",
        type: MC
      }
    ]
  }
}

export const aiLesson013 = {
  "lessonId": "ai-lesson-01-3",
  "moduleId": "module-01",
  "order": 3,
  "title": "Examples that teach the model",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Use one or two examples instead of long lectures",
    "Show good vs bad when the difference matters",
    "Keep examples short enough to reuse"
  ],
  "theory": {
    "sections": [
      {
        "title": "Few-shot prompting",
        "content": "Telling a model `Be witty and concise` is fuzzy. Showing **1-2 input → output pairs** (few-shot prompting) anchors tone instantly.\n\n```text\nInput: Why do people procrastinate?\nOutput: Procrastination is an emotional regulation problem, not a time management flaw.\n\nInput: How do you build a daily writing habit?\nOutput: Lower the daily quota until resistance disappears - write one sentence, not one chapter.\n\nInput: {{NEW_INPUT}}\nOutput:\n```"
      },
      {
        "title": "Good vs Bad contrast pairs",
        "content": "Contrast teaches the quality boundary faster than positive examples alone:\n\n```text\nBAD: \"In today's fast-paced world, staying productive is crucial for success.\"\nReason: Generic throat-clearing cliché.\n\nGOOD: \"I tracked every 15 minutes of my work day for a month. Here is what actually wasted my time.\"\nReason: Specific, personal, high curiosity.\n\nTask: Write 3 hooks for {{TOPIC}} in the GOOD style.\n```"
      },
      {
        "title": "Context discipline",
        "content": "Keep example pairs concise (under 40 words each). Long context dumps burn working memory and cause the model to copy sample entities.\n\nIf the model copies names or entities from your examples, add:\n`NOTE: Examples are for structure and tone only. Do not reuse example entities.`"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Writing 500 words of adjectives instead of 2 examples",
      "explanation": "Adjectives like “punchy” or “clever” are ambiguous.",
      "correctApproach": "Show one good and one bad concrete example."
    },
    {
      "mistake": "Pasting huge 2,000-word example dumps",
      "explanation": "Context fills with irrelevant details and dilutes the task.",
      "correctApproach": "Keep few-shot demonstrations short, tight, and focused."
    },
    {
      "mistake": "Letting the model clone example entities",
      "explanation": "The model reuses sample character names or fake stats.",
      "correctApproach": "Explicitly state that examples are for style and structure only."
    }
  ],
  "summary": "Few-shot contrast pairs teach taste in seconds. Next: iterate like an engineer with variable isolation.",
  "practiceTask": {
    "title": "Few-shot hooks (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** build a few-shot brief using BAD vs GOOD contrast pairs.\n\n1. Pick a format (video hooks, email subject lines, or bullet takeaways).\n2. Write one BAD example with a clear reason, and one GOOD example with a clear reason.\n3. Add a task line asking for 5 new outputs matching the GOOD pattern on your topic.\n4. **Save** the complete few-shot prompt block as a reusable template.",
    "hints": [
      "Make sure the BAD example illustrates a real cliché you frequently see.",
      "Keep your example sentences short and punchy."
    ],
    "optionalChallenge": "Create a 2-shot prompt that teaches the model how to transform a boring passive headline into an active curiosity headline."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What does “few-shot prompting” mean?",
        "options": [
          "Running a prompt five times in a row",
          "Providing 1-3 input/output examples before asking for the target output",
          "Using five different AI models simultaneously",
          "Prompts with fewer than five words"
        ],
        "correctAnswer": 1,
        "explanation": "Few-shot prompting provides demonstrations that guide style and format.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why is showing a BAD example alongside a GOOD example effective?",
        "options": [
          "It makes the prompt longer",
          "It makes the quality boundary concrete by highlighting what to avoid",
          "It tricks the AI safety filters",
          "It is required by LLM grammar"
        ],
        "correctAnswer": 1,
        "explanation": "Contrast sharpens the model’s understanding of your quality bar.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What risk arises from overly long example dumps?",
        "options": [
          "The prompt becomes too polite",
          "They burn context window tokens and cause the model to copy stale details",
          "They automatically trigger paywalls",
          "They disable code execution"
        ],
        "correctAnswer": 1,
        "explanation": "Tight, miniature examples preserve context and maintain focus.",
        type: MC
      },
      {
        "id": "q4",
        "question": "If the model copies names or numbers from your example, what should you add?",
        "options": [
          "A longer apology",
          "“Examples are for style/structure only; use fresh entities for the new topic”",
          "Delete your account",
          "Type everything in ALL CAPS"
        ],
        "correctAnswer": 1,
        "explanation": "Explicit negative constraints override entity cloning behavior.",
        type: MC
      }
    ]
  }
}

export const aiLesson014 = {
  "lessonId": "ai-lesson-01-4",
  "moduleId": "module-01",
  "order": 4,
  "title": "Iterate like an engineer",
  "estimatedTime": 50,
  "theoryMinutes": 30,
  "quizMinutes": 10,
  "learningObjectives": [
    "Change one variable per retry",
    "Keep a short revision log",
    "Know when to stop iterating"
  ],
  "theory": {
    "sections": [
      {
        "title": "Isolate variables",
        "content": "When a prompt output misses the mark, beginners rewrite the entire prompt or smash regenerate 20 times. That is slot-machine behavior.\n\nEngineers isolate variables. In each revision, change **exactly one thing**:\n- *Variable A:* The Role\n- *Variable B:* Length constraint\n- *Variable C:* Negative constraint\n- *Variable D:* Few-shot example\n\nOnly isolation tells you what actually fixed the result."
      },
      {
        "title": "The lightweight revision log",
        "content": "Keep a 4-column log in your lesson notes:\n\n| Version | Change Made | Score (1-5) | Keep / Drop |\n|---|---|---|---|\n| v1 | Base RTCF prompt | 2.5 | Drop |\n| v2 | Added banned words list | 3.5 | Keep |\n| v3 | Added 1 GOOD few-shot hook | 4.5 | **Winner** |\n| v4 | Added extra adjective | 3.8 | Drop (revert) |\n\nPromote the winning version to your permanent library."
      },
      {
        "title": "Stop rules & diminishing returns",
        "content": "Iteration has diminishing returns. Use strict stop rules:\n\n1. **Score >= 4:** Stop. The draft is ready for human polish.\n2. **Two iterations with no gain:** Stop changing the prompt. Switch strategy or write the final 10% yourself.\n\nAI is a drafting accelerator, not a magic replacement for final human judgment."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Changing 5 variables at once on a retry",
      "explanation": "You cannot know which change caused the improvement or regression.",
      "correctApproach": "Change one variable per iteration."
    },
    {
      "mistake": "Chasing 100% perfection inside the chat window",
      "explanation": "Diminishing returns waste 40 minutes on minor phrasing.",
      "correctApproach": "Stop at score >= 4 and apply final 2-minute human polish."
    },
    {
      "mistake": "Never saving the winning prompt iteration",
      "explanation": "You re-solve the same prompting puzzle next week.",
      "correctApproach": "Log the winning prompt in your library immediately."
    }
  ],
  "summary": "Systematic iteration with a revision log turns prompting into an engineering discipline. Next: organize your permanent prompt library.",
  "practiceTask": {
    "title": "Four-version iteration log (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** run a 4-version structured iteration experiment on one prompt.\n\n1. Start from a prompt that produces an average result (score <= 3).\n2. Create **v2, v3, and v4**, modifying exactly one isolated variable per retry.\n3. Record each step in a 4-column revision table (Version, Change, Score, Decision).\n4. **Save** the complete log and the winning prompt in `AI for Real Life / 01-4`.",
    "hints": [
      "If you get stuck, try simplifying the format or adding a negative constraint.",
      "Time-box the entire experiment to 25 minutes."
    ],
    "optionalChallenge": "Document the single highest-leverage variable that improved your prompt score the most."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why should you change only one variable per prompt revision?",
        "options": [
          "To save internet bandwidth",
          "So you can isolate cause and effect and know what actually improved the output",
          "Because AI models can only process one edit",
          "It is required by HTML rules"
        ],
        "correctAnswer": 1,
        "explanation": "Engineering debugging requires isolating single variables.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What does a lightweight prompt revision log track?",
        "options": [
          "Only your emotional state",
          "Version number, specific change made, score vs brief, and keep/drop decision",
          "Your browser search history",
          "GPU temperature"
        ],
        "correctAnswer": 1,
        "explanation": "A revision log creates a clear audit trail of what works.",
        type: MC
      },
      {
        "id": "q3",
        "question": "When should you stop iterating on an AI prompt?",
        "options": [
          "Never - iterate endlessly",
          "When the output reaches score >= 4 or two retries fail to produce measurable gain",
          "When the AI asks you to stop",
          "After 100 regenerations"
        ],
        "correctAnswer": 1,
        "explanation": "Stop rules prevent diminishing returns and time waste.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Where should winning prompt iterations be stored?",
        "options": [
          "Left behind in scrollback history",
          "Saved into your permanent tagged prompt library",
          "Deleted immediately",
          "Tweeted without testing"
        ],
        "correctAnswer": 1,
        "explanation": "A well-maintained library compounds your productivity over time.",
        type: MC
      }
    ]
  }
}

export const aiLesson015 = {
  "lessonId": "ai-lesson-01-5",
  "moduleId": "module-01",
  "order": 5,
  "title": "Your prompt library",
  "estimatedTime": 50,
  "theoryMinutes": 30,
  "quizMinutes": 10,
  "learningObjectives": [
    "Save templates with placeholders",
    "Tag prompts by job (school, work, content)",
    "Version a prompt after it fails in the wild"
  ],
  "theory": {
    "sections": [
      {
        "title": "Prompt library entry structure",
        "content": "Every entry in your prompt library should follow a consistent card format:\n\n```text\n### [Template Name]\n- Tags: #content #social #hooks\n- Version: v1.2 (Updated: 2026-08)\n- Tested on: Claude 3.5 / ChatGPT-4o\n\n[PROMPT TEMPLATE WITH {{PLACEHOLDERS}}]\n\n- Known Failure Modes: If output is too long, repeat the max-word constraint.\n```"
      },
      {
        "title": "Versioning in production",
        "content": "When a prompt fails in real life (e.g. produces off-tone copy or invents a fake link), do not discard it:\n\n1. Bump version from `v1.0` → `v1.1`.\n2. Add a targeted negative constraint or a new few-shot example.\n3. Note the failure mode in your template card."
      },
      {
        "title": "Size discipline over hoarding",
        "content": "Hoarding 200 near-identical prompts leads to search paralysis. Aim for **8-12 battle-tested core templates** across your key jobs:\n\n- 2 for Ideation & Angle Generation\n- 2 for Drafting & RTCF briefs\n- 2 for Editing & Robot-voice stripping\n- 2 for Research & Verification\n- 2 for Repurposing & Formatting"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Saving 50 slight wording variations of the same task",
      "explanation": "You cannot find the best one when working under a deadline.",
      "correctApproach": "Maintain one authoritative version per job and refine it."
    },
    {
      "mistake": "No tags or search categorization",
      "explanation": "Prompts scatter across notes apps and chat histories.",
      "correctApproach": "Tag by job type: #school, #work, #content, #image, #edit."
    },
    {
      "mistake": "Never updating templates after edge-case failures",
      "explanation": "Broken prompts remain in active rotation.",
      "correctApproach": "Bump the version number and add a note whenever a prompt is updated."
    }
  ],
  "summary": "Your prompt library is your compounding asset. Module 02 applies this same brief discipline to image and video generation.",
  "practiceTask": {
    "title": "Starter prompt library (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** build a structured starter prompt library with at least 6 tagged templates.\n\n1. Create a document named `prompts/library.md` (or a Notion / Obsidian page).\n2. Add at least 6 structured templates covering: Ideation, RTCF Drafting, Few-Shot Editing, and Formatting.\n3. Ensure every template has clear tags, placeholder variables, and version numbers.\n4. Update one template to **v1.1** with a failure mode note.",
    "hints": [
      "Steal structure from your winning prompts in lessons 01-1 through 01-4.",
      "Organize with clear markdown headings and code blocks for easy 1-click copying."
    ],
    "optionalChallenge": "Add a section with 3 quick-fix \"emergency prompts\" for when an output is too long, too generic, or off-format."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What are the essential elements of a prompt library entry?",
        "options": [
          "Only the prompt text",
          "Title, tags, version, tested models, template with placeholders, and failure notes",
          "Your personal account passwords",
          "A random collection of chat screenshots"
        ],
        "correctAnswer": 1,
        "explanation": "Standardized metadata makes templates maintainable and search-friendly.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What should you do when a library prompt fails in a real task?",
        "options": [
          "Delete the entire library",
          "Bump the version, add a targeted constraint or demo, and document the fix",
          "Ignore it and hope it does not happen again",
          "Switch to handwriting forever"
        ],
        "correctAnswer": 1,
        "explanation": "Treat prompts like software - patch bugs and version your updates.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the ideal early size for a personal prompt library?",
        "options": [
          "Over 500 prompts collected from Twitter",
          "8-12 battle-tested, high-utility templates",
          "Zero - memorize everything",
          "Only 1 prompt forever"
        ],
        "correctAnswer": 1,
        "explanation": "Quality and mastery of a focused core set beats unorganized hoarding.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Why are placeholder tags like {{AUDIENCE}} used in library prompts?",
        "options": [
          "To confuse other people",
          "To allow rapid parameter swapping without rewriting the prompt structure",
          "To force the AI into developer mode",
          "They are required for markdown parsing"
        ],
        "correctAnswer": 1,
        "explanation": "Placeholders enable instant reuse across diverse real-world tasks.",
        type: MC
      }
    ]
  }
}

export const module01Lessons = {
	'ai-lesson-01-1': aiLesson011,
	'ai-lesson-01-2': aiLesson012,
	'ai-lesson-01-3': aiLesson013,
	'ai-lesson-01-4': aiLesson014,
	'ai-lesson-01-5': aiLesson015,
}
