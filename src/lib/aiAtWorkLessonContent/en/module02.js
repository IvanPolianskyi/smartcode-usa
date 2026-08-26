/** AI for Real Life - module 02 (EN) */
import { QUIZ_QUESTION_TYPES } from '../../courseData.js'

const MC = QUIZ_QUESTION_TYPES.MULTIPLE_CHOICE

export const aiLesson021 = {
  "lessonId": "ai-lesson-02-1",
  "moduleId": "module-02",
  "order": 1,
  "title": "Images that survive the brief",
  "estimatedTime": 60,
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "learningObjectives": [
    "Translate a creative brief into subject, style, and shot",
    "Generate three usable options, not thirty random ones",
    "Score outputs against the brief"
  ],
  "theory": {
    "sections": [
      {
        "title": "The 4-part image brief",
        "content": "Vague image prompt: `Cool futuristic computer on a desk.`\nResult: Cluttered sci-fi neon soup with glowing nonsense.\n\nA production-ready image brief requires 4 explicit components:\n\n```text\nSubject: Matte black modern laptop open on a clean light oak desk\nStyle: Editorial lifestyle photography, natural morning light, Scandinavian minimalism\nShot & Composition: 45-degree angled medium close-up, shallow depth of field (f/2.8)\nConstraints: 16:9 aspect ratio, clean negative space on left side, no floating artifacts, no text\n```"
      },
      {
        "title": "The rule of three directed variants",
        "content": "Do not pull the slot machine handle 30 times. Generate **three intentional variations**:\n\n1. *Option A (Baseline):* Natural daylight, eye-level.\n2. *Option B (Alternative Angle):* Top-down flat lay, warm golden hour.\n3. *Option C (Atmospheric):* Moody side-light, darker contrast.\n\nScore all three against your channel brief. Select the winner and iterate locally."
      },
      {
        "title": "Channel constraints & aspect ratios",
        "content": "Always specify the exact aspect ratio for the delivery channel:\n\n- **16:9** - YouTube thumbnails, website hero banners, presentation slides\n- **9:16** - TikTok, Instagram Reels, YouTube Shorts\n- **1:1 or 4:5** - Instagram feed posts, product cards, avatar portraits\n\nReserve clean negative space for headline text overlays."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Using 20 vague buzzwords like “ultra-realistic 8k masterpiece”",
      "explanation": "Modern models ignore empty hype words; they need concrete visual nouns.",
      "correctApproach": "Describe lighting, camera angle, material textures, and composition."
    },
    {
      "mistake": "Generating 50 images without scoring",
      "explanation": "Decision fatigue leads to choosing based on novelty rather than brief fit.",
      "correctApproach": "Generate 3 directed variants, score against the brief, and pick the winner."
    },
    {
      "mistake": "Forgetting aspect ratio parameters",
      "explanation": "Images get awkwardly cropped by social media platforms.",
      "correctApproach": "Set aspect ratios explicitly in the prompt parameters (--ar 16:9, etc.)."
    }
  ],
  "summary": "Structured image briefs turn random generation into predictable media production. Next: lock visual consistency with style cards.",
  "practiceTask": {
    "title": "Three-option set (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** produce a 3-option image set matching a specific written creative brief.\n\n1. Write a 4-part image brief (Subject, Style, Shot, Constraints) for a real channel need.\n2. Generate 3 directed variants testing distinct angles or lighting setups.\n3. Score each output 1-5 against your brief criteria.\n4. **Save** the brief, the 3 generated images, and your scoring notes in `AI for Real Life / 02-1`.",
    "hints": [
      "Ensure your brief specifies the exact aspect ratio for your intended channel.",
      "Keep the subject grounded with specific materials and textures."
    ],
    "optionalChallenge": "Generate a version with dedicated negative space specifically positioned for a text headline overlay."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What are the four essential elements of a production image brief?",
        "options": [
          "Subject, Style, Shot/Composition, Constraints",
          "Vibe, Hype, Filter, Luck",
          "Pixel count, GPU speed, Seed number, Color code",
          "Title, Author, Date, Price"
        ],
        "correctAnswer": 0,
        "explanation": "Subject, Style, Shot, and Constraints create controllable visual assets.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why should you generate 3 directed variants instead of 30 random ones?",
        "options": [
          "Image generators only allow 3 tries",
          "It prevents decision fatigue and forces systematic evaluation against criteria",
          "AI models overheat after 3 images",
          "Random generation always produces better results"
        ],
        "correctAnswer": 1,
        "explanation": "Directed generation ensures intentional creative direction.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What should you do if an image is visually stunning but misses the brief?",
        "options": [
          "Publish it anyway because it looks nice",
          "Reject or revise it - the brief is the contract for the channel",
          "Crop out the entire subject",
          "Delete your image generator account"
        ],
        "correctAnswer": 1,
        "explanation": "Off-brief beauty wastes channel positioning and confuses the audience.",
        type: MC
      },
      {
        "id": "q4",
        "question": "Which aspect ratio is standard for vertical short-form video and Stories?",
        "options": [
          "16:9",
          "9:16",
          "1:1",
          "4:3"
        ],
        "correctAnswer": 1,
        "explanation": "9:16 is the standard vertical mobile aspect ratio.",
        type: MC
      }
    ]
  }
}

