'use client'

import type { NewsPaginationProps } from '../types'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

function pageHref(pageNumber: number): string {
  return pageNumber === 1 ? '/news' : `/news?page=${pageNumber}`
}

export default function Paginations({ currentPage, totalPages }: NewsPaginationProps) {
  const isPrevDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages
  const prevHref = isPrevDisabled ? pageHref(1) : pageHref(currentPage - 1)
  const nextHref = isNextDisabled ? pageHref(totalPages) : pageHref(currentPage + 1)

  return (
    <div className="mt-auto flex items-center justify-end">
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-0 border-l">
          <PaginationItem>
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase px-4 pr-20">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              href={prevHref}
              aria-disabled={isPrevDisabled}
              tabIndex={isPrevDisabled ? -1 : undefined}
              className={`
								w-12 h-12 flex items-center justify-center rounded-none
								bg-foreground text-background [&>span]:hidden [&>svg]:text-background
							${isPrevDisabled ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-foreground/80 hover:text-background'}
							`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={nextHref}
              aria-disabled={isNextDisabled}
              tabIndex={isNextDisabled ? -1 : undefined}
              className={`
								w-12 h-12 flex items-center justify-center rounded-none
								bg-foreground text-background [&>span]:hidden [&>svg]:text-background
							${isNextDisabled ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-foreground/80 hover:text-background'}
							`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
