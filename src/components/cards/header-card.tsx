import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ContactIcon } from '@/components/contact-icon';
import { personalInfo } from '@/data/content';

export function HeaderCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          <h1 className="mb-4 text-4xl font-bold">{personalInfo.name}</h1>
          <p className="text-2xl text-muted-foreground">{personalInfo.title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          {personalInfo.contacts.map((contact) => (
            <Button key={contact.type} variant="outline" asChild>
              <a href={contact.url}>
                <ContactIcon type={contact.type} className="mr-2 h-4 w-4" />
                {contact.label}
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
