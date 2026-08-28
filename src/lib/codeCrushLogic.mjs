/**
 * Pure Code Crush match-3 logic (no DOM).
 *
 * Cell shape: { type: 0..GEM_COUNT-1, special: null | 'row' | 'col' | 'color' | 'bomb' | 'freeze' }
 *
 * Match-4 → line crystal (row if horizontal run, col if vertical).
 * Match-5+ → color nuke (clears all of that type when activated).
 * Gravity fills may drop bomb / freeze power-ups.
 */

export const SIZE = 8
export const ROUND_SECONDS = 60
export const FREEZE_SECONDS = 5
export const GEM_COUNT = 6

/** @deprecated use ROUND_SECONDS — kept for any leftover imports */
export const MOVES = 20

export const GEM_META = [
	{ id: 'brace', label: '{ }', short: 'brace' },
	{ id: 'fn', label: 'fn', short: 'fn' },
	{ id: 'tag', label: '</>', short: 'tag' },
	{ id: 'hex', label: '0x', short: 'hex' },
	{ id: 'ai', label: 'AI', short: 'ai' },
	{ id: 'gem', label: '◆', short: 'gem' },
]

export const DROP_SPECIALS = ['bomb', 'freeze']

export function makeCell(type, special = null) {
	return { type: type | 0, special: special || null }
}

export function cellType(cell) {
	if (cell == null) return -1
	if (typeof cell === 'number') return cell
	return cell.type
}

export function cellSpecial(cell) {
	if (cell == null || typeof cell === 'number') return null
	return cell.special || null
}

export function isDropSpecial(special) {
	return special === 'bomb' || special === 'freeze'
}

export function randomGem() {
	return makeCell(Math.floor(Math.random() * GEM_COUNT))
}

/** Fill gems after gravity — small chance of bomb / freeze. */
export function randomFillGem() {
	const roll = Math.random()
	if (roll < 0.04) {
		return makeCell(Math.floor(Math.random() * GEM_COUNT), 'bomb')
	}
	if (roll < 0.075) {
		return makeCell(Math.floor(Math.random() * GEM_COUNT), 'freeze')
	}
	return randomGem()
}

export function emptyBoard() {
	return Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => makeCell(0))
	)
}

export function cloneBoard(board) {
	return board.map((row) => row.map((cell) => ({ ...cell })))
}

function sameType(a, b) {
	const sa = cellSpecial(a)
	const sb = cellSpecial(b)
	// Drop power-ups never form color matches
	if (isDropSpecial(sa) || isDropSpecial(sb)) return false
	const ta = cellType(a)
	const tb = cellType(b)
	return ta >= 0 && tb >= 0 && ta === tb
}

/**
 * Find line matches. Also returns run info for special creation.
 * @returns {{ matched: boolean[][], count: number, runs: Array<{r,c,len,dir:'h'|'v',type:number}> }}
 */
export function findMatches(board) {
	const matched = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => false)
	)
	/** @type {Array<{r:number,c:number,len:number,dir:'h'|'v',type:number}>} */
	const runs = []
	let count = 0

	for (let r = 0; r < SIZE; r += 1) {
		let run = 1
		for (let c = 1; c <= SIZE; c += 1) {
			if (c < SIZE && sameType(board[r][c], board[r][c - 1])) {
				run += 1
			} else {
				if (run >= 3) {
					const type = cellType(board[r][c - 1])
					runs.push({ r, c: c - run, len: run, dir: 'h', type })
					for (let k = 0; k < run; k += 1) {
						if (!matched[r][c - 1 - k]) count += 1
						matched[r][c - 1 - k] = true
					}
				}
				run = 1
			}
		}
	}

	for (let c = 0; c < SIZE; c += 1) {
		let run = 1
		for (let r = 1; r <= SIZE; r += 1) {
			if (r < SIZE && sameType(board[r][c], board[r - 1][c])) {
				run += 1
			} else {
				if (run >= 3) {
					const type = cellType(board[r - 1][c])
					runs.push({ r: r - run, c, len: run, dir: 'v', type })
					for (let k = 0; k < run; k += 1) {
						if (!matched[r - 1 - k][c]) count += 1
						matched[r - 1 - k][c] = true
					}
				}
				run = 1
			}
		}
	}

	return { matched, count, runs }
}

/**
 * Pick where a special should spawn: center of longest run ≥4.
 */
export function pickSpecialSpawn(runs) {
	const eligible = runs.filter((run) => run.len >= 4)
	if (!eligible.length) return null
	eligible.sort((a, b) => b.len - a.len)
	const best = eligible[0]
	const mid = Math.floor(best.len / 2)
	const special = best.len >= 5 ? 'color' : best.dir === 'h' ? 'row' : 'col'
	if (best.dir === 'h') {
		return { r: best.r, c: best.c + mid, type: best.type, special }
	}
	return { r: best.r + mid, c: best.c, type: best.type, special }
}

