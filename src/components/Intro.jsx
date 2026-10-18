import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import './Intro.css';

const LETTERS = 'SOHAIL'.split('');

// Short page-load intro (about 1.4s). App decides whether it plays (see introWillPlay).
export default function Intro({ play }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(play);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('introSeen', '1');
    } catch {
      /* storage blocked: intro just plays every time */
    }
    const t = setTimeout(() => setShow(false), reduce ? 300 : 1450);
    return () => clearTimeout(t);
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro"
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-word">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              className="intro-dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 12 }}
            >
              .
            </motion.span>
          </div>
          <motion.div
            className="intro-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
