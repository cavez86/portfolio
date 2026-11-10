import { getTranslations } from 'next-intl/server';

import type { IconName } from '@/components/common/Icon';
import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

const ContactSectionView = async () => {
  const [contactsData, personalInfoData, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section field="pomodoro" id="contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <h2 className="type-display max-w-[7ch]">{t('title')}</h2>
          <p className="type-lead mt-8 max-w-[26ch]">{personalInfoData.availability ?? t('availability_text')}</p>
        </div>

        <div className="self-end">
          {contactsData.map((contact) => (
            <ContactLink
              description={contact.description}
              icon={contact.icon as IconName}
              key={contact.url}
              label={contact.label}
              url={contact.url}
            />
          ))}
          <div className="border-t-2 border-inchiostro" />
        </div>
      </div>
    </Section>
  );
};

export default ContactSectionView;
