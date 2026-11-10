import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import Icon from '@/components/common/Icon';
import { fieldClasses } from '@/components/Section';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';
import { cn } from '@/lib/utils';

const Footer = async () => {
  'use cache';
  const contacts = await getLocalizedCollection('contacts');
  return (
    <footer className={cn(fieldClasses.inchiostro, 'px-5 py-10 md:px-10')}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <ExportPDFButton />

        <div className="flex items-center gap-3">
          {contacts.map((contact) => (
            <a
              aria-label={contact.label}
              className={buttonVariants({
                className: 'border-carta text-carta hover:border-girasole hover:bg-girasole hover:text-inchiostro',
                size: 'icon',
                variant: 'ghost',
              })}
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
    </footer>
  );
};

export default Footer;
