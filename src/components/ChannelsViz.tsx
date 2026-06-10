// Top-down cross-section of the cabinet, traced from the production line
// drawing: the front baffle spans the two side walls up top, seated in
// rabbeted tips; the walls sweep apart fast, then run nearly vertical into a
// wide base ending in rabbeted feet at the open back; a single row of
// through-channels runs down each wall. A ripple pulses out of every channel =
// vibration being absorbed and dissipated by the composite walls.
const SIZES = [7, 8, 6, 7, 9, 6, 8, 7, 9, 6, 7, 8, 6, 9, 7, 8, 6, 7, 8]; // diameters
const N = SIZES.length;

const CX = 113;        // vertical centre axis
const Y_TOP = 14;
const Y_BOT = 270;
const HALF_W = 10;     // half-thickness of each wall
const P_NOTCH = 0.11;  // rabbet where the baffle seats (tips are thinner above)
const P_FOOT = 0.93;   // rabbet feet at the base (walls step inward below)

// How far each wall bows away from the centre axis, by progress p (0 top → 1
// bottom): a quarter-ellipse — the tips sweep apart quickly, then the flanks
// run nearly vertical into the wide base.
const off = (p: number) => 50 + 43 * Math.sqrt(1 - (1 - p) * (1 - p));
const yAt = (p: number) => Y_TOP + (Y_BOT - Y_TOP) * p;

// Inner-edge inset from the centreline: thin tip above the baffle rabbet,
// full thickness through the body, inward step at the foot.
const inset = (p: number) => (p < P_NOTCH ? -2 : p > P_FOOT ? 15 : HALF_W);

const STEPS = 46;
const PS = Array.from({ length: STEPS + 1 }, (_, s) => s / STEPS);
// Extra samples either side of each rabbet so the steps stay crisp.
const PS_INNER = [...PS, P_NOTCH - 0.001, P_NOTCH + 0.001, P_FOOT - 0.001, P_FOOT + 0.001]
  .sort((a, b) => b - a);

// Filled band for one wall (sign = +1 right, -1 left): down the outer edge, up the inner.
function wall(sign: number) {
  let d = '';
  PS.forEach((p, i) => {
    d += `${i ? 'L' : 'M'}${(CX + sign * (off(p) + HALF_W)).toFixed(1)},${yAt(p).toFixed(1)} `;
  });
  PS_INNER.forEach((p) => {
    d += `L${(CX + sign * (off(p) - inset(p))).toFixed(1)},${yAt(p).toFixed(1)} `;
  });
  return d + 'Z';
}

// The cavity between the two inner edges (closed across the open base).
function cavity() {
  const ps = PS_INNER.filter((p) => p >= 0.05).sort((a, b) => a - b);
  let d = '';
  ps.forEach((p, i) => {
    d += `${i ? 'L' : 'M'}${(CX - (off(p) - inset(p))).toFixed(1)},${yAt(p).toFixed(1)} `;
  });
  [...ps].reverse().forEach((p) => {
    d += `L${(CX + (off(p) - inset(p))).toFixed(1)},${yAt(p).toFixed(1)} `;
  });
  return d + 'Z';
}

const WALL_R = wall(1);
const WALL_L = wall(-1);
const CAVITY = cavity();

// Front baffle: a gently crowned band tucked behind the thin wall tips.
const BAF_X = off(P_NOTCH) + 2;
const BAFFLE =
  `M${(CX - BAF_X).toFixed(1)},22 Q${CX},16 ${(CX + BAF_X).toFixed(1)},22 ` +
  `L${(CX + BAF_X).toFixed(1)},42 Q${CX},36 ${(CX - BAF_X).toFixed(1)},42 Z`;

// Channels along both walls.
const CHANNELS = SIZES.flatMap((dia, i) => {
  const p = 0.135 + (i / (N - 1)) * 0.72; // from just below the baffle to the feet
  return [
    { x: CX + off(p), y: yAt(p), r: dia / 2, delay: i * 0.16 },
    { x: CX - off(p), y: yAt(p), r: dia / 2, delay: i * 0.16 + 0.08 },
  ];
});

export default function ChannelsViz() {
  return (
    <div className="viz ch-viz" aria-hidden>
      <svg viewBox="4 4 218 274" preserveAspectRatio="xMidYMid meet">
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
        <path className="ch-wall" d={BAFFLE} fill="url(#chWall)" />
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
