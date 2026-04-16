import { Skeleton } from '@/components/ui/skeleton'

export function PeranStrategisSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="p-5 border flex flex-col gap-4">
          <Skeleton className="h-7 w-3/4 bg-black/10 dark:bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
