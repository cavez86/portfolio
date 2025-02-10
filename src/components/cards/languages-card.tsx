import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { languages } from '@/data/content';

export function LanguagesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-2 pl-4 text-muted-foreground">
          {languages.map((lang, index) => (
            <li key={index}>
              {lang.language}: {lang.level}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
