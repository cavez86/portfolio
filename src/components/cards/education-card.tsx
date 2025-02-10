import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { education } from '@/data/content';

export function EducationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold">{education.degree}</h3>
        <p className="text-muted-foreground">
          {education.institution} ({education.period})
        </p>
      </CardContent>
    </Card>
  );
}
