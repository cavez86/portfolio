'use client';

import { useTranslations } from 'next-intl';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

import { type Controller, mountCradle, RELEASE_DEG, RELEASE_THETA } from './mountCradle';

/** Where the string meets the glyph: capitals and ascenders at the top, dotted letters at the dot, the rest at x-height. */
const attachment = (letter: string) => {
  if (/[ij]/.test(letter)) return 'dot';
  if (/[a-z]/.test(letter) && !/[bdfhklt]/.test(letter)) return 'x';
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

/** The name as a live Newton's cradle; `children` sit between the letters and the caption. */
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
    <figure className="m-0">
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
            <span className="cradle-word" data-start={word.start} key={word.start}>
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
            <line data-part="vertical" stroke="var(--color-pencil)" strokeDasharray="5 6" strokeWidth="1.75" />
            <path data-part="arc" stroke="var(--color-pencil)" strokeWidth="1.75" />
            <path data-part="tension" stroke="var(--color-ink)" strokeWidth="2.5" />
            <path data-part="weight" stroke="var(--color-graphite)" strokeWidth="2.5" />
            <path data-part="velocity" stroke="var(--color-green-ink)" strokeWidth="2.5" />
            <path data-part="force" stroke="var(--color-red-pencil)" strokeWidth="3" />
          </g>
          <g className="math">
            <text data-part="theta" fill="var(--color-pencil)">
              θ
            </text>
            <text data-part="tension-label" fill="var(--color-ink)">
              T
            </text>
            <text data-part="weight-label" fill="var(--color-graphite)">
              mg
            </text>
            <text data-part="velocity-label" fill="var(--color-green-ink)">
              v
            </text>
            <text data-part="force-label" fill="var(--color-red-pencil)">
              F
            </text>
          </g>
        </svg>
      </div>

      {children}

      <figcaption className="mt-5 flex max-w-[64ch] flex-col gap-3 text-caption text-pencil md:mt-7">
        <span>
          <span className="math text-red-pencil">{common('figure', { number: 1 })}</span>{' '}
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
          . {t('scale')}
        </span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span aria-hidden="true" className="text-[1.05rem] text-graphite tabular-nums">
            <i className="math">θ</i>
            <sub ref={subscriptRef}>{firstLetter}</sub> = <span ref={readoutRef}>{(-RELEASE_DEG).toFixed(1)}</span>°
          </span>
          <button
            className="cursor-pointer rounded-sm border-2 border-ink px-3 py-1 font-sans text-[0.95rem] font-semibold text-ink transition-colors hover:bg-highlighter motion-reduce:hidden"
            onClick={() => controller.current?.release()}
            type="button"
          >
            {t('release', { angle: RELEASE_DEG, letter: firstLetter })}
          </button>
          <span className="motion-reduce:hidden">{t('hint')}</span>
        </span>
      </figcaption>
    </figure>
  );
}
