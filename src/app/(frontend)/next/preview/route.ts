import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import configPromise from '@/payload.config'

const sanitizePath = (path: string) => {
  if (!path.startsWith('/')) return '/'
  if (path.startsWith('//')) return '/'
  return path
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!path || !previewSecret || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview request', { status: 401 })
  }

  await configPromise
  const draft = await draftMode()
  draft.enable()

  redirect(sanitizePath(path))
}
