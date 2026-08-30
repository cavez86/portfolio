import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import Icon from '@/components/common/Icon';
import { buttonVariants } from '@/components/ui/button';
import { getLocalizedCollection } from '@/components/utils/db';

const Footer = async () => {
  'use cache';
  const contacts = await getLocalizedCollection('contacts');
  return (
    <footer className="border-t-2 border-primary/30 px-4 py-8 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center">
            <ExportPDFButton />
          </div>

          <div className="flex items-center space-x-4">
            {contacts.map((contact) => (
              <a
                aria-label={contact.label}
                className={buttonVariants({
                  className: 'transition-all hover:text-primary md:text-sm',
                  size: 'lg',
                  variant: 'ghost',
                })}
                href={contact.url}
                key={contact.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.icon && <Icon className="h-5 w-5" name={contact.icon} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
