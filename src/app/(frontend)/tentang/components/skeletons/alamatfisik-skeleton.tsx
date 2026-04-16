import { Skeleton } from '@/components/ui/skeleton'

export function AlamatFisikSkeleton() {
  return (
    <div className="p-8">
      <div className="space-y-3">
        <Skeleton className="h-5 md:w-48 bg-black/10 dark:bg-white/10" />
        <Skeleton className="h-4 md:w-[75%] bg-black/10 dark:bg-white/10" />
        <Skeleton className="h-4 md:w-[75%] bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  )
}
