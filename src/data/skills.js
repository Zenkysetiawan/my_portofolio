import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import { FiCpu, FiDatabase, FiMessageSquare, FiZap } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDart,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiPostman,
} from "react-icons/si";

export const skillGroups = [
  {
    key: "languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Dart", icon: SiDart },
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
    ],
  },
  {
    key: "frameworks",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Flutter", icon: SiFlutter },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    key: "database",
    items: [
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscVscode },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "Figma", icon: SiFigma },
      { name: "Postman", icon: SiPostman },
    ],
  },
  {
    key: "learning",
    learning: true,
    items: [
      { name: "Machine Learning", icon: FiCpu },
      { name: "RAG", icon: FiDatabase },
      { name: "LLM", icon: FiMessageSquare },
      { name: "AI Agents", icon: FiZap },
    ],
  },
];
