import { Button } from '@/components/ui/button';
import { ContactIcon } from '@/components/contact-icon';
import { personalInfo } from '@/data/content';
import { ThemeToggle } from '@/components/theme-toggle';

export function HeaderCard() {
  return (
    <div className="bg-background/50 flex items-center justify-between rounded-lg px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
        <p className="text-muted-foreground">{personalInfo.title}</p>
      </div>
      <div className="flex items-center gap-4">
        {personalInfo.contacts.map((contact) => (
          <Button key={contact.type} variant="ghost" size="sm" className="rounded" asChild>
            <a href={contact.url}>
              <ContactIcon type={contact.type} className="mr-2 h-4 w-4" />
              {contact.label}
            </a>
          </Button>
        ))}
        <div className="ml-2 border-l pl-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
