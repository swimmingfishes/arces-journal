import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function LandingCardsSkeleton() {
  const skeletonItems = [1, 2, 3]

  return (
    <section className="w-full bg-background">
      <div className="m-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonItems.map((item) => (
          <Card
            key={item}
            className="border border-border bg-background flex flex-col rounded-none shadow-none"
          >
            <div className="divide-y flex flex-col h-full">
              <CardHeader className="p-0">
                <Skeleton className="w-full aspect-[calc(16/7)] rounded-none bg-black/10 dark:bg-white/10" />
              </CardHeader>

              <CardContent className="p-6 flex flex-col grow space-y-4">
                <Skeleton className="h-7 w-full bg-black/10 dark:bg-white/10" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-black/10 dark:bg-white/10" />
                  <Skeleton className="h-4 w-full bg-black/10 dark:bg-white/10" />
                </div>

                <div className="pt-2">
                  <Skeleton className="h-11 w-32 rounded-md bg-black/10 dark:bg-white/10" />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
