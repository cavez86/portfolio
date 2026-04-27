import { getTranslations } from 'next-intl/server';

import Icon, { IconName } from '@/components/common/Icon';
import { Motion } from '@/components/common/Motion';
import { Card, CardContent } from '@/components/ui/card';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

import Section from '../../Section';

const ContactSectionView = async () => {
  const [contactsData, personalInfoData, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section id="contact" contentClassName="max-w-3xl">
      <Motion
        type="div"
        className="mb-6 text-center"
        initial={{ opacity: 0.1, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:text-4xl">
          {t('title')}
        </h2>
      </Motion>

      <Motion
        type="div"
        initial={{ opacity: 0.1, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent>
            <h3 className="mb-6 text-xl font-bold font-mono uppercase tracking-wider text-foreground">
              {t('description')}
            </h3>

            <div className="space-y-6">
              {contactsData.map((contact) => (
                <a
                  key={contact.url}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-foreground transition-all hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-primary bg-primary/20">
                    <Icon name={contact.icon as IconName} className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.label}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                </a>
              ))}
            </div>

            {personalInfoData.availability && (
              <div className="mt-8">
                <h4 className="mb-3 font-medium text-white">{t('availability')}</h4>
                <p className="text-slate-400">{personalInfoData.availability}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Motion>
    </Section>
  );
};

export default ContactSectionView;
