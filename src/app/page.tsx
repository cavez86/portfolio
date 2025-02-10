import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcon } from '@/components/contact-icon';
import { personalInfo, experience, skills, softSkills, education, languages, additionalInfo } from '@/data/content';

export default function Home() {
  return (
    <main className="container mx-auto flex max-w-[1264px] flex-col gap-4 px-4 py-4 lg:gap-8 lg:py-8">
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

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{personalInfo.summary}</p>
            </CardContent>
          </Card>

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
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">{exp.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.category}>
                    <h3 className="mb-2 font-semibold">{category.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:w-1/3 lg:gap-8">
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

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{additionalInfo}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
