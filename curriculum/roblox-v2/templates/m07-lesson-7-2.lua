-- SmartCode Roblox v2 template
-- Module 7 | Lesson 7.2 — for зі кроком + спавн Part
-- Source: module-07-loops.md
--
for i = 1, 5 do
	local p = Instance.new("Part")
	p.Size = Vector3.new(2, 1, 2)
	p.Position = Vector3.new(i * 3, 5, 0)
	p.Anchored = true
	p.Name = "Brick_" .. i
	p.Parent = workspace
end
