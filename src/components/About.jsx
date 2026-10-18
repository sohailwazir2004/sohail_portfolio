import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';
import Reveal from './motion/Reveal';
import { fadeUp, stagger } from './motion/variants';
import Terminal from './Terminal';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow="About me" title="Student, builder, founder" highlight="founder" />

        <div className="about-grid">
          <div className="about-text">
            {profile.about.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.1}>
                {p}
              </Reveal>
            ))}

            <motion.dl
              className="facts"
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {profile.quickFacts.map((f) => (
                <motion.div key={f.label} className="fact card" variants={fadeUp} whileHover={{ y: -4 }}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </motion.div>
              ))}
            </motion.dl>

            <Reveal as="p" className="open-to" delay={0.2}>
              <span className="pulse-dot" aria-hidden="true" /> {profile.openTo}
            </Reveal>
          </div>

          <Reveal x={40} y={0} delay={0.15}>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
