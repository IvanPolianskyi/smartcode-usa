'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero visual: a lattice with signal propagating through it.
 *
 * This is the product's actual subject made abstract — code that executes,
 * checks that resolve. Nodes hold a charge, pass it to neighbours, and settle.
 * Deliberately not falling code or fake terminals.
 *
 * Canvas 2D rather than WebGL: one striking, cheap visual beats a heavy 3D
 * dependency on the page that has to load fastest.
 */

const SPACING = 46
const NODE_RADIUS = 1.4
const PULSE_INTERVAL_MS = 1750
const DECAY = 0.965
const SPREAD = 0.24
const POINTER_RADIUS = 130

export default function SignalLattice({ className }) {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		const context = canvas.getContext('2d', { alpha: true })
		if (!context) return

		let width = 0
		let height = 0
		let cols = 0
		let rows = 0
		let charge = new Float32Array(0)
		let next = new Float32Array(0)
		let frame = 0
		let lastPulse = 0
		let running = true

		const pointer = { x: -9999, y: -9999, active: false }
		const styles = getComputedStyle(document.documentElement)

		function readColor(token, fallback) {
			const value = styles.getPropertyValue(token).trim()
			return value || fallback
		}

		let inkColor = readColor('--sc-muted', '#6d7679')
		let accentColor = readColor('--sc-accent', '#5b3df5')
		let signalColor = readColor('--sc-signal', '#e85d3a')

		function refreshColors() {
			const current = getComputedStyle(document.documentElement)
			inkColor = current.getPropertyValue('--sc-muted').trim() || inkColor
			accentColor = current.getPropertyValue('--sc-accent').trim() || accentColor
			signalColor = current.getPropertyValue('--sc-signal').trim() || signalColor
		}

		function resize() {
			const rect = canvas.getBoundingClientRect()
			const dpr = Math.min(window.devicePixelRatio || 1, 2)

			width = Math.max(1, Math.floor(rect.width))
			height = Math.max(1, Math.floor(rect.height))

			canvas.width = Math.floor(width * dpr)
			canvas.height = Math.floor(height * dpr)
			context.setTransform(dpr, 0, 0, dpr, 0, 0)

			cols = Math.max(2, Math.ceil(width / SPACING) + 1)
			rows = Math.max(2, Math.ceil(height / SPACING) + 1)
			charge = new Float32Array(cols * rows)
			next = new Float32Array(cols * rows)
		}

		function seedPulse() {
			if (!charge.length) return
			// Seed from an edge so the signal reads as arriving, not appearing.
			const fromLeft = Math.random() < 0.65
			const col = fromLeft ? 0 : Math.floor(Math.random() * cols)
			const row = fromLeft ? Math.floor(Math.random() * rows) : rows - 1
			charge[row * cols + col] = 1
		}

		function step() {
			// Diffuse charge to orthogonal neighbours, then decay.
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const index = row * cols + col
					let sum = 0
					if (col > 0) sum += charge[index - 1]
					if (col < cols - 1) sum += charge[index + 1]
					if (row > 0) sum += charge[index - cols]
					if (row < rows - 1) sum += charge[index + cols]

					next[index] = (charge[index] + sum * SPREAD) * DECAY
					if (next[index] > 1) next[index] = 1
					if (next[index] < 0.0008) next[index] = 0
				}
			}
			const swap = charge
			charge = next
			next = swap
		}

		function draw() {
			context.clearRect(0, 0, width, height)

			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const index = row * cols + col
					const x = col * SPACING
					const y = row * SPACING

					let energy = charge[index]

					if (pointer.active) {
						const dx = x - pointer.x
						const dy = y - pointer.y
						const distance = Math.hypot(dx, dy)
						if (distance < POINTER_RADIUS) {
							energy = Math.min(1, energy + (1 - distance / POINTER_RADIUS) * 0.5)
						}
					}

					if (energy > 0.02) {
						// Connect an energised node to its right and lower neighbour so
						// the lattice reads as a network rather than a dot grid.
						context.globalAlpha = Math.min(0.5, energy * 0.55)
						context.strokeStyle = accentColor
						context.lineWidth = 1
						context.beginPath()
						if (col < cols - 1) {
							context.moveTo(x, y)
							context.lineTo(x + SPACING, y)
						}
						if (row < rows - 1) {
							context.moveTo(x, y)
							context.lineTo(x, y + SPACING)
						}
						context.stroke()
					}

					const radius = NODE_RADIUS + energy * 2.4
					context.globalAlpha = 0.2 + energy * 0.8
					context.fillStyle =
						energy > 0.72 ? signalColor : energy > 0.12 ? accentColor : inkColor
					context.beginPath()
					context.arc(x, y, radius, 0, Math.PI * 2)
					context.fill()
				}
			}

			context.globalAlpha = 1
		}

		function loop(timestamp) {
			if (!running) return

			if (timestamp - lastPulse > PULSE_INTERVAL_MS) {
				seedPulse()
				lastPulse = timestamp
			}

			step()
			draw()
			frame = window.requestAnimationFrame(loop)
		}

		function handlePointerMove(event) {
			const rect = canvas.getBoundingClientRect()
			pointer.x = event.clientX - rect.left
			pointer.y = event.clientY - rect.top
			pointer.active = true
		}

		function handlePointerLeave() {
			pointer.active = false
			pointer.x = -9999
			pointer.y = -9999
		}

		function start() {
			if (frame || reduceMotion.matches) return
			running = true
			frame = window.requestAnimationFrame(loop)
		}

		function stop() {
			running = false
			if (frame) window.cancelAnimationFrame(frame)
			frame = 0
		}

		function renderStatic() {
			// Still frame for reduced-motion: the lattice without the animation.
			seedPulse()
			for (let i = 0; i < 40; i++) step()
			draw()
		}

		resize()

		const resizeObserver = new ResizeObserver(() => {
			resize()
			if (reduceMotion.matches) renderStatic()
		})
		resizeObserver.observe(canvas)

		// Off-screen or on a background tab, stop burning frames.
		const visibility = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) start()
				else stop()
			},
			{ threshold: 0 }
		)
		visibility.observe(canvas)

		function handleVisibilityChange() {
			if (document.hidden) stop()
			else start()
		}

		function handleMotionChange() {
			stop()
			if (reduceMotion.matches) renderStatic()
			else start()
		}

		const themeObserver = new MutationObserver(refreshColors)
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		})

		document.addEventListener('visibilitychange', handleVisibilityChange)
		canvas.addEventListener('pointermove', handlePointerMove)
		canvas.addEventListener('pointerleave', handlePointerLeave)
		reduceMotion.addEventListener('change', handleMotionChange)

		if (reduceMotion.matches) renderStatic()
		else start()

		return () => {
			stop()
			resizeObserver.disconnect()
			visibility.disconnect()
			themeObserver.disconnect()
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			canvas.removeEventListener('pointermove', handlePointerMove)
			canvas.removeEventListener('pointerleave', handlePointerLeave)
			reduceMotion.removeEventListener('change', handleMotionChange)
		}
	}, [])

	return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
