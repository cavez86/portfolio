import { Suspense } from 'react';

import { ContactSectionSkeleton } from '@/components/sections/SectionSkeleton';

import ContactSectionView from './ContactSectionView';

const ContactSection = () => {
  return (
    <Suspense fallback={<ContactSectionSkeleton />}>
      <ContactSectionView />
    </Suspense>
  );
};

export default ContactSection;
