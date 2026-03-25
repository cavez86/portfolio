import {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  GraduationCap,
  Layout,
  Lightbulb,
  Mail,
  Search,
  Terminal,
  User,
  Users,
} from 'lucide-react';

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.1.82-.26.82-.58v-2.05c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.25 1.84 1.25 1.07 1.85 2.81 1.31 3.5 1 .11-.79.42-1.31.76-1.62-2.67-.3-5.47-1.36-5.47-6.02 0-1.33.46-2.42 1.24-3.27-.12-.3-.54-1.53.12-3.18 0 0 1-.33 3.3 1.25a11.37 11.37 0 0 1 6 0c2.29-1.58 3.29-1.25 3.29-1.25.66 1.65.24 2.88.12 3.18.77.85 1.24 1.94 1.24 3.27 0 4.67-2.81 5.71-5.49 6.01.44.39.82 1.16.82 2.34v3.47c0 .32.21.69.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.55V9h3.56v11.45Z" />
    </svg>
  );
}

const icons = {
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
} as const;
export const iconNames = Object.keys(icons) as Array<keyof typeof icons>;
export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & React.SVGProps<SVGSVGElement>) {
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
