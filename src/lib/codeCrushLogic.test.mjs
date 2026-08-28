/**
 * Code Crush board logic tests.
 *
 * Run: node --test src/lib/codeCrushLogic.test.mjs
 *
 * Without these, a match-4 might fail to spawn a line crystal, or a color nuke
 * could clear the wrong type — students would think the "interesting" game is broken.
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import {
	SIZE,
	makeCell,
	createBoardWithoutMatches,
	findMatches,
	pickSpecialSpawn,
	clearMatches,
	applyGravity,
	hasAnyMatch,
	swapCells,
	resolveSwap,
	activateSpecial,
	cellType,
	cellSpecial,
} from './codeCrushLogic.mjs'

test('createBoardWithoutMatches has no opening matches', () => {
	for (let i = 0; i < 20; i += 1) {
		const board = createBoardWithoutMatches()
		assert.equal(hasAnyMatch(board), false)
	}
})

test('findMatches detects a horizontal three', () => {
	const board = createBoardWithoutMatches()
	const t = cellType(board[0][0])
	board[0][0] = makeCell(t)
	board[0][1] = makeCell(t)
	board[0][2] = makeCell(t)
	const { count, runs } = findMatches(board)
	assert.ok(count >= 3)
	assert.ok(runs.some((r) => r.dir === 'h' && r.len >= 3))
})

test('pickSpecialSpawn: match-4 → row/col, match-5 → color', () => {
	const row4 = pickSpecialSpawn([{ r: 2, c: 1, len: 4, dir: 'h', type: 3 }])
	assert.equal(row4.special, 'row')
	assert.equal(row4.type, 3)

	const col4 = pickSpecialSpawn([{ r: 1, c: 5, len: 4, dir: 'v', type: 1 }])
	assert.equal(col4.special, 'col')

	const five = pickSpecialSpawn([{ r: 0, c: 0, len: 5, dir: 'h', type: 2 }])
	assert.equal(five.special, 'color')
})

test('clearMatches leaves special at spawn', () => {
	const board = createBoardWithoutMatches()
	const matched = Array.from({ length: SIZE }, () =>
		Array.from({ length: SIZE }, () => false)
	)
	matched[3][3] = true
	matched[3][4] = true
	matched[3][5] = true
	matched[3][6] = true
	const spawn = { r: 3, c: 4, type: 0, special: 'row' }
	const next = clearMatches(board, matched, spawn)
	assert.equal(cellSpecial(next[3][4]), 'row')
	assert.equal(cellType(next[3][4]), 0)
	assert.equal(next[3][3], null)
})

test('activateSpecial row clears the whole row', () => {
	const board = createBoardWithoutMatches()
	board[4][2] = makeCell(1, 'row')
	const mark = activateSpecial(board, 4, 2)
	for (let c = 0; c < SIZE; c += 1) {
		assert.equal(mark[4][c], true)
	}
})

test('activateSpecial color clears matching types', () => {
	const board = createBoardWithoutMatches()
	board[1][1] = makeCell(2, 'color')
	board[5][5] = makeCell(2)
	board[6][0] = makeCell(3)
	const mark = activateSpecial(board, 1, 1)
	assert.equal(mark[5][5], true)
	assert.equal(mark[6][0], false)
})

test('activateSpecial bomb clears a 3x3 neighborhood', () => {
	const board = createBoardWithoutMatches()
	board[3][3] = makeCell(0, 'bomb')
	const mark = activateSpecial(board, 3, 3)
	assert.equal(mark[2][2], true)
	assert.equal(mark[3][3], true)
	assert.equal(mark[4][4], true)
	assert.equal(mark[1][3], false)
})

test('activateSpecial freeze clears a cross', () => {
	const board = createBoardWithoutMatches()
	board[2][5] = makeCell(1, 'freeze')
	const mark = activateSpecial(board, 2, 5)
	for (let c = 0; c < SIZE; c += 1) assert.equal(mark[2][c], true)
	for (let r = 0; r < SIZE; r += 1) assert.equal(mark[r][5], true)
})

test('drop specials do not form color matches', () => {
	const board = createBoardWithoutMatches()
	board[0][0] = makeCell(0, 'bomb')
	board[0][1] = makeCell(0)
	board[0][2] = makeCell(0)
	const { count } = findMatches(board)
	assert.equal(count, 0)
})

test('applyGravity fills nulls from the top', () => {
	const board = createBoardWithoutMatches()
	board[7][0] = null
	board[6][0] = null
	const next = applyGravity(board)
	for (let r = 0; r < SIZE; r += 1) {
		assert.ok(next[r][0] != null)
		assert.ok(typeof cellType(next[r][0]) === 'number')
	}
})

test('resolveSwap returns null for non-matching adjacent swap', () => {
	const board = createBoardWithoutMatches()
	// Find two adjacent cells of different types that won't form a match
	let found = null
	outer: for (let r = 0; r < SIZE; r += 1) {
		for (let c = 0; c < SIZE - 1; c += 1) {
			const a = { r, c }
			const b = { r, c: c + 1 }
			const swapped = swapCells(board, a, b)
			if (!hasAnyMatch(swapped) && !cellSpecial(board[r][c]) && !cellSpecial(board[r][c + 1])) {
				found = { a, b }
				break outer
			}
		}
	}
	assert.ok(found, 'expected a non-matching pair on a fresh board')
	assert.equal(resolveSwap(board, found.a, found.b), null)
})

test('resolveSwap with forced horizontal four spawns line special', () => {
	const board = createBoardWithoutMatches()
	board[0][0] = makeCell(0)
	board[0][1] = makeCell(0)
	board[0][2] = makeCell(0)
	board[0][3] = makeCell(1)
	board[1][3] = makeCell(0)
	board[0][4] = makeCell(2)
	board[1][0] = makeCell(3)
	board[1][1] = makeCell(4)
	board[1][2] = makeCell(5)

	const result = resolveSwap(board, { r: 1, c: 3 }, { r: 0, c: 3 })
	assert.ok(result)
	assert.ok(result.scoreGain > 0)
	assert.ok(
		result.events.includes('madeLine') || result.firstSpawn?.special === 'row',
		`expected line special, got events=${JSON.stringify(result.events)} spawn=${JSON.stringify(result.firstSpawn)}`
	)
})
