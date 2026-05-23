import fs from 'fs'

const text = fs.readFileSync('src/components/Lesson/LessonPage.js', 'utf8')
const entries = [...text.matchAll(/"(lesson-[\d-]+)":\s*(lesson_[\d_]+)/g)]
const lessonMap = Object.fromEntries(entries.map(([, id, exp]) => [id, exp]))

const exportToFile = {}
for (const imp of [...text.matchAll(/from '@\/lib\/lessonContent\/(lesson-[^']+)'/g)].map((m) => m[1])) {
	const exp = `lesson_${imp.replace('lesson-', '').replace(/-/g, '_')}`
	exportToFile[exp] = imp
}

const uniqueFiles = [...new Set(Object.values(exportToFile))].sort()
fs.writeFileSync(
	'scripts/python-lesson-files.json',
	JSON.stringify({ lessonMap, uniqueFiles }, null, 2)
)
console.log('unique files:', uniqueFiles.length)
