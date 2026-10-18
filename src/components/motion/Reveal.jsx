import { motion } from 'framer-motion';

// Fades and slides its children in the first time they scroll into view.
// `delay` lets neighbouring items arrive one after another.
export default function Reveal({ children, delay = 0, y = 32, x = 0, as = 'div', className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
