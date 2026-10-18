// Image area of a project card: the first screenshot, or a generated cover for projects
// without a live site (so I never show a fake screenshot).
export default function ProjectCover({ project, eager = false }) {
  const shot = project.images.find((i) => !i.mobile) || project.images[0];

  if (shot) {
    return (
      <div className="project-cover">
        <img
          src={shot.src}
          alt={shot.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          width="1440"
          height="900"
        />
      </div>
    );
  }

  return (
    <div className="project-cover project-cover--generated" style={{ '--accent-c': project.accent }} aria-hidden="true">
      <div className="cover-orb" />
      <code className="cover-path">~/{project.id}</code>
      <p className="cover-title">{project.title}</p>
      <div className="cover-tags">
        {project.tags.slice(0, 3).map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
