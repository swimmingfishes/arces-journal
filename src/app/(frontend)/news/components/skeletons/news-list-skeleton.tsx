import { Skeleton } from '@/components/ui/skeleton'

export function NewsListSkeleton() {
  const dummyItems = Array.from({ length: 4 })

  return (
    <div className="flex flex-col grow divide-y">
      {dummyItems.map((_, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start gap-8 px-8 py-8 lg:py-10">
          <div className="w-full md:w-64 lg:w-72 shrink-0">
            <div className="relative aspect-video border bg-muted">
              <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div className="flex flex-col justify-start grow space-y-3 w-full">
            <Skeleton className="h-10 w-full bg-black/10 dark:bg-white/10" />

            <div className="space-y-2 pt-2">
              <Skeleton className="h-6 w-full bg-black/10 dark:bg-white/10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
