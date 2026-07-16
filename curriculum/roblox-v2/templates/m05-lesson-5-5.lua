-- SmartCode Roblox v2 template
-- Module 5 | Lesson 5.5 — Vector3: розмір і позиція
-- Source: module-05-variables.md
--
local block = workspace:FindFirstChild("TargetBlock")
local newSize = Vector3.new(4, 4, 4)
local lift = Vector3.new(0, 5, 0)

if block then
	block.Size = newSize
	block.Position = block.Position + lift
end
