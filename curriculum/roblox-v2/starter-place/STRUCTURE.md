# Explorer tree — SmartCode_Roblox_v2_Starter

```
Workspace
├── SpawnLocation                    # на Foundation, Anchored
├── Yard                             # Folder
│   ├── Foundation                   # Part flat (base)
│   ├── Path                         # Folder — доріжка Part`ів
│   ├── Fence                        # Folder (опційно М1)
│   ├── Bench                        # Model (М2)
│   └── House                        # Model (М2+) з PrimaryPart
├── Biome                            # Folder (М3)
│   └── (terrain окремо в Terrain)
├── Hazards                          # Folder — слоти М4 (порожні Parts ок)
│   ├── KillBrick                    # червоний, CanCollide true
│   ├── Checkpoint_1
│   ├── Coin                         # жовтий маленький
│   ├── GateDoor                     # + ClickDetector
│   ├── Teleporter
│   ├── TeleportTarget               # Anchored, можна напівпрозорий
│   └── FadePlatform
└── Camera                           # не чіпати без потреби

ServerScriptService
├── HelloStudio                      # Script — templates/m04-lesson-4-1.lua
└── LeaderstatsSetup                 # Script — templates/m04-lesson-4-4.lua (з М4.4)

ServerStorage
└── Backup                           # Folder — копії важливих Models

ReplicatedStorage
└── (порожньо на старті; RemoteEvents з М10+)

StarterGui
└── StartMenu                        # ScreenGui (М4.8) Enabled=true
    └── Frame
        ├── Title                    # TextLabel
        └── StartButton              # TextButton + LocalScript templates/m04-lesson-4-8.lua

StarterPack
└── (порожньо до М12)
```

## Рекомендовані Properties

| Обʼєкт | Anchored | CanCollide | Material / Color |
|--------|----------|------------|------------------|
| Foundation | true | true | Concrete / сірий |
| Path parts | true | true | Cobblestone |
| KillBrick | true | true | Neon / червоний |
| Coin | true | false | Neon / жовтий |
| FadePlatform | true | true | Glass |

## Lighting (мінімум)

- Technology: ShadowMap або Future (як дозволяє група)
- ClockTime ≈ 14
- Ambient не нульовий
- Не обовʼязково Atmosphere на М1 — додасте в М3
