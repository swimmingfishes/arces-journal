'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react/dist/ssr'

export default function NotFound() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
      return
    }

    router.push('/')
  }

  return (
    <div className="relative py-20 flex items-center justify-center overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute top-0 left-0 right-0 h-100 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-t from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <h1 className="font-serif text-[180px] md:text-[220px] lg:text-[280px] font-bold leading-none tracking-tighter text-primary/10 dark:text-primary/5 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground">
                Oops!
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
              Page Not Found
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved to another URL.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="rounded-none gap-2 px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/">
                <HouseIcon className="h-4 w-4" />
                Go back home
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-none gap-2 px-8 py-6 text-base font-medium border-2 hover:bg-muted/50 transition-all duration-300"
              onClick={handleBack}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Previous page
            </Button>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-muted-foreground">
            If you think this is a mistake, please{' '}
            <Link href="/contact" className="text-primary hover:underline underline-offset-4">
              contact support
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-8 text-muted-foreground/20 text-sm hidden md:block">
        Error 404
      </div>
      <div className="absolute top-8 right-8 text-muted-foreground/20 text-sm hidden md:block">
        Page Not Found
      </div>
    </div>
  )
}