/**
 * Clear matched cells; optionally leave a special at spawn.
 */
export function clearMatches(board, matched, spawn = null) {
	const next = cloneBoard(board)
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			if (matched[r][c]) next[r][c] = null
		}
	}
	if (spawn) {
		next[spawn.r][spawn.c] = makeCell(spawn.type, spawn.special)
	}
	return next
}

/**
 * Activate a special at (r,c): marks cells to clear (including the special itself).
 */
export function activateSpecial(board, r, c) {
	const cell = board[r]?.[c]
	const special = cellSpecial(cell)
	const type = cellType(cell)
	const mark = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => false)
	)
	if (!special) {
		mark[r][c] = true
		return mark
	}

	mark[r][c] = true
	if (special === 'row') {
		for (let cc = 0; cc < SIZE; cc += 1) mark[r][cc] = true
	} else if (special === 'col') {
		for (let rr = 0; rr < SIZE; rr += 1) mark[rr][c] = true
	} else if (special === 'color' && type >= 0) {
		for (let rr = 0; rr < SIZE; rr += 1) {
			for (let cc = 0; cc < SIZE; cc += 1) {
				if (
					cellType(board[rr][cc]) === type &&
					!isDropSpecial(cellSpecial(board[rr][cc]))
				) {
					mark[rr][cc] = true
				}
			}
		}
	} else if (special === 'bomb') {
		for (let rr = r - 1; rr <= r + 1; rr += 1) {
			for (let cc = c - 1; cc <= c + 1; cc += 1) {
				if (rr >= 0 && rr < SIZE && cc >= 0 && cc < SIZE) mark[rr][cc] = true
			}
		}
	} else if (special === 'freeze') {
		for (let cc = 0; cc < SIZE; cc += 1) mark[r][cc] = true
		for (let rr = 0; rr < SIZE; rr += 1) mark[rr][c] = true
	}
	return mark
}

export function mergeMarks(a, b) {
	const out = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => false)
	)
	let count = 0
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			out[r][c] = Boolean(a?.[r]?.[c] || b?.[r]?.[c])
			if (out[r][c]) count += 1
		}
	}
	return { matched: out, count }
}

/**
 * Expand clear to include special blasts; chain specials caught in a blast.
 */
export function expandWithSpecials(board, baseMatched) {
	let matched = baseMatched.map((row) => row.slice())
	const queue = []
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			if (matched[r][c] && cellSpecial(board[r][c])) queue.push({ r, c })
		}
	}
	const seen = new Set(queue.map(({ r, c }) => `${r},${c}`))
	while (queue.length) {
		const { r, c } = queue.shift()
		const blast = activateSpecial(board, r, c)
		for (let rr = 0; rr < SIZE; rr += 1) {
			for (let cc = 0; cc < SIZE; cc += 1) {
				if (!blast[rr][cc]) continue
				matched[rr][cc] = true
				const key = `${rr},${cc}`
				if (!seen.has(key) && cellSpecial(board[rr][cc])) {
					seen.add(key)
					queue.push({ r: rr, c: cc })
				}
			}
		}
	}
	let count = 0
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			if (matched[r][c]) count += 1
		}
	}
	return { matched, count }
}

export function applyGravity(board) {
	const next = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => null)
	)
	for (let c = 0; c < SIZE; c += 1) {
		const stack = []
		for (let r = SIZE - 1; r >= 0; r -= 1) {
			if (board[r][c] != null) stack.push(board[r][c])
		}
		let write = SIZE - 1
		for (const gem of stack) {
			next[write][c] = { ...gem }
			write -= 1
		}
		while (write >= 0) {
			next[write][c] = randomFillGem()
			write -= 1
		}
	}
	return next
}

export function hasAnyMatch(board) {
	return findMatches(board).count > 0
}

export function createBoardWithoutMatches() {
	const board = emptyBoard()
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			let gem
			do {
				gem = randomGem()
			} while (
				(c >= 2 &&
					sameType(board[r][c - 1], gem) &&
					sameType(board[r][c - 2], gem)) ||
				(r >= 2 &&
					sameType(board[r - 1][c], gem) &&
					sameType(board[r - 2][c], gem))
			)
			board[r][c] = gem
		}
	}
	return board
}

export function areAdjacent(a, b) {
	if (!a || !b) return false
	return Math.abs(a.r - b.r) + Math.abs(a.c - b.c) === 1
}

