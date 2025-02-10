import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { softSkills } from '@/data/content';

export function SoftSkillsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Soft Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-2 pl-4 text-muted-foreground">
          {softSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
