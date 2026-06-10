// Top-down cross-section of the cabinet: two mirrored curved side walls, each
// studded with through-channels along its length, meeting at points up top and
// opening into the cavity below. A ripple pulses out of every channel =
// vibration being absorbed and dissipated by the composite walls.
const SIZES = [7, 8, 6, 7, 9, 6, 8, 7, 9, 6, 7, 8, 6, 9, 7, 8, 6, 7]; // diameters
const N = SIZES.length;

const CX = 108;        // vertical centre axis
const Y_TOP = 24;
const Y_BOT = 292;
const HALF_W = 9;      // half-thickness of each wall

// How far each wall bows away from the centre axis, by progress p (0 top → 1 bottom):
// near-touching points at the top, widest just past the middle, still open at the base.
const off = (p: number) => 12 + 44 * Math.sin(p * Math.PI * 0.82);
const yAt = (p: number) => Y_TOP + (Y_BOT - Y_TOP) * p;

// Filled band for one wall (sign = +1 right, -1 left): down the outer edge, up the inner.
function wall(sign: number) {
  const steps = 46;
  let d = '';
  for (let s = 0; s <= steps; s++) {
    const p = s / steps;
    const x = CX + sign * (off(p) + HALF_W);
    d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)},${yAt(p).toFixed(1)} `;
  }
  for (let s = steps; s >= 0; s--) {
    const p = s / steps;
    const x = CX + sign * (off(p) - HALF_W);
    d += `L${x.toFixed(1)},${yAt(p).toFixed(1)} `;
  }
  return d + 'Z';
}

// The cavity between the two inner edges (closed across the open base).
function cavity() {
  const steps = 46;
  let d = '';
  for (let s = 0; s <= steps; s++) {
    const p = s / steps;
    d += `${s === 0 ? 'M' : 'L'}${(CX - (off(p) - HALF_W)).toFixed(1)},${yAt(p).toFixed(1)} `;
  }
  for (let s = steps; s >= 0; s--) {
    const p = s / steps;
    d += `L${(CX + (off(p) - HALF_W)).toFixed(1)},${yAt(p).toFixed(1)} `;
  }
  return d + 'Z';
}

const WALL_R = wall(1);
const WALL_L = wall(-1);
const CAVITY = cavity();

// Channels along both walls.
const CHANNELS = SIZES.flatMap((dia, i) => {
  const p = 0.06 + (i / (N - 1)) * 0.88; // inset from the pointed/open ends
  return [
    { x: CX + off(p), y: yAt(p), r: dia / 2, delay: i * 0.16 },
    { x: CX - off(p), y: yAt(p), r: dia / 2, delay: i * 0.16 + 0.08 },
  ];
});

export default function ChannelsViz() {
  return (
    <div className="viz ch-viz" aria-hidden>
      <svg viewBox="40 6 136 304" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="chWall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1e15" />
            <stop offset="100%" stopColor="#0d0d0e" />
          </linearGradient>
          <linearGradient id="chCav" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#121211" />
            <stop offset="100%" stopColor="#070708" />
          </linearGradient>
        </defs>
        <path className="ch-cavity" d={CAVITY} fill="url(#chCav)" />
        <path className="ch-wall" d={WALL_L} fill="url(#chWall)" />
        <path className="ch-wall" d={WALL_R} fill="url(#chWall)" />
        {CHANNELS.map((c, i) => (
          <g key={i}>
            <circle className="ch-hole" cx={c.x} cy={c.y} r={c.r} />
            <circle
              className="ch-ring"
              cx={c.x}
              cy={c.y}
              r={c.r}
              style={{ animationDelay: `${c.delay}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
