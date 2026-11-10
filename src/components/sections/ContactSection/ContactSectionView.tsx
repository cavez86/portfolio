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
    <Section
      className="bg-notte pb-14 md:pb-20"
      heading={t('title')}
      id="contact"
      intro={
        personalInfoData.availability && (
          <p className="flex items-baseline gap-3">
            <span aria-hidden="true" className="bg-oro size-2 shrink-0 translate-y-[-0.1em] rounded-full" />
            {personalInfoData.availability}
          </p>
        )
      }
    >
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
      </div>
    </Section>
  );
};

export default ContactSectionView;
