import { motion } from 'framer-motion';
import { FaGraduationCap, FaStar } from 'react-icons/fa6';
import { education, achievements } from '../data/experience';
import SectionHeading from './SectionHeading';
import Reveal from './motion/Reveal';
import { fadeUp, stagger } from './motion/variants';
import TiltCard from './projects/TiltCard';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading id="education-title" eyebrow="Education" title="Where I study" highlight="study" />

        <Reveal>
          <TiltCard className="edu-card card" max={4}>
            <div className="edu-icon" aria-hidden="true">
              <FaGraduationCap />
            </div>
            <div>
              <h3>{education.degree}</h3>
              <p className="edu-school">{education.school}</p>
              <p className="edu-meta">
                <span>{education.period}</span>
                <span>{education.details}</span>
              </p>
              <p className="edu-focus">{education.focus}</p>
            </div>
          </TiltCard>
        </Reveal>

        <h3 className="ach-title">Achievements &amp; highlights</h3>
        <motion.ul
          className="ach-grid"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {achievements.map((a) => (
            <motion.li key={a.title} className="ach-card card" variants={fadeUp} whileHover={{ y: -6 }}>
              <motion.span
                className="ach-icon"
                aria-hidden="true"
                whileHover={{ rotate: 72, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaStar />
              </motion.span>
              <h4>{a.title}</h4>
              <p>{a.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
