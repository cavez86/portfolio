import { getLocalizedCollection } from '@/components/utils/db';

import ContactSectionView from './ContactSectionView';
import { Suspense } from 'react';

const ContactSection = () => {
  const contactsPromise = getLocalizedCollection('contacts');

  return (
    <Suspense>
      <ContactSectionView contacts={contactsPromise} />
    </Suspense>
  );
};

export default ContactSection;
