import { getClientSideURL } from '@/utilities/getURL'

const withCacheTag = (value: string, cacheTag?: string | null): string => {
  if (!cacheTag) return value

  const separator = value.includes('?') ? '&' : '?'
  return `${value}${separator}v=${encodeURIComponent(cacheTag)}`
}

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url)

      // Blob/local API media may come back as an absolute URL on the same app.
      // Convert it to a relative URL so Next Image treats it as local source.
      if (parsed.pathname.startsWith('/api/media/file/')) {
        return withCacheTag(`${parsed.pathname}${parsed.search}`, cacheTag)
      }
    } catch {
      // If URL parsing fails, fall through and return original absolute URL.
    }

    return withCacheTag(url, cacheTag)
  }

  // Keep internal media API paths relative so Next Image can treat them as local sources.
  if (url.startsWith('/api/media/file/')) {
    return withCacheTag(url, cacheTag)
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return withCacheTag(`${baseUrl}${url}`, cacheTag)
}
