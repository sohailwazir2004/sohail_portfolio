import { motion } from 'framer-motion';

const word = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Section title whose words slide up from behind a mask, one after another.
export default function SectionHeading({ eyebrow, title, highlight, sub, id }) {
  const words = title.split(' ');
  return (
    <motion.header
      className="section-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ staggerChildren: 0.06 }}
    >
      <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}>
        {eyebrow}
      </motion.p>
      <h2 className="section-title" id={id}>
        {words.map((w, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em' }}
          >
            <motion.span
              variants={word}
              style={{ display: 'inline-block' }}
              className={w === highlight ? 'gradient-text' : undefined}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </h2>
      {sub && (
        <motion.p
          className="section-sub"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          {sub}
        </motion.p>
      )}
    </motion.header>
  );
}
