'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Counts a number up from 0 when it scrolls into view.
 * The value comes from translations, so it may carry a non-numeric suffix
 * ("30+", "4×") or be entirely non-numeric ("Hybrid"). We animate the leading
 * integer and keep the rest verbatim; non-numeric values render as-is.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d[\d,]*)(.*)$/s);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  const suffix = match ? match[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (target === null) { setDisplay(value); return; }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setDisplay(value); return; }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const dur = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(`${Math.round(eased * target)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, suffix, value]);

  return <span ref={ref} className={className}>{display}</span>;
}
