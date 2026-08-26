/** AI for Real Life - module 04 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson041 = {
  "lessonId": "ai-lesson-04-1",
  "moduleId": "module-04",
  "order": 1,
  "title": "Design your weekly system",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Map inputs → drafts → review → publish",
    "Pick channels you can sustain",
    "Time-box each stage"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 5-stage production pipeline",
        "content": "Creators and teams burn out when they try to brainstorm, draft, edit, and publish in one frantic daily scramble.\n\nA sustainable system separates work into **5 distinct stages** across the week:\n\n```text\n[Stage 1: Batch Ideation]   → Generate 30 raw angles in one sitting\n[Stage 2: Filter & Plan]     → Select top 5 and schedule on calendar\n[Stage 3: AI-Assisted Draft] → Run structured RTCF briefs\n[Stage 4: 3-Pass Edit]       → Cut, Voice, and Fact-check (Human gate)\n[Stage 5: Visuals & Ship]    → Create media assets and schedule\n```"
      },
      {
        "title": "Channel sustainability",
        "content": "Trying to launch on 5 platforms simultaneously on day one guarantees burnout and poor quality.\n\n**Rule of Focus:** Start with **1 primary channel** (e.g. YouTube Shorts OR LinkedIn OR Substack) and **1 secondary repurpose channel**. Only add a 3rd channel after running the system consistently for 8 weeks."
      },
      {
        "title": "Time-boxing on your calendar",
        "content": "If a pipeline stage has no dedicated calendar block, it will not happen. Example weekly schedule:\n\n- **Monday (09:00 - 09:45):** Batch Ideation (30 angles)\n- **Tuesday (14:00 - 15:30):** AI First-Pass Drafting (5 pieces)\n- **Wednesday (14:00 - 15:00):** Three-Pass Human Polish\n- **Thursday (10:00 - 11:00):** Visuals & Scheduling"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Trying to publish on 5 different platforms simultaneously",
      "explanation": "Spreads energy thin and causes pipeline collapse within two weeks.",
      "correctApproach": "Master one primary channel and one secondary channel first."
    },
    {
      "mistake": "Skipping the human review stage to publish faster",
      "explanation": "Publishes robotic, unverified fluff that damages your brand.",
      "correctApproach": "Always maintain a mandatory human quality gate before publishing."
    },
    {
      "mistake": "Leaving production tasks as vague floating to-dos",
      "explanation": "Tasks get delayed and weekly cadence is broken.",
      "correctApproach": "Block recurring, dedicated time slots on your calendar."
    }
  ],
  "summary": "A system is an operational map with calendar time-boxes. Next: batch ideation and scoring calendars.",
  "practiceTask": {
    "title": "Pipeline one-pager (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** design your personal weekly content pipeline on a single page.\n\n1. Map out your 5 pipeline stages with realistic time-box estimates.\n2. Choose your 1 primary channel and 1 secondary repurposing channel.\n3. Define your exact weekly calendar schedule for ideation, drafting, and editing.\n4. **Save** your pipeline architecture as `system/pipeline.md`.",
    "hints": [
      "Be conservative with time estimates - drafting always takes longer in week one.",
      "Include a clear \"kill criteria\" for posts that fail to pass your quality bar."
    ],
    "optionalChallenge": "Create a visual flow diagram of your weekly pipeline using Markdown or a flowchart tool."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why is separating ideation from drafting essential in a content system?",
        "options": [
          "AI models cannot multitask",
          "Switching between creative ideation and detailed drafting causes cognitive friction and burnout",
          "Drafting is illegal on Mondays",
          "It uses fewer internet bytes"
        ],
        "correctAnswer": 1,
        "explanation": "Batching similar cognitive tasks increases speed and quality.",
        type: MC
      },
      {
        "id": "q2",
        "question": "How many social channels should a beginner launch with?",
        "options": [
          "At least 7 across all platforms",
          "1 primary channel and at most 1 secondary repurposing channel",
          "Zero - stay offline",
          "Only paid channels"
        ],
        "correctAnswer": 1,
        "explanation": "Mastering 1-2 channels builds sustainable consistency.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the function of the Human Review stage in an AI pipeline?",
        "options": [
          "To slow down production for no reason",
          "To enforce voice standards, cut filler, and verify factual claims before publication",
          "To delete all AI drafts",
          "To add random emojis"
        ],
        "correctAnswer": 1,
        "explanation": "The human review gate prevents low-quality robot text from reaching your audience.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What happens to production tasks that are not scheduled with calendar time-boxes?",
        "options": [
          "They finish automatically",
          "They get postponed, delayed, or abandoned under daily pressure",
          "They become viral hits",
          "They turn into video files"
        ],
        "correctAnswer": 1,
        "explanation": "Dedicated calendar time-boxes transform intentions into predictable execution.",
        type: MC
      }
    ]
  }
}

export const aiLesson042 = {
  "lessonId": "ai-lesson-04-2",
  "moduleId": "module-04",
  "order": 2,
  "title": "Batch ideation and calendars",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Generate a month of angles in one session",
    "Score ideas for effort vs payoff",
    "Fill a simple content calendar"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 30-angle batch session",
        "content": "Never stare at a blank screen wondering what to post today. In one 30-minute session, generate **30 distinct angles** using prompt lenses:\n\n```text\nRole: Content strategist for {{AUDIENCE}}.\nTask: Generate 30 distinct content angles about {{TOPIC}} across 5 lenses:\n1. Counter-intuitive truths (What everyone gets wrong)\n2. Step-by-step beginner teardowns\n3. Real failure post-mortems and lessons\n4. Tool & workflow comparisons\n5. Frameworks & cheat sheets\nFormat: Numbered list 1-30 with a 1-sentence hook for each.\n```"
      },
      {
        "title": "The Effort vs Payoff matrix",
        "content": "Score your 30 ideas from **1 (Low) to 5 (High)** on two axes:\n\n- **Effort:** How long will this take to produce and verify?\n- **Payoff:** How valuable and relevant is this to my core audience?\n\n**Strategy:** Prioritize **High Payoff / Low-Medium Effort** ideas for your weekly schedule. Save high-effort masterpieces for monthly milestones."
      },
      {
        "title": "The 14-day calendar grid",
        "content": "Transfer your top 10 scored ideas into an operational calendar grid:\n\n| Date | Channel | Core Angle | Format | Status | Buffer? |\n|---|---|---|---|---|---|\n| Mon Oct 5 | YouTube Shorts | 3 AI Prompt Mistakes | 30s Short | Drafted | No |\n| Wed Oct 7 | LinkedIn | RTCF Framework Guide | Carousel | Planned | No |\n| Fri Oct 9 | - | Buffer / Catch-up Day | - | Standby | **Yes** |\n\nAlways build in **1-2 buffer days** to absorb unexpected slips without breaking your streak."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Brainstorming and drafting simultaneously",
      "explanation": "Slows down creative flow and leads to shallow ideas.",
      "correctApproach": "Separate brainstorming sessions from writing sessions completely."
    },
    {
      "mistake": "Selecting only massive, high-effort ideas",
      "explanation": "You fall behind schedule by Wednesday and abandon the calendar.",
      "correctApproach": "Balance your calendar with quick wins and low-effort, high-value formats."
    },
    {
      "mistake": "Operating with zero buffer days",
      "explanation": "One busy day destroys your entire weekly publishing streak.",
      "correctApproach": "Schedule at least 1 buffer day every week to catch up on drafts."
    }
  ],
  "summary": "Batch ideas, score by effort vs payoff, and lock them into a buffered calendar. Next: adapt one core idea across multiple formats.",
  "practiceTask": {
    "title": "30 angles → calendar (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** generate 30 batch angles, score them on effort vs payoff, and populate a 14-day content calendar.\n\n1. Run the 5-lens ideation prompt to generate 30 distinct angles for your niche.\n2. Score all 30 angles on Effort (1-5) and Payoff (1-5); select the top 10 winners.\n3. Populate a 14-day calendar table with dates, channels, formats, and buffer days.\n4. **Save** your scored list and calendar in `AI for Real Life / 04-2`.",
    "hints": [
      "Reject generic angles even if the AI claims they are viral.",
      "Include at least two low-effort buffer posts in your 14-day schedule."
    ],
    "optionalChallenge": "Add a \"hook variation\" column to your calendar testing two different opening hooks for each scheduled piece."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What is the purpose of using 5 distinct lenses during batch ideation?",
        "options": [
          "To make the prompt longer",
          "To force diverse angles (contrarian, teardown, failure, tool, framework) and avoid repetitive ideas",
          "To test 5 different AI models",
          "To generate 5 different languages"
        ],
        "correctAnswer": 1,
        "explanation": "Lenses ensure variety and prevent generating 30 variations of the same generic idea.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Which quadrant of the Effort vs Payoff matrix should you prioritize for weekly cadence?",
        "options": [
          "High Effort / Low Payoff",
          "High Payoff / Low-to-Medium Effort",
          "Low Effort / Zero Payoff",
          "Randomly select without scoring"
        ],
        "correctAnswer": 1,
        "explanation": "High payoff with manageable effort ensures sustainable, high-impact publishing.",
        type: MC
      },
      {
        "id": "q3",
        "question": "Why are buffer days built into an operational content calendar?",
        "options": [
          "To encourage laziness",
          "To absorb unexpected schedule slips and preserve your publishing streak",
          "Because AI tools close on Fridays",
          "To comply with social media laws"
        ],
        "correctAnswer": 1,
        "explanation": "Buffer days make content pipelines resilient against real-life disruptions.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What information belongs in an operational content calendar row?",
        "options": [
          "Only the date and an emoji",
          "Date, Channel, Core Angle, Format, Status, and Buffer indicator",
          "Your personal diary entries",
          "Raw unedited prompt text only"
        ],
        "correctAnswer": 1,
        "explanation": "A complete calendar tracks status, format, and channel at a glance.",
        type: MC
      }
    ]
  }
}

export const aiLesson043 = {
  "lessonId": "ai-lesson-04-3",
  "moduleId": "module-04",
  "order": 3,
  "title": "One idea, many formats",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Turn a core idea into post, thread, and short",
    "Keep the message consistent",
    "Avoid copy-paste sameness"
  ],
  "theory": {
    "sections": [
      {
        "title": "The core message spine",
        "content": "Never try to repurpose content without defining the **Core Message Spine** first.\n\nWrite **one crisp sentence** that captures the thesis:\n\n`Core Message: \"Prompting is an engineering brief, not a casual chat - quality depends on constraints, not luck.\"`\n\nIf this single spine survives every format adaptation, your brand stays coherent across every channel."
      },
      {
        "title": "Adapting structure to channel mechanics",
        "content": "Different formats require different structural muscles:\n\n- **Short-Form Video (9:16):** 3-second visual hook → 1 punchy real-life example → 1 takeaway → CTA.\n- **Twitter/X Thread or LinkedIn Carousel:** Slide 1: Bold contrarian claim → Slides 2-5: Step-by-step breakdown → Slide 6: Summary checklist.\n- **Longer Post / Newsletter:** Narrative backstory → Proof data → 3 actionable takeaways."
      },
      {
        "title": "Eliminating copy-paste fatigue",
        "content": "Do not lazily copy-paste identical text across platforms. Your audience notices and tunes out.\n\n- Change the **opening hook** to match platform culture.\n- Change the **visual framing** (video demo vs infographic vs text table).\n- Keep the **core thesis and verified data points** identical."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Copy-pasting identical text across every social platform",
      "explanation": "Ignores channel norms and looks spammy to followers.",
      "correctApproach": "Adapt structure and hooks while keeping the core thesis constant."
    },
    {
      "mistake": "Changing core claims or facts between formats",
      "explanation": "Confuses your audience and destroys brand positioning.",
      "correctApproach": "Anchor every format to a single written core message spine."
    },
    {
      "mistake": "Using the same generic Call-to-Action everywhere",
      "explanation": "Reduces conversion on specialized platforms.",
      "correctApproach": "Match the CTA to the platform action (e.g. comment below vs link in bio)."
    }
  ],
  "summary": "One core message spine powers multiple native formats. Next: set an objective quality bar with a brand voice sheet.",
  "practiceTask": {
    "title": "Triple format pack (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** turn a single core message into a 3-format content pack (Short script, Carousel/Thread, Single post).\n\n1. Write a 1-sentence Core Message Spine based on a verified topic.\n2. Adapt the idea into:\n   - A **15-second vertical video script** (Hook + Example + CTA).\n   - A **5-part carousel or thread outline**.\n   - A **100-word punchy single post**.\n3. Verify that all 3 pieces reinforce the exact same thesis without copy-paste sameness.\n4. **Save** the triple format pack in `AI for Real Life / 04-3`.",
    "hints": [
      "Use different examples in the short script vs the carousel.",
      "Make sure the video hook is visual and immediate."
    ],
    "optionalChallenge": "Add a 4th adaptation: a 2-minute audio podcast script introducing the same core insight."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What is the role of a “Core Message Spine” in repurposing content?",
        "options": [
          "It is a medical prompt term",
          "It is the single thesis statement that ensures brand and message consistency across all formats",
          "It generates hashtags automatically",
          "It translates text into audio"
        ],
        "correctAnswer": 1,
        "explanation": "The core message spine anchors every format adaptation to one clear truth.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why is copy-pasting the exact same text across all platforms ineffective?",
        "options": [
          "Each platform has distinct user expectations, attention spans, and structural mechanics",
          "It violates HTML5 standards",
          "AI models refuse to duplicate text",
          "It causes font corruption"
        ],
        "correctAnswer": 0,
        "explanation": "Native adaptations perform significantly better than lazy copy-paste distribution.",
        type: MC
      },
      {
        "id": "q3",
        "question": "How should a short-form video adaptation differ from a carousel adaptation of the same idea?",
        "options": [
          "They should be identical",
          "The video needs a visual 3-second hook and audio pacing; the carousel needs scannable slide headers and visual hierarchy",
          "Carousels must not contain text",
          "Videos cannot have takeaways"
        ],
        "correctAnswer": 1,
        "explanation": "Different media formats require different structural strengths.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What must remain strictly consistent across all format adaptations?",
        "options": [
          "The word count",
          "The core factual claims, data points, and overarching thesis",
          "The exact layout font",
          "The publication timestamp"
        ],
        "correctAnswer": 1,
        "explanation": "Facts and core thesis must remain rock-solid across every channel.",
        type: MC
      }
    ]
  }
}

export const aiLesson044 = {
  "lessonId": "ai-lesson-04-4",
  "moduleId": "module-04",
  "order": 4,
  "title": "Quality bar and brand voice",
  "estimatedTime": 50,
  "theoryMinutes": 30,
  "quizMinutes": 10,
  "learningObjectives": [
    "Write a one-page brand voice sheet",
    "Define a ship / revise / kill checklist",
    "Catch off-brand AI defaults"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 1-page brand voice sheet",
        "content": "Without a written standard, quality drifts wildly from day to day. Build a **1-page Brand Sheet**:\n\n```text\n# Brand Voice Sheet: [Your Brand / Persona]\n- Audience: Self-directed builders and students (ages 16-25)\n- We Sound Like: Direct, practical, curious, grounded in evidence\n- We NEVER Sound Like: Corporate PR, academic jargon, hype bro\n- We Say: \"Here is what broke,\" \"Let's look at the data,\" \"Test this today\"\n- We Never Say: \"Game-changer,\" \"Delve into,\" \"Unlock your full potential\"\n- Proof Standard: Every claim backed by a test, screenshot, or primary source\n```"
      },
      {
        "title": "The Ship / Revise / Kill checklist",
        "content": "Before any piece is scheduled, run it through the **3-Way Gate**:\n\n- **SHIP:** Passes voice sheet, verified data, clear hook, under word limit.\n- **REVISE:** Strong core idea, but has 1 AI cliché or weak headline (max 5-min fix).\n- **KILL:** Off-brand, unverified claims, or generic fluff that cannot be salvaged in 5 minutes. **Trash it without guilt.**"
      },
      {
        "title": "Catching generic AI defaults",
        "content": "AI models love cheerful, empty enthusiasm (`“Excited to share this amazing journey!”`).\n\nYour brand sheet acts as a spam filter. Paste your brand rules directly into your editing prompt:\n`Constraint: Follow the attached Brand Voice Sheet. Kill all generic enthusiasm and corporate buzzwords.`"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Having no written quality bar",
      "explanation": "Quality fluctuates depending on how tired you are when reviewing drafts.",
      "correctApproach": "Maintain an objective 1-page brand sheet and checklist."
    },
    {
      "mistake": "Hesitating to KILL weak drafts",
      "explanation": "Shipping mediocre drafts dilutes audience trust and brand authority.",
      "correctApproach": "Be ruthless - killing weak posts protects your channel quality."
    },
    {
      "mistake": "Writing a 20-page brand guide that no one reads",
      "explanation": "Overly complex guidelines are ignored during daily production.",
      "correctApproach": "Keep your brand voice rules on a single scannable page."
    }
  ],
  "summary": "Written standards make high production speed safe. Next: execute a real 7-day content sprint.",
  "practiceTask": {
    "title": "Voice sheet + checklist (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** write your 1-page Brand Voice Sheet and apply the Ship/Revise/Kill checklist to a draft.\n\n1. Draft a 1-page Brand Voice Sheet (Audience, Persona, We Say, We Never Say, Proof Standard).\n2. Write down your 5 non-negotiable **Kill Criteria**.\n3. Evaluate a recent AI-assisted draft against your checklist and assign a status (Ship, Revise, or Kill).\n4. **Save** your Brand Voice Sheet in `system/brand-voice.md`.",
    "hints": [
      "Include at least 5 specific banned words or phrases in your \"We Never Say\" list.",
      "Make your Kill Criteria observable (e.g. “Contains an unverified statistic”)."
    ],
    "optionalChallenge": "Run 3 different AI drafts through your checklist and document why one was cleared to Ship and another was Killed."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What is the main purpose of a 1-page Brand Voice Sheet?",
        "options": [
          "To decorate your desk",
          "To establish an objective, consistent quality filter for all content and prompts",
          "To train a new LLM model from scratch",
          "To replace your calendar"
        ],
        "correctAnswer": 1,
        "explanation": "A brand voice sheet provides a clear, repeatable standard for evaluation.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What should you do with a draft that triggers your Kill criteria and cannot be fixed in 5 minutes?",
        "options": [
          "Publish it anyway to fill the calendar",
          "Kill (delete) it without guilt to protect your brand quality",
          "Argue with the AI model for an hour",
          "Make it 3 times longer"
        ],
        "correctAnswer": 1,
        "explanation": "Killing low-quality drafts protects your channel reputation and authority.",
        type: MC
      },
      {
        "id": "q3",
        "question": "Why do AI models naturally drift toward generic, overly enthusiastic phrasing?",
        "options": [
          "They are trained on millions of marketing press releases and generic web copy",
          "They have feelings",
          "It uses fewer tokens",
          "It is required by law"
        ],
        "correctAnswer": 0,
        "explanation": "Generic cheerfulness is a statistical default from vast web training corpora.",
        type: MC
      },
      {
        "id": "q4",
        "question": "How long should an effective daily brand voice reference document be?",
        "options": [
          "100 pages of corporate philosophy",
          "1 scannable page with clear rules, examples, and banned phrases",
          "A 5-word sticky note",
          "Zero words"
        ],
        "correctAnswer": 1,
        "explanation": "A concise 1-page guide is easy to paste into prompts and review daily.",
        type: MC
      }
    ]
  }
}

export const aiLesson045 = {
  "lessonId": "ai-lesson-04-5",
  "moduleId": "module-04",
  "order": 5,
  "title": "Run a one-week content sprint",
  "estimatedTime": 90,
  "theoryMinutes": 70,
  "quizMinutes": 10,
  "learningObjectives": [
    "Execute seven days of planned content",
    "Log what broke in the system",
    "Adjust the pipeline for week two"
  ],
  "theory": {
    "sections": [
      {
        "title": "Sprint execution rules",
        "content": "A system is just theory until you run it under real conditions for **7 consecutive days**.\n\n**The Sprint Rules:**\n1. **Lock the Plan:** No switching niches or reinventing your strategy on Day 3.\n2. **Hold the Bar:** Ship to your quality standard - or mark as skipped with a logged reason.\n3. **Do Not Wing It:** Execute the calendar you built in Lesson 04-2."
      },
      {
        "title": "The daily break log",
        "content": "At the end of every production day, take 2 minutes to record your **Break Log**:\n\n| Day | Piece Scheduled | Time: Est vs Actual | What Broke / Friction Point? | Fix for Week 2 |\n|---|---|---|---|---|\n| Day 1 | Short Video Script | 30m vs 55m | Editing motion plate took too long | Use simpler camera moves |\n| Day 2 | Carousel Outline | 25m vs 20m | Prompt worked on first try | Keep this template |\n| Day 3 | Research Memo | 35m vs 60m | Candidate sources 404’d | Demand Google Scholar links |"
      },
      {
        "title": "The sprint retrospective: Keep, Change, Kill",
        "content": "On Day 7, run a 30-minute **System Retrospective**:\n\n- **KEEP:** Workflows and prompt templates that produced high quality on schedule.\n- **CHANGE:** Pipeline steps that took twice as long as estimated.\n- **KILL:** Channels, formats, or overly complex workflows that caused friction.\n\nIf you missed more than 2 publishing deadlines, **shrink your channel scope** immediately."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Pivoting your entire topic niche on Day 3 of a sprint",
      "explanation": "Destroys experimental signal and resets your learning curve to zero.",
      "correctApproach": "Hold the 7-day plan strictly to test the operational pipeline."
    },
    {
      "mistake": "Failing to log friction points in a break log",
      "explanation": "You repeat the exact same production bottlenecks in week two.",
      "correctApproach": "Spend 2 minutes daily logging what slowed you down or broke."
    },
    {
      "mistake": "Adding more channels when you are already falling behind",
      "explanation": "Amplifies burnout and causes complete pipeline failure.",
      "correctApproach": "Shrink to 1 primary channel until cadence is effortlessly consistent."
    }
  ],
  "summary": "A sprint proves your system under real-world conditions. Module 05 covers responsible shipping, client packaging, and your capstone delivery.",
  "practiceTask": {
    "title": "Seven-day sprint (~90 min planning + execution)",
    "difficulty": "intermediate",
    "description": "**Goal:** execute (or fully simulate with dated production drafts) a 7-day content sprint with a daily break log.\n\n1. Lock your 7-day calendar with topics, formats, and scheduled dates.\n2. Produce and edit each daily piece using your RTCF briefs, style cards, and 3-pass edit rules.\n3. Maintain a daily **Break Log** tracking estimated vs actual time and friction points.\n4. Run a Day 7 Retrospective and write your **Keep / Change / Kill** summary.\n5. **Save** all 7 drafts, the Break Log, and the Retrospective in `AI for Real Life / 04-5`.",
    "hints": [
      "If you cannot publish live yet, save dated drafts in your folder as if ready to ship.",
      "Honesty in your break log is 10x more valuable than pretending everything was effortless."
    ],
    "optionalChallenge": "Repurpose your highest-performing sprint piece into an additional secondary format on the same day."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why is it critical not to change your niche or strategy midway through a 7-day sprint?",
        "options": [
          "It breaks browser cookies",
          "Mid-sprint pivots destroy experimental signal and prevent you from testing your operational pipeline",
          "AI accounts lock after 3 days",
          "It is forbidden by search engines"
        ],
        "correctAnswer": 1,
        "explanation": "Holding the plan provides clear data on where the production system succeeds or fails.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What does a daily Break Log capture during a content sprint?",
        "options": [
          "Only your favorite compliments",
          "Estimated vs actual time spent, prompt failures, and operational bottlenecks",
          "Your internet bill",
          "Social media follower counts only"
        ],
        "correctAnswer": 1,
        "explanation": "Break logs pinpoint exact friction points so you can optimize week two.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What are the three categories of a Sprint Retrospective?",
        "options": [
          "Keep, Change, Kill",
          "Hope, Wish, Dream",
          "Copy, Paste, Repeat",
          "Draft, Schedule, Monetize"
        ],
        "correctAnswer": 0,
        "explanation": "Keep, Change, and Kill provide actionable decisions for system improvement.",
        type: MC
      },
      {
        "id": "q4",
        "question": "If you slipped on two deadlines during your first 7-day sprint, what is the best adjustment?",
        "options": [
          "Add 3 new social media channels",
          "Shrink scope to one primary channel and simplify formats until cadence is stable",
          "Quit content creation forever",
          "Stop fact-checking drafts"
        ],
        "correctAnswer": 1,
        "explanation": "Reducing channel scope establishes a sustainable, realistic baseline.",
        type: MC
      }
    ]
  }
}

export const module04Lessons = {
	'ai-lesson-04-1': aiLesson041,
	'ai-lesson-04-2': aiLesson042,
	'ai-lesson-04-3': aiLesson043,
	'ai-lesson-04-4': aiLesson044,
	'ai-lesson-04-5': aiLesson045,
}
