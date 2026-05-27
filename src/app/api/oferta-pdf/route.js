import { readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'
import { ofertaDownloadFilename } from '@/lib/localeStrings'

const SOURCE_FILE = 'oferta.pdf'

export async function GET() {
  const downloadName = ofertaDownloadFilename()
  const filePath = join(process.cwd(), SOURCE_FILE)
  try {
    const buf = await readFile(filePath)
    const encoded = encodeURIComponent(downloadName)
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