export const aiLesson022 = {
  "lessonId": "ai-lesson-02-2",
  "moduleId": "module-02",
  "order": 2,
  "title": "Style, composition, and reference",
  "estimatedTime": 60,
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "learningObjectives": [
    "Control composition with camera language",
    "Use references without copying a brand",
    "Keep a consistent look across a set"
  ],
  "theory": {
    "sections": [
      {
        "title": "Camera & lighting language",
        "content": "Replace vague words like `cinematic` with concrete photography terms:\n\n| Desired Effect | Concrete Term to Use |\n|---|---|\n| Distance / Scale | Wide establishing shot / Medium portrait / Macro close-up |\n| Camera Angle | Low angle (imposing) / Eye-level / Overhead flat-lay / Drone perspective |\n| Lighting Quality | Diffused softbox / Golden hour backlight / Harsh neon rim light / Rembrandt lighting |\n| Depth | Shallow depth of field (f/1.8, bokeh) / Deep focus (f/11, everything sharp) |"
      },
      {
        "title": "References without trademark traps",
        "content": "Use reference images to teach **color palettes, lighting angles, and texture moods**.\n\n- **Never** prompt: `In the exact style of [Living Artist]` or `Draw Nike mascot` for commercial work.\n- **Instead:** Describe the visual qualities: `Bold graphic linework with a limited 3-color palette of terracotta, navy, and off-white.`"
      },
      {
        "title": "The 5-line style card",
        "content": "To maintain brand consistency across a 10-image carousel or series, lock a **Style Card** and append it to every prompt:\n\n```text\nSTYLE CARD:\n- Palette: Forest green (#2D5A27), muted terracotta, warm cream background\n- Lighting: 45-degree diffused window light, soft natural shadows\n- Lens & Shot: 50mm lens, eye-level medium shot, subtle grain\n- Environment: Clean modern studio with wood and ceramic accents\n- Mood: Calm, deliberate, editorial\n```"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Changing style descriptors between shots in a series",
      "explanation": "Your feed or carousel looks like a chaotic collection of random art styles.",
      "correctApproach": "Lock a 5-line style card and paste it verbatim into every prompt in the series."
    },
    {
      "mistake": "Using copyrighted character names or living artists in client work",
      "explanation": "Creates severe legal and copyright infringement liabilities.",
      "correctApproach": "Describe the underlying lighting, color palette, and medium instead."
    },
    {
      "mistake": "Relying only on “cinematic” without specific camera specs",
      "explanation": "The AI defaults to oversaturated orange-and-teal movie tropes.",
      "correctApproach": "Use precise camera terms: 50mm lens, eye-level, softbox lighting."
    }
  ],
  "summary": "Style cards ensure visual brand coherence across entire sets. Next: edit, inpaint, and fix artifacts without starting over.",
  "practiceTask": {
    "title": "Style-card set (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** create a cohesive 3-image set using a single locked style card.\n\n1. Write a 5-line Style Card (Palette, Lighting, Lens/Shot, Environment, Mood).\n2. Generate 3 distinct subjects (e.g. a workstation, a coffee moment, a notebook setup) using the same style card.\n3. Compare the 3 images side by side for visual cohesion.\n4. **Save** the Style Card and all 3 images in `AI for Real Life / 02-2`.",
    "hints": [
      "If consistency drifts, shorten the style card and place it at the front of each prompt.",
      "Keep the background palette consistent across all 3 images."
    ],
    "optionalChallenge": "Generate a 4th image in the set featuring a human subject that maintains the exact same color grade and lighting mood."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What is the main purpose of a Style Card in visual workflows?",
        "options": [
          "To make images generate faster",
          "To maintain visual and color consistency across an entire set or campaign",
          "To bypass tool subscription fees",
          "To apply watermarks automatically"
        ],
        "correctAnswer": 1,
        "explanation": "Style cards lock palette, lighting, and mood across multiple assets.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Which phrasing gives the most precise composition control?",
        "options": [
          "“Make it super cinematic and cool”",
          "“Eye-level medium shot, 50mm lens, soft diffused window light from the left”",
          "“Award-winning masterpiece on ArtStation”",
          "“Best quality ever 8k”"
        ],
        "correctAnswer": 1,
        "explanation": "Specific camera and lighting terms provide predictable visual results.",
        type: MC
      },
      {
        "id": "q3",
        "question": "How should reference images and styles be used ethically and legally?",
        "options": [
          "Copying protected trademarks and living artists’ signatures",
          "Extracting lighting principles, color palettes, and composition without cloning protected IP",
          "Claiming someone else’s art as your own model output",
          "Ignoring all copyright law"
        ],
        "correctAnswer": 1,
        "explanation": "Learn palette and composition without infringing on protected IP.",
        type: MC
      },
      {
        "id": "q4",
        "question": "If a 3-image carousel looks visually disconnected, what is the most likely cause?",
        "options": [
          "The internet connection lagged",
          "The style descriptors and lighting rules varied between prompts",
          "The image files were saved as PNG instead of JPEG",
          "The model ran out of memory"
        ],
        "correctAnswer": 1,
        "explanation": "Inconsistent prompt descriptors produce disjointed visual series.",
        type: MC
      }
    ]
  }
}

