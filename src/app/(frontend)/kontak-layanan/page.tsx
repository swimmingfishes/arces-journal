'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

export default function ContactServicePage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x border-gray-200 dark:border-white/10 min-h-screen">
          {/* 1. TOP BAR */}
          <div className="px-8 pt-10">
            <Link href="/">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>

          {/* 2. HEADER */}
          <div className="px-8 py-8 border-b mt-4">
            <h1 className="text-4xl font-extrabold tracking-tight">Kontak & Layanan</h1>
            <p className="text-muted-foreground mt-2">
              Hubungi tim editorial kami atau jelajahi layanan publikasi ARCES.
            </p>
          </div>

          {/* 3. SECTION LAYANAN (Grid Cards) */}
          <section>
            <div className="px-8 py-6 border-b  bg-zinc-50/30 dark:bg-zinc-900/10">
              <h2 className="text-2xl font-bold text-blue-500">Our Services</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3">
              <ServiceCard
                icon={<Zap className="h-6 w-6 text-blue-500" />}
                title="Fast-Track Publication"
                desc="Proses review kilat untuk artikel berkualitas tinggi dengan standar internasional."
                isLast={false}
              />
              <ServiceCard
                icon={<ShieldCheck className="h-6 w-6 text-blue-500" />}
                title="Proofreading & Editing"
                desc="Bantuan teknis penulisan dan sitasi sesuai template standar ARCES Journal."
                isLast={false}
              />
              <ServiceCard
                icon={<MessageSquare className="h-6 w-6 text-blue-500" />}
                title="Academic Consultation"
                desc="Konsultasi mengenai topik penelitian Informatics dan System Information."
                isLast={true}
              />
            </div>
          </section>

          {/* 4. SECTION KONTAK (Split Layout) */}
          <section className="border-t border-gray-200 dark:border-white/10 ">
            <div className="px-8 py-6 border-b  bg-zinc-50/30 dark:bg-zinc-900/10">
              <h2 className="text-2xl font-bold text-blue-500">Contact Information</h2>
            </div>
            <div className="flex-1 p-8 space-y-10 lg:border-r border-gray-200 dark:border-white/10">
              <div className="space-y-8">
                <ContactItem
                  icon={<Mail className="h-5 w-5" />}
                  label="Email Editorial"
                  value="editorial@arces.udinus.ac.id"
                />
                <ContactItem
                  icon={<MapPin className="h-5 w-5" />}
                  label="Office Location"
                  value="Gedung H, Universitas Dian Nuswantoro, Semarang, Indonesia"
                />
                <ContactItem
                  icon={<Phone className="h-5 w-5" />}
                  label="WhatsApp Support"
                  value="+62 812-XXXX-XXXX"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

// Sub-komponen agar kodingan rapi
function ServiceCard({
  icon,
  title,
  desc,
  isLast,
}: {
  icon: any
  title: string
  desc: string
  isLast: boolean
}) {
  return (
    <div
      className={`p-8 lg:p-10 flex flex-col gap-4 border-b md:border-b-0 ${!isLast ? 'md:border-r border-gray-200 dark:border-white/10' : ''}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  )
}

function ContactItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 text-blue-500">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
