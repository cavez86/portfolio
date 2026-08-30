import { getTranslations } from 'next-intl/server';

import Icon, { type IconName } from '@/components/common/Icon';
import { Motion } from '@/components/common/Motion';
import Section from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';

const ContactSectionView = async () => {
  const [contactsData, personalInfoData, t] = await Promise.all([
    getLocalizedCollection('contacts'),
    getLocalizedGlobal('personal-info'),
    getTranslations('Contact'),
  ]);

  return (
    <Section contentClassName="max-w-3xl" id="contact">
      <Motion
        className="mb-6 text-center"
        initial={{ opacity: 0.1, y: 20 }}
        transition={{ duration: 0.5 }}
        type="div"
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-4 text-3xl font-bold font-mono uppercase tracking-wider text-foreground md:text-4xl">
          {t('title')}
        </h2>
      </Motion>

      <Motion
        initial={{ opacity: 0.1, x: -20 }}
        transition={{ duration: 0.5 }}
        type="div"
        viewport={{ once: true }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <Card>
          <CardContent>
            <h3 className="mb-6 text-xl font-bold font-mono uppercase tracking-wider text-foreground">
              {t('description')}
            </h3>

            <div className="space-y-6">
              {contactsData.map((contact) => (
                <a
                  className="flex items-center gap-4 text-foreground transition-all hover:text-primary"
                  href={contact.url}
                  key={contact.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-primary bg-primary/20">
                    <Icon className="h-5 w-5 text-foreground" name={contact.icon as IconName} />
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
