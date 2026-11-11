'use client';

import { useTranslations } from 'next-intl';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { type Controller, formatDegrees, mountCradle, RELEASE_DEG, RELEASE_THETA } from './mountCradle';

/** Where the ring sits on the glyph: on the dot, an ascender, a t, the x-height, or (by default) a capital. */
const attachment = (letter: string) => {
  if (/[ij]/.test(letter)) return 'dot';
  if (letter === 't') return 't';
  if (/[bdfhkl]/.test(letter)) return 'ascender';
  if (/[a-z]/.test(letter)) return 'x';
  return 'cap';
};

const splitName = (name: string) => {
  let start = 0;
  return name
    .trim()
    .split(/\s+/)
    .map((text) => {
      const word = { letters: Array.from(text, (char, i) => ({ char, index: start + i })), start };
      start += word.letters.length;
      return word;
    });
};

/** The name as a live Newton's cradle; `children` (the title block) sit beside the first row on wide pages. */
export function NameCradle({ name, children }: { name: string; children?: ReactNode }) {
  const t = useTranslations('Hero');
  const common = useTranslations('Common');
  const words = splitName(name);
  const letters = words.flatMap((word) => word.letters.map((letter) => letter.char));
  const firstLetter = letters[0] ?? '';

  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const subscriptRef = useRef<HTMLElement>(null);
  const controller = useRef<Controller | null>(null);
  const [measured, setMeasured] = useState<{ length: number; period: number } | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const overlay = overlayRef.current;
    const readout = readoutRef.current;
    const subscript = subscriptRef.current;
    if (!heading || !overlay || !readout || !subscript) return;

    const cradle = mountCradle({ heading, onMeasure: setMeasured, overlay, readout, subscript });
    controller.current = cradle;
    return () => {
      cradle.dispose();
      controller.current = null;
    };
  }, []);

  return (
    <figure className="cradle-frame m-0">
      <div className="relative">
        <h1
          aria-label={name}
          className="cradle"
          onPointerCancel={(event) => controller.current?.pointerUp(event)}
          onPointerDown={(event) => controller.current?.pointerDown(event)}
          onPointerLeave={() => controller.current?.pointerLeave()}
          onPointerMove={(event) => controller.current?.pointerMove(event)}
          onPointerUp={(event) => controller.current?.pointerUp(event)}
          ref={headingRef}
        >
          {words.map((word) => (
            <span className="cradle-word" key={word.start}>
              {word.letters.map(({ char, index }) => (
                <span
                  className="cradle-bob"
                  data-top={attachment(char)}
                  key={index}
                  style={index === 0 ? ({ '--theta': `${RELEASE_THETA}rad` } as CSSProperties) : undefined}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0 transition-opacity duration-300"
          ref={overlayRef}
        >
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path data-part="wedge" fill="var(--color-highlighter)" fillOpacity="0.8" stroke="none" />
            <path data-part="flashes" fill="var(--color-green-ink)" fillOpacity="0.6" stroke="none" />
            <line data-part="vertical" stroke="var(--color-pencil)" strokeDasharray="6 7" strokeWidth="2" />
            <path data-part="arc" stroke="var(--color-graphite)" strokeWidth="2" />
            <path data-part="tension" stroke="var(--color-red-pencil)" strokeWidth="4" />
            <path data-part="weight" stroke="var(--color-red-pencil)" strokeWidth="4" />
            <path data-part="force" stroke="var(--color-green-ink)" strokeWidth="4" />
          </g>
          <g className="math">
            <text data-part="theta" fill="var(--color-graphite)">
              θ
            </text>
            <text data-part="tension-label" fill="var(--color-red-pencil)">
              T
            </text>
            <text data-part="weight-label" fill="var(--color-red-pencil)">
              mg
            </text>
            <text data-part="force-label" fill="var(--color-green-ink)">
              F
            </text>
          </g>
        </svg>
        <div className="cradle-title">{children}</div>
      </div>

      <figcaption className="mt-8 md:mt-10">
        <p className="margin-note mb-1 md:mb-0">
          {common('figure', { number: 1 })}
          <span className="margin-fact">{t('scale')}</span>
        </p>
        <p className="max-w-[72ch] text-caption text-pencil">
          {t('caption', { count: letters.length })}{' '}
          <span className="whitespace-nowrap">
            <i className="math">L</i> ={' '}
            <span className="inline-block min-w-[2ch] text-right tabular-nums">
              {measured ? measured.length.toFixed(0) : '–'}
            </span>{' '}
            cm
          </span>
          ,{' '}
          <span className="whitespace-nowrap">
            <i className="math">T</i> = 2π√(<i className="math">L</i>/<i className="math">g</i>) ≈{' '}
            <span className="inline-block min-w-[3ch] tabular-nums">{measured ? measured.period.toFixed(2) : '–'}</span>{' '}
            s
          </span>
          .
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-pencil">
          <span aria-hidden="true" className="min-w-[6.5rem] text-[1.05rem] text-graphite tabular-nums">
            <i className="math">θ</i>
            <sub ref={subscriptRef}>{firstLetter}</sub> = <span ref={readoutRef}>{formatDegrees(RELEASE_THETA)}</span>°
          </span>
          <button
            className="cursor-pointer rounded-sm border-2 border-red-pencil px-3 py-1 font-sans text-[0.95rem] font-semibold text-red-pencil transition-colors hover:bg-highlighter motion-reduce:hidden"
            onClick={() => controller.current?.release()}
            type="button"
          >
            {t('release', { angle: RELEASE_DEG, letter: firstLetter })}
          </button>
          <span className="motion-reduce:hidden">{t('hint')}</span>
        </div>
      </figcaption>
    </figure>
  );
}
