import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr'
import { UserCircleIcon } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import Image from 'next/image'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

import type { Member } from '../types'
import { getMemberImageUrl } from '../types'

type MemberDialogProps = {
  member: Member | null
  onClose: () => void
}

export function MemberDialog({ member, onClose }: MemberDialogProps) {
  if (!member) return null

  const imageUrl = getMemberImageUrl(member)

  return (
    <Dialog open={!!member} onOpenChange={onClose}>
      <DialogContent
        // Menambahkan border tipis agar modal lebih tegas
        className="sm:max-w-sm p-0 overflow-hidden rounded-none border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
        showCloseButton={false}
      >
        <VisuallyHidden.Root asChild>
          <DialogTitle>Profil {member.name}</DialogTitle>
        </VisuallyHidden.Root>

        {/* Banner */}
        <div className="relative h-24 border-b border-zinc-300/50 bg-linear-to-tr from-zinc-300 to-zinc-100 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800">
          {/* Foto Profil: Kotak tegas dengan border sedikit lebih tipis agar elegan */}
          <div className="absolute -bottom-10 left-6 h-24 w-20 overflow-hidden rounded-none border-4 border-white bg-zinc-200 dark:border-zinc-950">
            {imageUrl ? (
              <img src={imageUrl} className="object-cover" alt={member.name} sizes="80px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-500 dark:text-zinc-400">
                <UserCircleIcon className="h-14 w-14" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        {/* Info Konten */}
        <div className="px-6 pt-10">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {member.name}
              </h4>
              <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {member.university}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.country}</p>
            </div>
          </div>
        </div>

        {/* Links */}
        {member.links?.length ? (
          <div className="px-6">
            <div className="border-t border-zinc-200 pt-5 dark:border-zinc-800">
              {/* PERUBAHAN DI SINI: Tambahkan flex-wrap */}
              <div className="flex flex-wrap w-full gap-2">
                {member.links.map((link, i) => (
                  <Link
                    key={`${link.url}-${i}`}
                    href={link.url}
                    target="_blank"
                    // PERUBAHAN DI SINI: Tambahkan min-w-[120px] agar link memiliki batas menyusut dan terdorong ke bawah
                    className="flex flex-1 min-w-[120px] items-center justify-between gap-1.5 rounded-none border border-zinc-300 px-3 py-2 text-[13px] font-semibold text-zinc-700 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    <span className="truncate">{link.label}</span>
                    <ArrowSquareOutIcon className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Tombol Tutup */}
        <div className="mt-2 flex justify-end px-6 py-6">
          <button
            onClick={onClose}
            // rounded-none dan gaya uppercase agar lebih senada dengan tema "sharp"
            className="rounded-none border border-zinc-300 bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Tutup
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
