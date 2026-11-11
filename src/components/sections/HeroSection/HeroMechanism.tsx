'use client';

import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import type { CSSProperties, PointerEvent } from 'react';
import { useRef } from 'react';

import { useDrive } from '@/components/common/drive';
import { Gear } from '@/components/common/Gear';
import { ring } from '@/components/common/ring';

type PartStyle = CSSProperties & Record<`--${string}`, string>;

const WIDTH = 1000;
const HEIGHT = 820;

// The big cobalt drive gear meshes with the tomato gear (half its pitch, so it turns twice as fast the
// other way). The green side rod couples the tomato gear to the sunflower flywheel, like a locomotive:
// both cranks have the same radius and speed, so the rod stays parallel and travels on the crank circle.
const DRIVE = { cx: 600, cy: 470, pitch: 284, r: 262 };
const MESHED = { cx: 274, cy: 196, pitch: 142, r: 120 };
const FLYWHEEL = { cx: 150, cy: 640, r: 104 };
const CRANK = 70;
const MESH_RATIO = -DRIVE.pitch / MESHED.pitch;
const toRad = (deg: number) => (deg * Math.PI) / 180;

const assemble = (delay: number, from: Partial<Record<'dx' | 'dy' | 'rot' | 'scale', string>>, origin?: object) =>
  ({
    '--delay': `${delay}s`,
    ...Object.fromEntries(Object.entries(from).map(([key, value]) => [`--${key}`, value])),
    ...origin,
  }) as PartStyle;
const around = ({ cx, cy }: { cx: number; cy: number }) => ({ '--ox': `${cx}px`, '--oy': `${cy}px` });

