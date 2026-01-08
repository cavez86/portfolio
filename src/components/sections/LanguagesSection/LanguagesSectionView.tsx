'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { use } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Language } from '@/payload-types';

import Section from '../../Section';

const LanguagesSection = ({ languages }: { languages: Promise<Language[]> }) => {
  const languagesData = use(languages);
  const t = useTranslations('Languages');

  return (
    <Section contentClassName="max-w-3xl">
      <motion.div
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
      </motion.div>

      <div className="grid gap-6">
        {languagesData.map((lang, index) => (
          <motion.div
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
                      <motion.div
                        className="h-2.5 bg-primary dark:shadow-[0_0_8px_var(--color-primary)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default LanguagesSection;
