import { personalInfo } from '@/data/content';
import { Button } from '../ui/Button';

const Footer = () => (
  <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0"></div>

        <div className="flex items-center space-x-4">
          {personalInfo.contacts.map((contact) => (
            <Button key={contact.type} variant="ghost" size="lg" className="rounded md:text-sm" asChild>
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                aria-label={contact.label}
              >
                <contact.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
