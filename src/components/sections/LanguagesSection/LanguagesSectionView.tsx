import { Globe } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { Motion } from '@/components/common/Motion';
import Section from '@/components/Section';
import { getLocalizedCollection } from '@/components/utils/db';
import { getTranslations } from 'next-intl/server';

const LanguagesSection = async () => {
  const [languagesData, t] = await Promise.all([getLocalizedCollection('languages'), getTranslations('Languages')]);

  return (
    <Section contentClassName="max-w-3xl">
      <Motion
        type="div"
        className="mb-6 text-center md:mb-12"
        initial={{ opacity: 0.1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:text-4xl">
          {t('title')}
        </h2>
        <p className="text-lg text-muted-foreground">{t('description')}</p>
      </Motion>

      <div className="grid gap-6">
        {languagesData.map((lang, index) => (
          <Motion
            type="div"
            key={index}
            initial={{ opacity: 0.1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary/20">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold font-mono uppercase tracking-wider text-foreground">
                        {lang.language}
                      </h3>
                      <span className="text-sm text-muted-foreground">{lang.proficiency}</span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary">
                      <div
                        className="h-2.5 bg-primary shadow-[0_0_8px_var(--color-primary)] transition-[width] duration-1000"
                        style={{ width: `${lang.level}%`, transitionDelay: `${index * 0.5}s` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Motion>
        ))}
      </div>
    </Section>
  );
};

export default LanguagesSection;
