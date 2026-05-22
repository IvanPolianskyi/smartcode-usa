import fs from 'fs'
import path from 'path'

const { lessonMap, uniqueFiles } = JSON.parse(
	fs.readFileSync('scripts/python-lesson-files.json', 'utf8')
)

const exportToStem = {}
for (const stem of uniqueFiles) {
	const exportName = `lesson_${stem.replace('lesson-', '').replace(/-/g, '_')}`
	exportToStem[exportName] = stem
}

function stemFromExport(exportName) {
	return exportToStem[exportName] || null
}

function buildMapModule(locale) {
	const enDir = path.join('src/lib/lessonContent/en')
	const imports = new Set()
	const entries = []

	for (const [lessonId, exportName] of Object.entries(lessonMap)) {
		const stem = stemFromExport(exportName)
		if (!stem) continue

		const useEn = locale === 'en' && fs.existsSync(path.join(enDir, `${stem}.js`))
		const importPath = useEn ? `./lessonContent/en/${stem}` : `./lessonContent/${stem}`
		imports.add({ exportName, importPath, stem })
	}

	for (const { exportName, importPath } of imports) {
		// dedupe imports by exportName
	}
}

// dedupe imports by exportName
function getImports(locale) {
	const enDir = path.join('src/lib/lessonContent/en')
	const byExport = new Map()
	for (const stem of uniqueFiles) {
		const exportName = `lesson_${stem.replace('lesson-', '').replace(/-/g, '_')}`
		const useEn = locale === 'en' && fs.existsSync(path.join(enDir, `${stem}.js`))
		const importPath = useEn ? `./lessonContent/en/${stem}` : `./lessonContent/${stem}`
		byExport.set(exportName, importPath)
	}
	return byExport
}

function generate(locale) {
	const byExport = getImports(locale)
	const importLines = [...byExport.entries()]
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([exportName, importPath]) => `import { ${exportName} } from '${importPath}'`)

	const mapLines = Object.entries(lessonMap)
		.sort((a, b) => a[0].localeCompare(b[0]))
		.map(([lessonId, exportName]) => `\t"${lessonId}": ${exportName},`)

	const content = `/**
 * Auto-generated lesson content map (${locale}). Run: node scripts/build-lesson-content-maps.mjs
 */
${importLines.join('\n')}

export const lessonContentMap = {
${mapLines.join('\n')}
}
`

	const outPath =
		locale === 'en'
			? 'src/lib/lessonContentMap.en.js'
			: 'src/lib/lessonContentMap.uk.js'
	fs.writeFileSync(outPath, content)
	console.log(`Wrote ${outPath} (${importLines.length} imports, ${mapLines.length} entries)`)
}

generate('uk')
generate('en')
