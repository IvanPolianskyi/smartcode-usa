'use client'

import styles from './DemoScenes.module.css'

/**
 * Pure CSS loops — continuous, eased, no phase jumps.
 * Discrete setInterval stepping was what made the old demos feel chopped.
 */

export function DemoPython() {
	return (
		<div className={`${styles.scene} ${styles.python}`} data-tone="cyan" aria-hidden="true">
			<div className={styles.window}>
				<div className={styles.titlebar}>
					<span className={styles.traffic}>
						<i />
						<i />
						<i />
					</span>
					<span className={styles.winLabel}>python · practice</span>
				</div>

				<div className={styles.editor}>
					<div className={styles.gutter}>
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
					</div>
					<pre className={styles.code}>
						<code>
							<span className={`${styles.line} ${styles.line1}`}>
								<span className={styles.cmt}># How many cleared?</span>
							</span>
							<span className={`${styles.line} ${styles.line2}`}>
								<span className={styles.kw}>scores</span>
								{' = [320, 145, 500, 90]'}
							</span>
							<span className={`${styles.line} ${styles.line3}`}>
								<span className={styles.kw}>n</span>
								{' = '}
								<span className={styles.fn}>len</span>
								{'([s '}
								<span className={styles.cmt}>for</span>
								{' s '}
								<span className={styles.cmt}>in</span>
								{' scores '}
								<span className={styles.cmt}>if</span>
								{' s >= 300])'}
							</span>
							<span className={`${styles.line} ${styles.line4}`}>
								<span className={styles.fn}>print</span>
								{'(n)'}
								<span className={styles.caret} />
							</span>
						</code>
					</pre>
				</div>

				<div className={styles.toolbar}>
					<span className={styles.toolMuted}>undo</span>
					<span className={styles.run}>
						<span className={styles.runIcon}>▶</span>
						Run
					</span>
				</div>

				<div className={styles.output}>
					<span className={styles.outLabel}>Output</span>
					<div className={styles.outBody}>
						<span className={styles.outLine}>2</span>
						<span className={styles.ok}>✓ 4 of 4 checks passed</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export function DemoRoblox() {
	return (
		<div className={`${styles.scene} ${styles.roblox}`} data-tone="coral" aria-hidden="true">
			<div className={styles.window}>
				<div className={styles.titlebar}>
					<span className={styles.traffic}>
						<i />
						<i />
						<i />
					</span>
					<span className={styles.winLabel}>Script · Luau</span>
				</div>

				<div className={styles.editor}>
					<div className={styles.gutter}>
						<span>1</span>
						<span>2</span>
						<span>3</span>
						<span>4</span>
					</div>
					<pre className={styles.code}>
						<code>
							<span className={`${styles.line} ${styles.rbxLine1}`}>
								<span className={styles.cmt}>-- Server Script</span>
							</span>
							<span className={`${styles.line} ${styles.rbxLine2}`}>
								<span className={styles.kw}>local</span>
								{' part = script.Parent'}
							</span>
							<span className={`${styles.line} ${styles.rbxLine3}`}>
								{'part.BrickColor = '}
								<span className={styles.fn}>BrickColor</span>
								{'.new("Bright red")'}
							</span>
							<span className={`${styles.line} ${styles.rbxLine4}`}>
								<span className={styles.fn}>print</span>
								{'("Part ready")'}
								<span className={styles.caret} />
							</span>
						</code>
					</pre>
				</div>

				<div className={styles.toolbar}>
					<span className={styles.toolMuted}>Output</span>
					<span className={styles.run}>
						<span className={styles.runIcon}>▶</span>
						Play
					</span>
				</div>

				<div className={styles.output}>
					<span className={styles.outLabel}>Output</span>
					<div className={styles.outBody}>
						<span className={styles.outLine}>Part ready</span>
						<span className={styles.ok}>✓ Script ran</span>
					</div>
				</div>
			</div>
		</div>
	)
}

function AiSparkle({ className }) {
	return (
		<svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M8 1.2l1.1 3.6L12.8 6 9.1 7.2 8 10.8 6.9 7.2 3.2 6l3.7-1.2L8 1.2z"
				fill="currentColor"
			/>
			<path
				d="M12.6 9.4l.55 1.7 1.7.55-1.7.55-.55 1.7-.55-1.7-1.7-.55 1.7-.55.55-1.7z"
				fill="currentColor"
				opacity="0.7"
			/>
		</svg>
	)
}

export function DemoAi() {
	return (
		<div className={`${styles.scene} ${styles.ai}`} data-tone="violet" aria-hidden="true">
			<div className={styles.aiWindow}>
				<div className={styles.titlebar}>
					<span className={styles.traffic}>
						<i />
						<i />
						<i />
					</span>
					<span className={styles.winLabel}>
						<AiSparkle className={styles.aiMark} />
						ai · copilot
					</span>
				</div>

				<div className={styles.aiShell}>
					<div className={styles.brief}>
						<span className={styles.badge}>
							<AiSparkle className={styles.badgeSpark} />
							Ask AI
						</span>
						<div className={styles.prompt}>
							<span className={styles.type}>Write a weekly content plan</span>
							<span className={styles.caret} />
						</div>
						<span className={styles.generate}>
							<AiSparkle className={styles.genSpark} />
							Generate
						</span>
					</div>

					<div className={styles.result}>
						<div className={styles.aiStatus}>
							<span className={styles.statusThink}>Thinking…</span>
							<span className={styles.statusGen}>Generating…</span>
							<span className={styles.statusDone}>
								<AiSparkle className={styles.doneSpark} />
								Done
							</span>
							<div className={styles.ringWrap}>
								<svg className={styles.ringSvg} viewBox="0 0 40 40">
									<circle className={styles.ringBg} cx="20" cy="20" r="15" />
									<circle className={styles.ringFg} cx="20" cy="20" r="15" />
								</svg>
							</div>
						</div>
						<ul className={styles.stack}>
							<li>
								<span className={styles.cardTitle}>Outline</span>
								<span className={styles.cardHint}>Mon–Fri themes</span>
							</li>
							<li>
								<span className={styles.cardTitle}>Hooks</span>
								<span className={styles.cardHint}>5 scroll-stoppers</span>
							</li>
							<li>
								<span className={styles.cardTitle}>Schedule</span>
								<span className={styles.cardHint}>ready to post</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export const DEMO_SCENES = [
	{ id: 'python', label: 'Python', Component: DemoPython },
	{ id: 'roblox', label: 'Roblox', Component: DemoRoblox },
	{ id: 'ai', label: 'AI at Work', Component: DemoAi },
]
