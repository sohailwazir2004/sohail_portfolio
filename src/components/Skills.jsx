import { motion } from 'framer-motion';
import { skillGroups, learning, marquee } from '../data/skills';
import SectionHeading from './SectionHeading';
import { fadeUp, stagger } from './motion/variants';
import './Skills.css';

const badge = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          title="Tools I work with"
          highlight="work"
          sub="Honest levels: I’m a student, so I’ve marked what I’m comfortable with and what I’m still learning."
        />
      </div>

      {/* Infinite logo strip. The list is rendered twice so the loop has no gap. */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="marquee-item">
              <s.icon style={{ color: s.color }} /> {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          className="skills-grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {skillGroups.map((g) => (
            <motion.article key={g.title} className="skill-card card" variants={fadeUp}>
              <header>
                <h3>{g.title}</h3>
                <p>{g.note}</p>
              </header>
              <motion.ul variants={stagger(0.06, 0.15)}>
                {g.items.map((s) => (
                  <motion.li key={s.name} className="skill-badge" variants={badge} whileHover={{ y: -4, scale: 1.05 }}>
                    <s.icon aria-hidden="true" style={{ color: s.color }} className="skill-icon" />
                    {s.name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          ))}

          <motion.article className="skill-card card learning-card" variants={fadeUp}>
            <header>
              <h3>Currently learning</h3>
              <p>Not skills yet, but where my time is going now</p>
            </header>
            <motion.ul variants={stagger(0.06, 0.15)}>
              {learning.map((s) => (
                <motion.li key={s.name} className="skill-badge learning" variants={badge}>
                  <s.icon aria-hidden="true" className="skill-icon" />
                  {s.name}
                </motion.li>
              ))}
            </motion.ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
