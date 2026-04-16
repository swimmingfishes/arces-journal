'use client'

import type { Member } from '../types'
import { TeamCard } from './TeamCard'
import { TeamSectionSkeleton } from './skeletons/team-skeleton'

type TeamSectionProps = {
  members: Member[]
  onSelectMember: (member: Member) => void
  loading?: boolean
  className?: string
  gridClassName?: string
}

export function TeamSection({
  members,
  onSelectMember,
  loading,
  className,
  gridClassName,
}: TeamSectionProps) {
  if (loading) {
    return <TeamSectionSkeleton />
  }

  return (
    <section className={className}>
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
