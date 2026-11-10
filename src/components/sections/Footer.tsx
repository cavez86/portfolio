import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import Icon from '@/components/common/Icon';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';

const Footer = async () => {
  'use cache';
  const contacts = await getLocalizedCollection('contacts');
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center md:px-8">
        <ExportPDFButton />

        <div className="flex items-center gap-1">
          {contacts.map((contact) => (
            <a
              aria-label={contact.label}
              className={buttonVariants({
                className: 'text-muted-foreground hover:text-foreground',
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
