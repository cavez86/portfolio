import { ExportPDFButton } from '@/components/common/ExportPDFButton';
import Icon from '@/components/common/Icon';
import { getLocalizedCollection } from '@/components/utils/db';

const Footer = async () => {
  'use cache';
  const contacts = await getLocalizedCollection('contacts');

  return (
    <footer className="border-t-2 border-ink bg-paper/90">
      <div className="sheet flex flex-wrap items-center gap-x-8 gap-y-4 py-8 pr-20">
        <ExportPDFButton />
        <ul className="flex items-center gap-1">
          {contacts.map((contact) => (
            <li key={contact.url}>
              <a
                aria-label={contact.label}
                className="inline-flex size-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-quadretti"
                href={contact.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {contact.icon && <Icon aria-hidden="true" className="size-5" name={contact.icon} />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
