// Parent + child variants for lists: the parent staggers its children.
export const stagger = (gap = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
