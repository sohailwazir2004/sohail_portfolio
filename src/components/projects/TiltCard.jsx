import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePointerFine } from '../../hooks/usePointerFine';

// A card that tilts in 3D towards the mouse and shows a soft glow where the pointer is.
// On touch screens it's a normal card.
export default function TiltCard({ children, className, max = 8, ...rest }) {
  const fine = usePointerFine();
  const px = useMotionValue(0.5); // pointer position inside the card, 0..1
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={className}
      style={fine ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onMouseMove={fine ? onMove : undefined}
      onMouseLeave={fine ? reset : undefined}
      {...rest}
    >
      {fine && <motion.div className="tilt-glow" style={{ background: glow }} aria-hidden="true" />}
      {children}
    </motion.div>
  );
}
