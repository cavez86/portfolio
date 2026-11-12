import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { getTranslations } from 'next-intl/server';

import Section from '@/components/Section';
import { getLocalizedGlobal } from '@/components/utils/db';
import { splitDescription } from '@/components/utils/description';

const AboutSection = async () => {
  const [personalInfo, t] = await Promise.all([getLocalizedGlobal('personal-info'), getTranslations('About')]);
  const { rest } = splitDescription(personalInfo.description as SerializedEditorState | null);

  if (!rest) return null;
  return (
    <Section id="about" title={t('title')}>
      <div className="prose-notes max-w-[65ch] text-muted-foreground">
        <RichText data={rest} />
      </div>
    </Section>
  );
};

export default AboutSection;
