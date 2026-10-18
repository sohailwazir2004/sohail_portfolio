import { FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';

// "Code" and "Live" buttons. Each only appears if the link really exists.
export default function ProjectLinks({ project, size = 'btn-sm' }) {
  return (
    <div className="project-links">
      {project.live && (
        <a className={`btn btn-primary ${size}`} href={project.live} target="_blank" rel="noopener noreferrer">
          <FaArrowUpRightFromSquare aria-hidden="true" /> Live site
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.github && (
        <a className={`btn btn-ghost ${size}`} href={project.github} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" /> Code
          <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
