'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { personalInfo } from '@/data/content';
import Section from '../Section';
import { useTranslations } from 'next-intl';

const ContactSection = () => {
  const t = useTranslations('Contact');

  return (
    <Section id="contact" contentClassName="max-w-3xl">
      <motion.div
        className="md: mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">{t('title')}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">{t('description')}</h3>

            <div className="space-y-6">
              {personalInfo.contacts.map((contact) => (
                <a
                  key={contact.type}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <contact.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{contact.description}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="mb-3 font-medium text-slate-900 dark:text-white">{t('availability')}</h4>
              <p className="text-slate-600 dark:text-slate-400">{t('availability_text')}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Section>
  );
};

export default ContactSection;
