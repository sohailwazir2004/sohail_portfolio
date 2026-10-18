import { useCallback, useEffect, useState } from 'react';

// Reads the theme index.html already applied, and saves changes to localStorage.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#07080f' : '#f6f6fb');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Private mode or blocked storage: the theme still works, it just isn't remembered.
    }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}
