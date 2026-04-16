import { Skeleton } from '@/components/ui/skeleton'

export function AlamatMapsSkeleton() {
  return (
    <div className="p-8">
      <div className="w-full h-72 md:h-[400px] border">
        <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
      </div>
    </div>
  )
}
