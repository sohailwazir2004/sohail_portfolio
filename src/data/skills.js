// Skills grouped by category. `note` is an honest level hint shown under the group title.
// No percentage bars on purpose: "73% JavaScript" doesn't mean anything.
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiFlask,
  SiPython,
  SiSpring,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiLinux,
  SiGit,
  SiGithub,
  SiVercel,
  SiClaude,
  SiOpenjdk,
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { FaCloud, FaInfinity, FaRobot, FaCertificate } from 'react-icons/fa6';

export const skillGroups = [
  {
    title: 'Frontend',
    note: 'What I build with most',
    items: [
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: SiCss, color: '#1572b6' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#f7df1e' },
      { name: 'React', icon: SiReact, color: '#61dafb' },
    ],
  },
  {
    title: 'Languages',
    note: 'Java is my strongest; I teach OOP in it',
    items: [
      { name: 'Java (OOP)', icon: SiOpenjdk, color: '#ed8b00' },
      { name: 'Python', icon: SiPython, color: '#3776ab' },
    ],
  },
  {
    title: 'Backend & Data',
    note: 'Basics',
    items: [
      { name: 'Flask APIs (basic)', icon: SiFlask, color: '#a3a3a3' },
      { name: 'SQL (basics)', icon: TbSql, color: '#4479a1' },
      { name: 'Spring (intro)', icon: SiSpring, color: '#6db33f' },
    ],
  },
  {
    title: 'Data & AI',
    note: 'Learning',
    items: [
      { name: 'NumPy', icon: SiNumpy, color: '#4dabcf' },
      { name: 'Pandas', icon: SiPandas, color: '#a78bfa' },
      { name: 'Jupyter', icon: SiJupyter, color: '#f37626' },
    ],
  },
  {
    title: 'Tools & OS',
    note: 'Daily drivers',
    items: [
      { name: 'Linux (basics)', icon: SiLinux, color: '#fcc624' },
      { name: 'Git', icon: SiGit, color: '#f05032' },
      { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
      { name: 'VS Code', icon: VscVscode, color: '#22a6f2' },
      { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
    ],
  },
  {
    title: 'AI tools',
    note: 'AI-assisted development',
    items: [{ name: 'Claude Code', icon: SiClaude, color: '#d97757' }],
  },
];

// Shown separately so nobody mistakes these for skills I already have.
export const learning = [
  { name: 'DevOps fundamentals', icon: FaInfinity },
  { name: 'Cloud basics', icon: FaCloud },
  { name: 'AI engineering', icon: FaRobot },
  { name: 'Claude Architect path (Panaversity AI Agent Factory)', icon: FaCertificate },
];

// Icons for the scrolling marquee in the Skills section.
export const marquee = skillGroups.flatMap((g) => g.items);
