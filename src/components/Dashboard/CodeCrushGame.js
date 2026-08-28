'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
	Crown,
	Flame,
	Gamepad2,
	Gift,
	RotateCcw,
	Sparkles,
	Timer,
	Trophy,
} from 'lucide-react'
import ArcadeLeaderboard from './ArcadeLeaderboard'
import {
	SIZE,
	ROUND_SECONDS,
	FREEZE_SECONDS,
	GEM_META,
	createBoardWithoutMatches,
	findMatches,
	pickSpecialSpawn,
	clearMatches,
	applyGravity,
	expandWithSpecials,
	swapCells,
	areAdjacent,
	cellType,
	cellSpecial,
	activateSpecial,
	mergeMarks,
	hasAnyMatch,
} from '@/lib/codeCrushLogic.mjs'
import styles from './CodeCrushGame.module.css'

/**
 * Match-3 “Code Crush” arcade — timed rounds, match specials + bomb/freeze drops.
 */
export default function CodeCrushGame({ bestScore = 0, onRoundEnd, embedded = false }) {
	const t = useTranslations('dashboard.student.arcade')
	const [activeTab, setActiveTab] = useState('game')
	const [board, setBoard] = useState(() => createBoardWithoutMatches())
	const [selected, setSelected] = useState(null)
	const [dragOver, setDragOver] = useState(null)
	const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
	const [freezeLeft, setFreezeLeft] = useState(0)
	const [score, setScore] = useState(0)
	const [busy, setBusy] = useState(false)
	const [popping, setPopping] = useState(null)
	const [toast, setToast] = useState(null)
	const [roundOver, setRoundOver] = useState(false)
	const [roundRankData, setRoundRankData] = useState(null)
	const [rankInfo, setRankInfo] = useState(null)
	const [refreshLeaderboardTrigger, setRefreshLeaderboardTrigger] = useState(0)
	const [lastXp, setLastXp] = useState(0)

	const endedRef = useRef(false)
	const dragRef = useRef(null)
	const boardRef = useRef(null)
	const busyRef = useRef(false)
	const boardStateRef = useRef(board)
	const timeLeftRef = useRef(timeLeft)
	const freezeLeftRef = useRef(freezeLeft)
	const scoreRef = useRef(score)
	const roundOverRef = useRef(roundOver)
	const toastTimerRef = useRef(null)

	const showToast = useCallback((message) => {
		if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
		setToast(message)
		toastTimerRef.current = window.setTimeout(() => setToast(null), 1600)
	}, [])

	useEffect(() => {
		let isMounted = true
		fetch('/api/arcade/leaderboard?locale=en')
			.then((res) => res.json())
			.then((data) => {
				if (isMounted && data?.currentUser) {
					setRankInfo(data.currentUser)
				}
			})
			.catch(() => {})
		return () => {
			isMounted = false
		}
	}, [refreshLeaderboardTrigger])

	useEffect(() => {
		busyRef.current = busy
	}, [busy])
	useEffect(() => {
		boardStateRef.current = board
	}, [board])
	useEffect(() => {
		timeLeftRef.current = timeLeft
	}, [timeLeft])
	useEffect(() => {
		freezeLeftRef.current = freezeLeft
	}, [freezeLeft])
	useEffect(() => {
		scoreRef.current = score
	}, [score])
	useEffect(() => {
		roundOverRef.current = roundOver
	}, [roundOver])

	useEffect(() => {
		return () => {
			if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current)
		}
	}, [])

	const finishRound = useCallback(
		(finalScore) => {
			if (endedRef.current) return
			endedRef.current = true
			setRoundOver(true)
			setFreezeLeft(0)
			const result = onRoundEnd?.(finalScore)
			const xp = result?.xpGained ?? 0
			setLastXp(xp)

			fetch('/api/arcade/score', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					score: finalScore,
					level: result?.progress?.level || 1,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.ok) {
						setRoundRankData(data)
						setRankInfo({
							rank: data.monthlyRank,
							score: data.bestScore,
							played: true,
						})
						setRefreshLeaderboardTrigger((c) => c + 1)
					}
				})
				.catch((err) => console.warn('Could not submit arcade score:', err))
		},
		[onRoundEnd]
	)

	const resetGame = useCallback(() => {
		setBoard(createBoardWithoutMatches())
		setSelected(null)
		setDragOver(null)
		dragRef.current = null
		setTimeLeft(ROUND_SECONDS)
		setFreezeLeft(0)
		setScore(0)
		setBusy(false)
		setPopping(null)
		setToast(null)
		setRoundOver(false)
		setRoundRankData(null)
		setLastXp(0)
		endedRef.current = false
	}, [])

	// Countdown — pauses while freeze is active or while on leaderboard tab
	useEffect(() => {
		if (roundOver || activeTab !== 'game') return
		const id = window.setInterval(() => {
			if (freezeLeftRef.current > 0) {
				setFreezeLeft((f) => Math.max(0, f - 1))
				return
			}
			setTimeLeft((prev) => {
				if (prev <= 1) {
					if (!endedRef.current) {
						window.setTimeout(() => finishRound(scoreRef.current), 0)
					}
					return 0
				}
				return prev - 1
			})
		}, 1000)
		return () => window.clearInterval(id)
	}, [roundOver, activeTab, finishRound])

	const applyFreeze = useCallback(() => {
		setFreezeLeft((f) => Math.max(f, FREEZE_SECONDS))
		showToast(t('toastFreeze'))
	}, [showToast, t])

	const trySwap = useCallback(
		async (a, b) => {
			if (busyRef.current || timeLeftRef.current <= 0 || roundOverRef.current) return
			if (!areAdjacent(a, b)) return

			const currentBoard = boardStateRef.current

			busyRef.current = true
			setBusy(true)
			setSelected(null)
			setDragOver(null)

			const swapped = swapCells(currentBoard, a, b)
			const aKind = cellSpecial(swapped[a.r][a.c])
			const bKind = cellSpecial(swapped[b.r][b.c])
			const aSpec = Boolean(aKind)
			const bSpec = Boolean(bKind)
			const naturalMatch = hasAnyMatch(swapped)
			if (!naturalMatch && !aSpec && !bSpec) {
				setBoard(swapped)
				await wait(160)
				setBoard(currentBoard)
				busyRef.current = false
				setBusy(false)
				return
			}

			let current = swapped
			setBoard(current)
			await wait(120)

			let totalGain = 0
			let firstPass = true

			for (let safety = 0; safety < 40; safety += 1) {
				let matched
				let count
				let spawn = null

				if (firstPass && (aSpec || bSpec)) {
					firstPass = false
					const { matched: natMatched, runs } = findMatches(current)
					let base = natMatched
					spawn = pickSpecialSpawn(runs)
					if (aSpec) {
						base = mergeMarks(base, activateSpecial(current, a.r, a.c)).matched
					}
					if (bSpec) {
						base = mergeMarks(base, activateSpecial(current, b.r, b.c)).matched
					}
					;({ matched, count } = expandWithSpecials(current, base))
					if (aKind === 'bomb' || bKind === 'bomb') showToast(t('toastBomb'))
					else if (aKind === 'freeze' || bKind === 'freeze') {
						/* toast via applyFreeze */
					} else showToast(t('toastSpecial'))
					if (aKind === 'freeze' || bKind === 'freeze') applyFreeze()
				} else {
					firstPass = false
					const found = findMatches(current)
					if (found.count === 0) break
					spawn = pickSpecialSpawn(found.runs)
					;({ matched, count } = expandWithSpecials(current, found.matched))
				}

				if (count === 0) break

				const cascade = safety + 1
				setPopping(matched)
				if (cascade === 2) showToast(t('toastCombo', { n: 2 }))
				if (cascade >= 3) showToast(t('toastCascade', { n: cascade }))
				if (spawn?.special === 'row' || spawn?.special === 'col') {
					showToast(t('toastLineClear'))
				}
				if (spawn?.special === 'color') showToast(t('toastNuke'))

				await wait(240)
				totalGain += count * 10 * cascade
				current = applyGravity(clearMatches(current, matched, spawn))
				setPopping(null)
				setBoard(current)
				await wait(140)
			}

			setScore((s) => s + totalGain)
			busyRef.current = false
			setBusy(false)
		},
		[applyFreeze, showToast, t]
	)

	const cellFromPoint = useCallback((clientX, clientY) => {
		const boardEl = boardRef.current
		if (!boardEl) return null
		const rect = boardEl.getBoundingClientRect()
		const style = window.getComputedStyle(boardEl)
		const padX = parseFloat(style.paddingLeft) || 0
		const padY = parseFloat(style.paddingTop) || 0
		const gap = parseFloat(style.columnGap || style.gap) || 0
		const innerW = rect.width - padX * 2
		const innerH = rect.height - padY * 2
		const cellW = (innerW - gap * (SIZE - 1)) / SIZE
		const cellH = (innerH - gap * (SIZE - 1)) / SIZE
		const x = clientX - rect.left - padX
		const y = clientY - rect.top - padY
		if (x < 0 || y < 0 || x > innerW || y > innerH) return null
		const c = Math.min(SIZE - 1, Math.max(0, Math.floor(x / (cellW + gap))))
		const r = Math.min(SIZE - 1, Math.max(0, Math.floor(y / (cellH + gap))))
		return { r, c }
	}, [])

	const endDrag = useCallback(() => {
		dragRef.current = null
		setSelected(null)
		setDragOver(null)
	}, [])

	const onPointerDown = useCallback((event, r, c) => {
		if (busyRef.current || timeLeftRef.current <= 0 || roundOverRef.current) return
		if (event.button != null && event.button !== 0) return
		event.preventDefault()
		event.currentTarget.setPointerCapture?.(event.pointerId)
		dragRef.current = {
			origin: { r, c },
			startX: event.clientX,
			startY: event.clientY,
			swapped: false,
			pointerId: event.pointerId,
		}
		setSelected({ r, c })
		setDragOver(null)
	}, [])

	const onPointerMove = useCallback(
		(event) => {
			const drag = dragRef.current
			if (!drag || drag.swapped) return
			if (busyRef.current) return

			const dx = event.clientX - drag.startX
			const dy = event.clientY - drag.startY
			const absX = Math.abs(dx)
			const absY = Math.abs(dy)
			const threshold = 18

			let neighbor = null
			if (absX >= threshold || absY >= threshold) {
				if (absX > absY) {
					neighbor = {
						r: drag.origin.r,
						c: drag.origin.c + (dx > 0 ? 1 : -1),
					}
				} else {
					neighbor = {
						r: drag.origin.r + (dy > 0 ? 1 : -1),
						c: drag.origin.c,
					}
				}
				if (
					neighbor.r < 0 ||
					neighbor.r >= SIZE ||
					neighbor.c < 0 ||
					neighbor.c >= SIZE
				) {
					neighbor = null
				}
			} else {
				const over = cellFromPoint(event.clientX, event.clientY)
				if (over && areAdjacent(drag.origin, over)) {
					setDragOver(over)
				} else {
					setDragOver(null)
				}
				return
			}

			if (neighbor && areAdjacent(drag.origin, neighbor)) {
				drag.swapped = true
				setDragOver(neighbor)
				trySwap(drag.origin, neighbor)
				endDrag()
			}
		},
		[cellFromPoint, endDrag, trySwap]
	)

	const onPointerUp = useCallback(
		(event) => {
			const drag = dragRef.current
			if (!drag) return
			if (drag.pointerId != null && event.pointerId !== drag.pointerId) return

			if (!drag.swapped) {
				const over = cellFromPoint(event.clientX, event.clientY)
				if (over && areAdjacent(drag.origin, over)) {
					trySwap(drag.origin, over)
				}
			}
			endDrag()
		},
		[cellFromPoint, endDrag, trySwap]
	)

	const hint = useMemo(() => {
		if (roundOver) return t('roundOver')
		if (freezeLeft > 0) return t('hintFrozen', { sec: freezeLeft })
		if (selected) return t('hintSwap')
		return t('hintPick')
	}, [roundOver, freezeLeft, selected, t])

	const displayBest = Math.max(bestScore, score, rankInfo?.score || 0)
	const timerUrgent = timeLeft <= 10 && freezeLeft === 0

	return (
		<section
			className={[
				styles.panel,
				embedded ? styles.panelEmbedded : null,
			]
				.filter(Boolean)
				.join(' ')}
			data-leaderboard={activeTab === 'leaderboard' ? 'true' : undefined}
			aria-labelledby="code-crush-title"
		>
			<header className={styles.head}>
				<div>
					<div className={styles.headEyebrowRow}>
						<p className={styles.eyebrow}>{t('eyebrow')}</p>
						{rankInfo?.played && rankInfo?.rank ? (
							<button
								type="button"
								className={styles.headerRankBadge}
								onClick={() => setActiveTab('leaderboard')}
								title={t('viewLeaderboard')}
							>
								<Trophy size={12} className={styles.headerTrophyIcon} />
								{t('rankBadge', { rank: rankInfo.rank })}
							</button>
						) : (
							<button
								type="button"
								className={styles.headerPrizesBadge}
								onClick={() => setActiveTab('leaderboard')}
							>
								<Gift size={12} />
								{t('tabLeaderboard')}
							</button>
						)}
					</div>
					<h2 id="code-crush-title" className={styles.title}>
						{t('title')}
					</h2>
				</div>

				<div className={styles.headActions}>
					<div className={styles.tabSwitcher} role="tablist">
						<button
							type="button"
							role="tab"
							aria-selected={activeTab === 'game'}
							className={[
								styles.tabBtn,
								activeTab === 'game' ? styles.tabBtnActive : null,
							]
								.filter(Boolean)
								.join(' ')}
							onClick={() => setActiveTab('game')}
						>
							<Gamepad2 size={15} aria-hidden />
							{t('tabGame')}
						</button>
						<button
							type="button"
							role="tab"
							aria-selected={activeTab === 'leaderboard'}
							className={[
								styles.tabBtn,
								activeTab === 'leaderboard' ? styles.tabBtnActive : null,
							]
								.filter(Boolean)
								.join(' ')}
							onClick={() => setActiveTab('leaderboard')}
						>
							<Trophy size={15} aria-hidden />
							{t('tabLeaderboard')}
						</button>
					</div>

					{activeTab === 'game' ? (
						<button type="button" className={styles.newBtn} onClick={resetGame}>
							<RotateCcw size={15} aria-hidden />
							{t('newGame')}
						</button>
					) : null}
				</div>
			</header>

			{activeTab === 'leaderboard' ? (
				<ArcadeLeaderboard
					onPlayClick={() => setActiveTab('game')}
					refreshTrigger={refreshLeaderboardTrigger}
				/>
			) : (
				<div
					className={[
						styles.gameContent,
						freezeLeft > 0 ? styles.gameFrozen : null,
					]
						.filter(Boolean)
						.join(' ')}
				>
					<div className={styles.hud} aria-live="polite">
						<div className={styles.hudItem}>
							<span className={styles.hudLabel}>{t('score')}</span>
							<strong className={styles.hudValue}>{score}</strong>
						</div>
						<div
							className={[
								styles.hudItem,
								timerUrgent ? styles.hudTimerUrgent : null,
								freezeLeft > 0 ? styles.hudTimerFrozen : null,
							]
								.filter(Boolean)
								.join(' ')}
						>
							<span className={styles.hudLabel}>
								<Timer size={12} aria-hidden /> {t('time')}
							</span>
							<strong className={styles.hudValue}>
								{freezeLeft > 0
									? t('timeFrozen', { sec: freezeLeft })
									: `${timeLeft}s`}
							</strong>
						</div>
						<div className={styles.hudItem}>
							<span className={styles.hudLabel}>
								<Trophy size={12} aria-hidden /> {t('best')}
							</span>
							<strong className={styles.hudValue}>{displayBest}</strong>
						</div>
						<button
							type="button"
							className={[styles.hudItem, styles.hudRankItem].join(' ')}
							onClick={() => setActiveTab('leaderboard')}
							title={t('viewLeaderboard')}
						>
							<span className={styles.hudLabel}>
								<Crown size={12} aria-hidden /> {t('tableRank')}
							</span>
							<strong className={styles.hudValueRank}>
								{rankInfo?.played && rankInfo?.rank
									? `#${rankInfo.rank}`
									: t('unrankedBadge')}
							</strong>
						</button>
					</div>

					<p className={styles.hint}>{hint}</p>

					<div className={styles.boardShell}>
					<div
						ref={boardRef}
						className={[styles.board, selected ? styles.boardDragging : null]
							.filter(Boolean)
							.join(' ')}
						role="grid"
						aria-label={t('boardLabel')}
						style={{ '--crush-size': SIZE }}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onPointerCancel={endDrag}
					>
						{board.map((row, r) =>
							row.map((cell, c) => {
								const type = cellType(cell)
								const special = cellSpecial(cell)
								const isSelected = selected?.r === r && selected?.c === c
								const isOver = dragOver?.r === r && dragOver?.c === c
								const isPop = popping?.[r]?.[c]
								const meta = GEM_META[type] || GEM_META[0]
								return (
									<button
										key={`${r}-${c}`}
										type="button"
										role="gridcell"
										className={[
											styles.cell,
											styles[`gem${type}`],
											special ? styles[`special${special}`] : null,
											isSelected ? styles.cellSelected : null,
											isOver ? styles.cellDragOver : null,
											isPop ? styles.cellPop : null,
										]
											.filter(Boolean)
											.join(' ')}
										aria-label={t('cellLabel', {
											gem: special || meta.short,
											row: r + 1,
											col: c + 1,
										})}
										disabled={busy || roundOver || timeLeft <= 0}
										onPointerDown={(event) => onPointerDown(event, r, c)}
										onPointerMove={onPointerMove}
										onPointerUp={onPointerUp}
										onPointerCancel={endDrag}
									>
										<span className={styles.orb} aria-hidden />
									</button>
								)
							})
						)}
					</div>
					</div>

					{toast ? (
						<p className={styles.toast} role="status">
							<Sparkles size={14} aria-hidden />
							{toast}
						</p>
					) : null}

					{roundOver ? (
						<div className={styles.overlay}>
							<p className={styles.overlayTitle}>{t('roundOverTitle')}</p>
							<p className={styles.overlayScore}>{t('finalScore', { score })}</p>
							{lastXp > 0 ? (
								<p className={styles.overlayXp}>{t('xpEarned', { xp: lastXp })}</p>
							) : null}

							{roundRankData?.monthlyRank ? (
								<div className={styles.overlayRankBox}>
									<span className={styles.overlayRankPill}>
										<Trophy size={14} />
										{t('yourNewRank', { rank: roundRankData.monthlyRank })}
									</span>
									{roundRankData.score === roundRankData.bestScore ? (
										<p className={styles.overlayNewBest}>{t('newMonthlyBest')}</p>
									) : null}
								</div>
							) : (
								<p className={styles.overlaySyncing}>{t('syncingRank')}</p>
							)}

							<div className={styles.overlayButtons}>
								<button
									type="button"
									className={styles.playAgain}
									onClick={resetGame}
								>
									<Flame size={16} aria-hidden />
									{t('playAgain')}
								</button>
								<button
									type="button"
									className={styles.overlayLeaderboardBtn}
									onClick={() => {
										setActiveTab('leaderboard')
									}}
								>
									<Trophy size={15} aria-hidden />
									{t('viewLeaderboard')}
								</button>
							</div>
						</div>
					) : null}
				</div>
			)}
		</section>
	)
}

function wait(ms) {
	return new Promise((resolve) => {
		window.setTimeout(resolve, ms)
	})
}
