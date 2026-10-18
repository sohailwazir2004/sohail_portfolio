import { motion, useScroll, useSpring } from 'framer-motion';

// Thin gradient bar at the top of the page that fills as you scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--gradient)',
        transformOrigin: '0%',
        zIndex: 150,
      }}
    />
  );
}
