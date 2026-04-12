'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import Link from 'next/link'

export default function TentangPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <section className="w-full px-6 lg:px-46">
        <div className="mx-auto md:border-x border-gray-200 dark:border-white/10 min-h-screen">
          {/* 1. TOP BAR */}
          <div className="px-8 pt-10">
            <Link href="/">
              <Button variant="ghost" size="lg" className="flex items-center pl-0 gap-2">
                <ArrowLeftIcon className="h-4 w-4" /> Back to home
              </Button>
            </Link>
          </div>
          {/* 2. HEADER */}
          <div className="px-8 py-8 border-b border-gray-200 dark:border-white/10 mt-4">
            <h1 className="text-4xl font-extrabold tracking-tight">Tentang</h1>
          </div>
          {/* SEJARAH */}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Sejarah</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-b ">
            <div className="flex flex-col md:border-r border-gray-200 dark:border-white/10">
              <div className="p-8 pb-0">
                <div className="w-full h-56 overflow-hidden relative group">
                  <img
                    src="/udin.jpg"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Sejarah ARCES"
                  />

                  <div className="absolute bottom-0 right-0 bg-background px-6 py-3 rounded-tl-2xl ">
                    <p className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-gray-700">
                      ARCES.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 pb-0 md:pb-8 space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Association Research Computing Engineering Science (ARCES) bermula dari inisiatif
                  sekelompok akademisi, peneliti, dan praktisi teknologi yang memiliki kepedulian
                  terhadap pesatnya perkembangan ilmu komputasi, rekayasa, dan sains di era digital.
                  Pada awal pembentukannya, sekitar dekade 2020-an, para pendiri melihat adanya
                  kebutuhan akan sebuah wadah kolaboratif yang mampu mengintegrasikan berbagai
                  disiplin ilmu untuk menghasilkan inovasi yang tidak hanya bersifat teoritis,
                  tetapi juga aplikatif dan berdampak langsung bagi masyarakat.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Gagasan pembentukan ARCES muncul dari berbagai forum diskusi ilmiah, seminar, dan
                  kegiatan penelitian bersama yang mempertemukan para ahli dari bidang teknologi
                  informasi, teknik, dan sains terapan. Dari interaksi tersebut, muncul kesadaran
                  bahwa kolaborasi lintas disiplin merupakan kunci utama dalam menjawab tantangan
                  global seperti transformasi digital, keamanan data, efisiensi energi, serta
                  pengembangan sistem cerdas berbasis data.
                </p>
              </div>
            </div>
            <div className="p-8 pt-4 md:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
              <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                <p>
                  Secara resmi, ARCES kemudian dibentuk sebagai organisasi yang berfokus pada
                  penguatan riset dan inovasi berbasis teknologi. Pada tahap awal, kegiatan ARCES
                  lebih banyak berfokus pada penyelenggaraan seminar ilmiah, workshop, serta
                  kolaborasi penelitian skala kecil. Seiring berjalannya waktu, organisasi ini mulai
                  berkembang dengan memperluas jaringan ke berbagai perguruan tinggi, lembaga
                  penelitian, dan mitra industri, baik di tingkat nasional maupun internasional.
                </p>

                <p>
                  Memasuki fase pengembangan, ARCES mulai aktif dalam publikasi ilmiah, pengembangan
                  proyek penelitian terapan, serta pelaksanaan program pelatihan untuk meningkatkan
                  kompetensi sumber daya manusia di bidang komputasi dan rekayasa. Selain itu, ARCES
                  juga mulai berperan dalam mendukung implementasi teknologi di berbagai sektor,
                  seperti pertanian berbasis IoT, sistem kesehatan digital, serta pengembangan
                  aplikasi berbasis kecerdasan buatan.
                </p>

                <p>
                  Hingga saat ini, ARCES terus berkembang sebagai organisasi yang adaptif terhadap
                  perubahan teknologi dan kebutuhan masyarakat. Dengan semangat kolaborasi dan
                  inovasi, ARCES berupaya menjadi pusat pengembangan riset unggulan yang mampu
                  memberikan kontribusi nyata dalam kemajuan ilmu pengetahuan, teknologi, dan
                  pembangunan berkelanjutan.
                </p>
              </div>
            </div>
          </div>

          {/* VISI MISI */}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Visi & Misi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-b ">
            <div className="flex flex-col md:border-r border-gray-200 dark:border-white/10">
              <div className="p-8 pb-0 md:pb-8 space-y-6">
                <h2 className="text-2xl font-bold text-blue-500">Visi</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Menjadi organisasi unggulan dalam pengembangan riset, inovasi, dan kolaborasi di
                  bidang komputasi, rekayasa, dan sains yang berkontribusi nyata terhadap kemajuan
                  teknologi serta peningkatan kualitas hidup masyarakat di tingkat nasional maupun
                  global.
                </p>
              </div>
            </div>
            <div className="p-8 pt-4 md:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
              <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
                {/* Judul Misi */}
                <h2 className="text-2xl font-bold text-blue-500 ">Misi</h2>

                {/* List Misi 1-7 */}
                <ol className="list-none p-0 m-0 space-y-6">
                  {[
                    'Menyelenggarakan penelitian kolaboratif lintas disiplin di bidang komputasi, rekayasa, dan sains.',
                    'Mendorong publikasi ilmiah mahasiswa dan akademisi pada tingkat nasional maupun internasional.',
                    'Menyelenggarakan seminar, workshop, dan pelatihan teknologi secara berkala.',
                    'Membangun jaringan kerjasama dengan institusi pendidikan, lembaga riset, dan mitra industri.',
                    'Mengembangkan proyek teknologi terapan yang solutif bagi permasalahan di masyarakat.',
                    'Meningkatkan kompetensi sumber daya manusia dalam penguasaan teknologi mutakhir.',
                    'Menjadi pusat informasi dan rujukan pengembangan inovasi berbasis kecerdasan buatan dan sistem cerdas.',
                  ].map((misi, index) => (
                    <li key={index} className="flex gap-5 items-start">
                      {/* Nomor Custom */}
                      <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm border border-blue-100 dark:border-blue-900/30">
                        {index + 1}
                      </span>

                      {/* Teks Misi */}
                      <p className="m-0 mt-0 leading-relaxed text-justify text-gray-700 dark:text-gray-300">
                        {misi}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Peran strategi arces */}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Peran Strategis Arces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* BARIS 1 (Tetap Sama) */}
            <GridTextCard
              title="Sebagai Pusat Kolaborasi Riset Multidisiplin"
              desc="Menjadi organisasi unggulan dalam pengembangan riset, inovasi, dan kolaborasi di bidang komputasi, rekayasa, dan sains yang berkontribusi nyata terhadap kemajuan teknologi serta peningkatan kualitas hidup masyarakat di tingkat nasional maupun global."
            />
            <GridTextCard
              title="Penggerak Inovasi Teknologi"
              desc="ARCES menjadi motor pengembangan dan penerapan teknologi modern seperti kecerdasan buatan (AI), Internet of Things (IoT), big data, dan keamanan siber guna mendukung transformasi digital di berbagai sektor."
            />
            <GridTextCard
              title="Peningkatan Kualitas Sumber Daya Manusia (SDM)"
              desc="Melalui pelatihan, workshop, seminar, dan program edukasi, ARCES berkontribusi dalam meningkatkan kompetensi dan daya saing SDM di bidang teknologi dan sains."
            />

            {/* BARIS 2 (Tetap Sama) */}
            <GridTextCard
              title="Fasilitator Diseminasi Ilmu Pengetahuan"
              desc="ARCES berperan aktif dalam publikasi ilmiah, penyelenggaraan konferensi, serta penyebarluasan hasil penelitian agar dapat dimanfaatkan secara luas oleh akademisi, industri, dan masyarakat."
            />
            <GridTextCard
              title="Mitra Strategis bagi Pemerintah dan Industri"
              desc="ARCES dapat menjadi mitra dalam perumusan kebijakan berbasis riset serta pengembangan solusi teknologi yang sesuai dengan kebutuhan industri dan pembangunan nasional."
            />
            <GridTextCard
              title="Pengembang Solusi Berbasis Teknologi"
              desc="ARCES berperan dalam merancang dan mengimplementasikan sistem serta aplikasi yang dapat menyelesaikan berbagai permasalahan, seperti di bidang pertanian cerdas, kesehatan digital, pendidikan, dan lingkungan."
            />

            {/* BARIS 3 */}
            <div id="kotak-4">
              <GridTextCard
                title="Penguat Ekosistem Riset dan Inovasi Berkelanjutan"
                desc="ARCES mendukung terciptanya ekosistem riset yang berkelanjutan melalui kolaborasi lintas institusi, pengembangan jejaring, serta peningkatan kapasitas penelitian secara berkesinambungan."
              />
            </div>

            <div className="lg:col-span-2 group relative flex overflow-hidden">
              <div className="w-full h-full relative bg-gray-100 ">
                <img
                  src="/udin.jpg"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="ARCES Strategic Role"
                />
              </div>
            </div>
          </div>

          {/* Alamat lengkap website arces */}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Alamat lengkap website arces</h2>
          </div>
          <div className="p-8 border-b border-gray-200 dark:border-white/10 bg-zinc-50/5 dark:bg-transparent">
            <div className="max-w-none">
              <p className="text-lg leading-[1.8] text-gray-700 dark:text-gray-300 text-justify">
                Website resmi ARCES yang beralamat di www.arces.org merupakan platform digital yang
                digunakan sebagai media utama dalam penyebaran informasi, publikasi ilmiah, serta
                komunikasi organisasi. Website ini berfungsi sebagai pusat informasi yang
                menyediakan berbagai konten terkait kegiatan ARCES, seperti program penelitian,
                seminar, workshop, pelatihan, serta kolaborasi ilmiah di bidang komputasi, rekayasa,
                dan sains.
              </p>
              <br />
              <p className="text-lg leading-[1.8] text-gray-700 dark:text-gray-300 text-justify">
                Melalui website tersebut, pengguna dapat mengakses berbagai layanan, termasuk
                publikasi jurnal ilmiah berbasis sistem manajemen penerbitan digital yang mendukung
                proses editorial dan diseminasi penelitian secara terbuka dan terstruktur . Selain
                itu, website ini juga menjadi sarana untuk memperluas jejaring kolaborasi antara
                akademisi, peneliti, dan praktisi industri baik di tingkat nasional maupun
                internasional.
              </p>
              <br />
              <p className="text-lg leading-[1.8] text-gray-700 dark:text-gray-300 text-justify">
                Dengan tampilan yang informatif dan terintegrasi, www.arces.org  tidak hanya
                berfungsi sebagai media informasi, tetapi juga sebagai representasi identitas
                digital ARCES dalam mendukung pengembangan riset, inovasi, dan transformasi
                teknologi berbasis ilmu pengetahuan.
              </p>
            </div>
          </div>

          {/* Alamat lokasi fisik arces*/}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Alamat lokasi fisik arces</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b ">
            <div className="flex flex-col md:border-r border-gray-200 dark:border-white/10">
              <div className="p-8 pb-0 md:pb-8 space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Kantor pusat Association Research Computing Engineering Science (ARCES) beralamat
                  di Jl. Dempel Berlian V Nomor 69, Kelurahan Muktiharjo Kidul, Kecamatan
                  Pedurungan, Kota Semarang, Provinsi Jawa Tengah, Kode Pos 50197. Lokasi ini berada
                  di kawasan permukiman yang berkembang serta memiliki akses yang cukup strategis
                  karena terhubung dengan jalur utama di wilayah timur Kota Semarang, sehingga
                  memudahkan mobilitas anggota, mitra, maupun tamu yang berkunjung.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Secara geografis, wilayah Pedurungan dikenal sebagai salah satu kawasan penyangga
                  Kota Semarang yang dekat dengan pusat aktivitas pendidikan, perdagangan, dan
                  industri. Hal ini menjadikan kantor ARCES memiliki posisi yang potensial untuk
                  menjalin kerja sama dengan berbagai institusi, seperti perguruan tinggi, lembaga
                  penelitian, serta sektor industri yang berada di sekitar wilayah Semarang dan
                  sekitarnya.
                </p>
              </div>
            </div>
            <div className="p-8 pt-4 md:pt-8 flex flex-col space-y-6 bg-zinc-50/10">
              <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                <p>
                  Fasilitas kantor ARCES dirancang untuk mendukung berbagai aktivitas organisasi,
                  antara lain ruang kerja administratif, ruang diskusi dan rapat, serta area yang
                  digunakan untuk kegiatan ilmiah seperti workshop, pelatihan teknis, dan forum
                  kajian riset. Lingkungan kerja yang kondusif ini memungkinkan terjadinya interaksi
                  yang produktif antara peneliti, akademisi, dan praktisi dalam mengembangkan ide,
                  melakukan eksperimen, serta merancang solusi berbasis teknologi.
                </p>

                <p>
                  Selain sebagai pusat operasional, kantor ini juga berfungsi sebagai pusat
                  koordinasi program dan kegiatan ARCES, termasuk pengelolaan penelitian
                  kolaboratif, publikasi ilmiah, serta pengembangan jejaring kemitraan. Dengan
                  dukungan infrastruktur yang memadai dan lokasi yang strategis, kantor ARCES
                  diharapkan mampu menjadi hub inovasi dan pengembangan ilmu pengetahuan yang
                  berkontribusi secara nyata terhadap kemajuan teknologi dan pembangunan
                  berkelanjutan di tingkat lokal, nasional, hingga internasional.
                </p>
              </div>
            </div>
          </div>

          {/* Alamat via google maps */}
          <div className="px-8 py-10 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-blue-500">Alamat via google maps</h2>
          </div>
          {/* Container Utama Alamat */}
          <div className="flex flex-col">
            <div className="p-8 border-b border-gray-200 dark:border-white/10 pb-8 lg:pb-12">
              <div className="w-full h-[400px] md:h-[500px] overflow-hidden relative group">
                <iframe
                  title="Lokasi Sekretariat ARCES"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d110.455669!3d-6.9761394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ccb7bdb1753%3A0x435506b778686f3!2sJl.+Dempel+Berlian+V%2C+Muktiharjo+Kidul%2C+Kec.+Pedurungan%2C+Kota+Semarang%2C+Jawa+Tengah+50197!5e0!3m2!1sid!2sid!4v1715421234567!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-700"
                />
              </div>
            </div>

            {/* 2. DUA GRID TEKS (Bawah Maps) */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-gray-200 dark:border-white/10">
              {/* GRID KIRI */}
              <div className="p-8 md:border-r border-gray-200 dark:border-white/10 space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Lokasi Association Research Computing Engineering Science (ARCES) telah
                  terintegrasi secara digital melalui layanan Google Maps, yang dapat diakses
                  melalui tautan berikut:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Melalui tautan tersebut, pengguna akan diarahkan langsung ke titik koordinat
                  kantor ARCES yang berlokasi di Jl. Dempel Berlian V Nomor 69, Muktiharjo Kidul,
                  Pedurungan, Kota Semarang, Jawa Tengah, 50197. Integrasi ini memungkinkan
                  identifikasi lokasi secara presisi berbasis sistem Global Positioning System
                  (GPS), sehingga memudahkan siapa pun untuk menemukan posisi kantor dengan akurat
                  tanpa kesalahan navigasi.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Platform Google Maps menyediakan berbagai fitur pendukung yang sangat membantu, di
                  antaranya navigasi rute otomatis dari lokasi pengguna, pilihan moda transportasi
                  (kendaraan pribadi, sepeda motor, transportasi umum, maupun berjalan kaki),
                  estimasi waktu tempuh secara real-time, serta informasi kondisi lalu lintas
                  terkini. Selain itu, pengguna juga dapat melihat tampilan visual lokasi melalui
                  peta standar, citra satelit, maupun fitur Street View untuk mendapatkan gambaran
                  lingkungan sekitar kantor ARCES secara lebih nyata.
                </p>
              </div>

              {/* GRID KANAN */}
              <div className="p-8 space-y-6 bg-zinc-50/10">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Dari sisi aksesibilitas, lokasi ARCES dapat dijangkau melalui berbagai jalur utama
                  di wilayah timur Kota Semarang. Pengguna yang berasal dari pusat kota, kawasan
                  industri, maupun area pendidikan dapat dengan mudah merencanakan perjalanan dengan
                  bantuan sistem navigasi digital yang terintegrasi. Fitur berbagi lokasi (share
                  location) juga memungkinkan koordinasi yang lebih efisien antara anggota tim,
                  mitra kerja, maupun tamu yang akan berkunjung.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Selain sebagai alat navigasi, keberadaan ARCES di Google Maps juga memperkuat
                  identitas digital organisasi, meningkatkan visibilitas publik, serta mendukung
                  profesionalitas dalam penyampaian informasi lokasi. Hal ini menjadi bagian penting
                  dalam mendukung kegiatan kolaborasi, kunjungan kerja, pelaksanaan pelatihan, serta
                  berbagai aktivitas ilmiah yang diselenggarakan oleh ARCES.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                  Dengan dukungan teknologi pemetaan digital ini, ARCES mampu menghadirkan kemudahan
                  akses, efisiensi mobilitas, serta konektivitas yang lebih baik dengan berbagai
                  pihak di tingkat lokal, nasional, maupun internasional.
                </p>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </section>
    </main>
  )
}

// function StatBox({
//   label,
//   value,
//   isLast = false,
// }: {
//   label: string
//   value: string
//   isLast?: boolean
// }) {
//   return (
//     <div
//       className={`p-8 text-center ${!isLast ? 'border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/10' : ''}`}
//     >
//       <p className="text-3xl font-black text-blue-600">{value}</p>
//       <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mt-2">
//         {label}
//       </p>
//     </div>
//   )
// }

function GridTextCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 border-b border-r border-gray-200 dark:border-white/10 flex flex-col gap-4 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify">{desc}</p>
    </div>
  )
}
