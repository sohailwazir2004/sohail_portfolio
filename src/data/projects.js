// My projects. `featured: true` puts a project in the big cards at the top.
// `images` are screenshots; projects without a live site get a generated gradient cover instead.
import preghalDesktop from '../assets/projects/preghal-desktop.webp';
import preghalCollection from '../assets/projects/preghal-collection.webp';
import preghalProduct from '../assets/projects/preghal-product.webp';
import preghalMobile from '../assets/projects/preghal-mobile.webp';
import campusDesktop from '../assets/projects/campusconnect-desktop.webp';
import campusMobile from '../assets/projects/campusconnect-mobile.webp';
import portfolioDesktop from '../assets/projects/portfolio-desktop.webp';
import portfolioMobile from '../assets/projects/portfolio-mobile.webp';

const GH = 'https://github.com/sohailwazir2004';

export const categories = ['All', 'Web', 'Python/AI', 'Java', 'Practice'];

export const projects = [
  {
    id: 'preghal',
    title: 'Preghal Fragrances',
    tagline: 'My perfume brand’s e-commerce website',
    description:
      'The online store for Preghal Fragrances, the perfume brand I founded in 2026. A dark, luxury design with gold accents: the “Wear Your Presence” hero with floating gold particles, a scrolling collection of the five fragrances (Obsidian, Velvet Smoke, Wild Orchard, Golden Veil, Silken Bloom), scroll-based text reveals, a shop and cart, and WhatsApp ordering.',
    role: 'Built in collaboration with a friend. I handle the brand, content and promo videos, on-page SEO, and product, shipping and return listings in Google Merchant Center, and I contribute code.',
    tags: ['E-commerce', 'Next.js', 'SEO', 'Google Merchant Center', 'Content'],
    categories: ['Web'],
    live: 'https://preghalfragrances.com',
    github: null,
    images: [
      { src: preghalDesktop, alt: 'Preghal Fragrances homepage hero: “Wear Your Presence” with the Obsidian bottle' },
      { src: preghalCollection, alt: 'Preghal Fragrances collection section showing all five perfumes with prices' },
      { src: preghalProduct, alt: 'Obsidian product page with price, add to cart and order on WhatsApp buttons' },
      { src: preghalMobile, alt: 'Preghal Fragrances homepage on a phone', mobile: true },
    ],
    featured: true,
    accent: '#d4a373',
  },
  {
    id: 'campusconnect',
    title: 'CampusConnect',
    tagline: 'Student hub for COMSATS Islamabad · Team project',
    description:
      'A deployed student hub for COMSATS University Islamabad with an academic-resource marketplace, ride-sharing between verified students, hostel listings near campus, and direct messaging.',
    // TODO: add one line about which part you built, e.g. role: 'I built the ride-sharing module.'
    role: null,
    tags: ['Web App', 'Marketplace', 'Messaging', 'Team project'],
    categories: ['Web'],
    live: 'https://cuiconnect.app',
    github: null,
    images: [
      {
        src: campusDesktop,
        alt: 'CampusConnect login page listing ride sharing, hostel listings, marketplace and messaging',
      },
      { src: campusMobile, alt: 'CampusConnect login page on a phone', mobile: true },
    ],
    featured: true,
    accent: '#6d5dfc',
  },
  {
    id: 'eventease',
    title: 'EventEase',
    tagline: 'Create, customise, clone and promote events · Team project',
    description:
      'A web app for planning anything from a small meeting to a wedding or webinar. Create events with date, type and host; customise the page with an image, location and colour theme; add co-organisers; start from templates and save favourites; clone an event; set public or private visibility; export analytics; and generate hashtags to share on social media.',
    // TODO: add one line about which part you built in the team.
    role: null,
    tags: ['HTML5', 'CSS3', 'JavaScript', 'localStorage', 'Flask API'],
    categories: ['Web'],
    live: null,
    github: `${GH}/ease`,
    images: [],
    featured: true,
    accent: '#22d3ee',
  },
  {
    id: 'portfolio',
    title: 'Sohail Portfolio',
    tagline: 'This website',
    description:
      'My portfolio, rebuilt with React and Vite. Content lives in plain data files, animations use Framer Motion and respect reduced-motion settings, and it has a light/dark theme, project gallery, certificate filters and a working contact form.',
    tags: ['React', 'Vite', 'Framer Motion', 'CSS', 'Vercel'],
    categories: ['Web'],
    live: 'https://my-portfolio-three-silk-27.vercel.app',
    github: `${GH}/my-portfolio`,
    images: [
      { src: portfolioDesktop, alt: 'Sohail Portfolio hero section on desktop' },
      { src: portfolioMobile, alt: 'Sohail Portfolio on a phone', mobile: true },
    ],
    accent: '#8b5cf6',
  },
  {
    id: 'assignment-doc-maker',
    title: 'Assignment Document Maker',
    tagline: 'Claude Code skill · Panaversity',
    description:
      'A global Claude Code slash command (/make-assignment) I made during Panaversity’s AI agent program. It scans the code files of a programming assignment, runs the programs, screenshots the code and its output, and assembles everything into a formatted Word document ready to submit.',
    tags: ['Claude Code', 'Python', 'JavaScript', 'Shell', 'docx'],
    categories: ['Python/AI'],
    live: null,
    github: `${GH}/PanaversityWork`,
    images: [],
    accent: '#d97757',
  },
  {
    id: 'lab-automation',
    title: 'Lab Automation Tool',
    tagline: 'Python desktop app',
    description:
      'A Tkinter desktop app that speeds up lab reports: enter student and course details, paste the code for each question, and it captures the program output as screenshots and generates the lab report document automatically.',
    tags: ['Python', 'Tkinter', 'Automation', 'docx'],
    categories: ['Python/AI'],
    live: null,
    github: `${GH}/helpS-`,
    images: [],
    accent: '#3776ab',
  },
  {
    id: 'hostel-bakery',
    title: 'Hostel & Bakery Management Systems',
    tagline: 'Java OOP console apps · Team projects',
    description:
      'Two console applications built with object-oriented Java: one for hostel student registration and fee tracking, and one for bakery orders, inventory and billing.',
    tags: ['Java', 'OOP', 'Console app'],
    categories: ['Java'],
    live: null,
    github: null, // TODO: add repo links if these are on GitHub
    images: [],
    accent: '#ed8b00',
  },
  {
    id: 'python-practice',
    title: 'Python Practice',
    tagline: 'NumPy & Pandas notebooks',
    description: 'Jupyter notebooks where I practise Python, NumPy and Pandas for data work.',
    tags: ['Python', 'NumPy', 'Pandas', 'Jupyter'],
    categories: ['Python/AI', 'Practice'],
    live: null,
    github: `${GH}/python_practice`,
    images: [],
    accent: '#f37626',
  },
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    tagline: 'Java coursework',
    description: 'Practice programs from my Programming Fundamentals course in Java.',
    tags: ['Java'],
    categories: ['Java', 'Practice'],
    live: null,
    github: `${GH}/Programming-Fundamentals`,
    images: [],
    accent: '#ed8b00',
  },
  {
    id: 'csharp-labs',
    title: 'C# Labs',
    tagline: '5 weeks, basics to advanced',
    description:
      'Five weeks of C# lab work, each lab with 10–15 or more problems, going from the basics to advanced topics.',
    tags: ['C#'],
    categories: ['Practice'],
    live: null,
    github: `${GH}/C-practice`,
    images: [],
    accent: '#9b4f96',
  },
  {
    id: 'frontend-challenge',
    title: 'devChallenges Page',
    tagline: 'Frontend challenge',
    description: 'A page built from a devChallenges design using HTML and CSS.',
    tags: ['HTML5', 'CSS3'],
    categories: ['Web', 'Practice'],
    live: null,
    github: `${GH}/second-frontend-challenge`,
    images: [],
    accent: '#e34f26',
  },
];
