import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

import type { Member } from '../types'

type MemberDialogProps = {
  member: Member | null
  onClose: () => void
}

export function MemberDialog({ member, onClose }: MemberDialogProps) {
  if (!member) return null

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-sm p-0 overflow-hidden border-none rounded-2xl bg-white dark:bg-zinc-950"
        showCloseButton={false}
      >
        <VisuallyHidden.Root asChild>
          <DialogTitle>Profil {member.name}</DialogTitle>
        </VisuallyHidden.Root>

        <div className="relative h-28 border-b border-zinc-400/50 bg-linear-to-tr from-zinc-300 to-zinc-200 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
          <div className="absolute -bottom-12 left-7 h-28 w-28 overflow-hidden rounded-full border-5 border-white bg-zinc-200 dark:border-zinc-950">
            <img src={member.image} className="h-full w-full object-cover" alt={member.name} />
          </div>
        </div>

        <div className="px-7 pt-12 pb-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="mb-2 text-xl font-semibold leading-tight text-gray-900 dark:text-white">
                {member.name}
              </h4>
              <p className="mt-0.5 text-base text-gray-500">{member.university}</p>
              <p className="text-base text-gray-400">{member.country}</p>
            </div>
          </div>
        </div>

        {member.links?.length ? (
          <div className="px-7 pt-5">
            <div className="border-t border-border pt-4">
              <p className="mb-2.5 text-[11px] font-medium uppercase tracking-widest text-gray-400">
                Links
              </p>
              <div className="flex flex-wrap gap-2">
                {member.links.map((link, i) => (
                  <Link
                    key={`${link.url}-${i}`}
                    href={link.url}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[13px] font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
                  >
                    {link.label}
                    <ArrowSquareOutIcon className="h-3 w-3 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex justify-end px-7 py-5">
          <button
            onClick={onClose}
            className="rounded-md border border-border px-4 py-1.5 text-[13px] text-gray-500 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
