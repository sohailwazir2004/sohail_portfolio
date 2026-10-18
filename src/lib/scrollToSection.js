// Sections use `content-visibility: auto` (see global.css), so their height is only an estimate
// until they've been rendered. A plain #link jump can therefore stop short of a far-away section.
// This scrolls, waits, checks where the section actually is, and corrects until it lines up.

const NAV_OFFSET = 70; // must match scroll-margin-top in global.css

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go = () => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });

  go();
  let tries = 0;
  const check = () => {
    const top = id === 'home' ? window.scrollY : el.getBoundingClientRect().top - NAV_OFFSET;
    if (Math.abs(top) > 4 && tries++ < 8) {
      go();
      setTimeout(check, 450);
    }
  };
  setTimeout(check, smooth ? 700 : 100);
  history.replaceState(null, '', `#${id}`);
}

// One listener for every in-page link (navbar, menu, buttons, footer).
export function interceptHashLinks() {
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = a.getAttribute('href').slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    scrollToSection(id);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
