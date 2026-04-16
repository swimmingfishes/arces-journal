import { Skeleton } from '@/components/ui/skeleton'

export function SejarahSkeleton() {
  return (
    <section className="w-full p-8 flex flex-col">
      <div className="columns-1 md:columns-2 gap-16 md:divide-x">
        <div className="space-y-4">
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
        </div>
        <div className="space-y-4 pt-4 md:pt-0">
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </section>
  )
}
