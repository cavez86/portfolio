'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useRef } from 'react';

import { type Controller, mountCradle, RELEASE_DEG } from './mountCradle';

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

/** The name as a Newton's cradle, at rest until a letter is dragged or tapped; `children` (the title block) sit beside the first row on wide pages. */
export function NameCradle({ name, children }: { name: string; children?: ReactNode }) {
  const t = useTranslations('Hero');
  const common = useTranslations('Common');
  const words = splitName(name);
  const firstLetter = words[0]?.letters[0]?.char ?? '';

  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<SVGSVGElement>(null);
  const controller = useRef<Controller | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const overlay = overlayRef.current;
    if (!heading || !overlay) return;

    const cradle = mountCradle({ heading, overlay });
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
          onPointerMove={(event) => controller.current?.pointerMove(event)}
          onPointerUp={(event) => controller.current?.pointerUp(event)}
          ref={headingRef}
        >
          {words.map((word) => (
            <span className="cradle-word" key={word.start}>
              {word.letters.map(({ char, index }) => (
                <span className="cradle-bob" data-top={attachment(char)} key={index}>
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        {/* The free-body diagram, drawn only while a letter swings. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0"
          ref={overlayRef}
        >
          <g fill="none" stroke="var(--color-ink)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
            <line data-part="vertical" stroke="var(--color-pencil)" strokeDasharray="5 6" strokeWidth="1.5" />
            <path data-part="arc" stroke="var(--color-pencil)" strokeWidth="1.5" />
            <path data-part="tension" />
            <path data-part="weight" />
            <path data-part="force" />
          </g>
          <g className="math" fill="var(--color-ink)">
            <text data-part="theta" fill="var(--color-pencil)">
              θ
            </text>
            <text data-part="tension-label">T</text>
            <text data-part="weight-label">mg</text>
            <text data-part="force-label">F</text>
          </g>
        </svg>
        <div className="cradle-title">{children}</div>
      </div>

      <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 text-caption text-pencil md:mt-8">
        <span className="margin-note">{common('figure', { number: 1 })}</span>
        <span>{t('caption')}</span>
        <button
          className="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-ink motion-reduce:hidden"
          onClick={() => controller.current?.release()}
          type="button"
        >
          {t('release', { angle: RELEASE_DEG, letter: firstLetter })}
        </button>
      </figcaption>
    </figure>
  );
}
