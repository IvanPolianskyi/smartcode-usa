import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { requireTeacher } from '@/lib/requireTeacher'

const ROBLOX_ROOT = path.join(process.cwd(), 'curriculum', 'roblox-v2')
const TEXT_EXT = new Set(['.md', '.txt', '.lua', '.json', '.js', '.mjs', '.ts'])

async function safeReadFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    return content
  } catch {
    return null
  }
}

async function listTextFiles(dir, baseRel = '') {
  const out = []
  let entries = []
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const rel = baseRel ? `${baseRel}/${entry.name}` : entry.name
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await listTextFiles(full, rel)))
    } else if (TEXT_EXT.has(path.extname(entry.name).toLowerCase())) {
      const content = await safeReadFile(full)
      if (content != null) {
        out.push({
          path: rel,
          title: entry.name,
          content: content.slice(0, 80000),
        })
      }
    }
  }
  return out
}

export async function GET() {
  const auth = await requireTeacher()
  if (auth.error) return auth.error

  try {
    const teacherMd = await safeReadFile(path.join(ROBLOX_ROOT, 'TEACHER.md'))
    const overviewMd = await safeReadFile(path.join(ROBLOX_ROOT, '00-course-overview.md'))
    const starterPlace = await listTextFiles(path.join(ROBLOX_ROOT, 'starter-place'), 'starter-place')

    return NextResponse.json({
      materials: [
        ...(teacherMd
          ? [
              {
                id: 'roblox-teacher',
                courseId: 'roblox-studio',
                title: 'Roblox — TEACHER.md',
                kind: 'guide',
                content: teacherMd.slice(0, 120000),
              },
            ]
          : []),
        ...(overviewMd
          ? [
              {
                id: 'roblox-overview',
                courseId: 'roblox-studio',
                title: 'Roblox — course overview',
                kind: 'guide',
                content: overviewMd.slice(0, 80000),
              },
            ]
          : []),
        ...starterPlace.map((f) => ({
          id: `roblox-${f.path}`,
          courseId: 'roblox-studio',
          title: f.title,
          path: f.path,
          kind: 'starter',
          content: f.content,
        })),
      ],
    })
  } catch (error) {
    console.error('GET /api/teacher/materials', error)
    return NextResponse.json({ error: 'Failed to load materials' }, { status: 500 })
  }
}
