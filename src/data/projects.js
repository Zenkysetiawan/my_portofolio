// Data project. Teks dwibahasa ditulis { id: '...', en: '...' }.
// category: 'web' | 'sistem' | 'mobile' | 'ai'
// status:   'live' (ada demo) | 'case' (belum ada demo) | 'soon' (sedang dikerjakan)
// Kolom yang tidak diisi (misal repo, impact) otomatis tidak ditampilkan.
export const projects = [
  {
    id: 'ecosphere',
    category: 'sistem',
    status: 'live',
    title: 'EcoSphere',
    tagline: {
      id: 'Aplikasi edukasi lingkungan dengan EcoScore',
      en: 'Environmental education app with an EcoScore',
    },
    overview: {
      id: 'Aplikasi web edukasi lingkungan dengan fitur EcoScore untuk melacak aktivitas ramah lingkungan pengguna.',
      en: 'A web app for environmental education, with an EcoScore feature that tracks users’ eco-friendly activities.',
    },
    features: {
      id: [
        'EcoScore untuk melacak aktivitas ramah lingkungan',
        'Dashboard analitik untuk pengguna dan admin',
        'Sistem autentikasi',
        'Supabase sebagai database dan backend',
      ],
      en: [
        'EcoScore to track eco-friendly activities',
        'Analytics dashboards for users and admins',
        'Authentication system',
        'Supabase as database and backend',
      ],
    },
    role: { id: 'Full-stack developer', en: 'Full-stack developer' },
    impact: {
      id: 'Dipakai sebagai materi edukasi “Digitalisasi Aksi Lingkungan Siswa SMA” di SMAN 6 Merigi, Kepahiang (PKM Dosen S1 Informatika UNIVED, April 2026). Saya menjadi pemateri dan fasilitator yang memandu demonstrasi platformnya.',
      en: 'Used as teaching material for “Digitalizing High School Students’ Environmental Action” at SMAN 6 Merigi, Kepahiang (UNIVED Informatics community service program, April 2026). I was the speaker and facilitator who guided the platform demo.',
    },
    stack: ['React', 'Supabase', 'Tailwind CSS'],
    image: '/images/projects/ecosphere.png',
    demo: 'https://ecosphere-chi.vercel.app/',
    repo: null,
  },
  {
    id: 'smart-museum',
    category: 'sistem',
    status: 'live',
    title: 'Smart Museum',
    tagline: {
      id: 'Museum digital dengan pemindaian QR Code',
      en: 'Digital museum with QR code scanning',
    },
    overview: {
      id: 'Platform museum digital berbasis web dengan pemindaian QR Code untuk mengakses informasi koleksi secara real-time.',
      en: 'A web-based digital museum platform with QR code scanning to access collection information in real time.',
    },
    features: {
      id: [
        'Pemindaian QR Code untuk membuka informasi koleksi',
        'Autentikasi multi-role (Admin / User)',
        'Manajemen konten',
        'Pencarian koleksi',
        'Kuis interaktif',
        'Deployment lewat Vercel',
      ],
      en: [
        'QR code scanning to open collection information',
        'Multi-role authentication (Admin / User)',
        'Content management',
        'Collection search',
        'Interactive quizzes',
        'Deployed on Vercel',
      ],
    },
    role: { id: 'Full-stack developer', en: 'Full-stack developer' },
    stack: ['Next.js', 'Supabase', 'Vercel'],
    image: '/images/projects/smart-museum.png',
    demo: 'https://smart-museum-app.vercel.app/',
    repo: null,
  },
  {
    id: 'personal-finance',
    category: 'mobile',
    status: 'case',
    title: 'Personal Finance App',
    tagline: {
      id: 'Aplikasi mobile pengelola keuangan pribadi',
      en: 'Mobile app for personal money management',
    },
    overview: {
      id: 'Aplikasi mobile manajemen keuangan pribadi dengan pencatatan arus kas dan perencanaan Financial Goals.',
      en: 'A personal finance mobile app with cash-flow tracking and Financial Goals planning.',
    },
    features: {
      id: [
        'Pencatatan arus kas',
        'Perencanaan Financial Goals',
        'Visualisasi data keuangan interaktif (charts)',
        'Firebase untuk autentikasi dan database',
      ],
      en: [
        'Cash-flow tracking',
        'Financial Goals planning',
        'Interactive financial charts',
        'Firebase for authentication and database',
      ],
    },
    role: { id: 'Mobile developer', en: 'Mobile developer' },
    stack: ['Flutter', 'Dart', 'Firebase'],
    image: null,
    demo: null,
    repo: null,
  },
  {
    id: 'marketplace',
    category: 'web',
    status: 'soon',
    title: 'Marketplace & E-Commerce',
    tagline: {
      id: 'Web jual-beli dengan transaksi digital',
      en: 'Buy-and-sell web with digital transactions',
    },
    stack: ['React', 'Vue.js', 'PostgreSQL'],
    image: null,
  },
  {
    id: 'rag',
    category: 'ai',
    status: 'soon',
    title: 'RAG Chatbot',
    tagline: {
      id: 'Tanya-jawab dari dokumen sendiri',
      en: 'Question answering over your own documents',
    },
    stack: ['LLM', 'RAG', 'Python'],
    image: null,
  },
]
