-- SmartCode Roblox v2 template
-- Module 7 | Lesson 7.3 — while і небезпека вічного циклу
-- Source: module-07-loops.md
--
local t = 5
while t > 0 do
	print("Залишилось", t)
	t = t - 1
	task.wait(1)
end
print("Старт!")
