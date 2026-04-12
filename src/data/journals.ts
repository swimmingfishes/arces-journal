export type JournalEditor = {
  name: string
  role: string
  institution: string
  photo: string
}

export type Journal = {
  id: number
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  websiteUrl: string
  focusScope: string
  sectionPolicies: string
  editors: JournalEditor[]
}

export const journals: Journal[] = [
  {
    id: 1,
    slug: 'jurnal-riset-teknologi-pengabdian-masyarakat',
    title: 'Jurnal Riset dan Teknologi dalam Pengabdian Masyarakat',
    shortDescription:
      'Jurnal ilmiah yang berfokus pada publikasi hasil kegiatan pengabdian kepada masyarakat yang berbasis pada riset dan penerapan teknologi.',
    fullDescription:
      'Jurnal Riset dan Teknologi dalam Pengabdian Masyarakat adalah jurnal ilmiah yang berfokus pada publikasi hasil kegiatan pengabdian kepada masyarakat yang berbasis pada riset dan penerapan teknologi. Jurnal ini menjadi wadah bagi para akademisi, peneliti, praktisi, dan mahasiswa untuk menyebarluaskan hasil karya dan inovasi yang memberikan solusi nyata terhadap permasalahan yang dihadapi masyarakat di berbagai bidang kehidupan.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Jurnal ini berfokus pada bidang pendidikan, kesehatan, lingkungan, sosial, ekonomi, pertanian, teknologi tepat guna, kewirausahaan, serta pemberdayaan masyarakat berbasis potensi lokal. Setiap artikel yang diterbitkan telah melalui proses seleksi dan peer review yang ketat untuk memastikan kualitas, orisinalitas, dan relevansi ilmiahnya.',
    sectionPolicies:
      'Setiap artikel yang dikirimkan harus merupakan karya orisinal yang belum pernah dipublikasikan sebelumnya. Artikel harus mengikuti panduan penulisan yang telah ditetapkan dan melalui proses review oleh minimal dua reviewer yang kompeten di bidangnya.',
    editors: [
      {
        name: 'Eko Hari Rachmawanto, M.Kom',
        role: 'Chief Editor',
        institution: 'Universitas Dian Nuswantoro',
        photo: '/foto1.png',
      },
      {
        name: 'Prof. Siti Rahayu',
        role: 'Associate Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Budi Santoso',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Maya Putri',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
  {
    id: 2,
    slug: 'jurnal-pengembangan-teknologi-ekonomi-bisnis-digital',
    title: 'Jurnal Pengembangan Teknologi, Ekonomi dan Bisnis Digital',
    shortDescription:
      'Jurnal yang diterbitkan oleh Lembaga ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
    fullDescription:
      'Jurnal Pengembangan Teknologi, Ekonomi dan Bisnis Digital diterbitkan oleh Lembaga ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak. Topik yang menarik meliputi biometrik, pemrosesan gambar, visi komputer, kecerdasan komputasi, logika fuzzy, dan teknologi kota pintar.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Berfokus pada penelitian di bidang sistem cerdas, rekayasa perangkat lunak, biometrik, pemrosesan gambar, visi komputer, penemuan pengetahuan dalam database, pengambilan informasi, kecerdasan komputasi, logika fuzzy, pemrosesan sinyal, pengenalan suara, dan teknologi kota pintar.',
    sectionPolicies:
      'Artikel yang dikirimkan harus relevan dengan fokus dan ruang lingkup jurnal. Naskah harus ditulis dalam bahasa Indonesia atau Inggris yang baik dan benar, mengikuti template yang disediakan, dan belum pernah dipublikasikan di tempat lain.',
    editors: [
      {
        name: 'Prof. Hendra Wijaya',
        role: 'Chief Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Rina Kusuma',
        role: 'Associate Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Agus Prasetyo',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Dewi Lestari',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
  {
    id: 3,
    slug: 'jurnal-pengabdian-masyarakat',
    title: 'Jurnal Pengabdian kepada Masyarakat',
    shortDescription:
      'Jurnal multidisiplin yang diterbitkan Lembaga ARCES yang berfokus pada hasil-hasil karya pengabdian masyarakat berbasis ilmu komputer.',
    fullDescription:
      'Jupkemas adalah jurnal multidisiplin yang diterbitkan Lembaga ARCES yang berfokus pada hasil-hasil karya pengabdian masyarakat serta jurnal nasional pengabdian masyarakat ini berbasis pada ilmu komputer. Pengiriman artikel tidak dipungut biaya, kemudian artikel yang diterima akan diterbitkan secara online dan dapat diakses secara gratis.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Berfokus pada hasil karya pengabdian masyarakat yang berbasis ilmu komputer dan teknologi informasi. Mencakup berbagai bidang multidisiplin yang berkaitan dengan penerapan teknologi untuk kepentingan masyarakat luas.',
    sectionPolicies:
      'Jurnal ini terbuka untuk semua penulis tanpa biaya publikasi. Artikel harus merupakan hasil kegiatan pengabdian kepada masyarakat yang nyata dan dapat dipertanggungjawabkan secara ilmiah.',
    editors: [
      {
        name: 'Dr. Cahyo Nugroho',
        role: 'Chief Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Fitri Handayani',
        role: 'Associate Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Eko Susanto',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Nur Aini',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
  {
    id: 4,
    slug: 'jurnal-komputasi-pengembangan-aplikasi',
    title: 'Jurnal Komputasi dan Pengembangan Aplikasi',
    shortDescription:
      'Jurnal yang berfokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
    fullDescription:
      'Jurnal Komputasi dan Pengembangan Aplikasi (Jukompak) diterbitkan oleh Lembaga ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak. Topik meliputi biometrik, pemrosesan gambar, visi komputer, kecerdasan komputasi, dan teknologi kota pintar.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Berfokus pada komputasi dan pengembangan aplikasi dalam konteks sistem cerdas dan rekayasa perangkat lunak. Mencakup topik seperti algoritma, struktur data, pengembangan aplikasi mobile, web, dan desktop.',
    sectionPolicies:
      'Naskah yang dikirimkan harus mengandung kontribusi ilmiah yang jelas dan signifikan. Setiap naskah akan melalui proses blind review oleh reviewer yang ahli di bidangnya.',
    editors: [
      {
        name: 'Prof. Bambang Setiawan',
        role: 'Chief Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Yuni Astuti',
        role: 'Associate Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Rudi Hermawan',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Sri Wahyuni',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
  {
    id: 5,
    slug: 'jurnal-aplikasi-teknologi-komputasi',
    title: 'Jurnal Aplikasi Teknologi dan Komputasi',
    shortDescription:
      'Jurnal yang diterbitkan oleh Organisasi ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak.',
    fullDescription:
      'Jurnal Aplikasi Teknologi dan Komputasi (Jatekom) diterbitkan oleh Organisasi ARCES yang fokus pada penelitian di bidang Sistem Cerdas dan Rekayasa Perangkat Lunak. Topik yang menarik meliputi biometrik, pemrosesan gambar, visi komputer, dan teknologi kota pintar.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Berfokus pada aplikasi teknologi dan komputasi dalam berbagai domain. Mencakup penerapan kecerdasan buatan, machine learning, Internet of Things, dan teknologi komputasi terkini.',
    sectionPolicies:
      'Artikel harus ditulis sesuai dengan format yang telah ditentukan. Proses review dilakukan secara double-blind untuk menjaga objektivitas penilaian.',
    editors: [
      {
        name: 'Dr. Anton Wibowo',
        role: 'Chief Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Indah Permata',
        role: 'Associate Editor',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Hadi Prasetyo',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Lina Marlina',
        role: 'Editorial Board',
        institution: 'Universitas ARCES',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
  {
    id: 6,
    slug: 'ijecar',
    title: 'International Journal of Engineering Computing Advanced Research',
    shortDescription:
      'International journal published by ARCES focusing on research in Engineering Computing Advanced Research.',
    fullDescription:
      'International Journal of Engineering Computing Advanced Research (IJECAR) is published by ARCES, which focuses on research in Engineering Computing Advanced Research. Topics include biometric, image processing, computer vision, knowledge discovery, computational intelligence, and smart city technology.',
    websiteUrl: 'https://journals.arces.org',
    focusScope:
      'Focuses on engineering computing and advanced research including biometric, image processing, computer vision, knowledge discovery in database, information retrieval, computational intelligence, fuzzy logic, signal processing, speech recognition, natural language processing, data mining, adaptive game AI, and smart city technology.',
    sectionPolicies:
      'Manuscripts must be written in English and follow the journal template. All submissions undergo double-blind peer review. The journal accepts original research articles, review articles, and short communications.',
    editors: [
      {
        name: 'Prof. Dr. James Wilson',
        role: 'Chief Editor',
        institution: 'ARCES Institution',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Sarah Johnson',
        role: 'Associate Editor',
        institution: 'ARCES Institution',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Michael Chen',
        role: 'Editorial Board',
        institution: 'ARCES Institution',
        photo: '/placeholder-avatar.png',
      },
      {
        name: 'Dr. Emma Davis',
        role: 'Editorial Board',
        institution: 'ARCES Institution',
        photo: '/placeholder-avatar.png',
      },
    ],
  },
]

export function getJournalById(id: number): Journal | undefined {
  return journals.find((j) => j.id === id)
}
