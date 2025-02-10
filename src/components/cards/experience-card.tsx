import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { experience } from '@/data/content';

export function ExperienceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold">
              {exp.company} - {exp.location}
            </h3>
            <p className="mb-2 text-muted-foreground">
              {exp.position} ({exp.period})
            </p>
            {exp.achievements ? (
              <ul className="list-inside list-disc space-y-2 pl-4 text-muted-foreground">
                {exp.achievements.map(({ label, description }, i) => (
                  <li key={i}>
                    <span className="font-semibold text-white">{label}:</span> {description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">{exp.description}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
