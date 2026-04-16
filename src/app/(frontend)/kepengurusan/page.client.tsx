'use client'

import { useMemo, useState } from 'react'

import { RoutePageHeader } from '@/components/RoutePageHeader'
import { MemberDialog } from './components/MemberDialog'
import { SearchMemberBar } from './components/SearchMemberBar'
import { TeamSection } from './components/TeamSection'
import type { Member } from './types'
import { SectionDivider } from '@/components/SectionDivider'

type PageClientContentProps = {
  allMembers: Member[]
}

export default function PageClientContent({ allMembers }: PageClientContentProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const editorialTeam = useMemo(
    () => allMembers.filter((member) => member.role === 'editorial'),
    [allMembers],
  )
  const reviewerTeam = useMemo(
    () => allMembers.filter((member) => member.role === 'reviewer'),
    [allMembers],
  )

  return (
    <main className="w-full">
      <div className="mx-auto min-h-screen divide-y">
        <RoutePageHeader
          title="Kepengurusan"
          description="Telusuri tim editorial dan reviewer ARCES, lengkap dengan institusi serta profil singkat masing-masing anggota."
        />
        <SearchMemberBar
          allMembers={allMembers}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSelectMember={setSelectedMember}
        />
        <SectionDivider title="Editorial" />
        <TeamSection members={editorialTeam} onSelectMember={setSelectedMember} />
        <SectionDivider title="Editorial" />
        <TeamSection members={reviewerTeam} onSelectMember={setSelectedMember} />
      </div>

      <MemberDialog member={selectedMember} onClose={() => setSelectedMember(null)} />
    </main>
  )
}
