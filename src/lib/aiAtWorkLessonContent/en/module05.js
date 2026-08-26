/** AI for Real Life - module 05 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson051 = {
  "lessonId": "ai-lesson-05-1",
  "moduleId": "module-05",
  "order": 1,
  "title": "Ethics, privacy, and disclosure",
  "estimatedTime": 45,
  "theoryMinutes": 25,
  "quizMinutes": 10,
  "learningObjectives": [
    "Decide what never goes into a prompt",
    "Disclose AI use when it matters",
    "Handle other people’s data carefully"
  ],
  "theory": {
    "sections": [
      {
        "title": "The absolute Never-Paste list",
        "content": "Treat every public AI chat interface as a potentially public bulletin board. Model providers may store prompts for training, monitoring, or human review.\n\n**The Never-Paste List:**\n\n```text\n[NEVER PASTE INTO PROMPTS]\n1. Personal passwords, recovery phrases, API keys, or database credentials\n2. Customer PII: Social security numbers, private phone numbers, home addresses\n3. Confidential healthcare or medical records\n4. Unpublished company financial data, pending M&A plans, or legal dispute records\n5. Unreleased creative IP or unpublished peer work without permission\n```"
      },
      {
        "title": "Transparent disclosure standards",
        "content": "Honesty builds durable reputation. Disclose AI assistance when:\n\n- **Clients:** A client hires you for deliverable assets (state your AI-assisted workflow in proposals).\n- **Academic Work:** Required by institutional policy (cite your prompts and tool usage).\n- **Synthetic Media:** Publishing photorealistic images or synthetic voices depicting real events.\n\nStandard portfolio disclosure:\n`“Drafted and accelerated using AI models; curated, fact-checked, and authored by [Your Name].”`"
      },
      {
        "title": "Respecting third-party data and consent",
        "content": "Never upload a classmate’s essay, a coworker’s private notes, or a client’s confidential strategy doc without their explicit consent.\n\n**Your convenience never overrides another person’s data privacy.** If you need AI assistance with third-party material, redact all names and identifiable details first."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Assuming chat prompts are completely private and deleted instantly",
      "explanation": "Prompts may be logged, stored, or reviewed for safety and model training.",
      "correctApproach": "Enforce the Never-Paste list with zero exceptions."
    },
    {
      "mistake": "Hiding AI usage from freelance clients",
      "explanation": "Creates trust catastrophes if discovered later.",
      "correctApproach": "Be transparent about using AI as a professional productivity tool."
    },
    {
      "mistake": "Uploading third-party documents without permission or redaction",
      "explanation": "Violates privacy consent and can breach NDA agreements.",
      "correctApproach": "Scrub and redact all identifying information before pasting."
    }
  ],
  "summary": "Data ethics and transparency protect your career. Next: recognize high-stakes boundaries where AI should not be used.",
  "practiceTask": {
    "title": "Never-paste + disclosure (~20 min)",
    "difficulty": "beginner",
    "description": "**Goal:** finalize your personal Never-Paste list and write your professional disclosure statement.\n\n1. Write your personal Never-Paste list tailored to your school, work, or freelance life.\n2. Draft a clear 2-sentence **Disclosure Statement** for your portfolio and client proposals.\n3. Take a realistic mock document with sensitive details and practice redacting it into clean placeholder tokens.\n4. **Save** your updated policies in `AI for Real Life / stack-card.md`.",
    "hints": [
      "If you are ever unsure whether data is confidential, treat it as confidential.",
      "Keep your disclosure statement proud and professional - AI mastery is an asset."
    ],
    "optionalChallenge": "Draft a one-page \"Data Privacy & AI Policy\" suitable for onboarding a new freelancer or team member."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What category of data should NEVER be pasted into a public AI chat prompt?",
        "options": [
          "Public blog post titles",
          "Passwords, API keys, customer PII, and confidential financial/medical records",
          "Standard English dictionary words",
          "Open source code snippets"
        ],
        "correctAnswer": 1,
        "explanation": "Credentials, PII, and private financial/medical data must never be pasted into public models.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why is proactive disclosure of AI usage beneficial in client relationships?",
        "options": [
          "Clients will reduce your pay",
          "It establishes professional honesty, sets expectations, and positions you as an efficient modern practitioner",
          "It is required by federal tax law",
          "It turns off copyright protections"
        ],
        "correctAnswer": 1,
        "explanation": "Transparency builds trust and highlights your modern, efficient workflow.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What should you do before using AI to analyze notes containing a classmate’s or client’s private data?",
        "options": [
          "Publish the notes on social media",
          "Obtain explicit permission or thoroughly redact all identifying details",
          "Change your password",
          "Only run the prompt after midnight"
        ],
        "correctAnswer": 1,
        "explanation": "Third-party data requires explicit consent or complete redaction.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Is “It was only a rough draft” a valid defense for leaking sensitive data into an AI tool?",
        "options": [
          "Yes, rough drafts are exempt from data laws",
          "No - data pasted into public tools is still transmitted and stored regardless of draft status",
          "Only on free plans",
          "Only if the draft is deleted later"
        ],
        "correctAnswer": 1,
        "explanation": "Data transmission occurs the moment you submit the prompt, regardless of draft status.",
        type: MC
      }
    ]
  }
}

export const aiLesson052 = {
  "lessonId": "ai-lesson-05-2",
  "moduleId": "module-05",
  "order": 2,
  "title": "When not to use AI",
  "estimatedTime": 40,
  "theoryMinutes": 20,
  "quizMinutes": 10,
  "learningObjectives": [
    "List high-stakes tasks that need a human",
    "Spot dependency and skill atrophy risks",
    "Build a personal red-flag list"
  ],
  "theory": {
    "sections": [
      {
        "title": "High-stakes boundaries",
        "content": "AI is a statistical pattern engine, not a licensed professional with legal accountability.\n\n**High-Stakes Red Lines:**\n- **Medical & Mental Health:** Never use AI as a substitute for a qualified doctor, therapist, or emergency help.\n- **Legal Decisions:** Never sign contracts or file legal paperwork based solely on AI advice.\n- **Critical Financial Bets:** Never allocate core savings based on unverified AI market summaries.\n\nIn high-stakes domains, AI at most drafts questions for you to bring to a qualified human professional."
      },
      {
        "title": "Preventing cognitive skill atrophy",
        "content": "If you outsource all thinking, drafting, and problem-solving to AI, your underlying intellectual muscles decay.\n\n**Skill Atrophy Defense:**\n- Write first drafts manually once a week to maintain your personal voice.\n- Do mental math and logic checks before asking AI for calculations.\n- Read original books and research papers, not just AI-generated bullet summaries."
      },
      {
        "title": "Your personal red-flag list",
        "content": "Create a written **Red-Flag List** of personal boundaries before you face high-pressure deadlines:\n\n```text\n[MY PERSONAL RED FLAGS]\n- I will not use AI on closed-book academic assessments\n- I will not use AI to generate emotional apologies to friends or family\n- I will not publish any medical, legal, or high-stakes safety claims\n- I will not submit client code without understanding every single line\n```"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Treating AI as a therapist, doctor, or legal counsel",
      "explanation": "Dangerous and irresponsible in high-stakes personal situations.",
      "correctApproach": "Seek qualified, licensed human professionals for health, legal, and crisis needs."
    },
    {
      "mistake": "Outsourcing 100% of your critical thinking and writing",
      "explanation": "Leads to cognitive skill atrophy and loss of creative confidence.",
      "correctApproach": "Maintain deliberate manual practice sessions regularly."
    },
    {
      "mistake": "Having no pre-committed ethical boundaries",
      "explanation": "Under tight deadlines, people make desperate compromises they later regret.",
      "correctApproach": "Write your personal red-flag list and commit to it in advance."
    }
  ],
  "summary": "Knowing when NOT to use AI is the mark of a true senior practitioner. Next: package your system for clients or portfolio presentation.",
  "practiceTask": {
    "title": "Red-flag list (~15 min)",
    "difficulty": "beginner",
    "description": "**Goal:** write your personal \"When-Not-To-Use-AI\" red-flag list and schedule manual skill-maintenance blocks.\n\n1. List at least 6 high-stakes tasks you will never fully outsource to AI.\n2. Identify 2 personal skills (e.g. handwriting essays, manual sketching, mental math) you will deliberately practice manually.\n3. Block a weekly 30-minute \"Human-Only Practice\" session on your calendar.\n4. **Save** your policy in `ethics/red-flags.md`.",
    "hints": [
      "Be specific: write “Graded school midterm essays” instead of “School stuff”.",
      "Include personal emotional boundaries (e.g. personal relationship communications)."
    ],
    "optionalChallenge": "Write a short reflection on one skill you noticed improving or declining since using AI tools, and your plan to maintain it."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "In which domain is relying solely on AI without human professional oversight dangerous?",
        "options": [
          "Brainstorming birthday party themes",
          "Medical diagnosis, legal contracts, and critical financial allocations",
          "Writing a catchy caption for a dog photo",
          "Formatting a markdown table"
        ],
        "correctAnswer": 1,
        "explanation": "High-stakes domains require licensed, accountable human professionals.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is cognitive skill atrophy in the context of AI usage?",
        "options": [
          "When your computer slows down",
          "The gradual decline of your own writing, analytical, and problem-solving abilities from total over-reliance on AI",
          "When an AI model runs out of training data",
          "A type of graphics card failure"
        ],
        "correctAnswer": 1,
        "explanation": "Over-reliance on automation weakens personal cognitive and creative skills.",
        type: MC
      },
      {
        "id": "q3",
        "question": "Why is writing a personal Red-Flag List in advance valuable?",
        "options": [
          "It gives you rules to break",
          "It establishes firm pre-commitments before you face high-pressure deadlines or stress",
          "It is required for AI certification",
          "It makes AI prompts run faster"
        ],
        "correctAnswer": 1,
        "explanation": "Pre-committed rules prevent poor ethical decisions under deadline pressure.",
        type: MC
      },
      {
        "id": "q4",
        "question": "How can a professional prevent skill atrophy while using AI daily?",
        "options": [
          "Stop using computers entirely",
          "Maintain regular deliberate manual practice in writing, problem-solving, and critical reading",
          "Only use AI after midnight",
          "Switch to a different AI model every day"
        ],
        "correctAnswer": 1,
        "explanation": "Regular manual practice keeps intellectual and creative capabilities sharp.",
        type: MC
      }
    ]
  }
}

export const aiLesson053 = {
  "lessonId": "ai-lesson-05-3",
  "moduleId": "module-05",
  "order": 3,
  "title": "Package for a client or portfolio",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Document prompts, calendar, and brand sheet",
    "Show before/after samples",
    "Price or present the system clearly"
  ],
  "theory": {
    "sections": [
      {
        "title": "The client-ready system deliverable",
        "content": "Clients and employers do not pay for raw chat logs or random prompt screenshots. They pay for **turnkey operational systems**.\n\nA packaged content system includes 6 clean components:\n\n1. **Brand Voice & Standards Sheet:** Persona, proof style, banned words.\n2. **Curated Prompt Library:** 8-12 tested RTCF templates with placeholders.\n3. **Weekly Pipeline & Schedule:** 5-stage workflow with calendar time-boxes.\n4. **14-Day Sample Calendar & Content Pack:** Ready-to-publish native assets.\n5. **Data Privacy & Disclosure Note:** Transparent compliance policy.\n6. **Operational Stack Card:** Recommended tools, tier specs, and export guidelines."
      },
      {
        "title": "Before / After proof assets",
        "content": "Proof beats adjectives every time. In your portfolio or proposal, show **2-3 Before/After case studies**:\n\n- **Before:** Messy, raw client notes or vague prompt output.\n- **Process:** The specific RTCF brief, few-shot demonstration, and 3-pass edit applied.\n- **After:** Polished, on-brand, verified deliverable formatted for publication."
      },
      {
        "title": "Presenting your system offer",
        "content": "Create a 1-page presentation summary:\n\n- **Who It Is For:** Specific niche (e.g. B2B founders, educators, creators).\n- **What You Deliver Weekly:** Exact deliverable count (e.g. 3 short scripts + 2 carousels + 1 newsletter).\n- **What You Need From Them:** 30-minute weekly kickoff interview or raw voice notes.\n- **Operational Boundaries:** Privacy commitments, revision rounds, and turnaround times."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Dumping 50 raw, unorganized chat screenshots as a portfolio",
      "explanation": "Looks amateurish, unreadable, and lazy to potential clients.",
      "correctApproach": "Present a curated, beautifully formatted package with clear before/after proof."
    },
    {
      "mistake": "Making promises without showing verified before/after proof",
      "explanation": "Empty claims of “AI mastery” fail to win serious business clients.",
      "correctApproach": "Include side-by-side case studies demonstrating your process and results."
    },
    {
      "mistake": "Omitting boundaries and client input requirements",
      "explanation": "Leads to severe scope creep, delayed assets, and frustrated clients.",
      "correctApproach": "State exact input requirements, deliverable counts, and turnaround times upfront."
    }
  ],
  "summary": "Packaging turns raw technical skills into a high-value client offer. Next: deliver your final course Capstone.",
  "practiceTask": {
    "title": "Portfolio kit outline (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** assemble the structure and before/after case studies for your client or portfolio kit.\n\n1. Create a master folder named `package/` with an organized `README.md` index.\n2. Assemble your Brand Voice Sheet, Prompt Library, and Pipeline Map from earlier modules.\n3. Write 2 concrete **Before / Process / After** case studies showcasing real transformations.\n4. Draft a 1-page offer summary defining deliverables, inputs needed, and boundaries.\n5. **Save** your complete package outline in `AI for Real Life / package/README.md`.",
    "hints": [
      "Link directly to the actual markdown documents you built in Modules 01 through 04.",
      "Keep your one-page offer summary concise enough to fit on a single screen without scrolling."
    ],
    "optionalChallenge": "Add a \"System Handover Guide\" explaining how a client’s internal team could run your prompt library without your assistance."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What makes a packaged AI content system valuable to a business or client?",
        "options": [
          "A folder of 500 unedited chat screenshots",
          "A complete turnkey system with brand rules, tested prompt library, workflow pipeline, and proof assets",
          "A promise of infinite viral posts with zero work",
          "A secret API key"
        ],
        "correctAnswer": 1,
        "explanation": "Clients value structured, predictable operational systems that solve real business problems.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why are Before / After case studies essential in an AI portfolio?",
        "options": [
          "They make the file size larger",
          "They provide concrete evidence of how your process transforms messy inputs into high-value deliverables",
          "They are required by HTML regulations",
          "They hide your prompts"
        ],
        "correctAnswer": 1,
        "explanation": "Before/after demonstrations prove that your skills create measurable quality lift.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What must be included in a professional 1-page offer summary?",
        "options": [
          "Your entire personal history",
          "Target audience, exact weekly deliverables, required client inputs, and clear boundaries",
          "Only a price tag with no details",
          "Random marketing slogans"
        ],
        "correctAnswer": 1,
        "explanation": "Clarity on deliverables, inputs, and boundaries prevents scope creep and builds trust.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Why is omitting client input requirements dangerous in a service agreement?",
        "options": [
          "The client will do all the work",
          "It leads to missed deadlines and scope creep because you cannot deliver without needed raw inputs",
          "It triggers copyright audits",
          "It crashes your text editor"
        ],
        "correctAnswer": 1,
        "explanation": "Clear input expectations ensure smooth weekly production without bottlenecks.",
        type: MC
      }
    ]
  }
}

export const aiLesson054 = {
  "lessonId": "ai-lesson-05-4",
  "moduleId": "module-05",
  "order": 4,
  "title": "Capstone: ship your content system",
  "estimatedTime": 90,
  "theoryMinutes": 70,
  "quizMinutes": 10,
  "learningObjectives": [
    "Deliver a complete runnable system",
    "Self-score against the course outcomes",
    "Plan your next 30 days of use"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 6 Capstone deliverables",
        "content": "Your Capstone brings together everything you built across all 6 modules into a single, cohesive, production-ready system.\n\n**The Deliverables Checklist:**\n\n```text\n[ ] 1. Brand Voice Sheet (Audience, persona, We Say/Never Say, proof bar)\n[ ] 2. Core Prompt Library (8+ battle-tested RTCF templates with placeholders)\n[ ] 3. Weekly Pipeline Map (5 stages with calendar time-boxes)\n[ ] 4. 7-Day Sprint Content Pack (7 finished, verified, platform-ready pieces)\n[ ] 5. Data Privacy & Disclosure Policy (Never-paste list + client statement)\n[ ] 6. Operational Stack Card (Tool stack, tier settings, safe margins)\n```"
      },
      {
        "title": "The comprehensive outcome self-audit",
        "content": "Score yourself honestly from **1 (Beginner) to 5 (Mastery)** across the 5 core course outcomes:\n\n1. **Model Understanding & Tool Selection:** Can you explain token prediction, avoid hallucinations, and pick the right tool?\n2. **Prompt Engineering:** Can you write structured RTCF briefs, few-shot examples, and iterate systematically?\n3. **Generative Media Production:** Can you brief, compose, and edit on-brand images and motion clips?\n4. **Human-Sounding Writing:** Can you purge robot clichés, run the 3-pass edit, and verify claims with 2 sources?\n5. **System Operation & Cadence:** Can you operate a weekly pipeline with time-boxes and clean ethics hygiene?\n\n*Identify your single biggest growth gap and note how you will close it in the next 30 days.*"
      },
      {
        "title": "The 30-day runway",
        "content": "The course ends today, but **the habit is what creates the career advantage**.\n\nSchedule the next 4 weeks of your pipeline on your real calendar right now:\n- Put your Monday batch ideation block on your calendar.\n- Put your weekly review and editing pass on your calendar.\n- Keep your templates warm by updating them whenever you discover a new edge case."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Leaving pieces of the capstone unfinished “to do later”",
      "explanation": "Incomplete systems never get deployed in real life.",
      "correctApproach": "Complete and verify all 6 checklist items before marking the course complete."
    },
    {
      "mistake": "Giving yourself inflated 5/5 scores with no reflection",
      "explanation": "Prevents honest self-assessment and blocks future skill growth.",
      "correctApproach": "Be honest about your current friction points and pick one clear gap to improve."
    },
    {
      "mistake": "Closing the course tab and never scheduling the next 30 days",
      "explanation": "Skills decay rapidly without immediate, consistent weekly application.",
      "correctApproach": "Block your recurring production pipeline on your real calendar immediately."
    }
  ],
  "summary": "Congratulations! You have built and shipped a complete, runnable AI content system. Keep the templates warm and run your pipeline weekly.",
  "practiceTask": {
    "title": "Capstone delivery (~90 min)",
    "difficulty": "intermediate",
    "description": "**Goal:** deliver your complete, runnable 6-part AI content system with README index and 30-day plan.\n\n1. Assemble all 6 deliverables in `capstone/` with a clean master `README.md` linking every document.\n2. Complete your 5-outcome self-audit and document your primary 30-day growth gap.\n3. Block the next 4 weeks of pipeline time on your personal calendar.\n4. **Save** your complete Capstone repository package in `AI for Real Life / capstone/`.",
    "hints": [
      "Reuse and refine the assets you built in Modules 01 through 05 - do not start from scratch.",
      "Your master README should allow a stranger or client to run your system without needing to ask you questions."
    ],
    "optionalChallenge": "Record a 3-minute video walkthrough demonstrating your completed Capstone system and add the link to your README."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What are the 6 core components of the finished AI for Real Life Capstone system?",
        "options": [
          "A single chat transcript and a selfie",
          "Brand Voice Sheet, 8+ Prompt Library, Pipeline Map, 7-Day Sprint Pack, Privacy Policy, and Stack Card",
          "Six different AI software subscriptions",
          "A 100-page academic thesis"
        ],
        "correctAnswer": 1,
        "explanation": "The 6 deliverables form a comprehensive, turnkey operational content production system.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is the purpose of the 5-outcome self-audit at the end of the course?",
        "options": [
          "To assign letter grades for bragging",
          "To honestly evaluate your strengths, identify your biggest remaining growth gap, and plan improvements",
          "To reset your user progress",
          "To cancel your subscription"
        ],
        "correctAnswer": 1,
        "explanation": "Honest self-assessment reveals your highest-leverage area for continued mastery.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the single most important action to take after finishing the Capstone?",
        "options": [
          "Close the platform and never practice again",
          "Schedule your recurring weekly production pipeline blocks on your real calendar for the next 30 days",
          "Delete your prompt library",
          "Forget your voice rules"
        ],
        "correctAnswer": 1,
        "explanation": "Immediate, consistent calendar scheduling turns learned knowledge into permanent lifelong habits.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What quality should your master Capstone README.md possess?",
        "options": [
          "It should be completely empty",
          "It should be clear, structured, and comprehensive enough for a stranger or client to navigate and run your system",
          "It should only contain emojis",
          "It should be password protected from everyone"
        ],
        "correctAnswer": 1,
        "explanation": "A professional index allows anyone to understand, evaluate, and operate your system.",
        type: MC
      }
    ]
  }
}

export const module05Lessons = {
	'ai-lesson-05-1': aiLesson051,
	'ai-lesson-05-2': aiLesson052,
	'ai-lesson-05-3': aiLesson053,
	'ai-lesson-05-4': aiLesson054,
}