export function swapCells(board, a, b) {
	const next = cloneBoard(board)
	const tmp = next[a.r][a.c]
	next[a.r][a.c] = next[b.r][b.c]
	next[b.r][b.c] = tmp
	return next
}

export function resolveBoardAfterSwap(startBoard) {
	let current = cloneBoard(startBoard)
	let totalGain = 0
	let comboMax = 0
	const events = []

	for (let safety = 0; safety < 40; safety += 1) {
		const { matched: baseMatched, count: baseCount, runs } = findMatches(current)
		if (baseCount === 0) break

		const { matched, count } = expandWithSpecials(current, baseMatched)
		const spawn = pickSpecialSpawn(runs)
		let spawnSafe = spawn
		if (spawn && !matched[spawn.r][spawn.c]) spawnSafe = null

		const cascade = safety + 1
		comboMax = Math.max(comboMax, cascade)
		totalGain += count * 10 * cascade

		if (cascade === 2) events.push('combo2')
		if (cascade >= 3) events.push(`cascade${Math.min(cascade, 5)}`)
		if (spawnSafe?.special === 'row' || spawnSafe?.special === 'col') {
			events.push('madeLine')
		}
		if (spawnSafe?.special === 'color') events.push('madeNuke')

		current = applyGravity(clearMatches(current, matched, spawnSafe))
	}

	return { board: current, scoreGain: totalGain, comboMax, events }
}

export function wouldSucceedSwap(board, a, b) {
	const swapped = swapCells(board, a, b)
	if (cellSpecial(swapped[a.r][a.c]) || cellSpecial(swapped[b.r][b.c])) {
		return true
	}
	return hasAnyMatch(swapped)
}

export function resolveSwap(board, a, b) {
	const swapped = swapCells(board, a, b)
	const aSpec = cellSpecial(swapped[a.r][a.c])
	const bSpec = cellSpecial(swapped[b.r][b.c])

	if (!hasAnyMatch(swapped) && (aSpec || bSpec)) {
		let matched = Array.from({ length: SIZE }, () =>
			Array.from({ length: SIZE }, () => false)
		)
		if (aSpec) {
			matched = mergeMarks(matched, activateSpecial(swapped, a.r, a.c)).matched
		}
		if (bSpec) {
			matched = mergeMarks(matched, activateSpecial(swapped, b.r, b.c)).matched
		}
		const expanded = expandWithSpecials(swapped, matched)
		let current = applyGravity(clearMatches(swapped, expanded.matched, null))
		let totalGain = expanded.count * 10
		const rest = resolveBoardAfterSwap(current)
		const events = ['specialBlast', ...rest.events]
		if (aSpec === 'freeze' || bSpec === 'freeze') events.push('froze')
		if (aSpec === 'bomb' || bSpec === 'bomb') events.push('bombed')
		return {
			board: rest.board,
			scoreGain: totalGain + rest.scoreGain,
			comboMax: Math.max(1, rest.comboMax),
			events,
			immediateBoard: swapped,
			firstClear: expanded.matched,
		}
	}

	if (!hasAnyMatch(swapped)) {
		return null
	}

	const { matched: baseMatched, runs } = findMatches(swapped)
	let matched = baseMatched
	if (aSpec || bSpec) {
		matched = expandWithSpecials(swapped, baseMatched).matched
		if (aSpec) {
			matched = mergeMarks(matched, activateSpecial(swapped, a.r, a.c)).matched
		}
		if (bSpec) {
			matched = mergeMarks(matched, activateSpecial(swapped, b.r, b.c)).matched
		}
		matched = expandWithSpecials(swapped, matched).matched
	} else {
		matched = expandWithSpecials(swapped, baseMatched).matched
	}

	const spawn = pickSpecialSpawn(runs)
	let count = 0
	for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE; c += 1) {
			if (matched[r][c]) count += 1
		}
	}

	const afterFirst = applyGravity(clearMatches(swapped, matched, spawn))
	const rest = resolveBoardAfterSwap(afterFirst)
	const events = []
	if (spawn?.special === 'row' || spawn?.special === 'col') events.push('madeLine')
	if (spawn?.special === 'color') events.push('madeNuke')
	if (aSpec === 'freeze' || bSpec === 'freeze') events.push('froze')
	if (aSpec === 'bomb' || bSpec === 'bomb') events.push('bombed')

	return {
		board: rest.board,
		scoreGain: count * 10 + rest.scoreGain,
		comboMax: Math.max(1, rest.comboMax),
		events: [...events, ...rest.events],
		immediateBoard: swapped,
		firstClear: matched,
		firstSpawn: spawn,
	}
}
