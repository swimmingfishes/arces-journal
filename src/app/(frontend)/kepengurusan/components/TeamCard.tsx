import type { Member } from '../types'

type TeamCardProps = {
  member: Member
  onClick: (member: Member) => void
}

export function TeamCard({ member, onClick }: TeamCardProps) {
  return (
    <div className="group space-y-4" onClick={() => onClick(member)}>
      <div className="w-full aspect-square overflow-hidden border bg-gray-100 cursor-pointer dark:bg-zinc-800">
        <img
          src={member.image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={member.name}
        />
      </div>
      <div className="cursor-pointer space-y-1.5">
        <h3 className="text-base font-bold leading-snug transition-colors group-hover:font-extrabold group-hover:underline">
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
