import path from 'path'

import type { File } from 'payload'

const getFileNameFromURL = (url: string): string => {
  try {
    const parsedURL = new URL(url)
    const pathname = parsedURL.pathname
    const baseName = path.basename(pathname)

    return baseName || 'seed-file'
  } catch {
    return 'seed-file'
  }
}

export const fetchFileByURL = async (url: string): Promise<File> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${url} (${response.status})`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const data = Buffer.from(arrayBuffer)
  const mimeType = response.headers.get('content-type') ?? 'application/octet-stream'

  return {
    name: getFileNameFromURL(url),
    data,
    mimetype: mimeType,
    size: data.length,
  }
}

export const textToLexicalState = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
      },
    ],
  },
})
