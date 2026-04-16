'use client'

import type { GalleryPaginationProps } from '../types'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function Paginations({
  currentPage,
  totalPages,
  onPageChange,
}: GalleryPaginationProps) {
  return (
    <div className="flex justify-end items-center ">
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-0 border-l">
          {/* Page indicator */}
          <PaginationItem>
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase px-4 pr-20">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          {/* Prev arrow */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={`
                w-12 h-12 flex items-center justify-center rounded-none
                bg-foreground text-background [&>span]:hidden [&>svg]:text-background
                ${currentPage === 1 ? 'pointer-events-none opacity-30' : 'cursor-pointer hover:bg-foreground/80 hover:text-background'}
              `}
            />
          </PaginationItem>

          {/* Next arrow */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
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