export const aiLesson023 = {
  "lessonId": "ai-lesson-02-3",
  "moduleId": "module-02",
  "order": 3,
  "title": "Edit, vary, and fix",
  "estimatedTime": 55,
  "theoryMinutes": 35,
  "quizMinutes": 10,
  "learningObjectives": [
    "Use variations and local edits instead of full regenerations",
    "Fix hands, text, and other common artifacts",
    "Export at the size your channel needs"
  ],
  "theory": {
    "sections": [
      {
        "title": "Preserve the 80%",
        "content": "When an image is 80% perfect but has a weird hand or a distorted prop, **do NOT hit full regenerate**.\n\nFull regenerations discard the composition, lighting, and mood that worked. Instead, use:\n- **Vary (Subtle / Region):** Keep the scene and change only the flawed element.\n- **Inpainting / Canvas Edit:** Brush over the flaw and prompt specifically for the replacement.\n- **Outpainting / Pan:** Expand the frame without altering the center."
      },
      {
        "title": "Artifact triage & typography reality",
        "content": "Common generative artifacts:\n- Extra fingers or warped hands\n- Warped background text or melted logos\n- Asymmetrical glasses or unnatural eye reflections\n\n**The Typography Rule:** AI models frequently misspell words in images. For logos, headlines, and captions, generate clean negative space and **overlay professional typography in Figma, Canva, or Photoshop**."
      },
      {
        "title": "The production export checklist",
        "content": "Before shipping an image asset to production:\n\n```text\n[ ] Aspect ratio matches target platform specs\n[ ] Resolution is at least 1080px on shortest side\n[ ] Inspected at 100% zoom for anatomy and artifact flaws\n[ ] Typography added cleanly in a graphic design tool\n[ ] File named with version and dimensions: hero_v2_1920x1080.png\n```"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Rerolling from scratch when one small element is flawed",
      "explanation": "Throws away a great composition and wastes tokens.",
      "correctApproach": "Use inpainting or subtle variations to fix the specific region."
    },
    {
      "mistake": "Trusting AI to render complex graphic headlines inside the image",
      "explanation": "Produces illegible, misspelled, or warped letterforms.",
      "correctApproach": "Render clean negative space and overlay typography in a design tool."
    },
    {
      "mistake": "Exporting without checking full-resolution details",
      "explanation": "Flawed artifacts like extra fingers become glaring on high-res screens.",
      "correctApproach": "Always inspect at 100% zoom before shipping to a client or feed."
    }
  ],
  "summary": "Targeted editing preserves creative wins. Next: short video generation and motion plates.",
  "practiceTask": {
    "title": "Near-miss to shippable (~30 min)",
    "difficulty": "beginner",
    "description": "**Goal:** take one flawed \"near-miss\" image and turn it into a shippable asset using local edits.\n\n1. Pick an image from Lesson 02-1 or 02-2 that had good composition but a regional flaw.\n2. Use inpainting, regional variation, or a localized edit tool to fix the flaw.\n3. Import the image into a design tool (Figma, Canva, etc.) and add a clean headline overlay.\n4. Export with correct naming (`project_shippable_1080x1080.png`) and **save** before/after in your folder.",
    "hints": [
      "When inpainting, keep the replacement prompt focused only on the brushed region.",
      "Ensure typography uses high contrast against the background image."
    ],
    "optionalChallenge": "Use outpainting/expand to convert a 1:1 square image into a 16:9 widescreen presentation banner without distorting the subject."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "When an image has great lighting and composition but one flawed hand, what should you do?",
        "options": [
          "Hit full regeneration 20 times",
          "Use inpainting or localized regional variation to fix only the hand",
          "Delete the whole project",
          "Upscale without making changes"
        ],
        "correctAnswer": 1,
        "explanation": "Preserve what works; fix only what is broken.",
        type: MC
      },
      {
        "id": "q2",
        "question": "What is the most reliable method for adding sharp headline text to an AI visual?",
        "options": [
          "Prompt the AI to write text inside the image",
          "Generate clean negative space and overlay typography in a design tool",
          "Use blurry handwriting filters",
          "Take a screenshot of phone text"
        ],
        "correctAnswer": 1,
        "explanation": "Graphic design tools ensure perfect spelling, kerning, and brand font alignment.",
        type: MC
      },
      {
        "id": "q3",
        "question": "Why is checking an image at 100% zoom an essential production step?",
        "options": [
          "To check Wi-Fi speed",
          "To catch subtle anatomical flaws, warped textures, and artifacts before publishing",
          "To increase token usage",
          "It is required by browser standards"
        ],
        "correctAnswer": 1,
        "explanation": "Full-zoom inspection catches artifacts that are invisible in small thumbnails.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What information should a production export filename include?",
        "options": [
          "Only the word “image”",
          "Project name, version number, and pixel dimensions (e.g. thumb_v2_1280x720.png)",
          "Your credit card number",
          "Random timestamp digits only"
        ],
        "correctAnswer": 1,
        "explanation": "Standardized filenames keep multi-channel assets organized and findable.",
        type: MC
      }
    ]
  }
}

