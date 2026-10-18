import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import { certifications } from '../data/certifications';
import './Terminal.css';

// The "session" the terminal plays. Output is built from my real data files,
// so it stays correct when I add a project or certificate.
const verified = certifications.filter((c) => c.verify);
const SCRIPT = [
  { cmd: 'whoami', out: ['muhammad-sohail  # SE student @ CUI · web dev · founder'] },
  {
    cmd: 'ls projects/',
    out: [
      projects
        .filter((p) => !p.categories.includes('Practice'))
        .map((p) => p.id + '/')
        .join('  '),
    ],
  },
  {
    cmd: 'cat certifications.txt | head -4',
    out: verified.slice(0, 4).map((c) => `[${c.date}] ${c.title} · ${c.issuer}`),
  },
  { cmd: 'wc -l certifications.txt', out: [`${verified.length} certifications.txt  # all verifiable`] },
  { cmd: 'echo $CURRENTLY_LEARNING', out: ['linux  devops  cloud  ai-engineering'] },
];

const TYPE_MS = 45;

export default function Terminal() {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const reduce = useReducedMotion();
  // step = which command we're on; typed = how many characters of it are typed; showOut = output visible
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [showOut, setShowOut] = useState(false);

  const done = reduce || step >= SCRIPT.length;

  useEffect(() => {
    if (!inView || done) return;
    const cmd = SCRIPT[step].cmd;
    let t;
    if (typed < cmd.length) t = setTimeout(() => setTyped(typed + 1), TYPE_MS);
    else if (!showOut) t = setTimeout(() => setShowOut(true), 250);
    else
      t = setTimeout(() => {
        setStep(step + 1);
        setTyped(0);
        setShowOut(false);
      }, 700);
    return () => clearTimeout(t);
  }, [inView, done, step, typed, showOut]);

  // Keep the newest line visible inside the terminal window, without scrolling the whole page.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step, showOut]);

  const lines = done ? SCRIPT : SCRIPT.slice(0, step + 1);

  return (
    <div
      className="terminal"
      ref={ref}
      role="img"
      aria-label="Terminal showing whoami, my project list, certifications and what I'm learning"
    >
      <div className="terminal-bar" aria-hidden="true">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="terminal-title">sohail@cui: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef} aria-hidden="true">
        {lines.map((line, i) => {
          const current = !done && i === step;
          const cmdText = current ? line.cmd.slice(0, typed) : line.cmd;
          const outVisible = !current || showOut;
          return (
            <div key={i} className="terminal-block">
              <p>
                <span className="prompt">sohail@cui</span>
                <span className="path">:~$</span> {cmdText}
                {current && !showOut && <span className="cursor" />}
              </p>
              {outVisible &&
                line.out.map((o, j) => (
                  <p key={j} className="out">
                    {o}
                  </p>
                ))}
            </div>
          );
        })}
        {done && inView && (
          <p>
            <span className="prompt">sohail@cui</span>
            <span className="path">:~$</span> <span className="cursor" />
          </p>
        )}
      </div>
    </div>
  );
}
