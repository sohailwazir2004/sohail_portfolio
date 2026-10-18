import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FaBars, FaXmark, FaMoon, FaSun } from 'react-icons/fa6';
import { useActiveSection } from '../hooks/useActiveSection';
import { NAV_LINKS } from '../data/nav';
import './Navbar.css';

const IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const ThemeIcon = theme === 'dark' ? FaSun : FaMoon;

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="nav-inner container" aria-label="Main">
          <a href="#home" className="nav-logo" aria-label="Sohail Portfolio, back to top">
            <span className="gradient-text">MS</span>
            <span className="nav-logo-text">Sohail</span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={active === l.id ? 'is-active' : ''}
                  aria-current={active === l.id ? 'true' : undefined}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="nav-label">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <motion.button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              whileTap={{ scale: 0.85, rotate: -30 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: -18, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 18, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'grid' }}
                >
                  <ThemeIcon aria-hidden="true" />
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <FaBars aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed overlay inside the header. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 34px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 34px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 34px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button
              type="button"
              className="icon-btn menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              autoFocus
            >
              <FaXmark aria-hidden="true" />
            </button>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {NAV_LINKS.map((l, i) => (
                <motion.li key={l.id} variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className={active === l.id ? 'is-active' : ''}>
                    <span className="menu-num">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
