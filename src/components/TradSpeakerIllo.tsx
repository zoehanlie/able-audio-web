'use client';
import { useEffect, useRef } from 'react';

// Illustrated dynamic-driver cross-section for the face-off's 傳統喇叭 side,
// lying horizontally and firing left: surround (懸邊) at the rim, cone (振膜)
// converging onto the voice coil (音圈), dust cap (防塵蓋), and the magnet
// stack at the right (前極片 / 磁鐵 / 後極片) with a dashed basket (盆架).
// The cone pumps as a piston — slower and heavier than the electrostatic
// film, with a mechanical wobble.
function geom(t: number) {
  const disp = Math.sin(t * 1.2) * 7 + Math.sin(t * 2.4 + 0.6) * 1.6;
  const apexX = 170 + disp;
  return {
    coneT: `M54,28 Q${(100 + disp * 0.4).toFixed(1)},105 ${apexX.toFixed(1)},170`,
    coneB: `M54,352 Q${(100 + disp * 0.4).toFixed(1)},275 ${apexX.toFixed(1)},210`,
    cap: `M${apexX.toFixed(1)},170 Q${(apexX - 30).toFixed(1)},190 ${apexX.toFixed(1)},210`,
    disp,
  };
}

// A pleasing frozen frame used for SSR and reduced-motion.
const ST = geom(0.5);

export default function TradSpeakerIllo() {
  const coneT = useRef<SVGPathElement>(null);
  const coneB = useRef<SVGPathElement>(null);
  const cap = useRef<SVGPathElement>(null);
  const coil = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = 0.5;
    let raf = 0;
    const tick = () => {
      t += 0.045;
      const g = geom(t);
      coneT.current?.setAttribute('d', g.coneT);
      coneB.current?.setAttribute('d', g.coneB);
      cap.current?.setAttribute('d', g.cap);
      coil.current?.setAttribute('transform', `translate(${g.disp.toFixed(1)} 0)`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="xp-illo" aria-hidden>
      <svg viewBox="0 0 260 380" preserveAspectRatio="xMidYMid meet">
        {/* sound drifting out of the mouth */}
        <path className="tarc" d="M32,100 Q16,190 32,280" />
        <path className="tarc a2" d="M20,82 Q2,190 20,298" />
        {/* rim + surround (懸邊) */}
        <rect className="stand" x="46" y="10" width="12" height="6" rx="2" />
        <rect className="stand" x="46" y="364" width="12" height="6" rx="2" />
        <path className="trim" d="M54,16 Q44,22 54,28" />
        <path className="trim" d="M54,352 Q44,358 54,364" />
        {/* basket (盆架) */}
        <line className="tframe" x1="60" y1="22" x2="184" y2="145" />
        <line className="tframe" x1="60" y1="358" x2="184" y2="235" />
        {/* magnet stack: 前極片 / 磁鐵 / 後極片 */}
        <rect className="stand" x="180" y="140" width="16" height="30" rx="3" />
        <rect className="stand" x="180" y="210" width="16" height="30" rx="3" />
        <rect className="stand" x="196" y="140" width="28" height="100" rx="3" />
        <rect className="stand" x="224" y="140" width="12" height="100" rx="3" />
        <rect className="stand" x="146" y="183" width="78" height="14" rx="3" />
        {/* voice coil (音圈) rides the cone */}
        <g ref={coil} className="tcoil">
          {[176, 184, 192].map((x) => (
            <g key={x}>
              <circle cx={x} cy="175" r="2.2" />
              <circle cx={x} cy="205" r="2.2" />
            </g>
          ))}
        </g>
        {/* cone (振膜) + dust cap (防塵蓋) */}
        <path ref={coneT} className="tcone" d={ST.coneT} />
        <path ref={coneB} className="tcone" d={ST.coneB} />
        <path ref={cap} className="tcone" d={ST.cap} />
      </svg>
    </div>
  );
}
