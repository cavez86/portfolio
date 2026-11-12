import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

const ContactSectionView = async () => {
  const [contacts, personalInfo, t] = await Promise.all([
    getLocalizedCollection('contacts', ['id']),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section className="lg:max-w-[46rem]" id="contact" title={t('title')}>
      {personalInfo.availability && (
        <p className="-mt-4 mb-6 max-w-[62ch] text-muted-foreground">
          <span className="font-semibold text-foreground">{t('availability')}:</span> {personalInfo.availability}
        </p>
      )}
      <ul className="divide-y border-y">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <ContactLink
              description={contact.description}
              icon={contact.icon}
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
