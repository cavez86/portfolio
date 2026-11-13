import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedGlobal } from '@/components/utils/db';

const AboutSection = async () => {
  const [personalInfo, t] = await Promise.all([getLocalizedGlobal('personal-info'), getTranslations('About')]);
  if (!personalInfo.description) return null;

  return (
    <Section id="about" title={t('title')}>
      <RichText
        className="max-w-[65ch] text-pretty [&_p+p]:mt-5 [&_strong]:font-bold [&>p:first-child]:text-xl [&>p:first-child]:leading-normal"
        data={personalInfo.description as SerializedEditorState}
      />
    </Section>
  );
};

export default AboutSection;