// Parts fly in once on load (CSS), then the machine is driven by page scroll and by the visitor:
// drag with a mouse or pen to spin the drive gear, or press (click, tap, Enter, Space) to kick it a turn.
export const HeroMechanism = ({ className, label }: { className?: string; label: string }) => {
  const reduced = useReducedMotion();
  const drive = useDrive();
  const spin = useMotionValue(0);
  const angle = useTransform(() => drive.get() + spin.get());
  const meshedAngle = useTransform(angle, (a) => a * MESH_RATIO);
  const rodX = useTransform(meshedAngle, (a) => -CRANK * Math.sin(toRad(a)));
  const rodY = useTransform(meshedAngle, (a) => CRANK * Math.cos(toRad(a)));

  const svgRef = useRef<SVGSVGElement>(null);
  const running = useRef<AnimationPlaybackControls | null>(null);
  const drag = useRef<{ last: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  const pointerAngle = (event: PointerEvent) => {
    const box = svgRef.current?.getBoundingClientRect();
    if (!box) return 0;
    const x = event.clientX - (box.left + (box.width * DRIVE.cx) / WIDTH);
    const y = event.clientY - (box.top + (box.height * DRIVE.cy) / HEIGHT);
    return (Math.atan2(y, x) * 180) / Math.PI;
  };

  const kick = () => {
    running.current?.stop();
    if (reduced) {
      spin.set(spin.get() + 30);
      return;
    }
    running.current = animate(spin, spin.get() + 360, { duration: 1.8, ease: [0.15, 0.85, 0.3, 1] });
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch' || reduced) return;
    running.current?.stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { last: pointerAngle(event), moved: false };
  };

  const onPointerMove = (event: PointerEvent) => {
    const current = drag.current;
    if (!current) return;
    const next = pointerAngle(event);
    const delta = ((next - current.last + 540) % 360) - 180;
    current.last = next;
    current.moved ||= Math.abs(delta) > 0.5;
    spin.set(spin.get() + delta);
  };

  const onPointerUp = () => {
    if (drag.current?.moved) {
      dragged.current = true;
      running.current = animate(spin, spin.get(), {
        power: 0.5,
        timeConstant: 600,
        type: 'inertia',
        velocity: spin.getVelocity(),
      });
    }
    drag.current = null;
  };

  const onClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    kick();
  };

  return (
    <button
      aria-label={label}
      className={`group/mech block cursor-grab touch-pan-y rounded-[3rem] active:cursor-grabbing ${className ?? ''}`}
      onClick={onClick}
      onPointerCancel={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      type="button"
    >
      <svg aria-hidden="true" className="block h-auto w-full" ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <g className="mech-part" style={assemble(0, { dy: '80px' })}>
          <rect className="fill-inchiostro" height="26" rx="13" width="1000" x="40" y="790" />
          <circle className="fill-carta" cx="70" cy="803" r="5" />
          <path className="fill-pomodoro" d="M1000 790V720A70 70 0 0 0 930 790Z" />
        </g>

        <g className="fill-inchiostro">
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                className="mech-pop"
                cx={820 + col * 30}
                cy={56 + row * 30}
                key={`${row}-${col}`}
                r="7"
                style={assemble(1.05 + (row + col) * 0.06, {})}
              />
            ))
          )}
        </g>
        {[
          { fill: 'fill-cobalto', width: 250, y: 44 },
          { fill: 'fill-girasole', width: 170, y: 80 },
          { fill: 'fill-pomodoro', width: 210, y: 116 },
        ].map((bar, i) => (
          <g className="mech-part" key={bar.fill} style={assemble(0.1 + i * 0.1, { dx: '-160px' })}>
            <rect className={`mech-lift ${bar.fill}`} height="22" rx="11" width={bar.width} x="500" y={bar.y} />
          </g>
        ))}

        <g
          className="mech-part"
          style={assemble(0.35, { dx: '200px', dy: '-60px', rot: '-140deg', scale: '0.7' }, around(DRIVE))}
        >
          <g className="mech-lift">
            <Gear
              angle={angle}
              className="fill-cobalto"
              cx={DRIVE.cx}
              cy={DRIVE.cy}
              phase={toRad(10)}
              pitch={DRIVE.pitch}
              r={DRIVE.r}
              teeth={24}
              tooth={15}
            >
              {ring(6, 170).map((hole, i) => (
                <circle
                  className={i === 0 ? 'fill-girasole' : 'fill-carta'}
                  cx={hole.x}
                  cy={hole.y}
                  key={`${hole.x},${hole.y}`}
                  r="34"
                />
              ))}
              <circle className="fill-carta" r="80" />
              <circle className="fill-inchiostro" r="28" />
            </Gear>
          </g>
        </g>

        <g
          className="mech-part"
          style={assemble(0.5, { dx: '-120px', dy: '-140px', rot: '170deg', scale: '0.6' }, around(MESHED))}
        >
          <g className="mech-lift">
            <Gear
              angle={meshedAngle}
              className="fill-pomodoro"
              cx={MESHED.cx}
              cy={MESHED.cy}
              phase={toRad(25)}
              pitch={MESHED.pitch}
              r={MESHED.r}
              teeth={12}
              tooth={15}
            >
              <circle className="fill-carta" r="44" />
              <circle className="fill-inchiostro" cy={CRANK} r="16" />
            </Gear>
          </g>
        </g>

        <g
          className="mech-part"
          style={assemble(0.65, { dx: '-160px', dy: '120px', rot: '220deg', scale: '0.6' }, around(FLYWHEEL))}
        >
          <g className="mech-lift">
            <Gear angle={meshedAngle} className="fill-girasole" cx={FLYWHEEL.cx} cy={FLYWHEEL.cy} r={FLYWHEEL.r}>
              <circle className="fill-none stroke-inchiostro" r="70" strokeWidth="10" />
              <circle className="fill-carta" r="26" />
            </Gear>
          </g>
        </g>

        <g className="mech-part" style={assemble(0.85, { dy: '-80px', rot: '-30deg' }, around(MESHED))}>
          <motion.g style={{ x: rodX, y: rodY }}>
            <line
              className="stroke-abete"
              strokeLinecap="round"
              strokeWidth="26"
              x1={MESHED.cx}
              x2={FLYWHEEL.cx}
              y1={MESHED.cy}
              y2={FLYWHEEL.cy}
            />
            <circle className="fill-inchiostro" cx={MESHED.cx} cy={MESHED.cy} r="9" />
            <circle className="fill-inchiostro" cx={FLYWHEEL.cx} cy={FLYWHEEL.cy} r="9" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};
