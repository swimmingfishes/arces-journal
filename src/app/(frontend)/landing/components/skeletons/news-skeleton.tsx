import { Skeleton } from '@/components/ui/skeleton'

export function LandingNewsSkeleton() {
  const sideNewsItems = [1, 2]

  return (
    <section className="w-full bg-background p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px divide-x border border-border">
        <div className="relative w-full h-full min-h-[350px] lg:min-h-0 bg-muted/50 flex flex-col justify-end p-8">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-50" />

          <div className="relative z-10 space-y-3">
            <Skeleton className="h-8 w-4/5 bg-black/20 dark:bg-white/20" />
            <Skeleton className="h-4 w-32 mt-1 bg-black/20 dark:bg-white/20" />
          </div>
        </div>

        <div className="flex flex-col bg-background divide-y divide-border">
          {sideNewsItems.map((item) => (
            <div key={item} className="p-8 space-y-3">
              <Skeleton className="h-6 w-full bg-black/20 dark:bg-white/20" />
              <Skeleton className="h-4 w-24 bg-black/20 dark:bg-white/20" />
            </div>
          ))}

          <div className="p-7">
            <Skeleton className="h-11 w-full rounded-md bg-black/20 dark:bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
