import { Skeleton } from '@/components/ui/skeleton'

export function GalleryGridSkeleton() {
  const dummyItems = Array.from({ length: 6 })

  return (
    <>
      {dummyItems.map((_, index) => {
        const totalInPage = dummyItems.length
        const remainder = totalInPage % 3
        const itemsInLastRow = remainder === 0 ? 3 : remainder
        const isLastRow = index >= totalInPage - itemsInLastRow

        return (
          <div
            key={index}
            className={`flex flex-col border-border ${!isLastRow ? 'border-b' : ''} ${(index + 1) % 3 !== 0 ? 'lg:border-r' : ''}`}
          >
            <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-zinc-900">
              <Skeleton className="h-full w-full rounded-none bg-black/10 dark:bg-white/10" />
            </div>

            <div className="space-y-2 p-6">
              <Skeleton className="h-4 w-5/6 bg-black/10 dark:bg-white/10" />
              <Skeleton className="h-4 w-2/3 bg-black/10 dark:bg-white/10" />
            </div>
          </div>
        )
      })}
    </>
  )
}
