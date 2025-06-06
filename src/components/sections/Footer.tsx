import Icon, { IconName } from '../common/Icon';
import { Button } from '../ui/button';
import { getLocalizedCollection } from '../utils/db';

const Footer = async () => {
  const contacts = await getLocalizedCollection('contacts');
  return (
    <footer className="border-t border-slate-200 px-4 py-8 dark:border-slate-800">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0"></div>

          <div className="flex items-center space-x-4">
            {contacts.map((contact) => (
              <Button key={contact.url} variant="ghost" size="lg" className="rounded md:text-sm" asChild>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
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
