import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

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
      <div className="mt-8 max-w-4xl border-[3px] border-double border-red-pencil p-1.5 md:mt-12">
        <ul className="divide-y-2 divide-quadretti border-2 border-red-pencil bg-paper">
          {contacts.map((contact) => (
            <li key={contact.url}>
              <ContactLink description={contact.description} label={contact.label} url={contact.url} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ContactSectionView;
