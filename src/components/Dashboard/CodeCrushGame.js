'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
	Crown,
	Flame,
	Gamepad2,
	Gift,
	Medal,
	RotateCcw,
	Sparkles,
	Trophy,
} from 'lucide-react'
import ArcadeLeaderboard from './ArcadeLeaderboard'
import styles from './CodeCrushGame.module.css'

const SIZE = 8
const MOVES = 20
const GEM_COUNT = 6
const GEM_LABELS = ['bit', 'byte', 'chip', 'node', 'spark', 'loop']

function randomGem() {
	return Math.floor(Math.random() * GEM_COUNT)
}

function emptyBoard() {
	return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => 0))
}

function cloneBoard(board) {
	return board.map((row) => row.slice())
}

function findMatches(board) {
	const matched = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => false)
	)
	let count = 0

	for (let r = 0; r < SIZE; r += 1) {
		let run = 1
		for (let c = 1; c <= SIZE; c += 1) {
			if (c < SIZE && board[r][c] === board[r][c - 1]) {
				run += 1
			} else {
				if (run >= 3) {
					for (let k = 0; k < run; k += 1) {
						matched[r][c - 1 - k] = true
						count += 1
					}
				}
				run = 1
			}
		}
	}

	for (let c = 0; c < SIZE; c += 1) {
		let run = 1
		for (let r = 1; r <= SIZE; r += 1) {
			if (r < SIZE && board[r][c] === board[r - 1][c]) {
				run += 1
			} else {
				if (run >= 3) {
					for (let k = 0; k < run; k += 1) {
						if (!matched[r - 1 - k][c]) count += 1
						matched[r - 1 - k][c] = true
					}
				}
				run = 1
			}
		}
	}

	return { matched, count }
}

function clearMatches(board, matched) {
	const next = cloneBoard(board)
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			if (matched[r][c]) next[r][c] = -1
		}
	}
	return next
}

function applyGravity(board) {
	const next = emptyBoard()
	for (let c = 0; c < SIZE; c += 1) {
		const stack = []
		for (let r = SIZE - 1; r >= 0; r -= 1) {
			if (board[r][c] >= 0) stack.push(board[r][c])
		}
		let write = SIZE - 1
		for (const gem of stack) {
			next[write][c] = gem
			write -= 1
		}
		while (write >= 0) {
			next[write][c] = randomGem()
			write -= 1
		}
	}
	return next
}

function hasAnyMatch(board) {
	return findMatches(board).count > 0
}

function createBoardWithoutMatches() {
	let board = emptyBoard()
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			let gem
			do {
				gem = randomGem()
			} while (
				(c >= 2 && board[r][c - 1] === gem && board[r][c - 2] === gem) ||
				(r >= 2 && board[r - 1][c] === gem && board[r - 2][c] === gem)
			)
			board[r][c] = gem
		}
	}
	return board
}

function areAdjacent(a, b) {
	if (!a || !b) return false
	return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1
}

function swapCells(board, a, b) {
	const next = cloneBoard(board)
	const tmp = next[a.r][a.c]
	next[a.r][a.c] = next[b.r][b.c]
	next[b.r][b.c] = tmp
	return next
}

/**
 * Match-3 “Code Crush” arcade for the student dashboard.
 * Includes Monthly Tournament Leaderboard, Monthly Prizes, and Rank Tracking.
 */
