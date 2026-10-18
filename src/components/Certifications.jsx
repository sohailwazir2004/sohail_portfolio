import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaHourglassHalf, FaCircleCheck } from 'react-icons/fa6';
import { certifications, inProgress, issuers } from '../data/certifications';
import SectionHeading from './SectionHeading';
import Reveal from './motion/Reveal';
import TiltCard from './projects/TiltCard';
import './Certifications.css';

function IssuerBadge({ issuer }) {
  const info = issuers[issuer] || issuers.Other;
  return (
    <span className="issuer-badge" style={{ '--issuer': info.color }}>
      {info.short}
    </span>
  );
}

export default function Certifications() {
  const [filter, setFilter] = useState('All');

  // Build the filter buttons from the data, with a count for each issuer.
  const filters = useMemo(() => {
    const counts = {};
    certifications.forEach((c) => (counts[c.issuer] = (counts[c.issuer] || 0) + 1));
    return [['All', certifications.length], ...Object.entries(counts)];
  }, []);

  const shown = certifications.filter((c) => filter === 'All' || c.issuer === filter);

  return (
    <section id="certifications" className="section" aria-labelledby="certs-title">
      <div className="container">
        <SectionHeading
          id="certs-title"
          eyebrow="Certifications"
          title="Verified learning"
          highlight="Verified"
          sub="Every card with a Verify button opens the official credential page."
        />

        <Reveal>
          <LayoutGroup id="cert-filters">
            <div className="filters cert-filters" role="group" aria-label="Filter certifications by issuer">
              {filters.map(([name, count]) => (
                <button
                  key={name}
                  type="button"
                  className={filter === name ? 'is-active' : ''}
                  onClick={() => setFilter(name)}
                  aria-pressed={filter === name}
                >
                  {filter === name && (
                    <motion.span
                      layoutId="cert-pill"
                      className="filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>
                    {name === 'All' ? 'All' : issuers[name]?.short || name} <small>{count}</small>
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.ul className="cert-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (
              <motion.li
                key={c.title}
                layout
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
              >
                <TiltCard
                  className="cert-card card"
                  style={{ '--issuer': (issuers[c.issuer] || issuers.Other).color }}
                  max={6}
                >
                  <div className="cert-top">
                    <IssuerBadge issuer={c.issuer} />
                    <span className="cert-date">{c.date}</span>
                  </div>
                  <h3>{c.title}</h3>
                  <p className="cert-issuer">{c.issuerFull}</p>
                  {c.note && <p className="cert-note">{c.note}</p>}
                  <div className="cert-bottom">
                    {c.credentialId ? <code className="cert-id">ID: {c.credentialId}</code> : <span />}
                    {c.verify && (
                      <a className="btn btn-ghost btn-sm" href={c.verify} target="_blank" rel="noopener noreferrer">
                        <FaCircleCheck aria-hidden="true" /> Verify{' '}
                        <FaArrowUpRightFromSquare aria-hidden="true" className="ext" />
                        <span className="sr-only"> {c.title} (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="cert-progress card">
          <span className="progress-icon" aria-hidden="true">
            <FaHourglassHalf />
          </span>
          <div>
            <p className="cert-progress-label">In progress</p>
            <h3>{inProgress.title}</h3>
            <p className="cert-issuer">{inProgress.issuerFull}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
