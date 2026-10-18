import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowDown, FaDownload, FaGithub, FaLinkedinIn, FaEnvelope, FaLocationDot } from 'react-icons/fa6';
import { profile } from '../data/profile';
import TypingRoles from './TypingRoles';
import Magnetic from './motion/Magnetic';
import './Hero.css';

// Fixed positions so the particles look random but don't jump between renders.
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  top: (i * 37 + 11) % 100,
  size: 2 + (i % 3),
  duration: 9 + (i % 5) * 2,
  delay: -(i * 0.7),
}));

const letter = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// With `gradient`, each letter gets its own slice of one wide gradient, so the word reads as one
// continuous gradient even though every letter animates separately.
function AnimatedName({ text, delay, gradient = false }) {
  const n = text.length;
  return (
    <motion.span
      className="hero-name-line"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-hidden="true"
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="letter-mask">
          <motion.span
            variants={letter}
            className={gradient ? 'letter-gradient' : undefined}
            style={{
              display: 'inline-block',
              ...(gradient && { backgroundSize: `${n * 100}% 100%`, backgroundPosition: `${(i / (n - 1)) * 100}% 0` }),
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero({ delay = 0 }) {
  // Parallax: as you scroll past the hero, the photo drifts and the text fades.
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, 120]);
  const textY = useTransform(scrollY, [0, 700], [0, -60]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="hero-grid" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="hero-inner container">
        <motion.div className="hero-text" style={{ y: textY, opacity }}>
          <motion.p className="hero-badge" {...fade(delay + 0)}>
            <span className="pulse-dot" aria-hidden="true" />
            Available for internships &amp; freelance
          </motion.p>

          <h1 id="hero-title" className="hero-name">
            <span className="sr-only">{profile.name}</span>
            <AnimatedName text="Muhammad" delay={delay + 0.05} />
            <AnimatedName text="Sohail." delay={delay + 0.3} gradient />
          </h1>

          <motion.p className="hero-role" {...fade(delay + 0.6)}>
            <span className="role-prefix">&gt;</span> <TypingRoles roles={profile.roles} />
          </motion.p>

          <motion.p className="hero-headline" {...fade(delay + 0.75)}>
            {profile.headline}
          </motion.p>

          <motion.div className="hero-ctas" {...fade(delay + 0.9)}>
            <Magnetic>
              <a href="#projects" className="btn btn-primary">
                View my work
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-ghost">
                Contact me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} className="btn btn-ghost" download>
                <FaDownload aria-hidden="true" /> CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-meta" {...fade(delay + 1.05)}>
            <span>
              <FaLocationDot aria-hidden="true" /> {profile.location}
            </span>
            <span className="hero-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FaEnvelope />
              </a>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-photo-wrap"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-ring" aria-hidden="true" />
          <div className="hero-photo">
            <img src={profile.photo} alt="Muhammad Sohail" width="520" height="520" fetchPriority="high" />
          </div>
          {/* Floating chips use CSS keyframes (Hero.css): they run on the GPU with no JavaScript per frame. */}
          <div className="hero-chip chip-1">⚛️ React</div>
          <div className="hero-chip chip-2">☕ Java · OOP</div>
          <div className="hero-chip chip-3">🐧 learning Linux</div>
        </motion.div>
      </div>

      {/* Outer layer fades out on scroll; inner link fades in on load. */}
      <motion.div className="scroll-cue-wrap" style={{ opacity }}>
        <motion.a href="#about" className="scroll-cue" aria-label="Scroll to About" {...fade(delay + 1.3)}>
          <span className="scroll-cue-arrow">
            <FaArrowDown aria-hidden="true" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
