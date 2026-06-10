'use client';
import { useEffect, useRef } from 'react';

// Animated electrostatic diaphragm: an ultra-thin membrane rippling between two
// dashed stator plates. The membrane is drawn as one bright line (the 振膜) with
// two faint "shadow" lines hugging it on the same phase — the 雙金屬鍍層 (dual
// metal coating) moving in lock-step with the diaphragm. Twinkling charges and
// sound rings emanate outward.
const COAT = 3.2; // sideways offset of each metal-coating shadow line

function buildPath(t: number, amp: number, dx = 0) {
  let d = `M${(110 + dx).toFixed(1)},18`;
  for (let y = 18; y <= 282; y += 5) {
    const x =
      110 +
      dx +
      Math.sin(y * 0.05 + t) * amp * Math.sin(t * 0.5 + y * 0.012) +
      Math.sin(y * 0.13 + t * 1.6) * amp * 0.4;
    d += ` L${x.toFixed(1)},${y}`;
  }
  return d;
}

// A pleasing frozen frame used for SSR and reduced-motion (never a flat line).
const STATIC_MAIN = buildPath(0.7, 13);
const STATIC_COAT_A = buildPath(0.7, 13, -COAT);
const STATIC_COAT_B = buildPath(0.7, 13, COAT);

export default function DiaphragmViz() {
  const main = useRef<SVGPathElement>(null);
  const coatA = useRef<SVGPathElement>(null);
  const coatB = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // keep the static curve rendered below

    let t = 0;
    let raf = 0;
    const tick = () => {
      t += 0.05;
      // Same phase + amplitude for all three so the coatings ride with the membrane.
      main.current?.setAttribute('d', buildPath(t, 15));
      coatA.current?.setAttribute('d', buildPath(t, 15, -COAT));
      coatB.current?.setAttribute('d', buildPath(t, 15, COAT));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const charges = [
    { x: 78, y: 70 }, { x: 142, y: 110 }, { x: 78, y: 150 },
    { x: 142, y: 200 }, { x: 78, y: 232 }, { x: 142, y: 60 },
  ];

  return (
    <div className="viz dia-viz" aria-hidden>
      <span className="dia-ring" />
      <span className="dia-ring" />
      <span className="dia-ring" />
      <svg viewBox="0 0 220 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="diaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff004" />
            <stop offset="50%" stopColor="#ff9d2e" />
            <stop offset="100%" stopColor="#ff5a3c" />
          </linearGradient>
        </defs>
        <line className="stator" x1="78" y1="18" x2="78" y2="282" />
        <line className="stator" x1="142" y1="18" x2="142" y2="282" />
        <path ref={coatA} className="dia-coat" d={STATIC_COAT_A} />
        <path ref={coatB} className="dia-coat" d={STATIC_COAT_B} />
        <path ref={main} className="dia-mem" stroke="url(#diaGrad)" d={STATIC_MAIN} />
        <g className="charges">
          {charges.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r="2.6" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
