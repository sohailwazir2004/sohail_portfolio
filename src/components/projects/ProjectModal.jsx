import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ProjectCover from './ProjectCover';
import ProjectLinks from './ProjectLinks';

// Full details for one project, with a screenshot gallery.
// Loaded lazily (see Projects.jsx), so its code only downloads when someone opens a project.
export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const closeRef = useRef(null);
  const images = project.images;

  const go = (step) => {
    setDir(step);
    setIndex((i) => (i + step + images.length) % images.length);
  };

  // Keyboard: Esc closes, arrows change image. Lock page scroll while open, and put focus on Close.
  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (images.length > 1 && e.key === 'ArrowRight') go(1);
      if (images.length > 1 && e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const img = images[index];

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      >
        <button
          ref={closeRef}
          type="button"
          className="icon-btn modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <FaXmark aria-hidden="true" />
        </button>

        <div className={`gallery ${img?.mobile ? 'is-mobile' : ''}`}>
          {img ? (
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={index}
                src={img.src}
                alt={img.alt}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          ) : (
            <ProjectCover project={project} />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-nav prev"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button type="button" className="gallery-nav next" onClick={() => go(1)} aria-label="Next screenshot">
                <FaChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="thumbs" role="group" aria-label="Screenshots">
            {images.map((im, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? 'is-active' : ''}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Screenshot ${i + 1}: ${im.alt}`}
                aria-pressed={i === index}
              >
                <img src={im.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="modal-body">
          <p className="project-tagline">{project.tagline}</p>
          <h3 id="modal-title">{project.title}</h3>
          <p>{project.description}</p>
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
          <ProjectLinks project={project} size="" />
        </div>
      </motion.div>
    </motion.div>
  );
}
