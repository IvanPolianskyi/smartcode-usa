-- SmartCode Roblox v2 template
-- Module 7 | Lesson 7.5 — Цикл + if: фільтр спавну
-- Source: module-07-loops.md
--
for i = 1, 10 do
	if i % 2 == 0 then
		local p = Instance.new("Part")
		p.Position = Vector3.new(i * 2, 6, 10)
		p.Anchored = true
		p.Color = Color3.fromRGB(255, 200, 0)
		p.Parent = workspace
	end
end
