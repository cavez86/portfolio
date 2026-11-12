import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import ContactSectionView from './ContactSectionView';

const ContactSection = () => (
  <Suspense fallback={<SectionSkeleton rows={3} />}>
    <ContactSectionView />
  </Suspense>
);

export default ContactSection;
