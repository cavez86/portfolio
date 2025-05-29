import { Suspense } from 'react';

import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import ContactSectionView from './ContactSectionView';

const ContactSection = () => {
  const contactsPromise = getLocalizedCollection('contacts');
  const personalInfoPromise = getLocalizedGlobal('personal-info');

  return (
    <Suspense>
      <ContactSectionView contacts={contactsPromise} personalInfo={personalInfoPromise} />
    </Suspense>
  );
};

export default ContactSection;
