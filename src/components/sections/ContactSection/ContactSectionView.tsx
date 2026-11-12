import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import { ContactLink } from './ContactLink';

const ContactSection = async () => {
  const [contacts, personalInfo, t] = await Promise.all([
    getLocalizedCollection('contacts', ['id']),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <div className="bg-band text-on-band [--highlight:color-mix(in_srgb,var(--on-band)_20%,var(--band))]">
      <Section className="border-t-0 md:py-24" id="contact" title={t('title')}>
        {personalInfo.availability && <p className="mb-8 max-w-[60ch] text-xl">{personalInfo.availability}</p>}
        <ul className="flex flex-col border-t border-on-band/30">
          {contacts.map((contact) => (
            <li className="border-b border-on-band/30" key={contact.url}>
              <ContactLink handle={contact.description ?? contact.url} label={contact.label} url={contact.url} />
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default ContactSection;
