import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection } from '@/components/utils/db';

import RiverBoat from './RiverBoat';

/** One bridge symbol: a deck with flared ends, carrying a lit street from bank to bank. */
const Bridge = () => (
  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-6">
    <span className="absolute -inset-y-6 left-1/2 w-[3px] -translate-x-1/2 bg-lampione" />
    <span className="absolute inset-y-[9px] inset-x-0.5 border-x-2 border-carta bg-po transition-colors group-hover/bridge:border-lampione" />
    <span className="absolute inset-y-[9px] left-1/2 w-[3px] -translate-x-1/2 bg-lampione" />
    {['top-0', 'bottom-0 -scale-y-100'].map((position) => (
      <svg
        aria-hidden="true"
        className={`absolute inset-x-0 h-[9px] w-full overflow-visible ${position}`}
        key={position}
        preserveAspectRatio="none"
        viewBox="0 0 24 9"
      >
        <path className="stroke-carta" d="M-4,0L3,9M28,0L21,9" fill="none" strokeWidth="2" />
      </svg>
    ))}
  </span>
);

/** The languages district lies on the Po: the heading is lettered on the water, each language is a bridge. */
const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <section aria-labelledby="languages-title" className="relative bg-po" id="languages">
      {['top-0', 'bottom-0'].map((edge) => (
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 h-2 border-y-2 border-riva/90 border-b-riva/50 ${edge}`}
          key={edge}
        />
      ))}
      <RiverBoat />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)] px-5 md:px-8">
        <h2
          className="rotate-180 self-center py-16 pr-6 pl-1 font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] leading-none font-bold tracking-[0.04em] text-riva italic [writing-mode:vertical-rl] md:pr-10"
          id="languages-title"
        >
          {t('title')}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-x-4 md:gap-x-10">
          {languagesData.map((lang) => (
            <li className="group/bridge relative py-16 pl-9 md:py-20 md:pl-14" key={lang.id}>
              <Bridge />
              <h3 className="font-display text-stop font-extrabold">{lang.language}</h3>
              <p className="mt-2 text-body text-pretty text-carta">{lang.proficiency}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LanguagesSection;
