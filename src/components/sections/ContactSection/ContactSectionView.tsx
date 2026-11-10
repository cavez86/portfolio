import { getTranslations } from 'next-intl/server';

import type { IconName } from '@/components/common/Icon';
import Section, { SectionHeading } from '@/components/Section';
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
      className="bg-card"
      heading={
        <>
          <SectionHeading description={t('description')} title={t('title')} />
          {personalInfoData.availability && (
            <div className="mt-8 border-l-2 border-primary pl-4">
              <h3 className="font-semibold">{t('availability')}</h3>
              <p className="text-muted-foreground">{personalInfoData.availability}</p>
            </div>
          )}
        </>
      }
      id="contact"
    >
      <div className="flex flex-col divide-y divide-border border-y border-border">
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
