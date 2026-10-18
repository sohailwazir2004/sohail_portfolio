import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Intro from './components/Intro';
import { introWillPlay } from './lib/intro';
import { interceptHashLinks } from './lib/scrollToSection';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/projects/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const { theme, toggle } = useTheme();
  // Decide once, on first render, whether the intro plays; the hero waits for it if so.
  const [playIntro] = useState(introWillPlay);
  useEffect(interceptHashLinks, []);

  return (
    // reducedMotion="user": if the visitor's OS asks for less motion, Framer Motion
    // skips movement animations everywhere (opacity fades still happen).
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Intro play={playIntro} />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero delay={playIntro ? 1.5 : 0.15} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
