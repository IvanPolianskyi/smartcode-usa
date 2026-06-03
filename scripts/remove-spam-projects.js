/**
 * Remove spam / defaced projects from MongoDB.
 * Run from smartcode/: node scripts/remove-spam-projects.js [--dry-run]
 */
try {
  require('dotenv').config({ path: '.env.local' })
} catch {
  /* optional */
}
try {
  require('dotenv').config()
} catch {
  /* optional */
}

const { MongoClient } = require('mongodb')

const SPAM_PATTERNS = [/hacked\s+by/i, /\bAnt\s*\(qq\)/i]

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const mongoUri = process.env.MONGODB_URI
  const databaseName = process.env.MONGODB_DB || 'SmartCodeLogs'

  if (!mongoUri) {
    console.error('MONGODB_URI is not set')
    process.exit(1)
  }

  const client = new MongoClient(mongoUri)
  await client.connect()
  const projects = client.db(databaseName).collection('projects')

  const all = await projects.find({}).toArray()
  const toDelete = all.filter((p) => {
    const text = `${p.title || ''} ${p.description || ''} ${p.code || ''}`
    return SPAM_PATTERNS.some((re) => re.test(text))
  })

  if (toDelete.length === 0) {
    console.log('No matching spam projects found.')
    await client.close()
    return
  }

  console.log(`Found ${toDelete.length} spam project(s):`)
  toDelete.forEach((p) => {
    console.log(`  - ${p._id} | ${p.title}`)
  })

  if (dryRun) {
    console.log('Dry run — nothing deleted.')
    await client.close()
    return
  }

  const ids = toDelete.map((p) => p._id)
  const result = await projects.deleteMany({ _id: { $in: ids } })
  console.log(`Deleted: ${result.deletedCount}`)
  await client.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
