import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Icon, { type IconName } from '@/components/common/Icon';
import { Motion } from '@/components/common/Motion';
import { Button } from '@/components/ui/button';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

const HeroSection = async () => {
  const [personalInfoData, summaryInfoData, t] = await Promise.all([
    getLocalizedGlobal('personal-info'),
    getLocalizedCollection('summary-info'),
    getTranslations('Hero'),
  ]);

  return (
    <section className="px-4 py-8 md:py-16">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <Motion
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-r from-primary to-accent bg-clip-text text-5xl leading-normal font-bold font-mono uppercase tracking-wider text-transparent md:text-7xl [text-shadow:0_0_30px_var(--color-primary)]"
            initial={{ opacity: 0.1, scale: 0 }}
            transition={{ duration: 0.5 }}
            type="h1"
          >
            {personalInfoData.name}
          </Motion>

          <Motion
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-medium font-mono uppercase tracking-wider text-accent md:text-3xl"
            initial={{ opacity: 0.1, scale: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            type="h2"
          >
            {personalInfoData.title}
          </Motion>

          <Motion
            className="mx-auto text-lg text-pretty text-muted-foreground"
            initial={{ opacity: 0.1, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            type="div"
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <RichText data={personalInfoData.description as SerializedEditorState} />
          </Motion>

          <Motion
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0.1, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            type="div"
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Link href="#contact">
              <Button size="lg" variant="outline">
                {t('contact_me')}
              </Button>
            </Link>
          </Motion>
        </div>

        <Motion
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 md:mt-16 md:grid-cols-4"
          initial={{ opacity: 0.1, y: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          type="div"
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {summaryInfoData.map((item) => (
            <div
              className="bg-card flex flex-col items-center border-2 border-primary/30 p-4 text-center transition-all hover:border-primary/60 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_var(--color-primary)]"
              key={item.id}
            >
              <Icon className="mb-2 h-8 w-8 text-primary" name={item.icon as IconName} />
              <h3 className="text-sm font-medium font-mono uppercase tracking-wider text-muted-foreground">
                {t(item.label)}
              </h3>
              <p className="text-base font-semibold font-mono text-foreground">{t(item.value)}</p>
            </div>
          ))}
        </Motion>
      </div>
    </section>
  );
};

export default HeroSection;
