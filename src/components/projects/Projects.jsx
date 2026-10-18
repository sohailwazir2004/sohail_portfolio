import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { FaExpand } from 'react-icons/fa6';
import { projects, categories } from '../../data/projects';
import SectionHeading from '../SectionHeading';
import Reveal from '../motion/Reveal';
import TiltCard from './TiltCard';
import ProjectCover from './ProjectCover';
import ProjectLinks from './ProjectLinks';
import './Projects.css';

// Code-splitting: the modal is only downloaded the first time someone opens a project.
const ProjectModal = lazy(() => import('./ProjectModal'));

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function FeaturedProject({ project, index, onOpen }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal className={`featured ${reversed ? 'is-reversed' : ''}`} y={60}>
      <TiltCard className="featured-media" max={5}>
        <button
          type="button"
          className="media-btn"
          onClick={() => onOpen(project)}
          aria-label={`Open details and screenshots for ${project.title}`}
        >
          <ProjectCover project={project} eager={index === 0} />
          <span className="media-hint" aria-hidden="true">
            <FaExpand /> {project.images.length > 1 ? `${project.images.length} screenshots` : 'Details'}
          </span>
        </button>
      </TiltCard>

      <div className="featured-text">
        <p className="featured-num">
          0{index + 1} <span>· Featured</span>
        </p>
        <h3>{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="featured-desc">{project.description}</p>
        {project.role && (
          <p className="project-role">
            <strong>My role:</strong> {project.role}
          </p>
        )}
        <ul className="project-tags">
          {project.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <div className="featured-actions">
          <ProjectLinks project={project} />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onOpen(project)}>
            More details
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  // Featured projects always show above; the filter applies to the rest.
  const shown = others.filter((p) => filter === 'All' || p.categories.includes(filter));

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Things I’ve built"
          highlight="built"
          sub="Real projects first: my brand’s store, a live campus app and a team web app. Then smaller work and practice."
        />

        <div className="featured-list">
          {featured.map((p, i) => (
            <FeaturedProject key={p.id} project={p} index={i} onOpen={setOpen} />
          ))}
        </div>

        <Reveal className="all-head">
          <h3>More projects</h3>
          <LayoutGroup id="project-filters">
            <div className="filters" role="group" aria-label="Filter projects by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={filter === c ? 'is-active' : ''}
                  onClick={() => setFilter(c)}
                  aria-pressed={filter === c}
                >
                  {filter === c && (
                    <motion.span
                      layoutId="filter-pill"
                      className="filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{c}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.ul className="project-grid">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <TiltCard className="project-card card">
                  <button
                    type="button"
                    className="media-btn"
                    onClick={() => setOpen(p)}
                    aria-label={`Open details for ${p.title}`}
                  >
                    <ProjectCover project={p} />
                  </button>
                  <div className="project-card-body">
                    <p className="project-tagline">{p.tagline}</p>
                    <h4>{p.title}</h4>
                    <p className="project-card-desc">{p.description}</p>
                    <ul className="project-tags">
                      {p.tags.slice(0, 4).map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                    <ProjectLinks project={p} />
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open && (
          <Suspense key={open.id} fallback={null}>
            <ProjectModal project={open} onClose={() => setOpen(null)} />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
