import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { languages } from '@/data/content';

export function LanguagesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-4">
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
