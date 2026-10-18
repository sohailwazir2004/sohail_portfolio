// Everything about me in one place. Edit text here; the components read from this file.
import photo from '../assets/profile.webp';

export const profile = {
  name: 'Muhammad Sohail',
  shortName: 'M Sohail',
  siteName: 'Sohail Portfolio',
  photo,
  location: 'Islamabad, Pakistan',
  email: 'sohailwazir2004@gmail.com',
  github: 'https://github.com/sohailwazir2004',
  linkedin: 'https://www.linkedin.com/in/muhammad-sohail-2381592bb',
  resume: '/resume.pdf', // TODO: add your CV as public/resume.pdf
  liveSite: 'https://my-portfolio-three-silk-27.vercel.app',

  // Rotating lines under my name in the hero.
  roles: ['Software Engineering Student', 'Web Developer', 'Learning DevOps & AI', 'Founder of Preghal Fragrances'],
  headline:
    'Software Engineering student at COMSATS University Islamabad. I build for the web, I run my own perfume brand, and I’m learning DevOps and AI.',
  openTo: 'Open to remote work, internships, part-time and freelance roles worldwide.',

  about: [
    'I’m Sohail, a Software Engineering student at COMSATS University Islamabad (CUI), now in my 5th semester. I started with Java and object-oriented programming, and today I teach OOP to other students at the Software Engineering Society.',
    'Most of my building happens on the web with HTML, CSS, JavaScript and React. In 2026 I started Preghal Fragrances, an online perfume brand. Running it taught me things a classroom can’t: SEO, product listings, making promo videos, and working on a site that real customers use.',
    'Right now I’m learning Linux, DevOps fundamentals and AI engineering. My goal is to become a strong software engineer first, and later build companies of my own.',
  ],

  quickFacts: [
    { label: 'Studying', value: 'BS Software Engineering, CUI' },
    { label: 'Semester', value: '5th (batch FA24)' },
    { label: 'Based in', value: 'Islamabad, Pakistan' },
    { label: 'Languages', value: 'Urdu, Pashto, English' },
  ],
};
