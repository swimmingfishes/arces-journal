import { Skeleton } from '@/components/ui/skeleton'

export function VisiMisiSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x">
      <div className="flex flex-col p-8 gap-6">
        <Skeleton className="h-8 w-24 bg-black/10 dark:bg-white/10" />
        <div className="space-y-3">
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
          <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
        </div>
      </div>

      <div className="flex flex-col p-8 gap-6">
        <Skeleton className="h-8 w-24 bg-black/10 dark:bg-white/10" />
        <ul className="space-y-6">
          {[1, 2, 3].map((item) => (
            <li key={item} className="flex gap-5 items-start">
              <Skeleton className="shrink-0 w-11 h-11 bg-black/10 dark:bg-white/10" />
              <div className="flex flex-col gap-2 w-full mt-1">
                <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
                <Skeleton className="h-4 md:w-[85%] bg-black/10 dark:bg-white/10" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
