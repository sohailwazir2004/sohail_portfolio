import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6';
import { profile } from '../data/profile';
import { NAV_LINKS } from '../data/nav';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear(); // never goes out of date

  return (
    <footer className="footer">
      <div className="container">
        <motion.p
          className="footer-big"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Let’s build <span className="gradient-text">something</span>.
        </motion.p>

        <div className="footer-row">
          <nav aria-label="Footer">
            <ul className="footer-links">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <p className="footer-copy">
          © {year} {profile.name} · {profile.siteName} · Built with React, Vite &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
