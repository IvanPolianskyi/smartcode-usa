-- SmartCode Roblox v2 template
-- Module 9 | Lesson 9.4 — Рухомі платформи (цикл / Heartbeat lite)
-- Педагогічний варіант (зрозумілий)
-- Source: module-09-obby.md
--
local platform = script.Parent
local start = platform.Position
local offset = Vector3.new(10, 0, 0)
local t = 0

while true do
	t += 0.03
	local alpha = (math.sin(t) + 1) / 2
	platform.Position = start:Lerp(start + offset, alpha)
	task.wait()
end
