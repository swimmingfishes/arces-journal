'use client'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Journal } from '@/data/journals'

export function JournalDetailClient({ journal }: { journal: Journal }) {
  return (
    <main className="w-full">
      {/* Hero section jurnal */}
      <section className="w-full px-6 lg:px-32 pt-16 pb-12">
        <div className="px-8">
          <div className="grid grid-cols-3 gap-6 items-start">
            <h1 className="col-span-2 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              {journal.title}
            </h1>
            <div className="flex justify-end self-end">
              <a
                href={journal.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center h-10 px-6 rounded-md bg-[#007BFF] text-white text-sm font-medium hover:bg-[#0062cc] transition-colors"
              >
                See more
              </a>
            </div>
          </div>
          <p className="mt-8 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            {journal.fullDescription}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full px-6 lg:px-32 pb-24">
        <Tabs defaultValue="penanggung-jawab" className="px-8">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 bg-transparent h-auto p-0 mb-12">
            <TabsTrigger
              value="penanggung-jawab"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#007BFF] data-[state=active]:text-[#007BFF] bg-transparent px-6 pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all"
            >
              Penanggung Jawab
            </TabsTrigger>
            <TabsTrigger
              value="keterangan"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#007BFF] data-[state=active]:text-[#007BFF] bg-transparent px-6 pb-3 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all"
            >
              Keterangan
            </TabsTrigger>
          </TabsList>

          {/* Tab Penanggung Jawab */}
          <TabsContent value="penanggung-jawab">
            <div className="space-y-12">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
                  Chief Editor
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {journal.editors.map((editor, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image src={editor.photo} alt={editor.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {editor.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{editor.role}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {editor.institution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab Keterangan */}
          <TabsContent value="keterangan">
            <div className="space-y-12 max-w-3xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Focus Scope
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {journal.focusScope}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Section Policies
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {journal.sectionPolicies}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
