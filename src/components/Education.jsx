import { FaGraduationCap } from 'react-icons/fa6';
import { education } from '../data/experience';
import SectionHeading from './SectionHeading';
import Reveal from './motion/Reveal';
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
      </div>
    </section>
  );
}
