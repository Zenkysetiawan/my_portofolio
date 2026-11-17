// Perjalanan, urutan TERBARU di atas.
// type: 'education' | 'organization' | 'mentoring' | 'community' | 'achievement' | 'certification'
//
// CARA MENAMBAH: salin satu blok { ... }, tempel di posisi yang sesuai urutan waktu, lalu ganti isinya.
// Contoh sertifikasi (tanpa desc, tampil ringkas):
//   { when: { id: '2025', en: '2025' }, type: 'certification',
//     title: { id: 'Nama Sertifikat', en: 'Certificate Name' }, place: 'Penyelenggara' },
// Contoh pengalaman mentor:
//   { when: { id: '2026', en: '2026' }, type: 'mentoring',
//     title: { id: 'Mentor Web Development', en: 'Web Development Mentor' }, place: 'Nama Komunitas',
//     desc: { id: 'Apa yang kamu lakukan.', en: 'What you did.' } },
export const journey = [
  {
    when: { id: 'Apr 2026', en: 'Apr 2026' },
    type: 'community',
    title: { id: 'Pemateri & Fasilitator Utama, PKM EcoSphere', en: 'Main Speaker & Facilitator, EcoSphere PKM' },
    place: 'SMAN 6 Merigi, Kepahiang',
    desc: {
      id: 'Bersama dosen membawakan edukasi Digitalisasi Aksi Lingkungan Siswa SMA lewat platform EcoSphere, dan memandu demonstrasinya.',
      en: 'Worked with lecturers on a high-school session about digitalizing environmental action through the EcoSphere platform, and guided the demo.',
    },
  },
  {
    when: { id: '2025 – 2026', en: '2025 – 2026' },
    type: 'organization',
    title: { id: 'Wakil Ketua Umum', en: 'Vice Chair' },
    place: 'DE CODE Bengkulu',
    desc: {
      id: 'Mendampingi ketua umum mengelola arah organisasi, mengoordinasikan antardivisi, dan mengawasi pelaksanaan program kerja.',
      en: 'Supported the chair in steering the organization, coordinating divisions, and overseeing programs and activities.',
    },
  },
  {
    when: { id: '2025', en: '2025' },
    type: 'achievement',
    title: { id: 'Juara 1 & Best Project, Bootcamp Batch 3', en: '1st Place & Best Project, Bootcamp Batch 3' },
    place: 'DE CODE Bengkulu',
    desc: {
      id: 'Terpilih sebagai pemenang utama dan proyek terbaik dari semua divisi (Web, Mobile, Cyber Security) lewat aplikasi mobile full-stack dengan Flutter, Dart, dan Firebase.',
      en: 'Chosen as overall winner and best project across all divisions (Web, Mobile, Cyber Security) with a full-stack mobile app built with Flutter, Dart, and Firebase.',
    },
  },
  {
    when: { id: '2025', en: '2025' },
    type: 'certification',
    title: { id: 'IT Specialist: Python', en: 'IT Specialist: Python' },
    place: 'Certiport / Pearson VUE',
  },
  {
    when: { id: '2025', en: '2025' },
    type: 'certification',
    title: { id: 'Python Essentials', en: 'Python Essentials' },
    place: 'Cisco Networking Academy',
  },
  {
    when: { id: '2024 – 2025', en: '2024 – 2025' },
    type: 'organization',
    title: { id: 'Leader Graphic Design', en: 'Graphic Design Leader' },
    place: 'DE CODE Bengkulu',
    desc: {
      id: 'Memimpin tim desain grafis: aset visual, identitas brand, dan kebutuhan publikasi media sosial untuk seluruh kegiatan organisasi.',
      en: 'Led the graphic design team: visual assets, brand identity, and social media publishing for all organization activities.',
    },
  },
  {
    when: { id: 'Agu 2024 – sekarang', en: 'Aug 2024 – now' },
    type: 'education',
    title: { id: 'S1 Informatika', en: 'B.Sc. Informatics' },
    place: 'Universitas Dehasen Bengkulu',
  },
]
