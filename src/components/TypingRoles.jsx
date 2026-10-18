import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types each role out, pauses, deletes it, then moves to the next one.
// One small timer drives it; no typing library needed.
export default function TypingRoles({ roles }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const full = roles[index];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === full) delay = 1700; // hold the full word
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, roles, reduce]);

  // Reduced motion: just show the first role, no typing.
  const shown = reduce ? roles[0] : text;

  return (
    <span className="typing">
      {/* Screen readers get the full list once instead of hearing letters change. */}
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">
        {shown}
        <span className="typing-caret" />
      </span>
    </span>
  );
}
