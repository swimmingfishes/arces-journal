import type { Member } from '../types'
import { getMemberImageUrl } from '../types'
import { UserCircleIcon } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

type TeamCardProps = {
  member: Member
  onClick: (member: Member) => void
}

export function TeamCard({ member, onClick }: TeamCardProps) {
  const imageUrl = getMemberImageUrl(member)

  return (
    <div className="group space-y-4" onClick={() => onClick(member)}>
      <div className="w-full aspect-[calc(4/5)] overflow-hidden border bg-gray-100 cursor-pointer dark:bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={member.name}
            width={500}
            height={625}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400 dark:text-zinc-500">
            <UserCircleIcon className="h-20 w-20" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="cursor-pointer space-y-1.5">
        <h3 className="text-base font-bold text-pretty leading-snug transition-colors group-hover:font-extrabold group-hover:underline">
          {member.name}
        </h3>
        <p className="border-y py-2 text-sm leading-tight text-gray-700 dark:text-gray-300">
          {member.university}
        </p>
        <p className="text-xs text-muted-foreground">{member.country}</p>
      </div>
    </div>
  )
}
