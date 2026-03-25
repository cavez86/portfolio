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
import { siGithub } from 'simple-icons/icons';

function SimpleIcon({
  icon,
  ...props
}: {
  icon: { path: string; title: string };
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-label={icon.title} {...props}>
      <path d={icon.path} />
    </svg>
  );
}

function Github(props: React.SVGProps<SVGSVGElement>) {
  return <SimpleIcon icon={siGithub} {...props} />;
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn" {...props}>
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
