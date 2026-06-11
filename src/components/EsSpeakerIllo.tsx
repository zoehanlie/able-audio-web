'use client';
import { useEffect, useRef } from 'react';

// Illustrated electrostatic panel speaker for the face-off's 靜電喇叭 side:
// a floor-standing panel with two stator plates flanking a glowing membrane,
// twinkling charges and sonar rings radiating from the panel. The membrane
// vibrates in its taut fundamental mode (whole film bows as one, pinned at
// both ends) with a fast fine shimmer on top — tense, not floppy.
function buildPath(t: number) {
  const fund = Math.sin(t * 2.6) * 5;
  let d = 'M110,40';
  for (let y = 40; y <= 336; y += 4) {
    const n = Math.sin((Math.PI * (y - 40)) / 296);
    const x = 110 + fund * n + Math.sin(y * 0.16 + t * 5.2) * 1.1 * n;
    d += ` L${x.toFixed(1)},${y}`;
  }
  return d;
}

// A pleasing frozen frame used for SSR and reduced-motion (never a flat line).
const STATIC_D = buildPath(0.5);

export default function EsSpeakerIllo() {
  const mem = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = 0.7;
    let raf = 0;
    const tick = () => {
      t += 0.045;
      mem.current?.setAttribute('d', buildPath(t));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const charges = [
    { x: 101, y: 80 }, { x: 119, y: 120 }, { x: 101, y: 170 },
    { x: 119, y: 215 }, { x: 101, y: 260 }, { x: 119, y: 300 },
  ];

  return (
    <div className="xp-illo" aria-hidden>
      <span className="ring" />
      <span className="ring" />
      <span className="ring" />
      <svg viewBox="0 0 220 424" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="xpIlloGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff004" />
            <stop offset="50%" stopColor="#ff9d2e" />
            <stop offset="100%" stopColor="#ff5a3c" />
          </linearGradient>
        </defs>
        {/* stand */}
        <rect className="stand" x="102" y="352" width="16" height="46" rx="3" />
        <path className="stand" d="M74,412 L146,412 L136,396 L84,396 Z" />
        {/* panel frame + cavity */}
        <rect className="frame" x="42" y="18" width="136" height="340" rx="20" />
        <rect className="cavity" x="58" y="34" width="104" height="308" rx="12" />
        {/* outer mesh (faint) + the two stator plates flanking the membrane */}
        {[70, 82, 138, 150].map((x) => (
          <line key={x} className="mesh" x1={x} y1="44" x2={x} y2="332" />
        ))}
        <line className="plate" x1="94" y1="44" x2="94" y2="332" />
        <line className="plate" x1="126" y1="44" x2="126" y2="332" />
        {/* glowing membrane */}
        <path ref={mem} className="mem" stroke="url(#xpIlloGrad)" d={STATIC_D} />
        {/* charges */}
        {charges.map((c, i) => (
          <circle key={i} className="charge" cx={c.x} cy={c.y} r="2.4" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </svg>
    </div>
  );
}
