import {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  Github,
  GraduationCap,
  Layout,
  Lightbulb,
  Linkedin,
  Mail,
  Search,
  Terminal,
  User,
  Users,
} from 'lucide-react';

export const personalInfo = {
  name: 'Francesco Caveglia Beatris',
  title: 'Full Stack Web Developer',
  contacts: [
    {
      type: 'email',
      icon: Mail,
      url: 'mailto:francesco.caveglia@yahoo.it',
      label: 'Email',
      description: 'francesco.caveglia@yahoo.it',
    },
    {
      type: 'linkedin',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/francesco-caveglia-beatris-25012732/',
      label: 'LinkedIn',
      description: 'francesco-caveglia-beatris',
    },
    {
      type: 'github',
      icon: Github,
      url: 'https://github.com/cavez86',
      label: 'GitHub',
      description: 'cavez86',
    },
  ],
  summaryInfo: [
    {
      icon: Code,
      label: 'tech_stack',
      value: 'React, Next.js, TypeScript',
    },
    { icon: Briefcase, label: 'experience_years', value: '10+' },
    { icon: GraduationCap, label: 'education', value: 'phys_master' },
    { icon: User, label: 'location', value: 'Torino, Italy' },
  ],
};

export const experience = [
  {
    company: 'Deltatre',
    location: 'Torino, Italy',
    position: 'Tech Lead, Full Stack Web Developer',
    period: '09/2019 - Present',
    achievements: [
      {
        label: 'React & Next.js Development',
        description: {
          EN: 'Architected and implemented Next.js applications, including LIV Golf and other major sports platforms, leveraging SSR and SSG for improved performance and scalability.',
          IT: 'Progettato e implementato applicazioni Next.js, tra cui LIV Golf e altre piattaforme sportive di rilievo, sfruttando SSR e SSG per migliorare le prestazioni e la scalabilità.',
        },
      },
      {
        label: 'TypeScript & Scalable Codebases',
        description: {
          EN: 'Developed fully typed applications, introducing utility classes and generic functions to enhance maintainability and efficiency.',
          IT: "Progettato e implementato applicazioni completamente tipizzate, introducendo classi di utilità e funzioni generiche per migliorare la manutenibilità e l'efficienza.",
        },
      },
      {
        label: 'Tailwind CSS & Design Systems',
        description: {
          EN: 'Contributed to a design system built with Tailwind CSS, customizing themes and extending utility classes for a cohesive UI.',
          IT: 'Contribuito a un sistema di design costruito con Tailwind CSS, personalizzando temi e estendendo classi di utilità per un UI coeso.',
        },
      },
      {
        label: 'State Management & API Integration',
        description: {
          EN: 'Migrated UEFA.com from Redux to Zustand, optimizing state handling and leveraging React Query for API state synchronization.',
          IT: 'Migrato UEFA.com da Redux a Zustand, ottimizzando la gestione dello stato e sfruttando React Query per la sincronizzazione dello stato API.',
        },
      },
      {
        label: 'Performance Optimization',
        description: {
          EN: 'Implemented memoization strategies, reduced unnecessary re-renders, and experimented with React Compiler for advanced optimizations.',
          IT: 'Implementato strategie di memoizzazione, ridotto i re-render non necessari e sperimentato con React Compiler per ottimizzazioni avanzate.',
        },
      },
      {
        label: 'DevOps & CI/CD',
        description: {
          EN: 'Configured Jenkins and Azure DevOps pipelines using YAML and Docker, streamlining deployment workflows for Next.js applications.',
          IT: 'Configurato pipeline Jenkins e Azure DevOps utilizzando YAML e Docker, semplificando i flussi di lavoro di distribuzione per le applicazioni Next.js.',
        },
      },
    ],
  },
  {
    company: 'Teoresi',
    location: 'Torino, Italy',
    position: 'Full Stack Web Developer',
    period: '2015 - 2019',
    description: {
      EN: 'Consultant for Deltatre, contributing to the development of the UEFA Euro 2016 website and API ecosystem.',
      IT: "Consulente per Deltatre, contribuendo allo sviluppo del sito web UEFA Euro 2016 e dell'ecosistema API.",
    },
  },
  {
    company: 'Blue Sof Consulting',
    position: 'Software Developer Apprentice',
    period: '2011 - 2014',
    description: {
      EN: 'Worked on ASP.NET MVC, C#, and SQL Server for enterprise web solutions.',
      IT: 'Lavorato su ASP.NET MVC, C# e SQL Server per soluzioni web aziendali.',
    },
  },
];

export const skills = [
  {
    name: 'Frontend',
    icon: Layout,
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS Custom Properties', 'Zustand', 'React Query'],
  },
  {
    name: 'Backend',
    icon: Code,
    skills: ['REST API integration', 'Node.js', '.NET Core'],
  },
  {
    name: 'State Management',
    icon: Database,
    skills: ['Zustand', 'React Query', 'Redux'],
  },
  {
    name: 'Tools & Bundlers',
    icon: Terminal,
    skills: ['Webpack', 'Vite', 'Rsbuild', 'Vitest', 'Nx', 'Stencil.js', 'Semantic Release', 'Husky'],
  },
  {
    name: 'DevOps',
    icon: GitBranch,
    skills: ['Azure DevOps', 'Jenkins', 'Docker', 'YAML pipelines'],
  },
  {
    name: 'Testing',
    icon: Search,
    skills: ['Jest', 'React Testing Library', 'Vitest'],
  },
];

export const softSkills = [
  {
    name: 'Code Quality & Best Practices',
    icon: Cpu,
    skills: ['Clean code', 'Maintainable architecture', 'Code reviews', 'Design patterns'],
  },
  {
    name: 'Leadership & Mentorship',
    icon: Users,
    skills: ['Team mentorship', 'Pair programming', 'Technical presentations', 'Documentation'],
  },
  {
    name: 'Project & Time Management',
    icon: Clock,
    skills: ['Scrum & Kanban', 'Task prioritization', 'Time management', 'Deliverable planning'],
  },
  {
    name: 'Problem-Solving & Innovation',
    icon: Lightbulb,
    skills: ['Event bus systems', 'API synchronization', 'Performance optimization', 'Virtualized lists'],
  },
];

export const education = {
  degree: "Master's Degree in Advanced Technology Physics",
  institution: 'Università degli Studi di Torino',
  period: '2008 - 2011',
};

export const languages = [
  { language: 'Italian', proficiency: 'Native', level: 100 },
  { language: 'English', proficiency: 'C2 Proficient (IELTS: 7.0)', level: 80 },
];

export const additionalInfo =
  'Open to remote and hybrid opportunities. Passionate about working on innovative and challenging projects that push the boundaries of modern web technologies. Dedicated to staying at the forefront of development, continuously experimenting with new technologies, and striving for clean, maintainable, and high-performance code.';
