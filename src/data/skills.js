import {
  SiJavascript, SiTypescript, SiPython, SiDart, SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiVuedotjs, SiNodedotjs, SiExpress, SiFlutter, SiTailwindcss,
  SiMysql, SiPostgresql, SiSupabase, SiFirebase,
  SiGit, SiGithub, SiVercel, SiNetlify, SiFigma, SiPostman,
} from 'react-icons/si'
import { FiMonitor, FiSmartphone, FiCpu, FiVideo } from 'react-icons/fi'
import { FaCode, FaBrain, FaRobot, FaDatabase, FaSearch } from 'react-icons/fa'

// ---------- Layanan: apa yang bisa saya kerjakan ----------
export const services = [
  {
    id: 'web',
    icon: FiMonitor,
    title: { id: 'Web Development', en: 'Web Development' },
    desc: {
      id: 'Website dan aplikasi web yang rapi, cepat, dan mudah dipakai: dari landing page sampai sistem dengan database dan login.',
      en: 'Clean, fast, easy-to-use websites and web apps: from landing pages to systems with a database and login.',
    },
    tags: ['React', 'Next.js', 'Vue.js', 'Supabase'],
  },
  {
    id: 'mobile',
    icon: FiSmartphone,
    title: { id: 'Mobile App', en: 'Mobile App' },
    desc: {
      id: 'Aplikasi mobile lintas platform dengan Flutter, lengkap dengan autentikasi dan database di Firebase.',
      en: 'Cross-platform mobile apps with Flutter, complete with authentication and a Firebase database.',
    },
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    id: 'ai',
    icon: FiCpu,
    title: { id: 'AI & RAG', en: 'AI & RAG' },
    desc: {
      id: 'Sedang saya dalami: machine learning, LLM, RAG, dan AI agents, untuk membuat aplikasi yang bisa menjawab dari data sendiri.',
      en: 'Currently diving deep: machine learning, LLMs, RAG, and AI agents, to build apps that answer from your own data.',
    },
    tags: ['Machine Learning', 'RAG', 'LLM'],
    learning: true,
  },
  {
    id: 'content',
    icon: FiVideo,
    title: { id: 'Konten Teknologi', en: 'Tech Content' },
    desc: {
      id: 'Membuat konten pendek yang menjelaskan teknologi dengan bahasa sederhana untuk TikTok dan Instagram.',
      en: 'Short-form content that explains technology in simple words, for TikTok and Instagram.',
    },
    tags: ['TikTok', 'Instagram'],
  },
]

// ---------- Teknologi yang dipakai (sesuai CV) ----------
export const skillGroups = [
  {
    id: 'languages',
    title: { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
    items: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Python', icon: SiPython },
      { name: 'Dart', icon: SiDart },
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
    ],
  },
  {
    id: 'frameworks',
    title: { id: 'Framework & Library', en: 'Frameworks & Libraries' },
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Vue.js', icon: SiVuedotjs },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express.js', icon: SiExpress },
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    id: 'data',
    title: { id: 'Database & Cloud', en: 'Database & Cloud' },
    items: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    id: 'tools',
    title: { id: 'Tools & Platform', en: 'Tools & Platforms' },
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: FaCode },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Netlify', icon: SiNetlify },
      { name: 'Figma', icon: SiFigma },
      { name: 'Postman', icon: SiPostman },
    ],
  },
  {
    id: 'learning',
    learning: true,
    title: { id: 'Sedang Dipelajari', en: 'Currently Learning' },
    items: [
      { name: 'Machine Learning', icon: FaBrain },
      { name: 'RAG', icon: FaSearch },
      { name: 'LLM', icon: FaDatabase },
      { name: 'AI Agents', icon: FaRobot },
    ],
  },
]
