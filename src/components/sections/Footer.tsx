import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import Icon from '@/components/common/Icon';
import { gutter } from '@/components/Section';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

const Footer = async () => {
  'use cache';
  const contacts = await getLocalizedCollection('contacts');
  return (
    <footer className="bg-notte pb-10 md:pb-14">
      <div className={gutter}>
        <div className="border-border flex flex-col items-start justify-between gap-6 border-t pt-8 sm:flex-row sm:items-center">
          <ExportPDFButton />

          <div className="flex items-center gap-1">
            {contacts.map((contact) => (
              <a
                aria-label={contact.label}
                className={cn(buttonVariants({ size: 'icon-lg', variant: 'ghost' }), 'hover:bg-savoia')}
                href={contact.url}
                key={contact.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.icon && <Icon className="size-5" name={contact.icon} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
