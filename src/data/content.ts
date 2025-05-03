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
    { icon: User, label: 'location', value: 'torino' },
  ],
};

export const experience = [
  {
    company: 'Deltatre',
    location: 'torino',
    position: 'Tech Lead, Full Stack Web Developer',
    period: { from: '09/2019', to: 'present' },
    achievements: [
      {
        label: 'React & Next.js Development',
        description: {
          EN: 'Designed and implemented modern Next.js applications for major sports platforms (including LIV Golf, DP World Tour, GAA and others), using SSR and SSG to boost performance and scalability.',
          IT: 'Progettato e implementato applicazioni moderne in Next.js per piattaforme sportive di rilievo, come LIV Golf, DP World Tour, GAA e altre, sfruttando il rendering lato server (SSR) e la generazione statica (SSG) per aumentare le prestazioni e la scalabilità.',
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
          EN: 'Applied memoization strategies to reduce unnecessary re-renders.',
          IT: 'Implementate strategie di memoizzazione per ridurre i re-render superflui.',
        },
      },
      {
        label: 'DevOps & CI/CD',
        description: {
          EN: 'Configured Jenkins and Azure DevOps pipelines with YAML and Docker to streamline deployment workflows for Dotnet and Next.js applications.',
          IT: 'Configurate pipeline su Jenkins e Azure DevOps utilizzando YAML e Docker, per snellire i flussi di distribuzione delle applicazioni Dotnet e Next.js.',
        },
      },
    ],
  },
  {
    company: 'Teoresi',
    location: 'torino',
    position: 'Full Stack Web Developer',
    period: { from: '2015', to: '2019' },
    description: {
      EN: 'Consultant for Deltatre, contributing to the development of the UEFA Euro 2016 website and its API ecosystem.',
      IT: 'Consulente per Deltatre, ho lavorato allo sviluppo del sito web UEFA Euro 2016 e del suo ecosistema API.',
    },
  },
  {
    company: 'Blue Sof Consulting',
    location: 'torino',
    position: 'Software Developer Apprentice',
    period: { from: '2011', to: '2014' },
    description: {
      EN: 'Gained valuable experience working with ASP.NET MVC, C#, and SQL Server to deliver enterprise-grade web solutions.',
      IT: 'Acquisita esperienza preziosa lavorando con ASP.NET MVC, C# e SQL Server per realizzare soluzioni web di livello enterprise.',
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
    name: 'code_quality',
    icon: Cpu,
    skills: [
      { EN: 'Clean code', IT: 'Codice pulito' },
      { EN: 'Maintainable architecture', IT: 'Architettura manutenibile' },
      { EN: 'Code reviews', IT: 'Revisione del codice' },
      { EN: 'Design patterns', IT: 'Pattern di design' },
    ],
  },
  {
    name: 'leadership_mentorship',
    icon: Users,
    skills: [
      { EN: 'Team mentorship', IT: 'Mentorship di squadra' },
      { EN: 'Pair programming', IT: 'Programmazione in coppia' },
      { EN: 'Technical presentations', IT: 'Presentazioni tecniche' },
      { EN: 'Documentation', IT: 'Documentazione' },
    ],
  },
  {
    name: 'time_management',
    icon: Clock,
    skills: [
      { EN: 'Scrum & Kanban', IT: 'Scrum e Kanban' },
      { EN: 'Task prioritization', IT: 'Prioritizzazione dei compiti' },
      { EN: 'Time management', IT: 'Gestione del tempo' },
      { EN: 'Deliverable planning', IT: 'Pianificazione dei deliverable' },
    ],
  },
  {
    name: 'problem_solving',
    icon: Lightbulb,
    skills: [
      { EN: 'Event bus systems', IT: 'Sistemi di bus degli eventi' },
      { EN: 'API synchronization', IT: 'Sincronizzazione API' },
      { EN: 'Performance optimization', IT: 'Ottimizzazione delle prestazioni' },
      { EN: 'Virtualized lists', IT: 'Liste virtualizzate' },
    ],
  },
];

export const education = {
  degree: "Master's Degree in Advanced Technology Physics",
  institution: 'Università degli Studi di Torino',
  period: '2008 - 2011',
};

export const languages = [
  { language: { EN: 'Italian', IT: 'Italiano' }, proficiency: { EN: 'Native', IT: 'Nativo' }, level: 100 },
  {
    language: { EN: 'English', IT: 'Inglese' },
    proficiency: { EN: 'C2 Proficient (IELTS: 7.0)', IT: 'C2 Competente (IELTS: 7.0)' },
    level: 80,
  },
];
