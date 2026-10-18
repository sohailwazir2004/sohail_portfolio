import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { experience } from '../data/experience';
import SectionHeading from './SectionHeading';
import './Experience.css';

export default function Experience() {
  const listRef = useRef(null);
  // Progress of the timeline through the viewport (0 → 1) draws the glowing line.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section section-alt" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience & leadership"
          title="What I do beyond code"
          highlight="beyond"
          sub="Running a brand, teaching OOP, and leading sports at CUI."
        />

        <div className="timeline-wrap" ref={listRef}>
          <div className="timeline-track" aria-hidden="true">
            <motion.div className="timeline-fill" style={{ scaleY }} />
          </div>
          <ol className="timeline">
            {experience.map((item, i) => (
              <motion.li
                key={item.title + item.org}
                className="timeline-item"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="timeline-icon"
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
                >
                  <item.icon />
                </motion.span>
                <div className="timeline-card card">
                  <div className="timeline-head">
                    <h3>
                      {item.title} <span>· {item.org}</span>
                    </h3>
                    {item.period && <span className="timeline-period">{item.period}</span>}
                  </div>
                  <ul>
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  {item.link && (
                    <a className="timeline-link" href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.link.replace('https://', '')} <FaArrowUpRightFromSquare aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
