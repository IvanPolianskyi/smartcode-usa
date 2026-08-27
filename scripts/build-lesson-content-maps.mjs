import fs from 'fs'
import path from 'path'

const { lessonMap, uniqueFiles } = JSON.parse(
	fs.readFileSync('scripts/python-lesson-files.json', 'utf8')
)

function getImports() {
	const enDir = path.join('src/lib/lessonContent/en')
	const byExport = new Map()
	for (const stem of uniqueFiles) {
		const exportName = `lesson_${stem.replace('lesson-', '').replace(/-/g, '_')}`
		const importPath = `./lessonContent/en/${stem}.js`
		byExport.set(exportName, importPath)
	}
	return byExport
}

function generate() {
	const byExport = getImports()
	const importLines = [...byExport.entries()]
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([exportName, importPath]) => `import { ${exportName} } from '${importPath}'`)

	const mapLines = Object.entries(lessonMap)
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([lessonId, exportName]) => `\t"${lessonId}": ${exportName},`)

	const content = `/**
 * Auto-generated lesson content map (en). Run: node scripts/build-lesson-content-maps.mjs
 */
${importLines.join('\n')}

export const lessonContentMap = {
${mapLines.join('\n')}
}
`

	const outPath = 'src/lib/lessonContentMap.en.js'
	fs.writeFileSync(outPath, content)
	console.log(`Wrote ${outPath} (${importLines.length} imports, ${mapLines.length} entries)`)
}

generate()
