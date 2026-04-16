import { Skeleton } from '@/components/ui/skeleton'

export function TeamSectionSkeleton() {
  const dummyItems = Array.from({ length: 8 })

  return (
    <section>
      <div className="p-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dummyItems.map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="w-full aspect-square overflow-hidden border">
                <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-5 w-3/4 bg-black/10 dark:bg-white/10" />
                <div className="border-y py-2 space-y-2">
                  <Skeleton className="h-4 w-full bg-black/10 dark:bg-white/10" />
                  <Skeleton className="h-4 w-5/6 bg-black/10 dark:bg-white/10" />
                </div>
                <Skeleton className="h-4 w-1/2 bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
