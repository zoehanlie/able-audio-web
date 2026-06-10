'use client';
import { useMemo } from 'react';

export default function EqRing() {
  // useMemo so delays are computed once and identical between server/client mounts
  const bars = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({
      dur: 0.7 + ((i * 37) % 90) / 100,
      delay: ((i * 53) % 100) / 100,
    })),
    []
  );
  // Sweep the ring warm: yellow -> amber -> coral across its width (VU heat map).
  const heat = (i: number) => {
    const p = i / bars.length;
    if (p < 0.5) return 'rgba(255,240,4,.5)';   // yellow
    if (p < 0.8) return 'rgba(255,157,46,.5)';  // amber
    return 'rgba(255,90,60,.5)';                // coral
  };
  return (
    <div className="eq-ring" aria-hidden>
      {bars.map((b, i) => (
        <span
          key={i}
          style={{
            display: 'block', width: 4, borderRadius: 3, alignSelf: 'flex-end',
            background: heat(i),
            animation: `eq ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
