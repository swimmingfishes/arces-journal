import { Skeleton } from '@/components/ui/skeleton'

export function LandingGallerySkeleton() {
  return (
    <section className="w-full bg-background p-8">
      <div className="border border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 -m-[0.5px]">
          <div className="relative -m-[0.5px] overflow-hidden">
            <div className="relative w-full aspect-video">
              <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-2 -m-[0.5px]">
            <div className="relative -m-[0.5px] overflow-hidden">
              <div className="absolute inset-0">
                <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
              </div>
            </div>
            <div className="relative -m-[0.5px] overflow-hidden">
              <div className="absolute inset-0">
                <Skeleton className="w-full h-full rounded-none bg-black/10 dark:bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
