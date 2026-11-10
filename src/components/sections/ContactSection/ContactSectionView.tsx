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
    <Section className="bg-notte" heading={t('title')} id="contact" intro={t('description')}>
      <div className="border-border divide-border divide-y border-y">
        {contactsData.map((contact) => (
          <ContactLink
            description={contact.description}
            icon={contact.icon as IconName}
            key={contact.url}
            label={contact.label}
            url={contact.url}
          />
        ))}
        {personalInfoData.availability && (
          <div className="grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[13rem_1fr] md:py-8">
            <span className="text-foschia flex items-center gap-2 text-[0.9375rem]">
              <span aria-hidden="true" className="bg-oro size-2 rounded-full" />
              {t('availability')}
            </span>
            <p className="max-w-[48ch] text-lg text-pretty">{personalInfoData.availability}</p>
          </div>
        )}
      </div>
    </Section>
  );
};

export default ContactSectionView;