export const aiLesson024 = {
  "lessonId": "ai-lesson-02-4",
  "moduleId": "module-02",
  "order": 4,
  "title": "Short video and motion basics",
  "estimatedTime": 60,
  "theoryMinutes": 40,
  "quizMinutes": 10,
  "learningObjectives": [
    "Brief a short clip from a still or script",
    "Keep motion simple enough to control",
    "Plan audio and text overlays separately"
  ],
  "theory": {
    "sections": [
      {
        "title": "The image-to-video workflow",
        "content": "Trying to generate a 60-second viral video with one text prompt creates chaotic, morphed mush.\n\nThe reliable production workflow is **Image-to-Video (I2V)**:\n\n1. Generate a high-quality, locked still image (Lesson 02-1).\n2. Feed the still image into a video model (Runway, Pika, Luma, Kling, CapCut AI).\n3. Prompt **only for camera movement and subtle environmental motion**."
      },
      {
        "title": "Controllable camera motions",
        "content": "Keep motion simple and motivated. Complex action scenes frequently break physics.\n\n- **Slow Push-In / Zoom In:** Builds focus and tension.\n- **Subtle Parallax / Pan Left-to-Right:** Reveals scale.\n- **Atmospheric Motion:** Steam rising, dust particles in sunbeams, wind in hair, ripples on water.\n\nPrompt example: `Slow cinematic push-in toward the coffee mug, gentle steam rising, background stays locked in place.`"
      },
      {
        "title": "The multi-layer video package",
        "content": "Never expect an AI video tool to generate finished sound, voices, and captions in one click. Build in layers in an editor (CapCut, Premiere, DaVinci):\n\n```text\nLayer 1 (Bottom): AI-generated 4-second motion plate\nLayer 2: Voiceover narration (human or clean TTS)\nLayer 3: Background music (ducked -18dB under voice)\nLayer 4: Animated captions centered in safe margins\nLayer 5 (Top): Sound effects (SFX) on visual transitions\n```"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Prompting complex physical actions like “two people having an argument”",
      "explanation": "Produces bizarre body morphing and distorted physics.",
      "correctApproach": "Use stills with simple, subtle camera moves and atmospheric motion."
    },
    {
      "mistake": "Placing on-screen text in platform dead zones",
      "explanation": "TikTok and Reels UI buttons cover your text overlays.",
      "correctApproach": "Keep all captions and headlines inside the safe 9:16 center zone."
    },
    {
      "mistake": "Ignoring audio design and sound effects",
      "explanation": "Silent AI clips feel robotic and underperform drastically.",
      "correctApproach": "Add voiceover, ducked music, and subtle Foley sound effects in your editor."
    }
  ],
  "summary": "Simple, layered motion beats chaotic generation. Next: commercial rights, watermarks, and disclosure.",
  "practiceTask": {
    "title": "15-second package (~35 min)",
    "difficulty": "beginner",
    "description": "**Goal:** build a complete 15-second vertical video package using a motion plate and layered audio.\n\n1. Write a tight 3-beat script: Hook (0-3s), Insight (3-11s), Call to Action (11-15s).\n2. Generate a high-quality still image and animate it with a simple camera push-in.\n3. Import the clip into a video editor (CapCut, Premiere, etc.), add voiceover, captions, and background audio.\n4. Export as vertical 9:16 and **save** your script, motion plate, and final video in `AI for Real Life / 02-4`.",
    "hints": [
      "Keep the camera move slow and steady - fast AI motion creates warping.",
      "Check that captions are large, legible, and well within mobile safe zones."
    ],
    "optionalChallenge": "Create a 2-shot sequence by animating two complementary stills and cutting between them on a narrative beat."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "Why is Image-to-Video (I2V) more reliable than text-to-video for production work?",
        "options": [
          "It is always 100% free",
          "It locks the visual character, lighting, and composition before adding motion",
          "Text prompts cannot generate video",
          "I2V eliminates the need for video editing software"
        ],
        "correctAnswer": 1,
        "explanation": "Starting from a locked still prevents chaotic style and composition morphing.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Which type of motion prompt produces the cleanest AI video results?",
        "options": [
          "“Explosions with martial arts flips and flying cars”",
          "“Slow cinematic push-in with subtle steam rising from the cup”",
          "“Rapid 360-degree camera spin with changing lighting”",
          "“Instant teleports across five cities”"
        ],
        "correctAnswer": 1,
        "explanation": "Simple, motivated camera moves and subtle atmospheric motion maintain visual coherence.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the recommended approach for audio in AI video projects?",
        "options": [
          "Rely entirely on whatever default audio the AI generates",
          "Layer voiceover, ducked background music, and SFX in a dedicated video editor",
          "Publish silent videos only",
          "Use maximum volume distortion"
        ],
        "correctAnswer": 1,
        "explanation": "Layered audio in an editor gives full control over pacing, clarity, and volume.",
        type: MC
      },
      {
        "id": "q4",
        "question": "What happens if on-screen text is placed too close to the right or bottom edges in a 9:16 vertical video?",
        "options": [
          "It increases engagement",
          "Social media platform UI buttons (like, comment, profile) cover and obscure the text",
          "The video file will corrupt",
          "The text becomes 3D automatically"
        ],
        "correctAnswer": 1,
        "explanation": "Platform UI chrome covers the outer margins of 9:16 vertical videos.",
        type: MC
      }
    ]
  }
}

