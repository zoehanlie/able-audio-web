'use client';
import { useEffect, useRef } from 'react';

// Exploded electrostatic-panel cross-section for the explore page's section
// 02, after the product photo: two slotted stator plates (電極板) drawn as
// skewed parallelograms flanking the ultra-thin gold membrane (振膜). The
// whole membrane sheet waves — every horizontal slice displaced along the
// depth axis, pinned at top and bottom — the same taut fundamental + fine
// shimmer as the face-off panel.

// Skewed projection: width vector W=(104,46), height V=(0,206), and the
// depth axis O=(60,-27) stepping front stator → membrane → back stator.
const W = [104, 46] as const;
const V = 206;
const A = [58, 130] as const;   // front stator top-left
const M = [118, 103] as const;  // membrane top-left
const B = [178, 76] as const;   // back stator top-left

const sheet = (o: readonly [number, number]) =>
  `M${o[0]},${o[1]} l${W[0]},${W[1]} l0,${V} l${-W[0]},${-W[1]} Z`;

// The membrane as a filled sheet whose edges undulate together along the
// depth axis (the whole film moves as one, pinned at top and bottom).
function buildMembrane(t: number) {
  const fund = Math.sin(t * 2.6) * 5;
  const disp = (y: number) => {
    const n = Math.sin((Math.PI * y) / V);
    return fund * n + Math.sin(y * 0.16 + t * 5.2) * 1.1 * n;
  };
  const px = (u: number, y: number) => {
    const d = disp(y);
    return `${(M[0] + W[0] * u + d * 0.912).toFixed(1)},${(M[1] + W[1] * u + y - d * 0.41).toFixed(1)}`;
  };
  let d = `M${px(0, 0)}`;
  for (let y = 4; y <= V; y += 4) d += ` L${px(0, y)}`;
  d += ` L${px(1, V)}`;
  for (let y = V - 4; y >= 0; y -= 4) d += ` L${px(1, y)}`;
  return d + ' Z';
}

// A pleasing frozen frame used for SSR and reduced-motion (never a flat sheet).
const STATIC_D = buildMembrane(0.5);

// Vertical dashed slat lines across a stator face.
const slats = (o: readonly [number, number]) =>
  [0.14, 0.28, 0.42, 0.56, 0.7, 0.86].map((u) => ({
    x: o[0] + W[0] * u,
    y: o[1] + W[1] * u + 6,
  }));

export default function EsPanelIllo() {
  const mem = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = 0.7;
    let raf = 0;
    const tick = () => {
      t += 0.045;
      mem.current?.setAttribute('d', buildMembrane(t));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="xp-illo" aria-hidden>
      <svg viewBox="0 0 300 430" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="xpPanelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff004" />
            <stop offset="50%" stopColor="#ff9d2e" />
            <stop offset="100%" stopColor="#ff5a3c" />
          </linearGradient>
        </defs>
        {/* sound drifting out of the open front */}
        <path className="tarc" d="M40,200 Q24,233 40,266" />
        <path className="tarc a2" d="M28,185 Q8,233 28,281" />
        {/* back stator (電極板) */}
        <path className="frame" d={sheet(B)} />
        {slats(B).map((s) => (
          <line key={s.x} className="mesh" x1={s.x} y1={s.y} x2={s.x} y2={s.y + V - 12} />
        ))}
        {/* membrane (振膜) — the whole gold sheet waves, edges carrying the vibration */}
        <path
          ref={mem}
          className="mem"
          stroke="url(#xpPanelGrad)"
          style={{ fill: 'url(#xpPanelGrad)', fillOpacity: 0.14, strokeWidth: 1.2 }}
          d={STATIC_D}
        />
        {/* front stator */}
        <path className="frame" d={sheet(A)} />
        {slats(A).map((s) => (
          <line key={s.x} className="mesh" x1={s.x} y1={s.y} x2={s.x} y2={s.y + V - 12} />
        ))}
      </svg>
    </div>
  );
}
