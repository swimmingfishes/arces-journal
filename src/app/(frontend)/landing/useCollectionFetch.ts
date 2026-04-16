'use client'

import { useEffect, useState } from 'react'

type CollectionResponse<T> = {
  docs?: T[]
}

export function useCollectionFetch<T>(url: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchCollection = async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch collection')
        }

        const payload: CollectionResponse<T> = await response.json()

        if (active) {
          setData(payload.docs ?? [])
        }
      } catch {
        if (active) {
          setData([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchCollection()

    return () => {
      active = false
    }
  }, [url])

  return { data, loading }
}
