-- SmartCode Roblox v2 template
-- Module 12 | Lesson 12.3 — Урон і Humanoid
-- Шаблон (Script у ServerScriptService — серверний урон по dummy)
-- Source: module-12-tools-gui.md
--
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local dealDamage = Instance.new("RemoteEvent")
dealDamage.Name = "DealDummyDamage"
dealDamage.Parent = ReplicatedStorage

local DAMAGE = 10
local RANGE = 12

dealDamage.OnServerEvent:Connect(function(player)
	local character = player.Character
	if not character then
		return
	end
	local root = character:FindFirstChild("HumanoidRootPart")
	local dummy = workspace:FindFirstChild("TrainingDummy")
	if not root or not dummy then
		return
	end
	local humanoid = dummy:FindFirstChildOfClass("Humanoid")
	local torso = dummy.PrimaryPart or dummy:FindFirstChild("HumanoidRootPart") or dummy:FindFirstChildWhichIsA("BasePart")
	if not humanoid or not torso then
		return
	end
	if (root.Position - torso.Position).Magnitude > RANGE then
		return
	end
	humanoid.Health = math.max(0, humanoid.Health - DAMAGE)
	if humanoid.Health <= 0 then
		task.delay(3, function()
			if humanoid then
				humanoid.Health = humanoid.MaxHealth
			end
		end)
	end
end)
