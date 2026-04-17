import { notFound } from 'next/navigation'
import { getJournalById } from '@/data/journals'
import { JournalDetailClient } from './page.client'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { id } = await params
  const journal = getJournalById(Number(id))
  if (!journal) return { title: 'Jurnal tidak ditemukan' }
  return {
    title: journal.title,
    description: journal.shortDescription,
    alternates: {
      canonical: `/jurnal/${journal.id}`,
    },
  }
}

export default async function JournalDetailPage({ params }: Args) {
  const { id } = await params
  const journal = getJournalById(Number(id))
  if (!journal) notFound()
  return <JournalDetailClient journal={journal} />
}