export default function CodeCrushGame({ bestScore = 0, onRoundEnd }) {
	const t = useTranslations('dashboard.student.arcade')
	const [activeTab, setActiveTab] = useState('game') // 'game' | 'leaderboard'
	const [board, setBoard] = useState(() => createBoardWithoutMatches())
	const [selected, setSelected] = useState(null)
	const [dragOver, setDragOver] = useState(null)
	const [moves, setMoves] = useState(MOVES)
	const [score, setScore] = useState(0)
	const [busy, setBusy] = useState(false)
	const [popping, setPopping] = useState(null)
	const [toast, setToast] = useState(null)
	const [roundOver, setRoundOver] = useState(false)
	const [roundRankData, setRoundRankData] = useState(null)
	const [rankInfo, setRankInfo] = useState(null)
	const [refreshLeaderboardTrigger, setRefreshLeaderboardTrigger] = useState(0)

	const endedRef = useRef(false)
	const dragRef = useRef(null)
	const boardRef = useRef(null)
	const busyRef = useRef(false)
	const boardStateRef = useRef(board)
	const movesRef = useRef(moves)
	const roundOverRef = useRef(roundOver)

	// Fetch initial rank
	useEffect(() => {
		let isMounted = true
		fetch('/api/arcade/leaderboard')
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
		movesRef.current = moves
	}, [moves])
	useEffect(() => {
		roundOverRef.current = roundOver
	}, [roundOver])

	const resetGame = useCallback(() => {
		setBoard(createBoardWithoutMatches())
		setSelected(null)
		setDragOver(null)
		dragRef.current = null
		setMoves(MOVES)
		setScore(0)
		setBusy(false)
		setPopping(null)
		setToast(null)
		setRoundOver(false)
		setRoundRankData(null)
		endedRef.current = false
	}, [])

	const finishRound = useCallback(
		(finalScore) => {
			if (endedRef.current) return
			endedRef.current = true
			setRoundOver(true)
			const result = onRoundEnd?.(finalScore)
			const xp = result?.xpGained ?? 0
			setToast(t('xpEarned', { xp }))

			// Sync score with backend monthly tournament
			fetch('/api/arcade/score', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ score: finalScore }),
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
		[onRoundEnd, t]
	)

	useEffect(() => {
		if (moves <= 0 && !busy && !endedRef.current) {
			finishRound(score)
		}
	}, [moves, busy, score, finishRound])

	const trySwap = useCallback(async (a, b) => {
		if (busyRef.current || movesRef.current <= 0 || roundOverRef.current) return
		if (!areAdjacent(a, b)) return

		const currentBoard = boardStateRef.current
		busyRef.current = true
		setBusy(true)
		setSelected(null)
		setDragOver(null)

		const swapped = swapCells(currentBoard, a, b)
		if (!hasAnyMatch(swapped)) {
			setBoard(swapped)
			await wait(160)
			setBoard(currentBoard)
			busyRef.current = false
			setBusy(false)
			return
		}

		setMoves((m) => m - 1)
		let current = swapped
		setBoard(current)
		await wait(120)

		let totalGain = 0
		for (let safety = 0; safety < 40; safety += 1) {
			const { matched, count } = findMatches(current)
			if (count === 0) break
			setPopping(matched)
			await wait(220)
			totalGain += count * 10 * (safety + 1)
			current = applyGravity(clearMatches(current, matched))
			setPopping(null)
			setBoard(current)
			await wait(140)
		}

		setScore((s) => s + totalGain)
		busyRef.current = false
		setBusy(false)
	}, [])

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

	const onPointerDown = useCallback(
		(event, r, c) => {
			if (busyRef.current || movesRef.current <= 0 || roundOverRef.current) return
			if (event.button != null && event.button !== 0) return
			event.preventDefault()
			const target = event.currentTarget
			target.setPointerCapture?.(event.pointerId)
			dragRef.current = {
				origin: { r, c },
				startX: event.clientX,
				startY: event.clientY,
				swapped: false,
				pointerId: event.pointerId,
			}
			setSelected({ r, c })
			setDragOver(null)
		},
		[]
	)

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
		if (selected) return t('hintSwap')
		return t('hintPick')
	}, [roundOver, selected, t])

	const displayBest = Math.max(bestScore, score, rankInfo?.score || 0)

	return (
		<section className={styles.panel} aria-labelledby="code-crush-title">
			{/* Header with Title and Segmented Tabs */}
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
					<p className={styles.lede}>{t('lede')}</p>
				</div>

				<div className={styles.headActions}>
					{/* Tab switcher */}
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

			{/* Main Content Area */}
			{activeTab === 'leaderboard' ? (
				<ArcadeLeaderboard
					onPlayClick={() => setActiveTab('game')}
					refreshTrigger={refreshLeaderboardTrigger}
				/>
			) : (
				<div className={styles.gameContent}>
					<div className={styles.hud} aria-live="polite">
						<div className={styles.hudItem}>
							<span className={styles.hudLabel}>{t('score')}</span>
							<strong className={styles.hudValue}>{score}</strong>
						</div>
						<div className={styles.hudItem}>
							<span className={styles.hudLabel}>{t('moves')}</span>
							<strong className={styles.hudValue}>{moves}</strong>
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
							row.map((gem, c) => {
								const isSelected = selected?.r === r && selected?.c === c
								const isOver = dragOver?.r === r && dragOver?.c === c
								const isPop = popping?.[r]?.[c]
								return (
									<button
										key={`${r}-${c}`}
										type="button"
										role="gridcell"
										className={[
											styles.cell,
											styles[`gem${gem}`],
											isSelected ? styles.cellSelected : null,
											isOver ? styles.cellDragOver : null,
											isPop ? styles.cellPop : null,
										]
											.filter(Boolean)
											.join(' ')}
										aria-label={t('cellLabel', {
											gem: GEM_LABELS[gem] || 'orb',
											row: r + 1,
											col: c + 1,
										})}
										disabled={busy || roundOver || moves <= 0}
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

							{roundRankData?.monthlyRank ? (
								<div className={styles.overlayRankBox}>
									<span className={styles.overlayRankPill}>
										<Trophy size={14} />
										{t('yourNewRank', { rank: roundRankData.monthlyRank })}
									</span>
									{roundRankData.score >= roundRankData.bestScore ? (
										<p className={styles.overlayNewBest}>{t('newMonthlyBest')}</p>
									) : null}
								</div>
							) : null}

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
										resetGame()
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
