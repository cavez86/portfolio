import { ExportPDFButton } from '../common/ExportPDFButton';
import Icon, { IconName } from '../common/Icon';
import { Button } from '../ui/button';
import { getLocalizedCollection } from '../utils/db';

const Footer = async () => {
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
              <Button key={contact.url} variant="ghost" size="lg" className="md:text-sm" asChild>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:text-primary"
                  aria-label={contact.label}
                >
                  <Icon name={contact.icon as IconName} className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
