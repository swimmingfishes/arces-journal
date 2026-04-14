'use client'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Journal } from '@/data/journals'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export function JournalDetailClient({ journal }: { journal: Journal }) {
  return (
    <main className="w-full">
      {/* Hero section jurnal */}
      <section className="w-full page-gutter-narrow pt-16 pb-12">
        <div className="px-8">
          {/* Mobile: stack vertikal, md+: grid 3 kolom */}
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6 md:items-end">
            <h1 className="md:col-span-2 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              {journal.title}
            </h1>
            <div className="flex md:justify-end">
              <Button asChild size="lg">
                <a href={journal.websiteUrl} target="_blank" rel="noopener noreferrer">
                  See more
                </a>
              </Button>
            </div>
          </div>
          <p className="mt-6 lg:mt-20 text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
            {journal.fullDescription}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full page-gutter-narrow pb-24">
        <Tabs defaultValue="penanggung-jawab" className="px-8 flex flex-col gap-0">
          <TabsList className="w-auto md:w-fit justify-start bg-transparent h-auto p-0 md:gap-1 lg:gap-2 ">
            <TabsTrigger
              value="penanggung-jawab"
              className="rounded-none data-[state=active]:text-primary-foreground data-[state=active]:bg-[#007BFF] bg-transparent text-md font-medium text-gray-900 dark:text-gray-400 transition-all"
            >
              Penanggung Jawab
            </TabsTrigger>
            <TabsTrigger
              value="keterangan"
              className="rounded-none data-[state=active]:text-primary-foreground data-[state=active]:bg-[#007BFF] bg-transparent text-md font-medium text-gray-900 dark:text-gray-400 transition-all"
            >
              Keterangan
            </TabsTrigger>
          </TabsList>
          <Separator className="mb-12 -mt-px" />

          {/* Tab Penanggung Jawab */}
          <TabsContent value="penanggung-jawab">
            <div className="space-y-12">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-8">
                  Chief Editor
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {journal.editors.map((editor, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={editor.photo}
                          alt={editor.name}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                        {/* Vignette dari bawah */}
                        <div className="absolute inset-0 bg-linier-to-t from-black/60 via-transparent to-transparent" />
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


