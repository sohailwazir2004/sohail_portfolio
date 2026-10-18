// Experience, leadership and activities for the timeline.
import { FaStore, FaChalkboardUser, FaTrophy, FaPeopleGroup, FaRobot } from 'react-icons/fa6';
import { TbCricket } from 'react-icons/tb';

export const experience = [
  {
    title: 'Founder',
    org: 'Preghal Fragrances',
    link: 'https://preghalfragrances.com',
    period: '2026 – Present',
    icon: FaStore,
    points: [
      'Launched and run an online-only perfume brand from Islamabad, selling a five-fragrance collection across Pakistan with courier delivery.',
      'Work on the brand’s e-commerce site with a friend who originally built it: I contribute code, improve on-page SEO, and set up product listings, shipping and return policies in Google Merchant Center.',
      'Plan and produce promotional videos and marketing content.',
    ],
  },
  {
    title: 'OOP Instructor',
    org: 'Software Engineering Society, CUI',
    period: null,
    icon: FaChalkboardUser,
    points: [
      'Teach object-oriented programming in Java to fellow students, explaining core concepts with practical examples.',
    ],
  },
  {
    title: 'Learner',
    org: 'Panaversity · AI Agent Factory',
    period: 'In progress',
    icon: FaRobot,
    points: ['Working through the Anthropic Claude certification path (Claude Architect) and AI agent development.'],
  },
  {
    title: 'Chairperson',
    org: 'CUI Sports Society',
    period: null,
    icon: FaTrophy,
    points: ['Lead the university sports society.'],
  },
  {
    title: 'Male Coordinator',
    org: 'CS Sports Society, CUI',
    period: null,
    icon: FaPeopleGroup,
    points: ['Coordinate sports activities for the Computer Science department.'],
  },
  {
    title: 'Captain',
    org: 'CS Department Cricket Team',
    period: null,
    icon: TbCricket,
    points: ['Captain the CS department cricket team and play for the COMSATS University Islamabad cricket team.'],
  },
  {
    title: 'Member',
    org: 'AI Society & IEEE Student Branch, CUI',
    period: null,
    icon: FaPeopleGroup,
    points: ['Member of the university AI Society and the IEEE Student Branch.'],
  },
];

export const education = {
  degree: 'BS Software Engineering',
  school: 'COMSATS University Islamabad (CUI)',
  period: '2024 – 2028 (expected)',
  details: 'Batch FA24 · currently in 5th semester',
  focus: 'Focus on full-stack development, OOP principles, and data structures',
};
