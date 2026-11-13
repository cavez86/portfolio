import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { SectionSkeleton } from '@/components/sections/SectionSkeleton';

import ContactSectionView from './ContactSectionView';

const ContactSection = async () => {
  const t = await getTranslations('Contact');
  return (
    <Suspense fallback={<SectionSkeleton id="contact" lines={3} title={t('title')} />}>
      <ContactSectionView />
    </Suspense>
  );
};

export default ContactSection;
