'use client';
import { useEffect, useRef } from 'react';

export default function Waveform() {
  const ref = useRef<SVGPathElement>(null);
  useEffect(() => {
    let t = 0, raf = 0;
    const tick = () => {
      t += 0.08;
      let d = 'M0,60';
      for (let x = 0; x <= 400; x += 8) {
        const y = 60 + Math.sin(x * 0.05 + t) * 22 * Math.sin(t * 0.5 + x * 0.01) + Math.sin(x * 0.13 + t * 1.7) * 10;
        d += ` L${x},${y.toFixed(1)}`;
      }
      ref.current?.setAttribute('d', d);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <svg className="wave" viewBox="0 0 400 120" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff004" />
          <stop offset="52%" stopColor="#ff9d2e" />
          <stop offset="100%" stopColor="#ff5a3c" />
        </linearGradient>
      </defs>
      <path ref={ref} d="M0,60 L400,60" stroke="url(#waveGrad)" />
    </svg>
  );
}
