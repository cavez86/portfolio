import { Button } from '@/components/ui/button';
import { ContactIcon } from '@/components/contact-icon';
import { personalInfo } from '@/data/content';

export function HeaderCard() {
  return (
    <div className="bg-background/50 flex items-center justify-between rounded-lg px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
        <p className="text-muted-foreground">{personalInfo.title}</p>
      </div>
      <div className="flex gap-4">
        {personalInfo.contacts.map((contact) => (
          <Button key={contact.type} variant="ghost" size="sm" asChild>
            <a href={contact.url}>
              <ContactIcon type={contact.type} className="mr-2 h-4 w-4" />
              {contact.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
