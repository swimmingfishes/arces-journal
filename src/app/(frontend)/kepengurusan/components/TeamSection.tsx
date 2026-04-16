import type { Member } from '../types'
import { TeamCard } from './TeamCard'

type TeamSectionProps = {
  members: Member[]
  onSelectMember: (member: Member) => void
  className?: string
  gridClassName?: string
}

export function TeamSection({
  members,
  onSelectMember,
  className,
  gridClassName,
}: TeamSectionProps) {
  return (
    <section>
      <div className="p-8">
        <div
          className={[
            'grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
            gridClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {members.map((member) => (
            <TeamCard key={member.id} member={member} onClick={onSelectMember} />
          ))}
        </div>
      </div>
    </section>
  )
}
