import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

/** Each way to reach Francesco is written in its own pencil. */
const INKS = ['var(--color-green-ink)', 'var(--color-ink)', 'var(--color-red-pencil)'];

const ContactSectionView = async () => {
  const [contacts, personalInfo, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section className="pb-20 md:pb-28" figure={t('result')} id="contact" title={t('title')}>
      {personalInfo.availability && (
        <p className="mt-3 max-w-[62ch] text-lead text-graphite">{personalInfo.availability}</p>
      )}

      {/* The answer of the exercise, boxed twice in red pencil. */}
      <ul className="mt-8 max-w-5xl divide-y-2 divide-quadretti border-[3px] border-red-pencil bg-paper outline-[3px] outline-offset-[6px] outline-red-pencil md:mt-12">
        {contacts.map((contact, i) => (
          <li key={contact.url}>
            <ContactLink
              description={contact.description}
              ink={INKS[i % INKS.length]}
              label={contact.label}
              url={contact.url}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default ContactSectionView;
