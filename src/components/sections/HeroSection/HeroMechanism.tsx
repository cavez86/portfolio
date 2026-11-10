import type { CSSProperties } from 'react';

type PartStyle = CSSProperties & Record<`--${string}`, string>;

const gear = (cx: number, cy: number, count: number, ring: number, dot: number, phase = 0) =>
  Array.from({ length: count }, (_, i) => {
    const angle = phase + (i * 2 * Math.PI) / count;
    return { cx: +(cx + ring * Math.cos(angle)).toFixed(1), cy: +(cy + ring * Math.sin(angle)).toFixed(1), r: dot };
  });

const bigTeeth = gear(230, 370, 18, 170, 13);
const smallTeeth = gear(452, 196, 12, 100, 10, Math.PI / 12);
const holes = gear(230, 370, 6, 100, 16);

// Parts of a mechanism: two meshing gears, a crank rod, a flywheel, a belt arc and a few bars.
// Each part flies in once on load (CSS only), and then everything rests.
export const HeroMechanism = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} focusable="false" viewBox="0 0 640 640">
    <g className="mech-part" style={{ '--delay': '0s', '--dy': '60px' } as PartStyle}>
      <rect className="fill-inchiostro" height="28" rx="14" width="560" x="40" y="572" />
      <circle className="fill-carta" cx="72" cy="586" r="5" />
      <circle className="fill-carta" cx="568" cy="586" r="5" />
    </g>

    <g className="mech-part" style={{ '--delay': '0.1s', '--dx': '-120px' } as PartStyle}>
      <rect className="fill-cobalto" height="18" rx="9" width="200" x="40" y="48" />
    </g>
    <g className="mech-part" style={{ '--delay': '0.2s', '--dx': '-120px' } as PartStyle}>
      <rect className="fill-girasole" height="18" rx="9" width="130" x="40" y="78" />
    </g>
    <g className="mech-part" style={{ '--delay': '0.3s', '--dx': '-120px' } as PartStyle}>
      <rect className="fill-pomodoro" height="18" rx="9" width="165" x="40" y="108" />
    </g>

    <g
      className="mech-part"
      style={
        {
          '--delay': '0.35s',
          '--dx': '-150px',
          '--dy': '-90px',
          '--ox': '230px',
          '--oy': '370px',
          '--rot': '-140deg',
          '--scale': '0.7',
        } as PartStyle
      }
    >
      <circle className="fill-cobalto" cx="230" cy="370" r="150" />
      {bigTeeth.map((t) => (
        <circle className="fill-inchiostro" cx={t.cx} cy={t.cy} key={`${t.cx}-${t.cy}`} r={t.r} />
      ))}
      {holes.map((h) => (
        <circle className="fill-carta" cx={h.cx} cy={h.cy} key={`${h.cx}-${h.cy}`} r={h.r} />
      ))}
      <circle className="fill-carta" cx="230" cy="370" r="52" />
      <circle className="fill-inchiostro" cx="230" cy="370" r="18" />
    </g>

    <g
      className="mech-part"
      style={
        {
          '--delay': '0.5s',
          '--dx': '140px',
          '--dy': '-120px',
          '--ox': '452px',
          '--oy': '196px',
          '--rot': '170deg',
          '--scale': '0.7',
        } as PartStyle
      }
    >
      <circle className="fill-pomodoro" cx="452" cy="196" r="84" />
      {smallTeeth.map((t) => (
        <circle className="fill-inchiostro" cx={t.cx} cy={t.cy} key={`${t.cx}-${t.cy}`} r={t.r} />
      ))}
      <circle className="fill-carta" cx="452" cy="196" r="30" />
    </g>

    <g
      className="mech-part"
      style={
        {
          '--delay': '0.65s',
          '--dx': '170px',
          '--dy': '90px',
          '--ox': '500px',
          '--oy': '440px',
          '--rot': '220deg',
          '--scale': '0.6',
        } as PartStyle
      }
    >
      <circle className="fill-girasole" cx="500" cy="440" r="62" />
      <circle className="fill-none stroke-inchiostro" cx="500" cy="440" r="38" strokeWidth="6" />
      <circle className="fill-inchiostro" cx="500" cy="478" r="9" />
    </g>

    <g
      className="mech-part"
      style={{ '--delay': '0.8s', '--ox': '230px', '--oy': '370px', '--rot': '-70deg' } as PartStyle}
    >
      <path className="fill-none stroke-abete" d="M37.4 299.9A205 205 0 0 1 300.1 177.4" strokeWidth="18" />
    </g>

    <g
      className="mech-part"
      style={{ '--delay': '0.95s', '--ox': '452px', '--oy': '196px', '--rot': '-80deg' } as PartStyle}
    >
      <line className="stroke-abete" strokeLinecap="round" strokeWidth="20" x1="452" x2="500" y1="196" y2="440" />
    </g>
    <circle className="mech-pop fill-inchiostro" cx="452" cy="196" r="13" style={{ '--delay': '1.7s' } as PartStyle} />
    <circle className="mech-pop fill-inchiostro" cx="500" cy="440" r="13" style={{ '--delay': '1.75s' } as PartStyle} />

    <g className="mech-part" style={{ '--delay': '1s', '--dx': '60px', '--dy': '60px' } as PartStyle}>
      <path className="fill-pomodoro" d="M600 572V524A48 48 0 0 0 552 572Z" />
    </g>

    <g className="fill-inchiostro">
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <circle
            className="mech-pop"
            cx={546 + col * 26}
            cy={62 + row * 26}
            key={`${row}-${col}`}
            r="5.5"
            style={{ '--delay': `${1.05 + (row + col) * 0.07}s` } as PartStyle}
          />
        ))
      )}
    </g>

    <circle className="mech-pop fill-pomodoro" cx="400" cy="586" r="8" style={{ '--delay': '2s' } as PartStyle} />
  </svg>
);
