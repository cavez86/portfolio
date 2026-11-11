import { getTranslations } from 'next-intl/server';

import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

/** A row of arcade pillars (Turin's portici) along one side of the piazza. */
const Arcade = ({ className }: { className: string }) => (
  <span aria-hidden="true" className={`arcade absolute inset-x-0 ${className}`} />
);

/** The contact district is the piazza at the end of the walk: arcades on two sides, the ways to reach him inside. */
const ContactSectionView = async () => {
  const [contactsData, personalInfoData, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <section aria-labelledby="contact-title" className="relative bg-piazza" id="contact">
      <Arcade className="top-0" />
      <div className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <h2 className="font-display text-district font-extrabold text-balance" id="contact-title">
          {t('title')}
        </h2>
        <p className="mt-4 max-w-[40ch] text-lead text-pretty text-carta/90">
          {personalInfoData.availability || t('availability_text')}
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-8 md:mt-16 md:grid-cols-3">
          {contactsData.map((contact) => (
            <li key={contact.url}>
              <ContactLink description={contact.description} label={contact.label} url={contact.url} />
            </li>
          ))}
        </ul>
      </div>
      <Arcade className="bottom-0 -scale-y-100" />
    </section>
  );
};

export default ContactSectionView;