export const aiLesson025 = {
  "lessonId": "ai-lesson-02-5",
  "moduleId": "module-02",
  "order": 5,
  "title": "Rights, watermarks, and what you can ship",
  "estimatedTime": 45,
  "theoryMinutes": 25,
  "quizMinutes": 10,
  "learningObjectives": [
    "Read a tool’s commercial-use rules at a glance",
    "Avoid trademark and likeness traps",
    "Decide when to disclose AI-generated media"
  ],
  "theory": {
    "sections": [
      {
        "title": "Commercial use vs free tier terms",
        "content": "Never assume an image generated on a free plan is legal to use for business or client work.\n\nCheck three terms in your tool’s pricing page:\n1. **Commercial Rights:** Does your plan grant full commercial exploitation rights?\n2. **Asset Ownership / Exclusivity:** Do you own the outputs, or are they public domain / shared in an open feed?\n3. **Watermark Requirements:** Does the platform require visible badges or attribution on free exports?"
      },
      {
        "title": "Likeness, trademark, and copyright traps",
        "content": "Generating protected intellectual property creates legal risk and destroys client trust:\n\n- **Celebrity Likenesses:** Do not use recognizable faces of living celebrities in promotional ads.\n- **Trademarked Brands:** Do not generate branded logos (Apple, Nike, Disney) without explicit written authorization.\n- **Style Impersonation:** Do not use living artists' names as style tags in commercial products."
      },
      {
        "title": "Ethical disclosure policy",
        "content": "When should you disclose AI usage?\n\n- **Client Work:** Disclose in your proposal/agreement that AI tools are used for drafting, ideation, and production assistance.\n- **Journalism / Non-Fiction:** Disclose any synthetic imagery or AI-assisted reporting.\n- **Social Media:** Use platform AI labels when required by policy.\n- **Rule of Thumb:** If a client or audience would reasonably feel deceived upon discovering AI was used, **disclose proactively**."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Assuming free tier outputs include commercial commercialization rights",
      "explanation": "Many free plans restrict usage to personal, non-commercial evaluation only.",
      "correctApproach": "Review your specific plan terms before delivering assets to clients."
    },
    {
      "mistake": "Using celebrity deepfakes or lookalikes in commercial ads",
      "explanation": "Exposes you and your clients to severe right-of-publicity lawsuits.",
      "correctApproach": "Use original character prompts or licensed talent."
    },
    {
      "mistake": "Hiding AI usage from paying clients",
      "explanation": "When discovered, it damages professional trust permanently.",
      "correctApproach": "Position AI tools as your professional productivity workflow in client proposals."
    }
  ],
  "summary": "Legal and ethical clarity protects your career and builds client trust. Module 03 focuses on writing that retains genuine human voice.",
  "practiceTask": {
    "title": "Rights checklist (~20 min)",
    "difficulty": "beginner",
    "description": "**Goal:** audit your personal AI stack terms and document your commercial rights and disclosure policy.\n\n1. Open the Terms of Service / Pricing FAQ for your primary image and video tools.\n2. Note commercial use permissions, watermark rules, and asset visibility settings.\n3. Write your standard 2-sentence **Disclosure Statement** for portfolio and client work.\n4. **Save** your completed `rights-checklist.md` in `AI for Real Life / stack-card.md`.",
    "hints": [
      "If a tool’s terms are ambiguous regarding commercial use, treat it as non-commercial until verified.",
      "Keep your disclosure statement transparent, professional, and confident."
    ],
    "optionalChallenge": "Draft a one-paragraph AI Usage clause suitable for including in a freelance client contract or project proposal."
  },
  "quiz": {
    "passingScore": 70,
    "timeLimit": 10,
    "questions": [
      {
        "id": "q1",
        "question": "What should you verify before using an AI-generated image for a paying client?",
        "options": [
          "Only whether the colors match",
          "Whether your tool tier grants full commercial usage rights and allows commercial exploitation",
          "Whether your friends like it",
          "Nothing - all AI images are automatically free for all uses"
        ],
        "correctAnswer": 1,
        "explanation": "Commercial rights vary by tool tier and must be verified before client delivery.",
        type: MC
      },
      {
        "id": "q2",
        "question": "Why is using recognizable celebrity likenesses in commercial ads dangerous?",
        "options": [
          "Celebrities charge too little",
          "It violates Right of Publicity laws and creates severe legal liability",
          "Celebrities dislike high resolution",
          "AI models refuse to save PNGs"
        ],
        "correctAnswer": 1,
        "explanation": "Right of publicity protects individuals from unauthorized commercial exploitation of their likeness.",
        type: MC
      },
      {
        "id": "q3",
        "question": "What is the best practice for handling AI disclosure with freelance clients?",
        "options": [
          "Keep it a secret forever",
          "Be transparent in your proposal that you use AI as a professional workflow accelerator",
          "Pretend you coded everything in assembly language",
          "Only disclose if threatened"
        ],
        "correctAnswer": 1,
        "explanation": "Professional transparency builds trust and sets clear expectations.",
        type: MC
      },
      {
        "id": "q4",
        "question": "If a free tier tool requires a visible watermark, can you crop it out and use it commercially?",
        "options": [
          "Yes, no one will notice",
          "No - doing so typically violates the platform’s Terms of Service",
          "Only on weekends",
          "Only if converted to GIF"
        ],
        "correctAnswer": 1,
        "explanation": "Circumventing platform watermark terms breaches the license agreement.",
        type: MC
      }
    ]
  }
}

export const module02Lessons = {
	'ai-lesson-02-1': aiLesson021,
	'ai-lesson-02-2': aiLesson022,
	'ai-lesson-02-3': aiLesson023,
	'ai-lesson-02-4': aiLesson024,
	'ai-lesson-02-5': aiLesson025,
}
