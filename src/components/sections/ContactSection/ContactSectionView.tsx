import { getTranslations } from 'next-intl/server';

import type { IconName } from '@/components/common/Icon';
import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';
import { PanelGear } from './PanelGear';

const caps = ['bg-cobalto text-white', 'bg-girasole text-inchiostro', 'bg-carta text-inchiostro'];

const ContactSectionView = async () => {
  const [contactsData, personalInfoData, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section edge={<PanelGear />} field="pomodoro" id="contact">
      <h2 className="type-display max-w-[10ch]">{t('title')}</h2>
      <p className="type-lead mt-6 max-w-[30ch] md:mt-8">{personalInfoData.availability ?? t('availability_text')}</p>

      <ul className="relative mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
        <li aria-hidden="true" className="bg-inchiostro absolute top-20 h-5 w-full rounded-full max-md:hidden" />
        {contactsData.map((contact, index) => (
          <li className="relative" key={contact.url}>
            <ContactLink
              cap={caps[index % caps.length]}
              description={contact.description}
              icon={contact.icon as IconName}
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
