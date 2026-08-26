/** AI for Real Life - module 03 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson031 = {
  "lessonId": "ai-lesson-03-1",
  "moduleId": "module-03",
  "order": 1,
  "title": "Drafts without the robot voice",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Brief for voice, audience, and length",
    "Strip AI tells from a draft",
    "Keep a personal voice bank"
  ],
  "theory": {
    "sections": [
      {
        "title": "The robot voice problem",
        "content": "Default AI text sounds unmistakable: polite, wordy, symmetrical, and emotionally beige.\n\nIt leans on predictable filler:\n- *“In today’s fast-paced digital landscape…”*\n- *“It is crucial to delve into the transformative tapestry of…”*\n- *“Furthermore, it is important to remember that…”*\n\nReaders tune this out instantly. Your job is to brief and edit the draft until it sounds like a sharp human wrote it."
      },
      {
        "title": "The AI cliché purge list",
        "content": "Add an explicit banned words constraint to all writing briefs:\n\n```text\nBanned Words & Phrases:\n- delve, tapestry, testament, beacon, pivotal, crucial, landscape\n- in today's world, game-changer, revolutionary, seamless, leverage\n- furthermore, moreover, in conclusion, needless to say\n- rhetorical throat-clearing intro paragraphs\n```"
      },
      {
        "title": "Your personal voice bank",
        "content": "AI cannot copy your personality unless you provide samples. Create a **Voice Bank**:\n\n1. Collect 5-10 sentences you actually wrote (from emails, tweets, or essays) that sound distinctly like you.\n2. Paste them into your prompt as a style anchor:\n\n```text\nVoice Sample:\n\"We don't need another 50-step productivity framework. We just need to stop checking Slack every six minutes and actually finish one hard task before lunch.\"\n\nTask: Draft a short memo about {{TOPIC}} matching this exact rhythm, directness, and sentence length.\n```"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Publishing first-pass AI drafts with zero voice editing",
      "explanation": "Readers instantly spot the generic robot tone and lose interest.",
      "correctApproach": "Always run a dedicated voice pass to inject real perspective and rhythm."
    },
    {
      "mistake": "Providing no voice samples in writing prompts",
      "explanation": "The model defaults to its corporate PR training baseline.",
      "correctApproach": "Provide 2-3 sentences from your Voice Bank in every writing brief."
    },
    {
      "mistake": "Replacing conversational language with overly formal vocabulary",
      "explanation": "Makes writing stiff, unreadable, and artificial.",
      "correctApproach": "Prioritize clarity, short sentences, and specific nouns over formal adjectives."
    }
  ],
  "summary": "Voice is briefed with samples and refined by purging clichés. Next: master the three-pass editing protocol.",
  "practiceTask": {
    "title": "Humanize a draft (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** take a generic AI draft and humanize it until it passes the robot-voice strip test.\n\n1. Generate a 200-word draft on a topic of your choice using a basic prompt.\n2. Highlight and delete all AI clichés, empty throat-clearing, and symmetrical three-part lists.\n3. Rewrite the piece incorporating at least one personal voice sample and one concrete real-world detail.\n4. **Save** the Before and After versions side by side in `AI for Real Life / 03-1`.",
    "hints": [
      "Read the draft aloud - if a sentence feels awkward or unnatural to say, cut or rewrite it.",
      "Replace passive verbs with active, energetic verbs."
    ],
    "optionalChallenge": "Cut the total word count by 35% without losing a single key insight or argument."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Which opening line is an immediate giveaway of unedited AI writing?",
        "options": [
          "“I tested three time-tracking apps this week - here is the data.”",
          "“In today’s fast-paced digital landscape, productivity is more crucial than ever.”",
          "“Most founders fail because they hire too early.”",
          "“Here is what broke during our product launch.”"
        ],
        "correctAnswer": 1,
        "explanation": "“In today’s fast-paced...” is a classic unedited AI throat-clearing cliché.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is a personal Voice Bank?",
        "options": [
          "An audio recording of your voice for podcasts",
          "A curated document of sentences you wrote that represent your natural tone and rhythm",
          "A bank account for paying AI subscriptions",
          "A database of synthetic celebrity voices"
        ],
        "correctAnswer": 1,
        "explanation": "A Voice Bank provides concrete style demonstrations to anchor AI drafting.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What happens when you publish raw, unedited first-pass AI drafts?",
        "options": [
          "Readers notice the generic tone, reducing credibility and engagement",
          "The post automatically ranks #1 on Google",
          "The model copyright expires",
          "The text becomes confidential"
        ],
        "correctAnswer": 0,
        "explanation": "Unedited AI prose feels soulless, generic, and easily dismissable.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What is the best way to eliminate stiff corporate tone from an AI draft?",
        "options": [
          "Add more corporate jargon",
          "Use a banned-cliché list and provide concrete voice sample sentences",
          "Use all-caps font",
          "Make every paragraph exactly 5 sentences long"
        ],
        "correctAnswer": 1,
        "explanation": "Combining negative constraints with voice demonstrations eliminates generic chatbot tone.",
        type: MC
      }
    ]
  }
}

export const aiLesson032 = {
  "lessonId": "ai-lesson-03-2",
  "moduleId": "module-03",
  "order": 2,
  "title": "The edit pass: cut, voice, facts",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Run a three-pass edit every time",
    "Cut filler without losing meaning",
    "Mark claims that need a source"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 3-pass editing protocol",
        "content": "Never edit everything at once. You will fix a typo while missing a fabricated fact or bland paragraph.\n\nUse the **Three-Pass Protocol** on every piece:\n\n1. **Pass 1 - Cut:** Remove 25-35% of the words. Kill throat-clearing, redundancies, and fluff.\n2. **Pass 2 - Voice:** Restore human rhythm. Shorten long sentences, inject opinion, and fix word choices.\n3. **Pass 3 - Facts:** Verify every number, link, name, and factual assertion."
      },
      {
        "title": "Pass 1: Cut ruthlessly",
        "content": "AI writing is naturally bloated. Delete:\n- Introductory fluff: *“As we all know,” “It goes without saying”*\n- Intensifiers that add zero meaning: *“very,” “extremely,” “truly,” “literally”*\n- Duplicate sentences that say the same point in two different ways\n\nEvery sentence must earn its place on the page."
      },
      {
        "title": "Pass 3: Fact triage tags",
        "content": "During your third pass, mark every objective assertion with tags:\n\n- `[VERIFIED - link/source]` - Confirmed in a primary source.\n- `[NEEDS SOURCE]` - Soft claim; must look up before publishing.\n- `[DELETE]` - Unverifiable statistic or plausible hallucination.\n\nNever publish a piece with unresolved `[NEEDS SOURCE]` tags."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Editing only for spelling and grammar",
      "explanation": "Leaves bloated structure, boring tone, and unchecked factual errors.",
      "correctApproach": "Run all 3 distinct passes: Cut, Voice, and Facts."
    },
    {
      "mistake": "Leaving unverified statistics in published text",
      "explanation": "One fabricated stat destroys professional trust permanently.",
      "correctApproach": "Tag all claims and verify against primary sources before publishing."
    },
    {
      "mistake": "Cutting meaning along with filler words",
      "explanation": "Over-shortening can strip necessary context and nuance.",
      "correctApproach": "Cut empty adjectives and throat-clearing, not core arguments and data."
    }
  ],
  "summary": "Cut → Voice → Facts is our non-negotiable editing standard. Next: honest and high-impact academic use.",
  "practiceTask": {
    "title": "Three-pass edit (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** apply the complete 3-pass editing protocol to a 250-word AI draft.\n\n1. Generate a 250-word informative draft on an industry or academic topic.\n2. **Pass 1 (Cut):** Reduce word count by at least 25% by removing fluff.\n3. **Pass 2 (Voice):** Adjust sentence variation, fix rhythm, and inject personality.\n4. **Pass 3 (Facts):** Mark all assertions with `[VERIFIED]`, `[NEEDS SOURCE]`, or `[DELETE]`.\n5. **Save** the fully annotated draft in `AI for Real Life / 03-2`.",
    "hints": [
      "Use different color highlights or markdown tags for each pass.",
      "If a statistic cannot be verified in 60 seconds, delete it."
    ],
    "optionalChallenge": "Reduce a 300-word draft to under 150 words while improving its clarity and impact score."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What are the three passes of the professional editing protocol?",
        "options": [
          "Hope, Hype, Publish",
          "Pass 1: Cut, Pass 2: Voice, Pass 3: Facts",
          "Copy, Paste, Pray",
          "Draft, Format, Tweet"
        ],
        "correctAnswer": 1,
        "explanation": "Cut, Voice, and Facts provide a complete quality assurance workflow.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is the primary objective of Pass 1 (Cut)?",
        "options": [
          "Changing font styles",
          "Removing 25-35% of words by deleting filler, redundancy, and throat-clearing",
          "Adding more adjectives",
          "Translating into Latin"
        ],
        "correctAnswer": 1,
        "explanation": "Cutting eliminates the natural wordiness and bloat of raw AI drafts.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What should you do with a statistic tagged [NEEDS SOURCE] if you cannot find a primary source?",
        "options": [
          "Publish it anyway because it looks impressive",
          "Delete the claim or replace it with a verified statement",
          "Make the number bigger",
          "Put it in a tiny footnote"
        ],
        "correctAnswer": 1,
        "explanation": "Unverified claims must be deleted or replaced before publication.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Why is grammar-only editing insufficient for AI drafts?",
        "options": [
          "Grammar check tools are illegal",
          "It ignores voice authenticity, conciseness, and factual correctness",
          "Grammar never matters in business",
          "AI never makes grammatical mistakes"
        ],
        "correctAnswer": 1,
        "explanation": "A grammatically perfect sentence can still be boring, bloated, or completely false.",
        type: MC
      }
    ]
  }
}

export const aiLesson033 = {
  "lessonId": "ai-lesson-03-3",
  "moduleId": "module-03",
  "order": 3,
  "title": "School: study plans, notes, and honest help",
  "estimatedTime": 50,
  "theoryMinutes": 30,
  "quizMinutes": 10,
  "learningObjectives": [
    "Use AI as a tutor, not a ghostwriter",
    "Build a study plan and quiz yourself",
    "Follow academic integrity rules"
  ],
  "theory": {
    "sections": [
      {
        "title": "AI as tutor vs ghostwriter",
        "content": "Using AI to write your graded homework or essays is **cheating, dishonest, and intellectually self-defeating**. You bypass the exact cognitive struggle that builds skill.\n\nUse AI as a **world-class 1-on-1 tutor**:\n- Explain complex concepts using intuitive analogies.\n- Generate challenging practice problems and critique your attempts.\n- Socratic dialogue: Ask AI to question your arguments and expose logical gaps."
      },
      {
        "title": "The active recall study plan brief",
        "content": "Passive rereading has near-zero retention. Use AI to generate an active study schedule:\n\n```text\nRole: Expert AP European History tutor.\nTask: Build a 7-day active recall study plan for the Industrial Revolution.\nConstraints: 45 minutes/day. Focus on retrieval practice and flashcard concepts, not passive reading.\nFormat: Markdown table with columns: [Day | Core Topic | Active Retrieval Drill | Self-Quiz Target]\n```"
      },
      {
        "title": "Academic integrity standards",
        "content": "Always know and respect your school’s explicit AI policy:\n\n- **Allowed by default:** Brainstorming topics, explaining confusing textbook passages, proofreading grammar on your own original draft.\n- **Prohibited by default:** Submitting AI-generated prose as your own, using AI during closed-book exams.\n- **Golden Rule:** When in doubt, **disclose your AI usage** in your citations or project notes."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Submitting raw AI text for graded school assignments",
      "explanation": "Violates academic integrity and prevents actual learning.",
      "correctApproach": "Use AI for explanation, outlining, and practice quizzes - author your own graded submissions."
    },
    {
      "mistake": "Using AI only for passive reading summaries",
      "explanation": "Creates an illusion of competence without real memory retention.",
      "correctApproach": "Ask the model to quiz you actively and force retrieval from memory."
    },
    {
      "mistake": "Assuming school AI policies are identical across all classes",
      "explanation": "Different teachers and departments have different explicit rules.",
      "correctApproach": "Check specific syllabus guidelines for every course."
    }
  ],
  "summary": "AI accelerates genuine learning when used as a relentless personal tutor. Next: professional workplace writing and privacy.",
  "practiceTask": {
    "title": "Tutor plan + self-quiz (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** create an honest, active study aid and self-quiz for an upcoming topic or exam.\n\n1. Pick an academic subject or technical skill you are currently studying.\n2. Prompt your AI tool to act as a rigorous tutor and create a 7-day active study plan.\n3. Request 8 challenging multiple-choice and short-answer questions.\n4. Answer the questions without looking at notes, then have the model grade and critique your answers.\n5. **Save** the plan, your answers, and the critique in `AI for Real Life / 03-3`.",
    "hints": [
      "Instruct the tutor: “Do not give me the answers. Point out where my reasoning broke.”",
      "Include active recall and spaced retrieval in your study plan."
    ],
    "optionalChallenge": "Have the model create a Socratic dialogue session where it challenges your thesis statement with 3 strong counter-arguments."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What is the difference between using AI as a tutor vs a ghostwriter?",
        "options": [
          "Tutors charge money; ghostwriters are free",
          "A tutor explains concepts and quizzes you; a ghostwriter writes work you falsely claim as your own",
          "A tutor only writes code",
          "There is no difference"
        ],
        "correctAnswer": 1,
        "explanation": "Tutors enhance your learning; ghostwriting bypasses learning and violates integrity.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Which study method produces the highest long-term retention?",
        "options": [
          "Passively rereading textbook summaries generated by AI",
          "Active retrieval practice and self-quizzing",
          "Highlighting text with 5 different colors",
          "Listening to audio while sleeping"
        ],
        "correctAnswer": 1,
        "explanation": "Active retrieval forces cognitive recall, building durable memory pathways.",
        type: MC
      },
      {
        "id": "q3",
        "question": "If your school or university AI policy is ambiguous, what is the safest ethical action?",
        "options": [
          "Keep AI use a secret",
          "Disclose your specific AI usage transparently to your instructor",
          "Let the AI submit the assignment directly",
          "Ignore the rules completely"
        ],
        "correctAnswer": 1,
        "explanation": "Transparent disclosure protects your academic integrity and reputation.",
        type: MC
      },
      {
        "id": "q4",
        "question": "How should you prompt an AI tutor to maximize learning retention?",
        "options": [
          "“Write my 5-page essay for me”",
          "“Explain this concept simply, then give me 3 practice problems and critique my answers”",
          "“Give me all the answers to tomorrow’s test”",
          "“Write in Shakespearean English”"
        ],
        "correctAnswer": 1,
        "explanation": "Interactive explanation followed by retrieval testing produces genuine mastery.",
        type: MC
      }
    ]
  }
}

export const aiLesson034 = {
  "lessonId": "ai-lesson-03-4",
  "moduleId": "module-03",
  "order": 4,
  "title": "Work: email, docs, and meeting notes",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Turn messy notes into a clean summary",
    "Write professional email without corporate sludge",
    "Protect confidential info in prompts"
  ],
  "theory": {
    "sections": [
      {
        "title": "Turning messy notes into executive action",
        "content": "After a meeting or lecture, paste your raw, disorganized bullet points (with secrets scrubbed) and prompt:\n\n```text\nRole: Executive Chief of Staff.\nTask: Convert raw meeting notes into an actionable executive brief.\nFormat:\n## 1. Key Decisions Made (bullet points)\n## 2. Action Items (Table: [Owner | Action Item | Due Date])\n## 3. Open Blockers / Unresolved Questions\n```"
      },
      {
        "title": "Emails without corporate sludge",
        "content": "Stop writing 4-paragraph emails filled with `I hope this email finds you well` and `Just circling back to touch base.`\n\nUse the **Direct Ask Protocol**:\n1. **Context (1 sentence):** Why you are writing.\n2. **The Ask / Decision (Bold):** What you need.\n3. **Deadline:** When it is needed.\n4. **Next Step:** What happens next."
      },
      {
        "title": "Workplace data confidentiality",
        "content": "**Never paste confidential company data into public AI tools:**\n\n- No customer Personal Identifiable Information (PII - names, emails, SSNs, phone numbers)\n- No proprietary source code with embedded credentials or API keys\n- No unpublished financial numbers or private board minutes\n\n**Redaction rule:** Replace real entities with tokens like `[CLIENT_A]`, `[PROJECT_ALPHA]`, `[REVENUE_X]` before prompting."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Pasting sensitive client or proprietary company data into AI tools",
      "explanation": "Can cause severe corporate data leaks and violate privacy regulations (GDPR, HIPAA).",
      "correctApproach": "Always redact private names, numbers, and credentials before prompting."
    },
    {
      "mistake": "Sending bloated, corporate-sludge emails generated by AI",
      "explanation": "Busy colleagues and clients stop reading lengthy filler messages.",
      "correctApproach": "Keep workplace emails under 120 words with clear bold action items and deadlines."
    },
    {
      "mistake": "Meeting summaries with no assigned task owners or dates",
      "explanation": "Action items evaporate without clear accountability.",
      "correctApproach": "Always demand a structured table with Owner, Task, and Due Date columns."
    }
  ],
  "summary": "Clean workplace communications combine brevity with strict data privacy hygiene. Next: research assistants and source verification.",
  "practiceTask": {
    "title": "Notes → actions email (~25 min)",
    "difficulty": "beginner",
    "description": "**Goal:** turn messy raw meeting notes into a redacted executive summary and a crisp follow-up email.\n\n1. Create a set of raw, unstructured meeting notes (or use a mock project meeting).\n2. Redact all confidential details with `[CLIENT]`, `[BUDGET]`, and `[DATE]` tokens.\n3. Prompt AI to output: Key Decisions, Action Items table (Owner / Task / Deadline), and Open Questions.\n4. Draft a direct, sludge-free follow-up email under 100 words.\n5. **Save** both the summary and email in `AI for Real Life / 03-4`.",
    "hints": [
      "Make sure the email puts the primary call-to-action in bold in the first two sentences.",
      "Check that every action item has a single clear owner."
    ],
    "optionalChallenge": "Create a reusable workplace prompt template for converting client interview transcripts into a prioritized feature request list."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What should you always do before pasting work meeting notes into an AI tool?",
        "options": [
          "Add more confidential data",
          "Redact private client names, financials, and credentials using placeholders",
          "Email the CEO for approval every time",
          "Convert to PDF format only"
        ],
        "correctAnswer": 1,
        "explanation": "Redacting sensitive information protects confidential and proprietary data.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What are the three essential components of an effective meeting summary?",
        "options": [
          "Vibes, Quotes, Jokes",
          "Key Decisions, Action Items with Owners/Deadlines, and Open Questions",
          "A 10-page transcript",
          "Only the start and end time"
        ],
        "correctAnswer": 1,
        "explanation": "Decisions, actionable ownership, and open blockers drive accountability.",
        type: MC
      },
      {
        "id": "q3",
        "question": "Why is “corporate sludge” (e.g. “just circling back to touch base”) counterproductive?",
        "options": [
          "It uses too few characters",
          "It wastes the reader’s time, obscures the real ask, and reduces response rates",
          "It is grammatically incorrect",
          "It causes AI models to crash"
        ],
        "correctAnswer": 1,
        "explanation": "Clear, direct communication gets faster decisions and higher response rates.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Which email structure gets the highest executive response rate?",
        "options": [
          "A 500-word narrative backstory",
          "Context in one sentence, bold direct ask, deadline, and clear next step",
          "An attachment with no body text",
          "Five paragraphs of apologies"
        ],
        "correctAnswer": 1,
        "explanation": "The direct ask protocol delivers clarity immediately to busy readers.",
        type: MC
      }
    ]
  }
}

export const aiLesson035 = {
  "lessonId": "ai-lesson-03-5",
  "moduleId": "module-03",
  "order": 5,
  "title": "Research assistants and source checking",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Ask for sources you can open",
    "Cross-check claims in two places",
    "Build a citation habit for public work"
  ],
  "theory": {
    "sections": [
      {
        "title": "Demanding verifiable sources",
        "content": "When researching with AI, never accept vague attributions like `Studies show…` or `According to experts…`\n\nForce the model to provide specific source anchors:\n\n```text\nRole: Investigative research assistant.\nTask: Outline the core scientific debate surrounding {{TOPIC}}.\nConstraints:\n- Every factual assertion must cite a named study, institution, or primary document.\n- If a specific paper or URL cannot be verified, label it as [CANDIDATE CLAIM - UNVERIFIED].\n- Do not invent citations or paper titles.\n```"
      },
      {
        "title": "The Two-Source Rule",
        "content": "For any key statistic, historical date, or factual claim you intend to publish:\n\n**The Two-Source Rule:** You must confirm the claim in **at least two independent primary or reputable secondary sources** before it goes public.\n\nIf a model provides a link, open it in your browser. If it 404s or does not contain the asserted claim, delete or replace the claim immediately."
      },
      {
        "title": "Building a working bibliography",
        "content": "Collect citations **while drafting**, not in a panicked scramble 10 minutes before publishing.\n\nKeep a simple table in your research document:\n\n| Claim | Primary Source / URL | Confirmed By (Source 2) | Status |\n|---|---|---|---|\n| 63% adoption rate | Pew Research 2025 Report | Gartner IT Survey p.14 | Verified |\n| $4.2B market size | AI hallucinated link | Real stat is $2.1B (IDC) | Corrected |"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Trusting AI-generated URLs without opening them",
      "explanation": "Language models frequently hallucinate plausible-looking fake URLs and paper titles.",
      "correctApproach": "Open every link in your browser and confirm the claim is on the page."
    },
    {
      "mistake": "Treating a single blog post as definitive proof of a claim",
      "explanation": "Blog posts often repeat unverified internet myths or outdated data.",
      "correctApproach": "Apply the Two-Source Rule using primary data sources."
    },
    {
      "mistake": "Adding citations after publishing as an afterthought",
      "explanation": "Makes fact-checking painful and leads to embarrassing public corrections.",
      "correctApproach": "Record citations in a working bibliography table while drafting."
    }
  ],
  "summary": "AI drafts the research outline; you verify the primary sources. Module 04 builds your sustainable weekly content production system.",
  "practiceTask": {
    "title": "Two-source memo (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** write a 200-word research memo where every factual assertion is verified by two independent sources.\n\n1. Choose a controversial or data-heavy topic in your niche.\n2. Prompt your AI tool for a structured brief with candidate claims and sources.\n3. Open and verify every claim using your browser; delete any unverified assertions.\n4. Record your two confirming sources in a working bibliography table.\n5. **Save** your verified memo in `AI for Real Life / 03-5`.",
    "hints": [
      "If an AI-generated link returns a 404 error, search Google Scholar or official databases directly.",
      "Government reports, academic papers, and official filings beat random blogs."
    ],
    "optionalChallenge": "Find a widespread AI hallucination or internet myth on your topic and document why it fails the two-source check."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why do language models invent plausible-sounding academic citations and URLs?",
        "options": [
          "They are trying to deceive you on purpose",
          "They predict statistically probable token sequences that look like real papers and links",
          "Their internet connection dropped",
          "Only free tier models invent citations"
        ],
        "correctAnswer": 1,
        "explanation": "Plausible pattern completion is the underlying mechanism of generative LLMs.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is the Two-Source Rule in research verification?",
        "options": [
          "Cite the same blog post twice",
          "Confirm every factual claim in at least two independent, reliable sources before publishing",
          "Use two different font colors for citations",
          "Translate your search into two languages"
        ],
        "correctAnswer": 1,
        "explanation": "The Two-Source Rule prevents publishing fabricated or unverified claims.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What should you do if an AI research assistant generates a link that leads to a 404 error?",
        "options": [
          "Assume the paper was recently deleted",
          "Discard the fabricated URL and verify the underlying claim via a reputable primary database",
          "Publish the link anyway",
          "Complain to your browser vendor"
        ],
        "correctAnswer": 1,
        "explanation": "Open every link; never publish dead or hallucinated URLs.",
        type: MC
      },
      {
        "id": "q4",
        "question": "When should you record your research sources and citations?",
        "options": [
          "While drafting, inside a working bibliography table",
          "Weeks after publishing when someone complains",
          "Never - sources are unnecessary",
          "Only if taking an exam"
        ],
        "correctAnswer": 0,
        "explanation": "Documenting sources during drafting prevents errors and builds credibility.",
        type: MC
      }
    ]
  }
}

export const module03Lessons = {
	'ai-lesson-03-1': aiLesson031,
	'ai-lesson-03-2': aiLesson032,
	'ai-lesson-03-3': aiLesson033,
	'ai-lesson-03-4': aiLesson034,
	'ai-lesson-03-5': aiLesson035,
}
