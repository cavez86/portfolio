import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8'>
      {/* Header */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='text-center'>
            <h1 className='text-4xl font-bold mb-4'>Francesco Caveglia Beatris</h1>
            <p className='text-2xl text-muted-foreground'>Full Stack Web Developer</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center gap-4'>
            <Button variant='outline' asChild>
              <a href='mailto:francesco.caveglia@yahoo.it'>
                <Mail className='w-4 h-4 mr-2' />
                Email
              </a>
            </Button>
            <Button variant='outline' asChild>
              <a href='https://www.linkedin.com/in/francesco-caveglia-beatris-25012732/'>
                <Linkedin className='w-4 h-4 mr-2' />
                LinkedIn
              </a>
            </Button>
            <Button variant='outline' asChild>
              <a href='https://github.com/cavez86'>
                <Github className='w-4 h-4 mr-2' />
                GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            Experienced Full Stack Web Developer specializing in React, Next.js, TypeScript, and Tailwind CSS. Adept at
            performance optimization, state management, and backend integration.
          </p>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Professional Experience</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div>
            <h3 className='text-xl font-bold'>Deltatre – Torino, Italy</h3>
            <p className='text-muted-foreground mb-2'>Tech Lead, Full Stack Web Developer (2019 - Present)</p>
            <ul className='list-disc list-inside space-y-2 text-muted-foreground pl-4'>
              <li>Lead developer for UEFA.com and other high-profile sports websites</li>
              <li>Architected and implemented Next.js applications for major sports platforms</li>
              <li>Developed fully typed applications with TypeScript</li>
              <li>Contributed to design systems built with Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl font-bold'>Teoresi</h3>
            <p className='text-muted-foreground mb-2'>Full Stack Web Developer (2015 - 2019)</p>
            <p className='text-muted-foreground'>Consultant for Deltatre, contributing to UEFA Euro 2016 website.</p>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {[
              'React.js',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Zustand',
              'React Query',
              'Node.js',
              '.NET Core',
              'Azure DevOps',
              'Jenkins',
            ].map((skill) => (
              <Badge key={skill} variant='secondary'>
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className='text-xl font-bold'>Master&apos;s Degree in Advanced Technology Physics</h3>
          <p className='text-muted-foreground'>Università degli Studi di Torino (2008 - 2011)</p>
        </CardContent>
      </Card>
    </main>
  );
}
