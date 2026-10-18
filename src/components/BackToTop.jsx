import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa6';

// Round button that appears after scrolling down; a ring around it shows scroll progress.
export default function BackToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 700));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0 })}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            zIndex: 90,
            width: 52,
            height: 52,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
            aria-hidden="true"
          >
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="var(--accent-2)"
              strokeWidth="2"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <FaArrowUp aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
