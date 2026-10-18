import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePointerFine } from '../../hooks/usePointerFine';

// Wraps a button/link so it gently follows the mouse when hovered.
// Motion values update outside React state, so this never causes re-renders.
export default function Magnetic({ children, strength = 0.3 }) {
  const fine = usePointerFine();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });

  if (!fine) return children;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x, y, display: 'inline-flex' }} onMouseMove={onMove} onMouseLeave={reset}>
      {children}
    </motion.span>
  );
}
