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
  const prevHref = currentPage > 1 ? pageHref(currentPage - 1) : '#'
  const nextHref = currentPage < totalPages ? pageHref(currentPage + 1) : '#'

  return (
    <div className="flex justify-end items-center">
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
              aria-disabled={currentPage === 1}
              className={`
								w-12 h-12 flex items-center justify-center rounded-none
								bg-foreground text-background [&>span]:hidden [&>svg]:text-background
								${currentPage === 1 ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-foreground/80 hover:text-background'}
							`}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={nextHref}
              aria-disabled={currentPage === totalPages}
              className={`
								w-12 h-12 flex items-center justify-center rounded-none
								bg-foreground text-background [&>span]:hidden [&>svg]:text-background
								${currentPage === totalPages ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-foreground/80 hover:text-background'}
							`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
