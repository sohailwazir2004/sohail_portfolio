import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPaperPlane,
  FaCopy,
  FaCheck,
  FaCircleCheck,
  FaTriangleExclamation,
} from 'react-icons/fa6';
import { profile } from '../data/profile';
import SectionHeading from './SectionHeading';
import Reveal from './motion/Reveal';
import Magnetic from './motion/Magnetic';
import './Contact.css';

// Free Formspree form ID, read from an environment variable so it isn't hard-coded.
// Locally: put VITE_FORMSPREE_ID=xxxxxxx in .env.local. On Vercel: Project → Settings → Environment Variables.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const EMPTY = { name: '', email: '', message: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    // No Formspree ID configured yet: open the visitor's email app with the message filled in,
    // so a message is never silently lost.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, _subject: `Portfolio message from ${values.name}` }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const field = (name, label, props) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`c-${name}`}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea
          id={`c-${name}`}
          name={name}
          value={values[name]}
          onChange={onChange}
          rows={5}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `c-${name}-err` : undefined}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          id={`c-${name}`}
          name={name}
          type={props.type}
          value={values[name]}
          onChange={onChange}
          autoComplete={props.autoComplete}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `c-${name}-err` : undefined}
          placeholder={props.placeholder}
        />
      )}
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            id={`c-${name}-err`}
            className="field-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {errors[name]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let’s work together"
          highlight="together"
          sub={profile.openTo}
        />

        <div className="contact-grid">
          <Reveal className="contact-direct">
            <h3>Reach me directly</h3>
            <div className="email-row card">
              <FaEnvelope aria-hidden="true" className="email-icon" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                type="button"
                className="icon-btn"
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'y' : 'n'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{ display: 'grid' }}
                  >
                    {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <div className="contact-buttons">
              <Magnetic>
                <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                  <FaEnvelope aria-hidden="true" /> Email me
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn aria-hidden="true" /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
              </Magnetic>
            </div>
            <p className="contact-loc">📍 {profile.location}</p>
          </Reveal>

          <Reveal delay={0.1} className="contact-form-wrap card">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  role="status"
                >
                  <motion.svg viewBox="0 0 52 52" width="84" height="84" aria-hidden="true">
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      stroke="var(--accent-2)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.path
                      d="M15 27 l7 7 l15 -16"
                      fill="none"
                      stroke="var(--accent-2)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    />
                  </motion.svg>
                  <h3>Message sent!</h3>
                  <p>Thanks for reaching out. I’ll get back to you soon.</p>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus('idle')}>
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3>Send a message</h3>
                  <div className="field-row">
                    {field('name', 'Name', { type: 'text', autoComplete: 'name', placeholder: 'Your name' })}
                    {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })}
                  </div>
                  {field('message', 'Message', { as: 'textarea', placeholder: 'Tell me about the role or project…' })}

                  {status === 'error' && (
                    <p className="form-error" role="alert">
                      <FaTriangleExclamation aria-hidden="true" /> Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    className="btn btn-primary submit"
                    disabled={status === 'sending'}
                    whileTap={{ scale: 0.96 }}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.span
                          className="spinner"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <FaPaperPlane aria-hidden="true" /> Send message
                      </>
                    )}
                  </motion.button>
                  {!FORMSPREE_ID && (
                    <p className="form-hint">
                      <FaCircleCheck aria-hidden="true" /> Opens your email app with the message ready to send.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
