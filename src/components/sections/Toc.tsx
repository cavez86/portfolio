import { getTranslations } from 'next-intl/server';

import { getReleases } from '@/components/utils/db';

const linkClass = 'block rounded-sm py-1 text-muted-foreground hover:text-foreground';

/** Docs-style "On this page" rail; the release index doubles as a version list. */
export const Toc = async () => {
  const [releases, t, header, about, skills, background, contact] = await Promise.all([
    getReleases(),
    getTranslations('Toc'),
    getTranslations('Header'),
    getTranslations('About'),
    getTranslations('Skills'),
    getTranslations('Background'),
    getTranslations('Contact'),
  ]);

  return (
    <nav aria-labelledby="toc-title" className="sticky top-24 text-[0.875rem]">
      <p className="mb-3 font-semibold text-foreground" id="toc-title">
        {t('title')}
      </p>
      <ul className="space-y-0.5 border-l pl-4">
        <li>
          <a className={linkClass} href="#about">
            {about('title')}
          </a>
        </li>
        <li>
          <a className={linkClass} href="#releases">
            {header('experience')}
          </a>
          <ul className="mb-1 space-y-0.5">
            {releases.map((release) => (
              <li key={release.anchor}>
                <a className={`${linkClass} flex gap-3`} href={`#${release.anchor}`}>
                  <span className="w-9 shrink-0 font-mono text-[0.8125rem] text-primary">{release.version}</span>
                  <span className="truncate">{release.experience.company}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <a className={linkClass} href="#skills">
            {skills('title')}
          </a>
        </li>
        <li>
          <a className={linkClass} href="#background">
            {background('title')}
          </a>
        </li>
        <li>
          <a className={linkClass} href="#contact">
            {contact('title')}
          </a>
        </li>
      </ul>
    </nav>
  );
};
