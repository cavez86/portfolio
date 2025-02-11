import { Button } from '@/components/ui/button';
import { ContactIcon } from '@/components/contact-icon';
import { personalInfo } from '@/data/content';
import { ThemeToggle } from '@/components/theme-toggle';

export const Header = () => (
  <header className="bg-background dark:bg-background/50 sticky -top-[66px] z-50 flex flex-wrap items-center justify-between gap-2 px-6 py-4 backdrop-blur-xl md:top-0">
    <div className="flex flex-col">
      <h1 className="text-foreground text-2xl font-bold">{personalInfo.name}</h1>
      <p className="text-muted-foreground">{personalInfo.title}</p>
    </div>
    <div className="flex flex-1 items-center justify-end gap-4">
      {personalInfo.contacts.map((contact) => (
        <Button key={contact.type} variant="ghost" size="sm" className="rounded md:text-sm" asChild>
          <a href={contact.url}>
            <ContactIcon type={contact.type} className="h-4 w-4 md:mr-2" />
            <span className="hidden md:block">{contact.label}</span>
          </a>
        </Button>
      ))}
      <div className="ml-auto md:ml-2 md:border-l md:pl-4">
        <ThemeToggle />
      </div>
    </div>
  </header>
);
