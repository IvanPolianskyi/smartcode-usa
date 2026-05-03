import { readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'

const SOURCE_FILE = 'oferta.pdf'
const DOWNLOAD_NAME = 'Публічна оферта.pdf'

export async function GET() {
  const filePath = join(process.cwd(), SOURCE_FILE)
  try {
    const buf = await readFile(filePath)
    const encoded = encodeURIComponent(DOWNLOAD_NAME)
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="public-offerta.pdf"; filename*=UTF-8''${encoded}`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
